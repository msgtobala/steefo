import { useId, useLayoutEffect, useRef } from 'react'
import { cn } from '../../utils/cn'
import { FOOTER_CIRCUIT_PATHS } from './circuitPaths'

const PULSE_PATHS = FOOTER_CIRCUIT_PATHS.filter(
  (trace): trace is (typeof FOOTER_CIRCUIT_PATHS)[number] & { pulse: true } =>
    'pulse' in trace && trace.pulse === true,
)

/** Visible dash length in SVG user units (matches the original ~8px tick). */
const DASH = 8

export type CircuitFlowProps = {
  className?: string
  /** Pulse stroke. Default brand red. */
  pulse?: string
  /**
   * `cover` — footer `pattern.png` (slice, 1440×647).
   * `fill` — stretched `heroIntroBg` (none, 1440×692).
   */
  fit?: 'cover' | 'fill'
}

function usePathPulse(d: string) {
  const ref = useRef<SVGPathElement>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const length = el.getTotalLength()
    if (!length) return
    el.style.strokeDasharray = `${DASH} ${length}`
    el.style.setProperty('--circuit-len', `${-length}`)
  }, [d])

  return ref
}

function CircuitPulse({
  d,
  pulse,
  glow,
  glowId,
  duration,
  delay,
}: {
  d: string
  pulse: string
  glow: boolean
  glowId: string
  duration: string
  delay: string
}) {
  const glowRef = usePathPulse(d)
  const dashRef = usePathPulse(d)
  const motion = {
    animationDuration: duration,
    animationDelay: delay,
  }

  return (
    <g>
      {glow ? (
        <path
          ref={glowRef}
          d={d}
          stroke={pulse}
          strokeWidth={6}
          strokeLinecap="round"
          strokeOpacity={0.28}
          filter={`url(#${glowId})`}
          className="circuit-flow-dash motion-reduce:hidden"
          style={motion}
        />
      ) : null}
      <path
        ref={dashRef}
        d={d}
        stroke={pulse}
        strokeWidth={1.8}
        strokeLinecap="round"
        className="circuit-flow-dash motion-reduce:hidden"
        style={motion}
      />
    </g>
  )
}

/**
 * Traveling dashes on the `_1200x800px` circuit mesh (footer + home brand band).
 * Dash offset is driven by each path’s real length so the tick follows corners.
 */
export function CircuitFlow({
  className,
  pulse = 'var(--color-brand)',
  fit = 'cover',
}: CircuitFlowProps) {
  const rawId = useId().replace(/:/g, '')
  const glowId = `circuit-glow-${rawId}`
  const clipId = `circuit-clip-${rawId}`
  const fill = fit === 'fill'

  return (
    <svg
      viewBox={fill ? '0 0 1440 692' : '0 0 1440 647'}
      fill="none"
      aria-hidden
      preserveAspectRatio={fill ? 'none' : 'xMidYMin slice'}
      className={cn('pointer-events-none block size-full', className)}
    >
      <defs>
        <clipPath id={clipId}>
          <rect width="1440" height="647" />
        </clipPath>
        <filter
          id={glowId}
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>

      <g clipPath={`url(#${clipId})`}>
        {PULSE_PATHS.map((trace, i) => (
          <CircuitPulse
            key={trace.d}
            d={trace.d}
            pulse={pulse}
            glow
            glowId={glowId}
            duration={`${6.4 + (i % 5) * 0.7}s`}
            delay={`-${((i * 1.4) % 8).toFixed(2)}s`}
          />
        ))}
      </g>
    </svg>
  )
}
