import { Link } from 'react-router-dom'
import { Container } from '../common'
import { productsStrings } from '../../resources/products_strings'

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ')
}

function ChevronLeftIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M12.5 15.833 6.667 10 12.5 4.167"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M7.5 4.167 13.333 10 7.5 15.833"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
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
            className="flex size-10 items-center justify-center text-brand transition-opacity hover:opacity-70"
          >
            <ChevronLeftIcon className="size-5" />
          </button>
          <button
            type="button"
            aria-label={productsStrings.relatedNextAriaLabel}
            className="flex size-10 items-center justify-center text-brand transition-opacity hover:opacity-70"
          >
            <ChevronRightIcon className="size-5" />
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
