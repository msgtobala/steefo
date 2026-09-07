import type { ProductCardSize } from '../../components/products/ProductCard'
import { uiConstants } from '../../constants/ui_constants'
import { productsStrings } from '../../resources/products_strings'
import type {
  ProductRelatedItemId,
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

export type ProductRelatedItemConfig = {
  id: ProductRelatedItemId
  href: string
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

/** Related products carousel/grid — Figma “You may also need” */
export const productRelatedItems: ProductRelatedItemConfig[] = [
  {
    id: 'rolling-mill-sections',
    href: `${productsRoute}/rolling-mill-sections`,
  },
  {
    id: 'induction-furnaces',
    href: `${productsRoute}/induction-furnaces`,
  },
  {
    id: 'continuous-casting',
    href: `${productsRoute}/continuous-casting`,
  },
]

/** Gallery placeholder count (layout: 1 + 2 + 3). */
export const productGallerySlots = 6

export const productInterestLinks = {
  requestQuote: contact,
  contactUs: contact,
} as const

const RELATED_SIZES: ProductCardSize[] = ['twoThirds', 'third', 'third']

export type CatalogProduct = {
  id: string
  productNumber: string
  title: string
  excerpt: string
  href: string
  size: ProductCardSize
}

/**
 * Listing catalog — flagship TMT mill plus the existing related-products array.
 */
export const products: CatalogProduct[] = [
  {
    id: 'rolling-mill-tmt-bar',
    productNumber: productsStrings.hero.productNumber,
    title: productsStrings.hero.title,
    excerpt: productsStrings.hero.subtitle,
    href: `${productsRoute}/rolling-mill-tmt-bar`,
    size: 'third',
  },
  ...productRelatedItems.map((item, index) => ({
    id: item.id,
    productNumber: `PRODUCT 0${index + 2}`,
    title: productsStrings.relatedItems[item.id].title,
    excerpt: productsStrings.relatedItems[item.id].excerpt,
    href: item.href,
    size: RELATED_SIZES[index],
  })),
]

export function getProductById(id: string) {
  return products.find((product) => product.id === id)
}

export function getRelatedProducts(id: string) {
  return products.filter((product) => product.id !== id)
}
