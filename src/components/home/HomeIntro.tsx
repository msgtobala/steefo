import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, prefersReducedMotion, registerGsap } from '../../lib/gsap'
import { homeStrings } from '../../resources/home_strings'
import { images } from '../../resources/images'
import { cn } from '../../utils'

export type HomeIntroProps = {
  className?: string
}

/**
 * Home intro band — Figma Home 33:3476
 * Black circuit panel flush under the hero, with bottom trapezoid tab into white.
 * Title centered in the panel; subtitle pinned to the bottom tab edge.
 */
export function HomeIntro({ className }: HomeIntroProps) {
  const rootRef = useRef<HTMLElement>(null)
  const { titleLine1, titleLine2, subtitleLine1, subtitleLine2, subtitleLine3 } =
    homeStrings.intro

  useGSAP(
    () => {
      registerGsap()
      if (prefersReducedMotion()) return

      const title = gsap.utils.toArray<HTMLElement>('[data-home-intro-title]')
      const subtitle = gsap.utils.toArray<HTMLElement>(
        '[data-home-intro-subtitle]',
      )

      gsap.fromTo(
        title,
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        },
      )

      gsap.fromTo(
        subtitle,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          delay: 0.15,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top 75%',
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
      className={cn('relative -mt-px w-full overflow-hidden', className)}
      aria-label={`${titleLine1} ${titleLine2}`}
    >
      {/* Figma 33:3476 — shaped black + circuit pattern (1440×692), notch reveals page white */}
      <img
        src={images.heroIntroBg}
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 size-full max-w-none"
      />

      <div className="relative z-[1] mx-auto aspect-[1440/692] w-full max-w-[90rem]">
        {/* Primary line — vertically centered in the solid panel */}
        <h2 className="absolute inset-x-0 top-[38%] -translate-y-1/2 px-6 text-center font-display text-[clamp(2rem,5vw,4.5rem)] font-medium leading-[1.05] tracking-[-0.0556em] text-balance text-white md:px-10">
          <span className="block" data-home-intro-title>
            {titleLine1}
          </span>
          <span className="block" data-home-intro-title>
            {titleLine2}
          </span>
        </h2>

        {/*
          Subtitle sits on the bottom black tab edge (Figma tab = 40px).
          Pin just above the lowest edge so it reads against the panel, not the white page.
        */}
        <p className="absolute inset-x-0 bottom-[calc((40/692)*100%+0.25rem)] px-6 text-center font-display text-[clamp(1.25rem,3vw,2.5rem)] font-medium leading-[1.15] tracking-[-0.03em] text-balance text-white/30 md:px-10">
          <span className="block" data-home-intro-subtitle>
            {subtitleLine1}
          </span>
          <span className="block" data-home-intro-subtitle>
            {subtitleLine2}
          </span>
          <span className="block" data-home-intro-subtitle>
            {subtitleLine3}
          </span>
        </p>
      </div>
    </section>
  )
}
