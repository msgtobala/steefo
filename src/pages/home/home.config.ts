import type { HomeDeliverItemId } from '../../resources/home_strings'
import type { ImageKey } from '../../resources/images'

export type HomeDeliverItemConfig = {
  id: HomeDeliverItemId
  /** Optional media from `images` registry; gray placeholder when omitted. */
  image?: ImageKey
}

/**
 * Home “What we deliver” steps — Figma 40:4048.
 * Add `image` keys as assets land under `src/assets/images/home/`.
 */
export const homeDeliverItems: HomeDeliverItemConfig[] = [
  { id: 'design' },
  { id: 'standards' },
  { id: 'turnkey' },
  { id: 'configurable' },
  { id: 'support' },
  { id: 'proven' },
]

export type HomePartnerLogo = {
  id: string
  /** Placeholder label until real logo assets are registered. */
  label: string
  /** Optional logo from `images` registry. */
  image?: ImageKey
}

/**
 * Home partners row — Figma 47:4053.
 * Replace `label` placeholders with `image` keys when assets are ready.
 */
export const homePartnerLogos: HomePartnerLogo[] = [
  { id: 'client-logo-1', label: 'clientlogo1' },
  { id: 'client-logo-2', label: 'clientlogo2' },
  { id: 'client-logo-3', label: 'clientlogo3' },
  { id: 'client-logo-4', label: 'clientlogo4' },
  { id: 'client-logo-5', label: 'clientlogo5' },
]

/**
 * Home global presence markets — Figma 51:4054 country list.
 * `numeric` drives SVG fills via world-atlas TopoJSON ids.
 */
export const homePresenceMarkets = [
  { iso2: 'IN', numeric: '356', label: 'India' },
  { iso2: 'BD', numeric: '50', label: 'Bangladesh' },
  { iso2: 'ML', numeric: '466', label: 'Mali' },
  { iso2: 'GH', numeric: '288', label: 'Ghana' },
  { iso2: 'SA', numeric: '682', label: 'Saudi Arabia' },
  { iso2: 'JO', numeric: '400', label: 'Jordan' },
  { iso2: 'QA', numeric: '634', label: 'Qatar' },
  { iso2: 'UG', numeric: '800', label: 'Uganda' },
  { iso2: 'RW', numeric: '646', label: 'Rwanda' },
  { iso2: 'KE', numeric: '404', label: 'Kenya' },
  { iso2: 'MU', numeric: '480', label: 'Mauritius' },
  { iso2: 'ZW', numeric: '716', label: 'Zimbabwe' },
  { iso2: 'AO', numeric: '24', label: 'Angola' },
  { iso2: 'CD', numeric: '180', label: 'D. R. of Congo' },
  { iso2: 'ET', numeric: '231', label: 'Ethiopia' },
  { iso2: 'LK', numeric: '144', label: 'Sri Lanka' },
  { iso2: 'NP', numeric: '524', label: 'Nepal' },
  { iso2: 'BF', numeric: '854', label: 'Burkina Faso' },
  { iso2: 'LY', numeric: '434', label: 'Libya' },
  { iso2: 'SN', numeric: '686', label: 'Senegal' },
  { iso2: 'ID', numeric: '360', label: 'Indonesia' },
] as const

export type HomePresenceMarket = (typeof homePresenceMarkets)[number]

export type HomeTestimonialTheme = 'brand' | 'light' | 'dark'

export type HomeTestimonial = {
  id: string
  name: string
  role: string
  company: string
  quote: string
  avatar: ImageKey
  theme: HomeTestimonialTheme
}

/**
 * Home client testimonials — Figma 55:5759.
 * Themes cycle brand → light → dark → light across the strip.
 */
export const homeTestimonials: HomeTestimonial[] = [
  {
    id: 'bilal-siddique-1',
    name: 'Bilal Siddique',
    role: 'Operations Director',
    company: 'Asian Steel Corp',
    quote:
      'One of the best manufacturers of steel rolling mills & plants in comprehensive design. Their turnkey solutions and after-sales support are outstanding.',
    avatar: 'testimonial01',
    theme: 'brand',
  },
  {
    id: 'sayed-ali-iraqi',
    name: 'Sayed Ali Iraqi',
    role: 'Plant Manager',
    company: 'Middle East Steel Industries',
    quote:
      'Superior quality rolling mills and plant manufacturer in India. They offer export quality products with exceptional engineering standards. Highly recommended for any steel manufacturing setup.',
    avatar: 'testimonial02',
    theme: 'light',
  },
  {
    id: 'bilal-siddique-2',
    name: 'Bilal Siddique',
    role: 'Operations Director',
    company: 'Asian Steel Corp',
    quote:
      'One of the best manufacturers of steel rolling mills & plants in comprehensive design. Their turnkey solutions and after-sales support are outstanding.',
    avatar: 'testimonial03',
    theme: 'dark',
  },
  {
    id: 'abu-baker-rizvi',
    name: 'Abu Baker Rizvi',
    role: 'CEO',
    company: 'Global Metal Solutions',
    quote:
      'I strongly recommend Steefo Engineering Corporation as one of the top Rolling Mill Manufacturers. Their technical expertise and commitment to quality is unmatched in the industry.',
    avatar: 'testimonial04',
    theme: 'light',
  },
]
