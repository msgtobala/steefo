import { useRef, type RefObject } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, prefersReducedMotion, registerGsap } from '../lib/gsap'

const EASE = 'power3.out'

type RevealOptions = {
  scope: RefObject<HTMLElement | null>
  /** Animate `[data-animate-hero]` on load (no scroll). */
  withHero?: boolean
  deps?: unknown[]
}

function fromVars(variant: string | undefined): gsap.TweenVars {
  if (variant === 'left') return { opacity: 0, x: -80 }
  if (variant === 'right') return { opacity: 0, x: 80 }
  if (variant === 'scale') return { opacity: 0, y: 48, scale: 0.9 }
  return { opacity: 0, y: 96 }
}

function toVars(variant: string | undefined): gsap.TweenVars {
  if (variant === 'left' || variant === 'right') {
    return { opacity: 1, x: 0, y: 0, scale: 1 }
  }
  if (variant === 'scale') {
    return { opacity: 1, x: 0, y: 0, scale: 1 }
  }
  return { opacity: 1, x: 0, y: 0, scale: 1 }
}

function collectStaggerRoots(section: HTMLElement): HTMLElement[] {
  const nested = Array.from(
    section.querySelectorAll<HTMLElement>('[data-animate-stagger]'),
  )
  if (section.matches('[data-animate-stagger]')) {
    return [section, ...nested]
  }
  return nested
}

/**
 * Medium-large page reveals via data attributes (reusable across pages).
 *
 * - `data-animate-hero` — load-in stagger
 * - `data-animate-section` — scroll section root
 * - `data-animate` / `data-animate="left|right|scale"` — reveal targets
 * - `data-animate-stagger` — group that reveals its `[data-animate]` kids together
 */
export function usePageReveal({
  scope,
  withHero = false,
  deps = [],
}: RevealOptions) {
  useGSAP(
    () => {
      registerGsap()

      if (prefersReducedMotion()) {
        gsap.set('[data-animate], [data-animate-hero]', {
          clearProps: 'all',
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
        })
        return
      }

      if (withHero) {
        const heroItems = gsap.utils.toArray<HTMLElement>('[data-animate-hero]')
        if (heroItems.length) {
          gsap.fromTo(
            heroItems,
            { opacity: 0, y: 64 },
            {
              opacity: 1,
              y: 0,
              duration: 1.2,
              ease: EASE,
              stagger: 0.18,
            },
          )
        }
      }

      const sections = gsap.utils.toArray<HTMLElement>('[data-animate-section]')

      sections.forEach((section) => {
        const staggerRoots = collectStaggerRoots(section)
        const staggered = new Set<HTMLElement>()

        staggerRoots.forEach((root) => {
          const kids = gsap.utils.toArray<HTMLElement>(
            root.querySelectorAll('[data-animate]'),
          )
          kids.forEach((kid) => staggered.add(kid))
          if (!kids.length) return

          const variant = kids[0]?.dataset.animate

          gsap.fromTo(kids, fromVars(variant), {
            ...toVars(variant),
            duration: 1.15,
            ease: EASE,
            stagger: 0.16,
            scrollTrigger: {
              trigger: root,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          })
        })

        const singles = gsap
          .utils.toArray<HTMLElement>(section.querySelectorAll('[data-animate]'))
          .filter((el) => !staggered.has(el))

        singles.forEach((item) => {
          const variant = item.dataset.animate
          gsap.fromTo(item, fromVars(variant), {
            ...toVars(variant),
            duration: 1.2,
            ease: EASE,
            scrollTrigger: {
              trigger: item,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          })
        })
      })
    },
    { scope, dependencies: deps },
  )
}

export function usePageRevealRef(options?: Omit<RevealOptions, 'scope'>) {
  const ref = useRef<HTMLDivElement>(null)
  usePageReveal({ scope: ref, ...options })
  return ref
}
