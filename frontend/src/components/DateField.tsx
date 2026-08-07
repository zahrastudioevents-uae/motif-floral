import { useEffect, useLayoutEffect, useRef, useState } from 'react'

/**
 * The date, picked on three wheels: DD | MM | YYYY.
 *
 * Nothing is typed here, so nothing can be typed wrong. Days follow the month
 * and the year, which is why February never offers a 30th and only a leap year
 * offers a 29th. The value handed back is always the string DD/MM/YYYY.
 */

type Part = 'day' | 'month' | 'year'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const TITLES: Record<Part, string> = { day: 'Day', month: 'Month', year: 'Year' }
const ROW = 44

const pad = (n: number) => String(n).padStart(2, '0')
const daysIn = (month: number, year: number) => new Date(year, month, 0).getDate()

const split = (value: string) => {
  const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value)
  return m ? { day: m[1], month: m[2], year: m[3] } : { day: '', month: '', year: '' }
}

function Wheel({
  part,
  options,
  selected,
  onPick,
}: {
  part: Part
  options: { value: string; label: string }[]
  selected: string
  onPick: (v: string) => void
}) {
  const list = useRef<HTMLDivElement>(null)

  // Open on the current choice, so the wheel starts where the eye expects.
  useLayoutEffect(() => {
    const i = options.findIndex((o) => o.value === selected)
    if (list.current && i > -1) list.current.scrollTop = i * ROW
  }, [options, selected])

  return (
    <div className="absolute left-1/2 top-full z-30 mt-2 w-40 -translate-x-1/2 border border-mf-muted/25 bg-white shadow-lg">
      <p className="border-b border-mf-muted/15 py-2 text-center font-sans text-[0.7rem] uppercase tracking-[0.2em] text-mf-muted">
        {TITLES[part]}
      </p>
      <div ref={list} className="max-h-[220px] overflow-y-auto">
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            onClick={() => onPick(o.value)}
            style={{ height: ROW }}
            className={`flex w-full items-center justify-center font-sans text-[1rem] transition-colors ${
              o.value === selected
                ? 'bg-mf-sand-deep text-mf-black'
                : 'text-mf-muted hover:bg-mf-sand hover:text-mf-black'
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export function DateField({
  value,
  onChange,
  onBlur,
  invalid,
}: {
  value: string
  onChange: (v: string) => void
  onBlur?: () => void
  invalid?: boolean
}) {
  const [open, setOpen] = useState<Part | null>(null)
  const box = useRef<HTMLDivElement>(null)
  const parts = split(value)

  useEffect(() => {
    if (!open) return
    const away = (e: MouseEvent) => {
      if (box.current && !box.current.contains(e.target as Node)) {
        setOpen(null)
        onBlur?.()
      }
    }
    document.addEventListener('mousedown', away)
    return () => document.removeEventListener('mousedown', away)
  }, [open, onBlur])

  const thisYear = new Date().getFullYear()
  const years = Array.from({ length: 11 }, (_, i) => String(thisYear + i))
  const month = Number(parts.month) || 1
  const year = Number(parts.year) || thisYear
  const days = Array.from({ length: daysIn(month, year) }, (_, i) => pad(i + 1))

  const write = (part: Part, v: string) => {
    const next = { ...parts, [part]: v }
    // A day that no longer exists in the new month quietly steps back.
    if (next.month && next.year) {
      const max = daysIn(Number(next.month), Number(next.year))
      if (next.day && Number(next.day) > max) next.day = pad(max)
    }
    onChange(next.day && next.month && next.year ? `${next.day}/${next.month}/${next.year}` : '')
    if (next.day && next.month && next.year) setOpen(null)
    else setOpen(part === 'day' ? 'month' : part === 'month' ? 'year' : null)
  }

  const segment = (part: Part, shown: string, placeholder: string) => (
    <button
      type="button"
      onClick={() => setOpen((p) => (p === part ? null : part))}
      className={`flex-1 py-3.5 text-center font-sans text-[1.0625rem] transition-colors ${
        shown ? 'text-mf-black' : 'text-mf-muted/70'
      } ${open === part ? 'bg-mf-sand' : 'hover:bg-mf-sand'}`}
    >
      {shown || placeholder}
    </button>
  )

  return (
    <div ref={box} className={`relative flex bg-white ${invalid ? 'mf-field-invalid' : ''}`}>
      {segment('day', parts.day, 'DD')}
      <span aria-hidden className="my-3 w-px bg-mf-muted/20" />
      {segment('month', parts.month, 'MM')}
      <span aria-hidden className="my-3 w-px bg-mf-muted/20" />
      {segment('year', parts.year, 'YYYY')}

      {open === 'day' ? (
        <Wheel
          part="day"
          options={days.map((d) => ({ value: d, label: d }))}
          selected={parts.day}
          onPick={(v) => write('day', v)}
        />
      ) : null}
      {open === 'month' ? (
        <Wheel
          part="month"
          options={MONTHS.map((m, i) => ({ value: pad(i + 1), label: m }))}
          selected={parts.month}
          onPick={(v) => write('month', v)}
        />
      ) : null}
      {open === 'year' ? (
        <Wheel
          part="year"
          options={years.map((y) => ({ value: y, label: y }))}
          selected={parts.year}
          onPick={(v) => write('year', v)}
        />
      ) : null}
    </div>
  )
}
