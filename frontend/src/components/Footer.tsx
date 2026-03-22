import { Link } from 'react-router-dom'
import { NAV } from '../data/nav'

const social = [
  { href: 'https://www.facebook.com/motifloral/', label: 'Facebook' },
  { href: 'https://www.instagram.com/motifloral', label: 'Instagram' },
  { href: 'https://tiktok.com/@motif.floral', label: 'TikTok' },
  { href: 'https://it.pinterest.com/motifloral/', label: 'Pinterest' },
]

export function Footer() {
  return (
    <footer className="border-t border-mf-accent bg-mf-white py-10">
      <div className="mx-auto max-w-[1500px] px-[4vw]">
        <nav
          className="mb-6 flex flex-wrap justify-center gap-x-10 gap-y-2"
          aria-label="Footer"
        >
          {NAV.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="text-[0.75rem] uppercase tracking-[0.1em] text-mf-black"
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="mb-6 flex justify-center gap-6">
          {social.map((s) => (
            <a
              key={s.href}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="text-[0.75rem] uppercase tracking-[0.08em] text-mf-muted hover:text-mf-black"
            >
              {s.label}
            </a>
          ))}
        </div>
        <small className="block text-center text-mf-muted">
          <p>
            © {new Date().getFullYear()} Motif Floral | Bespoke Floral Design for Weddings &amp;
            Events in Italy | Based in Rome · Available Worldwide
          </p>
          <p className="mt-1">VAT: 15270551003</p>
        </small>
      </div>
    </footer>
  )
}
