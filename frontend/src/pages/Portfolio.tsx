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
      <section className="relative flex min-h-[55vh] items-end justify-center bg-mf-black pb-16 pt-32 text-white md:min-h-[65vh]">
        <img
          src={HERO}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-black/35" />
        <div className="relative z-10 px-[4vw] text-center">
          <h1 className="font-display text-[min(3rem,1rem+2.22vw)] font-normal uppercase">
            Portfolio
          </h1>
          <p className="mt-4 font-sans text-[0.8125rem] uppercase tracking-[0.15em] text-white/90">
            Editorial &amp; real weddings
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-[4vw] py-16">
        <div className="grid gap-12 md:grid-cols-2">
          {PORTFOLIO_ITEMS.map((item) => (
            <article key={item.href + item.venue} className="text-mf-black">
              <a href={item.href} target="_blank" rel="noreferrer" className="block">
                <div className="overflow-hidden border border-mf-accent">
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="aspect-[4/5] w-full object-cover transition-transform hover:scale-[1.02]"
                    loading="lazy"
                  />
                </div>
              </a>
              <p className="mt-4 text-[0.75rem] uppercase tracking-[0.12em] text-mf-muted">
                {item.category}
              </p>
              <h2 className="mt-1 font-display text-[1.5rem] uppercase">{item.venue}</h2>
              {item.published ? (
                <p className="mt-2 text-sm text-mf-muted">Published on {item.published}</p>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-mf-accent bg-mf-white py-16">
        <h2 className="text-center font-sans text-[1.25rem] font-light uppercase tracking-wide text-mf-black">
          Instagram posts
        </h2>
        <div className="mx-auto mt-10 grid max-w-[1500px] grid-cols-1 gap-6 px-[4vw] md:grid-cols-3">
          {PORTFOLIO_INSTAGRAM.map((ig) => (
            <a
              key={ig.image}
              href={ig.href}
              target="_blank"
              rel="noreferrer"
              className="block overflow-hidden border border-mf-accent"
            >
              <img src={ig.image} alt={ig.alt} className="aspect-square w-full object-cover" />
            </a>
          ))}
        </div>
      </section>

      <section className="bg-mf-accent py-20 text-center">
        <h2 className="font-display text-[min(2.25rem,1rem+1.39vw)] font-normal uppercase text-mf-black">
          Get in Touch
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm text-mf-muted">
          Let&apos;s craft memories that last a lifetime.
        </p>
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
