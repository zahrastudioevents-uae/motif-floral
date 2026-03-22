import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'

export function EmbroideredRibbons() {
  return (
    <>
      <Seo
        title="Silk embroidered Ribbons – Handmade precious embroideries - Motif Floral"
        description="Hand-embroidered silk ribbons with Miyuki beads — custom text, monograms, and heirloom finishes by Motif Floral."
      />
      <section className="mx-auto max-w-[1500px] px-[4vw] py-16 text-center md:text-left">
        <p className="font-sans text-[0.8125rem] uppercase tracking-[0.15em] text-mf-muted">
          dive into the details
        </p>
        <h1 className="mt-4 font-display text-[min(3rem,1rem+2.22vw)] font-normal uppercase text-mf-black">
          The art of embroidery, designed just for you.
        </h1>
      </section>

      <section className="bg-mf-accent py-16">
        <div className="mx-auto max-w-3xl space-y-8 px-[4vw] font-display text-[0.95rem] leading-relaxed text-mf-black">
          <div>
            <h2 className="text-[1.1rem] uppercase">What we offer</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 font-sans text-sm text-mf-muted">
              <li>Hand-embroidered silk ribbons</li>
              <li>Custom text, initials, vows, or meaningful words</li>
              <li>Bespoke illustrations designed exclusively for you</li>
              <li>Couture beadwork with premium Miyuki beads</li>
              <li>Heirloom-quality finishes</li>
              <li>Made entirely by hand</li>
            </ul>
            <p className="mt-6 font-sans text-sm text-mf-muted">Let&apos;s design your ribbon together.</p>
          </div>
          <p className="font-sans text-sm text-mf-muted">
            Hand-embroidered design with delicate Miyuki beads — custom illustrations or words,
            each piece crafted one stitch at a time, transforming a simple detail into a personal
            heirloom. Each ribbon is designed in dialogue with you: the words you choose, the
            symbols you love, the style that reflects your day.
          </p>
          <div>
            <h2 className="text-[1.1rem] uppercase">What we create</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 font-sans text-sm text-mf-muted">
              <li>Silk ribbons crafted with premium quality fabrics</li>
              <li>Personalised text embroidery — names, initials, dates, vows</li>
              <li>Custom logos, monograms &amp; bespoke drawings</li>
              <li>Couture beadwork with fine Miyuki beads</li>
              <li>Heirloom-quality finishes</li>
              <li>Completely handmade — never mass-produced</li>
            </ul>
          </div>
          <div>
            <h2 className="font-sans text-[1.25rem] font-light uppercase">Options</h2>
            <ul className="mt-4 space-y-2 font-sans text-sm text-mf-black">
              <li>Ribbon embroidered with Initials or Short phrases (3-4 words): 100,00€ *</li>
              <li>Ribbon embroidered with Long phrases (more than 4 words): 150,00€ *</li>
              <li>Ribbon embroidered with Logos or Personal designs: To be defined</li>
            </ul>
            <p className="mt-6 font-sans text-xs text-mf-muted">
              Preparation time: about 1 month. Shipping: to be defined.
              <br />* Prices VAT included.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 text-center">
        <p className="font-display text-[1.1rem] uppercase text-mf-black">
          Crafted for those who notice the difference.
        </p>
        <Link
          to="/contact/"
          className="mt-8 inline-block bg-mf-btn px-10 py-3 text-[0.625rem] font-medium uppercase tracking-[0.1em] text-white hover:bg-mf-btn-hover"
        >
          Contact us
        </Link>
      </section>
    </>
  )
}
