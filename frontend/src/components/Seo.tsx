import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { absolute, NOINDEX, SITE_NAME, SITE_URL } from '../lib/site'

/** Fallback share image, used when a page does not name its own. */
const DEFAULT_OG_IMAGE = '/images/home/home-hero-tablescape.webp'

type Meta = { attr: 'name' | 'property'; key: string; content: string }

function setMeta({ attr, key, content }: Meta) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/**
 * Structured data is written into a single tag we own, so navigating between
 * pages replaces it instead of stacking a new graph on every route change.
 */
function setJsonLd(data: unknown) {
  const id = 'page-jsonld'
  let el = document.getElementById(id) as HTMLScriptElement | null
  if (!data) {
    el?.remove()
    return
  }
  if (!el) {
    el = document.createElement('script')
    el.id = id
    el.type = 'application/ld+json'
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(data)
}

export function Seo({
  title,
  description,
  image,
  type = 'website',
  jsonLd,
}: {
  title: string
  description?: string
  /** Path or absolute URL of the share image. */
  image?: string
  type?: 'website' | 'article'
  jsonLd?: unknown
}) {
  const { pathname } = useLocation()

  useEffect(() => {
    const canonical = absolute(pathname)
    const shareImage = absolute(image || DEFAULT_OG_IMAGE)

    document.title = title
    document.documentElement.lang = 'en'

    if (description) {
      setMeta({ attr: 'name', key: 'description', content: description })
      setMeta({ attr: 'property', key: 'og:description', content: description })
      setMeta({ attr: 'name', key: 'twitter:description', content: description })
    }

    setLink('canonical', canonical)

    setMeta({
      attr: 'name',
      key: 'robots',
      content: NOINDEX ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1',
    })

    setMeta({ attr: 'property', key: 'og:site_name', content: SITE_NAME })
    setMeta({ attr: 'property', key: 'og:title', content: title })
    setMeta({ attr: 'property', key: 'og:type', content: type })
    setMeta({ attr: 'property', key: 'og:url', content: canonical })
    setMeta({ attr: 'property', key: 'og:image', content: shareImage })
    setMeta({ attr: 'property', key: 'og:image:alt', content: title })
    setMeta({ attr: 'property', key: 'og:locale', content: 'en_GB' })

    setMeta({ attr: 'name', key: 'twitter:card', content: 'summary_large_image' })
    setMeta({ attr: 'name', key: 'twitter:title', content: title })
    setMeta({ attr: 'name', key: 'twitter:image', content: shareImage })

    setJsonLd(jsonLd)
  }, [title, description, image, type, jsonLd, pathname])

  return null
}

export { SITE_URL }
