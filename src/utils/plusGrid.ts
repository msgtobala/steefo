import type { CSSProperties } from 'react'

/** Vertical junction positions for a 3-column plus grid. */
export const PLUS_GRID_V_LINES = ['0%', '33.333%', '66.666%', '100%'] as const

/** Horizontal junction positions for a 2-row plus grid. */
export const PLUS_GRID_H_LINES = ['0%', '50%', '100%'] as const

export function plusGridHLineStyle(
  top: string,
  overhangPx: number,
): CSSProperties {
  return {
    top,
    left: -overhangPx,
    width: `calc(100% + ${overhangPx * 2}px)`,
  }
}

export function plusGridVLineStyle(
  left: string,
  overhangPx: number,
): CSSProperties {
  return {
    left,
    top: -overhangPx,
    height: `calc(100% + ${overhangPx * 2}px)`,
  }
}

export function plusGridPlusStyle(left: string, top: string): CSSProperties {
  return { left, top }
}
