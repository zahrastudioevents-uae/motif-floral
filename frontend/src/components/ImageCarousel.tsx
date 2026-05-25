import { useCallback, useRef, useState } from 'react'
import { Autoplay } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { LongStemNavArrowLeft, LongStemNavArrowRight } from './icons/ThinArrows'
import 'swiper/css'

export function ImageCarousel({
  images,
  intervalMs = 5000,
  variant = 'default',
}: {
  images: { src: string; alt: string }[]
  intervalMs?: number
  /** `hero`: full-width column, 3/4 crop like former tier hero (bouquet pages) */
  variant?: 'default' | 'hero'
}) {
  const swiperRef = useRef<SwiperType | null>(null)
  const [active, setActive] = useState(0)
  const n = images.length

  const prev = useCallback(() => swiperRef.current?.slidePrev(), [])
  const next = useCallback(() => swiperRef.current?.slideNext(), [])

  const isHero = variant === 'hero'

  return (
    <div
      className={
        isHero
          ? 'relative w-full overflow-hidden border border-mf-accent bg-mf-white'
          : 'relative mx-auto w-full max-w-4xl overflow-hidden rounded-2xl bg-mf-white shadow-[0_1px_3px_rgba(0,0,0,0.08),0_8px_24px_rgba(0,0,0,0.06)] ring-1 ring-black/[0.06]'
      }
    >
      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        /* loop + autoHeight breaks duplicated slides; hero uses rewind instead */
        loop={!isHero && n > 1}
        rewind={isHero && n > 1}
        speed={320}
        autoplay={
          n > 1
            ? { delay: intervalMs, disableOnInteraction: false }
            : false
        }
        className="w-full"
        onSwiper={(s) => {
          swiperRef.current = s
          setActive(s.realIndex)
        }}
        onSlideChange={(s) => setActive(s.realIndex)}
      >
        {images.map((im) => (
          <SwiperSlide key={im.src}>
            {isHero ? (
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-mf-accent">
                <img
                  src={im.src}
                  alt={im.alt}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                  draggable={false}
                />
              </div>
            ) : (
              <div className="flex justify-center bg-mf-white px-1 pb-10 pt-1 sm:px-2">
                <img
                  src={im.src}
                  alt={im.alt}
                  className="max-h-[min(65vh,720px)] w-full object-contain"
                  loading="lazy"
                  draggable={false}
                />
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Slide navigation with arrows and numbering on the left */}
      {n > 1 ? (
        <div
          className={
            isHero
              ? 'absolute left-3 top-1/2 z-20 flex -translate-y-1/2 items-center gap-4 rounded-full border border-white/25 bg-black/45 px-3 py-2.5 shadow-lg backdrop-blur-sm sm:left-5 sm:gap-5 sm:px-4'
              : 'absolute left-4 top-1/2 z-20 flex -translate-y-1/2 items-center gap-6 sm:left-6 sm:gap-7'
          }
        >
          <button
            type="button"
            onClick={prev}
            className={
              isHero
                ? '-m-1 flex items-center p-1 text-white transition-opacity hover:opacity-80'
                : '-m-1 flex items-center p-1 text-mf-black transition-opacity hover:opacity-60'
            }
            aria-label="Previous image"
          >
            <LongStemNavArrowLeft className="block" />
          </button>
          <span
            className={
              isHero
                ? 'font-sans text-[0.75rem] font-extralight tabular-nums tracking-[0.18em] text-white'
                : 'font-sans text-[0.75rem] font-extralight tabular-nums tracking-[0.18em] text-mf-black'
            }
          >
            {active + 1} / {n}
          </span>
          <button
            type="button"
            onClick={next}
            className={
              isHero
                ? '-m-1 flex items-center p-1 text-white transition-opacity hover:opacity-80'
                : '-m-1 flex items-center p-1 text-mf-black transition-opacity hover:opacity-60'
            }
            aria-label="Next image"
          >
            <LongStemNavArrowRight className="block" />
          </button>
        </div>
      ) : null}
    </div>
  )
}
