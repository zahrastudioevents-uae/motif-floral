import { Link } from 'react-router-dom'
import { NAV } from '../data/nav'

const ICON = 13

function FacebookIcon() {
  return (
    <svg width={ICON} height={ICON} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg width={ICON} height={ICON} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

function TikTokIcon() {
  return (
    <svg width={ICON} height={ICON} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.7a8.16 8.16 0 004.77 1.52V6.77a4.85 4.85 0 01-1-.08z" />
    </svg>
  )
}

function PinterestIcon() {
  return (
    <svg width={ICON} height={ICON} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.237 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.182-.78 1.172-4.97 1.172-4.97s-.299-.598-.299-1.482c0-1.388.806-2.425 1.808-2.425.853 0 1.265.64 1.265 1.408 0 .858-.546 2.14-.828 3.33-.236.995.499 1.806 1.48 1.806 1.778 0 3.144-1.874 3.144-4.58 0-2.393-1.72-4.068-4.177-4.068-2.845 0-4.515 2.135-4.515 4.34 0 .859.331 1.781.745 2.282a.3.3 0 01.069.288l-.278 1.133c-.044.183-.145.222-.335.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.965-.527-2.291-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.523 0 10-4.477 10-10S17.523 2 12 2z" />
    </svg>
  )
}

const social = [
  { href: 'https://www.facebook.com/motifloral/', label: 'Facebook', icon: FacebookIcon },
  { href: 'https://www.instagram.com/motifloral', label: 'Instagram', icon: InstagramIcon },
  { href: 'https://tiktok.com/@motif.floral', label: 'TikTok', icon: TikTokIcon },
  { href: 'https://it.pinterest.com/motifloral/', label: 'Pinterest', icon: PinterestIcon },
]

export function Footer() {
  return (
    <footer className="border-t border-mf-accent bg-mf-white py-8 md:py-10">
      <div className="mx-auto max-w-[1500px] px-[4vw]">
        <nav
          className="mb-5 flex flex-wrap justify-center gap-x-10 gap-y-3 md:mb-6"
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
        <div className="mb-5 flex justify-center gap-10 md:mb-6">
          {social.map((s) => (
            <a
              key={s.href}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-9 min-w-9 items-center justify-center text-mf-black/70 transition-colors hover:text-mf-black"
              aria-label={s.label}
            >
              <s.icon />
            </a>
          ))}
        </div>
        <small className="block text-center text-[0.625rem] font-light leading-relaxed tracking-[0.02em] text-mf-muted md:text-[0.65rem]">
          <p>
            &copy; {new Date().getFullYear()} Motif Floral | Bespoke Floral Design for Weddings &amp;
            Events in Italy | Based in Rome &middot; Available Worldwide
          </p>
          <p className="mt-2">VAT: 15270551003</p>
        </small>
      </div>
    </footer>
  )
}
