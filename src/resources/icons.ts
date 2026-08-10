import footerNotch from '../assets/icons/layout/footer-notch.svg'
import gridLine from '../assets/icons/layout/grid-line.svg'
import gridLineV from '../assets/icons/layout/grid-line-v.svg'
import plus from '../assets/icons/layout/plus.svg'
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
} as const

export type IconKey = keyof typeof icons
