import { type CSSProperties, type MouseEvent, type ReactNode, useRef } from 'react'
import { prefersReducedMotion } from '../../lib/gsap'
import { cn } from '../../utils'

export type SpotlightCellProps = {
  children: ReactNode
  className?: string
}

/**
 * Cursor-tracked 1px edge glow + faint interior wash (brand red).
 * The ring is a masked radial — not a full-card background animation.
 */
export function SpotlightCell({ children, className }: SpotlightCellProps) {
  const rootRef = useRef<HTMLDivElement>(null)

  function onMouseMove(event: MouseEvent<HTMLDivElement>) {
    if (prefersReducedMotion()) return
    const el = rootRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${event.clientX - rect.left}px`)
    el.style.setProperty('--my', `${event.clientY - rect.top}px`)
  }

  function onMouseLeave() {
    const el = rootRef.current
    if (!el) return
    el.style.removeProperty('--mx')
    el.style.removeProperty('--my')
  }

  return (
    <div
      ref={rootRef}
      className={cn(
        'spotlight-cell relative isolate h-full overflow-hidden',
        className,
      )}
      style={
        {
          '--mx': '50%',
          '--my': '50%',
        } as CSSProperties
      }
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div className="relative z-[1] h-full">{children}</div>
    </div>
  )
}
