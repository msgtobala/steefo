import { type FormEvent, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import { gsap, prefersReducedMotion, registerGsap } from '../../lib/gsap'
import { commonStrings } from '../../resources/common_strings'
import { images } from '../../resources/images'
import { buildMailto, cn } from '../../utils'
import { Button } from '../ui'
import { Container } from './Container'

export type SubscribeBannerProps = {
  className?: string
}

/**
 * Shared “Ready to Build” CTA — Figma Insights 1:3684 / Projects 1:3574
 * Full-bleed black band with email capture (15:3455) + subscribeBanner visual.
 *
 * Lives in Layout (stays mounted across routes), so animations re-bind on pathname.
 */
export function SubscribeBanner({ className }: SubscribeBannerProps) {
  const rootRef = useRef<HTMLElement>(null)
  const { pathname } = useLocation()
  const { subscribe } = commonStrings

  useGSAP(
    () => {
      registerGsap()
      if (prefersReducedMotion()) return

      const copy = gsap.utils.toArray<HTMLElement>('[data-subscribe-copy]')
      const form = gsap.utils.toArray<HTMLElement>('[data-subscribe-form]')
      const visual = gsap.utils.toArray<HTMLElement>('[data-subscribe-visual]')

      gsap.fromTo(
        copy,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top 78%',
            toggleActions: 'play none none none',
          },
        },
      )

      gsap.fromTo(
        form,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top 78%',
            toggleActions: 'play none none none',
          },
        },
      )

      gsap.fromTo(
        visual,
        { opacity: 0, x: 56, scale: 0.94 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1.1,
          delay: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top 78%',
            toggleActions: 'play none none none',
          },
        },
      )
    },
    { scope: rootRef, dependencies: [pathname] },
  )

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const email = String(data.get('email') ?? '').trim()
    if (!email) return
    window.location.href = buildMailto({
      subject: commonStrings.subscribe.mailSubject,
      body: `Email: ${email}`,
    })
  }

  return (
    <section
      ref={rootRef}
      className={cn('w-full overflow-hidden bg-black text-white', className)}
    >
      <Container className="grid grid-cols-1 items-center gap-10 py-12 md:gap-12 md:py-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,480px)] lg:gap-16 lg:py-0">
        <div className="flex max-w-[560px] flex-col gap-6 py-4 lg:py-16">
          <h2
            className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-medium leading-[1.15] tracking-[-0.02em] text-balance"
            data-subscribe-copy
          >
            {subscribe.titleBefore}
            <span className="text-brand">{subscribe.titleHighlight}</span>
          </h2>
          <p
            className="max-w-[420px] font-display text-base leading-[1.3] text-white/80"
            data-subscribe-copy
          >
            {subscribe.body}
          </p>

          <form
            className="mt-2 flex h-10 w-full max-w-[460px] items-stretch"
            onSubmit={handleSubmit}
            noValidate
            data-subscribe-form
          >
            {/* Figma 15:3455 — 335×40 bordered field flush to 126×40 Submit */}
            <input
              name="email"
              type="email"
              placeholder={subscribe.emailPlaceholder}
              autoComplete="email"
              required
              aria-label={subscribe.emailPlaceholder}
              className={cn(
                'h-10 min-w-0 flex-1 border border-r-0 border-border-input bg-transparent',
                'px-3.5 font-display text-sm font-light leading-[1.3] text-white',
                'placeholder:text-muted-foreground',
                'motion-field outline-none focus-visible:border-brand',
                'disabled:cursor-not-allowed disabled:opacity-50',
              )}
            />
            <Button
              type="submit"
              variant="primary"
              size="sm"
              withArrow
              cutCorners="top-right"
              className="h-10 w-[126px] shrink-0"
            >
              {subscribe.submit}
            </Button>
          </form>
        </div>

        <div
          className="motion-media relative mx-auto w-full max-w-[420px] lg:max-w-none lg:justify-self-end"
          data-subscribe-visual
        >
          <img
            src={images.subscribeBanner}
            alt={subscribe.bannerAriaLabel}
            className="motion-zoom h-auto w-full object-contain object-bottom lg:max-h-[520px]"
          />
        </div>
      </Container>
    </section>
  )
}
