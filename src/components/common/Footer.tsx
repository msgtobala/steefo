import { useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import { uiConstants } from '../../constants/ui_constants'
import { gsap, prefersReducedMotion, registerGsap } from '../../lib/gsap'
import { commonStrings } from '../../resources/common_strings'
import { icons } from '../../resources/icons'
import { images } from '../../resources/images'
import { Container } from './Container'
import { TypewriterCta } from './TypewriterCta'
import { cn } from '../../utils/cn'

const { routes, contact, social } = uiConstants
const { brand, cta, footer: footerCopy } = commonStrings

const primaryLinks = [
  { to: routes.home, label: footerCopy.primaryLinks.home },
  { to: routes.about, label: footerCopy.primaryLinks.aboutUs },
  { to: routes.products, label: footerCopy.primaryLinks.products },
  { to: routes.insights, label: footerCopy.primaryLinks.blog },
  { to: routes.contact, label: footerCopy.primaryLinks.contactUs },
] as const

const secondaryLinks = [
  { to: routes.careers, label: footerCopy.secondaryLinks.career },
  { to: routes.terms, label: footerCopy.secondaryLinks.terms },
  { to: routes.privacy, label: footerCopy.secondaryLinks.privacy },
  { to: routes.disclaimer, label: footerCopy.secondaryLinks.disclaimer },
] as const

export type FooterProps = {
  className?: string
}

/**
 * Site footer — Figma node 2:2373.
 * Desktop keeps 851px rhythm; mobile/tablet stack and shrink spacing.
 *
 * Lives in Layout (stays mounted across routes), so animations re-bind on pathname.
 */
export function Footer({ className }: FooterProps) {
  const rootRef = useRef<HTMLElement>(null)
  const { pathname } = useLocation()

  useGSAP(
    () => {
      registerGsap()
      if (prefersReducedMotion()) return

      const headline = gsap.utils.toArray<HTMLElement>('[data-footer-headline]')
      const ctaLink = gsap.utils.toArray<HTMLElement>('[data-footer-cta]')
      const cols = gsap.utils.toArray<HTMLElement>('[data-footer-col]')
      const rule = gsap.utils.toArray<HTMLElement>('[data-footer-rule]')
      const bar = gsap.utils.toArray<HTMLElement>('[data-footer-bar]')

      gsap.fromTo(
        headline,
        { opacity: 0, y: 48 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        },
      )

      gsap.fromTo(
        ctaLink,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        },
      )

      gsap.fromTo(
        cols,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cols[0] ?? rootRef.current,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        },
      )

      gsap.fromTo(
        rule,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.8,
          ease: 'power2.inOut',
          transformOrigin: '0% 50%',
          scrollTrigger: {
            trigger: rule[0] ?? rootRef.current,
            start: 'top 95%',
            toggleActions: 'play none none none',
          },
        },
      )

      gsap.fromTo(
        bar,
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: rule[0] ?? rootRef.current,
            start: 'top 95%',
            toggleActions: 'play none none none',
          },
        },
      )
    },
    { scope: rootRef, dependencies: [pathname] },
  )

  return (
    <footer
      ref={rootRef}
      className={cn(
        'relative isolate mt-auto w-full overflow-hidden bg-black text-white',
        className,
      )}
    >
      {/* Circuit pattern — Figma _1200x800px */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 top-10 h-[min(647px,70%)] w-full opacity-60 md:top-[58px] md:h-[647px] md:opacity-100"
        style={{
          backgroundImage: `url(${images.pattern})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Notch — Figma Rectangle 40328: 1060×40 white trapezoid, centered */}
      <img
        src={icons.footerNotch}
        alt=""
        width={1060}
        height={40}
        className="pointer-events-none absolute top-0 left-1/2 z-10 h-6 w-[min(1060px,92%)] -translate-x-1/2 md:h-10 md:w-[min(1060px,100%)]"
      />

      <div className="relative z-10 flex min-h-0 flex-col md:min-h-[851px]">
        {/* CTA */}
        <Container className="flex flex-col items-center pt-16 text-center md:pt-[120px]">
          <h2
            className="max-w-[560px] font-display text-[clamp(1.75rem,6vw,4rem)] font-medium leading-[1.15] tracking-[-0.03em] text-balance text-white md:leading-[1.2] md:tracking-[-2px]"
            data-footer-headline
          >
            {footerCopy.headline.before}
            <span className="text-brand">{footerCopy.headline.highlight}</span>
            <br />
            {footerCopy.headline.after}
          </h2>
          <TypewriterCta
            to={routes.contact}
            text={cta.getAQuote}
            className="mt-5 md:mt-7"
          />
        </Container>

        {/* Columns */}
        <Container className="mt-auto flex flex-col gap-10 pt-14 pb-10 font-sans sm:pt-20 md:pt-[180px] md:pb-12 lg:flex-row lg:justify-between lg:gap-8 lg:pb-14">
          <div className="flex flex-col gap-8 sm:flex-row sm:gap-12 md:gap-[103px]">
            <div className="max-w-[280px] sm:max-w-[238px]" data-footer-col>
              <Link to={routes.home} aria-label={brand.homeAriaLabel}>
                <img
                  src={images.logo}
                  alt={brand.logoAltShort}
                  width={216}
                  height={64}
                  className="h-12 w-auto max-w-full object-contain object-left md:h-16 md:w-[216px]"
                />
              </Link>
              <div className="mt-6 text-sm leading-[1.2] text-white md:mt-[42px]">
                <p className="font-semibold">{footerCopy.addressLabel}</p>
                {contact.addressLines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </div>

            <div
              className="min-w-0 text-sm leading-[1.2] text-white sm:w-[126px]"
              data-footer-col
            >
              <p className="font-semibold">{footerCopy.phoneLabel}</p>
              {contact.phones.map((phone) => (
                <p key={phone}>
                  <a
                    href={`tel:${phone.replace(/-/g, '')}`}
                    className="transition-colors hover:text-brand"
                  >
                    {phone}
                  </a>
                </p>
              ))}
              <p className="mt-[14px] font-semibold">{footerCopy.emailLabel}</p>
              <p>
                <a
                  href={`mailto:${contact.email}`}
                  className="break-all transition-colors hover:text-brand"
                >
                  {contact.email}
                </a>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:flex sm:gap-12 md:gap-[146px]">
            <nav
              aria-label={footerCopy.primaryNavAriaLabel}
              className="flex min-w-0 flex-col text-sm leading-[2.37] text-white sm:min-w-[75px]"
              data-footer-col
            >
              {primaryLinks.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className="w-fit transition-colors hover:text-brand"
                >
                  {label}
                </Link>
              ))}
            </nav>

            <nav
              aria-label={footerCopy.legalNavAriaLabel}
              className="flex min-w-0 flex-col text-sm leading-[2.37] text-white sm:w-[91px]"
              data-footer-col
            >
              {secondaryLinks.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className="w-fit transition-colors hover:text-brand"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </Container>

        {/* Bottom bar */}
        <div className="mx-auto w-full max-w-[var(--container-page)] px-5 pb-5 font-sans sm:px-8 md:px-10">
          <div
            className="h-px w-full origin-left bg-white"
            data-footer-rule
          />
          <div className="flex flex-col items-start justify-between gap-4 pt-4 sm:flex-row sm:items-center">
            <p
              className="text-sm leading-[1.2] text-white"
              data-footer-bar
            >
              {footerCopy.copyright}
            </p>
            <div className="flex items-center gap-[14px] text-white" data-footer-bar>
              <a
                href={social.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label={footerCopy.facebookAriaLabel}
                className="size-7 transition-colors hover:text-brand"
              >
                <img
                  src={icons.facebook}
                  alt=""
                  width={28}
                  height={28}
                  className="size-7 brightness-0 invert"
                />
              </a>
              <a
                href={social.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label={footerCopy.instagramAriaLabel}
                className="size-7 transition-colors hover:text-brand"
              >
                <img
                  src={icons.instagram}
                  alt=""
                  width={28}
                  height={28}
                  className="size-7 brightness-0 invert"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
