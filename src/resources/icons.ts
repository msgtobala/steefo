import designServices from '../assets/icons/layout/design-services.svg'
import footerNotch from '../assets/icons/layout/footer-notch.svg'
import gridLine from '../assets/icons/layout/grid-line.svg'
import gridLineV from '../assets/icons/layout/grid-line-v.svg'
import handyman from '../assets/icons/layout/handyman.svg'
import left from '../assets/icons/layout/left.svg'
import plus from '../assets/icons/layout/plus.svg'
import right from '../assets/icons/layout/right.svg'
import ruleSettings from '../assets/icons/layout/rule-settings.svg'
import verifiedUser from '../assets/icons/layout/verified-user.svg'
import facebook from '../assets/icons/social/facebook.svg'
import instagram from '../assets/icons/social/instagram.svg'

/**
 * Central icon registry — files live under `src/assets/icons/{social,layout}`.
 * Import icons only from here (never from `assets/` directly in components).
 */
export const icons = {
  facebook,
  instagram,
  footerNotch,
  plus,
  gridLine,
  gridLineV,
  left,
  right,
  handyman,
  designServices,
  ruleSettings,
  verifiedUser,
} as const

export type IconKey = keyof typeof icons
