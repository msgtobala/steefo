import { type RefObject } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, prefersReducedMotion, registerGsap } from '../lib/gsap'

/**
 * Scale-in then smooth full shrink/grow pulse on `[data-plus-pulse]` icons.
 * Used by About leadership + Products Why Choose Us grids.
 */
export function usePlusPulse(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      registerGsap()
      if (prefersReducedMotion()) return

      const pluses = gsap.utils.toArray<HTMLElement>('[data-plus-pulse]')
      if (!pluses.length) return

      gsap.set(pluses, { scale: 0, transformOrigin: '50% 50%' })

      let pulse: gsap.core.Tween | undefined

      const intro = gsap.to(pluses, {
        scale: 1,
        duration: 0.75,
        ease: 'power2.out',
        stagger: {
          each: 0.05,
          from: 'center',
        },
        scrollTrigger: {
          trigger: scope.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
        onComplete: () => {
          pulse = gsap.to(pluses, {
            scale: 0,
            duration: 2,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
            stagger: {
              each: 0.08,
              from: 'center',
              repeat: -1,
              yoyo: true,
            },
          })
        },
      })

      return () => {
        pulse?.kill()
        intro.kill()
      }
    },
    { scope },
  )
}
