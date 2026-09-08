import type { ProductCardSize } from '../../components/products/ProductCard'
import { uiConstants } from '../../constants/ui_constants'
import type { ImageKey } from '../../resources/images'
import { productsStrings } from '../../resources/products_strings'
import type {
  ProductCatalogId,
  ProductSpecId,
  ProductWhyItemId,
} from '../../resources/products_strings'

const { products: productsRoute, contact } = uiConstants.routes

export type ProductSpecConfig = {
  id: ProductSpecId
}

export type ProductWhyItemConfig = {
  id: ProductWhyItemId
}

/** Spec order for the features 2×2 grid — Figma Product Page 1:3251 */
export const productSpecs: ProductSpecConfig[] = [
  { id: 'capacity' },
  { id: 'bar-size' },
  { id: 'speed' },
  { id: 'standard' },
]

/** Why Choose Us card order — Figma 1:3395 */
export const productWhyItems: ProductWhyItemConfig[] = [
  { id: 'continuous-flow' },
  { id: 'in-house-design' },
  { id: 'automated-controls' },
  { id: 'low-maintenance' },
  { id: 'modular-config' },
  { id: 'global-compliance' },
]

/** Gallery placeholder count (layout: 1 + 2 + 3). */
export const productGallerySlots = 6

export const productInterestLinks = {
  requestQuote: contact,
  contactUs: contact,
} as const

export type CatalogProduct = {
  id: ProductCatalogId
  productNumber: string
  title: string
  excerpt: string
  href: string
  image: ImageKey
  /** Product detail hero/banner media — empty until assets are registered. */
  banner: ImageKey | null
  /** Product gallery media — empty until assets are registered. */
  gallery: ImageKey[]
  size: ProductCardSize
}

const CATALOG: Array<{
  id: ProductCatalogId
  image: ImageKey
  size: ProductCardSize
  banner?: ImageKey | null
  gallery?: ImageKey[]
}> = [
  {
    id: 'rolling-mill-tmt-bar',
    image: 'productRollingMillTmt',
    size: 'third',
    banner: 'productRollingMillTmtBanner',
    gallery: [],
  },
  {
    id: 'rolling-mill-section',
    image: 'productRollingMillSection',
    size: 'twoThirds',
    banner: null,
    gallery: [],
  },
  {
    id: 'induction-furnaces',
    image: 'productInductionFurnace',
    size: 'third',
    banner: null,
    gallery: [],
  },
  {
    id: 'wire-rod-lines',
    image: 'productWireRodLines',
    size: 'third',
    banner: 'productWireRodLinesBanner',
    gallery: [],
  },
  {
    id: 'turnkey-solutions-for-steel-plants',
    image: 'productTurnkeySolutions',
    size: 'third',
    banner: 'productTurnkeySolutionsBanner',
    gallery: [],
  },
]

/**
 * Products catalog — 5 core offerings with registered media.
 */
export const products: CatalogProduct[] = CATALOG.map((item, index) => {
  const copy = productsStrings.catalog[item.id]
  return {
    id: item.id,
    productNumber: `PRODUCT 0${index + 1}`,
    title: copy.title,
    excerpt: copy.excerpt,
    href: `${productsRoute}/${item.id}`,
    image: item.image,
    banner: item.banner ?? null,
    gallery: item.gallery ?? [],
    size: item.size,
  }
})

export function getProductById(id: string) {
  return products.find((product) => product.id === id)
}

export function getRelatedProducts(id: string) {
  return products.filter((product) => product.id !== id)
}

/** Catalog products for the home showcase carousel. */
export function getTopProducts(count = 5) {
  return products.slice(0, count)
}
