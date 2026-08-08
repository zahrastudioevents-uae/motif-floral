import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { graph, webPage } from '../lib/structuredData'

const DESCRIPTION = 'That page does not exist. Browse the portfolio or get in touch.'

/**
 * Without this, an unknown URL fell through to the router's default error
 * screen while the server still answered 200, so a mistyped address looked
 * like a working page to both people and crawlers.
 */
export function NotFound() {
  return (
    <>
      {/*
        La pagina è noindex, quindi il grafo qui non serve a farla trovare:
        serve a far sapere di chi è il sito anche a chi ci arriva per sbaglio,
        motori di risposta compresi, che leggono la pagina lo stesso.
      */}
      <Seo
        title="Page not found | Motif Floral"
        description={DESCRIPTION}
        jsonLd={graph(webPage('Page not found', '/404', DESCRIPTION))}
      />
      <section className="flex min-h-[70svh] flex-col items-center justify-center px-[4vw] py-24 text-center">
        <p className="font-sans text-[0.6875rem] uppercase tracking-[0.3em] text-mf-muted">404</p>
        <h1 className="mt-6 max-w-2xl font-display text-[min(3rem,1.3rem+2.6vw)] font-normal uppercase leading-tight tracking-wide text-mf-black">
          This page has been picked
        </h1>
        <p className="mt-5 max-w-md font-sans text-[0.9rem] font-light leading-[1.9] text-mf-muted">
          The address you followed does not exist. The work is all still here.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link to="/portfolio/" className="mf-cta mf-cta-dark">
            See the portfolio
          </Link>
          <Link
            to="/contact/"
            className="mf-cta border border-mf-black/25 bg-transparent text-mf-black transition-colors hover:bg-mf-black hover:text-white"
          >
            Contact us
          </Link>
        </div>
      </section>
    </>
  )
}
