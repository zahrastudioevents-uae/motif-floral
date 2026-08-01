import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { lightPath } from './NightScope'

/* Same elements as the classic menu, pointing to the night ("2") routes. */
const leftNav = [
  { to: '/home2/', label: 'Home', end: true },
  { to: '/about2/', label: 'About', end: false },
  { to: '/portfolio2/', label: 'Portfolio', end: false },
] as const

const rightNav = [
  { to: '/contact2/', label: 'Contact', end: false },
  { to: '/getquote2/', label: 'Get a Quote', end: false },
] as const

const moreNav = [
  { to: '/testimonials2/', label: 'Testimonials', end: false },
  { to: '/chooseyourbouquet2/', label: 'Bouquet', end: false },
  { to: '/mfaccessori2/', label: 'MF Accessories', end: false },
] as const

export function HomeHeader2({ overHero = false }: { overHero?: boolean }) {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  const linkClass =
    'text-[0.75rem] font-light uppercase tracking-[0.12em] text-mf-ivory transition-colors hover:text-mf-brass'

  const active = (isActive: boolean) =>
    isActive ? 'underline decoration-1 underline-offset-4' : ''

  return (
    <header
      className={
        overHero
          ? 'absolute left-0 right-0 top-0 z-50 w-full bg-transparent'
          : 'relative z-50 w-full border-b border-mf-ivory/15 bg-mf-night'
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
        <Link
          to="/home2/"
          className="text-center font-cormorant text-[min(1.85rem,1.05rem+0.85vw)] font-light uppercase tracking-[0.14em] text-mf-ivory"
        >
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
          <Link
            to={lightPath(pathname)}
            className="text-[0.6rem] font-light uppercase tracking-[0.18em] text-mf-ivory/45 transition-colors hover:text-mf-ivory"
            title="Torna al sito classico"
          >
            Classic
          </Link>
        </nav>
      </div>

      <div className="flex items-center justify-between px-[4vw] py-5 md:hidden">
        <button
          type="button"
          className="text-mf-ivory"
          aria-expanded={open}
          aria-label="Menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="block h-px w-7 bg-mf-ivory" />
          <span className="mt-1.5 block h-px w-7 bg-mf-ivory" />
          <span className="mt-1.5 block h-px w-7 bg-mf-ivory" />
        </button>
        <Link
          to="/home2/"
          className="absolute left-1/2 -translate-x-1/2 font-cormorant text-lg font-light uppercase tracking-[0.14em] text-mf-ivory"
        >
          Motif Floral
        </Link>
        <span className="w-7" aria-hidden />
      </div>

      {open ? (
        <div className="border-t border-mf-ivory/15 bg-mf-night/95 px-[4vw] py-5 backdrop-blur-sm md:hidden">
          <ul className="flex flex-col gap-4">
            {[...leftNav, ...moreNav, ...rightNav].map(({ to, label, end }) => (
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
            <li>
              <Link
                to={lightPath(pathname)}
                onClick={() => setOpen(false)}
                className="block text-sm font-light uppercase tracking-[0.18em] text-mf-ivory/45"
              >
                Classic
              </Link>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  )
}
