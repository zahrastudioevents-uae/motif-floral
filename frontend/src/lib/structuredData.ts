import { absolute, BUSINESS, SITE_NAME, SITE_URL } from './site'

/**
 * Structured data, in schema.org vocabulary.
 *
 * This is what lets Google show the business as more than ten blue links, and
 * it is also the most reliable way for answer engines (ChatGPT, Perplexity,
 * Google AI Overviews) to state facts about the studio without guessing. Every
 * claim here has to match what the pages actually say.
 */

const ORG_ID = `${SITE_URL}/#organization`
const SITE_ID = `${SITE_URL}/#website`

/** The studio itself: a florist, based in Rome, working across Italy and the UAE. */
export const organizationSchema = {
  '@type': ['Florist', 'LocalBusiness'],
  '@id': ORG_ID,
  name: BUSINESS.name,
  url: SITE_URL,
  email: BUSINESS.email,
  telephone: BUSINESS.phoneE164,
  foundingDate: BUSINESS.founded,
  image: absolute('/images/home/home-hero-tablescape.webp'),
  logo: absolute('/images/motif-wordmark.png'),
  description:
    'Bespoke floral design for weddings and events, based in Rome and working across Italy and the United Arab Emirates. Editorial floral direction, ceremony and reception design, and hand-embroidered silk ribbons.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: BUSINESS.city,
    addressRegion: BUSINESS.region,
    addressCountry: BUSINESS.country,
  },
  areaServed: BUSINESS.areaServed.map((name) => ({ '@type': 'Place', name })),
  knowsLanguage: ['en', 'it'],
  sameAs: [...BUSINESS.social],
  priceRange: '€€€€',
  makesOffer: [
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Wedding floral design',
        description:
          'Full floral design for weddings: bridal bouquet, ceremony, centrepieces and installations.',
      },
    },
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Elopement and intimate wedding florals',
        description: 'Bouquet, boutonniere, ceremony and table decoration for small celebrations.',
      },
    },
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Event floral design',
        description: 'Floral direction for private and corporate events.',
      },
    },
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Hand-embroidered silk ribbons',
        description:
          'Custom silk ribbons embroidered by hand with text, monograms, illustrations and Miyuki beadwork.',
      },
    },
  ],
}

export const websiteSchema = {
  '@type': 'WebSite',
  '@id': SITE_ID,
  url: SITE_URL,
  name: SITE_NAME,
  publisher: { '@id': ORG_ID },
  inLanguage: 'en',
}

/** Wraps a page's own nodes together with the organisation and website graph. */
export function graph(...nodes: unknown[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': [organizationSchema, websiteSchema, ...nodes.filter(Boolean)],
  }
}

export function breadcrumb(trail: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.name,
      item: absolute(t.path),
    })),
  }
}

export function webPage(name: string, path: string, description: string) {
  return {
    '@type': 'WebPage',
    '@id': `${absolute(path)}#webpage`,
    url: absolute(path),
    name,
    description,
    isPartOf: { '@id': SITE_ID },
    about: { '@id': ORG_ID },
    inLanguage: 'en',
  }
}

/**
 * Questions couples actually ask before enquiring. Answer engines quote these
 * almost verbatim, so the answers must be true and specific: vague marketing
 * copy gets skipped in favour of a competitor who gave a real number.
 */
export const FAQ = [
  {
    q: 'Where is Motif Floral based, and where do you work?',
    a: 'Motif Floral is based in Rome, Italy. We design weddings and events across Italy, most often in Rome, Tuscany, the Amalfi Coast, Lake Como, Umbria and Puglia, and we also work in the United Arab Emirates.',
  },
  {
    q: 'How much does wedding floral design cost?',
    a: 'Wedding floral commissions start at €8,000. Elopements and intimate weddings are the exception and start at €4,000. The final figure depends on the number of tables, the scale of the ceremony design and whether large installations are involved.',
  },
  {
    q: 'Do you only do flowers, or can you help with the whole wedding?',
    a: 'Motif Floral is a floral design studio. Full planning and creative direction are handled by our sister studio for destination weddings, and you can ask for it directly in the quote form.',
  },
  {
    q: 'What are hand-embroidered silk ribbons?',
    a: 'They are silk ribbons embroidered entirely by hand with your words, initials, vows, a monogram or an original illustration, often with Miyuki glass beadwork. Ribbons with initials or a short phrase are €100, longer phrases €150, and logos or personal designs are quoted individually. Preparation takes about one month.',
  },
  {
    q: 'Can you work with flowers we already have in mind?',
    a: 'Yes. The quote form asks for your Pinterest board and for any style elements you have already chosen, so we design from your references rather than imposing a house style.',
  },
  {
    q: 'Which publications has Motif Floral been featured in?',
    a: 'Editorials and real weddings by Motif Floral have appeared in Vogue, Elle, Style Me Pretty, The Wed, Wed Vibes, Junebug Weddings, Wedding Chicks, The Anti-Bride and Amber & Muse.',
  },
]

export const faqSchema = {
  '@type': 'FAQPage',
  mainEntity: FAQ.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
}
