import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { img } from '../lib/assets'

/** Editorial bloom on warm ground — hero left column. */
const ABOUT_HERO_IMAGE = img(
  '/site/2qZExp/0Pr45o/choose-your-bouquet-violet-dhalias-dalias-cosmos-7f725976-1500.jpg',
)

const LOGO = img('/site/2qZExp/6QJ4bo/LOGO2025-01ce6514-1500.JPG')

const PRESS = [
  'Style Me Pretty',
  'The Wed',
  'Wed Vibes',
  'Wedding Chicks',
  'Junebug Weddings',
  'Vogue',
  'Elle',
  'The Anti-Bride',
  'Amber & Muse',
]

const PARTNERS = [
  {
    title: 'Wed Vibes',
    subtitle: 'Partner',
    href: 'https://www.wedvibes.com/',
    image: img('/site/2qZExp/JMzQ0p/PalazzoVilonRoma-183-e7efc586-1500.jpg'),
  },
  {
    title: 'Wed Vibes',
    extra: 'MF Accessori',
    subtitle: 'Partner',
    href: 'https://www.instagram.com/motifloral',
    image: img('/site/2qZExp/on1J1P/Screenshot2025-08-27alle09.25.30-e16c7358-1500.png'),
  },
]

const CONNECT_IMAGES = {
  left: img('/site/2qZExp/vjbLn9/Screenshot2025-08-27alle10.40.53-74f911aa-1500.png'),
  /** Destination wedding Rome — third column. */
  rome: '/images/about-connect-destination-rome.png',
}

