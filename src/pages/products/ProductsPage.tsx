import { Container, PageHero } from '../../components/common'
import { ProductsGrid } from '../../components/products'
import { usePageRevealRef } from '../../hooks/usePageReveal'
import { productsStrings } from '../../resources/products_strings'
import { products } from './products.config'

/**
 * Products listing — Insights-style hero + masonry grid.
 * Detail layout lives on ProductDetailPage.
 */
export function ProductsPage() {
  const rootRef = usePageRevealRef({ withHero: true })

  return (
    <div ref={rootRef}>
      <PageHero
        eyebrow={productsStrings.listing.eyebrow}
        title={productsStrings.listing.title}
      />

      <Container className="mt-12 md:mt-16">
        <ProductsGrid products={products} />
      </Container>
    </div>
  )
}
