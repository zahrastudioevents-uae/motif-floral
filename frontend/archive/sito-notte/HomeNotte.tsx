import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { img } from '../lib/assets'

const HERO_IMAGE = img(
  '/site/2qZExp/jQnrro/Home_Palazzo_Shedir_Roma_candlelight_dinner_Motif_Floral-fbd3a536-1500.jpg',
)
const SPLIT_IMAGE = img(
  '/site/2qZExp/QaYPKb/Home_palazzo_shedir_vilon_Imperial_table_candles_fabric_ancient_villa-647ef63b-1500.jpg',
)
const CTA_IMAGE = img(
  '/site/2qZExp/3vdn63/Villa-Astor-Editorial-Haute-Weddings-113-a3126e19-1500.jpg',
)

const PRESS_SVGS = [
  { src: '/images/press/vogue.svg', alt: 'Vogue' },
  { src: '/images/press/elle.svg', alt: 'Elle' },
  { src: '/images/press/junebug-weddings.svg', alt: 'Junebug Weddings' },
  { src: '/images/press/the-wed.svg', alt: 'The Wed' },
  { src: '/images/press/the-antibride.svg', alt: 'The Antibride' },
  { src: '/images/press/wedvibes-media.svg', alt: 'Wedvibes Media' },
]

const PROCESS_LINKS = [
  { to: '/portfolio/', label: 'Destination weddings', num: 'I' },
  { to: '/portfolio/', label: 'Intimate weddings & elopements', num: 'II' },
  { to: '/portfolio/', label: 'Events & editorials', num: 'III' },
  { to: '/mfaccessori/', label: 'MF embroidered accessories', num: 'IV' },
]

const STRIP_CARDS = [
  {
    src: img('/site/2qZExp/rX0AAV/Wedding-portfolio-cover-villa-clara-calla-lilies-dark-purple-8b18a390-1500.jpg'),
    label: 'Villa Clara',
    num: '01',
  },
  {
    src: img('/site/2qZExp/8L3l5Q/Wedding-portfolio-villa-modern-bride-dark-6112505d-1500.jpg'),
    label: 'Modern bride',
    num: '02',
  },
  {
    src: img('/site/2qZExp/m5yODj/Editorial_Coppede_ElisaRinaldi_ph1-aff54d9a-1500.jpg'),
    label: 'Coppede editorial',
    num: '03',
  },
  {
    src: img('/site/2qZExp/xZlAAR/choose-your-bouquet-calla-lilies-violet-burgundy-annika-annikamaria-3601eb52-1500.jpg'),
    label: 'Calla study',
    num: '04',
  },
  {
    src: img('/site/2qZExp/K7rO41/Home-bouquet-violet-burgundy-bouquet--77aada7f-1500.jpg'),
    label: 'Violet bouquet',
    num: '05',
  },
  {
    src: img('/site/2qZExp/JMzQ0p/PalazzoVilonRoma-183-e7efc586-1500.jpg'),
    label: 'Palazzo Vilon',
    num: '06',
  },
  {
    src: img('/site/2qZExp/LDAkkD/BE_Wedding_ElisaRinaldi_Ph-529-c352f43b-1500.jpg'),
    label: 'BE wedding',
    num: '07',
  },
]

/** Reveal-on-scroll for elements marked with .rv2 */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const root = ref.current
    if (!root) return
    const els = root.querySelectorAll('.rv2')
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('rv2-on')
            io.unobserve(e.target)
          }
        }),
      { threshold: 0.1 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
  return ref
}

const eyebrow =
  'font-sans text-[0.6rem] font-light uppercase tracking-[0.34em] text-mf-brass'

