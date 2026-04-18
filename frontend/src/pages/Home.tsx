import { useState } from 'react'
import { Link } from 'react-router-dom'
import { HeroSlideshow } from '../components/HeroSlideshow'
import { HomeTestimonialsSection } from '../components/HomeTestimonialsSection'
import { Seo } from '../components/Seo'
import {
  GALLERY_IMAGES,
  HOME_HERO_SLIDES,
  HOME_TESTIMONIAL_SLIDES,
  HOME_TILES,
  LETS_CONNECT_BG,
  OUR_SERVICES_IMAGE,
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
        <HeroSlideshow slides={HOME_HERO_SLIDES} />
      </div>

      <section className="bg-mf-white">
        <div className="mx-auto max-w-[1500px] px-[4vw] pt-12 pb-10 text-center md:pt-14 md:pb-12">
          <p className="font-sans text-[15px] font-light uppercase tracking-[0.15em] text-mf-black">
            Currently booking 2027 & 2028 events
          </p>
          <p className="mt-1.5 font-sans text-[15px] font-light uppercase tracking-[0.15em] text-mf-muted">
            Destination weddings | Intimate weddings | Elopements | Events
          </p>
        </div>
        <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-[3px] px-[4vw] pb-16 md:grid-cols-3 md:gap-[3px]">
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
        <p className="text-center font-sans text-[15px] font-light uppercase tracking-[0.22em] text-mf-muted">
          FEATURED IN
        </p>
        <div className="mx-auto mt-10 flex max-w-[1400px] flex-wrap items-center justify-center gap-x-8 gap-y-10 px-[4vw] md:mt-12 md:gap-x-12 md:gap-y-8">
          {PRESS_LOGOS.map((logo, idx) => {
            const isLarger = idx === 2 || idx === 3
            return (
              <img
                key={logo.src}
                src={logo.src}
                alt={logo.alt}
                className={
                  isLarger
                    ? 'h-[5.5rem] w-auto max-w-[min(340px,88vw)] object-contain opacity-90 md:h-[6.75rem] md:max-w-[min(420px,42vw)] lg:h-[7.25rem]'
                    : 'h-9 w-auto max-w-[min(150px,32vw)] object-contain opacity-90 md:h-11'
                }
                loading="lazy"
              />
            )
          })}
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-[4vw] py-16 md:py-20">
        <h2 className="text-center font-sans text-[min(2.25rem,1rem+1.2vw)] font-extralight uppercase tracking-[0.08em] text-mf-black">
          Our services
        </h2>
        <div className="mt-12 grid gap-12 md:grid-cols-[1fr_auto]">
          <div className="space-y-8 md:space-y-9">
            <div>
              <h3 className="font-sans text-[1.1rem] font-light uppercase tracking-[0.12em] text-mf-black">
                Full wedding floral design
              </h3>
              <h4 className="mt-1 font-sans text-[0.75rem] font-light uppercase tracking-[0.1em] text-mf-muted">
                &amp; Destination weddings
              </h4>
              <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-1">
                <div>
                  <p className="mb-2 font-sans text-[0.6875rem] font-medium uppercase tracking-[0.1em] text-mf-black">Ceremony:</p>
                  <ul className="space-y-1 font-sans text-[0.8125rem] leading-relaxed text-mf-muted">
                    <li>Ceremony arch</li>
                    <li>Aisle d&eacute;cor</li>
                    <li>Altar/backdrop installations</li>
                  </ul>
                  <p className="mb-2 mt-4 font-sans text-[0.6875rem] font-medium uppercase tracking-[0.1em] text-mf-black">Personal Flowers:</p>
                  <ul className="space-y-1 font-sans text-[0.8125rem] leading-relaxed text-mf-muted">
                    <li>Bridal bouquet</li>
                    <li>Bridesmaid bouquets</li>
                    <li>Boutonnieres &amp; corsages</li>
                    <li>Flower girl petals</li>
                  </ul>
                </div>
                <div>
                  <p className="mb-2 font-sans text-[0.6875rem] font-medium uppercase tracking-[0.1em] text-mf-black">Cocktail Hour:</p>
                  <ul className="space-y-1 font-sans text-[0.8125rem] leading-relaxed text-mf-muted">
                    <li>Cocktail tables</li>
                    <li>Bar and buffet florals</li>
                  </ul>
                  <p className="mb-2 mt-4 font-sans text-[0.6875rem] font-medium uppercase tracking-[0.1em] text-mf-black">Reception:</p>
                  <ul className="space-y-1 font-sans text-[0.8125rem] leading-relaxed text-mf-muted">
                    <li>Table centerpieces</li>
                    <li>Backdrop arrangements</li>
                    <li>Cake table &amp; dessert displays</li>
                    <li>Lounge area floral styling</li>
                  </ul>
                </div>
              </div>
            </div>

            <hr className="border-mf-accent" />

            <div className="space-y-8">
              <div>
                <h3 className="font-sans text-[1.05rem] font-light uppercase leading-snug tracking-[0.12em] text-mf-black md:text-[1.1rem]">
                  Intimate weddings &amp; elopements
                </h3>
                <p className="mt-0.5 font-sans text-[0.7rem] font-light uppercase tracking-[0.1em] text-mf-muted md:text-[0.75rem]">
                  Intimate Weddings | Micro Weddings | Elopements
                </p>
                <p className="mt-3 font-sans text-[0.8125rem] font-normal leading-relaxed text-mf-muted">
                  Ceremony, personal flowers, dinner decorations, centerpieces, romantic setups
                </p>
              </div>
              <div>
                <h3 className="font-sans text-[1.05rem] font-light uppercase leading-snug tracking-[0.12em] text-mf-black md:text-[1.1rem]">
                  Rentals &amp; decorative styling
                </h3>
                <p className="mt-3 font-sans text-[0.8125rem] font-normal leading-relaxed text-mf-muted">
                  Vases, candelabras, accessories, candles, linens, backdrops, styling fabrics
                </p>
              </div>
            </div>

            <hr className="border-mf-accent" />

            <div>
              <h3 className="font-sans text-[1.1rem] font-light uppercase tracking-[0.12em] text-mf-black">
                Events &amp; corporate
              </h3>
              <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-1">
                <div>
                  <p className="mb-2 font-sans text-[0.6875rem] font-medium uppercase tracking-[0.1em] text-mf-black">Events:</p>
                  <ul className="space-y-1 font-sans text-[0.8125rem] leading-relaxed text-mf-muted">
                    <li>Private parties &amp; Celebrations</li>
                    <li>Tablescapes &amp; Dinner Styling</li>
                    <li>Galas &amp; Luxury arrangements</li>
                    <li>Installations &amp; Arches</li>
                    <li>Suspended florals</li>
                    <li>Holiday styling &amp; Seasonal D&eacute;cor</li>
                  </ul>
                </div>
                <div>
                  <p className="mb-2 font-sans text-[0.6875rem] font-medium uppercase tracking-[0.1em] text-mf-black">Corporate:</p>
                  <ul className="space-y-1 font-sans text-[0.8125rem] leading-relaxed text-mf-muted">
                    <li>Galas &amp; Corporate events</li>
                    <li>Fashion shows &amp; Runways</li>
                    <li>Product Launches &amp; Brand activations</li>
                    <li>Creative set styling &amp; direction</li>
                    <li>Floral sets for campaigns &amp; photoshoots</li>
                    <li>Large-scale installations &amp; immersive d&eacute;cor</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden md:block">
            <img
              src={OUR_SERVICES_IMAGE}
              alt="Floral styling detail"
              className="sticky top-24 h-auto w-[320px] object-cover lg:w-[380px]"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section className="bg-mf-accent py-16 md:py-20">
        <h2 className="text-center font-sans text-[min(2.25rem,1rem+1.2vw)] font-extralight uppercase tracking-[0.08em] text-mf-black">
          Selected works
        </h2>
        <div className="mx-auto mt-10 max-w-[1500px] columns-2 gap-4 px-[4vw] md:columns-3 md:gap-5">
          {GALLERY_IMAGES.map((src) => (
            <button
              key={src}
              type="button"
              className="mb-3 block w-full overflow-hidden border-0 p-0 break-inside-avoid md:mb-4"
              onClick={() => setLightbox(src)}
            >
              <img
                src={src}
                alt=""
                className="w-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to="/portfolio/" className="mf-cta mf-cta-dark">
            View portfolio
          </Link>
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

      <section
        className="relative flex min-h-[min(72vh,44rem)] flex-col bg-cover bg-center text-white md:min-h-[min(78vh,52rem)] lg:min-h-[min(82vh,56rem)]"
        style={{ backgroundImage: `url(${LETS_CONNECT_BG})` }}
      >
        <div className="relative z-10 mx-auto mb-16 mt-auto flex w-full max-w-[1500px] flex-col gap-8 px-[4vw] pb-5 pt-16 md:mb-24 md:flex-row md:items-end md:justify-between md:gap-12 md:pb-6 md:pt-20 lg:mb-28 lg:pb-7">
          <div className="max-w-xl text-left">
            <h2 className="font-display text-[min(3.5rem,1.4rem+2.3vw)] font-normal uppercase tracking-wide">
              Let&apos;s Connect
            </h2>
            <p className="mt-4 font-sans text-[0.6875rem] font-light uppercase leading-relaxed tracking-[0.15em] text-white/90 md:mt-5 md:text-[0.75rem] md:tracking-[0.18em]">
              We look forward to hearing from you and helping you create memories that will last
              a lifetime.
            </p>
          </div>
          <Link
            to="/contact/"
            className="mf-cta mf-cta-light shrink-0 self-start md:self-end"
          >
            Contact us
          </Link>
        </div>
      </section>
    </>
  )
}
