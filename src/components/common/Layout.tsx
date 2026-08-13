import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Footer } from './Footer'
import { Header } from './Header'
import { SubscribeBanner } from './SubscribeBanner'

/**
 * App shell aligned to Figma Home Page 2:45 (1440 artboard).
 * - Header is fixed overlay (desktop 1130×80; compact bar + menu on smaller screens)
 * - Pages own their own Container / section layout
 * - Shared SubscribeBanner + footer gap on every page
 * - Footer is full-bleed and stacks on mobile/tablet
 * - Scroll resets to top on every route change
 */
export function Layout() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="relative flex min-h-svh flex-col overflow-x-clip font-display">
      <Header />
      <main className="w-full flex-1 pt-20 md:pt-[120px]">
        <Outlet />
        {/* Figma mid-page CTA + ~100px white gap before footer */}
        <div className="mt-16 pb-20 md:mt-24 md:pb-[100px]">
          <SubscribeBanner />
        </div>
      </main>
      <Footer />
    </div>
  )
}
