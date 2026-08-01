import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { img } from '../lib/assets'

const GATHER_IMAGES = [
  {
    src: img('/site/2qZExp/K7rO41/Home-bouquet-violet-burgundy-bouquet--77aada7f-1500.jpg'),
    caption: 'violet & burgundy',
  },
  {
    src: img('/site/2qZExp/0Pr45o/choose-your-bouquet-violet-dhalias-dalias-cosmos-7f725976-1500.jpg'),
    caption: 'dahlias & cosmos',
  },
  {
    src: img('/site/2qZExp/xZlAAR/choose-your-bouquet-calla-lilies-violet-burgundy-annika-annikamaria-3601eb52-1500.jpg'),
    caption: 'calla lilies',
  },
]

const SERVICES = [
  {
    num: 'I',
    title: 'Destination weddings',
    text: 'Full floral direction for celebrations across Italy, from the ceremony to the last candle.',
    to: '/portfolio/',
  },
  {
    num: 'II',
    title: 'Bouquets',
    text: 'Hand tied in our Rome atelier, painterly palettes pressed into a single gesture.',
    to: '/chooseyourbouquet/',
  },
  {
    num: 'III',
    title: 'MF accessories',
    text: 'Silk ribbons hand embroidered with Miyuki beads, keepsakes that outlive the day.',
    to: '/mfaccessori/',
  },
]

const FOLIO = [
  {
    src: img('/site/2qZExp/m5yODj/Editorial_Coppede_ElisaRinaldi_ph1-aff54d9a-1500.jpg'),
    label: 'Coppede editorial',
  },
  {
    src: img('/site/2qZExp/rX0AAV/Wedding-portfolio-cover-villa-clara-calla-lilies-dark-purple-8b18a390-1500.jpg'),
    label: 'Villa Clara',
  },
  {
    src: img('/site/2qZExp/q5wA9o/choose-your-bouquet-violet-peach-cafe-au-lait-dhalias-roses-c6712533-1500.JPG'),
    label: 'Cafe au lait',
  },
  {
    src: img('/site/2qZExp/5yKppe/Home_tuscany_wedding_centerpiece_peach_orange_pink_imperial_table-d9cac71b-1500.jpg'),
    label: 'Tuscany table',
  },
  {
    src: img('/site/2qZExp/JMzQ0p/PalazzoVilonRoma-183-e7efc586-1500.jpg'),
    label: 'Palazzo Vilon',
  },
  {
    src: img('/site/2qZExp/QaYKx0/AlysonScott-274-a3bc0df8-1500.jpg'),
    label: 'Villa Aurelia',
  },
]

function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const root = ref.current
    if (!root) return
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
    root.querySelectorAll('.rv2').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
  return ref
}

const eyebrow =
  'font-sans text-[0.6rem] font-light uppercase tracking-[0.34em] text-mf-violet'

