import { img } from '../lib/assets'

export const CHOOSE_HERO_IMAGES = [
  { src: img('/site/2qZExp/PQ4LGW/Screenshot2025-08-27alle09.20.04-ce84c882-1500.png'), alt: 'Dreamy bridal portrait' },
  { src: img('/site/2qZExp/r3RVe8/AE6A2655-ea7f1dbe-1500.jpg'), alt: 'Chrysanthemum bouquet' },
  { src: img('/site/2qZExp/J94eJX/026_mod-e3bcd6e4-1500.jpg'), alt: 'Peach roses on dress' },
  { src: img('/site/2qZExp/EY5eO5/Wedding_027_websize_mod-2abdd4d4-1500.jpg'), alt: 'Colorful arrangement' },
  { src: img('/site/2qZExp/K7rO41/Home-bouquet-violet-burgundy-bouquet--77aada7f-1500.jpg'), alt: 'Dress detail' },
]

const iconicCarousel = [
  '/site/2qZExp/y0qoXr/Screenshot2025-08-27alle09.33.32-d394ddd2-1500.png',
  '/site/2qZExp/kawPVn/Screenshot2025-08-27alle09.13.13-b0ac9526-1500.png',
  '/site/2qZExp/QaYKx0/AlysonScott-274-a3bc0df8-1500.jpg',
  '/site/2qZExp/K7rO41/Home-bouquet-violet-burgundy-bouquet--77aada7f-1500.jpg',
  '/site/2qZExp/6w045o/Wedding-portfolio-orange-peach-bouquet-villa-aurelia-777dca88-1500.jpg',
  '/site/2qZExp/RYVRln/Home_bouquet_renaissance_lightblue_tulips_ranunculous_oxypetalum-204df22b-1500.jpg',
  '/site/2qZExp/0Pr45o/choose-your-bouquet-violet-dhalias-dalias-cosmos-7f725976-1500.jpg',
  '/site/2qZExp/PQ4LGW/Screenshot2025-08-27alle09.20.04-ce84c882-1500.png',
].map((p) => ({ src: img(p), alt: 'Bridal bouquet' }))

const seasonalCarousel = [
  '/site/2qZExp/pxjALe/choose-your-bouquet-roses-pinkroses-pink-white-peonies-1445bd8f-1500.jpg',
  '/site/2qZExp/4YO4Pe/choose-your-bouquet-pink-villa-borghese-roma-3196e0de-1500.jpg',
  '/site/2qZExp/q5wA9o/choose-your-bouquet-violet-peach-cafe-au-lait-dhalias-roses-c6712533-1500.JPG',
  '/site/2qZExp/r3RVe8/AE6A2655-ea7f1dbe-1500.jpg',
  '/site/2qZExp/5VxRyn/Reviews-bridal-bouquet-white-peonies-english-roses-22727da7-1500.jpg',
  '/site/2qZExp/XDnX1Y/reviews-white-bouquet-wedding-italy-edited-3b5fe728-1500.jpg',
  '/site/2qZExp/jzJkd4/AD-wedding-24-93019765-1500.jpg',
].map((p) => ({ src: img(p), alt: 'Seasonal bouquet' }))

const minimalCarousel = [
  '/site/2qZExp/5VxRRn/choose-your-bouquet-calla-lilies-pink-villa-astor-c4b669a1-1500.jpg',
  '/site/2qZExp/DDjYYd/get-a-quote-pink-whiteroses-bouquet-roses-white-ravello-palazzo-avino-3b24ac43-1500.jpg',
  '/site/2qZExp/RD1ZZ7/choose-your-bouquet-white-marble-villa-aurelia-italy-7749ba36-1500.jpg',
  '/site/2qZExp/EDdVVq/choose-your-bouquet-white-roses-52356d95-1500.jpg',
  '/site/2qZExp/dDRXXp/choose-your-bouquet-white-modern-roses-a082ef66-1500.jpg',
  '/site/2qZExp/XDnXXY/choose-your-bouquet-white-flowers-italy-wedding-85fe38c5-1500.jpg',
  '/site/2qZExp/rX0AAV/Wedding-portfolio-cover-villa-clara-calla-lilies-dark-purple-8b18a390-1500.jpg',
].map((p) => ({ src: img(p), alt: 'Minimal bouquet' }))

