/**
 * Prerender post-build: scrive in dist/ la pagina già renderizzata, non solo i meta.
 *
 * Prima di questo script (scripts/prerender-meta.mjs, sostituito) ogni rotta
 * usciva come guscio da ~4,9 KB: meta corretti, `<div id="root">` vuoto, zero
 * parole, zero link interni, zero dati strutturati. Google vedeva il contenuto
 * solo al secondo giro, quello che esegue il JavaScript e ha priorità più
 * bassa: 62 query non-brand in 5 giorni ma posizione media 14,6.
 *
 * Qui invece ogni rotta viene aperta davvero in Chrome headless su un server
 * statico locale, si aspetta che l'app abbia finito di montarsi, e si salva
 * l'HTML completo in dist/<rotta>/index.html. Il crawler trova il testo, i
 * link del menu e del piè di pagina, e il blocco JSON-LD che il componente Seo
 * inietta a runtime.
 *
 * L'elenco delle rotte resta quello di scripts/seo-routes.mjs, condiviso con il
 * generatore di sitemap: una rotta non può esistere in uno e non nell'altro.
 *
 * NB: il client usa createRoot, non hydrateRoot. L'HTML qui è fotografato
 * *dopo* gli effetti (slideshow avanzata, meta e JSON-LD già iniettati), quindi
 * la prima render del client non potrebbe mai coincidere e l'idratazione
 * fallirebbe. Vedi src/main.tsx.
 */
import { createServer } from 'node:http'
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { readFileSync } from 'node:fs'
import { join, extname, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import puppeteer from 'puppeteer'
import Beasties from 'beasties'
import { ROUTES } from './seo-routes.mjs'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..')
const dist = join(root, 'dist')

const SITE_URL = (process.env.VITE_SITE_URL || 'https://motifloral.com').replace(/\/$/, '')
const NOINDEX = process.env.VITE_NOINDEX === 'true'

/**
 * Metodo "HTML tag" di Search Console. Il valore che dà Google va in
 * VITE_GOOGLE_SITE_VERIFICATION e finisce su ogni pagina, che è quello che il
 * verificatore cerca. Verificare il dominio via DNS resta preferibile quando si
 * ha accesso al pannello, perché sopravvive a un cambio di host.
 */
const GSC_TOKEN = process.env.VITE_GOOGLE_SITE_VERIFICATION || ''

/**
 * /404 non è una rotta dell'app: il router la fa cadere su `path: '*'`, cioè
 * sulla pagina NotFound. Viene renderizzata come tutte le altre ma scritta in
 * dist/404.html, che Vercel serve con lo stato 404 vero per qualsiasi indirizzo
 * che non corrisponda a un file. Senza, ogni link morto rispondeva 200 con la
 * home e Google lo archiviava come soft 404.
 */
const NOT_FOUND = '/404'
const routes = [...ROUTES.map((r) => r.path), NOT_FOUND]
const routeMeta = new Map(ROUTES.map((r) => [r.path, r]))

const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml',
  '.webp': 'image/webp', '.avif': 'image/avif', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.png': 'image/png', '.gif': 'image/gif',
  '.ico': 'image/x-icon', '.woff': 'font/woff', '.woff2': 'font/woff2',
  '.ttf': 'font/ttf', '.txt': 'text/plain', '.xml': 'application/xml',
}

/**
 * Il guscio Vite intatto, letto una volta sola e tenuto in memoria: serve da
 * fallback SPA per ogni rotta, e resta quello giusto anche dopo che il primo
 * giro ha sovrascritto dist/index.html con la home renderizzata.
 */
const shell = readFileSync(join(dist, 'index.html'))

const server = createServer(async (req, res) => {
  const path = decodeURIComponent((req.url || '/').split('?')[0])
  const ext = extname(path)
  if (ext) {
    try {
      const body = await readFile(join(dist, path))
      res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' })
      res.end(body)
    } catch {
      res.writeHead(404)
      res.end()
    }
    return
  }
  res.writeHead(200, { 'Content-Type': 'text/html' })
  res.end(shell)
})

await new Promise((resolve) => server.listen(0, resolve))
const base = `http://localhost:${server.address().port}`

/**
 * Senza questo il server di build registrerebbe pageview finte: gtag parte da
 * index.html a ogni rotta aperta, una volta per pagina, a ogni deploy.
 */
const BLOCKED = [
  'googletagmanager.com', 'google-analytics.com', 'analytics.google.com',
  'clarity.ms', 'connect.facebook.net', 'doubleclick.net',
]

/**
 * Il container di build di Vercel non ha le librerie di sistema che un Chrome
 * normale si aspetta, quindi lì (e in CI) si lancia la build autocontenuta di
 * @sparticuz/chromium invece di quella scaricata da puppeteer.
 */
