/**
 * Single source of truth for anything that needs the public address of the
 * site: canonical URLs, Open Graph tags, the sitemap and the structured data.
 *
 * While the site lives on a preview URL, set VITE_SITE_URL to that address and
 * VITE_NOINDEX=true so Google never indexes the staging copy. Drop both once
 * the domain points here.
 */
export const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://www.motifloral.com').replace(
  /\/$/,
  '',
)

/** True while we are on a preview deploy and want search engines to stay away. */
export const NOINDEX = import.meta.env.VITE_NOINDEX === 'true'

export const SITE_NAME = 'Motif Floral'

export const BUSINESS = {
  name: 'Motif Floral',
  legalName: 'Motif Floral',
  founded: '2018',
  email: 'motifloral@gmail.com',
  phone: '+39 334 569 9447',
  /** E.164, required by structured data. */
  phoneE164: '+393345699447',
  city: 'Rome',
  region: 'Lazio',
  country: 'IT',
  /** Where we actually take commissions. */
  areaServed: [
    'Rome',
    'Tuscany',
    'Amalfi Coast',
    'Lake Como',
    'Umbria',
    'Puglia',
    'Italy',
    'United Arab Emirates',
  ],
  social: [
    'https://www.instagram.com/motifloral',
    'https://www.facebook.com/motifloral/',
    'https://it.pinterest.com/motifloral/',
    'https://tiktok.com/@motif.floral',
  ],
} as const

export const absolute = (path: string) =>
  path.startsWith('http') ? path : `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
