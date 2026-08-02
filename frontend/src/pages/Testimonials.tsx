import { RestyleHero } from '../components/RestyleHero'
import { Seo } from '../components/Seo'
import { breadcrumb, graph, webPage } from '../lib/structuredData'
import {
  GOOGLE_REVIEW_URL,
  REVIEWS,
  TESTIMONIALS_CTA_BG,
  TESTIMONIALS_HERO,
} from '../data/testimonialsPage'

export function Testimonials() {
  return (
    <>
      <Seo
        title="Client Reviews | Motif Floral"
        description="What couples say about working with Motif Floral on their wedding florals in Italy."
        jsonLd={graph(
          webPage('Motif Floral reviews', '/testimonials/', 'Words from couples we designed for.'),
          breadcrumb([{ name: 'Home', path: '/' }, { name: 'Reviews', path: '/testimonials/' }]),
        )}
      />
      <RestyleHero
        eyebrow="Kind words"
        title="The feeling after the flowers fade."
        text="Stories from couples who trusted Motif Floral with the atmosphere of their day."
        image={TESTIMONIALS_HERO}
      />
      <section className="bg-mf-accent px-[4vw] py-20 md:py-28">
        <div className="mx-auto max-w-[1200px] space-y-10">
          {REVIEWS.map((review) => (
            <article
              key={review.names}
              className="grid gap-8 bg-mf-white p-5 md:grid-cols-[280px_1fr] md:items-center md:p-8"
            >
              <img
                src={review.image}
                alt={review.alt}
                className="aspect-[3/4] w-full object-cover"
                loading="lazy"
              />
              <div>
                <p className="font-sans text-[0.875rem] font-light leading-[1.9] text-mf-muted">
                  {review.text}
                </p>
                <h2 className="mt-7 font-display text-[1.5rem] font-normal uppercase text-mf-black">
                  {review.names}
                </h2>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section
        aria-labelledby="testimonials-share-heading"
        className="relative flex min-h-[50vh] flex-col items-center justify-center overflow-hidden bg-cover bg-center px-[4vw] py-24 md:min-h-[55vh] md:py-32"
        style={{
          backgroundImage: `url(${TESTIMONIALS_CTA_BG})`,
          backgroundPosition: '53% bottom',
        }}
      >
        <div className="absolute inset-0 bg-black/55" aria-hidden />
        <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
          <h2
            id="testimonials-share-heading"
            className="font-display text-[min(2.75rem,calc(0.92rem+1.85vw))] font-normal uppercase leading-snug tracking-normal text-white md:text-[min(3.35rem,calc(1rem+2.35vw))]"
          >
            Share your experience here
          </h2>
          <p className="mt-5 max-w-xl font-sans text-[0.875rem] font-light leading-relaxed text-white md:mt-6 md:text-[0.9375rem] md:leading-[1.75]">
            We would be delighted to read your words, they could help our future clients
          </p>
          <a
            href={GOOGLE_REVIEW_URL}
            target="_blank"
            rel="noreferrer"
            className="mf-cta mf-cta-dark mt-10 md:mt-12"
          >
            Please leave a review
          </a>
        </div>
      </section>
    </>
  )
}
