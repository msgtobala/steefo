import type { ImageKey } from '../../resources/images'

export type HomeDeliverItem = {
  id: string
  name: string
  /** Optional media from `images` registry; gray placeholder when omitted. */
  image?: ImageKey
}

/**
 * Home “What we deliver” steps — Figma 40:4048.
 */
export const homeDeliverItems: HomeDeliverItem[] = [
  { id: 'turnkey', name: 'Turnkey- concept to commissioning', image: 'deliver03' },
  { id: 'design', name: 'In-house design & manufacturing', image: 'deliver01' },
  // { id: 'standards', name: 'Built to European standards', image: 'deliver02' },
  { id: 'configurable', name: 'Configurable to your production', image: 'deliver04' },
  { id: 'support', name: 'After-sales support & spares', image: 'deliver05' },
  { id: 'proven', name: 'Proven across 20+ countries', image: 'deliver06' },
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
  role?: string
  company?: string
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
    id: 'bilal-siddique',
    name: 'Mr. Bilal Siddique',
    quote:
      'Steefo Engineering Corporation is a Government-recognized Star Export House and one of the best manufacturers of steel rolling mills, plants, and accessories with comprehensive design capabilities.',
    avatar: 'testimonial01',
    theme: 'brand',
  },
  {
    id: 'abu-baker-rizvi',
    name: 'Mr. Abu Baker Rizvi',
    quote:
      'When we talk about quality rolling mills, I strongly recommend Steefo Engineering Corporation as one of the top rolling mill manufacturers in India.',
    avatar: 'testimonial02',
    theme: 'light',
  },
  {
    id: 'faisal-al-mansoori',
    name: 'Mr. Faisal Al Mansoori',
    quote:
      'Steefo Engineering Corporation has delivered exceptional rolling mill solutions with excellent engineering expertise and reliable after-sales support. Their commitment to quality and timely execution makes them a trusted partner in the steel industry.',
    avatar: 'testimonial03',
    theme: 'dark',
  },
  {
    id: 'ahmed-al-rashid',
    name: 'Mr. Ahmed Al Rashid',
    company: 'Saudi Arabia',
    quote:
      'Working with Steefo Engineering Corporation has been a great experience. Their advanced technology, customised solutions, and professional approach have helped us achieve efficient and consistent rolling mill operations.',
    avatar: 'testimonial04',
    theme: 'light',
  },
]
