import { Outlet, useLocation } from 'react-router-dom'
import { Footer } from './Footer'
import { Header } from './Header'

export function Layout() {
  const { pathname } = useLocation()
  const isHome = pathname === '/' || pathname === ''

  return (
    <div className="flex min-h-screen flex-col">
      {!isHome ? <Header overlay={false} /> : null}
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
