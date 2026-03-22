export const HOW_FOUND_OPTIONS = [
  'Instagram',
  'Facebook',
  'Pinterest',
  'Google search',
  'Friend or referral',
  'Wedding planner',
  'Vendor referral',
  'Blog or magazine',
  'Other',
] as const

export const CONTACT_SERVICE_OPTIONS = [
  'Full wedding floral design',
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
