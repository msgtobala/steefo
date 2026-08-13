import { Fragment, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, prefersReducedMotion, registerGsap } from '../../lib/gsap'
import { homeStrings } from '../../resources/home_strings'
import { images } from '../../resources/images'
import { cn } from '../../utils'

export type HomeStatsProps = {
  className?: string
}

/**
 * Home stats band — Figma Home 38:4043 / Frame 47 (1:2328)
 * Black raised-tab panel with four credential metrics below HomeMission.
 */
export function HomeStats({ className }: HomeStatsProps) {
  const rootRef = useRef<HTMLElement>(null)
  const { ariaLabel, items } = homeStrings.stats

  useGSAP(
    () => {
      registerGsap()
      if (prefersReducedMotion()) return

      const cells = gsap.utils.toArray<HTMLElement>('[data-home-stat]')
      gsap.fromTo(
        cells,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top 80%',
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
      className={cn('relative w-full overflow-hidden', className)}
      aria-label={ariaLabel}
    >
      <img
        src={images.homeStatsBg}
        alt=""
        className="pointer-events-none absolute inset-0 size-full max-w-none"
      />

      {/*
        Figma 1440×320 — top trapezoid tab is 40px (12.5%).
        Metrics sit in the 280px body, vertically centered.
      */}
      <div className="relative z-[1] mx-auto flex aspect-[1440/320] w-full max-w-page flex-col">
        <div className="h-[12.5%] shrink-0" aria-hidden />
        <div className="flex flex-1 items-center px-[clamp(1rem,3.8vw,3.4375rem)]">
          {/* Mobile: 2×2. Desktop: Figma Frame 47 — gap 107px around 138px hairlines */}
          <div className="grid w-full grid-cols-2 gap-x-6 gap-y-8 md:flex md:items-center md:justify-center md:gap-x-[clamp(1.5rem,7.4vw,6.6875rem)] md:gap-y-0">
            {items.map((item, index) => (
              <Fragment key={item.label}>
                {index > 0 ? (
                  <div
                    className="hidden h-[min(8.625rem,43%)] w-px shrink-0 bg-white/15 md:block"
                    aria-hidden
                  />
                ) : null}
                <div
                  className="flex flex-col items-center text-center leading-[1.2] md:min-w-39"
                  data-home-stat
                >
                  <p className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-medium text-white">
                    {item.value}
                  </p>
                  <p className="mt-1 font-display text-sm font-normal text-[#8d8d8d] md:mt-0 md:text-base">
                    {item.label}
                  </p>
                </div>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
