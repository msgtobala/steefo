import { Navigate, useParams } from 'react-router-dom'
import {
  ProductFeatures,
  ProductGallery,
  ProductHero,
  ProductInterestCta,
  ProductRelated,
  ProductWhySteefo,
} from '../../components/products'
import { uiConstants } from '../../constants/ui_constants'
import { usePageRevealRef } from '../../hooks/usePageReveal'
import { productsStrings } from '../../resources/products_strings'
import {
  getProductById,
  getRelatedProducts,
  productGallerySlots,
  productInterestLinks,
  productSpecs,
  productWhyItems,
} from './products.config'

/**
 * Product detail — former Products page layout (Figma 1:3251).
 * Copy from products_strings; order/links from products.config.
 */
export function ProductDetailPage() {
  const { productId } = useParams<{ productId: string }>()
  const rootRef = usePageRevealRef({ withHero: true, deps: [productId] })
  const product = productId ? getProductById(productId) : undefined

  const {
    features,
    specs: specCopy,
    why,
    whyItems: whyCopy,
    interest,
    related,
  } = productsStrings

  if (!product) {
    return <Navigate to={uiConstants.routes.products} replace />
  }

  const specs = productSpecs.map(({ id }) => ({
    id,
    label: specCopy[id].label,
    value: specCopy[id].value,
  }))

  const whyItems = productWhyItems.map(({ id }) => ({
    id,
    title: whyCopy[id].title,
    body: whyCopy[id].body,
  }))

  const relatedItems = getRelatedProducts(product.id).map(
    ({ id, href, title }) => ({
      id,
      href,
      title,
    }),
  )

  return (
    <div ref={rootRef}>
      <ProductHero
        productNumber={product.productNumber}
        title={product.title}
        subtitle={product.excerpt}
      />

      <ProductFeatures
        eyebrow={features.eyebrow}
        titleBefore={features.titleBefore}
        titleHighlight={features.titleHighlight}
        body={features.body}
        specs={specs}
      />

      <ProductGallery slots={productGallerySlots} />

      <ProductWhySteefo
        eyebrow={why.eyebrow}
        title={why.title}
        items={whyItems}
      />

      <ProductInterestCta
        title={interest.title}
        body={interest.body}
        requestQuoteTo={productInterestLinks.requestQuote}
        contactTo={productInterestLinks.contactUs}
      />

      <ProductRelated
        className="mt-4 md:mt-8"
        eyebrow={related.eyebrow}
        title={related.title}
        items={relatedItems}
      />
    </div>
  )
}
