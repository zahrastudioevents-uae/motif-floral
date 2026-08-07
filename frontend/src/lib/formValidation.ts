// Reusable form-validation engine for Motif Floral.
// Mirrors the battle-tested rules from the Zahra Studio site:
// validate-on-touch, red border + inline error per field, and a
// "missing fields" list with smooth-scroll to the first problem on submit.

import { useCallback, useState } from 'react'

export type Validator = (value: string) => string

// ---- Validators (exact rules, ported from Zahra) ----

export const validateEmail: Validator = (email) => {
  if (!email) return 'Email is required'
  if (!email.includes('@')) return 'Email must contain @'
  if (!email.includes('.')) return 'Please enter a valid email address'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Please enter a valid email address'
  return ''
}

export const validatePhone: Validator = (phone) => {
  if (!phone) return 'Phone number is required'
  const cleaned = phone.replace(/[\s-]/g, '')
  if (cleaned.length < 6) return 'Phone number must be at least 6 digits'
  if (cleaned.length > 15) return 'Phone number must be at most 15 digits'
  if (!/^[\d\s-]+$/.test(phone)) return 'Only numbers, spaces and dashes allowed'
  return ''
}

export const validateName: Validator = (name) => {
  if (!name) return 'This field is required'
  if (name.trim().length < 2) return 'Must be at least 2 characters'
  if (name.length > 100) return 'Must be at most 100 characters'
  return ''
}

export const validateRequired: Validator = (value) => {
  if (!value || !value.trim()) return 'This field is required'
  return ''
}

export const validateGuestCount: Validator = (count) => {
  if (!count) return 'Guest count is required'
  if (!/^\d+$/.test(count.replace(/\s/g, ''))) return 'Please enter a valid number'
  return ''
}

// Date typed as DD/MM/YYYY (or DD / MM / YYYY). Must be a real, future-ish date.
export const validateDate: Validator = (value) => {
  if (!value) return 'Date is required'
  const m = value.replace(/\s/g, '').match(/^(\d{2})\/(\d{2})\/(\d{4})$/)
  if (!m) return 'Use the format DD/MM/YYYY'
  const day = parseInt(m[1], 10)
  const month = parseInt(m[2], 10)
  const year = parseInt(m[3], 10)
  if (month < 1 || month > 12) return 'Month must be between 01 and 12'
  const daysInMonth = new Date(year, month, 0).getDate()
  if (day < 1 || day > daysInMonth) return 'That day does not exist in this month'
  return ''
}

/**
 * Auto-format a date as the user types: keeps digits only and inserts the
 * slashes after day and month. Returns a value like "15/06/2027".
 */
export function formatDateInput(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 8)
  const parts = [digits.slice(0, 2), digits.slice(2, 4), digits.slice(4, 8)].filter(Boolean)
  return parts.join('/')
}

// ---- The hook: per-field touched state, errors, submit gating ----

export interface FieldSpec {
  /** field key, matches your state / input name */
  name: string
  /** human label shown in the "missing fields" list */
  label: string
  /** validator to run */
  validator: Validator
  /** current value getter */
  getValue: () => string
}

export function useFormValidation() {
  const [touched, setTouched] = useState<Set<string>>(new Set())
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [missing, setMissing] = useState<string[]>([])

  const markTouched = useCallback((name: string) => {
    setTouched((prev) => new Set(prev).add(name))
  }, [])

  // Validate a single field (used on blur and, once touched, on change).
  const validateField = useCallback((name: string, value: string, validator: Validator) => {
    const error = validator(value)
    setErrors((prev) => ({ ...prev, [name]: error }))
    return error === ''
  }, [])

  // Red border only after the field has been touched and is invalid.
  const borderClass = useCallback(
    (name: string) => (touched.has(name) && errors[name] ? 'border-red-400 bg-red-50/30' : ''),
    [touched, errors],
  )

  // Inline error text, only after touch.
  const fieldError = useCallback(
    (name: string) => (touched.has(name) ? errors[name] || '' : ''),
    [touched, errors],
  )

  /**
   * Run on submit. Validates every spec, fills `missing`, marks all touched,
   * and smooth-scrolls to the first missing field's label. Returns true if OK.
   */
  const validateAll = useCallback((specs: FieldSpec[]) => {
    const nextErrors: Record<string, string> = {}
    const missingLabels: string[] = []
    let firstBadName = ''
    for (const s of specs) {
      const err = s.validator(s.getValue())
      nextErrors[s.name] = err
      if (err) {
        missingLabels.push(s.label)
        if (!firstBadName) firstBadName = s.name
      }
    }
    setErrors(nextErrors)
    setMissing(missingLabels)
    setTouched(new Set(specs.map((s) => s.name)))
    if (firstBadName) {
      setTimeout(() => {
        const el =
          document.querySelector(`[name="${firstBadName}"]`) ||
          document.getElementById(firstBadName)
        el?.scrollIntoView({ behavior: 'smooth', block: 'center' })
        ;(el as HTMLElement | null)?.focus?.()
      }, 50)
      return false
    }
    return true
  }, [])

  const clearMissing = useCallback(() => setMissing([]), [])

  const reset = useCallback(() => {
    setTouched(new Set())
    setErrors({})
    setMissing([])
  }, [])

  return {
    touched,
    errors,
    missing,
    markTouched,
    validateField,
    borderClass,
    fieldError,
    validateAll,
    clearMissing,
    reset,
  }
}
