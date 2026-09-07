import type { CatalogProduct } from '../../pages/products/products.config'
import { ProductCard } from './ProductCard'
import { cn } from '../../utils/cn'

export type ProductsGridProps = {
  products: CatalogProduct[]
  className?: string
}

/**
 * Masonry-style products grid — Insights 14:3343
 * Desktop: 1/3+2/3 · 3×1/3 · 2/3+1/3. Tablet: 2-col. Mobile: stack.
 */
export function ProductsGrid({ products, className }: ProductsGridProps) {
  const [a, b, c, d, e, f, g] = products

  const rowClass =
    'grid grid-cols-1 gap-x-5 gap-y-12 md:grid-cols-2 md:gap-y-14 lg:grid-cols-3'

  return (
    <div className={cn('flex flex-col gap-12 md:gap-14', className)}>
      <div
        className={rowClass}
        data-animate-section
        data-animate-stagger
      >
        {a ? (
          <ProductCard {...a} className="lg:col-span-1" data-animate="up" />
        ) : null}
        {b ? (
          <ProductCard
            {...b}
            className="md:col-span-1 lg:col-span-2"
            data-animate="up"
          />
        ) : null}
      </div>

      <div
        className={rowClass}
        data-animate-section
        data-animate-stagger
      >
        {c ? <ProductCard {...c} data-animate="up" /> : null}
        {d ? <ProductCard {...d} data-animate="up" /> : null}
        {e ? (
          <ProductCard
            {...e}
            className="md:col-span-2 lg:col-span-1"
            data-animate="up"
          />
        ) : null}
      </div>

      <div
        className={rowClass}
        data-animate-section
        data-animate-stagger
      >
        {f ? (
          <ProductCard
            {...f}
            className="md:col-span-1 lg:col-span-2"
            data-animate="up"
          />
        ) : null}
        {g ? (
          <ProductCard {...g} className="lg:col-span-1" data-animate="up" />
        ) : null}
      </div>
    </div>
  )
}