async function launchBrowser() {
  if (process.env.VERCEL || process.env.CI) {
    const chromium = (await import('@sparticuz/chromium')).default
    return puppeteer.launch({
      args: [...chromium.args, '--no-sandbox', '--disable-setuid-sandbox'],
      executablePath: await chromium.executablePath(),
      headless: true,
    })
  }
  return puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })
}

const browser = await launchBrowser()

/**
 * Quante parole ci si aspetta come minimo prima di considerare montata la
 * pagina. Tutte le rotte tranne la home sono lazy: senza questa attesa si
 * fotograferebbe il placeholder vuoto della Suspense, cioè esattamente il
 * guscio che stiamo togliendo di mezzo. Il 404 è corto per natura e ha una
 * soglia sua.
 */
const minWordsFor = (route) => (route === NOT_FOUND ? 25 : 120)

/** Conta le parole di testo dentro #root, dal punto di vista del browser. */
const WORDS_IN_ROOT = `(() => {
  const el = document.getElementById('root')
  return ((el && el.innerText) || '').trim().split(/\\s+/).filter(Boolean).length
})()`

async function renderOnce(route) {
  const page = await browser.newPage()
  const floor = minWordsFor(route)
  try {
    await page.setRequestInterception(true)
    page.on('request', (r) => {
      if (BLOCKED.some((d) => r.url().includes(d))) r.abort().catch(() => {})
      else r.continue().catch(() => {})
    })
    await page.goto(base + route, { waitUntil: 'domcontentloaded', timeout: 60000 })
    await page.waitForSelector('#root > *', { timeout: 30000 })
    await page.waitForFunction(`${WORDS_IN_ROOT} >= ${floor}`, { timeout: 30000 })
    await page.waitForNetworkIdle({ idleTime: 600, timeout: 20000 }).catch(() => {})
    await new Promise((r) => setTimeout(r, 300))
    const words = await page.evaluate(WORDS_IN_ROOT)
    const html = await page.evaluate(
      () => '<!DOCTYPE html>\n' + document.documentElement.outerHTML,
    )
    if (!html.includes('id="root"') || html.length < 2000) {
      throw new Error('output sospettosamente piccolo')
    }
    if (words < floor) throw new Error(`solo ${words} parole nel corpo`)
    return html
  } finally {
    await page.close()
  }
}

/**
 * Rimette media="print" sul foglio dei font.
 *
 * Nel sorgente il link ai Google Fonts nasce con media="print" e onload che lo
 * riporta ad "all": è il modo standard di caricarli senza bloccare il primo
 * disegno. Ma qui si serializza il DOM vivo, e a quel punto onload è già
 * scattato: Chrome scrive media="all" e la pagina servita si ferma a aspettare
 * la risposta di Google prima di disegnare qualsiasi cosa (misurati 1,2 s).
 * La copia dentro <noscript> non ha attributo media e non viene toccata.
 */
function restoreFontMediaPrint(html) {
  return html.replace(
    /(<link[^>]*href="https:\/\/fonts\.googleapis\.com[^"]*"[^>]*?)media="all"([^>]*onload=)/i,
    '$1media="print"$2',
  )
}

const escape = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/** Sostituisce il contenuto di un meta tag, cercandolo per name o property. */
function setMeta(html, attr, key, value) {
  const re = new RegExp(`(<meta\\s+${attr}="${key}"\\s+content=")[^"]*(")`, 'i')
  if (re.test(html)) return html.replace(re, `$1${escape(value)}$2`)
  return html.replace('</head>', `<meta ${attr}="${key}" content="${escape(value)}"></head>`)
}

function removeMeta(html, attr, key) {
  return html.replace(new RegExp(`\\s*<meta\\s+${attr}="${key}"\\s+content="[^"]*"\\s*/?>`, 'i'), '')
}

/**
 * I meta restano generati da seo-routes.mjs, non lasciati a quello che il
 * componente Seo ha scritto a runtime: è l'unica cosa che oggi funziona già ed
 * è la stessa sorgente della sitemap. Il render li scrive quasi tutti da sé,
 * questo passaggio li riporta alla riga ufficiale della rotta e aggiunge quelli
 * che il client non conosce (google-site-verification).
 */
