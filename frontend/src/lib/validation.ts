/**
 * Form validation, ported from the rules proven on the Zahra Studio site.
 *
 * Every function returns an error string or an empty string. The messages are
 * fixed on purpose: they are what the visitor reads, and they were written once
 * so that every form on the site says the same thing about the same mistake.
 */

export const validateEmail = (email: string): string => {
  if (!email) return 'Email is required'
  if (!email.includes('@')) return 'Email must contain @'
  if (!email.includes('.')) return 'Please enter a valid email address'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Please enter a valid email address'
  return ''
}

export const validatePhone = (phone: string): string => {
  if (!phone) return 'Phone number is required'
  if (!/^[\d\s-]+$/.test(phone)) return 'Only numbers, spaces and dashes allowed'
  const digits = phone.replace(/[\s-]/g, '')
  if (digits.length < 6) return 'Phone number must be at least 6 digits'
  if (digits.length > 15) return 'Phone number must be at most 15 digits'
  return ''
}

export const validateName = (name: string): string => {
  if (!name) return 'This field is required'
  if (name.trim().length < 2) return 'Must be at least 2 characters'
  if (name.length > 100) return 'Must be at most 100 characters'
  return ''
}

export const validateRequired = (value: string): string =>
  !value || !value.trim() ? 'This field is required' : ''

export const validateGuestCount = (count: string): string => {
  if (!count) return 'Guest count is required'
  if (!/^\d+$/.test(count)) return 'Please enter a valid number'
  return ''
}

/**
 * Dates arrive as DD/MM/YYYY. Being a real date matters as much as the shape:
 * 31/02 passes a regex and fails a calendar, and a date in the past means the
 * enquiry cannot be quoted.
 */
export const validateDate = (value: string): string => {
  if (!value) return 'This field is required'
  const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value)
  if (!m) return 'Please use the format DD/MM/YYYY'
  const [, dd, mm, yyyy] = m
  const day = Number(dd)
  const month = Number(mm)
  const year = Number(yyyy)
  const d = new Date(year, month - 1, day)
  if (d.getFullYear() !== year || d.getMonth() !== month - 1 || d.getDate() !== day) {
    return 'Please enter a real date'
  }
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  if (d < today) return 'Please enter a date in the future'
  return ''
}

/** Keeps the caret sane: digits only, sliced into DD/MM/YYYY as you type. */
export const formatDateInput = (raw: string): string => {
  const digits = raw.replace(/\D/g, '').slice(0, 8)
  if (digits.length <= 2) return digits
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`
}

/** The red frame an invalid field wears once the visitor has left it. */
export const getInputBorderClass = (touched: boolean, error: string): string =>
  touched && error ? 'mf-field-invalid' : ''

export type MissingField = { label: string; scrollText: string }

/**
 * Sends the page to the first thing that is missing. Matching on the label text
 * rather than an id keeps this working when fields move around, which they do.
 */
export const scrollToField = (scrollText: string) => {
  const labels = Array.from(document.querySelectorAll('label, span, p'))
  const hit = labels.find((el) => el.textContent?.trim().startsWith(scrollText))
  if (hit) hit.scrollIntoView({ behavior: 'smooth', block: 'center' })
}
