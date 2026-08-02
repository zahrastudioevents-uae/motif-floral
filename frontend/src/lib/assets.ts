import IMAGE_WIDTHS from './imageWidths.json'

/**
 * Images ship with the site as WebP under /public/images.
 *
 * Call sites still pass the original Pixieset path (…-1500.jpg / .png) because
 * that is how the source gallery names them; we rewrite the extension here so
 * the filenames stay traceable back to the export.
 *
 * Set VITE_IMAGE_CDN to serve from the Pixieset CDN instead, e.g. to compare
 * against the old site.
 */
const CDN = import.meta.env.VITE_IMAGE_CDN

export function img(path: string): string {
  const p = path.startsWith('/') ? path : `/${path}`
  if (CDN) return `${CDN}${p}`
  return `/images${p.replace(/\.(jpe?g|png)$/i, '.webp')}`
}

/**
 * Grid thumbnails are never shown wider than ~500 CSS px, so let the browser
 * pick the 800px copy on normal screens and keep the full one for retina.
 * Takes an already-resolved URL from img(); pair it with a `sizes` attribute
 * describing the slot.
 */
export function srcSetFor(url: string): string | undefined {
  if (!url.startsWith('/images/') || !url.endsWith('.webp')) return undefined
  const full = (IMAGE_WIDTHS as Record<string, number>)[url]
  if (!full) return undefined
  const at = (w: number) => `${url.replace(/\.webp$/, `-${w}.webp`)} ${w}w`
  // Only offer variants that were actually generated, and describe the original
  // with its real width: claiming a 2400px file is 1500px makes the browser
  // pick it for screens that needed a third of the pixels.
  const steps = [500, 800, 1200].filter((w) => w < full).map(at)
  return [...steps, `${url} ${full}w`].join(', ')
}

/**
 * How wide a cell actually renders, so the browser can pick the right file.
 * Understating these makes images blurry, so they must match the grid classes.
 */
/** 2 columns on phones, 3 from md up. */
export const GRID_SIZES = '(min-width: 768px) 33vw, 50vw'
/** Full width on phones, 3 columns from md up. */
export const GRID_SIZES_WIDE = '(min-width: 768px) 33vw, 100vw'
