import logo from '../assets/images/brand/logo.svg'
import pattern from '../assets/images/brand/pattern.png'
import subscribeBanner from '../assets/images/common/subscribe_banner.svg'
import heroBanner from '../assets/images/home/hero_banner.png'
import insight01 from '../assets/images/insights/insight_01.png'
import insight02 from '../assets/images/insights/insight_02.png'
import insight03 from '../assets/images/insights/insight_03.png'
import insight04 from '../assets/images/insights/insight_04.png'
import insight05 from '../assets/images/insights/insight_05.png'
import insight06 from '../assets/images/insights/insight_06.png'
import insight07 from '../assets/images/insights/insight_07.png'

/**
 * Central image registry — files live under `src/assets/images/{brand,home,insights,common}`.
 * Import images only from here (never from `assets/` directly in components).
 */
export const images = {
  logo,
  pattern,
  heroBanner,
  subscribeBanner,
  insight01,
  insight02,
  insight03,
  insight04,
  insight05,
  insight06,
  insight07,
} as const

export type ImageKey = keyof typeof images
