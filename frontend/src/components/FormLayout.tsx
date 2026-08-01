import { type ReactNode } from 'react'

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
            ? 'mt-2 [&>input]:w-full [&>input]:border-0 [&>input]:border-b-2 [&>input]:border-mf-muted/30 [&>input]:bg-transparent [&>input]:py-3 [&>input]:font-sans [&>input]:text-[1.0625rem] [&>input]:text-mf-black [&>input]:outline-none [&>input]:transition-colors [&>input]:focus:border-mf-black [&>select]:w-full [&>select]:border-0 [&>select]:border-b-2 [&>select]:border-mf-muted/30 [&>select]:bg-transparent [&>select]:py-3 [&>select]:font-sans [&>select]:text-[1.0625rem] [&>select]:text-mf-black [&>select]:outline-none [&>select]:transition-colors [&>select]:focus:border-mf-black [&>textarea]:w-full [&>textarea]:border-2 [&>textarea]:border-mf-muted/25 [&>textarea]:bg-white/50 [&>textarea]:px-4 [&>textarea]:py-3.5 [&>textarea]:font-sans [&>textarea]:text-[1.0625rem] [&>textarea]:leading-relaxed [&>textarea]:text-mf-black [&>textarea]:outline-none [&>textarea]:transition-colors [&>textarea]:focus:border-mf-black'
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
