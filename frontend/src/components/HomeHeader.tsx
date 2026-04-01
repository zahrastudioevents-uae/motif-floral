import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const leftNav = [
  { to: '/', label: 'Home', end: true },
  { to: '/about/', label: 'About', end: false },
  { to: '/portfolio/', label: 'Portfolio', end: false },
] as const

const rightNav = [
  { to: '/contact/', label: 'Contact', end: false },
  { to: '/getquote/', label: 'Get a Quote', end: false },
] as const

export function HomeHeader({ overHero = false }: { overHero?: boolean }) {
  const [open, setOpen] = useState(false)

  const linkClass = overHero
    ? 'text-[0.75rem] font-light uppercase tracking-[0.12em] text-white transition-colors hover:text-white/75'
    : 'text-[0.75rem] font-light uppercase tracking-[0.12em] text-mf-black transition-colors hover:text-mf-muted'

  const active = (isActive: boolean) =>
    isActive
      ? overHero
        ? 'underline decoration-1 underline-offset-4'
        : 'underline decoration-1 underline-offset-4'
      : ''

  const logoClass = overHero
    ? 'text-center font-sans text-[min(1.75rem,1rem+0.83vw)] font-extralight uppercase tracking-[0.08em] text-white'
    : 'text-center font-sans text-[min(1.75rem,1rem+0.83vw)] font-extralight uppercase tracking-[0.08em] text-mf-black'

  return (
    <header
      className={
        overHero
          ? 'absolute left-0 right-0 top-0 z-50 w-full bg-transparent'
          : 'relative z-50 w-full bg-mf-white'
      }
    >
      <div className="mx-auto hidden max-w-[1500px] grid-cols-3 items-center gap-4 px-[4vw] py-6 md:grid">
        <nav className="flex flex-wrap items-center justify-start gap-x-8 gap-y-2" aria-label="Main left">
          {leftNav.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) => [linkClass, active(isActive)].join(' ')}
            >
              {label}
            </NavLink>
          ))}
        </nav>
        <Link to="/" className={logoClass}>
          Motif Floral
        </Link>
        <nav className="flex flex-wrap items-center justify-end gap-x-8 gap-y-2" aria-label="Main right">
          {rightNav.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) => [linkClass, active(isActive)].join(' ')}
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="flex items-center justify-between px-[4vw] py-5 md:hidden">
        <button
          type="button"
          className={overHero ? 'text-white' : 'text-mf-black'}
          aria-expanded={open}
          aria-label="Menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span className={`block h-px w-7 ${overHero ? 'bg-white' : 'bg-mf-black'}`} />
          <span className={`mt-1.5 block h-px w-7 ${overHero ? 'bg-white' : 'bg-mf-black'}`} />
          <span className={`mt-1.5 block h-px w-7 ${overHero ? 'bg-white' : 'bg-mf-black'}`} />
        </button>
        <Link
          to="/"
          className={`absolute left-1/2 -translate-x-1/2 font-sans text-lg font-extralight uppercase tracking-[0.08em] ${overHero ? 'text-white' : 'text-mf-black'}`}
        >
          Motif Floral
        </Link>
        <span className="w-7" aria-hidden />
      </div>

      {open ? (
        <div
          className={
            overHero
              ? 'border-t border-white/20 bg-black/40 px-[4vw] py-5 backdrop-blur-sm md:hidden'
              : 'border-t border-mf-accent bg-mf-white px-[4vw] py-5 md:hidden'
          }
        >
          <ul className="flex flex-col gap-4">
            {[...leftNav, ...rightNav].map(({ to, label, end }) => (
              <li key={`${to}-${label}`}>
                <NavLink
                  to={to}
                  end={end}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    [linkClass, 'block text-sm', active(isActive)].join(' ')
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </header>
  )
}
