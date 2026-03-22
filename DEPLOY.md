# Deploy: Motif Floral monorepo

## Frontend (Vercel)

1. Create a Vercel project from this Git repository.
2. Set **Root Directory** to `frontend`.
3. Framework preset: Vite (install `npm install`, build `npm run build`, output `dist`).
4. Environment variables:
   - `VITE_API_URL` — public URL of the Render API (e.g. `https://your-api.onrender.com`), no trailing slash.
5. Optional: `VITE_USE_LOCAL_IMAGES=true` if you run `npm run download:images` and ship files under `frontend/public/images/` (paths must match `src/lib/assets.ts`).

Node: `frontend/.nvmrc` pins **20**; align the Vercel Node version to the same major.

## Backend (Render)

1. New **Web Service**, root `backend`.
2. **Build command**: `pip install -r requirements.txt` (or use a `runtime.txt` / native Python env).
3. **Start command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
4. Environment (from `backend/.env.example`):
   - `RESEND_API_KEY`
   - `FROM_EMAIL` (verified domain in Resend)
   - `RECIPIENT_EMAIL`
   - `ALLOWED_ORIGINS` — comma-separated, e.g.  
     `http://localhost:5173,https://www.motifloral.com,https://motifloral.com`  
     Preview deployments on `https://*.vercel.app` are allowed via `allow_origin_regex` in `main.py`.

Health check path: `/api/health`.

## Local development

```bash
cd backend && python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # fill values
uvicorn main:app --reload --port 8000
```

```bash
cd frontend && npm install
cp .env.example .env   # VITE_API_URL=http://localhost:8000
npm run dev
```

## CORS

Production origins must be listed in `ALLOWED_ORIGINS`. Vercel preview URLs matching `https://*.vercel.app` are accepted in addition to that list.

## Visual QA

After deploy, compare desktop/tablet/mobile breakpoints with [motifloral.com](https://www.motifloral.com): typography, spacing, hero, forms, and carousels. Adjust Tailwind classes in `frontend/src` as needed.

**Checklist (parity pass):**

- Home: hero slideshow, booking strip, three tiles (bouquet → `/chooseyourbouquet/`, portfolio, MF Accessories tile → `/embroideredribbons/`), press row, services grid, gallery lightbox, testimonial text carousel, CTA links.
- Overlay-header pages (white nav): Contact, Portfolio, Get Quote, Testimonials — hero legibility and link contrast.
- Choose Your Bouquet: three tiers, prices/IVA copy, three Swiper carousels (autoplay ~5s), ribbon CTA → `/embroideredribbons/`.
- Testimonials: hero overlay 0.2, six review blocks, final CTA button → Google review URL (new tab).
- Forms: Contact and Get Quote submit to `VITE_API_URL` `/api/contact` and `/api/quote`; honeypot field `surname` left empty.

## Images

Run from `frontend`:

```bash
npm run download:images
```

Extend `scripts/pixieset-urls.txt` with any additional `/site/2qZExp/...` paths you need, then rebuild.
