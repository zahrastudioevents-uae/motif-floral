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
    label: 'Wed Vibes — Florists',
    href: 'https://www.wedvibes.com/',
    image: img('/site/2qZExp/jzJkd4/AD-wedding-24-93019765-1500.jpg'),
  },
  {
    label: 'The Wed — Florists',
    href: 'https://www.thewed.com/',
    image: img('/site/2qZExp/ZDPd8W/AD-wedding-100_mod-4b6e4542-1500.jpg'),
  },
  {
    label: 'Wed Vibes — MF Accessori',
    href: 'https://www.instagram.com/motifloral',
    image: img('/site/2qZExp/xZPL8x/victoriajoyphotography-0589-470a7417-1500.jpg'),
  },
]

export function About() {
  return (
    <>
      <Seo
        title="About – Motif Floral - Motif Floral"
        description="Meet Motif Floral — bespoke wedding and event floristry based in Rome, creating poetic, refined designs across Italy and beyond."
      />
      <section className="mx-auto max-w-[1500px] px-[4vw] py-16 text-center md:text-left">
        <h1 className="font-display text-[min(3rem,1rem+2.22vw)] font-normal uppercase tracking-wide text-mf-black">
          Hi, we are motif floral
        </h1>
        <p className="mt-4 font-sans text-[0.875rem] uppercase tracking-[0.12em] text-mf-muted">
          Bespoke floral design for weddings &amp; events
        </p>
        <div className="mx-auto mt-10 max-w-md">
          <img src={LOGO} alt="Motif Floral logo" className="w-full object-contain" />
        </div>
        <div className="mx-auto mt-10 max-w-3xl space-y-6 font-sans text-[0.875rem] leading-[1.8] text-mf-muted">
          <p>
            We are Flaminia and Roberta — floral artists based in Rome, crafting immersive,
            story-driven florals for couples who value emotion, texture, and timeless elegance.
            Each celebration is a collaboration: we listen, refine, and translate your vision
            into living compositions that feel unmistakably yours.
          </p>
          <p>
            From intimate elopements to multi-day destination weddings, we design with
            intention — honouring architecture, light, and the poetry of the season — so every
            detail feels cohesive, generous, and quietly luxurious.
          </p>
        </div>
      </section>

      <section className="border-y border-mf-accent bg-mf-accent py-16">
        <h2 className="text-center font-sans text-[1.25rem] font-light uppercase tracking-wide text-mf-black">
          As seen in
        </h2>
        <ul className="mx-auto mt-8 flex max-w-4xl flex-wrap justify-center gap-x-8 gap-y-3 px-[4vw] text-center font-sans text-sm text-mf-muted">
          {PRESS.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </section>

      <section
        className="relative bg-cover bg-center py-24 text-white"
        style={{
          backgroundImage: `url(${img('/site/2qZExp/3aJmdy/victoriajoyphotography-0614-ca75753f-1500.jpg')})`,
        }}
      >
        <div className="absolute inset-0 bg-black/45" />
        <blockquote className="relative mx-auto max-w-3xl px-[4vw] text-center font-display text-[min(1.75rem,1rem+0.83vw)] font-normal uppercase leading-snug tracking-wide">
          &ldquo;Flowers are the silent language of every unforgettable celebration.&rdquo;
        </blockquote>
      </section>

      <section className="mx-auto max-w-[1500px] px-[4vw] py-16">
        <h2 className="text-center font-sans text-[1.5rem] font-light uppercase text-mf-black">
          Our partners
        </h2>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {PARTNERS.map((p) => (
            <a
              key={p.href}
              href={p.href}
              target="_blank"
              rel="noreferrer"
              className="group block text-center"
            >
              <div className="overflow-hidden border border-mf-accent">
                <img
                  src={p.image}
                  alt=""
                  className="aspect-[4/5] w-full object-cover transition-transform group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <p className="mt-4 font-sans text-[0.75rem] uppercase tracking-wide text-mf-black underline-offset-4 group-hover:underline">
                {p.label}
              </p>
            </a>
          ))}
        </div>
      </section>

      <section className="bg-mf-accent py-20 text-center">
        <h2 className="font-display text-[min(2.25rem,1rem+1.39vw)] font-normal uppercase text-mf-black">
          Let&apos;S connect
        </h2>
        <Link
          to="/contact/"
          className="mt-8 inline-block bg-mf-btn px-10 py-3 text-[0.625rem] font-medium uppercase tracking-[0.1em] text-white hover:bg-mf-btn-hover"
        >
          Contact
        </Link>
      </section>
    </>
  )
}
