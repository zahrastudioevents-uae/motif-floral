import { useEffect, useMemo, useRef, useState } from 'react'

/**
 * Phone, split in two: the country code is picked, the number is typed.
 *
 * Asking someone to remember their own international prefix is how you get
 * "0500000000" in the inbox and no way to call back. The value handed to the
 * form is the single string the email wants: "+971 500000000".
 */

type Country = { code: string; dial: string; name: string; flag: string }

// The markets Motif actually works in first, then the rest of Europe and the
// Gulf, then the places couples travel from most.
export const COUNTRIES: Country[] = [
  { code: 'AE', dial: '+971', name: 'United Arab Emirates', flag: '🇦🇪' },
  { code: 'IT', dial: '+39', name: 'Italy', flag: '🇮🇹' },
  { code: 'GB', dial: '+44', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'US', dial: '+1', name: 'United States', flag: '🇺🇸' },
  { code: 'FR', dial: '+33', name: 'France', flag: '🇫🇷' },
  { code: 'DE', dial: '+49', name: 'Germany', flag: '🇩🇪' },
  { code: 'ES', dial: '+34', name: 'Spain', flag: '🇪🇸' },
  { code: 'CH', dial: '+41', name: 'Switzerland', flag: '🇨🇭' },
  { code: 'NL', dial: '+31', name: 'Netherlands', flag: '🇳🇱' },
  { code: 'BE', dial: '+32', name: 'Belgium', flag: '🇧🇪' },
  { code: 'AT', dial: '+43', name: 'Austria', flag: '🇦🇹' },
  { code: 'PT', dial: '+351', name: 'Portugal', flag: '🇵🇹' },
  { code: 'GR', dial: '+30', name: 'Greece', flag: '🇬🇷' },
  { code: 'IE', dial: '+353', name: 'Ireland', flag: '🇮🇪' },
  { code: 'SE', dial: '+46', name: 'Sweden', flag: '🇸🇪' },
  { code: 'NO', dial: '+47', name: 'Norway', flag: '🇳🇴' },
  { code: 'DK', dial: '+45', name: 'Denmark', flag: '🇩🇰' },
  { code: 'PL', dial: '+48', name: 'Poland', flag: '🇵🇱' },
  { code: 'SA', dial: '+966', name: 'Saudi Arabia', flag: '🇸🇦' },
  { code: 'QA', dial: '+974', name: 'Qatar', flag: '🇶🇦' },
  { code: 'KW', dial: '+965', name: 'Kuwait', flag: '🇰🇼' },
  { code: 'BH', dial: '+973', name: 'Bahrain', flag: '🇧🇭' },
  { code: 'OM', dial: '+968', name: 'Oman', flag: '🇴🇲' },
  { code: 'LB', dial: '+961', name: 'Lebanon', flag: '🇱🇧' },
  { code: 'EG', dial: '+20', name: 'Egypt', flag: '🇪🇬' },
  { code: 'TR', dial: '+90', name: 'Turkey', flag: '🇹🇷' },
  { code: 'IN', dial: '+91', name: 'India', flag: '🇮🇳' },
  { code: 'AU', dial: '+61', name: 'Australia', flag: '🇦🇺' },
  { code: 'CA', dial: '+1', name: 'Canada', flag: '🇨🇦' },
  { code: 'BR', dial: '+55', name: 'Brazil', flag: '🇧🇷' },
  { code: 'ZA', dial: '+27', name: 'South Africa', flag: '🇿🇦' },
  { code: 'SG', dial: '+65', name: 'Singapore', flag: '🇸🇬' },
  { code: 'JP', dial: '+81', name: 'Japan', flag: '🇯🇵' },
]

export function PhoneField({
  dial,
  number,
  onDial,
  onNumber,
  onBlur,
  invalid,
}: {
  dial: string
  number: string
  onDial: (v: string) => void
  onNumber: (v: string) => void
  onBlur?: () => void
  invalid?: boolean
}) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const box = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const away = (e: MouseEvent) => {
      if (box.current && !box.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', away)
    return () => document.removeEventListener('mousedown', away)
  }, [open])

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return COUNTRIES
    return COUNTRIES.filter(
      (c) => c.name.toLowerCase().includes(q) || c.dial.includes(q) || c.code.toLowerCase() === q,
    )
  }, [query])

  const current = COUNTRIES.find((c) => c.dial === dial) ?? COUNTRIES[0]

  return (
    <div ref={box} className={`relative flex ${invalid ? 'mf-field-invalid' : ''}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Select country code"
        className="flex shrink-0 items-center gap-2 bg-white px-3.5 py-3.5 font-sans text-[1.0625rem] text-mf-black"
      >
        <span aria-hidden>{current.flag}</span>
        <span>{current.dial}</span>
        <span aria-hidden className="text-[0.7rem] text-mf-muted">
          &#9662;
        </span>
      </button>
      <span aria-hidden className="my-2.5 w-px bg-mf-muted/20" />
      <input
        type="tel"
        inputMode="tel"
        value={number}
        onChange={(e) => onNumber(e.target.value)}
        onBlur={onBlur}
        placeholder="Numbers only, 6 to 15 digits"
        className="w-full border-0 bg-white px-4 py-3.5 font-sans text-[1.0625rem] text-mf-black outline-none"
      />

      {open ? (
        <div className="absolute left-0 top-full z-30 mt-1 max-h-72 w-72 overflow-y-auto border border-mf-muted/25 bg-white shadow-lg">
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search country"
            className="w-full border-0 border-b border-mf-muted/20 bg-white px-4 py-3 font-sans text-[0.95rem] text-mf-black outline-none"
          />
          {shown.map((c) => (
            <button
              key={c.code}
              type="button"
              onClick={() => {
                onDial(c.dial)
                setOpen(false)
                setQuery('')
              }}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-left font-sans text-[0.95rem] text-mf-black hover:bg-mf-sand"
            >
              <span aria-hidden>{c.flag}</span>
              <span className="flex-1">{c.name}</span>
              <span className="text-mf-muted">{c.dial}</span>
            </button>
          ))}
          {shown.length === 0 ? (
            <p className="px-4 py-3 font-sans text-[0.9rem] text-mf-muted">No country found</p>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
