import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, prefersReducedMotion, registerGsap } from '../../lib/gsap'
import { homeStrings } from '../../resources/home_strings'
import { images } from '../../resources/images'
import { cn } from '../../utils'

export type HomeBrandProps = {
  className?: string
}

/**
 * Home brand statement band — Figma 41:4049
 * Circuit panel with bottom trapezoid tab; “That’s / Steefo Engineering.”
 */
export function HomeBrand({ className }: HomeBrandProps) {
  const rootRef = useRef<HTMLElement>(null)
  const { lead, titleLine1, titleLine2 } = homeStrings.brand

  useGSAP(
    () => {
      registerGsap()
      if (prefersReducedMotion()) return

      const leadEl = rootRef.current?.querySelector('[data-home-brand-lead]')
      const title = gsap.utils.toArray<HTMLElement>('[data-home-brand-title]')

      if (leadEl) {
        gsap.fromTo(
          leadEl,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: rootRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          },
        )
      }

      gsap.fromTo(
        title,
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.08,
          delay: 0.08,
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
      className={cn('relative mt-20 w-full overflow-hidden', className)}
      aria-label={`${lead} ${titleLine1} ${titleLine2}`}
    >
      <img
        src={images.heroIntroBg}
        alt=""
        className="pointer-events-none absolute inset-0 size-full max-w-none"
      />

      {/* Figma 41:4049 — 1440×692 circuit band, bottom tab 40px */}
      <div className="relative z-[1] mx-auto flex aspect-[1440/692] w-full max-w-page items-center justify-center px-6 md:px-10">
        <div className="flex -translate-y-[3%] flex-col items-center text-center">
          <p
            className="font-display text-[clamp(1.5rem,3.2vw,2.5rem)] font-medium leading-[1.1] text-white/20"
            data-home-brand-lead
          >
            {lead}
          </p>
          <h2 className="mt-2 font-display text-[clamp(2.5rem,6.5vw,6rem)] font-normal leading-none tracking-[-0.04em] text-white md:tracking-[-4px]">
            <span className="block" data-home-brand-title>
              {titleLine1}
            </span>
            <span className="block" data-home-brand-title>
              {titleLine2}
            </span>
          </h2>
        </div>
      </div>
    </section>
  )
}
