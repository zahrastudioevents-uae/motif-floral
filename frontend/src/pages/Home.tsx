import { Link } from 'react-router-dom'
import { GRID_SIZES, srcSetFor } from '../lib/assets'
import { HeroSlideshow } from '../components/HeroSlideshow'
import { HomeTestimonialsSection } from '../components/HomeTestimonialsSection'
import { Seo } from '../components/Seo'
import { faqSchema, graph, webPage } from '../lib/structuredData'
import {
  GALLERY_IMAGES,
  HOME_HERO_SLIDES,
  HOME_TESTIMONIAL_SLIDES,
  HOME_TILES,
  LETS_CONNECT_BG,
} from '../data/home'
import { GALLERY_MOTIF } from '../data/galleryMotif'
import { MOTIF_PROCESS_IMAGE, SERVICE_STORIES } from '../data/motifProcess'
import { PRESS_LOGOS, pressLogoMarqueeClasses } from '../data/press'

/** New "mf" shoot photos first, then the existing selected-work images. */
const SELECTED_WORK_IMAGES = [...GALLERY_MOTIF, ...GALLERY_IMAGES]

const BOOKING_HEADLINE_WORDS = 'Currently booking 2027 events'.split(' ')

const BOOKING_SEGMENTS = [
  'Destination weddings',
  'Intimate weddings',
  'Elopements',
  'Events',
] as const

