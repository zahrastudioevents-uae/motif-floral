import { useLocation } from 'react-router-dom'
import { EmbroideredRibbonsPage } from './EmbroideredRibbonsPage'
import { breadcrumb, graph, webPage } from '../lib/structuredData'

/**
 * Una sola pagina dietro due indirizzi, /mfaccessori/ e /embroideredribbons/:
 * i dati strutturati si costruiscono sul percorso vero, altrimenti i due URL
 * dichiarerebbero lo stesso @id e Google ne vedrebbe uno doppio dell'altro.
 */
export function EmbroideredRibbons() {
  const { pathname } = useLocation()
  const path = pathname.endsWith('/') ? pathname : `${pathname}/`
  const seoTitle = 'MF Accessori | Hand-Embroidered Silk Ribbons'
  const seoDescription =
    'Silk ribbons embroidered entirely by hand with your words, initials, monograms or original illustrations, with Miyuki glass beadwork. From €100.'

  return (
    <EmbroideredRibbonsPage
      seoTitle={seoTitle}
      seoDescription={seoDescription}
      contactTo="/contact/"
      jsonLd={graph(
        webPage('MF Accessori, hand-embroidered silk ribbons', path, seoDescription),
        breadcrumb([{ name: 'Home', path: '/' }, { name: 'MF Accessori', path }]),
      )}
    />
  )
}
