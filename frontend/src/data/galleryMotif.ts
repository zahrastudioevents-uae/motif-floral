import type { GalleryPhoto } from '../components/PhotoGallery'

/** Home gallery, shown before "Selected work". */
export const GALLERY_MOTIF: GalleryPhoto[] = Array.from({ length: 15 }, (_, i) => ({
  src: `/images/gallery-motif/motif-${String(i + 1).padStart(2, '0')}.webp`,
  alt: 'Motif Floral, wedding floral design',
}))
