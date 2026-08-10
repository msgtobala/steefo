export type ButtonCorner =
  | 'top-left'
  | 'top-right'
  | 'bottom-right'
  | 'bottom-left'

const ALL_CORNERS: ButtonCorner[] = [
  'top-left',
  'top-right',
  'bottom-right',
  'bottom-left',
]

export function normalizeCorners(
  cutCorners: ButtonCorner | ButtonCorner[] | 'none' | undefined,
  fallback: ButtonCorner[],
): ButtonCorner[] {
  if (cutCorners === 'none') return []
  if (cutCorners == null) return fallback
  return Array.isArray(cutCorners) ? cutCorners : [cutCorners]
}

/**
 * Builds a clip-path polygon with optional 45° corner cutouts.
 * Matches the Figma boolean Subtract used on Steefo CTAs.
 */
export function getButtonClipPath(
  corners: ButtonCorner[],
  cutSize = 10,
): string {
  if (corners.length === 0 || cutSize <= 0) {
    return 'none'
  }

  const active = new Set(corners.filter((c) => ALL_CORNERS.includes(c)))
  if (active.size === 0) return 'none'

  const s = `${cutSize}px`
  const points: string[] = []

  if (active.has('top-left')) {
    points.push(`${s} 0`)
  } else {
    points.push('0 0')
  }

  if (active.has('top-right')) {
    points.push(`calc(100% - ${s}) 0`)
    points.push(`100% ${s}`)
  } else {
    points.push('100% 0')
  }

  if (active.has('bottom-right')) {
    points.push(`100% calc(100% - ${s})`)
    points.push(`calc(100% - ${s}) 100%`)
  } else {
    points.push('100% 100%')
  }

  if (active.has('bottom-left')) {
    points.push(`${s} 100%`)
    points.push(`0 calc(100% - ${s})`)
  } else {
    points.push('0 100%')
  }

  if (active.has('top-left')) {
    points.push(`0 ${s}`)
  }

  return `polygon(${points.join(', ')})`
}

/**
 * Inner cut for a bordered (padded) shell so the 45° edge stays the same
 * thickness as the straight sides. Same cut on both layers makes the diagonal
 * ≈ borderWidth × √2.
 *
 * With outer cut S and border B: inner cut = S − B(2 − √2).
 */
export function getInnerCutSize(cutSize: number, borderWidth = 1): number {
  return Math.max(0, cutSize - borderWidth * (2 - Math.SQRT2))
}
