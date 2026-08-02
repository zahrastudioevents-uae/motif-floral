import type { GalleryPhoto } from '../components/PhotoGallery'

/** Home gallery, shown before "Selected work". */
/** Descriptions vary per photo: 15 copies of one sentence help neither readers nor image search. */
const ALTS = [
  'Bride holding a loose garden bouquet in soft cream and blush',
  'Ceremony aisle lined with low seasonal arrangements',
  'Reception table set with candles and a running floral centrepiece',
  'Close view of roses and ranunculus in a bridal bouquet',
  'Floral installation framing a stone doorway',
  'Bud vases and tapers along a long dining table',
  'Bridal bouquet resting on antique fabric',
  'Ceremony backdrop of branches and seasonal blooms',
  'Table setting with painted porcelain and a low arrangement',
  'Detail of foliage and flowers against natural light',
  'Bouquet carried through an Italian garden',
  'Centrepiece of dahlias and garden roses in warm tones',
  'Floral detail at a wedding reception in Italy',
  'Ceremony flowers arranged on stone steps',
  'Bridal flowers photographed in evening light',
]

export const GALLERY_MOTIF: GalleryPhoto[] = ALTS.map((alt, i) => ({
  src: `/images/gallery-motif/motif-${String(i + 1).padStart(2, '0')}.webp`,
  alt,
}))
