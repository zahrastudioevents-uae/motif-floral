import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { Layout } from './components/Layout'
import { About } from './pages/About'
import { ChooseBouquet } from './pages/ChooseBouquet'
import { Contact } from './pages/Contact'
import { EmbroideredRibbons } from './pages/EmbroideredRibbons'
import { GetQuote } from './pages/GetQuote'
import { Home } from './pages/Home'
import { Portfolio } from './pages/Portfolio'
import { Testimonials } from './pages/Testimonials'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'portfolio', element: <Portfolio /> },
      { path: 'contact', element: <Contact /> },
      { path: 'getquote', element: <GetQuote /> },
      { path: 'chooseyourbouquet', element: <ChooseBouquet /> },
      { path: 'testimonials', element: <Testimonials /> },
      { path: 'embroideredribbons', element: <EmbroideredRibbons /> },
      {
        path: 'mfaccessori',
        element: <Navigate to="/embroideredribbons/" replace />,
      },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
