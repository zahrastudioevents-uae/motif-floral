import { Link, useParams } from 'react-router-dom'
import { NotFound } from './NotFound'
import { RestyleHero } from '../components/RestyleHero'
import { Seo } from '../components/Seo'
import { GRID_SIZES, srcSetFor } from '../lib/assets'
import { locationBySlug } from '../data/locations'
import { breadcrumb, graph, webPage } from '../lib/structuredData'
import { absolute, BUSINESS } from '../lib/site'

/** One component behind three URLs; the copy lives in data/locations.ts. */
export function Location() {
  const { slug } = useParams()
  const page = slug ? locationBySlug(slug) : undefined
  if (!page) return <NotFound />

  const path = `/weddings/${page.slug}/`

  return (
    <>
      <Seo
        title={page.metaTitle}
        description={page.metaDescription}
        image={page.heroImage}
        jsonLd={graph(
          webPage(page.title, path, page.metaDescription),
          breadcrumb([
            { name: 'Home', path: '/' },
            { name: 'Weddings', path: '/portfolio/' },
            { name: page.title, path },
          ]),
          {
            '@type': 'Service',
            '@id': `${absolute(path)}#service`,
            name: page.title,
            serviceType: 'Wedding floral design',
            provider: { '@id': `${absolute('/')}#organization` },
            areaServed: page.venues.map((name) => ({ '@type': 'Place', name })),
            description: page.metaDescription,
          },
        )}
      />
      <RestyleHero title={page.title} image={page.heroImage} />

      <section className="bg-mf-white px-[4vw] py-20 md:py-24">
        <div className="mx-auto max-w-2xl">
          <p className="font-sans text-[1rem] font-light leading-[1.95] text-mf-black/80">
            {page.intro}
          </p>

          <div className="mt-14 space-y-12">
            {page.body.map((b) => (
              <div key={b.heading} className="border-t border-mf-muted/15 pt-8">
                <h2 className="font-display text-[min(1.75rem,1rem+0.9vw)] font-normal uppercase leading-none tracking-[0.06em] text-mf-black">
                  {b.heading}
                </h2>
                <p className="mt-5 font-sans text-[0.9rem] font-light leading-[1.9] text-mf-muted">
                  {b.text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-14 border-t border-mf-muted/15 pt-8">
            <h2 className="font-sans text-[0.75rem] uppercase tracking-[0.22em] text-mf-black">
              Venues we have worked in
            </h2>
            <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
              {page.venues.map((v) => (
                <li
                  key={v}
                  className="font-sans text-[0.85rem] font-light uppercase tracking-[0.1em] text-mf-muted"
                >
                  {v}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mx-auto mt-16 grid max-w-[1500px] grid-cols-2 gap-4 md:mt-20 md:grid-cols-3 md:gap-5">
          {page.gallery.map((p) => (
            <figure key={p.src} className="m-0 overflow-hidden">
              <img
                src={p.src}
                srcSet={srcSetFor(p.src)}
                sizes={GRID_SIZES}
                alt={p.alt}
                className="aspect-[2/3] w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </figure>
          ))}
        </div>

        <div className="mx-auto mt-16 flex max-w-2xl flex-col items-center gap-6 text-center md:mt-20">
          <p className="font-sans text-[0.9rem] font-light leading-[1.9] text-mf-muted">
            Wedding commissions start at €8,000. Tell us the date and the venue and we will come back
            with a proposal, or write to{' '}
            <a
              href={`mailto:${BUSINESS.email}`}
              className="underline underline-offset-2 hover:text-mf-black"
            >
              {BUSINESS.email}
            </a>
            .
          </p>
          <Link to="/getquote/" className="mf-cta mf-cta-dark">
            Get a quote
          </Link>
        </div>
      </section>
    </>
  )
}
