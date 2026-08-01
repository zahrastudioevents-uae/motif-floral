import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { lightPath } from './NightScope'

/* Same elements as the classic menu, pointing to the terra ("3") routes. */
const leftNav = [
  { to: '/home3/', label: 'Home', end: true },
  { to: '/about3/', label: 'About', end: false },
  { to: '/portfolio3/', label: 'Portfolio', end: false },
] as const

const rightNav = [
  { to: '/contact3/', label: 'Contact', end: false },
  { to: '/getquote3/', label: 'Get a Quote', end: false },
] as const

const moreNav = [
  { to: '/testimonials3/', label: 'Testimonials', end: false },
  { to: '/chooseyourbouquet3/', label: 'Bouquet', end: false },
  { to: '/mfaccessori3/', label: 'MF Accessories', end: false },
] as const

export function HomeHeader3({ overHero = false }: { overHero?: boolean }) {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  const linkClass =
    'text-[0.75rem] font-light uppercase tracking-[0.12em] text-mf-cream transition-colors hover:text-mf-violet'

  const active = (isActive: boolean) =>
    isActive ? 'underline decoration-1 underline-offset-4' : ''

  return (
    <header
      className={
        overHero
          ? 'absolute left-0 right-0 top-0 z-50 w-full bg-transparent'
          : 'relative z-50 w-full border-b border-mf-cream/20 bg-mf-terra'
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
        <Link to="/home3/" className="flex justify-center">
          <img
            src="/images/motif-wordmark.png"
            alt="motif floral"
            className="h-[min(2.6rem,1.5rem+1vw)] w-auto"
          />
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
            className="text-[0.6rem] font-light uppercase tracking-[0.18em] text-mf-cream/45 transition-colors hover:text-mf-cream"
            title="Torna al sito classico"
          >
            Classic
          </Link>
        </nav>
      </div>

      <div className="flex items-center justify-between px-[4vw] py-5 md:hidden">
        <button
          type="button"
          className="text-mf-cream"
          aria-expanded={open}
          aria-label="Menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="block h-px w-7 bg-mf-cream" />
          <span className="mt-1.5 block h-px w-7 bg-mf-cream" />
          <span className="mt-1.5 block h-px w-7 bg-mf-cream" />
        </button>
        <Link to="/home3/" className="absolute left-1/2 -translate-x-1/2">
          <img src="/images/motif-wordmark.png" alt="motif floral" className="h-7 w-auto" />
        </Link>
        <span className="w-7" aria-hidden />
      </div>

      {open ? (
        <div className="border-t border-mf-cream/20 bg-mf-terra/95 px-[4vw] py-5 backdrop-blur-sm md:hidden">
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
                className="block text-sm font-light uppercase tracking-[0.18em] text-mf-cream/45"
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
