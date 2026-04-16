import { useCallback, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Autoplay } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

const AUTOPLAY_MS = 5500

function ChevronPrev({ className, size = 28 }: { className?: string; size?: number }) {
  return (
    <svg
      className={className}
      width={size * 0.55}
      height={size}
      viewBox="0 0 11 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M9 2L3 10l6 8"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ChevronNext({ className, size = 28 }: { className?: string; size?: number }) {
  return (
    <svg
      className={className}
      width={size * 0.55}
      height={size}
      viewBox="0 0 11 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M2 2l6 8-6 8"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function HeroSlideshow({
  slides,
  children,
}: {
  slides: { src: string; alt: string }[]
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
            <img src={s.src} alt={s.alt} className="h-full w-full object-cover" />
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

      {total > 1 ? (
        <>
          <button
            type="button"
            onClick={onPrev}
            className="absolute left-[max(1.25rem,env(safe-area-inset-left,0px))] top-1/2 z-[35] hidden -translate-y-1/2 items-center justify-center border-0 bg-transparent p-2 text-white/80 transition-opacity duration-200 hover:text-white md:flex"
            aria-label="Previous slide"
          >
            <ChevronPrev size={36} />
          </button>
          <button
            type="button"
            onClick={onNext}
            className="absolute right-[max(1.25rem,env(safe-area-inset-right,0px))] top-1/2 z-[35] hidden -translate-y-1/2 items-center justify-center border-0 bg-transparent p-2 text-white/80 transition-opacity duration-200 hover:text-white md:flex"
            aria-label="Next slide"
          >
            <ChevronNext size={36} />
          </button>
        </>
      ) : null}

      <div className="pointer-events-none absolute inset-0 z-40 flex flex-col items-center justify-end pb-[min(8%,5rem)]">
        <Link
          to="/getquote/"
          className="pointer-events-auto inline-block rounded-full bg-white px-12 py-3.5 text-[0.8125rem] font-extralight uppercase tracking-[0.12em] text-mf-black shadow-sm transition-opacity hover:opacity-90 md:text-[0.875rem] md:px-14 md:py-4"
        >
          Get a quote
        </Link>
        {children ? <div className="mt-[1.5rem]">{children}</div> : null}
      </div>
    </section>
  )
}
