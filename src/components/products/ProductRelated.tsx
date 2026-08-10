import { Link } from 'react-router-dom'
import { Container } from '../common'
import { icons } from '../../resources/icons'
import { productsStrings } from '../../resources/products_strings'

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ')
}

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
        <div className="hidden shrink-0 items-center gap-4 sm:flex">
          <button
            type="button"
            aria-label={productsStrings.relatedPrevAriaLabel}
            className="flex size-10 items-center justify-center transition-opacity hover:opacity-70"
          >
            <img
              src={icons.left}
              alt=""
              width={18}
              height={32}
              className="h-8 w-[18px]"
            />
          </button>
          <button
            type="button"
            aria-label={productsStrings.relatedNextAriaLabel}
            className="flex size-10 items-center justify-center transition-opacity hover:opacity-70"
          >
            <img
              src={icons.right}
              alt=""
              width={18}
              height={32}
              className="h-8 w-[18px]"
            />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Link
            key={item.id}
            to={item.href}
            className="group flex flex-col gap-5"
          >
            <div
              role="img"
              aria-label={productsStrings.relatedMediaAriaLabel}
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
