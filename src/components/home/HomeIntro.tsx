import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import {
  prefersReducedMotion,
  registerGsap,
  ScrollTrigger,
} from '../../lib/gsap'
import { CircuitFlow } from '../common/CircuitFlow'
import { homeStrings } from '../../resources/home_strings'
import { images } from '../../resources/images'
import { cn } from '../../utils'

export type HomeIntroProps = {
  className?: string
}

/**
 * Home intro band — Figma Home 33:3476
 * One sentence in the slot at a time. Scroll swaps the headline for the subtitle.
 */
export function HomeIntro({ className }: HomeIntroProps) {
  const rootRef = useRef<HTMLElement>(null)
  const windowRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const { titleLine1, titleLine2, subtitleLine1, subtitleLine2, subtitleLine3 } =
    homeStrings.intro

  useGSAP(
    () => {
      registerGsap()
      const root = rootRef.current
      const frame = windowRef.current
      const track = trackRef.current
      if (!root || !frame || !track) return

      const apply = (progress: number) => {
        const travel = frame.clientHeight || 0
        track.style.transform = `translate3d(0, ${-progress * travel}px, 0)`
      }

      if (prefersReducedMotion()) {
        apply(0)
        return
      }

      apply(0)

      const trigger = ScrollTrigger.create({
        trigger: root,
        start: 'top 80%',
        end: 'center center',
        scrub: 0.4,
        invalidateOnRefresh: true,
        onUpdate: (self) => apply(self.progress),
        onRefresh: (self) => apply(self.progress),
      })

      requestAnimationFrame(() => ScrollTrigger.refresh())

      return () => {
        trigger.kill()
      }
    },
    { scope: rootRef },
  )

  const slideClass =
    'flex h-[var(--intro-slide)] w-full items-center justify-center px-6 text-center font-display text-[clamp(2rem,5vw,4.5rem)] font-medium leading-[1.05] tracking-[-0.0556em] text-balance md:px-10'

  return (
    <section
      ref={rootRef}
      className={cn('relative -mt-px w-full', className)}
      aria-label={`${titleLine1} ${titleLine2}. ${subtitleLine1} ${subtitleLine2} ${subtitleLine3}`}
    >
      {/* Figma 33:3476 — shaped black + circuit pattern (1440×692), notch reveals page white */}
      <img
        src={images.heroIntroBg}
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 size-full max-w-none"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
      >
        <CircuitFlow fit="fill" />
      </div>

      <div className="relative z-[2] mx-auto aspect-[1440/692] w-full max-w-[90rem]">
        {/* Single aperture — only one sentence fits; the next slides up into place */}
        <div
          ref={windowRef}
          className="absolute inset-x-0 top-[42%] h-[var(--intro-slide)] -translate-y-1/2 overflow-hidden [--intro-slide:clamp(9rem,22vw,14.5rem)]"
        >
          <div
            ref={trackRef}
            className="will-change-transform"
          >
            <h2 className={cn(slideClass, 'text-white')}>
              <span>
                <span className="block">{titleLine1}</span>
                <span className="block">{titleLine2}</span>
              </span>
            </h2>
            <p className={cn(slideClass, 'text-white/30')}>
              <span>
                <span className="block">{subtitleLine1}</span>
                <span className="block">{subtitleLine2}</span>
                <span className="block">{subtitleLine3}</span>
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
