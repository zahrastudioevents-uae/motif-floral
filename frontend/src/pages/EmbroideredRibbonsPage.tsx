import { Link } from 'react-router-dom'
import { RestyleHero } from '../components/RestyleHero'
import { Seo } from '../components/Seo'
import { RIBBON_SECTION } from '../data/chooseBouquet'

export function EmbroideredRibbonsPage({
  seoTitle,
  seoDescription,
  contactTo,
}: {
  seoTitle: string
  seoDescription: string
  contactTo: string
}) {
  const picBox =
    'mx-auto shrink-0 overflow-hidden rounded-sm md:mx-0 h-[17.75rem] w-[clamp(226px,min(248px,88vw))] sm:h-[19rem]'
  const picDuoBox = `${picBox} flex gap-[0.375rem] p-0`
  const rowGrid = 'grid gap-10 md:grid-cols-[auto_1fr] md:items-center md:gap-12 lg:gap-14'
  const ribbonListCls =
    'list-disc space-y-2.5 pl-5 font-sans text-[0.9rem] font-light leading-[1.75] text-mf-muted marker:text-mf-muted/70 md:space-y-3'

  return (
    <>
      <Seo title={seoTitle} description={seoDescription} />
      <RestyleHero
        eyebrow="MF accessories"
        title="The art of embroidery, designed just for you."
        text="Hand-embroidered silk ribbons with custom text, monograms, symbols and Miyuki beadwork."
        image={RIBBON_SECTION.bg}
      />
      <section className="bg-mf-white px-[4vw] py-20">
        <div className="mx-auto max-w-[1500px]">
          <div className={rowGrid}>
            <div className={picBox}>
              <img src={RIBBON_SECTION.sideL} alt="" className="size-full object-cover" loading="lazy" />
            </div>
            <div className="pt-2 md:pt-0">
              <div className="border-t border-mf-muted/15 pt-7 md:border-0 md:pt-0">
                <h2 className="font-sans text-[0.75rem] uppercase tracking-[0.22em] text-mf-black">
                  What we offer
                </h2>
                <p className="mt-5 font-sans text-[0.9rem] font-light leading-[1.9] text-mf-muted">
                  Hand-embroidered design with delicate Miyuki beads, custom illustrations or words,
                  each piece crafted one stitch at a time, transforming a simple detail into a
                  personal heirloom. Each ribbon is designed in dialogue with you: the words you
                  choose, the symbols you love, the style that reflects your day.
                </p>
                <ul className={`mt-6 md:mt-7 ${ribbonListCls}`}>
                  {[
                    'Hand-embroidered silk ribbons',
                    'Custom text, initials, vows, or meaningful words',
                    'Bespoke illustrations designed exclusively for you',
                    'Couture beadwork with premium Miyuki beads',
                    'Heirloom-quality finishes',
                    'Made entirely by hand',
                  ].map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className={`${rowGrid} mt-16 border-t border-mf-muted/15 pt-16 md:mt-20 md:pt-20`}>
            <div className="order-2 border-t border-mf-muted/15 pt-7 md:order-1 md:border-0 md:pt-0">
              <h2 className="font-sans text-[0.75rem] uppercase tracking-[0.22em] text-mf-black">
                What we create
              </h2>
              <ul className={`mt-5 ${ribbonListCls}`}>
                {[
                  'Silk ribbons crafted with premium quality fabrics',
                  'Personalised text embroidery, names, initials, dates, vows',
                  'Custom logos, monograms & bespoke drawings',
                  'Couture beadwork with fine Miyuki beads',
                  'Heirloom-quality finishes',
                  'Completely handmade, never mass-produced',
                ].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className={`order-1 md:order-2 ${picDuoBox}`}>
              <img
                src={RIBBON_SECTION.sideR}
                alt=""
                className="h-full min-h-0 flex-1 object-cover object-center"
                loading="lazy"
              />
              <img
                src={RIBBON_SECTION.bg}
                alt=""
                className="h-full min-h-0 flex-1 object-cover object-center"
                loading="lazy"
              />
            </div>
          </div>

          <div className={`${rowGrid} mt-16 border-t border-mf-muted/15 pt-16 md:mt-20 md:pt-20`}>
            <div className={picBox}>
              <img src={RIBBON_SECTION.optionsAside} alt="" className="size-full object-cover" loading="lazy" />
            </div>
            <div className="border-t border-mf-muted/15 pt-7 md:border-0 md:pt-0">
              <h2 className="font-sans text-[0.75rem] uppercase tracking-[0.22em] text-mf-black">
                Options
              </h2>
              <ul className={`mt-5 ${ribbonListCls}`}>
                {[
                  'Ribbon embroidered with Initials or Short phrases (3-4 words): 100,00€',
                  'Ribbon embroidered with Long phrases (more than 4 words): 150,00€',
                  'Ribbon embroidered with Logos or Personal designs: To be defined',
                ].map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
              <p className="mt-6 font-sans text-[0.9rem] font-light leading-[1.9] text-mf-muted md:mt-7">
                Preparation time: about 1 month. Shipping: to be defined.
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-16 flex w-full max-w-[1500px] flex-col items-center gap-9 text-center md:mt-20 md:gap-10">
          <Link
            to={contactTo}
            className="mf-cta mf-cta-dark whitespace-normal px-8 leading-snug tracking-[0.07em] md:max-w-2xl md:px-10"
          >
            Let&apos;s design your ribbon together.
          </Link>
          <p className="max-w-[46rem] font-display text-[min(2rem,calc(0.92rem+1.95vw))] font-normal uppercase leading-snug tracking-normal text-mf-black md:text-[min(2.35rem,calc(1rem+2.35vw))]">
            Crafted for those who notice the difference.
          </p>
        </div>
      </section>
    </>
  )
}
