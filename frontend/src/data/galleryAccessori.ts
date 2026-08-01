import type { GalleryPhoto } from '../components/PhotoGallery'

/** MF Accessories page gallery, shown below "Crafted for those who notice the difference."
 * 11 (rhinestone script closeup) and 14 (b&w wine-cellar bride) removed on request. */
const EXCLUDED = new Set([11, 14])
export const GALLERY_ACCESSORI: GalleryPhoto[] = Array.from({ length: 14 }, (_, i) => i + 1)
  .filter((n) => !EXCLUDED.has(n))
  .map((n) => ({
    src: `/images/gallery-accessori/accessori-${String(n).padStart(2, '0')}.jpg`,
    alt: 'Motif Floral, hand-embroidered silk ribbon and bridal accessory',
  }))
