import { Container } from '../common'
import { Button } from '../ui'
import { productsStrings } from '../../resources/products_strings'
import { cn } from '../../utils/cn'

export type ProductInterestCtaProps = {
  title: string
  body: string
  requestQuoteTo: string
  contactTo: string
  className?: string
}

/**
 * Mid-page interest CTA — Figma 1:3427–1:3441
 * Primary Request a Quote + secondary Contact Us.
 */
export function ProductInterestCta({
  title,
  body,
  requestQuoteTo,
  contactTo,
  className,
}: ProductInterestCtaProps) {
  return (
    <Container
      className={cn(
        'flex flex-col items-center py-16 text-center md:py-20',
        className,
      )}
      data-animate-section
    >
      <h2
        className="max-w-[542px] font-display text-[clamp(2rem,5vw,4rem)] font-medium leading-[1.1] tracking-[-0.03em] text-balance text-foreground"
        data-animate="up"
      >
        {title}
      </h2>
      <p
        className="mt-5 max-w-[618px] font-display text-base leading-[1.3] text-subtle-foreground md:mt-6"
        data-animate="up"
      >
        {body}
      </p>
      <div
        className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:gap-4"
        data-animate="up"
      >
        <Button
          variant="primary"
          size="sm"
          to={requestQuoteTo}
          cutCorners="top-right"
          className="min-w-[152px]"
        >
          {productsStrings.requestQuote}
        </Button>
        <Button
          variant="secondary"
          size="sm"
          to={contactTo}
          cutCorners="bottom-left"
          withArrow={false}
          className="min-w-[152px]"
        >
          {productsStrings.contactUs}
        </Button>
      </div>
    </Container>
  )
}
