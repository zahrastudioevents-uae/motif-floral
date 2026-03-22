export function ThinArrowLeft({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="72"
      height="14"
      viewBox="0 0 72 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <line x1="72" y1="7" x2="10" y2="7" stroke="currentColor" strokeWidth="0.85" />
      <path d="M10 7L16 3.5M10 7L16 10.5" stroke="currentColor" strokeWidth="0.85" />
    </svg>
  )
}

export function ThinArrowRight({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="72"
      height="14"
      viewBox="0 0 72 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <line x1="0" y1="7" x2="62" y2="7" stroke="currentColor" strokeWidth="0.85" />
      <path d="M62 7L56 3.5M62 7L56 10.5" stroke="currentColor" strokeWidth="0.85" />
    </svg>
  )
}
