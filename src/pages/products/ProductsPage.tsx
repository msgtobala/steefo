import {
  ProductFeatures,
  ProductGallery,
  ProductHero,
  ProductInterestCta,
  ProductRelated,
  ProductWhySteefo,
} from '../../components/products'
import { productsStrings } from '../../resources/products_strings'
import {
  productGallerySlots,
  productInterestLinks,
  productRelatedItems,
  productSpecs,
  productWhyItems,
} from './products.config'

/**
 * Products page — Figma Product Page 1:3251
 * Copy from products_strings; order/links from products.config.
 */
export function ProductsPage() {
  const {
    hero,
    features,
    specs: specCopy,
    why,
    whyItems: whyCopy,
    interest,
    related,
    relatedItems: relatedCopy,
  } = productsStrings

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

  const relatedItems = productRelatedItems.map(({ id, href }) => ({
    id,
    href,
    title: relatedCopy[id].title,
  }))

  return (
    <>
      <ProductHero
        productNumber={hero.productNumber}
        title={hero.title}
        subtitle={hero.subtitle}
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
    </>
  )
}