function applyRouteMeta(html, route) {
  const url = `${SITE_URL}${route.path}`
  const image = `${SITE_URL}${route.image}`

  let out = html
    .replace(/<title>[^<]*<\/title>/i, `<title>${escape(route.title)}</title>`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/i, `$1${url}$2`)

  out = setMeta(out, 'name', 'description', route.description)
  out = setMeta(out, 'property', 'og:title', route.title)
  out = setMeta(out, 'property', 'og:description', route.description)
  out = setMeta(out, 'property', 'og:url', url)
  out = setMeta(out, 'property', 'og:image', image)
  out = setMeta(out, 'property', 'og:image:alt', route.title)
  out = setMeta(out, 'name', 'twitter:title', route.title)
  out = setMeta(out, 'name', 'twitter:description', route.description)
  out = setMeta(out, 'name', 'twitter:image', image)
  out = setMeta(
    out,
    'name',
    'robots',
    NOINDEX ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1',
  )

  if (GSC_TOKEN) out = setMeta(out, 'name', 'google-site-verification', GSC_TOKEN)

  if (route.path !== '/') {
    // og:image:width e og:image:height in index.html descrivono la hero della
    // home: su un'altra rotta l'immagine è un'altra e le misure sarebbero false.
    out = removeMeta(out, 'property', 'og:image:width')
    out = removeMeta(out, 'property', 'og:image:height')
    // Il preload della hero serve solo alla home; altrove scarica un'immagine
    // che quella pagina non dipinge mai.
    out = removeHeroPreload(out)
  }

  return out
}

/**
 * Toglie il preload della hero della home, commento incluso.
 *
 * Il tag va cercato nella serializzazione di Chrome, non in quella del
 * sorgente: gli attributi finiscono su una riga sola e il link non è
 * autochiudente, quindi una regex che finisce con `/>` non troverebbe niente.
 */
function removeHeroPreload(html) {
  return html
    .replace(/\s*<!--[^>]*The home hero[\s\S]*?-->/i, '')
    .replace(/\s*<link\s+rel="preload"[^>]*as="image"[^>]*>/i, '')
}

/**
 * Compatta ogni blocco JSON-LD nell'HTML servito. Ogni blocco viene riletto e
 * riserializzato, quindi un JSON malformato resta intatto e per un crawler i
 * dati strutturati sono identici a prima.
 */
function minifyJsonLd(html) {
  return html.replace(
    /(<script[^>]*type="application\/ld\+json"[^>]*>)([\s\S]*?)(<\/script>)/gi,
    (match, open, body, close) => {
      try {
        return open + JSON.stringify(JSON.parse(body)) + close
      } catch {
        return match
      }
    },
  )
}

/**
 * Inlinea il CSS che serve davvero a quella pagina e rimanda il resto.
 *
 * Vite emette un unico foglio di stile per tutto il sito e lo collega con un
 * <link rel="stylesheet"> bloccante: il browser non può dipingere niente finché
 * non lo ha scaricato e interpretato. Beasties percorre il markup già
 * renderizzato, capisce quali regole si applicano sopra la piega, le mette in
 * un <style> inline e riscrive il link perché carichi in asincrono con
 * fallback <noscript>. Girando per rotta, ogni pagina ha il suo insieme critico
 * invece di un minimo comune denominatore.
 */
const beasties = new Beasties({
  path: dist,
  publicPath: '/',
  preload: 'swap',
  pruneSource: false, // il foglio intero si carica lo stesso, solo senza bloccare
  inlineFonts: false,
  logLevel: 'silent',
})

let failed = 0
for (const route of routes) {
  let html
  try {
    html = await renderOnce(route)
  } catch {
    try {
      html = await renderOnce(route) // un solo nuovo tentativo, per le sviste di rete
    } catch (err) {
      failed++
      console.error(`  x ${route} - ${err.message}`)
      continue
    }
  }

  const isNotFound = route === NOT_FOUND
  let out = html

  if (isNotFound) {
    out = out
      .replace(/<title>[^<]*<\/title>/i, '<title>Page not found | Motif Floral</title>')
      .replace(/(<link rel="canonical" href=")[^"]*(")/i, `$1${SITE_URL}/404$2`)
    // follow e non nofollow: la pagina non va indicizzata, ma i link del menu e
    // del piè di pagina che porta con sé devono continuare a passare.
    out = setMeta(out, 'name', 'robots', 'noindex, follow')
    if (GSC_TOKEN) out = setMeta(out, 'name', 'google-site-verification', GSC_TOKEN)
    out = removeHeroPreload(out)
  } else {
    out = applyRouteMeta(out, routeMeta.get(route))
  }

  out = minifyJsonLd(out)
  out = restoreFontMediaPrint(out)
  try {
    out = await beasties.process(out)
  } catch (err) {
    // Una pagina che non si riesce ad analizzare esce lo stesso, solo con il
    // link bloccante di prima.
    console.error(`  ! CSS critico saltato per ${route} - ${err.message}`)
  }

  const outDir = route === '/' || isNotFound ? dist : join(dist, route)
  await mkdir(outDir, { recursive: true })
  await writeFile(join(outDir, isNotFound ? '404.html' : 'index.html'), out)
  console.log(`  ok ${route}`)
}

await browser.close()
server.close()

if (failed > 0) {
  console.error(`\nPrerender fallito su ${failed} rotta/e.`)
  process.exit(1)
}
console.log(`\nPrerenderizzate ${routes.length} rotte (${ROUTES.length} + 404.html).`)
