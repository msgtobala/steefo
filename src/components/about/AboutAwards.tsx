import { useRef } from 'react'
import { CarouselNav, Container } from '../common'
import { AwardCard } from './AwardCard'
import { aboutStrings } from '../../resources/about_strings'
import type { ImageKey } from '../../resources/images'
import { cn } from '../../utils'

export type AboutAwardItem = {
  id: string
  image: ImageKey
}

export type AboutAwardsProps = {
  eyebrow: string
  title: string
  body: string
  items: AboutAwardItem[]
  className?: string
}

const CARD_GAP_PX = 20

/**
 * Awards & Recognitions — full-width image scroller, arrows below (GSAP stagger).
 */
export function AboutAwards({
  eyebrow,
  title,
  body,
  items,
  className,
}: AboutAwardsProps) {
  const scrollerRef = useRef<HTMLDivElement>(null)

  function scrollByCard(direction: -1 | 1) {
    const scroller = scrollerRef.current
    if (!scroller) return

    const card = scroller.querySelector<HTMLElement>('[data-award-card]')
    const amount = (card?.offsetWidth ?? 300) + CARD_GAP_PX
    scroller.scrollBy({ left: direction * amount, behavior: 'smooth' })
  }

  return (
    <section
      className={cn('mt-16 md:mt-24', className)}
      data-animate-section
    >
      <Container className="mb-8 flex flex-col items-center text-center md:mb-10">
        <p className="text-eyebrow" data-animate="up">
          {eyebrow}
        </p>
        <h2
          className="mt-2 max-w-[719px] font-display text-[clamp(2rem,5vw,4.5rem)] font-normal leading-[1.1] tracking-[-0.0556em] text-foreground"
          data-animate="up"
        >
          {title}
        </h2>
        <p
          className="mt-5 max-w-[568px] font-display text-base leading-[1.2] text-body md:mt-6"
          data-animate="up"
        >
          {body}
        </p>
      </Container>

      <div data-animate-stagger>
        <div
          ref={scrollerRef}
          className="scrollbar-none overflow-x-auto overscroll-x-contain touch-pan-y"
        >
          <div className="container-content flex w-max gap-5">
            {items.map((item) => (
              <AwardCard
                key={item.id}
                image={item.image}
                data-animate="scale"
              />
            ))}
          </div>
        </div>

        <Container className="mt-6 flex justify-center md:mt-8">
          <div data-animate="scale">
            <CarouselNav
              prevAriaLabel={aboutStrings.awards.prevAriaLabel}
              nextAriaLabel={aboutStrings.awards.nextAriaLabel}
              onPrev={() => scrollByCard(-1)}
              onNext={() => scrollByCard(1)}
            />
          </div>
        </Container>
      </div>
    </section>
  )
}