export function About() {
  return (
    <>
      <Seo
        title="About Motif Floral – Our Story & Philosophy - Motif Floral"
        description="Meet Motif Floral, bespoke wedding and event floristry based in Rome, creating poetic, refined designs across Italy and beyond."
      />

      <section className="mx-auto grid max-w-[1500px] items-stretch overflow-hidden pb-10 pt-16 md:grid-cols-[minmax(0,1.08fr)_minmax(280px,0.92fr)] md:rounded-sm md:px-[4vw] md:pb-14 md:pt-20 md:gap-0">
        {/* Left: full editorial photo */}
        <div className="relative isolate order-1 min-h-[48svh] md:min-h-[min(520px,max(68svh,calc(100svh-6rem)))]">
          <img
            src={ABOUT_HERO_IMAGE}
            alt=""
            className="absolute inset-0 size-full object-cover object-[50%_45%] md:rounded-l-md"
          />
        </div>

        {/* Right: headings + story */}
        <div className="order-2 flex min-h-0 flex-col md:overflow-hidden md:rounded-r-md md:rounded-l-none">
          <div className="bg-mf-accent px-[6vw] py-14 text-left md:flex md:min-h-0 md:flex-1 md:flex-col md:justify-center md:px-11 md:py-[clamp(3.5rem,6vw,5.75rem)] lg:px-14">
            <h1 className="font-display text-[min(2.875rem,calc(1.2rem+2.8vw))] font-normal uppercase tracking-wide leading-tight text-mf-black">
              Hi,
              <span className="mt-3 block">we are motif floral</span>
            </h1>
            <p className="mt-6 font-sans text-[0.6875rem] font-light uppercase tracking-[0.26em] text-mf-muted md:tracking-[0.28em]">
              Let&apos;s get to know each other
            </p>
          </div>

          <div className="flex flex-1 flex-col border-t border-black/10 bg-white px-[6vw] py-14 md:min-h-0 md:px-11 md:py-[clamp(2.75rem,4.5vw,4.25rem)] lg:px-14">
            <div className="mx-auto max-w-[36rem] md:mx-0 md:max-w-none">
              <div className="space-y-5 text-center font-sans text-[0.875rem] leading-[1.9] text-mf-muted md:text-left">
                <p>
                  Motif Floral was born from a shared passion for refined floral art and timeless
                  beauty. We create bespoke floral designs that tell each couple&apos;s story,
                  transforming emotions into colors, textures, and natural compositions. Every
                  creation is crafted with care and artistic sensitivity, blending elegance with an
                  organic aesthetic that enhances the atmosphere of each event.
                </p>
                <p>
                  Our work celebrates authenticity, sophistication, and the poetry of nature, flowers
                  become a language through which we express love, connection, and the essence of
                  every couple we design for. From intimate elopements to grand celebrations, our
                  vision is to create floral experiences that leave a lasting impression, evoking
                  emotion and timeless beauty in every detail.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-mf-accent bg-mf-accent py-16">
        <h2 className="text-center font-sans text-[0.75rem] font-light uppercase tracking-[0.2em] text-mf-muted">
          As seen in:
        </h2>
        <ul className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-x-10 gap-y-4 px-[4vw] text-center">
          {PRESS.map((p) => (
            <li
              key={p}
              className="font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.15em] text-mf-black"
            >
              {p}
            </li>
          ))}
        </ul>
      </section>

      <section
        className="relative flex min-h-[70vh] flex-col justify-end bg-cover bg-center pb-14 text-white md:min-h-[80vh] md:pb-20"
        style={{
          backgroundImage: `url(${img('/site/2qZExp/zAwL7p/photo-187-99e8d5eb-1500.jpg')})`,
        }}
      >
        <blockquote className="relative mx-auto max-w-4xl px-[4vw] text-center">
          <p className="font-display text-[min(1.7rem,0.95rem+1vw)] font-normal uppercase leading-relaxed tracking-wide text-white/95">
            &ldquo;We don&apos;t decorate weddings.
            <br />
            We design atmospheres that stay with you long after the flowers fade.&rdquo;
          </p>
        </blockquote>
      </section>


      <section className="mx-auto max-w-[1500px] px-[4vw] py-20">
        <h2 className="text-center font-display text-[min(2.5rem,1rem+1.5vw)] font-normal uppercase tracking-wide text-mf-black">
          Our Partners
        </h2>
        <div className="mt-14 grid gap-10 md:grid-cols-2 md:max-w-2xl md:mx-auto">
          {PARTNERS.map((p) => (
            <a
              key={p.href + p.title + (p.extra ?? '')}
              href={p.href}
              target="_blank"
              rel="noreferrer"
              className="group block text-center"
            >
              <div className="overflow-hidden">
                <img
                  src={p.image}
                  alt=""
                  className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>
              <h3 className="mt-5 font-display text-[1.5rem] font-normal uppercase text-mf-black">
                {p.title}
              </h3>
              {p.extra ? (
                <p className="mt-1 font-sans text-[0.8125rem] font-medium uppercase tracking-[0.1em] text-mf-black">
                  {p.extra}
                </p>
              ) : null}
              <p className="mt-2 font-sans text-[0.6875rem] font-light uppercase tracking-[0.15em] text-mf-muted">
                {p.subtitle}
              </p>
            </a>
          ))}
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-4 px-[4vw] md:grid-cols-3 md:items-stretch md:gap-5">
          <div className="relative isolate overflow-hidden rounded-sm shadow-[0_2px_20px_-4px_rgb(0_0_0/0.12)]">
            <img
              src={CONNECT_IMAGES.left}
              alt=""
              className="aspect-[3/4] w-full object-cover md:aspect-[4/5] lg:aspect-[3/4]"
              loading="lazy"
            />
          </div>

          <div className="relative isolate overflow-hidden rounded-sm bg-[#48362e] shadow-[0_2px_20px_-4px_rgb(0_0_0/0.12)] md:bg-[#3f3028]">
            <img
              src={LOGO}
              alt="Motif Floral"
              className="aspect-[3/4] w-full object-cover object-center md:aspect-[4/5] lg:aspect-[3/4]"
              loading="lazy"
            />
          </div>

          <div className="relative isolate overflow-hidden rounded-sm shadow-[0_2px_20px_-4px_rgb(0_0_0/0.12)]">
            <img
              src={CONNECT_IMAGES.rome}
              alt=""
              className="aspect-[3/4] w-full object-cover md:aspect-[4/5] lg:aspect-[3/4]"
              loading="lazy"
            />
          </div>
        </div>

        <div className="mx-auto max-w-[1500px] px-[4vw] pt-12 text-center md:pt-16">
          <h2 className="font-display text-[min(2.35rem,calc(0.95rem+2.2vw))] font-normal uppercase tracking-wide text-mf-black">
            Let&apos;s connect
          </h2>
          <Link to="/contact/" className="mf-cta mf-cta-dark mt-8 inline-flex">
            Contact us
          </Link>
        </div>
      </section>
    </>
  )
}
