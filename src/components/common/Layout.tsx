import { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { uiConstants } from '../../constants/ui_constants'
import { Footer } from './Footer'
import { Header } from './Header'
import { WhatsAppFloat } from './WhatsAppFloat'
import { IntroReveal } from './IntroReveal'
import { SubscribeBanner } from './SubscribeBanner'
import { cn } from '../../utils/cn'

/**
 * App shell aligned to Figma Home Page 2:45 (1440 artboard).
 * - Header is fixed overlay (desktop 1130×80; compact bar + menu on smaller screens)
 * - Pages own their own Container / section layout
 * - Shared SubscribeBanner + footer gap on every page
 * - Footer is full-bleed and stacks on mobile/tablet
 * - WhatsApp float stays visible; opens WhatsApp Web Business in a new tab
 * - Scroll always starts at top (reload + route change)
 */
export function Layout() {
  const { pathname } = useLocation()
  const introPlayed = useRef(false)

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="relative flex min-h-svh flex-col overflow-x-clip font-display">
      {pathname === uiConstants.routes.home && !introPlayed.current ? (
        <IntroReveal onComplete={() => { introPlayed.current = true }} />
      ) : null}
      <Header />
      <main
        className={cn(
          'w-full flex-1',
          pathname === uiConstants.routes.home
            ? 'pt-0'
            : 'pt-20 md:pt-[120px]',
        )}
      >
        <Outlet />
        {/* Figma mid-page CTA + ~100px white gap before footer */}
        <div className="mt-16 pb-20 md:mt-24 md:pb-[100px]">
          <SubscribeBanner />
        </div>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
