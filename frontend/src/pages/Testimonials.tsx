import { useEffect, useRef, type ReactNode } from 'react'
import { Seo } from '../components/Seo'
import {
  REVIEWS,
  TESTIMONIALS_CTA_BG,
  TESTIMONIALS_HERO,
} from '../data/testimonialsPage'

/** Fraction of section height the image travels during parallax (larger = more movement) */
const PARALLAX_SPEED = 0.45

function ParallaxCoverSection({
  imageSrc,
  imageAlt,
  objectPosition,
  sectionClassName,
  children,
}: {
  imageSrc: string
  imageAlt: string
  objectPosition?: string
  sectionClassName: string
  children: ReactNode
}) {
  const sectionRef = useRef<HTMLElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const img = imgRef.current
    if (!section || !img) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0
    const update = () => {
      const rect = section.getBoundingClientRect()
      const vh = window.innerHeight
      // center of section relative to center of viewport (0 = perfectly centred)
      const centerOffset = (rect.top + rect.height / 2) - vh / 2
      const offset = centerOffset * PARALLAX_SPEED
      img.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`
    }

    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <section ref={sectionRef} className={sectionClassName}>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <img
          ref={imgRef}
          src={imageSrc}
          alt={imageAlt}
          /* Oversized so parallax travel never exposes edges (±15% of section height) */
          className="absolute left-0 h-[160%] w-full object-cover will-change-transform"
          style={{
            top: '-30%',
            objectPosition: objectPosition ?? 'center center',
          }}
        />
      </div>
      <div className="absolute inset-0 bg-black/20" />
      {children}
    </section>
  )
}

export function Testimonials() {
  return (
    <>
      <Seo
        title="Client Reviews – Motif Floral - Motif Floral"
        description="Discover what couples and clients say about their Motif Floral experience."
      />
      <ParallaxCoverSection
        imageSrc={TESTIMONIALS_HERO}
        imageAlt=""
        objectPosition="center 40%"
        sectionClassName="relative flex min-h-[45vh] items-end justify-center overflow-hidden pb-16 pt-32 text-white md:min-h-[50vh]"
      >
        <div className="relative z-10 px-[4vw] text-center">
          <h1 className="font-sans text-[min(2.25rem,1rem+1.39vw)] font-light uppercase tracking-wide text-white">
            Testimonials
          </h1>
          <p className="mt-4 font-sans text-[0.875rem] text-white/95">
            Kind words from our amazing clients
          </p>
        </div>
      </ParallaxCoverSection>

      {REVIEWS.map((r) => (
        <section
          key={r.names}
          className="border-b border-mf-accent py-16 last:border-b-0"
        >
          <div className="mx-auto grid max-w-[1500px] gap-10 px-[4vw] md:grid-cols-2 md:items-center">
            <div className="mx-auto w-full max-w-[min(100%,300px)] overflow-hidden border border-mf-accent md:mx-0 md:max-w-[360px]">
              <img
                src={r.image}
                alt={r.alt}
                className="aspect-[3/4] w-full object-cover md:aspect-[2/3]"
                loading="lazy"
              />
            </div>
            <div>
              <p className="text-center font-sans text-[13px] font-light italic leading-[1.85] tracking-[0.01em] text-[#4a4a4a] md:text-left">
                {r.text}
              </p>
              <h2 className="mt-8 font-sans text-[1.25rem] font-light uppercase tracking-wide text-mf-black">
                {r.names}
              </h2>
            </div>
          </div>
        </section>
      ))}

      <ParallaxCoverSection
        imageSrc={TESTIMONIALS_CTA_BG}
        imageAlt=""
        objectPosition="53% bottom"
        sectionClassName="relative min-h-[50vh] overflow-hidden text-white"
      >
        <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-[4vw] py-24 text-center">
          <h2 className="font-display text-[min(3rem,1rem+2.22vw)] font-normal uppercase text-white">
            Share your experience here
          </h2>
          <p className="mt-4 font-sans text-[0.875rem] text-white/95">
            We would be delighted to read your words, they could help our future clients
          </p>
          <a
            href="https://g.page/r/CYVhcWjqwrsBEAI/review"
            target="_blank"
            rel="noreferrer"
            className="mf-cta mf-cta-dark mt-10"
          >
            Please leave a review
          </a>
        </div>
      </ParallaxCoverSection>
    </>
  )
}
