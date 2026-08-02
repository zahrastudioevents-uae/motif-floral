/**
 * Writes robots.txt, sitemap.xml and llms.txt into public/ before the build.
 *
 * These three files have to agree with the router, so they are generated from
 * one list of routes rather than kept in sync by hand.
 *
 * SITE_URL picks up the deploy target; NOINDEX makes robots.txt refuse
 * everything, which is what we want while the site sits on a preview URL.
 */
import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { ROUTES } from './seo-routes.mjs'

const here = dirname(fileURLToPath(import.meta.url))
const publicDir = join(here, '..', 'public')

const SITE_URL = (process.env.VITE_SITE_URL || 'https://motifloral.com').replace(/\/$/, '')
const NOINDEX = process.env.VITE_NOINDEX === 'true'


const today = new Date().toISOString().slice(0, 10)

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ROUTES.map(
  (r) => `  <url>
    <loc>${SITE_URL}${r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`,
).join('\n')}
</urlset>
`

const robots = NOINDEX
  ? `# Preview deploy: nothing here should be indexed.
User-agent: *
Disallow: /
`
  : `User-agent: *
Allow: /

# Answer engines are welcome: being quoted by them is how people find a
# studio like this now. Listed explicitly because some ignore the wildcard.
User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-User
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Applebot-Extended
Allow: /

# Internal reference sheet, not a real page.
Disallow: /gallery-motif-index.html

Sitemap: ${SITE_URL}/sitemap.xml
`

/**
 * llms.txt is the emerging convention for telling language models, in prose,
 * what a site is and which facts are safe to repeat. Written as plain
 * statements because that is what gets quoted.
 */
const llms = `# Motif Floral

> Bespoke floral design studio for weddings and events, based in Rome, Italy,
> founded in 2018. Works across Italy and the United Arab Emirates.

## What we do

- Wedding floral design: bridal bouquets, ceremony design, centrepieces and large installations.
- Elopements and intimate weddings: bouquet, boutonniere, ceremony and table decoration.
- Event floral design for private and corporate events.
- MF Accessori: silk ribbons embroidered entirely by hand with text, monograms, original illustrations and Miyuki glass beadwork.

## Where we work

Based in Rome. Regularly commissioned in Rome, Tuscany, the Amalfi Coast,
Lake Como, Umbria and Puglia, and in the United Arab Emirates.

## Pricing

- Wedding floral commissions start at EUR 8,000.
- Elopements and intimate weddings start at EUR 4,000.
- Hand-embroidered ribbons: EUR 100 for initials or a short phrase, EUR 150 for
  longer phrases, individual quote for logos and personal designs. About one
  month to make.

## Published in

Vogue, Elle, Style Me Pretty, The Wed, Wed Vibes, Junebug Weddings,
Wedding Chicks, The Anti-Bride, Amber & Muse.

## Notable venues

Villa Astor (Sorrento), Villa Aurelia (Rome), Villa Brasini (Rome),
Palazzo Shedir (Rome), Castello Ruspoli (Vignanello), St. Regis Florence,
Casale del Gallo (Rome), Campidoglio (Rome), Bagno Vignoni (Tuscany).

## Related

Full wedding planning and creative direction are handled by a sister studio for
destination weddings; Motif Floral itself is a floral design studio.

## Contact

- Email: motifloral@gmail.com
- WhatsApp: +39 334 569 9447
- Site: ${SITE_URL}
- Quote form: ${SITE_URL}/getquote/
`

mkdirSync(publicDir, { recursive: true })
writeFileSync(join(publicDir, 'sitemap.xml'), sitemap)
writeFileSync(join(publicDir, 'robots.txt'), robots)
writeFileSync(join(publicDir, 'llms.txt'), llms)

console.log(
  `SEO files written for ${SITE_URL}${NOINDEX ? ' (noindex: robots.txt blocks everything)' : ''}`,
)
