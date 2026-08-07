export type ServiceType = 'events' | 'wedding' | 'elopement'

/**
 * Two choices, not three: a couple picks the celebration, not the label. Whether
 * it is a wedding or an elopement is asked inside the form, because the two only
 * diverge once the questions start (guest count, floral pieces, budget).
 */
export const SERVICE_TABS: { key: Exclude<ServiceType, 'elopement'>; label: string }[] = [
  { key: 'wedding', label: 'Weddings and elopements' },
  { key: 'events', label: 'Events' },
]

export const WEDDING_KIND_OPTIONS = [
  { value: 'wedding', label: 'Wedding' },
  { value: 'elopement', label: 'Elopement' },
] as const

export const LOCATION_OPTIONS = [
  { value: 'italy', label: 'Italy' },
  { value: 'europe', label: 'Europe' },
  { value: 'uae', label: 'United Arab Emirates' },
  { value: 'other', label: 'Other / To be defined' },
] as const

export type LocationValue = (typeof LOCATION_OPTIONS)[number]['value'] | ''

export { HOW_FOUND_OPTIONS as REFERRAL_SOURCES, HOW_FOUND_NEEDING_DETAIL as REFERRAL_SOURCES_NEEDING_DETAIL } from './forms'

export const WEDDING_SERVICE_OPTIONS = [
  { value: 'Full Floral Design', label: 'Full Floral Design', needsMultiDay: false },
  { value: 'Design & Creative Direction', label: 'Design & Creative Direction', needsMultiDay: false },
  { value: 'Multi-Day Celebrations', label: 'Multi-Day Celebrations', needsMultiDay: true },
] as const

/** Which floral pieces the couple actually needs, the core of any floral quote. */
export const FLORAL_PIECES_WEDDING = [
  { value: 'Bouquet', label: 'Bouquet' },
  { value: 'Bouquets & boutonnieres', label: 'Bouquets & boutonnieres' },
  { value: 'Ceremony decoration', label: 'Ceremony decoration' },
  { value: 'Table decoration', label: 'Table decoration' },
  { value: 'Centrepieces', label: 'Centrepieces' },
] as const

/** Elopements: four options, laid out two per row. */
export const FLORAL_PIECES_ELOPEMENT = [
  { value: 'Bouquet', label: 'Bouquet' },
  { value: 'Boutonniere', label: 'Boutonniere' },
  { value: 'Ceremony decoration', label: 'Ceremony decoration' },
  { value: 'Table decoration', label: 'Table decoration' },
] as const

export const ELOPEMENT_GUEST_OPTIONS = [
  { value: 'just-us', label: 'Just the two of us' },
  { value: 'close-family', label: 'Less than 10 guests' },
  { value: 'more-than-10', label: 'More than 10 guests' },
] as const

const eur = (opts: string[]) => opts
const aed = (opts: string[]) => opts

export const BUDGET_EVENT = {
  EUR: eur([
    '€ 5,000 - € 10,000',
    '€ 10,000 - € 25,000',
    '€ 25,000 - € 50,000',
    '€ 50,000 - € 100,000',
    '€ 100,000 - € 200,000',
    '€ 200,000+',
  ]),
  AED: aed([
    'AED 20,000 - AED 40,000',
    'AED 40,000 - AED 100,000',
    'AED 100,000 - AED 200,000',
    'AED 200,000 - AED 400,000',
    'AED 400,000 - AED 800,000',
    'AED 800,000+',
  ]),
}

/** Weddings start at € 8,000. Elopements and intimate celebrations are the exception. */
export const BUDGET_WEDDING = {
  EUR: eur([
    '€ 8,000 - € 12,000',
    '€ 12,000 - € 20,000',
    '€ 20,000 - € 35,000',
    '€ 35,000 - € 55,000',
    '€ 55,000 - € 90,000',
    '€ 90,000+',
  ]),
  AED: aed([
    'AED 32,000 - AED 50,000',
    'AED 50,000 - AED 80,000',
    'AED 80,000 - AED 140,000',
    'AED 140,000 - AED 220,000',
    'AED 220,000 - AED 350,000',
    'AED 350,000+',
  ]),
}

export const BUDGET_ELOPEMENT = {
  EUR: eur([
    '€ 4,000 - € 7,000',
    '€ 7,000 - € 12,000',
    '€ 12,000 - € 20,000',
    '€ 20,000+',
  ]),
  /** Mirrors the EUR bands, so the lowest one starts at the same real figure. */
  AED: aed([
    'AED 16,000 - AED 28,000',
    'AED 28,000 - AED 48,000',
    'AED 48,000 - AED 80,000',
    'AED 80,000+',
  ]),
}

export const PREFERRED_MOMENT_OPTIONS = ['Morning / Lunch', 'Afternoon / Dinner'] as const
