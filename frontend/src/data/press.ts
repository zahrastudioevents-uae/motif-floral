import { img } from '../lib/assets'

export type PressLogo = {
  src: string
  alt: string
  prominent?: boolean
}

export const PRESS_LOGOS: PressLogo[] = [
  {
    src: img('/site/2qZExp/LWv6la/Screenshot2025-08-21alle22.27.20-ed78ad74-1500.png'),
    alt: 'Style Me Pretty',
  },
  {
    src: img('/site/2qZExp/5yKOae/Screenshot2025-08-26alle15.28.27-3533841f-1500.png'),
    alt: 'Bridal Musings',
  },
  {
    src: img('/site/2qZExp/b8GOo3/XjDi9j8alKgVt5QTtFESvaHXfaCQvm8jfNgI0ZMJ-cf3f45c2-1500.png'),
    alt: 'Wedding Chicks',
    prominent: true,
  },
  {
    src: img('/site/2qZExp/8YpKo1/WEDVIBES.MEDIA-community-badge-2025-1-33be91de-1500.png'),
    alt: 'Wed Vibes',
    prominent: true,
  },
  { src: img('/site/2qZExp/0M1xlk/Screenshot2025-08-26alle16.04.27-c18928a2-1500.png'), alt: 'Elle' },
  { src: img('/site/2qZExp/6QJkWb/Screenshot2025-08-26alle16.04.19-51da7edd-1500.png'), alt: 'Vogue' },
]

export function pressLogoMarqueeClasses(logo: PressLogo): string {
  const base = 'block w-auto shrink-0 object-contain'
  return logo.prominent
    ? `${base} h-[4.75rem] sm:h-[5.5rem] md:h-[7.25rem] lg:h-[8rem]`
    : `${base} h-9 max-w-[180px] md:h-10`
}
