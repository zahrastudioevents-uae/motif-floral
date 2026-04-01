import { useCallback, useRef, useState } from 'react'
import { Autoplay } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

export function ImageCarousel({
  images,
  intervalMs = 5000,
}: {
  images: { src: string; alt: string }[]
  intervalMs?: number
}) {
  const swiperRef = useRef<SwiperType | null>(null)
  const [active, setActive] = useState(0)
  const n = images.length

  const goTo = useCallback((i: number) => {
    const s = swiperRef.current
    if (!s) return
    if (s.params.loop && n > 1) {
      s.slideToLoop(i)
    } else {
      s.slideTo(i)
    }
  }, [n])

  return (
    <div className="relative mx-auto w-full max-w-4xl overflow-hidden rounded-2xl bg-mf-white shadow-[0_1px_3px_rgba(0,0,0,0.08),0_8px_24px_rgba(0,0,0,0.06)] ring-1 ring-black/[0.06]">
      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        loop={n > 1}
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
            <div className="flex justify-center bg-mf-white px-1 pb-10 pt-1 sm:px-2">
              <img
                src={im.src}
                alt={im.alt}
                className="max-h-[min(65vh,720px)] w-full object-contain"
                loading="lazy"
                draggable={false}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Instagram post–style pill dots */}
      {n > 1 ? (
        <div className="absolute bottom-3 left-0 right-0 z-10 flex items-center justify-center gap-1.5 px-4">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to image ${i + 1}`}
              aria-current={i === active}
              className={[
                'h-1.5 rounded-full transition-all duration-300 ease-out',
                i === active
                  ? 'w-6 bg-mf-black'
                  : 'w-1.5 bg-mf-black/22 hover:bg-mf-black/40',
              ].join(' ')}
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}
