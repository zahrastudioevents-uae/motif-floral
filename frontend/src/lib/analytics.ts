/**
 * Thin wrapper around gtag() so call sites stay readable and safe even
 * before gtag.js has fully loaded (the inline stub in index.html queues
 * commands into dataLayer, which gtag.js drains on load).
 */
export function trackEvent(name: string, params?: Record<string, unknown>): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  window.gtag('event', name, params)
}
