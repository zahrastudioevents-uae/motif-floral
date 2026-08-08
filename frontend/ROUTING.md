# Routing, redirect e codici di risposta

Note su `vercel.json`, che è JSON e quindi non può contenere commenti. **Vercel
rifiuta le chiavi che non conosce**: un `_comment` dentro `vercel.json` fa
fallire il deploy con *"should NOT have additional property"*. È già costato un
deploy il 7 agosto 2026. Le spiegazioni vanno qui.

## Non c'è nessun rewrite universale, ed è voluto

Fino al 7 agosto 2026 `vercel.json` conteneva `"rewrites": [{ "source":
"/((?!api/).*)", "destination": "/index.html" }]`. Faceva rispondere **200 con
la home** a qualsiasi indirizzo, anche a quelli del vecchio sito. Google lo
chiama **soft 404** e continua a ripassarci sopra invece che sulle pagine vere.

Ora `scripts/prerender.mjs` scrive un file per ogni rotta di
`scripts/seo-routes.mjs`, più **`dist/404.html`**, che Vercel serve con lo stato
404 per tutto il resto. Le funzioni sotto `/api/` continuano a funzionare da
sole: sono serverless function, non rotte dell'app.

## Le pagine escono già renderizzate, non più come guscio

Fino all'8 agosto 2026 il passaggio si chiamava `prerender-meta.mjs` e scriveva
**solo i meta**: `/weddings/rome` arrivava a Google in 4,9 KB con `<div
id="root">` vuoto, zero parole, zero link interni, zero dati strutturati. Il
contenuto lo vedeva solo il secondo giro, quello che esegue il JavaScript e ha
priorità più bassa. Si vedeva nei numeri: 62 query non-brand in cinque giorni ma
posizione media 14,6, cioè seconda pagina.

`scripts/prerender.mjs` apre ogni rotta in Chrome headless (puppeteer) su un
server statico locale che serve `dist/`, aspetta che l'app si sia montata e
salva l'HTML completo. Le stesse pagine ora escono a 40-96 KB con 250-800 parole,
28-51 link interni e il blocco JSON-LD che il componente `Seo` inietta a runtime.
`beasties` inlinea poi il CSS critico di quella pagina e rimanda il resto.

Tre cose da non rompere:

1. **Il client usa `createRoot`, non `hydrateRoot`** (`src/main.tsx`). L'HTML è
   fotografato *dopo* gli effetti — slideshow avanzata, meta e JSON-LD già
   iniettati — quindi la prima render del client non può coincidere e
   l'idratazione fallirebbe a ogni caricamento.
2. **Su Vercel serve `@sparticuz/chromium`**: il container di build non ha le
   librerie di sistema che un Chrome normale si aspetta. Lo script se ne accorge
   da `process.env.VERCEL || process.env.CI`.
3. **I meta restano generati da `seo-routes.mjs`**, non lasciati a quello che il
   componente `Seo` ha scritto a runtime: è la stessa sorgente della sitemap, e
   una rotta non può stare in uno e non nell'altro.

Se il prerender fallisce, il build esce con 1 e il deploy non parte: su Vercel
resta servita la versione precedente, che è la risposta giusta. Per lavorare
sulla build senza aprire Chrome c'è `npm run build:nopre`, che però lascia i
gusci vuoti e **non va usata per un deploy**.

**Conseguenza da ricordare**: una rotta in `App.tsx` che non sia anche in
`seo-routes.mjs` **risponderà 404**. Il 7 agosto è già successo di scoprirne tre
fuori elenco — `/embroideredribbons` (aggiunta), `/privacy-policy` (in elenco
c'era `/privacy`, che è solo un redirect) e `/cookie-policy` (ora un 301 lato
server, non più un `<Navigate>` lato client).

## I 301 dalle vecchie vite del dominio

Il dominio ha ospitato un sito **WordPress fino al 2021** e uno **Wix fino al 2
agosto 2026**. La Wayback Machine elenca **271 indirizzi** di quegli anni:

```bash
curl -s "http://web.archive.org/cdx/search/cdx?url=motifloral.com*&output=text&fl=original&collapse=urlkey&filter=statuscode:200&limit=2000&from=2018&to=2026"
```

Sono reindirizzate con un **301** solo quelle che hanno un corrispondente vero
qui: un 301 passa alla pagina nuova anche il valore accumulato dalla vecchia in
quattro anni. Le famiglie coperte:

| Vecchio | Nuovo |
|---|---|
| `/it/*`, `/en/*`, `/it`, `/en`, `/home`, `/home2` | l'equivalente senza prefisso, o la home |
| `/chi-sono`, `/copia-di-about*` | `/about` |
| `/contacts`, `/contatti`, `/contattaci` | `/contact` |
| `/bouquet*`, `/quotebouquet`, `/copia-di-quote-bouquet*` | `/chooseyourbouquet` |
| `/accessori`, `/mf-accessories`, `/prodotti`, `/product-page/*`, coroncine, pettinini, nastri, orchidee | `/mfaccessori` |
| `/i-nostri-servizi`, `/services-4`, `/bookings-checkout/*` | `/getquote` |
| `/editoriali`, `/editorials`, `/matrimonio`, `/wedding`, `/cerimonia*`, `/eventi`, `/events`, `/elopement` | `/portfolio` |
| `/review`, `/dicono-di-noi` | `/testimonials` |

**Tutto il resto resta 404 di proposito.** Sono soprattutto gallerie di singoli
matrimoni e pagine duplicate di Wix (`copia-di-...`) che non hanno un
equivalente: Google tratta un redirect verso una pagina non pertinente come un
soft 404 e lo ignora, quindi il 404 è la risposta corretta e più pulita.

## Come verificare dopo un deploy

Vercel serve la versione in cache per qualche minuto: `curl` sembra dire che non
è cambiato niente. Si aggira con una stringa qualsiasi in coda.

```bash
curl -s -o /dev/null -w "%{http_code} -> %{redirect_url}\n" "https://motifloral.com/contacts?cb=$(date +%s)"
```

Deve rispondere **308** verso `/contact` (Vercel usa il 308, equivalente
permanente del 301 che conserva il metodo). Un indirizzo inventato deve
rispondere **404**.
