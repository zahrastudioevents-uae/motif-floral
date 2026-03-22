/**
 * Pixieset CDN base. Run `npm run download:images` to mirror under /public/images
 * and set VITE_USE_LOCAL_IMAGES=true to serve locally.
 */
const CDN = 'https://images-pw.pixieset.com'

export function img(path: string): string {
  const p = path.startsWith('/') ? path : `/${path}`
  if (import.meta.env.VITE_USE_LOCAL_IMAGES === 'true') {
    return `/images${p}`
  }
  return `${CDN}${p}`
}
