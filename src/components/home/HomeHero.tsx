import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import {
  prefersReducedMotion,
  registerGsap,
  ScrollTrigger,
} from '../../lib/gsap'
import { images } from '../../resources/images'
import { homeStrings } from '../../resources/home_strings'
import { cn } from '../../utils'

export type HomeHeroProps = {
  className?: string
}

/**
 * Home hero banner — Figma Home 1:16 / 1:17 / 1:2308
 * Scroll-pinned character reveal (Terminal-style reference):
 * characters appear L→R; revealed = white; leading letter = brand red.
 */
export function HomeHero({ className }: HomeHeroProps) {
  const rootRef = useRef<HTMLElement>(null)
  const { titleLine1, titleLine2, mediaAriaLabel } = homeStrings.hero
  const lines = [titleLine1, titleLine2]
  const fullTitle = `${titleLine1} ${titleLine2}`

  useGSAP(
    () => {
      registerGsap()
      const root = rootRef.current
      if (!root) return

      const chars = Array.from(
        root.querySelectorAll<HTMLElement>('[data-hero-char]'),
      )
      if (!chars.length) return

      const paint = (revealed: number, done: boolean) => {
        chars.forEach((el, i) => {
          if (i < revealed) {
            el.style.visibility = 'visible'
            const isTip = !done && i === revealed - 1
            el.style.color = isTip ? 'var(--color-brand)' : '#ffffff'
          } else {
            el.style.visibility = 'hidden'
            el.style.color = '#ffffff'
          }
        })
      }

      if (prefersReducedMotion()) {
        paint(chars.length, true)
        return
      }

      paint(0, false)

      const trigger = ScrollTrigger.create({
        trigger: root,
        start: 'top top',
        end: () => `+=${Math.round(window.innerHeight * 1.15)}`,
        pin: true,
        pinSpacing: true,
        scrub: 0.35,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const n = chars.length
          const revealed = Math.min(n, Math.floor(self.progress * (n + 1)))
          paint(revealed, self.progress >= 1 || revealed >= n)
        },
      })

      return () => {
        trigger.kill()
      }
    },
    { scope: rootRef },
  )

  return (
    <section
      ref={rootRef}
      className={cn(
        'relative h-svh w-full overflow-hidden bg-black',
        className,
      )}
      aria-label={mediaAriaLabel}
    >
      <img
        src={images.heroBanner}
        alt=""
        width={2560}
        height={1390}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 size-full object-cover object-center"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/25 to-black/20"
      />

      <div className="relative z-[1] flex h-full flex-col items-center justify-end px-6 pb-[22vh] text-center md:pb-[26vh]">
        <h1
          className="relative w-full max-w-[1006px] text-center font-display text-[clamp(2.25rem,5.5vw,4.5rem)] font-medium leading-none tracking-[-0.0556em]"
          aria-label={fullTitle}
        >
          {/* Holds final size so centered layout doesn’t jump during reveal. */}
          <span className="invisible" aria-hidden>
            {lines.map((line) => (
              <span key={`ghost-${line}`} className="block">
                {line}
              </span>
            ))}
          </span>

          <span className="absolute inset-0 text-center" aria-hidden>
            {lines.map((line) => (
              <span key={line} className="block">
                {Array.from(line).map((char, index) => (
                  <span
                    key={`${line}-${index}`}
                    data-hero-char
                    className="inline"
                    style={{ visibility: 'hidden', color: '#ffffff' }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </span>
            ))}
          </span>
        </h1>
      </div>
    </section>
  )
}
