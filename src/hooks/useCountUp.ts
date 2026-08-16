import { type RefObject } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, prefersReducedMotion, registerGsap } from '../lib/gsap'

/** Split "45+", "1982", "ISO" into a numeric tween target when possible. */
export function parseCountValue(raw: string) {
  const match = raw.trim().match(/^(\D*)(\d+)(\D*)$/)
  if (!match) return null
  return { prefix: match[1], number: Number(match[2]), suffix: match[3] }
}

/**
 * Tweens `[data-count-up]` text from 0 to the numeric value on scroll.
 * Non-numeric labels (e.g. ISO, India) are left unchanged.
 */
export function useCountUp(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      registerGsap()
      const els = gsap.utils.toArray<HTMLElement>('[data-count-up]')
      if (!els.length) return

      if (prefersReducedMotion()) return

      const tweens = els.map((el) => {
        const raw = el.dataset.countUp ?? el.textContent ?? ''
        const parsed = parseCountValue(raw)
        if (!parsed) return undefined

        const state = { n: 0 }
        el.textContent = `${parsed.prefix}0${parsed.suffix}`

        return gsap.to(state, {
          n: parsed.number,
          duration: 1.4,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          onUpdate: () => {
            el.textContent = `${parsed.prefix}${Math.round(state.n)}${parsed.suffix}`
          },
        })
      })

      return () => {
        tweens.forEach((tween) => tween?.kill())
      }
    },
    { scope },
  )
}
