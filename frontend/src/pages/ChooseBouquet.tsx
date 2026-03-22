import { Link } from 'react-router-dom'
import { ImageCarousel } from '../components/ImageCarousel'
import { Seo } from '../components/Seo'
import { BOUQUET_TIERS, CHOOSE_HERO_IMAGES, RIBBON_SECTION } from '../data/chooseBouquet'

export function ChooseBouquet() {
  return (
    <>
      <Seo
        title="Choose Your Bouquet – Curated Collections - Motif Floral"
        description="Browse our curated selection of bouquets to find the perfect design reflecting your taste and wedding theme."
      />

      <section className="relative bg-mf-white py-12 md:py-20">
        <div className="mx-auto grid max-w-[1500px] gap-6 px-[4vw] md:grid-cols-12 md:items-center">
          <div className="relative md:col-span-8">
            <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
              {CHOOSE_HERO_IMAGES.slice(0, 4).map((im) => (
                <div key={im.src} className="aspect-[3/4] overflow-hidden border border-mf-accent">
                  <img src={im.src} alt={im.alt} className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          </div>
          <div className="md:col-span-4 md:text-right">
            <h1 className="font-display text-[min(3rem,1rem+2.22vw)] font-normal uppercase text-mf-black">
              choose your bouquet
            </h1>
          </div>
        </div>
      </section>

      {BOUQUET_TIERS.map((tier, i) => (
        <section
          key={tier.title}
          className={i % 2 === 1 ? 'bg-mf-accent/40' : 'bg-mf-white'}
        >
          <div className="mx-auto max-w-[1500px] px-[4vw] py-16">
            <p className="font-sans text-[1.5rem] font-light uppercase text-mf-black">{tier.kicker}</p>
            <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:items-start">
              <div>
                <div className="overflow-hidden border border-mf-accent">
                  <img
                    src={tier.hero}
                    alt={tier.heroAlt}
                    className="aspect-[3/4] w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
              <div>
                <h2 className="font-display text-[min(2.25rem,1rem+1.39vw)] font-normal uppercase text-mf-black">
                  {tier.title}
                </h2>
                <div className="mt-6 space-y-4 font-display text-[1rem] leading-relaxed text-mf-black">
                  {tier.body.map((line) => (
                    <p key={line.slice(0, 24)}>{line}</p>
                  ))}
                </div>
                <div className="mt-8 text-right font-display text-[1rem] text-mf-black">
                  <p>{tier.priceEx}</p>
                  <p className="mt-2">{tier.priceInc}</p>
                </div>
              </div>
            </div>
            <div className="mt-12">
              <ImageCarousel images={[...tier.carousel]} />
            </div>
            {tier.title === 'MINIMAL ELEGANCE BOUQUET' ? (
              <div className="mt-10 text-center">
                <Link
                  to="/contact/"
                  className="inline-block bg-mf-btn px-10 py-3 text-[0.625rem] font-medium uppercase tracking-[0.1em] text-white hover:bg-mf-btn-hover"
                >
                  Contact us
                </Link>
              </div>
            ) : null}
          </div>
        </section>
      ))}

      <section className="relative min-h-[60vh]">
        <img
          src={RIBBON_SECTION.bg}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-mf-accent/85" />
        <div className="relative z-10 mx-auto grid max-w-[1500px] items-center gap-8 px-[4vw] py-20 md:grid-cols-12">
          <div className="hidden md:col-span-2 md:block">
            <img
              src={RIBBON_SECTION.sideL}
              alt=""
              className="aspect-[3/5] w-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="text-center md:col-span-8">
            <h2 className="font-display text-[min(3rem,1rem+2.22vw)] font-normal uppercase text-mf-black">
              Find Your ribbon
            </h2>
            <div className="mx-auto mt-6 max-w-xl space-y-3 font-display text-[0.95rem] leading-relaxed text-mf-black">
              <p>A silk ribbon becomes more than an accessory: it becomes a keepsake.</p>
              <p>
                Hand-embroidered with delicate Miyuki beads, each piece is crafted one stitch at
                a time, transforming a simple ribbon into a personalised heirloom.
              </p>
              <p>
                Designed for bouquets, flat-lays, vow books or meaningful details, a small gesture
                that carries an entire story.
              </p>
            </div>
            <Link
              to="/embroideredribbons/"
              className="mt-10 inline-block bg-mf-btn px-10 py-3 text-[0.625rem] font-medium uppercase tracking-[0.1em] text-white hover:bg-mf-btn-hover"
            >
              Discover more
            </Link>
          </div>
          <div className="hidden md:col-span-2 md:block">
            <img
              src={RIBBON_SECTION.sideR}
              alt=""
              className="aspect-[3/5] w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </>
  )
}
