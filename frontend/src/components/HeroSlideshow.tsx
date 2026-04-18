import { useCallback, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Autoplay } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { LongStemNavArrowLeft, LongStemNavArrowRight } from './icons/ThinArrows'
import 'swiper/css'

const AUTOPLAY_MS = 5500

export function HeroSlideshow({
  slides,
  children,
}: {
  slides: { src: string; alt: string; objectPosition?: string }[]
  children?: React.ReactNode
}) {
  const swiperRef = useRef<SwiperType | null>(null)
  const [active, setActive] = useState(0)
  const total = slides.length

  const onPrev = useCallback(() => swiperRef.current?.slidePrev(), [])
  const onNext = useCallback(() => swiperRef.current?.slideNext(), [])

  return (
    <section className="relative h-[min(calc(100svh_-_2.75rem),853px)] w-full overflow-hidden bg-black">
      <div
        className="pointer-events-none absolute left-0 right-0 top-0 z-40 flex gap-[2px] px-[max(1rem,env(safe-area-inset-left,0px))] pt-[max(0.125rem,env(safe-area-inset-top,0px))] pr-[max(1rem,env(safe-area-inset-right,0px))] md:px-6 md:pt-1"
        aria-hidden
      >
        {slides.map((_, i) => {
          const past = i < active
          const current = i === active
          return (
            <div
              key={i}
              className="h-[0.5px] min-h-[0.5px] min-w-0 flex-1 overflow-hidden rounded-full bg-white/15 md:h-px md:min-h-px md:bg-white/18"
            >
              {past ? <div className="h-full w-full bg-white/80" /> : null}
              {current ? (
                <div
                  key={`progress-${active}`}
                  className="hero-ig-progress-fill h-full w-full bg-white/80"
                  style={{ animationDuration: `${AUTOPLAY_MS}ms` }}
                />
              ) : null}
            </div>
          )
        })}
      </div>

      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        loop={total > 1}
        speed={400}
        threshold={8}
        touchRatio={1}
        longSwipesRatio={0.35}
        autoplay={{ delay: AUTOPLAY_MS, disableOnInteraction: false }}
        className="hero-swiper h-full w-full"
        onSwiper={(s) => {
          swiperRef.current = s
          setActive(s.realIndex)
        }}
        onSlideChange={(s) => setActive(s.realIndex)}
      >
        {slides.map((s) => (
          <SwiperSlide key={s.src} className="!flex items-center justify-center">
            <img
              src={s.src}
              alt={s.alt}
              className="h-full w-full object-cover"
              style={s.objectPosition ? { objectPosition: s.objectPosition } : undefined}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/35" />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Mobile / tablet: tap zones (Stories-style), no visible chrome */}
      {total > 1 ? (
        <div className="absolute inset-0 z-30 flex md:hidden">
          <button
            type="button"
            onClick={onPrev}
            className="h-full w-[28%] max-w-[200px] cursor-pointer border-0 bg-transparent"
            aria-label="Previous slide"
          />
          <div className="min-w-0 flex-1" />
          <button
            type="button"
            onClick={onNext}
            className="h-full w-[28%] max-w-[200px] cursor-pointer border-0 bg-transparent"
            aria-label="Next slide"
          />
        </div>
      ) : null}

      <div className="pointer-events-none absolute inset-0 z-40 flex flex-col items-center justify-end pb-[min(8%,5rem)]">
        <Link
          to="/getquote/"
          className="pointer-events-auto mf-cta mf-cta-light"
        >
          Get a quote
        </Link>
        {children ? <div className="mt-[1.5rem]">{children}</div> : null}
      </div>

      {/* Slide numbering with arrows - bottom right */}
      {total > 1 ? (
        <div className="absolute bottom-6 right-6 z-40 flex items-center gap-6 md:bottom-8 md:right-8 md:gap-8">
          <button
            type="button"
            onClick={onPrev}
            className="-m-1 flex items-center p-1 text-white/85 transition-opacity hover:text-white"
            aria-label="Previous slide"
          >
            <LongStemNavArrowLeft className="block" />
          </button>
          <span className="font-sans text-[0.75rem] font-extralight tabular-nums tracking-[0.18em] text-white/95">
            {active + 1} / {total}
          </span>
          <button
            type="button"
            onClick={onNext}
            className="-m-1 flex items-center p-1 text-white/85 transition-opacity hover:text-white"
            aria-label="Next slide"
          >
            <LongStemNavArrowRight className="block" />
          </button>
        </div>
      ) : null}
    </section>
  )
}
