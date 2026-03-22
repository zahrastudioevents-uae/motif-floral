import { Seo } from '../components/Seo'
import {
  REVIEWS,
  TESTIMONIALS_CTA_BG,
  TESTIMONIALS_HERO,
} from '../data/testimonialsPage'

export function Testimonials() {
  return (
    <>
      <Seo
        title="Client Reviews – Motif Floral - Motif Floral"
        description="Discover what couples and clients say about their Motif Floral experience."
      />
      <section className="relative flex min-h-[45vh] items-end justify-center pb-16 pt-32 text-white md:min-h-[50vh]">
        <img
          src={TESTIMONIALS_HERO}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: '53% 32%' }}
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 px-[4vw] text-center">
          <h1 className="font-sans text-[min(2.25rem,1rem+1.39vw)] font-light uppercase tracking-wide text-white">
            Testimonials
          </h1>
          <p className="mt-4 font-sans text-[0.875rem] text-white/95">
            Kind words from our amazing clients
          </p>
        </div>
      </section>

      {REVIEWS.map((r) => (
        <section
          key={r.names}
          className="border-b border-mf-accent py-16 last:border-b-0"
        >
          <div className="mx-auto grid max-w-[1500px] gap-10 px-[4vw] md:grid-cols-2 md:items-center">
            <div className="overflow-hidden border border-mf-accent">
              <img
                src={r.image}
                alt={r.alt}
                className="aspect-[3/4] w-full object-cover md:aspect-[2/3]"
                loading="lazy"
              />
            </div>
            <div>
              <p className="font-sans text-[0.875rem] leading-[1.8] text-mf-muted">{r.text}</p>
              <h2 className="mt-8 font-sans text-[1.25rem] font-light uppercase tracking-wide text-mf-black">
                {r.names}
              </h2>
            </div>
          </div>
        </section>
      ))}

      <section className="relative min-h-[50vh] text-white">
        <img
          src={TESTIMONIALS_CTA_BG}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-[4vw] py-24 text-center">
          <h2 className="font-display text-[min(3rem,1rem+2.22vw)] font-normal uppercase text-white">
            Share your experience here
          </h2>
          <p className="mt-4 font-sans text-[0.875rem] text-white/95">
            We would be delighted to read your words, they could help our future clients
          </p>
          <a
            href="https://g.page/r/CYVhcWjqwrsBEAI/review"
            target="_blank"
            rel="noreferrer"
            className="mt-10 inline-block bg-mf-btn px-10 py-3 text-[0.625rem] font-medium uppercase tracking-[0.1em] text-white hover:bg-mf-btn-hover"
          >
            Please leave a review
          </a>
        </div>
      </section>
    </>
  )
}
