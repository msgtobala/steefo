import { Container } from '../common'
import { images } from '../../resources/images'
import { productsStrings } from '../../resources/products_strings'
import { cn } from '../../utils'

export type ProductSpecItem = {
  id: string
  label: string
  value: string
}

export type ProductFeaturesProps = {
  eyebrow: string
  titleBefore: string
  titleHighlight: string
  body: string
  specs: ProductSpecItem[]
  className?: string
}

/**
 * Features + specs + side media — Figma Product Page features block.
 */
export function ProductFeatures({
  eyebrow,
  titleBefore,
  titleHighlight,
  body,
  specs,
  className,
}: ProductFeaturesProps) {
  return (
    <Container
      className={cn('mt-14 md:mt-20', className)}
      data-animate-section
    >
      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-12">
        <div className="flex flex-col">
          <div data-animate="left">
            <p className="text-eyebrow">{eyebrow}</p>
            <h2 className="mt-2 max-w-[487px] font-display text-[clamp(1.75rem,4vw,2.5rem)] font-medium leading-[1.1] text-foreground">
              {titleBefore}
              <span className="text-brand">{titleHighlight}</span>
            </h2>
            <p className="mt-5 max-w-[538px] font-display text-base leading-[1.3] text-subtle-foreground">
              {body}
            </p>
          </div>

          <div
            className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2"
            data-animate-stagger
          >
            {specs.map((spec) => (
              <div
                key={spec.id}
                className="flex flex-col gap-2 bg-surface-subtle px-8 py-5 sm:px-10"
                data-animate="up"
              >
                <p className="font-display text-sm font-normal leading-[1.2] text-subtle-foreground">
                  {spec.label}
                </p>
                <p className="font-display text-[clamp(1.5rem,3vw,2rem)] font-medium leading-[1.2] text-foreground">
                  {spec.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        <img
          src={images.featureImage}
          alt={productsStrings.featuresMediaAriaLabel}
          className="h-[320px] w-full object-cover object-center md:h-[420px] lg:h-[477px]"
          style={{
            // Top-right diagonal cut — Figma Mask group 1:3331
            clipPath:
              'polygon(0 0, calc(100% - 56px) 0, 100% 48px, 100% 100%, 0 100%)',
          }}
          data-animate="right"
        />
      </div>
    </Container>
  )
}
