import { type ReactNode } from 'react'
import { BUSINESS } from '../lib/site'

export function FormSection({
  title,
  large,
  children,
}: {
  title?: string
  large?: boolean
  children: ReactNode
}) {
  return (
    <div className={large ? 'border-t border-mf-muted/20 pb-5 pt-9' : 'border-t border-mf-muted/15 pb-4 pt-8'}>
      {title ? (
        <h2
          className={
            large
              ? 'mb-7 font-sans text-[0.8rem] font-semibold uppercase tracking-[0.2em] text-mf-black'
              : 'mb-6 font-sans text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-mf-black'
          }
        >
          {title}
        </h2>
      ) : null}
      {children}
    </div>
  )
}

export function QField({
  label,
  required,
  hint,
  large,
  children,
}: {
  label: string
  required?: boolean
  hint?: string
  large?: boolean
  children: ReactNode
}) {
  return (
    <label className="mb-7 block">
      <span className={large ? 'font-sans text-[0.9rem] font-normal text-mf-black/80' : 'font-sans text-[0.75rem] font-light text-mf-muted'}>
        {label}
        {required ? ' *' : ''}
      </span>
      <div
        className={
          large
            ? 'mf-field mt-2'
            : 'mt-1.5 [&>input]:w-full [&>input]:border-0 [&>input]:border-b [&>input]:border-mf-muted/25 [&>input]:bg-transparent [&>input]:py-2 [&>input]:font-sans [&>input]:text-[0.875rem] [&>input]:text-mf-black [&>input]:outline-none [&>input]:transition-colors [&>input]:focus:border-mf-black [&>select]:w-full [&>select]:border-0 [&>select]:border-b [&>select]:border-mf-muted/25 [&>select]:bg-transparent [&>select]:py-2 [&>select]:font-sans [&>select]:text-[0.875rem] [&>select]:text-mf-black [&>select]:outline-none [&>select]:transition-colors [&>select]:focus:border-mf-black [&>textarea]:w-full [&>textarea]:border [&>textarea]:border-mf-muted/20 [&>textarea]:bg-transparent [&>textarea]:px-3 [&>textarea]:py-2.5 [&>textarea]:font-sans [&>textarea]:text-[0.875rem] [&>textarea]:text-mf-black [&>textarea]:outline-none [&>textarea]:transition-colors [&>textarea]:focus:border-mf-black'
        }
      >
        {children}
      </div>
      {hint ? <Hint text={hint} large={large} /> : null}
    </label>
  )
}

export function Hint({ text, large }: { text: string; large?: boolean }) {
  return (
    <p className={large ? 'mt-2 font-sans text-[0.8rem] font-light text-mf-muted' : 'mt-1.5 font-sans text-[0.7rem] font-light text-mf-muted/70'}>
      {text}
    </p>
  )
}

export function RadioRow({
  name,
  options,
  value,
  onChange,
  large,
}: {
  name: string
  options: { value: string; label: string }[]
  value: string
  onChange: (value: string) => void
  large?: boolean
}) {
  return (
    <div className={large ? 'flex flex-wrap gap-x-8 gap-y-3.5' : 'flex flex-wrap gap-x-6 gap-y-2.5'}>
      {options.map((opt) => (
        <label key={opt.value} className="inline-flex cursor-pointer items-center gap-2.5">
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={value === opt.value}
            onChange={(e) => onChange(e.target.value)}
            className={large ? 'h-4 w-4 accent-mf-black' : 'accent-mf-black'}
          />
          <span className={large ? 'font-sans text-[1rem] text-mf-black' : 'font-sans text-[0.875rem] text-mf-black'}>{opt.label}</span>
        </label>
      ))}
    </div>
  )
}

export function CheckboxRow({
  options,
  value,
  onToggle,
  large,
  columns = 1,
}: {
  options: { value: string; label: string }[]
  value: string[]
  onToggle: (value: string) => void
  large?: boolean
  /** 2 lays the options out two per row. */
  columns?: 1 | 2
}) {
  const layout =
    columns === 2
      ? `grid grid-cols-2 ${large ? 'gap-x-6 gap-y-3.5' : 'gap-x-5 gap-y-2.5'}`
      : `flex flex-col ${large ? 'gap-3.5' : 'gap-2.5'}`
  return (
    <div className={layout}>
      {options.map((opt) => (
        <label key={opt.value} className="inline-flex cursor-pointer items-center gap-2.5">
          <input
            type="checkbox"
            checked={value.includes(opt.value)}
            onChange={() => onToggle(opt.value)}
            className={large ? 'h-4 w-4 accent-mf-black' : 'accent-mf-black'}
          />
          <span className={large ? 'font-sans text-[1rem] text-mf-black' : 'font-sans text-[0.875rem] text-mf-black'}>{opt.label}</span>
        </label>
      ))}
    </div>
  )
}

/**
 * What the visitor sees when the submission does not go through. It always
 * carries the address, so a broken form costs a click rather than an enquiry.
 */
export function FormError({ message, center }: { message: string; center?: boolean }) {
  return (
    <p className={`mt-4 text-sm text-red-700 ${center ? 'text-center' : ''}`}>
      {message} Please write to{' '}
      <a href={`mailto:${BUSINESS.email}`} className="underline underline-offset-2">
        {BUSINESS.email}
      </a>{' '}
      and we will answer from there.
    </p>
  )
}

/**
 * The consent checkbox, with the link to the policy it refers to. Consent that
 * points at nothing is not consent.
 */
export function PrivacyConsent({
  checked,
  onChange,
  name,
}: {
  checked?: boolean
  onChange?: (v: boolean) => void
  name?: string
}) {
  return (
    <label className="flex gap-3 font-sans text-[0.8rem] leading-relaxed text-mf-muted">
      <input
        type="checkbox"
        required
        name={name}
        {...(onChange ? { checked: !!checked, onChange: (e) => onChange(e.target.checked) } : {})}
        className="mt-0.5 accent-mf-black"
      />
      <span>
        I authorise the processing of my personal data to respond to this request, as described in
        the{' '}
        <a href="/privacy-policy" className="underline underline-offset-2 hover:text-mf-black">
          Privacy Policy
        </a>
        . I may withdraw consent or ask for access or erasure at any time.
      </span>
    </label>
  )
}

/**
 * One error, under one field, only once the visitor has left it. Showing a
 * complaint to someone still typing their email is how forms get abandoned.
 */
export function FieldError({ touched, error }: { touched: boolean; error: string }) {
  if (!touched || !error) return null
  return (
    <p className="mt-1.5 flex items-start gap-1.5 font-sans text-[0.78rem] leading-snug text-red-700">
      <span aria-hidden className="mt-px">&#9432;</span>
      <span>{error}</span>
    </p>
  )
}

/**
 * The list that appears above the button when submit is refused. Naming what is
 * missing beats a red blur: the visitor knows exactly how many things are left.
 */
export function MissingFields({ fields }: { fields: { label: string }[] }) {
  if (!fields.length) return null
  return (
    <div className="mb-6 border border-red-300 bg-red-50/60 px-5 py-4">
      <p className="font-sans text-[0.85rem] font-medium text-red-800">
        Please complete the following fields:
      </p>
      <ul className="mt-2 list-disc pl-5 font-sans text-[0.82rem] leading-relaxed text-red-700">
        {fields.map((f) => (
          <li key={f.label}>{f.label}</li>
        ))}
      </ul>
    </div>
  )
}
