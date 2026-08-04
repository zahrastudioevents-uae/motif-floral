import { lazy, Suspense, type ReactNode } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'

/**
 * Home stays in the main bundle because almost everyone lands there first.
 * The rest are split out, so opening the home page no longer means also
 * downloading the quote form and every option list it carries.
 */
const About = lazy(() => import('./pages/About').then((m) => ({ default: m.About })))
const Portfolio = lazy(() => import('./pages/Portfolio').then((m) => ({ default: m.Portfolio })))
const Contact = lazy(() => import('./pages/Contact').then((m) => ({ default: m.Contact })))
const GetQuote = lazy(() => import('./pages/GetQuote').then((m) => ({ default: m.GetQuote })))
const ChooseBouquet = lazy(() =>
  import('./pages/ChooseBouquet').then((m) => ({ default: m.ChooseBouquet })),
)
const Testimonials = lazy(() =>
  import('./pages/Testimonials').then((m) => ({ default: m.Testimonials })),
)
const EmbroideredRibbons = lazy(() =>
  import('./pages/EmbroideredRibbons').then((m) => ({ default: m.EmbroideredRibbons })),
)
const Privacy = lazy(() => import('./pages/Privacy').then((m) => ({ default: m.Privacy })))
const NotFound = lazy(() => import('./pages/NotFound').then((m) => ({ default: m.NotFound })))
const Location = lazy(() => import('./pages/Location').then((m) => ({ default: m.Location })))

/** Deliberately blank: a spinner would flash for longer than these chunks take. */
const page = (element: ReactNode) => <Suspense fallback={<div className="min-h-screen" />}>{element}</Suspense>

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: page(<About />) },
      { path: 'portfolio', element: page(<Portfolio />) },
      { path: 'contact', element: page(<Contact />) },
      { path: 'getquote', element: page(<GetQuote />) },
      { path: 'chooseyourbouquet', element: page(<ChooseBouquet />) },
      { path: 'testimonials', element: page(<Testimonials />) },
      { path: 'mfaccessori', element: page(<EmbroideredRibbons />) },
      { path: 'embroideredribbons', element: page(<EmbroideredRibbons />) },
      { path: 'privacy', element: page(<Privacy />) },
      { path: 'weddings/:slug', element: page(<Location />) },
      // Anything else: a real 404 page rather than the router's default screen.
      { path: '*', element: page(<NotFound />) },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
