/**
 * Writes a static HTML shell per route into dist/, after vite build.
 *
 * The app renders in the browser, which is fine for Google, but WhatsApp,
 * Facebook, LinkedIn and iMessage do not run JavaScript. Without this, every
 * shared link would show the home page's title and image no matter which page
 * was actually shared.
 *
 * Each file is the built index.html with the title, description, canonical and
 * Open Graph tags rewritten for that route. The app boots as usual and takes
 * over from there, so nothing about the runtime behaviour changes. Vercel
 * serves a real file before falling back to the SPA rewrite, so /about/ hits
 * dist/about/index.html.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { ROUTES } from './seo-routes.mjs'

const here = dirname(fileURLToPath(import.meta.url))
const distDir = join(here, '..', 'dist')

const SITE_URL = (process.env.VITE_SITE_URL || 'https://motifloral.com').replace(/\/$/, '')
const NOINDEX = process.env.VITE_NOINDEX === 'true'

/**
 * Search Console's HTML-tag method. Set VITE_GOOGLE_SITE_VERIFICATION to the
 * value Google gives you and it lands on every page, which is what the
 * verifier looks for. Verifying the domain by DNS instead is better if you can
 * reach the DNS panel, because it survives moving hosts.
 */
const GSC_TOKEN = process.env.VITE_GOOGLE_SITE_VERIFICATION || ''

const shell = readFileSync(join(distDir, 'index.html'), 'utf8')

const escape = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/** Replace the content of a meta tag, matching on its name or property. */
function setMeta(html, attr, key, value) {
  const re = new RegExp(`(<meta\\s+${attr}="${key}"\\s+content=")[^"]*(")`, 'i')
  if (re.test(html)) return html.replace(re, `$1${escape(value)}$2`)
  return html.replace('</head>', `    <meta ${attr}="${key}" content="${escape(value)}" />\n  </head>`)
}

let written = 0
for (const route of ROUTES) {
  const url = `${SITE_URL}${route.path}`
  const image = `${SITE_URL}${route.image}`

  let html = shell
    .replace(/<title>[^<]*<\/title>/i, `<title>${escape(route.title)}</title>`)
    .replace(
      /(<link rel="canonical" href=")[^"]*(")/i,
      `$1${url}$2`,
    )

  html = setMeta(html, 'name', 'description', route.description)
  html = setMeta(html, 'property', 'og:title', route.title)
  html = setMeta(html, 'property', 'og:description', route.description)
  html = setMeta(html, 'property', 'og:url', url)
  html = setMeta(html, 'property', 'og:image', image)
  html = setMeta(html, 'property', 'og:image:alt', route.title)
  html = setMeta(html, 'name', 'twitter:title', route.title)
  html = setMeta(html, 'name', 'twitter:description', route.description)
  html = setMeta(html, 'name', 'twitter:image', image)
  html = setMeta(
    html,
    'name',
    'robots',
    NOINDEX ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1',
  )

  if (GSC_TOKEN) {
    html = setMeta(html, 'name', 'google-site-verification', GSC_TOKEN)
  }

  // Only the home page paints that hero, so drop the preload elsewhere.
  if (route.path !== '/') {
    html = html.replace(/\n\s*<!-- The home hero[\s\S]*?\/>\n/, '\n')
  }

  const outDir = route.path === '/' ? distDir : join(distDir, route.path)
  mkdirSync(outDir, { recursive: true })
  writeFileSync(join(outDir, 'index.html'), html)
  written += 1
}

console.log(`Prerendered meta for ${written} routes`)
