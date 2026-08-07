/**
 * The routes, with the metadata each one should expose to a crawler.
 *
 * Shared by the sitemap generator and the post-build step that writes a static
 * HTML shell per route, so a route can never appear in one and not the other.
 */
export const ROUTES = [
  {
    path: '/',
    priority: '1.0',
    changefreq: 'weekly',
    title: 'Wedding & Event Floral Design in Italy | Motif Floral',
    description:
      'Bespoke floral design for weddings and events across Italy and the UAE. Based in Rome, founded 2018. Featured in Vogue, Elle and Style Me Pretty.',
    image: '/images/home/home-hero-tablescape.webp',
  },
  {
    path: '/portfolio/',
    priority: '0.9',
    changefreq: 'weekly',
    title: 'Portfolio | Editorial & Real Wedding Florals in Italy',
    description:
      'Floral editorials and real weddings by Motif Floral, featured in Vogue, Elle, Style Me Pretty and The Wed. Villa Astor, Villa Aurelia, Castello Ruspoli.',
    image: '/images/site/2qZExp/3vdn63/Villa-Astor-Editorial-Haute-Weddings-113-a3126e19-1500.webp',
  },
  {
    path: '/about/',
    priority: '0.8',
    changefreq: 'monthly',
    title: 'About Motif Floral | Our Story & Philosophy',
    description:
      'Motif Floral was born in 2018 in Rome. Bespoke wedding and event floristry, creating poetic, refined designs across Italy and the UAE.',
    image: '/images/site/2qZExp/0Pr45o/choose-your-bouquet-violet-dhalias-dalias-cosmos-7f725976-1500.webp',
  },
  {
    path: '/mfaccessori/',
    priority: '0.8',
    changefreq: 'monthly',
    title: 'MF Accessori | Hand-Embroidered Silk Ribbons',
    description:
      'Silk ribbons embroidered entirely by hand with your words, initials, monograms or original illustrations, with Miyuki glass beadwork. From €100.',
    image: '/images/gallery-accessori/accessori-01.webp',
  },
  {
    path: '/getquote/',
    priority: '0.8',
    changefreq: 'monthly',
    title: 'Get a Quote | Motif Floral',
    description:
      'Request a floral quote for a wedding, elopement or event in Italy or the UAE. Wedding commissions start at €8,000, elopements at €4,000.',
    image:
      '/images/site/2qZExp/DDjYYd/get-a-quote-pink-whiteroses-bouquet-roses-white-ravello-palazzo-avino-3b24ac43-1500.webp',
  },
  {
    path: '/contact/',
    priority: '0.7',
    changefreq: 'monthly',
    title: 'Contact | Motif Floral, Rome',
    description:
      'Talk to Motif Floral about wedding and event florals in Italy and the UAE. Email motifloral@gmail.com or WhatsApp +39 334 569 9447.',
    image: '/images/contact-hero.webp',
  },
  {
    path: '/testimonials/',
    priority: '0.7',
    changefreq: 'monthly',
    title: 'Client Reviews | Motif Floral',
    description:
      'What couples say about working with Motif Floral on their wedding florals in Italy.',
    image: '/images/site/2qZExp/QD5PD3/IMG_2894_mod-bff09d8d-1500.webp',
  },
  {
    path: '/weddings/rome/',
    priority: '0.9',
    changefreq: 'monthly',
    title: 'Wedding Florist in Rome | Motif Floral',
    description:
      'Bespoke wedding florals in Rome by Motif Floral. Villa Aurelia, Villa Brasini, Palazzo Shedir, Campidoglio. Studio based in Rome, commissions from EUR 8,000.',
    image: '/images/site/2qZExp/ZDPd8W/AD-wedding-100_mod-4b6e4542-1500.webp',
  },
  {
    path: '/weddings/tuscany/',
    priority: '0.9',
    changefreq: 'monthly',
    title: 'Wedding Florist in Tuscany | Motif Floral',
    description:
      'Wedding florals across Tuscany by Motif Floral, from Florence to Val d\u2019Orcia. Editorials published in Style Me Pretty and Wedding Chicks.',
    image: '/images/site/2qZExp/EY5eO5/Wedding_027_websize_mod-2abdd4d4-1500.webp',
  },
  {
    path: '/weddings/amalfi-coast/',
    priority: '0.9',
    changefreq: 'monthly',
    title: 'Wedding Florist on the Amalfi Coast | Motif Floral',
    description:
      'Wedding florals on the Amalfi Coast and in Sorrento by Motif Floral. Villa Astor and Ravello. Editorials published in Wed Vibes.',
    image: '/images/site/2qZExp/3vdn63/Villa-Astor-Editorial-Haute-Weddings-113-a3126e19-1500.webp',
  },
  {
    // The page lives at /privacy-policy/; /privacy/ is only a redirect to it,
    // so it is the one that belongs here.
    path: '/privacy-policy/',
    priority: '0.3',
    changefreq: 'yearly',
    title: 'Privacy Policy | Motif Floral',
    description:
      'How Motif Floral collects, uses and stores the personal data you send through the contact and quote forms.',
    image: '/images/home/home-hero-tablescape.webp',
  },
  {
    path: '/embroideredribbons/',
    priority: '0.6',
    changefreq: 'monthly',
    title: 'Hand Embroidered Silk Ribbons | Motif Floral',
    description:
      'Hand embroidered silk ribbons made in Rome for bouquets, stationery and favours, dyed and stitched to match each palette.',
    image: '/images/home/home-hero-tablescape.webp',
  },
  {
    path: '/chooseyourbouquet/',
    priority: '0.6',
    changefreq: 'monthly',
    title: 'Choose Your Bouquet | Motif Floral',
    description: 'Bridal bouquets designed by Motif Floral, from Rome to the Amalfi Coast.',
    image: '/images/home/home-hero-tablescape.webp',
  },
]
