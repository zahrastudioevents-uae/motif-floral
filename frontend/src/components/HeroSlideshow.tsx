import { useCallback, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Autoplay } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { ThinArrowLeft, ThinArrowRight } from './icons/ThinArrows'

export function HeroSlideshow({
  slides,
}: {
  slides: { src: string; alt: string }[]
}) {
  const swiperRef = useRef<SwiperType | null>(null)
  const [active, setActive] = useState(0)
  const total = slides.length

  const onPrev = useCallback(() => swiperRef.current?.slidePrev(), [])
  const onNext = useCallback(() => swiperRef.current?.slideNext(), [])

  return (
    <section className="relative h-[min(100svh,900px)] w-full bg-mf-black">
      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        loop={total > 1}
        autoplay={{ delay: 5500, disableOnInteraction: false }}
        className="hero-swiper h-full w-full"
        onSwiper={(s) => {
          swiperRef.current = s
          setActive(s.realIndex)
        }}
        onSlideChange={(s) => setActive(s.realIndex)}
      >
        {slides.map((s) => (
          <SwiperSlide key={s.src} className="!flex items-center justify-center">
            <img src={s.src} alt={s.alt} className="h-full w-full object-cover" />
            <div className="pointer-events-none absolute inset-0 bg-black/25" />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-end pb-[min(12%,7.5rem)]">
        <Link
          to="/getquote/"
          className="pointer-events-auto inline-block bg-white px-10 py-3 text-[0.625rem] font-medium uppercase tracking-[0.1em] text-mf-black transition-opacity hover:opacity-90"
        >
          Get a quote
        </Link>
      </div>

      <div className="pointer-events-none absolute bottom-8 right-[4vw] z-10 flex items-center gap-5 text-white md:bottom-10 md:gap-6">
        <button
          type="button"
          onClick={onPrev}
          className="pointer-events-auto p-1 text-white transition-opacity hover:opacity-70"
          aria-label="Previous slide"
        >
          <ThinArrowLeft className="block" />
        </button>
        <span className="min-w-[2.75rem] text-center font-sans text-[0.6875rem] font-light tabular-nums tracking-[0.12em]">
          {active + 1} / {total}
        </span>
        <button
          type="button"
          onClick={onNext}
          className="pointer-events-auto p-1 text-white transition-opacity hover:opacity-70"
          aria-label="Next slide"
        >
          <ThinArrowRight className="block" />
        </button>
      </div>
    </section>
  )
}
