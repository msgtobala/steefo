import logo from '../assets/images/brand/logo.svg'
import pattern from '../assets/images/brand/pattern.png'
import patternDark from '../assets/images/brand/pattern_dark.png'
import aboutBanner from '../assets/images/about/about_banner.svg'
import aboutCapabilities from '../assets/images/about/about_capabilities.png'
import innovatorSureshAgrawal from '../assets/images/about/innovators/suresh_agrawal.png'
import innovatorSurilAgarwal from '../assets/images/about/innovators/suril_agarwal.jpeg'
import award01 from '../assets/images/about/awards/award_1.jpg'
import award02 from '../assets/images/about/awards/award_2.gif'
import award03 from '../assets/images/about/awards/award_3.jpg'
import award04 from '../assets/images/about/awards/award_4.jpg'
import award05 from '../assets/images/about/awards/award_5.jpg'
import award06 from '../assets/images/about/awards/award_6.jpg'
import award07 from '../assets/images/about/awards/award_7.jpg'
import award08 from '../assets/images/about/awards/award_8.jpg'
import award09 from '../assets/images/about/awards/award_9.jpg'
import capability01 from '../assets/images/about/capabilities/capability_01.png'
import capability02 from '../assets/images/about/capabilities/capability_02.png'
import capability03 from '../assets/images/about/capabilities/capability_03.png'
import capability04 from '../assets/images/about/capabilities/capability_04.png'
import featureImage from '../assets/images/projects/feature_image.png'
import subscribeBanner from '../assets/images/common/subscribe_banner.jpg'
import heroBanner from '../assets/images/home/hero_banner.webp'
import heroIntroBg from '../assets/images/home/hero_intro_bg.svg'
import homePresenceBg from '../assets/images/home/home_presence_bg.svg'
import homeStatsBg from '../assets/images/home/home_stats_bg.svg'
import deliver01 from '../assets/images/home/what_we_deliver/what_we_deliver_01.png'
import deliver02 from '../assets/images/home/what_we_deliver/what_we_deliver_02.png'
import deliver03 from '../assets/images/home/what_we_deliver/what_we_deliver_03.png'
import deliver04 from '../assets/images/home/what_we_deliver/what_we_deliver_04.png'
import deliver05 from '../assets/images/home/what_we_deliver/what_we_deliver_05.png'
import deliver06 from '../assets/images/home/what_we_deliver/what_we_deliver_06.png'
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
  aboutCapabilities,
  innovatorSureshAgrawal,
  innovatorSurilAgarwal,
  award01,
  award02,
  award03,
  award04,
  award05,
  award06,
  award07,
  award08,
  award09,
  capability01,
  capability02,
  capability03,
  capability04,
  featureImage,
  heroBanner,
  heroIntroBg,
  homePresenceBg,
  homeStatsBg,
  deliver01,
  deliver02,
  deliver03,
  deliver04,
  deliver05,
  deliver06,
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
