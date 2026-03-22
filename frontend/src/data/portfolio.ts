import { img } from '../lib/assets'

/** Representative structure — extend with full live grid as needed */
export type PortfolioItem = {
  category: string
  venue: string
  published?: string
  href: string
  image: string
  alt: string
}

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    category: 'Editorial',
    venue: 'Villa Aurelia, Rome',
    published: 'Wed Vibes',
    href: 'https://www.instagram.com/p/example/',
    image: img('/site/2qZExp/6w045o/Wedding-portfolio-orange-peach-bouquet-villa-aurelia-777dca88-1500.jpg'),
    alt: 'Orange and peach bouquet at Villa Aurelia',
  },
  {
    category: 'Real wedding',
    venue: 'La Posta Vecchia',
    href: 'https://www.instagram.com/motifloral',
    image: img(
      '/site/2qZExp/dDRXMp/choose-your-bouquet-dhalias-pink-la-posta-vecchia-lapostavecchia-682d23cb-1500.jpg',
    ),
    alt: 'Pink dahlias bridal bouquet',
  },
  {
    category: 'Editorial',
    venue: 'Villa Clara',
    href: 'https://www.instagram.com/motifloral',
    image: img(
      '/site/2qZExp/rX0AAV/Wedding-portfolio-cover-villa-clara-calla-lilies-dark-purple-8b18a390-1500.jpg',
    ),
    alt: 'Dark purple calla lilies',
  },
]

export const PORTFOLIO_INSTAGRAM = [
  {
    href: 'https://www.instagram.com/motifloral/',
    image: img('/site/2qZExp/QaYKx0/AlysonScott-274-a3bc0df8-1500.jpg'),
    alt: 'Instagram post',
  },
  {
    href: 'https://www.instagram.com/motifloral/',
    image: img('/site/2qZExp/8L3l5Q/Wedding-portfolio-villa-modern-bride-dark-6112505d-1500.jpg'),
    alt: 'Instagram post',
  },
  {
    href: 'https://www.instagram.com/motifloral/',
    image: img('/site/2qZExp/jzJkd4/AD-wedding-24-93019765-1500.jpg'),
    alt: 'Instagram post',
  },
]
