/**
 * Builds the responsive variants for every photo and records their real widths.
 *
 * The widths matter: a srcSet that claims a file is 1500px wide when it is
 * actually 2400px makes the browser pick it for a screen that needed far less,
 * which is exactly what was happening to the home hero. The manifest is written
 * to src/lib/imageWidths.json and read by srcSetFor.
 *
 * Requires sharp; skip with SKIP_IMAGE_MANIFEST=true to build without it (the
 * committed manifest is then used as-is).
 */
import { readdirSync, statSync, writeFileSync, existsSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const imagesDir = join(here, '..', 'public', 'images')
const manifestPath = join(here, '..', 'src', 'lib', 'imageWidths.json')

/** Widths we generate. A photo only gets the ones smaller than itself. */
const STEPS = [500, 800, 1200]

function walk(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name)
    if (statSync(full).isDirectory()) walk(full, acc)
    else if (name.endsWith('.webp')) acc.push(full)
  }
  return acc
}

const isVariant = (p) => /-(\d+)\.webp$/.test(p) && STEPS.some((w) => p.endsWith(`-${w}.webp`))

let sharp
try {
  sharp = (await import('sharp')).default
} catch {
  sharp = null
}

const bases = walk(imagesDir).filter((p) => !isVariant(p) && !p.includes('wordmark'))
const manifest = {}
let made = 0

for (const file of bases) {
  const key = '/images/' + relative(imagesDir, file).split('\\').join('/')
  let width
  if (sharp) {
    width = (await sharp(file).metadata()).width
    for (const w of STEPS) {
      if (width <= w) continue
      const out = file.replace(/\.webp$/, `-${w}.webp`)
      if (existsSync(out)) continue
      await sharp(file).resize({ width: w }).webp({ quality: w <= 500 ? 88 : 90 }).toFile(out)
      made += 1
    }
  }
  if (width) manifest[key] = width
}

if (sharp) {
  writeFileSync(manifestPath, JSON.stringify(manifest, null, 0) + '\n')
  console.log(`Image manifest: ${Object.keys(manifest).length} photos, ${made} new variants`)
} else {
  console.log('sharp not installed, keeping the committed image manifest')
}
