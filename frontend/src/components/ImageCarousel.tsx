import { useRef } from 'react'
import { Autoplay, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

export function ImageCarousel({
  images,
  intervalMs = 5000,
}: {
  images: { src: string; alt: string }[]
  intervalMs?: number
}) {
  const prevRef = useRef<HTMLButtonElement>(null)
  const nextRef = useRef<HTMLButtonElement>(null)

  return (
    <div className="relative w-full">
      <Swiper
        modules={[Autoplay, Navigation]}
        slidesPerView={1}
        loop={images.length > 1}
        autoplay={{ delay: intervalMs, disableOnInteraction: false }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          if (
            swiper.params.navigation &&
            typeof swiper.params.navigation !== 'boolean'
          ) {
            swiper.params.navigation.prevEl = prevRef.current
            swiper.params.navigation.nextEl = nextRef.current
          }
        }}
        onSwiper={(swiper) => {
          setTimeout(() => {
            if (
              swiper.params.navigation &&
              typeof swiper.params.navigation !== 'boolean'
            ) {
              swiper.params.navigation.prevEl = prevRef.current
              swiper.params.navigation.nextEl = nextRef.current
              swiper.navigation.destroy()
              swiper.navigation.init()
              swiper.navigation.update()
            }
          })
        }}
        className="w-full"
      >
        {images.map((im) => (
          <SwiperSlide key={im.src}>
            <div className="flex justify-center px-2">
              <img
                src={im.src}
                alt={im.alt}
                className="max-h-[min(70vh,800px)] w-full max-w-4xl object-contain"
                loading="lazy"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="mt-4 flex justify-center gap-8 text-mf-muted">
        <button
          ref={prevRef}
          type="button"
          className="cursor-pointer border-0 bg-transparent p-2 text-2xl hover:text-mf-black"
          aria-label="Previous"
        >
          ‹
        </button>
        <button
          ref={nextRef}
          type="button"
          className="cursor-pointer border-0 bg-transparent p-2 text-2xl hover:text-mf-black"
          aria-label="Next"
        >
          ›
        </button>
      </div>
    </div>
  )
}
