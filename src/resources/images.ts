import logo from '../assets/images/brand/logo.svg'
import pattern from '../assets/images/brand/pattern.png'
import patternDark from '../assets/images/brand/pattern_dark.png'
import aboutBanner from '../assets/images/about/about_banner.svg'
import capability01 from '../assets/images/about/capabilities/capability_01.png'
import capability02 from '../assets/images/about/capabilities/capability_02.png'
import capability03 from '../assets/images/about/capabilities/capability_03.png'
import capability04 from '../assets/images/about/capabilities/capability_04.png'
import featureImage from '../assets/images/projects/feature_image.png'
import subscribeBanner from '../assets/images/common/subscribe_banner.svg'
import heroBanner from '../assets/images/home/hero_banner.webp'
import heroIntroBg from '../assets/images/home/hero_intro_bg.svg'
import homePresenceBg from '../assets/images/home/home_presence_bg.svg'
import homeStatsBg from '../assets/images/home/home_stats_bg.svg'
import testimonial01 from '../assets/images/home/testimonials/testimonial_01.png'
import testimonial02 from '../assets/images/home/testimonials/testimonial_02.png'
import testimonial03 from '../assets/images/home/testimonials/testimonial_03.png'
import testimonial04 from '../assets/images/home/testimonials/testimonial_04.png'
import insight01 from '../assets/images/insights/insight_01.png'
import insight02 from '../assets/images/insights/insight_02.png'
import insight03 from '../assets/images/insights/insight_03.png'
import insight04 from '../assets/images/insights/insight_04.png'
import insight05 from '../assets/images/insights/insight_05.png'
import insight06 from '../assets/images/insights/insight_06.png'
import insight07 from '../assets/images/insights/insight_07.png'

/**
 * Central image registry — files live under `src/assets/images/{brand,home,about,insights,common}`.
 * Import images only from here (never from `assets/` directly in components).
 */
export const images = {
  logo,
  pattern,
  patternDark,
  aboutBanner,
  capability01,
  capability02,
  capability03,
  capability04,
  featureImage,
  heroBanner,
  heroIntroBg,
  homePresenceBg,
  homeStatsBg,
  subscribeBanner,
  testimonial01,
  testimonial02,
  testimonial03,
  testimonial04,
  insight01,
  insight02,
  insight03,
  insight04,
  insight05,
  insight06,
  insight07,
} as const

export type ImageKey = keyof typeof images
