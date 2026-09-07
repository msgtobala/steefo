import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { CircuitFlow } from '../common/CircuitFlow'
import { gsap, prefersReducedMotion, registerGsap } from '../../lib/gsap'
import { homeStrings } from '../../resources/home_strings'
import { images } from '../../resources/images'
import { cn } from '../../utils'

export type HomeIntroProps = {
  className?: string
}

const HOLD_S = 2
const OUT_S = 0.45
const IN_S = 0.55

/**
 * Home intro band — Figma Home 33:3476
 * One sentence in the slot; loops title ↔ subtitle every 2s with a crossfade.
 */
export function HomeIntro({ className }: HomeIntroProps) {
  const rootRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const { titleLine1, titleLine2, subtitleLine1, subtitleLine2, subtitleLine3 } =
    homeStrings.intro

  useGSAP(
    () => {
      registerGsap()
      const root = rootRef.current
      const title = titleRef.current
      const subtitle = subtitleRef.current
      if (!root || !title || !subtitle) return

      if (prefersReducedMotion()) {
        gsap.set(title, { opacity: 1, y: 0 })
        gsap.set(subtitle, { opacity: 0, y: 0 })
        return
      }

      gsap.set(title, { opacity: 1, y: 0 })
      gsap.set(subtitle, { opacity: 0, y: 28 })

      const swap = (outgoing: HTMLElement, incoming: HTMLElement) => {
        const step = gsap.timeline()
        step
          .set(incoming, { opacity: 0, y: 28 })
          .to(outgoing, {
            opacity: 0,
            y: -24,
            duration: OUT_S,
            ease: 'power2.in',
          })
          .to(
            incoming,
            {
              opacity: 1,
              y: 0,
              duration: IN_S,
              ease: 'power2.out',
            },
            `-=${OUT_S * 0.25}`,
          )
        return step
      }

      const tl = gsap.timeline({
        repeat: -1,
        scrollTrigger: {
          trigger: root,
          start: 'top 85%',
          end: 'bottom 15%',
          toggleActions: 'play pause resume pause',
        },
      })

      tl.to({}, { duration: HOLD_S })
        .add(swap(title, subtitle))
        .to({}, { duration: HOLD_S })
        .add(swap(subtitle, title))

      return () => {
        tl.scrollTrigger?.kill()
        tl.kill()
      }
    },
    { scope: rootRef },
  )

  const slideClass =
    'absolute inset-0 flex h-full w-full items-center justify-center px-6 text-center font-display text-[clamp(2rem,5vw,4.5rem)] font-medium leading-[1.05] tracking-[-0.0556em] text-balance md:px-10'

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

      <div aria-hidden className="pointer-events-none absolute inset-0 z-[1]">
        <CircuitFlow fit="fill" />
      </div>

      <div className="relative z-[2] mx-auto aspect-[1440/692] w-full max-w-[90rem]">
        <div className="absolute inset-x-0 top-[42%] h-[var(--intro-slide)] -translate-y-1/2 overflow-hidden [--intro-slide:clamp(9rem,22vw,14.5rem)]">
          <h2 ref={titleRef} className={cn(slideClass, 'text-white')}>
            <span>
              <span className="block">{titleLine1}</span>
              <span className="block">{titleLine2}</span>
            </span>
          </h2>
          <p
            ref={subtitleRef}
            className={cn(slideClass, 'text-white/30')}
            aria-hidden
          >
            <span>
              <span className="block">{subtitleLine1}</span>
              <span className="block">{subtitleLine2}</span>
              <span className="block">{subtitleLine3}</span>
            </span>
          </p>
        </div>
      </div>
    </section>
  )
}
