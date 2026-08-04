# Deploy: Motif Floral

## Site (Vercel)

1. Vercel project from this repository, **Root Directory** `frontend`.
2. Framework preset: Vite (install `npm install`, build `npm run build`, output `dist`).
3. Node: `frontend/.nvmrc` pins **20**; keep the Vercel Node version on the same major.
4. Optional environment variables:
   - `VITE_USE_LOCAL_IMAGES=true` after `npm run download:images`, to serve files
     from `frontend/public/images/` (paths must match `src/lib/assets.ts`).
   - `VITE_SITE_URL` / `VITE_NOINDEX=true` while the site is on a preview URL.
   - `VITE_GA_ID` to switch analytics on; without it the cookie banner never appears.

There is no `VITE_API_URL`. The forms post to `/api/...` on the same origin, on
purpose: a configurable base once outlived the host it pointed at and every
enquiry went to an API that could not send. If that variable is still set on the
Vercel project, delete it — it is read by nothing.

## Forms

`frontend/api/contact.js`, `quote-event.js` and `quote-wedding.js` are Vercel
functions deployed with the site. They validate, honour the `surname` honeypot,
refuse without privacy consent, and set `reply-to` so answering is one click.

They send through [Resend](https://resend.com) and need three environment
variables on the Vercel project (Production, Preview and Development):

| Variable | Value |
| --- | --- |
| `RESEND_API_KEY` | from resend.com/api-keys |
| `FROM_EMAIL` | an address on a domain **verified in Resend**, e.g. `noreply@motifloral.com` |
| `RECIPIENT_EMAIL` | where enquiries land: `motifloral@gmail.com` |

Without all three the endpoints answer **503** and the visitor is asked to write
to the address instead. Nothing is queued: a missing key means a lost enquiry.

`FROM_EMAIL` cannot be `onboarding@resend.dev`. That shared sender only delivers
to the address the Resend account was opened with, so a form pointed anywhere
else fails with a 403 — the domain has to be verified first
(<https://resend.com/domains>, DNS for motifloral.com is at Wix).

### Checking it end to end

```bash
curl -s -X POST https://motifloral.com/api/contact \
  -H 'Content-Type: application/json' \
  -d '{"privacy_accepted":true,"email":"you@example.com","full_name":"Test","message":"Test"}'
```

`{"ok":true,...}` means the mail left. `503` means the variables are missing;
`502` means Resend refused, usually an unverified `FROM_EMAIL`.

## backend/ (retired)

The FastAPI app in `backend/` was the first version of these endpoints. It is
still running at `motif-floral-api.onrender.com` and still has no mail
credentials, which is why it answered every enquiry with 503. Nothing points at
it any more; shut the Render service down rather than configure it twice.

## Local development

```bash
cd frontend && npm install && npm run dev
```

`vercel dev` instead of `npm run dev` if you need the `/api` functions locally,
with the three variables in `frontend/.env.local`.

## Visual QA

After deploy, compare desktop/tablet/mobile breakpoints: typography, spacing,
hero, forms, carousels.

**Checklist (parity pass):**

- Home: hero slideshow, booking strip, three tiles (bouquet → `/chooseyourbouquet/`, portfolio, MF Accessories tile → `/mfaccessori/`), press row, services grid, gallery lightbox, testimonial text carousel, CTA links.
- Overlay-header pages (white nav): Contact, Portfolio, Get Quote, Testimonials — hero legibility and link contrast.
- Choose Your Bouquet: three tiers, prices/IVA copy, three Swiper carousels (autoplay ~5s), ribbon CTA → `/mfaccessori/`.
- Testimonials: hero overlay 0.2, six review blocks, final CTA button → Google review URL (new tab).
- Forms: Contact and Get Quote submit, and a real message arrives at `RECIPIENT_EMAIL`.

## Images

Run from `frontend`:

```bash
npm run download:images
```

Extend `scripts/pixieset-urls.txt` with any additional `/site/2qZExp/...` paths you need, then rebuild.
