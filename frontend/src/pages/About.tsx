import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { img } from '../lib/assets'

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
    title: 'The Wed',
    subtitle: 'Partner',
    href: 'https://www.thewed.com/',
    image: img('/site/2qZExp/K7rO41/Home-bouquet-violet-burgundy-bouquet--77aada7f-1500.jpg'),
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
  center: img('/site/2qZExp/a3MOMb/Screenshot2025-08-27alle09.28.13-3d39ff21-1500.png'),
  right: img('/site/2qZExp/8YpW4b/victoriajoyphotography--9-0667343b-1500.jpg'),
}

export function About() {
  return (
    <>
      <Seo
        title="About Motif Floral – Our Story & Philosophy - Motif Floral"
        description="Meet Motif Floral — bespoke wedding and event floristry based in Rome, creating poetic, refined designs across Italy and beyond."
      />

      <section className="mx-auto max-w-[1500px] px-[4vw] py-20 text-center md:py-28">
        <h1 className="font-display text-[min(3.5rem,1.2rem+2.5vw)] font-normal uppercase tracking-wide text-mf-black">
          Hi,
        </h1>
        <h1 className="mt-1 font-display text-[min(3.5rem,1.2rem+2.5vw)] font-normal uppercase tracking-wide text-mf-black">
          we are motif floral
        </h1>
      </section>

      <section className="mx-auto max-w-md px-[4vw]">
        <img src={LOGO} alt="Motif Floral logo" className="w-full object-contain" />
      </section>

      <section className="mx-auto max-w-[1500px] px-[4vw] py-16 text-center md:py-20">
        <p className="font-sans text-[0.6875rem] font-light uppercase tracking-[0.22em] text-mf-muted">
          Let&apos;s get to know each other
        </p>

        <div className="mx-auto mt-12 max-w-3xl space-y-6 font-sans text-[0.875rem] leading-[1.9] text-mf-muted">
          <p>
            Motif Floral was born from a shared passion for refined floral art and timeless
            beauty. We create bespoke floral designs that tell each couple&apos;s story,
            transforming emotions into colors, textures, and natural compositions. Every creation
            is crafted with care and artistic sensitivity, blending elegance with an organic
            aesthetic that enhances the atmosphere of each event.
          </p>
          <p>
            Our work celebrates authenticity, sophistication, and the poetry of nature, flowers
            become a language through which we express love, connection, and the essence of every
            couple we design for. From intimate elopements to grand celebrations, our vision is
            to create floral experiences that leave a lasting impression, evoking emotion and
            timeless beauty in every detail.
          </p>
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
        className="relative bg-cover bg-center py-28 text-white md:py-36"
        style={{
          backgroundImage: `url(${img('/site/2qZExp/zAwL7p/photo-187-99e8d5eb-1500.jpg')})`,
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <blockquote className="relative mx-auto max-w-3xl px-[4vw] text-center">
          <p className="font-display text-[min(1.75rem,1rem+0.83vw)] font-normal italic leading-relaxed tracking-wide">
            &ldquo;We don&apos;t decorate weddings.
          </p>
          <p className="mt-2 font-display text-[min(1.75rem,1rem+0.83vw)] font-normal italic leading-relaxed tracking-wide">
            We design atmospheres that stay with you long after the flowers fade.&rdquo;
          </p>
        </blockquote>
      </section>

      <section className="mx-auto max-w-[1500px] px-[4vw] py-20">
        <h2 className="text-center font-display text-[min(2.5rem,1rem+1.5vw)] font-normal uppercase tracking-wide text-mf-black">
          Our Partners
        </h2>
        <div className="mt-14 grid gap-10 md:grid-cols-3">
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

      <section className="py-10">
        <div className="mx-auto grid max-w-[1500px] grid-cols-4 gap-2 px-[4vw]">
          <div className="col-span-1 overflow-hidden">
            <img
              src={CONNECT_IMAGES.left}
              alt=""
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="relative col-span-2 overflow-hidden">
            <img
              src={CONNECT_IMAGES.center}
              alt=""
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
              <h2 className="font-display text-[min(2.5rem,1rem+1.5vw)] font-normal uppercase tracking-wide">
                Let&apos;s connect
              </h2>
              <Link
                to="/contact/"
                className="mt-8 inline-block bg-mf-btn px-10 py-3 text-[0.625rem] font-medium uppercase tracking-[0.1em] text-white hover:bg-mf-btn-hover"
              >
                Contact us
              </Link>
            </div>
          </div>
          <div className="col-span-1 overflow-hidden">
            <img
              src={CONNECT_IMAGES.right}
              alt=""
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </>
  )
}
