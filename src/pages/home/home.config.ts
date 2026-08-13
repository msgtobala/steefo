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
