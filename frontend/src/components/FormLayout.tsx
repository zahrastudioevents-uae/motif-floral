import { type ReactNode } from 'react'

export function FormSection({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <div className="border-t border-mf-muted/15 pb-4 pt-8">
      <h2 className="mb-6 font-sans text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-mf-black">
        {title}
      </h2>
      {children}
    </div>
  )
}

export function QField({
  label,
  required,
  children,
}: {
  label: string
  required?: boolean
  children: ReactNode
}) {
  return (
    <label className="mb-6 block">
      <span className="font-sans text-[0.75rem] font-light text-mf-muted">
        {label}
        {required ? ' *' : ''}
      </span>
      <div className="mt-1.5 [&>input]:w-full [&>input]:border-0 [&>input]:border-b [&>input]:border-mf-muted/25 [&>input]:bg-transparent [&>input]:py-2 [&>input]:font-sans [&>input]:text-[0.875rem] [&>input]:text-mf-black [&>input]:outline-none [&>input]:transition-colors [&>input]:focus:border-mf-black [&>select]:w-full [&>select]:border-0 [&>select]:border-b [&>select]:border-mf-muted/25 [&>select]:bg-transparent [&>select]:py-2 [&>select]:font-sans [&>select]:text-[0.875rem] [&>select]:text-mf-black [&>select]:outline-none [&>select]:transition-colors [&>select]:focus:border-mf-black [&>textarea]:w-full [&>textarea]:border [&>textarea]:border-mf-muted/20 [&>textarea]:bg-transparent [&>textarea]:px-3 [&>textarea]:py-2.5 [&>textarea]:font-sans [&>textarea]:text-[0.875rem] [&>textarea]:text-mf-black [&>textarea]:outline-none [&>textarea]:transition-colors [&>textarea]:focus:border-mf-black">
        {children}
      </div>
    </label>
  )
}
