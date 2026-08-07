/**
 * The scripts that only run once someone has said yes to all of it.
 *
 * Analytics is handled separately, in index.html, where Consent Mode starts it
 * as granted so every visit is counted. What lives here is everything that
 * profiles or advertises, and none of it loads before "Accept All".
 */

type Gtag = (...args: unknown[]) => void
const w = () => window as unknown as { gtag?: Gtag; dataLayer?: unknown[]; fbq?: unknown; clarity?: unknown }

const META_PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID
const CLARITY_ID = import.meta.env.VITE_CLARITY_ID

let advertisingGranted = false
let pixelLoaded = false
let clarityLoaded = false

/** Tells Google that the advertising signals may now be used. */
export const grantTrackingConsent = () => {
  if (advertisingGranted) return
  advertisingGranted = true
  w().gtag?.('consent', 'update', {
    ad_storage: 'granted',
    ad_user_data: 'granted',
    ad_personalization: 'granted',
    analytics_storage: 'granted',
  })
}

export const loadMetaPixel = () => {
  if (pixelLoaded || !META_PIXEL_ID) return
  pixelLoaded = true
  const s = document.createElement('script')
  s.async = true
  s.src = 'https://connect.facebook.net/en_US/fbevents.js'
  document.head.appendChild(s)
  s.onload = () => {
    const fbq = (w() as unknown as { fbq?: (...a: unknown[]) => void }).fbq
    fbq?.('init', META_PIXEL_ID)
    fbq?.('track', 'PageView')
  }
}

export const loadMicrosoftClarity = () => {
  if (clarityLoaded || !CLARITY_ID) return
  clarityLoaded = true
  const s = document.createElement('script')
  s.async = true
  s.src = `https://www.clarity.ms/tag/${CLARITY_ID}`
  document.head.appendChild(s)
}

export const loadAllTrackingScripts = () => {
  grantTrackingConsent()
  loadMetaPixel()
  loadMicrosoftClarity()
}