export const BOUQUET_TIERS = [
  {
    kicker: 'BEST SELLER',
    title: 'ICONIC BRIDAL BOUQUET',
    hero: img('/site/2qZExp/n5xA0b/choose-your-bouquet-white-modern-romantic-26df54e1-1500.jpg'),
    heroAlt: 'White orchid arrangement on chair',
    body: [
      'Our Iconic Bouquet is the epitome of beauty and luxury, crafted with a blend of rare and exquisite flowers, each chosen meticulously to reflect your unique style and elegance.',
      '• Customized bridal bouquet.',
      '• Unique selection and use of particular flowers like lathyrus, peonies, english roses, poppies, gloriosa, orchids, or other unique blooms, available in the season.',
      '• Delivery included within the center of Rome, from 8 am to 8 pm.',
      'NOTE: Please note that lily of the valley (mughetti) is excluded in each solution and must be quoted separately.',
    ],
    priceEx: 'Total Amount: 450,00€ VAT 22% excluded**',
    priceInc: '( 550,00€ VAT included )',
    carousel: iconicCarousel,
  },
  {
    kicker: 'SEASONAL',
    title: 'SEASONAL BRIDAL BOUQUET',
    hero: img('/site/2qZExp/jzJkd4/AD-wedding-24-93019765-1500.jpg'),
    heroAlt: 'Peonies and roses in crystal vases',
    body: [
      'Our Seasonal Bouquets are crafted with a mix of flowers that change with the seasons — fresh charm and vibrant beauty for the bride who loves nature’s palette.',
      '• Seasonal bridal bouquet.',
      '• Customized bridal bouquet.',
      '• Use only of seasonal flowers.',
      '• Delivery included within the center of Rome, from 8 am to 8 pm.',
    ],
    priceEx: 'Total Amount: 350,00€ VAT 22% excluded**',
    priceInc: '( 430,00€ VAT included )',
    carousel: seasonalCarousel,
  },
  {
    kicker: 'onE kind of flower',
    title: 'MINIMAL ELEGANCE BOUQUET',
    hero: img('/site/2qZExp/xZlAAR/choose-your-bouquet-calla-lilies-violet-burgundy-annika-annikamaria-3601eb52-1500.jpg'),
    heroAlt: 'Deep purple calla lily bouquet',
    body: [
      'For those who desire a simple, sculptural, minimal bouquet, we offer options crafted entirely with one kind of flower such as roses or dahlias.',
      'Additionally, these bouquets can be created using dhalias, lisianthus, roses, callas, tulips, lilies, hydrangeas, phalaenopsis or cymbidium orchids, peonies or ranunculus, subject to season.',
      '• Customized bridal bouquet.',
      '• Sculptural use of flowers.',
      '• Delivery included within the center of Rome, from 8 am to 8 pm.',
    ],
    priceEx: 'Total Amount: 220,00€ VAT 22% excluded**',
    priceInc: '( 270,00€ VAT included )',
    carousel: minimalCarousel,
  },
] as const

export const RIBBON_SECTION = {
  bg: img('/site/2qZExp/3aJmdy/victoriajoyphotography-0614-ca75753f-1500.jpg'),
  sideL: img('/site/2qZExp/xZPL8x/victoriajoyphotography-0589-470a7417-1500.jpg'),
  sideR: img('/site/2qZExp/m5yODj/Editorial_Coppede_ElisaRinaldi_ph1-aff54d9a-1500.jpg'),
}