export function Home() {

  return (
    <>
      <Seo
        title="Wedding & Event Floral Design in Italy | Motif Floral"
        description="Bespoke floral design for weddings and events across Italy and the UAE. Based in Rome, founded 2018. Featured in Vogue, Elle and Style Me Pretty."
        jsonLd={graph(
          webPage(
            'Motif Floral, wedding and event floral design in Italy',
            '/',
            'Bespoke floral design for weddings and events across Italy and the UAE.',
          ),
          faqSchema,
        )}
      />
      <div className="relative">
        <HeroSlideshow
          slides={HOME_HERO_SLIDES}
          primaryCta={{ to: '/getquote/', label: 'Begin your vision together' }}
        />
      </div>

      <section className="bg-mf-white px-[4vw] py-8 text-center md:py-10">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-normal uppercase leading-[1.12] tracking-wide text-mf-black">
            <span className="mb-4 block font-sans text-[0.6rem] font-light tracking-[0.28em] text-mf-muted md:mb-5 md:text-[0.62rem]">
              Italy based floral atelier,
            </span>
            <span className="font-display text-[min(3.05rem,1.1rem+4.5vw)]">
              Floral atmospheres for unforgettable days
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl font-sans text-[0.8125rem] font-light leading-[1.85] text-mf-muted md:text-[0.875rem]">
            Bespoke weddings and event florals shaped with an editorial eye,
            <br />
            romantic restraint and a deep sense of place.
          </p>
        </div>
      </section>

      <section className="overflow-hidden bg-mf-white pb-8 pt-2 md:pb-10">
        <p className="text-center font-sans text-[0.6875rem] font-light uppercase tracking-[0.28em] text-mf-muted">
          Featured in
        </p>
        <div className="mt-5 flex overflow-hidden border-y border-mf-muted/10 py-5 md:py-6">
          <div className="animate-mf-marquee flex min-w-max items-center gap-[3.75rem] px-8 md:gap-24 lg:gap-28">
            {[...PRESS_LOGOS, ...PRESS_LOGOS].map((logo, index) => (
              <img
                key={`${logo.src}-${index}`}
                src={logo.src}
                alt={logo.alt}
                className={pressLogoMarqueeClasses(logo)}
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-mf-white">
        <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-[3px] px-[4vw] pt-8 pb-6 md:grid-cols-3 md:gap-[3px] md:pt-10 md:pb-8">
          {HOME_TILES.map((t) => (
            <Link
              key={t.to}
              to={t.to}
              className="group relative block aspect-[3/4] w-full overflow-hidden no-underline"
            >
              <img
                src={t.image}
                srcSet={srcSetFor(t.image)}
                sizes={GRID_SIZES}
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

      <section className="bg-mf-white px-[4vw] py-8 text-center md:py-10">
        <div className="mx-auto flex max-w-[1500px] flex-col items-center gap-6 md:gap-8">
          <div className="flex flex-wrap justify-center gap-x-[0.42em] gap-y-1 font-sans text-[14px] font-light uppercase leading-snug tracking-[0.14em] text-mf-black sm:text-[15px]">
            {BOOKING_HEADLINE_WORDS.map((word, i) => (
              <span
                key={`${word}-${i}`}
                className="animate-mf-wave-y inline-block"
                style={{ animationDelay: `${i * 105}ms` }}
              >
                {word}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-x-2 gap-y-2 font-sans text-[12px] font-light uppercase leading-snug tracking-[0.18em] text-mf-muted sm:text-[13px] md:text-[14px] md:tracking-[0.2em]">
            {BOOKING_SEGMENTS.map((segment, i) => (
              <span key={segment} className="inline-flex items-center gap-x-3 sm:gap-x-4">
                <span
                  className="animate-mf-wave-y inline-block"
                  style={{
                    animationDelay: `${(BOOKING_HEADLINE_WORDS.length + i) * 105}ms`,
                  }}
                >
                  {segment}
                </span>
                {i < BOOKING_SEGMENTS.length - 1 ? (
                  <span className="text-mf-muted/45" aria-hidden>
                    |
                  </span>
                ) : null}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1500px] items-stretch gap-12 px-[4vw] pb-16 pt-4 md:grid-cols-[1fr_0.92fr] md:pb-24 md:pt-10">
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-mf-accent md:aspect-auto md:min-h-0 md:h-full">
          <img
            src={MOTIF_PROCESS_IMAGE}
            alt=""
            className="h-full w-full object-cover object-[center_42%] md:absolute md:inset-0 md:h-full md:w-full"
            loading="lazy"
          />
          <div className="pointer-events-none absolute inset-5 border border-white/45" />
        </div>

        <div>
          <p className="font-sans text-[0.6875rem] font-light uppercase tracking-[0.28em] text-mf-muted">
            The Motif process
          </p>
          <h2 className="mt-4 font-display text-[min(3.4rem,1.5rem+3vw)] font-normal uppercase leading-tight text-mf-black">
            Designed like a composition, delivered like a luxury experience.
          </h2>
          <div className="mt-5 divide-y divide-mf-muted/15 md:mt-10">
            {SERVICE_STORIES.map((item) => (
              <button
                key={item.title}
                type="button"
                className="group grid w-full grid-cols-[40px_1fr] items-baseline gap-2 border-0 bg-transparent py-3 text-left md:grid-cols-[90px_1fr] md:items-start md:gap-5 md:py-8"
              >
                <span className="font-display text-lg text-mf-black/60 transition-colors group-hover:text-mf-black md:text-3xl">
                  {item.eyebrow}
                </span>
                <span>
                  <span className="block font-sans text-[1rem] font-light uppercase tracking-[0.18em] text-mf-black">
                    {item.title}
                  </span>
                  <span className="mt-1 block max-w-xl font-sans text-[0.875rem] font-light leading-[1.5] text-mf-muted md:mt-3 md:leading-[1.9]">
                    {item.text}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-mf-accent px-[4vw] py-16 pb-14 md:py-20 md:pb-16">
        <div className="mx-auto max-w-[1500px]">
          <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between md:gap-12">
            <div className="text-left">
              <p className="font-sans text-[0.6875rem] font-light uppercase tracking-[0.28em] text-mf-muted">
                Selected work
              </p>
              <h2 className="mt-5 font-display text-[min(3.65rem,1.55rem+3.45vw)] font-normal uppercase leading-[1.06] tracking-[0.04em] text-mf-black md:tracking-[0.05em]">
                <span className="block">A living portfolio of</span>
                <span className="block">Detail and scale.</span>
              </h2>
            </div>
            <Link to="/portfolio/" className="mf-cta mf-cta-dark shrink-0 self-start md:self-end">
              Full portfolio
            </Link>
          </div>
        </div>

        <div className="mx-auto mt-12 grid max-w-[1500px] grid-cols-2 gap-4 md:mt-14 md:grid-cols-3 md:gap-5">
          {SELECTED_WORK_IMAGES.map((photo) => (
            <figure
              key={photo.src}
              className="m-0 overflow-hidden"
              style={{ backgroundColor: photo.tone }}
            >
              <img
                src={photo.src}
                srcSet={srcSetFor(photo.src)}
                sizes={GRID_SIZES}
                alt={photo.alt}
                className="aspect-[2/3] w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </figure>
          ))}
        </div>
      </section>


      <HomeTestimonialsSection slides={HOME_TESTIMONIAL_SLIDES} />

      <section
        className="relative flex min-h-[min(72vh,44rem)] flex-col bg-cover bg-center text-white md:min-h-[min(78vh,52rem)] lg:min-h-[min(82vh,56rem)]"
        style={{ backgroundImage: `url(${LETS_CONNECT_BG})` }}
      >
        <div className="absolute inset-0 bg-black/40" />
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
