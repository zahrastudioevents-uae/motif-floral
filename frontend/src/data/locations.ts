import { img } from '../lib/assets'

/**
 * Location pages. "Wedding florist Rome" is a search people actually make, and
 * the site had nothing to answer it with: everything lived on one Portfolio
 * page that named no place in its own right.
 *
 * Every venue and publication named here appears in the portfolio data too.
 * Nothing is invented for the sake of keywords.
 */
export type LocationPage = {
  slug: string
  title: string
  metaTitle: string
  metaDescription: string
  heroImage: string
  intro: string
  body: { heading: string; text: string }[]
  venues: string[]
  gallery: { src: string; alt: string }[]
}

export const LOCATIONS: LocationPage[] = [
  {
    slug: 'rome',
    title: 'Wedding florist in Rome',
    metaTitle: 'Wedding Florist in Rome | Motif Floral',
    metaDescription:
      'Bespoke wedding florals in Rome by Motif Floral. Villa Aurelia, Villa Brasini, Palazzo Shedir, Campidoglio. Studio based in Rome, commissions from €8,000.',
    heroImage: img('/site/2qZExp/ZDPd8W/AD-wedding-100_mod-4b6e4542-1500.jpg'),
    intro:
      'We are based in Rome, which means the city is not a destination for us: it is the studio doorstep. We know which villas take deliveries from which gate, how the light moves across a courtyard in August, and which flowers survive a Roman afternoon in July.',
    body: [
      {
        heading: 'Where we work in the city',
        text: 'Villa Aurelia and its terraces above the Janiculum, the frescoed rooms of Villa Brasini, Palazzo Shedir, the Campidoglio for civil ceremonies, and the countryside estates just outside the ring road such as Casale del Gallo. Weddings at all of them appear in our portfolio.',
      },
      {
        heading: 'What a Rome wedding asks of the flowers',
        text: 'Roman venues are rarely blank rooms. There are frescoes, marble, stone and centuries of decoration already in the frame, and flowers that ignore that end up fighting it. Our work in the city tends towards restraint: fewer, larger gestures that answer the architecture rather than competing with it.',
      },
      {
        heading: 'Season and heat',
        text: 'From late June to early September the heat is the real constraint. It decides which varieties can stand on a table for six hours, when we install, and how the ceremony flowers are conditioned. We plan the whole day around it rather than hoping.',
      },
    ],
    venues: ['Villa Aurelia', 'Villa Brasini', 'Palazzo Shedir', 'Campidoglio', 'Casale del Gallo', 'Foro Romano'],
    gallery: [
      { src: img('/site/2qZExp/JMzQ0p/PalazzoVilonRoma-183-e7efc586-1500.jpg'), alt: 'Reception table at Palazzo Vilon, Rome' },
      { src: img('/site/2qZExp/QaYKx0/AlysonScott-274-a3bc0df8-1500.jpg'), alt: 'Bride with a peach garden rose bouquet in Rome' },
      { src: img('/site/2qZExp/0mxroo/Savanna_And_Nick_Casale_Del_Gallo-251-ca9cfc50-1500.jpg'), alt: 'Wedding at Casale del Gallo in the Roman countryside' },
    ],
  },
  {
    slug: 'tuscany',
    title: 'Wedding florist in Tuscany',
    metaTitle: 'Wedding Florist in Tuscany | Motif Floral',
    metaDescription:
      'Wedding florals across Tuscany by Motif Floral, from Florence to Val d’Orcia. Editorials published in Style Me Pretty and Wedding Chicks. From €8,000.',
    heroImage: img('/site/2qZExp/EY5eO5/Wedding_027_websize_mod-2abdd4d4-1500.jpg'),
    intro:
      'Tuscany gives you the one thing no florist can build: a landscape that is already composed. Cypresses, stone, olive, and a light that flatters everything. The work here is knowing when to add and when to let the view carry the day.',
    body: [
      {
        heading: 'From the city to the hills',
        text: 'A wedding at the St. Regis in Florence and a dinner under olive trees in Val d’Orcia are different commissions with different rules. In the city we design for interiors and formality. In the countryside we design for long tables, wind, and the fact that the best hour is the one just before sunset.',
      },
      {
        heading: 'Working with what grows there',
        text: 'Tuscany rewards flowers that look like they came from the property rather than a van: garden roses, dahlias in late summer, branches and grasses, olive and rosemary. It is also the reason our Tuscan work is warmer and looser than what we do in Rome.',
      },
      {
        heading: 'Published from here',
        text: 'Our Bagno Vignoni elopement was published by Wedding Chicks, and the Castello Ruspoli editorial by Style Me Pretty.',
      },
    ],
    venues: ['St. Regis Florence', 'Bagno Vignoni', 'Castello Ruspoli', 'Val d’Orcia estates'],
    gallery: [
      { src: img('/site/2qZExp/5yKppe/Home_tuscany_wedding_centerpiece_peach_orange_pink_imperial_table-d9cac71b-1500.jpg'), alt: 'Imperial table in Tuscany with peach and orange centrepieces' },
      { src: img('/site/2qZExp/J94eJX/026_mod-e3bcd6e4-1500.jpg'), alt: 'St. Regis Florence editorial florals' },
      { src: img('/site/2qZExp/dDRXMp/choose-your-bouquet-dhalias-pink-la-posta-vecchia-lapostavecchia-682d23cb-1500.jpg'), alt: 'Pink dahlia bouquet for a Tuscan elopement' },
    ],
  },
  {
    slug: 'amalfi-coast',
    title: 'Wedding florist on the Amalfi Coast',
    metaTitle: 'Wedding Florist on the Amalfi Coast | Motif Floral',
    metaDescription:
      'Wedding florals on the Amalfi Coast and in Sorrento by Motif Floral. Villa Astor and Ravello. Editorials published in Wed Vibes. Commissions from €8,000.',
    heroImage: img('/site/2qZExp/3vdn63/Villa-Astor-Editorial-Haute-Weddings-113-a3126e19-1500.jpg'),
    intro:
      'The coast is the most beautiful place we work and the most demanding. Everything arrives by a road built for donkeys, half the venues are reached by steps, and the sea wind decides what survives the ceremony. It is worth all of it.',
    body: [
      {
        heading: 'Villa Astor and Sorrento',
        text: 'Three of our editorials were shot at Villa Astor in Sorrento and published by Wed Vibes: Where Time Pauses for Love, Rebellious Elegance, and The Beauty of Contrasts. The gardens there are formal and theatrical, and they take strong colour better than most coastal venues.',
      },
      {
        heading: 'Designing for wind and salt',
        text: 'A bouquet that looks perfect in a Roman courtyard falls apart on a Ravello terrace. On the coast we build lower, weight what needs weighting, choose varieties that hold in salt air, and install as late as the venue allows.',
      },
      {
        heading: 'Logistics are part of the design',
        text: 'On this coast the delivery plan is not an afterthought, it shapes what can be built at all. We plan installations around access, timing and the road, and we say so at the quote stage rather than discovering it on the day.',
      },
    ],
    venues: ['Villa Astor, Sorrento', 'Ravello', 'Positano', 'Amalfi'],
    gallery: [
      { src: img('/site/2qZExp/q5VwYM/wedding_248-532179f3-1500.jpg'), alt: 'Villa Astor wedding florals in Sorrento' },
      { src: img('/site/2qZExp/LDAkkD/BE_Wedding_ElisaRinaldi_Ph-529-c352f43b-1500.jpg'), alt: 'Editorial florals at Villa Astor' },
      { src: img('/site/2qZExp/RYVRln/Home_bouquet_renaissance_lightblue_tulips_ranunculous_oxypetalum-204df22b-1500.jpg'), alt: 'Bouquet for an Amalfi Coast wedding' },
    ],
  },
]

export const locationBySlug = (slug: string) => LOCATIONS.find((l) => l.slug === slug)
