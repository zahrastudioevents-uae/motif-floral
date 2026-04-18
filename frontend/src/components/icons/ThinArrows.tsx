/** Long horizontal stem + small arrowhead (carousel nav, luxury UI) */
export function LongStemNavArrowLeft({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="52"
      height="12"
      viewBox="0 0 52 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M50 6H14M14 6l5.5-3.2M14 6l5.5 3.2"
        stroke="currentColor"
        strokeWidth="0.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function LongStemNavArrowRight({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="52"
      height="12"
      viewBox="0 0 52 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M2 6h36M38 6l-5.5-3.2M38 6l-5.5 3.2"
        stroke="currentColor"
        strokeWidth="0.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
