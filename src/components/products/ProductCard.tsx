import type { HTMLAttributes } from 'react'
import { Link } from 'react-router-dom'
import { productsStrings } from '../../resources/products_strings'
import { cn, mediaPlaceholderProps } from '../../utils'

export type ProductCardSize = 'third' | 'twoThirds'

const IMAGE_HEIGHT: Record<ProductCardSize, string> = {
  third: 'h-[220px] md:h-[341px]',
  twoThirds: 'h-[240px] md:h-[460px] lg:h-[520px]',
}

export type ProductCardProps = {
  productNumber: string
  title: string
  excerpt: string
  href: string
  size: ProductCardSize
  className?: string
} & HTMLAttributes<HTMLElement>

/**
 * Product listing card — Insights grid 14:3343
 * Whole-card link: placeholder media + product number + title + excerpt + Read More.
 */
export function ProductCard({
  productNumber,
  title,
  excerpt,
  href,
  size,
  className,
  ...rest
}: ProductCardProps) {
  return (
    <article
      className={cn('motion-lift group flex min-w-0 flex-col', className)}
      {...rest}
    >
      <Link to={href} className="flex flex-col gap-4">
        <div
          className={cn(
            'motion-media w-full bg-surface-placeholder',
            IMAGE_HEIGHT[size],
          )}
        >
          <div
            {...mediaPlaceholderProps(productsStrings.cardMediaAriaLabel)}
            className="motion-zoom size-full bg-surface-placeholder"
          />
        </div>

        <div className="flex flex-col gap-3">
          <p className="font-display text-xs font-normal uppercase leading-[1.1] tracking-[0.02em] text-subtle-foreground">
            {productNumber}
          </p>
          <h3 className="font-display text-base font-medium leading-[1.3] text-foreground transition-colors group-hover:text-brand">
            {title}
          </h3>
          <p className="line-clamp-2 font-display text-sm font-normal leading-[1.3] text-subtle-foreground">
            {excerpt}
          </p>
          <span className="motion-underline w-fit font-display text-sm font-medium leading-[1.3] text-foreground">
            {productsStrings.readMore}
          </span>
        </div>
      </Link>
    </article>
  )
}
