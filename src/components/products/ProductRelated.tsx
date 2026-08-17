import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { CarouselNav, Container } from '../common'
import { prefersReducedMotion } from '../../lib/gsap'
import { productsStrings } from '../../resources/products_strings'
import { cn, mediaPlaceholderProps } from '../../utils'

export type ProductRelatedItem = {
  id: string
  title: string
  href: string
}

export type ProductRelatedProps = {
  eyebrow: string
  title: string
  items: ProductRelatedItem[]
  className?: string
}

const CARD_GAP_PX = 20

/**
 * Related products — Figma “You may also need”
 * Horizontal cards + prev/next controls.
 */
export function ProductRelated({
  eyebrow,
  title,
  items,
  className,
}: ProductRelatedProps) {
  const scrollerRef = useRef<HTMLDivElement>(null)

  function scrollByCard(direction: -1 | 1) {
    const scroller = scrollerRef.current
    if (!scroller) return
    const card = scroller.querySelector<HTMLElement>('[data-related-card]')
    const amount = (card?.offsetWidth ?? 427) + CARD_GAP_PX
    scroller.scrollBy({
      left: direction * amount,
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    })
  }

  return (
    <div className={cn('pb-4 md:pb-8', className)} data-animate-section>
      <Container>
        <div className="mb-8 flex items-end justify-between gap-6 md:mb-10">
          <div data-animate="left">
            <p className="text-eyebrow">{eyebrow}</p>
            <h2 className="mt-2 max-w-[475px] font-display text-[clamp(1.75rem,4vw,2.5rem)] font-medium leading-[1.1] text-foreground">
              {title}
            </h2>
          </div>
          <div data-animate="right">
            <CarouselNav
              prevAriaLabel={productsStrings.relatedPrevAriaLabel}
              nextAriaLabel={productsStrings.relatedNextAriaLabel}
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
            <Link
              key={item.id}
              to={item.href}
              data-related-card
              className="motion-lift group flex w-[min(427px,85vw)] shrink-0 flex-col gap-5"
              data-animate="up"
            >
              <div className="motion-media h-[220px] w-full md:h-[340px]">
                <div
                  {...mediaPlaceholderProps(productsStrings.relatedMediaAriaLabel)}
                  className="motion-zoom size-full bg-surface-placeholder"
                />
              </div>
              <h3 className="font-display text-xl font-medium leading-[1.3] text-foreground transition-colors group-hover:text-brand md:text-[26px] md:leading-[26px]">
                {item.title}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
