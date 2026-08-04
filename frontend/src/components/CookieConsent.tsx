import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

/**
 * Analytics, and the consent it needs under Italian law.
 *
 * Nothing loads until someone accepts: no script, no cookie, no request to
 * Google. Declining is as easy as accepting, and both buttons look the same,
 * which is what the Garante actually checks.
 *
 * Set VITE_GA_ID to a G-XXXXXXX measurement id to switch the whole thing on.
 * With it unset the banner never appears, because there is nothing to consent
 * to.
 */
const GA_ID = import.meta.env.VITE_GA_ID
const KEY = 'mf_cookie_consent'

type Choice = 'accepted' | 'declined'

const read = (): Choice | null => {
  try {
    const v = localStorage.getItem(KEY)
    return v === 'accepted' || v === 'declined' ? v : null
  } catch {
    return null
  }
}

let loaded = false

function loadAnalytics() {
  if (loaded || !GA_ID) return
  loaded = true
  const s = document.createElement('script')
  s.async = true
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.appendChild(s)
  const w = window as unknown as { dataLayer: unknown[]; gtag: (...a: unknown[]) => void }
  w.dataLayer = w.dataLayer || []
  w.gtag = function gtag(...args: unknown[]) {
    w.dataLayer.push(args)
  }
  w.gtag('js', new Date())
  // No ad signals: this site does not advertise or profile anyone.
  w.gtag('config', GA_ID, { anonymize_ip: true })
}

export function CookieConsent() {
  const [choice, setChoice] = useState<Choice | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const stored = read()
    setChoice(stored)
    setReady(true)
    if (stored === 'accepted') loadAnalytics()
  }, [])

  const decide = useCallback((value: Choice) => {
    try {
      localStorage.setItem(KEY, value)
    } catch {
      /* private browsing: the choice just will not persist */
    }
    setChoice(value)
    if (value === 'accepted') loadAnalytics()
  }, [])

  if (!GA_ID || !ready || choice) return null

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[200] border-t border-mf-muted/20 bg-[#fcf9f4] px-[4vw] py-5 shadow-[0_-2px_24px_rgba(0,0,0,0.07)]"
    >
      <div className="mx-auto flex max-w-[1100px] flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-10">
        <p className="font-sans text-[0.85rem] font-light leading-relaxed text-mf-muted">
          We would like to measure how the site is used, with anonymised analytics. Nothing is loaded
          unless you agree, and we never use it for advertising.{' '}
          <Link to="/privacy/" className="underline underline-offset-2 hover:text-mf-black">
            Privacy Policy
          </Link>
        </p>
        {/* Same size, same weight: refusing must be no harder than accepting. */}
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => decide('declined')}
            className="min-h-[44px] border border-mf-black/25 bg-transparent px-6 font-sans text-[0.75rem] uppercase tracking-[0.15em] text-mf-black transition-colors hover:bg-mf-black/5"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => decide('accepted')}
            className="min-h-[44px] bg-mf-btn px-6 font-sans text-[0.75rem] uppercase tracking-[0.15em] text-white transition-colors hover:bg-mf-btn-hover"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}
