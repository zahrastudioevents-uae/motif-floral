/** Single source of truth, shared by Contact and every Get a Quote tab. */
export const HOW_FOUND_OPTIONS = [
  'Google search',
  'Instagram',
  'Blog or magazine',
  'The Wed',
  'Wed Vibes',
  'Pinterest',
  'Referral',
  'Other',
] as const

/** These answers reveal a free text box asking who or which one. */
export const HOW_FOUND_NEEDING_DETAIL: readonly string[] = ['Referral', 'Other']

export const howFoundDetailPlaceholder = (value: string) =>
  value === 'Referral' ? 'Who referred you?' : 'Please tell us where'

export const CONTACT_SERVICE_OPTIONS = [
  'Full wedding floral design',
  'Full wedding planning',
  'Intimate wedding / elopement',
  'Event or corporate',
  'Bridal bouquet only',
  'Other',
] as const

export const PRIVACY_TEXT = `I authorise the processing of my personal data in accordance with applicable privacy laws, including for the purpose of responding to this request. I understand I may withdraw consent or request access or erasure as provided by law.`

export const GUEST_COUNT_OPTIONS = [
  ...Array.from({ length: 200 }, (_, i) => String(i + 1)),
  '200 +',
] as const

export const TABLE_COUNT_OPTIONS = Array.from({ length: 40 }, (_, i) =>
  String(i + 1),
) as unknown as readonly string[]