export function Home3() {
  const ref = useReveal()

  return (
    <div ref={ref} className="bg-mf-terra text-mf-cream">
      <Seo
        title="Motif Floral – Italian Floral Designer"
        description="Bespoke floral design for weddings and events in Italy. The Motif Floral atelier, Rome."
      />

      {/* HERO "mimetico" (opzione 3, gradiente e grana): il logo e un PNG
          ritagliato (fiori e scritte, bordi morbidi) su un gradiente caldo nei
          toni del logo, con una grana materica sottile. */}
      <header className="relative flex min-h-[100svh] flex-col items-center justify-start overflow-hidden px-[4vw] pb-10 pt-[145px]">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, #7c5c3c 0%, #684826 46%, #4a3015 100%)',
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-50 mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='240' height='240' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")",
          }}
        />
        <img
          src="/images/logo-motif-cutout.png"
          alt="Motif Floral, italian floral designer"
          className="animate-mf-luxury-fade relative w-[min(76vw,430px)]"
        />
        <p className="animate-mf-rise-delay relative z-10 -mt-8 max-w-[44ch] text-center font-sans text-[0.85rem] font-extralight leading-8 text-mf-cream/85">
          Bespoke floral design for weddings and events in Italy. Composed in Rome,
          gathered like a bouquet of violets.
        </p>
        <div className="animate-mf-rise-delay-2 relative z-10 mt-9 flex flex-wrap justify-center gap-5">
          <Link
            to="/getquote/"
            className="bg-mf-cream px-11 py-4 font-sans text-[0.62rem] font-normal uppercase tracking-[0.32em] text-mf-terra-2 transition-opacity hover:opacity-85"
          >
            Begin your vision
          </Link>
          <Link
            to="/portfolio/"
            className="border border-mf-cream/50 px-11 py-4 font-sans text-[0.62rem] font-normal uppercase tracking-[0.32em] text-mf-cream transition-colors hover:border-mf-cream hover:bg-mf-cream/10"
          >
            Portfolio
          </Link>
        </div>
        <span className="relative z-10 mt-10 font-script text-[1.3rem] text-mf-cream/60">
          scroll
        </span>
      </header>

      {/* STATEMENT */}
      <section className="rv2 border-t border-mf-cream/15 px-[4vw] py-[clamp(5rem,10vw,8.5rem)] text-center">
        <p className="font-script text-[clamp(1.6rem,2.6vw,2.4rem)] text-mf-violet">
          italian floral designer
        </p>
        <h2 className="mx-auto mt-5 max-w-[26ch] font-display text-[clamp(2rem,4vw,3.8rem)] font-normal leading-[1.25] text-mf-black normal-case">
          flowers pressed into memory, like a page from an old herbarium
        </h2>
      </section>

      {/* GATHERED: three botanical studies */}
      <section className="bg-mf-cream py-[clamp(4.5rem,8vw,7rem)] text-mf-terra-2">
        <div className="mx-auto max-w-[1400px] px-[4vw]">
          <div className="rv2 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-sans text-[0.6rem] font-light uppercase tracking-[0.34em] text-mf-terra">
                The gathering
              </p>
              <h2 className="mt-4 font-display text-[clamp(1.9rem,3.2vw,3.1rem)] font-normal leading-[1.15] normal-case">
                studies in violet
              </h2>
            </div>
            <p className="font-script text-[1.5rem] text-mf-terra/70">from the atelier table</p>
          </div>
          <div className="mt-12 grid gap-[clamp(16px,2.4vw,30px)] md:grid-cols-3">
            {GATHER_IMAGES.map((g, i) => (
              <figure key={g.src} className={`rv2 group ${i === 1 ? 'md:translate-y-10' : ''}`}>
                <div className="overflow-hidden border border-mf-terra/25 bg-white p-2.5 pb-0">
                  <img
                    src={g.src}
                    alt={g.caption}
                    className="aspect-[3/4] w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                  <figcaption className="py-3 text-center font-script text-[1.25rem] text-mf-terra">
                    {g.caption}
                  </figcaption>
                </div>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="mx-auto max-w-[1400px] px-[4vw] py-[clamp(5rem,9vw,8rem)]">
        <p className={`${eyebrow} rv2 text-center`}>What we compose</p>
        <div className="mt-12 grid gap-12 md:grid-cols-3 md:gap-8">
          {SERVICES.map((s) => (
            <Link key={s.num} to={s.to} className="rv2 group block border-t border-mf-cream/25 pt-7">
              <span className="font-display text-[2.2rem] text-mf-violet">{s.num}</span>
              <h3 className="mt-4 font-display text-[1.6rem] font-normal leading-tight text-mf-black normal-case">
                {s.title}
              </h3>
              <p className="mt-4 font-sans text-[0.85rem] font-extralight leading-7 text-mf-cream/75">
                {s.text}
              </p>
              <span className="mt-6 inline-block border-b border-mf-cream/40 pb-1 font-sans text-[0.6rem] uppercase tracking-[0.3em] text-mf-cream transition-colors group-hover:border-mf-violet group-hover:text-mf-violet">
                Discover
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* PORTFOLIO on deep brown */}
      <section className="bg-mf-terra-2 py-[clamp(5rem,9vw,8rem)]">
        <div className="mx-auto max-w-[1400px] px-[4vw]">
          <div className="rv2 flex flex-wrap items-end justify-between gap-6">
            <h2 className="font-display text-[clamp(2rem,3.6vw,3.6rem)] font-normal leading-[1.12] text-mf-black normal-case">
              a living portfolio<br />of detail and scale
            </h2>
            <Link
              to="/portfolio/"
              className="border border-mf-cream/50 px-10 py-4 font-sans text-[0.6rem] uppercase tracking-[0.32em] text-mf-cream transition-colors hover:border-mf-cream hover:bg-mf-cream/10"
            >
              Full portfolio
            </Link>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-[clamp(12px,2vw,26px)] md:grid-cols-3">
            {FOLIO.map((f) => (
              <figure key={f.src} className="rv2 group">
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={f.src}
                    alt={f.label}
                    className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <figcaption className="mt-3 text-center font-script text-[1.15rem] text-mf-cream/75">
                  {f.label}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section className="rv2 px-[4vw] py-[clamp(5.5rem,10vw,8.5rem)] text-center">
        <p className="font-script text-[1.6rem] text-mf-violet">kind words</p>
        <blockquote className="mx-auto mt-6 max-w-[44ch] font-display text-[clamp(1.5rem,2.7vw,2.5rem)] font-normal leading-[1.5] text-mf-black normal-case">
          "We received so many compliments on how gorgeous the flowers were. They looked
          even better than I could have imagined."
        </blockquote>
        <cite className="mt-8 block font-sans text-[0.58rem] font-light not-italic uppercase tracking-[0.34em] text-mf-cream/70">
          Alyson &amp; Scott, Rome
        </cite>
      </section>

      {/* CTA */}
      <section className="rv2 border-t border-mf-cream/15 bg-mf-terra-2 px-[4vw] py-[clamp(5rem,9vw,8rem)] text-center">
        <p className={eyebrow}>Currently booking 2027</p>
        <h2 className="mx-auto mt-5 max-w-[18ch] font-display text-[clamp(2.4rem,5.4vw,5rem)] font-normal leading-[1.08] text-mf-black normal-case">
          let&apos;s gather <span className="font-script text-[0.85em] text-mf-violet">your</span> flowers
        </h2>
        <Link
          to="/contact/"
          className="mt-11 inline-block bg-mf-cream px-12 py-4 font-sans text-[0.62rem] font-normal uppercase tracking-[0.32em] text-mf-terra-2 transition-opacity hover:opacity-85"
        >
          Contact the atelier
        </Link>
      </section>
    </div>
  )
}
