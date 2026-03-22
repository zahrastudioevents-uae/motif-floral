import { useState } from 'react'
import { Link } from 'react-router-dom'
import { HeroSlideshow } from '../components/HeroSlideshow'
import { HomeHeader } from '../components/HomeHeader'
import { HomeTestimonialsSection } from '../components/HomeTestimonialsSection'
import { Seo } from '../components/Seo'
import {
  GALLERY_IMAGES,
  HOME_HERO_SLIDES,
  HOME_TESTIMONIAL_SLIDES,
  HOME_TILES,
} from '../data/home'
import { PRESS_LOGOS } from '../data/press'

export function Home() {
  const [lightbox, setLightbox] = useState<string | null>(null)

  return (
    <>
      <Seo
        title="Luxury Wedding & Event Floral Design in Italy – Motif Floral - Motif Floral"
        description="Bespoke floral design for weddings and events in Italy. Based in Rome, available worldwide."
      />
      <div className="relative">
        <HomeHeader />
        <HeroSlideshow slides={HOME_HERO_SLIDES} />
      </div>

      <section className="bg-mf-white py-10 text-center">
        <p className="font-sans text-[0.8125rem] font-light uppercase tracking-[0.15em] text-mf-black">
          Currently booking 2026 events
        </p>
        <p className="mt-2 font-sans text-[0.8125rem] font-light uppercase tracking-[0.15em] text-mf-black">
          Destination weddings | Intimate weddings | Elopements | Events
        </p>
      </section>

      <section className="bg-mf-white">
        <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-[3px] px-[4vw] py-16 md:grid-cols-3 md:gap-[3px]">
          {HOME_TILES.map((t) => (
            <Link
              key={t.to}
              to={t.to}
              className="group relative block aspect-[3/4] w-full overflow-hidden no-underline"
            >
              <img
                src={t.image}
                alt={t.alt}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex flex-col items-center px-4 pb-[min(12%,3rem)] pt-24 text-center text-white md:pb-14 md:pt-28">
                <h2 className="font-sans text-[min(1.85rem,0.85rem+1.1vw)] font-extralight uppercase tracking-[0.2em]">
                  {t.title}
                </h2>
                <span className="mt-5 font-sans text-[0.65rem] font-light uppercase tracking-[0.22em]">
                  {t.cta}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-mf-white py-14 md:py-20">
        <p className="text-center font-sans text-[0.6875rem] font-light uppercase tracking-[0.22em] text-mf-muted">
          FEATURED IN
        </p>
        <div className="mx-auto mt-10 flex max-w-[1400px] flex-wrap items-center justify-center gap-x-8 gap-y-10 px-[4vw] md:mt-12 md:gap-x-12 md:gap-y-8">
          {PRESS_LOGOS.map((logo) => (
            <img
              key={logo.src}
              src={logo.src}
              alt={logo.alt}
              className="h-9 w-auto max-w-[min(150px,32vw)] object-contain opacity-90 md:h-11"
              loading="lazy"
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-[4vw] py-16">
        <h2 className="text-center font-display text-[min(3rem,1rem+2.22vw)] font-normal uppercase tracking-wide text-mf-black">
          Our services
        </h2>
        <div className="mt-10 grid gap-10 md:grid-cols-2">
          <div>
            <h3 className="font-sans text-[1.25rem] font-light uppercase tracking-wide text-mf-black">
              Full wedding floral design
            </h3>
            <p className="mt-2 font-sans text-[0.875rem] leading-relaxed text-mf-muted">
              Ceremony arch, aisle décor, bridal party flowers, cocktail and reception
              tablescapes, cake florals, and destination wedding support throughout Italy.
            </p>
          </div>
          <div>
            <h3 className="font-sans text-[1.25rem] font-light uppercase tracking-wide text-mf-black">
              Intimate weddings &amp; elopements
            </h3>
            <p className="mt-2 font-sans text-[0.875rem] leading-relaxed text-mf-muted">
              Personal flowers, ceremony styling, romantic dinner settings, and tailored
              details for smaller celebrations.
            </p>
          </div>
          <div>
            <h3 className="font-sans text-[1.25rem] font-light uppercase tracking-wide text-mf-black">
              Rentals &amp; decorative styling
            </h3>
            <p className="mt-2 font-sans text-[0.875rem] leading-relaxed text-mf-muted">
              Vases, candelabras, candles, linens, backdrops, and fabric styling to complete
              your floral vision.
            </p>
          </div>
          <div>
            <h3 className="font-sans text-[1.25rem] font-light uppercase tracking-wide text-mf-black">
              Events &amp; corporate
            </h3>
            <p className="mt-2 font-sans text-[0.875rem] leading-relaxed text-mf-muted">
              Galas, brand activations, fashion and editorial sets, and large-scale
              installations.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-mf-accent py-12">
        <div className="mx-auto flex max-w-[1500px] flex-col items-center gap-4 px-[4vw]">
          <h2 className="font-display text-[min(2.25rem,1rem+1.39vw)] font-normal uppercase text-mf-black">
            Selected works
          </h2>
          <Link
            to="/portfolio/"
            className="text-[0.625rem] font-medium uppercase tracking-[0.1em] text-mf-black underline"
          >
            View portfolio
          </Link>
        </div>
        <div className="mx-auto mt-10 grid max-w-[1500px] grid-cols-2 gap-2 px-[4vw] md:grid-cols-4">
          {GALLERY_IMAGES.map((src) => (
            <button
              key={src}
              type="button"
              className="block w-full overflow-hidden border-0 p-0"
              onClick={() => setLightbox(src)}
            >
              <img
                src={src}
                alt=""
                className="aspect-square w-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      </section>

      {lightbox ? (
        <button
          type="button"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4"
          onClick={() => setLightbox(null)}
          aria-label="Close gallery"
        >
          <img
            src={lightbox}
            alt=""
            className="max-h-[90vh] max-w-full object-contain"
          />
        </button>
      ) : null}

      <HomeTestimonialsSection slides={HOME_TESTIMONIAL_SLIDES} />

      <section className="bg-mf-accent py-20 text-center">
        <h2 className="font-display text-[min(3rem,1rem+2.22vw)] font-normal uppercase text-mf-black">
          Let&apos;s Connect
        </h2>
        <p className="mx-auto mt-4 max-w-xl px-[4vw] font-sans text-sm leading-relaxed text-mf-muted">
          We look forward to hearing from you and helping you create memories that will last a
          lifetime.
        </p>
        <Link
          to="/contact/"
          className="mt-8 inline-block bg-mf-btn px-10 py-3 text-[0.625rem] font-medium uppercase tracking-[0.1em] text-white hover:bg-mf-btn-hover"
        >
          Get in touch
        </Link>
      </section>
    </>
  )
}