export function Home2() {
  const ref = useReveal()

  return (
    <div ref={ref} className="bg-mf-night text-mf-ivory">
      <Seo
        title="Motif Floral – Atelier Notturno"
        description="Bespoke florals for weddings and events in the great villas and palazzos of Italy. Romantic, painterly, unhurried."
      />

      {/* HERO */}
      <header className="relative flex min-h-[100svh] items-end overflow-hidden">
        <img
          src={HERO_IMAGE}
          alt="Candlelight dinner at Palazzo Shedir, Rome"
          className="animate-mf-luxury-fade absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-mf-night/95 via-mf-night/35 to-mf-night/25" />
        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-[4vw] pb-[clamp(3rem,8vh,6rem)]">
          <p className={`${eyebrow} animate-mf-rise`}>Floral atelier, Rome</p>
          <h1 className="animate-mf-rise-delay mt-6 font-cormorant text-[clamp(3rem,6.4vw,6.4rem)] font-light leading-[1.04] text-mf-ivory">
            Flowers composed <i className="italic text-mf-brass">like candlelight</i>
          </h1>
          <div className="animate-mf-rise-delay-2 mt-10 flex flex-wrap items-end justify-between gap-10">
            <p className="max-w-[38ch] font-sans text-[0.92rem] font-extralight leading-8 text-mf-ivory/60">
              Bespoke florals for weddings and events in the great villas and palazzos of
              Italy. Romantic, painterly, unhurried.
            </p>
            <div className="flex flex-wrap gap-5">
              <Link
                to="/getquote/"
                className="bg-mf-ivory px-11 py-4 font-sans text-[0.62rem] font-normal uppercase tracking-[0.32em] text-mf-night transition-opacity hover:opacity-85"
              >
                Begin your vision
              </Link>
              <Link
                to="/portfolio/"
                className="border border-mf-ivory/50 px-11 py-4 font-sans text-[0.62rem] font-normal uppercase tracking-[0.32em] text-mf-ivory transition-colors hover:border-mf-ivory hover:bg-mf-ivory/10"
              >
                Portfolio
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* PRESS */}
      <div className="overflow-hidden border-y border-mf-ivory/15 bg-mf-night-2 py-7">
        <div className="animate-mf-marquee flex w-max min-w-max items-center gap-[clamp(3rem,7vw,7rem)] px-8">
          {[...PRESS_SVGS, ...PRESS_SVGS].map((logo, i) => (
            <img
              key={`${logo.src}-${i}`}
              src={logo.src}
              alt={i < PRESS_SVGS.length ? logo.alt : ''}
              className="h-5 w-auto object-contain opacity-50 grayscale invert"
              loading="lazy"
            />
          ))}
        </div>
      </div>

      {/* MANIFESTO */}
      <section className="rv2 px-[4vw] py-[clamp(6rem,12vw,10rem)] text-center">
        <div className="mx-auto h-16 w-px bg-mf-brass opacity-70" />
        <p className={`${eyebrow} mt-8`}>The Motif belief</p>
        <h2 className="mx-auto mt-6 max-w-[34ch] font-cormorant text-[clamp(1.8rem,3.6vw,3.3rem)] font-light leading-[1.45]">
          Every villa has its own light. We design flowers that belong to it,{' '}
          <i className="italic text-mf-brass">as if they had always been there.</i>
        </h2>
      </section>

      {/* SPLIT */}
      <section className="rv2 grid min-h-[88vh] md:grid-cols-2">
        <div className="relative aspect-[4/5] overflow-hidden md:aspect-auto">
          <img
            src={SPLIT_IMAGE}
            alt="Imperial table with candles in an ancient villa"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out hover:scale-[1.04]"
            loading="lazy"
          />
        </div>
        <div className="flex flex-col justify-center bg-mf-night-2 p-[clamp(2.6rem,6vw,6rem)]">
          <p className={eyebrow}>The Motif process</p>
          <h3 className="mt-6 font-cormorant text-[clamp(2rem,3.2vw,3.2rem)] font-light leading-[1.15]">
            Designed like a composition, delivered like a luxury experience
          </h3>
          <p className="mt-7 max-w-[46ch] font-sans text-[0.92rem] font-extralight leading-8 text-mf-ivory/60">
            From the first moodboard to the last candle lit, one atelier follows your
            celebration. Palette, vessels, textiles and scent, considered together.
          </p>
          <div className="mt-10 border-t border-mf-ivory/15">
            {PROCESS_LINKS.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                className="flex items-center justify-between border-b border-mf-ivory/15 py-5 font-sans text-[0.66rem] font-light uppercase tracking-[0.3em] text-mf-ivory/60 transition-all duration-300 hover:pl-2.5 hover:text-mf-brass"
              >
                <span>{l.label}</span>
                <span className="text-mf-brass">{l.num}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO STRIP */}
      <section>
        <div className="rv2 mx-auto flex max-w-[1440px] flex-wrap items-end justify-between gap-8 px-[4vw] pb-12 pt-[clamp(5rem,9vw,8rem)]">
          <div>
            <p className={eyebrow}>Selected work</p>
            <h2 className="mt-5 font-cormorant text-[clamp(2.2rem,4vw,4rem)] font-light leading-[1.1]">
              A living portfolio of detail and scale
            </h2>
          </div>
          <Link
            to="/portfolio/"
            className="border border-mf-ivory/50 px-11 py-4 font-sans text-[0.62rem] font-normal uppercase tracking-[0.32em] text-mf-ivory transition-colors hover:border-mf-ivory hover:bg-mf-ivory/10"
          >
            Full portfolio
          </Link>
        </div>
        <div className="rv2 flex snap-x snap-mandatory gap-[clamp(14px,1.6vw,22px)] overflow-x-auto px-[4vw] pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {STRIP_CARDS.map((c) => (
            <figure key={c.num} className="group w-[clamp(240px,26vw,360px)] shrink-0 snap-start">
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={c.src}
                  alt={c.label}
                  className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <figcaption className="mt-4 flex justify-between font-sans text-[0.54rem] font-light uppercase tracking-[0.3em] text-mf-ivory/60">
                <span>{c.label}</span>
                <span className="text-mf-brass">{c.num}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="px-[4vw] pt-4 text-right font-sans text-[0.54rem] font-light uppercase tracking-[0.3em] text-mf-ivory/60">
          Scroll sideways
        </p>
      </section>

      {/* QUOTE */}
      <section className="rv2 mt-[clamp(5rem,9vw,8rem)] bg-mf-night-2 px-[4vw] py-[clamp(6rem,11vw,9rem)] text-center">
        <span className="font-sans text-[0.7rem] tracking-[0.5em] text-mf-brass">★★★★★</span>
        <blockquote className="mx-auto mt-8 max-w-[46ch] font-cormorant text-[clamp(1.5rem,2.8vw,2.5rem)] font-light italic leading-[1.6]">
          "Flaminia, Roberta and their team are true artisans and experts at their craft.
          My bouquet, ceremony arrangements and tablescapes were more beautiful than I
          imagined."
        </blockquote>
        <cite className="mt-10 block font-sans text-[0.58rem] font-light not-italic uppercase tracking-[0.34em] text-mf-brass">
          Attallah &amp; Drew, destination wedding
        </cite>
      </section>

      {/* CTA */}
      <section className="relative flex h-[clamp(520px,88vh,820px)] items-center justify-center overflow-hidden text-center">
        <img
          src={CTA_IMAGE}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-mf-night/65" />
        <div className="rv2 relative z-10 px-[6vw]">
          <p className={eyebrow}>Currently booking 2027</p>
          <h2 className="mt-5 font-cormorant text-[clamp(2.6rem,6vw,5.6rem)] font-light leading-[1.1] text-mf-ivory">
            Let us light <i className="italic text-mf-brass">your evening</i>
          </h2>
          <p className="mt-6 font-sans text-[0.66rem] font-light uppercase tracking-[0.3em] text-mf-ivory/60">
            Destination weddings, intimate weddings, elopements, events
          </p>
          <Link
            to="/contact/"
            className="mt-12 inline-block bg-mf-ivory px-12 py-4 font-sans text-[0.62rem] font-normal uppercase tracking-[0.32em] text-mf-night transition-opacity hover:opacity-85"
          >
            Contact the atelier
          </Link>
        </div>
      </section>
    </div>
  )
}
