import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { type Consent, readConsent, shouldShowConsentBanner, writeConsent } from '../lib/cookieConsent'
import { loadAllTrackingScripts } from '../lib/trackingScripts'

/**
 * The cookie banner, and the consent it records.
 *
 * Analytics is already counting when this appears: Consent Mode in index.html
 * starts `analytics_storage` granted, so every visit shows up in the reports
 * whatever the visitor decides here. What the banner actually gates is the
 * advertising side, which stays denied until someone accepts all of it.
 *
 * Both buttons are the same size and the same weight. Refusing has to be as
 * easy as accepting: that is the part the Garante checks.
 */
export function CookieConsent() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    setShow(shouldShowConsentBanner())
  }, [])

  const decide = useCallback((value: Consent) => {
    writeConsent(value)
    setShow(false)
    if (value === 'accepted') loadAllTrackingScripts()
  }, [])

  if (!show) return null

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[200] border-t border-mf-muted/20 bg-mf-sand px-[4vw] py-5 shadow-[0_-2px_24px_rgba(0,0,0,0.07)]"
    >
      <div className="mx-auto flex max-w-[1100px] flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-10">
        <p className="font-sans text-[0.85rem] font-light leading-relaxed text-mf-muted">
          We measure how the site is used with anonymised analytics, so we know which pages are
          read. What you decide here is the advertising side: whether we may also see how our
          Instagram and Facebook campaigns perform.{' '}
          <Link to="/privacy-policy" className="underline underline-offset-2 hover:text-mf-black">
            Privacy &amp; Cookie Policy
          </Link>
        </p>
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => decide('necessary')}
            className="min-h-[46px] min-w-[210px] border border-mf-black bg-transparent px-6 font-sans text-[0.75rem] uppercase tracking-[0.15em] text-mf-black transition-colors hover:bg-mf-black/5"
          >
            Accept Necessary Only
          </button>
          <button
            type="button"
            onClick={() => decide('accepted')}
            className="min-h-[46px] min-w-[210px] border border-mf-black bg-transparent px-6 font-sans text-[0.75rem] uppercase tracking-[0.15em] text-mf-black transition-colors hover:bg-mf-black/5"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  )
}

/**
 * On every later visit the saved answer is applied again, silently. Someone who
 * accepted once should not be asked twice, and should not lose what they turned
 * on either.
 */
export function TrackingConsentBootstrap() {
  useEffect(() => {
    if (readConsent() === 'accepted') loadAllTrackingScripts()
  }, [])
  return null
}
