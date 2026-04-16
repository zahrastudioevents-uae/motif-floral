import { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import { ThinArrowLeft, ThinArrowRight } from './icons/ThinArrows'

export type HomeTestimonialSlide = {
  quote: string
  names: string
  imgBack: string
  imgFront: string
  backAlt: string
  frontAlt: string
}

export function HomeTestimonialsSection({ slides }: { slides: HomeTestimonialSlide[] }) {
  const [i, setI] = useState(0)
  const total = slides.length
  const s = slides[i]!

  const prev = useCallback(() => setI((x) => (x - 1 + total) % total), [total])
  const next = useCallback(() => setI((x) => (x + 1) % total), [total])

  return (
    <section className="bg-mf-white px-[4vw] py-16 md:py-24">
      <h2 className="text-center font-sans text-[min(2.25rem,1rem+1.2vw)] font-extralight uppercase tracking-[0.08em] text-mf-black">
        Testimonials
      </h2>

      <div className="mx-auto mt-12 grid max-w-[1500px] gap-12 md:mt-16 md:grid-cols-12 md:items-stretch md:gap-10">
        {/* Left: two photos side-by-side with "Love notes" + "Read more" */}
        <div className="md:col-span-5">
          <div className="grid grid-cols-2 gap-3">
            {/* Left column: back image + READ MORE button */}
            <div className="flex flex-col">
              <img
                src={s.imgBack}
                alt={s.backAlt}
                className="aspect-[3/4] w-full object-cover"
              />
              <Link
                to="/testimonials/"
                className="mt-4 inline-block self-start bg-mf-btn px-6 py-2.5 text-[0.625rem] font-medium uppercase tracking-[0.12em] text-white transition-colors hover:bg-mf-btn-hover"
              >
                Read more
              </Link>
            </div>
            {/* Right column: "Love notes." label + front image (offset down) */}
            <div className="flex flex-col pt-8 md:pt-12">
              <p className="mb-3 font-sans text-[0.6875rem] font-medium uppercase leading-snug tracking-[0.14em] text-mf-black md:mb-4">
                Love notes.
              </p>
              <img
                src={s.imgFront}
                alt={s.frontAlt}
                className="aspect-[3/4] w-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Right: quote card */}
        <div className="flex min-h-[340px] flex-col bg-[#f7f7f5] px-6 py-8 md:col-span-7 md:min-h-[480px] md:px-12 md:py-10">
          <blockquote className="flex flex-1 flex-col justify-center text-center">
            <p className="font-serif text-[0.9375rem] font-normal italic leading-[1.85] text-mf-muted md:text-[1rem]">
              &ldquo;{s.quote}&rdquo;
            </p>
            <footer className="mt-8 font-sans text-[0.8125rem] font-normal uppercase tracking-[0.2em] text-mf-black md:text-[0.875rem]">
              {s.names}
            </footer>
          </blockquote>

          <div className="mt-8 flex w-full items-center justify-between text-mf-black md:mt-10">
            <button
              type="button"
              onClick={prev}
              className="p-1 text-mf-black transition-opacity hover:opacity-60"
              aria-label="Previous testimonial"
            >
              <ThinArrowLeft className="block" />
            </button>
            <span className="font-sans text-[0.6875rem] font-light tabular-nums tracking-[0.14em] text-mf-black">
              {i + 1} / {total}
            </span>
            <button
              type="button"
              onClick={next}
              className="p-1 text-mf-black transition-opacity hover:opacity-60"
              aria-label="Next testimonial"
            >
              <ThinArrowRight className="block" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
