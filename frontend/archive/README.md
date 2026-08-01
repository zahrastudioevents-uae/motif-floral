# Archivio, versioni non attive del sito

Questa cartella è fuori da `src/` (non incluso da `tsconfig.app.json`), quindi
non viene compilata né mostrata dal sito live. Contiene le due direzioni di
homepage messe da parte il 26-27 luglio 2026, per poterle riprendere in futuro
senza rifare il lavoro.

## sito-notte/ — "Atelier Notturno"
Tema scuro (fondo #16130f, accenti ottone, Cormorant Garamond). File:
- `HomeNotte.tsx` (era `Home2.tsx`)
- `HeaderNotte.tsx` (era `HomeHeader2.tsx`)

## sito-terra/ — "Terra", con Home 3
Tema costruito sul marrone del logo (#74522c), col logo vero come hero
(fiori, wordmark e tagline ritagliati dal file originale, sfondo rimosso e
mimetizzato in un gradiente + grana). Questa è l'ultima versione rifinita
prima dello stop. File:
- `HomeTerra.tsx` (era `Home3.tsx`)
- `HeaderTerra.tsx` (era `HomeHeader3.tsx`)
- `images/logo-motif-cutout.png` — bouquet + wordmark + tagline ritagliati
- `images/motif-wordmark.png` — solo "motif floral" ritagliato, per il menu

## UniverseScope.tsx
Era `NightScope.tsx`: il meccanismo che teneva la navigazione dentro un
tema (rimappava i link interni verso le rotte `/2` o `/3`). Serve solo se si
riattiva uno di questi due universi.

## Per riattivare una di queste versioni

1. Rimettere i file in `src/pages/` e `src/components/` coi nomi originali
   (`Home2.tsx`/`HomeHeader2.tsx` o `Home3.tsx`/`HomeHeader3.tsx`), e le
   immagini in `public/images/`.
2. Re-includere in `index.css` i token colore (`--color-mf-night*` o
   `--color-mf-terra*`) e le classi `.theme-night`/`.theme-terra`, e in
   `index.html` i font Google aggiuntivi (Cormorant Garamond per la notte;
   Cormorant Garamond + Pinyon Script per terra — Italiana non serve più,
   il wordmark terra usa l'immagine ritagliata).
3. Ripristinare le rotte in `App.tsx`, l'header condizionale in `Layout.tsx`
   (vedi git history del 26-27 luglio 2026 per il codice esatto), e le voci
   corrispondenti in `data/nav.ts` / `HomeHeader.tsx` / `Footer.tsx` se si
   vuole che il sito classico linki anche a quella versione.

Il modo più veloce è chiedere di ripristinarle: la cronologia di questa
sessione ha tutto il codice già pronto.
