import { useEffect, useId, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { uiConstants } from '../../constants/ui_constants'
import { commonStrings } from '../../resources/common_strings'
import { images } from '../../resources/images'
import { Button } from '../ui'
import { Container } from './Container'

const { routes } = uiConstants
const { brand, nav, cta } = commonStrings

const navItems = [
  { to: routes.about, label: nav.aboutUs },
  { to: routes.products, label: nav.productsAndSolutions },
  { to: routes.projects, label: nav.projects },
  { to: routes.insights, label: nav.insights },
] as const

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ')
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className="size-6"
    >
      {open ? (
        <path
          d="M6 6l12 12M18 6L6 18"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      ) : (
        <path
          d="M4 7h16M4 12h16M4 17h16"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      )}
    </svg>
  )
}

export type HeaderProps = {
  className?: string
}

/**
 * Fixed glass header — Figma Desktop 1130×80; collapses to logo + CTA + menu on <lg.
 */
export function Header({ className }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const menuId = useId()

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!menuOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      'font-display text-[14px] font-normal leading-normal text-white',
      'transition-colors hover:text-white/80',
      isActive && 'text-brand hover:text-brand',
    )

  return (
    <header
      className={cn(
        'pointer-events-none fixed inset-x-0 top-0 z-50 w-full',
        'pt-3 md:pt-header-top',
        className,
      )}
    >
      <Container variant="header" className="pointer-events-auto">
        <div
          className={cn(
            'relative flex items-center justify-between gap-3 sm:gap-6',
            'h-14 md:h-20',
            'bg-header text-header-foreground',
            'backdrop-blur-[19.1px]',
            'px-4 sm:px-5 md:pl-header-pad-left md:pr-header-pad-right',
          )}
        >
          <NavLink
            to={routes.home}
            className="shrink-0"
            end
            aria-label={brand.homeAriaLabel}
          >
            <img
              src={images.logo}
              alt={brand.logoAlt}
              width={155}
              height={46}
              className="h-8 w-auto object-contain sm:h-10 md:h-[46px] md:w-[155px]"
            />
          </NavLink>

          <div className="flex min-w-0 items-center gap-3 sm:gap-6 lg:gap-[90px]">
            <nav
              className="hidden items-center gap-[33px] lg:flex"
              aria-label={nav.mainAriaLabel}
            >
              {navItems.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={(state) => cn(linkClass(state), 'p-1')}
                >
                  {label}
                </NavLink>
              ))}
            </nav>

            <div className="hidden sm:block">
              <Button
                variant="primary"
                size="sm"
                to={routes.contact}
                withArrow
                cutCorners="top-right"
                aria-label={cta.letsTalkAriaLabel}
              >
                {cta.letsTalk}
              </Button>
            </div>

            <button
              type="button"
              className={cn(
                'inline-flex size-10 items-center justify-center text-white lg:hidden',
                'transition-colors hover:text-white/80',
                'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand',
              )}
              aria-expanded={menuOpen}
              aria-controls={menuId}
              aria-label={menuOpen ? nav.closeMenu : nav.openMenu}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <MenuIcon open={menuOpen} />
            </button>
          </div>
        </div>

        {/* Mobile / tablet panel */}
        <div
          id={menuId}
          hidden={!menuOpen}
          className={cn(
            'absolute inset-x-0 top-full z-50 mt-2 lg:hidden',
            !menuOpen && 'pointer-events-none',
          )}
        >
          <nav
            aria-label={nav.mainAriaLabel}
            className={cn(
              'flex flex-col gap-1 bg-header px-4 py-4 backdrop-blur-[19.1px]',
              'shadow-elevated',
            )}
          >
            {navItems.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  cn(linkClass({ isActive }), 'px-2 py-3')
                }
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </NavLink>
            ))}
            <div className="mt-2 sm:hidden">
              <Button
                variant="primary"
                size="sm"
                to={routes.contact}
                withArrow
                cutCorners="top-right"
                aria-label={cta.letsTalkAriaLabel}
                className="w-full"
                onClick={() => setMenuOpen(false)}
              >
                {cta.letsTalk}
              </Button>
            </div>
          </nav>
        </div>
      </Container>

      {menuOpen ? (
        <button
          type="button"
          aria-label={nav.closeMenu}
          className="pointer-events-auto fixed inset-0 -z-10 bg-black/40 lg:hidden"
          onClick={() => setMenuOpen(false)}
        />
      ) : null}
    </header>
  )
}
