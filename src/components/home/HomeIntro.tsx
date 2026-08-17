import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import {
  prefersReducedMotion,
  registerGsap,
  ScrollTrigger,
} from '../../lib/gsap'
import { homeStrings } from '../../resources/home_strings'
import { images } from '../../resources/images'
import { cn } from '../../utils'

export type HomeIntroProps = {
  className?: string
}

/**
 * Home intro band — Figma Home 33:3476
 * Flush under the hero. Title stays put; grey subtitle rises like a teleprompter.
 * No pin — scroll scrub only, so Home Mission and the hero stay stable.
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
        apply(1)
        return
      }

      apply(0)

      const trigger = ScrollTrigger.create({
        trigger: root,
        // Rise while the band enters; finish when the section is centered.
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

  return (
    <section
      ref={rootRef}
      className={cn('relative -mt-px w-full', className)}
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
        <h2 className="absolute inset-x-0 top-[32%] -translate-y-1/2 px-6 text-center font-display text-[clamp(2rem,5vw,4.5rem)] font-medium leading-[1.05] tracking-[-0.0556em] text-balance text-white md:px-10">
          <span className="block">{titleLine1}</span>
          <span className="block">{titleLine2}</span>
        </h2>

        {/* Tall aperture under the title — grey copy rises from below (teleprompter) */}
        <div
          ref={windowRef}
          className="absolute inset-x-0 top-[48%] bottom-[calc((40/692)*100%+0.25rem)] overflow-hidden px-6 md:px-10"
        >
          <div
            ref={trackRef}
            className="absolute inset-x-0 top-full px-6 text-center font-display text-[clamp(1.25rem,3vw,2.5rem)] font-medium leading-[1.15] tracking-[-0.03em] text-balance text-white/30 will-change-transform md:px-10"
          >
            <span className="block">{subtitleLine1}</span>
            <span className="block">{subtitleLine2}</span>
            <span className="block">{subtitleLine3}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
