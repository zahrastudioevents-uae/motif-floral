import { type MouseEvent, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

/** Light route → night ("menu 2") counterpart. */
export const NIGHT_MAP: Record<string, string> = {
  '/': '/home2/',
  '/about/': '/about2/',
  '/portfolio/': '/portfolio2/',
  '/testimonials/': '/testimonials2/',
  '/mfaccessori/': '/mfaccessori2/',
  '/embroideredribbons/': '/mfaccessori2/',
  '/contact/': '/contact2/',
  '/getquote/': '/getquote2/',
  '/chooseyourbouquet/': '/chooseyourbouquet2/',
}

/** Light route → terra ("menu 3") counterpart. */
export const TERRA_MAP: Record<string, string> = {
  '/': '/home3/',
  '/about/': '/about3/',
  '/portfolio/': '/portfolio3/',
  '/testimonials/': '/testimonials3/',
  '/mfaccessori/': '/mfaccessori3/',
  '/embroideredribbons/': '/mfaccessori3/',
  '/contact/': '/contact3/',
  '/getquote/': '/getquote3/',
  '/chooseyourbouquet/': '/chooseyourbouquet3/',
}

const bare = (p: string) => p.replace(/\/$/, '') || '/'

export const NIGHT_PATHS = new Set(Object.values(NIGHT_MAP).map(bare))
export const TERRA_PATHS = new Set(Object.values(TERRA_MAP).map(bare))

function mapPath(map: Record<string, string>, path: string): string {
  const normalized = path.endsWith('/') ? path : `${path}/`
  return map[normalized] ?? path
}

export const nightPath = (p: string) => mapPath(NIGHT_MAP, p)
export const terraPath = (p: string) => mapPath(TERRA_MAP, p)

/** Themed counterpart → light route (for the "Classic" escape link). */
export function lightPath(path: string): string {
  const normalized = path.endsWith('/') ? path : `${path}/`
  for (const map of [NIGHT_MAP, TERRA_MAP]) {
    const hit = Object.entries(map).find(([, themed]) => themed === normalized)
    if (hit) return hit[0]
  }
  return '/'
}

/**
 * Wraps a page in a theme and keeps navigation inside that universe:
 * clicks on internal links to light routes are rerouted to their themed
 * counterparts, so the original pages can be reused untouched.
 */
function UniverseScope({
  children,
  className,
  map,
}: {
  children: ReactNode
  className: string
  map: Record<string, string>
}) {
  const nav = useNavigate()

  function onClickCapture(e: MouseEvent) {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    const a = (e.target as HTMLElement).closest('a')
    if (!a) return
    if (a.hasAttribute('data-universe')) return
    const href = a.getAttribute('href') ?? ''
    if (!href.startsWith('/')) return
    const mapped = mapPath(map, href)
    if (mapped !== href) {
      e.preventDefault()
      e.stopPropagation()
      nav(mapped)
    }
  }

  return (
    <div className={className} onClickCapture={onClickCapture}>
      {children}
    </div>
  )
}

export function NightScope({ children }: { children: ReactNode }) {
  return (
    <UniverseScope className="theme-night" map={NIGHT_MAP}>
      {children}
    </UniverseScope>
  )
}

export function TerraScope({ children }: { children: ReactNode }) {
  return (
    <UniverseScope className="theme-terra" map={TERRA_MAP}>
      {children}
    </UniverseScope>
  )
}
