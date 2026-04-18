import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { PORTFOLIO_INSTAGRAM, PORTFOLIO_ITEMS } from '../data/portfolio'
import { img } from '../lib/assets'

const HERO = img('/site/2qZExp/8L3l5Q/Wedding-portfolio-villa-modern-bride-dark-6112505d-1500.jpg')

export function Portfolio() {
  const loc = useLocation()
  const success = (loc.state as { quoteSuccess?: boolean } | null)?.quoteSuccess

  useEffect(() => {
    if (success) {
      window.history.replaceState({}, document.title)
    }
  }, [success])

  return (
    <>
      <Seo
        title="Portfolio – Motif Floral - Motif Floral"
        description="Editorial and real wedding floral design by Motif Floral across Italy."
      />
      {success ? (
        <div className="bg-mf-accent py-4 text-center font-sans text-sm text-mf-black">
          Thank you for contacting me!
        </div>
      ) : null}
      <section className="relative flex min-h-[55vh] flex-col items-center justify-end pb-14 pt-32 text-white md:min-h-[65vh]">
        <img
          src={HERO}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: 'center 60%' }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 px-[4vw] text-center">
          <h1 className="font-display text-[min(3rem,1rem+2.22vw)] font-normal uppercase">
            Portfolio
          </h1>
          <p className="mx-auto mt-4 max-w-3xl font-sans text-[0.75rem] font-light uppercase leading-[2] tracking-[0.18em] text-white/85">
            Our floral editorials have been proudly featured in prestigious international publications such as The Wed, Wed Vibes, Anti-Bride.
            Each project reflects our signature aesthetic, a blend of timeless elegance, artistic direction, and refined design that celebrates the poetry of flowers and the beauty of extraordinary settings.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-[4vw] py-16">
        <div className="grid gap-x-4 gap-y-7 md:grid-cols-3">
          {PORTFOLIO_ITEMS.map((item, idx) => (
            <article key={item.venue + item.city + idx}>
              <a href={item.href} target="_blank" rel="noreferrer" className="group block overflow-hidden">
                <img
                  src={item.image}
                  alt={item.alt}
                  className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  loading="lazy"
                />
              </a>
              <div className="mt-3 border-t border-mf-accent pt-3 pl-3 text-left">
                <p className="font-sans text-[0.6rem] font-light uppercase tracking-[0.2em] text-mf-muted">
                  {item.category}
                </p>
                <h2 className="mt-1 font-display text-[1.1rem] font-normal uppercase leading-snug text-mf-black">
                  {item.venue}
                </h2>
                <p className="font-sans text-[0.65rem] font-light uppercase tracking-[0.12em] text-mf-muted">
                  {item.city}
                </p>
                {item.published ? (
                  <p className="mt-2 font-sans text-[0.65rem] tracking-[0.05em] text-mf-muted">
                    <span className="font-semibold">Featured in</span> {item.published}
                  </p>
                ) : null}
                {item.articleTitle ? (
                  <p className="mt-0.5 font-sans text-[0.65rem] font-light italic text-mf-muted">
                    {item.articleTitle}
                  </p>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-mf-accent bg-mf-white py-16">
        <h2 className="text-center font-display text-[min(2rem,1rem+1.1vw)] font-normal uppercase tracking-wide text-mf-black">
          Instagram posts
        </h2>
        <div className="mx-auto mt-10 grid max-w-[1500px] grid-cols-1 gap-8 px-[4vw] md:grid-cols-3">
          {PORTFOLIO_INSTAGRAM.map((ig, idx) => (
            <a
              key={ig.image + idx}
              href={ig.href}
              target="_blank"
              rel="noreferrer"
              className="group block"
            >
              <div className="overflow-hidden">
                <img
                  src={ig.image}
                  alt={ig.label}
                  className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
              <p className="mt-3 text-center text-[0.75rem] text-mf-muted">{ig.label}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="bg-mf-accent py-20 text-center">
        <p className="font-sans text-[0.6875rem] font-light uppercase tracking-[0.18em] text-mf-muted">
          Get in Touch
        </p>
        <h2 className="mt-4 font-display text-[min(2.25rem,1rem+1.39vw)] font-normal uppercase text-mf-black">
          Let&apos;s craft memories that last a lifetime
        </h2>
        <Link
          to="/contact/"
          className="mf-cta mf-cta-dark mt-8"
        >
          Contact us
        </Link>
      </section>
    </>
  )
}
