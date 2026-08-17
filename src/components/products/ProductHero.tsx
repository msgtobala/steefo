import { Container } from '../common'
import { productsStrings } from '../../resources/products_strings'
import { cn, mediaPlaceholderProps } from '../../utils'

export type ProductHeroProps = {
  productNumber: string
  title: string
  subtitle: string
  className?: string
}

/**
 * Product hero — Figma 1:3251
 * Eyebrow + title + subtitle + full-width image placeholder (no video).
 */
export function ProductHero({
  productNumber,
  title,
  subtitle,
  className,
}: ProductHeroProps) {
  return (
    <Container
      className={cn(
        'flex flex-col items-center pt-10 text-center md:pt-16',
        className,
      )}
    >
      <p className="text-eyebrow" data-animate-hero>
        {productNumber}
      </p>
      <h1
        className="mt-3 max-w-[711px] font-display text-[clamp(2rem,5vw,4.5rem)] font-normal leading-none tracking-[-0.0556em] text-balance text-foreground"
        data-animate-hero
      >
        {title}
      </h1>
      <p
        className="mt-6 max-w-[608px] font-display text-base leading-[1.3] text-body md:mt-8 md:text-lg"
        data-animate-hero
      >
        {subtitle}
      </p>
      <div
        className="motion-media group mt-8 h-[280px] w-full md:mt-10 md:h-[460px] lg:h-[566px]"
        data-animate-hero
      >
        <div
          {...mediaPlaceholderProps(productsStrings.heroMediaAriaLabel)}
          className="motion-zoom size-full bg-surface-placeholder"
        />
      </div>
    </Container>
  )
}
