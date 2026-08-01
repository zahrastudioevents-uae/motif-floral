import { type ReactNode } from 'react'

export function RestyleHero({
  eyebrow,
  title,
  text,
  image,
  children,
}: {
  eyebrow?: string
  title: string
  text?: ReactNode
  image: string
  children?: ReactNode
}) {
  return (
    <section className="relative flex min-h-[68vh] items-end overflow-hidden bg-mf-black px-[4vw] py-16 text-white md:min-h-[78vh] md:py-20">
      <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/20 to-black/75" />
      <div className="relative z-10 mx-auto grid w-full max-w-[1500px] gap-10 md:grid-cols-[1fr_auto] md:items-end">
        <div className="max-w-4xl">
          {eyebrow ? (
            <p className="font-sans text-[0.6875rem] font-light uppercase tracking-[0.3em] text-white/70">
              {eyebrow}
            </p>
          ) : null}
          <h1 className={`font-display text-[min(5rem,2rem+5vw)] font-normal uppercase leading-[0.98] tracking-wide ${eyebrow ? 'mt-5' : ''}`}>
            {title}
          </h1>
          {text ? (
            <p className="mt-6 max-w-2xl font-sans text-[0.875rem] font-light leading-[1.9] text-white/82">
              {text}
            </p>
          ) : null}
        </div>
        {children}
      </div>
    </section>
  )
}
