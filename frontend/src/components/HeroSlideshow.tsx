import { useCallback, useRef, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Autoplay } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { LongStemNavArrowLeft, LongStemNavArrowRight } from './icons/ThinArrows'
import 'swiper/css'
import { srcSetFor } from '../lib/assets'

const AUTOPLAY_MS = 5500

export function HeroSlideshow({
  slides,
  children,
  primaryCta,
  secondaryCta,
  footerSlot,
}: {
  slides: { src: string; alt: string; objectPosition?: string }[]
  children?: React.ReactNode
  /** Overrides default “Get a quote” when provided */
  primaryCta?: { to: string; label: string }
  secondaryCta?: { to: string; label: string }
  /** Pinned to the bottom of the hero (e.g. service strip) */
  footerSlot?: ReactNode
}) {
  const swiperRef = useRef<SwiperType | null>(null)
  const [active, setActive] = useState(0)
  const total = slides.length

  /**
   * Swiper keeps every slide in the DOM, so native lazy loading never defers
   * them: opening the page pulled all six photos at once. We render the <img>
   * only for the slide on screen and the next one, and remember which ones
   * have been shown so going back does not refetch.
   */
  const [reached, setReached] = useState<Set<number>>(() => new Set([0, 1]))
  const shouldRender = (i: number) => reached.has(i)
  const markReached = useCallback((index: number) => {
    setReached((prev) => {
      if (prev.has(index) && prev.has((index + 1) % total)) return prev
      const next = new Set(prev)
      next.add(index)
      next.add((index + 1) % total)
      return next
    })
  }, [total])

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
          markReached(s.realIndex)
        }}
        onSlideChange={(s) => {
          setActive(s.realIndex)
          markReached(s.realIndex)
        }}
      >
        {slides.map((s, i) => (
          <SwiperSlide key={s.src} className="!flex items-center justify-center">
            {shouldRender(i) ? (
              <img
                src={s.src}
                srcSet={srcSetFor(s.src)}
                sizes="100vw"
                alt={s.alt}
                className="h-full w-full object-cover"
                fetchPriority={i === 0 ? 'high' : 'low'}
                decoding={i === 0 ? 'sync' : 'async'}
                style={s.objectPosition ? { objectPosition: s.objectPosition } : undefined}
              />
            ) : (
              <div className="h-full w-full bg-mf-black" aria-hidden />
            )}
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

      <div
        className={
          footerSlot
            ? 'pointer-events-none absolute inset-0 z-40 flex flex-col justify-end'
            : 'pointer-events-none absolute inset-0 z-40 flex flex-col items-center justify-end gap-6 px-[4vw] pb-[min(8%,5rem)]'
        }
      >
        {footerSlot ? (
          <>
            <div className="flex min-h-0 flex-1 flex-col justify-end px-[4vw] pb-8 pt-[max(6rem,18svh)] md:pb-12 md:pt-[max(7rem,20svh)]">
              <div className="pointer-events-auto mx-auto flex w-full max-w-[1500px] flex-col items-center gap-8">
                {children ? <div className="w-full">{children}</div> : null}
                <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                  <Link to={primaryCta?.to ?? '/getquote/'} className="mf-cta mf-cta-light">
                    {primaryCta?.label ?? 'Get a quote'}
                  </Link>
                  {secondaryCta ? (
                    <Link
                      to={secondaryCta.to}
                      className="mf-cta border border-white/45 bg-transparent text-white transition-colors hover:bg-white hover:text-mf-black"
                    >
                      {secondaryCta.label}
                    </Link>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="pointer-events-auto w-full border-t border-white/25 bg-black/50 px-[4vw] py-4 backdrop-blur-[6px] md:py-5">
              <div className="mx-auto max-w-[1500px]">{footerSlot}</div>
            </div>
          </>
        ) : (
          <>
            {children ? (
              <div className="pointer-events-auto w-full max-w-[1500px] px-[4vw]">{children}</div>
            ) : null}
            <div className="pointer-events-auto flex flex-col items-center gap-4 px-[4vw] sm:flex-row sm:justify-center">
              <Link to={primaryCta?.to ?? '/getquote/'} className="mf-cta mf-cta-light">
                {primaryCta?.label ?? 'Get a quote'}
              </Link>
              {secondaryCta ? (
                <Link
                  to={secondaryCta.to}
                  className="mf-cta border border-white/45 bg-transparent text-white transition-colors hover:bg-white hover:text-mf-black"
                >
                  {secondaryCta.label}
                </Link>
              ) : null}
            </div>
          </>
        )}
      </div>

      {/* Slide numbering with arrows - bottom right (raised when footer strip is present) */}
      {total > 1 ? (
        <div
          className={
            footerSlot
              ? 'absolute bottom-[calc(6.5rem+env(safe-area-inset-bottom,0px))] right-6 z-40 flex items-center gap-6 md:bottom-[calc(7.5rem+env(safe-area-inset-bottom,0px))] md:right-8 md:gap-8'
              : 'absolute bottom-6 right-6 z-40 flex items-center gap-6 md:bottom-8 md:right-8 md:gap-8'
          }
        >
          <button
            type="button"
            onClick={onPrev}
            className="-m-2 flex min-h-[44px] min-w-[44px] items-center justify-center p-2 text-white/85 transition-opacity hover:text-white"
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
            className="-m-2 flex min-h-[44px] min-w-[44px] items-center justify-center p-2 text-white/85 transition-opacity hover:text-white"
            aria-label="Next slide"
          >
            <LongStemNavArrowRight className="block" />
          </button>
        </div>
      ) : null}
    </section>
  )
}
