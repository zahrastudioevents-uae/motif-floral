import { Outlet, useLocation } from 'react-router-dom'
import { Footer } from './Footer'
import { HomeHeader } from './HomeHeader'

export function Layout() {
  const { pathname } = useLocation()
  const isHome = pathname === '/' || pathname === ''

  return (
    <div className="flex min-h-screen flex-col">
      <HomeHeader overHero={isHome} />
      <main className="flex min-h-0 flex-1 flex-col">
        <div
          key={pathname}
          className="animate-page-enter flex min-h-0 flex-1 flex-col"
        >
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  )
}
