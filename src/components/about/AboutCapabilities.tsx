import { useRef } from 'react'
import { CarouselNav, Container } from '../common'
import { CapabilityCard } from './CapabilityCard'
import type { IconKey } from '../../resources/icons'
import { aboutStrings } from '../../resources/about_strings'
import { cn } from '../../utils'

export type AboutCapabilityItem = {
  id: string
  icon: IconKey
  title: string
  body: string
}

export type AboutCapabilitiesProps = {
  eyebrow: string
  titleBefore: string
  titleHighlight: string
  titleAfter: string
  items: AboutCapabilityItem[]
  className?: string
}

const CARD_GAP_PX = 20

/**
 * Core capabilities row — Figma About 1:3167–1:3175
 * Arrow-only horizontal carousel (no visible scrollbar / swipe).
 */
export function AboutCapabilities({
  eyebrow,
  titleBefore,
  titleHighlight,
  titleAfter,
  items,
  className,
}: AboutCapabilitiesProps) {
  const scrollerRef = useRef<HTMLDivElement>(null)

  function scrollByCard(direction: -1 | 1) {
    const scroller = scrollerRef.current
    if (!scroller) return

    const card = scroller.querySelector<HTMLElement>('[data-capability-card]')
    const amount = (card?.offsetWidth ?? 427) + CARD_GAP_PX
    scroller.scrollBy({ left: direction * amount, behavior: 'smooth' })
  }

  return (
    <section
      className={cn('mt-16 md:mt-24', className)}
      data-animate-section
    >
      <Container>
        <div className="mb-8 flex items-end justify-between gap-6 md:mb-10">
          <div className="max-w-[475px]" data-animate="left">
            <p className="text-eyebrow">{eyebrow}</p>
            <h2 className="mt-3 font-display text-[clamp(1.75rem,4vw,2.5rem)] font-normal leading-[1.1] tracking-[-0.025em] text-foreground">
              {titleBefore}
              <span className="text-brand">{titleHighlight}</span>
              {titleAfter}
            </h2>
          </div>
          <div data-animate="right">
            <CarouselNav
              prevAriaLabel={aboutStrings.capabilities.prevAriaLabel}
              nextAriaLabel={aboutStrings.capabilities.nextAriaLabel}
              onPrev={() => scrollByCard(-1)}
              onNext={() => scrollByCard(1)}
            />
          </div>
        </div>
      </Container>

      <div
        ref={scrollerRef}
        className="scrollbar-none overflow-x-auto overscroll-x-contain touch-pan-y"
        data-animate-stagger
      >
        <div className="container-content flex w-max gap-5">
          {items.map((item) => (
            <CapabilityCard
              key={item.id}
              icon={item.icon}
              title={item.title}
              body={item.body}
              data-animate="up"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
