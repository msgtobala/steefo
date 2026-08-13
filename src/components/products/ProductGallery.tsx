import { Container } from '../common'
import { productsStrings } from '../../resources/products_strings'
import { cn, mediaPlaceholderProps } from '../../utils'

export type ProductGalleryProps = {
  /** Total placeholder slots; layout is fixed 1 + 2 + 3. */
  slots?: number
  className?: string
}

/**
 * Product media gallery — Figma 1:3456–1:3461
 * Row layout: full / two asymmetric / three equal. Placeholders only.
 * Each row reveals when it enters the viewport.
 */
export function ProductGallery({ slots = 6, className }: ProductGalleryProps) {
  const count = Math.max(slots, 6)
  const mediaProps = mediaPlaceholderProps(productsStrings.galleryMediaAriaLabel)

  return (
    <Container className={cn('mt-14 md:mt-20', className)}>
      <div className="flex flex-col gap-5">
        <div
          data-animate-section
          data-animate-stagger
        >
          <div
            {...mediaProps}
            className="h-[280px] w-full bg-surface-placeholder md:h-[460px]"
            data-animate="scale"
          />
        </div>

        <div
          className="grid grid-cols-1 gap-5 md:grid-cols-[1.35fr_1fr]"
          data-animate-section
          data-animate-stagger
        >
          <div
            {...mediaProps}
            className="h-[280px] w-full bg-surface-placeholder md:h-[500px]"
            data-animate="scale"
          />
          <div
            {...mediaProps}
            className="h-[280px] w-full bg-surface-placeholder md:h-[500px]"
            data-animate="scale"
          />
        </div>

        <div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          data-animate-section
          data-animate-stagger
        >
          {Array.from({ length: Math.min(3, count - 3) }, (_, index) => (
            <div
              key={index}
              {...mediaProps}
              className="h-[280px] w-full bg-surface-placeholder md:h-[500px]"
              data-animate="scale"
            />
          ))}
        </div>
      </div>
    </Container>
  )
}
