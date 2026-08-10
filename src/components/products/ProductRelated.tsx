import { Link } from 'react-router-dom'
import { CarouselNav, Container } from '../common'
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

/**
 * Related products — Figma “You may also need”
 * 3 placeholder cards + decorative prev/next controls.
 */
export function ProductRelated({
  eyebrow,
  title,
  items,
  className,
}: ProductRelatedProps) {
  return (
    <Container className={cn('pb-4 md:pb-8', className)}>
      <div className="mb-8 flex items-end justify-between gap-6 md:mb-10">
        <div>
          <p className="text-eyebrow">{eyebrow}</p>
          <h2 className="mt-2 max-w-[475px] font-display text-[clamp(1.75rem,4vw,2.5rem)] font-medium leading-[1.1] text-foreground">
            {title}
          </h2>
        </div>
        <CarouselNav
          prevAriaLabel={productsStrings.relatedPrevAriaLabel}
          nextAriaLabel={productsStrings.relatedNextAriaLabel}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Link
            key={item.id}
            to={item.href}
            className="group flex flex-col gap-5"
          >
            <div
              {...mediaPlaceholderProps(productsStrings.relatedMediaAriaLabel)}
              className="h-[220px] w-full bg-surface-placeholder transition-opacity group-hover:opacity-90 md:h-[340px]"
            />
            <h3 className="font-display text-xl font-medium leading-[1.3] text-foreground md:text-[26px] md:leading-[26px]">
              {item.title}
            </h3>
          </Link>
        ))}
      </div>
    </Container>
  )
}
