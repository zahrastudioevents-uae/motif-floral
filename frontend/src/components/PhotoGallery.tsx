import { GRID_SIZES, srcSetFor } from '../lib/assets'
export type GalleryPhoto = { src: string; alt: string }

const COLS_CLASS = {
  3: 'md:grid-cols-3',
  4: 'md:grid-cols-4',
} as const

export function PhotoGallery({
  photos,
  columns = 4,
}: {
  photos: GalleryPhoto[]
  columns?: 3 | 4
}) {
  return (
    <div className={`grid grid-cols-2 gap-x-3 gap-y-5 md:gap-x-4 md:gap-y-7 ${COLS_CLASS[columns]}`}>
      {photos.map((photo) => (
        <figure key={photo.src} className="group overflow-hidden">
          <img
            src={photo.src}
            srcSet={srcSetFor(photo.src)}
            sizes={GRID_SIZES}
            alt={photo.alt}
            className="aspect-[2/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            loading="lazy"
          />
        </figure>
      ))}
    </div>
  )
}
