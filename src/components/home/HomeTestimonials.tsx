import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { Container } from '../common'
import type {
  HomeTestimonial,
  HomeTestimonialTheme,
} from '../../pages/home/home.config'
import { gsap, prefersReducedMotion, registerGsap } from '../../lib/gsap'
import { homeStrings } from '../../resources/home_strings'
import { images } from '../../resources/images'
import { cn } from '../../utils'

export type HomeTestimonialsProps = {
  items: readonly HomeTestimonial[]
  className?: string
}

const THEME_CLASS: Record<
  HomeTestimonialTheme,
  { card: string; body: string; role: string }
> = {
  brand: {
    card: 'bg-brand text-white',
    body: 'text-white',
    role: 'text-white',
  },
  light: {
    card: 'bg-[#f6f6f6] text-body',
    body: 'text-body',
    role: 'text-brand',
  },
  dark: {
    card: 'bg-black text-white',
    body: 'text-white',
    role: 'text-brand',
  },
}

/**
 * Home client testimonials — Figma 55:5759
 * Centered header + horizontal themed quote cards.
 */
export function HomeTestimonials({ items, className }: HomeTestimonialsProps) {
  const rootRef = useRef<HTMLElement>(null)
  const scrollerRef = useRef<HTMLDivElement>(null)
  const { eyebrow, title, body } = homeStrings.testimonials

  useGSAP(
    () => {
      registerGsap()
      if (prefersReducedMotion()) return

      const header = gsap.utils.toArray<HTMLElement>(
        '[data-home-testimonials-header]',
      )
      const cards = gsap.utils.toArray<HTMLElement>(
        '[data-home-testimonial-card]',
      )

      gsap.fromTo(
        header,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.4,
          stagger: 0.18,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        },
      )

      if (cards.length) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 48 },
          {
            opacity: 1,
            y: 0,
            duration: 1.35,
            stagger: 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: scrollerRef.current,
              start: 'top 78%',
              toggleActions: 'play none none none',
            },
          },
        )
      }
    },
    { scope: rootRef },
  )

  return (
    <section
      ref={rootRef}
      className={cn('mb-[120px] w-full bg-white', className)}
      aria-label={eyebrow}
    >
      <Container>
        <header
          className="mx-auto flex max-w-[474px] flex-col items-center text-center"
          data-home-testimonials-header
        >
          <p className="text-eyebrow">{eyebrow}</p>
          <h2 className="mt-2 font-display text-[clamp(1.75rem,4vw,2.5rem)] font-medium leading-[1.1] text-foreground">
            {title}
          </h2>
          <p className="mt-4 font-display text-base font-normal leading-[1.3] text-body">
            {body}
          </p>
        </header>
      </Container>

      <div
        ref={scrollerRef}
        className="scrollbar-none mt-10 overflow-x-auto overscroll-x-contain touch-pan-y md:mt-12"
      >
        <div className="container-content flex w-max gap-5 pb-1">
          {items.map((item) => {
            const theme = THEME_CLASS[item.theme]
            return (
              <article
                key={item.id}
                data-home-testimonial-card
                className={cn(
                  'flex h-[293px] w-[min(26.25rem,85vw)] shrink-0 flex-col justify-between px-6 py-7',
                  theme.card,
                )}
              >
                <div className="flex items-start gap-3">
                  <img
                    src={images[item.avatar]}
                    alt=""
                    width={40}
                    height={40}
                    className="size-10 shrink-0 rounded-full object-cover"
                  />
                  <div className="min-w-0 font-sans text-xs leading-[1.4]">
                    <p className="font-semibold whitespace-normal">
                      <span>{item.name}</span>
                      <span className="font-semibold">{`  |  `}</span>
                      <span className={cn('font-semibold', theme.role)}>
                        {item.role}
                      </span>
                    </p>
                    <p className={cn('font-normal', theme.body)}>
                      {item.company}
                    </p>
                  </div>
                </div>

                <p
                  className={cn(
                    'max-w-[22rem] font-sans text-sm font-normal leading-[1.3]',
                    theme.body,
                  )}
                >
                  “{item.quote}”
                </p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
