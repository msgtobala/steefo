import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { Container } from '../common'
import {
  gsap,
  prefersReducedMotion,
  registerGsap,
  ScrollTrigger,
} from '../../lib/gsap'
import {
  homeStrings,
  type HomeDeliverItemId,
} from '../../resources/home_strings'
import { images, type ImageKey } from '../../resources/images'
import { cn } from '../../utils'

export type HomeDeliverItem = {
  id: HomeDeliverItemId
  index: string
  title: string
  image?: ImageKey
}

export type HomeDeliverProps = {
  items: HomeDeliverItem[]
  className?: string
}

/**
 * Home “What we deliver” — Figma 40:4048
 * Pins the full stage (list + media) while scroll advances the active step.
 */
export function HomeDeliver({ items, className }: HomeDeliverProps) {
  const rootRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const { eyebrow, mediaAriaLabel } = homeStrings.deliver

  useGSAP(
    () => {
      registerGsap()
      if (prefersReducedMotion() || items.length === 0) return

      const root = rootRef.current
      const stage = stageRef.current
      if (!root || !stage) return

      const steps = gsap.utils.toArray<HTMLElement>('[data-deliver-step]', root)
      const medias = gsap.utils.toArray<HTMLElement>('[data-deliver-media]', root)
      const numbers = gsap.utils.toArray<HTMLElement>(
        '[data-deliver-index]',
        root,
      )
      const titles = gsap.utils.toArray<HTMLElement>(
        '[data-deliver-title]',
        root,
      )

      let current = -1

      const setActive = (active: number) => {
        if (active === current) return
        current = active

        steps.forEach((step, i) => {
          const on = i === active
          step.setAttribute('aria-current', on ? 'true' : 'false')
          gsap.to(numbers[i], {
            color: on ? 'rgba(0,0,0,0.32)' : 'rgba(0,0,0,0.2)',
            duration: 0.3,
            overwrite: 'auto',
          })
          gsap.to(titles[i], {
            color: on ? '#000000' : 'rgba(0,0,0,0.3)',
            duration: 0.3,
            overwrite: 'auto',
          })
        })

        medias.forEach((media, i) => {
          const on = i === active
          media.setAttribute('aria-hidden', on ? 'false' : 'true')
          gsap.to(media, {
            opacity: on ? 1 : 0,
            duration: 0.4,
            ease: 'power2.out',
            overwrite: 'auto',
          })
        })
      }

      setActive(0)

      const count = items.length

      const trigger = ScrollTrigger.create({
        trigger: stage,
        start: 'top top',
        end: () => `+=${count * window.innerHeight * 0.9}`,
        pin: true,
        pinSpacing: true,
        scrub: 0.45,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const idx = Math.min(count - 1, Math.floor(self.progress * count))
          setActive(idx)
        },
      })

      return () => {
        trigger.kill()
      }
    },
    { scope: rootRef, dependencies: [items.length] },
  )

  return (
    <section
      ref={rootRef}
      className={cn('w-full bg-white', className)}
      aria-label={eyebrow}
    >
      <div ref={stageRef} className="bg-white">
        <Container className="flex min-h-svh w-full flex-col justify-center py-20 md:py-24">
          <p className="text-eyebrow">{eyebrow}</p>

          <div className="mt-6 grid grid-cols-1 items-center gap-10 md:mt-8 md:grid-cols-[minmax(15rem,21.125rem)_minmax(0,1fr)] md:gap-x-12 lg:gap-x-16 xl:gap-x-24">
            <ol className="flex flex-col justify-between gap-7 md:min-h-[min(36rem,62vh)] md:gap-0 lg:min-h-[min(44.9375rem,68vh)]">
              {items.map((item, index) => {
                const active = index === 0
                return (
                  <li
                    key={item.id}
                    className="flex items-start gap-8"
                    data-deliver-step
                    aria-current={active ? 'true' : 'false'}
                  >
                    <span
                      className="shrink-0 font-display text-sm font-medium leading-[1.2]"
                      data-deliver-index
                      style={{
                        color: active
                          ? 'rgba(0,0,0,0.32)'
                          : 'rgba(0,0,0,0.2)',
                      }}
                    >
                      {item.index}
                    </span>
                    <p
                      className="max-w-[18rem] font-display text-[clamp(1.25rem,2.2vw,1.75rem)] font-normal leading-[1.2]"
                      data-deliver-title
                      style={{
                        color: active ? '#000000' : 'rgba(0,0,0,0.3)',
                      }}
                    >
                      {item.title}
                    </p>
                  </li>
                )
              })}
            </ol>

            <div
              className="relative aspect-[785/719] w-full overflow-hidden bg-surface-placeholder md:aspect-auto md:h-[min(36rem,62vh)] lg:h-[min(44.9375rem,68vh)]"
              aria-label={mediaAriaLabel}
            >
              {items.map((item, index) => {
                const src = item.image ? images[item.image] : undefined
                return (
                  <div
                    key={item.id}
                    data-deliver-media
                    className="absolute inset-0 bg-surface-placeholder"
                    style={{ opacity: index === 0 ? 1 : 0 }}
                    aria-hidden={index === 0 ? 'false' : 'true'}
                  >
                    {src ? (
                      <img
                        src={src}
                        alt=""
                        className="size-full object-cover"
                      />
                    ) : null}
                  </div>
                )
              })}
            </div>
          </div>
        </Container>
      </div>
    </section>
  )
}
