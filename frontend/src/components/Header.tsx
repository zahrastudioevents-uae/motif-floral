import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { NAV } from '../data/nav'

const linkClass = (overlay: boolean) =>
  [
    'text-[0.75rem] uppercase tracking-[0.1em] transition-colors',
    overlay
      ? 'text-white hover:text-white/80'
      : 'text-mf-black hover:text-mf-muted',
  ].join(' ')

const activeClass = (overlay: boolean, isActive: boolean) =>
  isActive ? (overlay ? 'text-white underline' : 'text-mf-black underline') : ''

export function Header({ overlay = false }: { overlay?: boolean }) {
  const [open, setOpen] = useState(false)

  return (
    <header
      className={[
        'z-50 w-full',
        overlay ? 'absolute left-0 right-0 top-0 bg-transparent' : 'relative bg-mf-white',
      ].join(' ')}
    >
      <div className="mx-auto flex max-w-[1500px] items-center justify-between px-[4vw] py-6">
        <Link
          to="/"
          className={[
            'font-sans text-[min(1.75rem,1rem+0.83vw)] font-light uppercase tracking-normal',
            overlay ? 'text-white' : 'text-mf-black',
          ].join(' ')}
        >
          Motif Floral
        </Link>
        <nav className="hidden items-center gap-10 md:flex" aria-label="Main">
          {NAV.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                [linkClass(overlay), activeClass(overlay, isActive)].join(' ')
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
        <button
          type="button"
          className={`md:hidden ${overlay ? 'text-white' : 'text-mf-black'}`}
          aria-expanded={open}
          aria-label="Menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="block h-0.5 w-8 bg-current" />
        </button>
      </div>
      {open ? (
        <div className="border-t border-mf-accent bg-mf-white px-[4vw] py-4 md:hidden">
          <ul className="flex flex-col gap-3">
            {NAV.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === '/'}
                  onClick={() => setOpen(false)}
                  className="text-[0.75rem] uppercase tracking-[0.1em] text-mf-black"
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
