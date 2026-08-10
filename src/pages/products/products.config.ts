import { uiConstants } from '../../constants/ui_constants'
import type {
  ProductRelatedItemId,
  ProductSpecId,
  ProductWhyItemId,
} from '../../resources/products_strings'

const { products, contact } = uiConstants.routes

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
    href: `${products}/rolling-mill-sections`,
  },
  {
    id: 'induction-furnaces',
    href: `${products}/induction-furnaces`,
  },
  {
    id: 'continuous-casting',
    href: `${products}/continuous-casting`,
  },
]

/** Gallery placeholder count (layout: 1 + 2 + 3). */
export const productGallerySlots = 6

export const productInterestLinks = {
  requestQuote: contact,
  contactUs: contact,
} as const
