/// <reference types="vite/client" />

declare module 'swiper/css'
declare module 'swiper/css/pagination'

interface Window {
  dataLayer?: unknown[]
  gtag?: (...args: unknown[]) => void
}
