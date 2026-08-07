/**
 * Where the visitor's choice lives.
 *
 * A cookie, not localStorage: it is the thing the choice is about, it travels
 * with the domain, and it expires on its own after a year, which is what the
 * Garante expects rather than a decision that lasts forever.
 */

export type Consent = 'accepted' | 'necessary'

const NAME = 'cookie_consent'
const YEAR = 365 * 24 * 60 * 60

export const readConsent = (): Consent | null => {
  const hit = document.cookie
    .split('; ')
    .find((c) => c.startsWith(`${NAME}=`))
    ?.split('=')[1]
  return hit === 'accepted' || hit === 'necessary' ? hit : null
}

export const writeConsent = (value: Consent) => {
  document.cookie = `${NAME}=${value}; max-age=${YEAR}; path=/; SameSite=Lax`
}

export const clearConsent = () => {
  document.cookie = `${NAME}=; max-age=0; path=/; SameSite=Lax`
}

/** The banner is for people who have not chosen yet, and nobody else. */
export const shouldShowConsentBanner = (): boolean => readConsent() === null
