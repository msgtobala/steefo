import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { Button } from '../ui'
import { uiConstants } from '../../constants/ui_constants'
import { gsap, prefersReducedMotion, registerGsap } from '../../lib/gsap'
import { homeStrings } from '../../resources/home_strings'
import { cn } from '../../utils'

export type HomeMissionProps = {
  className?: string
}

/**
 * Home mission band — centered copy + CTAs below HomeIntro.
 * White panel with 185px vertical margins (Figma spacing).
 */
export function HomeMission({ className }: HomeMissionProps) {
  const rootRef = useRef<HTMLElement>(null)
  const { routes } = uiConstants
  const {
    eyebrow,
    titleBefore,
    titleHighlight1,
    titleHighlight2,
    titleAfter,
    body,
    aboutCta,
    contactCta,
  } = homeStrings.mission

  useGSAP(
    () => {
      registerGsap()
      if (prefersReducedMotion()) return

      const items = gsap.utils.toArray<HTMLElement>('[data-home-mission]')
      gsap.fromTo(
        items,
        { opacity: 0, y: 28 },
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
    },
    { scope: rootRef },
  )

  return (
    <section
      ref={rootRef}
      className={cn(
        'w-full bg-white px-6 py-[185px] text-center md:px-10',
        className,
      )}
    >
      <div className="mx-auto flex max-w-[920px] flex-col items-center">
        <p className="text-eyebrow" data-home-mission>
          {eyebrow}
        </p>

        <h2
          className="mt-4 font-display text-[clamp(1.75rem,4.5vw,3.5rem)] font-medium leading-[1.15] tracking-[-0.03em] text-balance text-foreground md:mt-5"
          data-home-mission
        >
          {titleBefore}{' '}
          <span className="text-brand">{titleHighlight1}</span>
          <br />
          <span className="text-brand">{titleHighlight2}</span>
          {titleAfter}
        </h2>

        <p
          className="mt-5 max-w-[640px] font-display text-sm leading-[1.4] text-subtle-foreground md:mt-6 md:text-base md:leading-[1.3]"
          data-home-mission
        >
          {body}
        </p>

        <div
          className="mt-8 flex flex-col items-stretch gap-4 sm:mt-10 sm:flex-row sm:items-center"
          data-home-mission
        >
          <Button
            variant="primary"
            size="sm"
            to={routes.about}
            cutCorners="top-right"
            withArrow={false}
            className="min-w-[152px]"
          >
            {aboutCta}
          </Button>
          <Button
            variant="secondary"
            size="sm"
            to={routes.contact}
            cutCorners="top-left"
            withArrow={false}
            className="min-w-[152px]"
          >
            {contactCta}
          </Button>
        </div>
      </div>
    </section>
  )
}
