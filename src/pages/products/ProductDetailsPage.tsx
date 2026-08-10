import { Link, useParams } from 'react-router-dom'
import { Container } from '../../components/common'
import { uiConstants } from '../../constants/ui_constants'
import { productsStrings } from '../../resources/products_strings'

/**
 * Product details placeholder — related-product deep links land here
 * until dedicated detail routes are built out.
 */
export function ProductDetailsPage() {
  const { productId } = useParams<{ productId: string }>()

  return (
    <Container className="page py-10 md:py-16">
      <h1 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-medium text-foreground">
        {productsStrings.detailsTitle}
      </h1>
      <p className="mt-4 font-display text-base leading-[1.3] text-subtle-foreground">
        {productsStrings.detailsDescription(productId ?? '')}
      </p>
      <p className="mt-8">
        <Link
          to={uiConstants.routes.products}
          className="font-display text-sm font-medium text-brand underline underline-offset-4 hover:text-brand-hover"
        >
          {productsStrings.backToProducts}
        </Link>
      </p>
    </Container>
  )
}
