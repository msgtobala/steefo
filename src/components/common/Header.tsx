import { useEffect, useId, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { uiConstants } from '../../constants/ui_constants'
import { commonStrings } from '../../resources/common_strings'
import { images } from '../../resources/images'
import { Button } from '../ui'
import { Container } from './Container'
import { cn } from '../../utils/cn'

const { routes } = uiConstants
const { brand, nav, cta } = commonStrings

const navItems = [
  { to: routes.about, label: nav.aboutUs },
  { to: routes.products, label: nav.productsAndSolutions },
  { to: routes.projects, label: nav.projects },
  { to: routes.insights, label: nav.insights },
] as const

function MenuIcon({ open }: { open: boolean }) {
  return (
    <span className="relative block size-6" aria-hidden>
      <span
        className={cn(
          'absolute left-1 right-1 h-px bg-current transition-transform duration-300 ease-out motion-reduce:transition-none',
          open ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-[7px]',
        )}
      />
      <span
        className={cn(
          'absolute top-1/2 right-1 left-1 h-px -translate-y-1/2 bg-current transition-opacity duration-200 motion-reduce:transition-none',
          open && 'opacity-0',
        )}
      />
      <span
        className={cn(
          'absolute left-1 right-1 h-px bg-current transition-transform duration-300 ease-out motion-reduce:transition-none',
          open ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'top-[17px]',
        )}
      />
    </span>
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
      'motion-underline font-display text-nav font-normal text-white',
      'hover:text-white/80',
      isActive && 'font-medium text-brand hover:text-brand',
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
            className="shrink-0 transition-opacity duration-300 hover:opacity-80 motion-reduce:transition-none"
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
          className={cn(
            'absolute inset-x-0 top-full z-50 mt-2 grid lg:hidden',
            'transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none',
            menuOpen
              ? 'grid-rows-[1fr] opacity-100'
              : 'pointer-events-none grid-rows-[0fr] opacity-0',
          )}
        >
          <div className="min-h-0 overflow-hidden">
            <nav
              aria-label={nav.mainAriaLabel}
              className={cn(
                'flex flex-col gap-1 bg-header px-4 py-4 backdrop-blur-[19.1px]',
                'shadow-elevated',
              )}
            >
              {navItems.map(({ to, label }, index) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    cn(
                      linkClass({ isActive }),
                      'px-2 py-3 transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none',
                      menuOpen
                        ? 'translate-y-0 opacity-100'
                        : '-translate-y-2 opacity-0',
                    )
                  }
                  style={{
                    transitionDelay: menuOpen ? `${40 + index * 50}ms` : '0ms',
                  }}
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </NavLink>
              ))}
              <div
                className={cn(
                  'mt-2 sm:hidden',
                  'transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none',
                  menuOpen
                    ? 'translate-y-0 opacity-100'
                    : '-translate-y-2 opacity-0',
                )}
                style={{
                  transitionDelay: menuOpen
                    ? `${40 + navItems.length * 50}ms`
                    : '0ms',
                }}
              >
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
        </div>
      </Container>

      <button
        type="button"
        aria-label={nav.closeMenu}
        tabIndex={menuOpen ? 0 : -1}
        aria-hidden={!menuOpen}
        className={cn(
          'pointer-events-auto fixed inset-0 -z-10 bg-black/40 lg:hidden',
          'transition-opacity duration-300 motion-reduce:transition-none',
          menuOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={() => setMenuOpen(false)}
      />
    </header>
  )
}
