import { useId } from 'react'
import { cn } from '../../utils/cn'

const TRACES = [
  {
    d: 'M 684,0 L 684,18.75 A 18.75,18.75 0 0 1 665.25,37.5 L 477.5,37.5 L 221,37.5 A 50,50 0 0 0 171,87.5 L 171,87.5 A 38.54,38.54 0 0 1 122.65,124.78 L 0,92.5',
    duration: '6.4s',
    delay: '0s',
  },
  {
    d: 'M 1026,0 L 1026,28.75 A 28.75,28.75 0 0 0 1054.75,57.5 L 1511.5,57.5 A 27.5,27.5 0 0 1 1539,85 L 1539,85 A 27.5,27.5 0 0 0 1566.5,112.5 L 1710,112.5',
    duration: '7.2s',
    delay: '-2.1s',
  },
  {
    d: 'M 1710,200 L 1558.54,166.78 A 184.57,184.57 0 0 0 1519,162.5 L 1155.25,162.5 A 43.75,43.75 0 0 0 1111.5,206.25 L 1111.5,250',
    duration: '5.8s',
    delay: '-3.4s',
  },
  {
    d: 'M 0,162.5 L 393,162.5 A 15.11,15.11 0 0 1 396.74,192.24 L 171,250',
    duration: '8s',
    delay: '-1.2s',
  },
] as const

export type CircuitFlowProps = {
  className?: string
  /** Pulse stroke. Default white so it reads on the black footer. */
  pulse?: string
}

/**
 * Faint circuit tracks with a looping dash that travels each path.
 * Inline SVG is required — dashoffset cannot animate inside an <img>.
 */
export function CircuitFlow({
  className,
  pulse = '#F5F5F5',
}: CircuitFlowProps) {
  const rawId = useId().replace(/:/g, '')
  const glowId = `circuit-glow-${rawId}`

  return (
    <svg
      viewBox="0 0 1710 250"
      fill="none"
      aria-hidden
      preserveAspectRatio="none"
      className={cn('pointer-events-none block size-full', className)}
    >
      <defs>
        <filter
          id={glowId}
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      {TRACES.map((trace) => (
        <g key={trace.d}>
          <path
            d={trace.d}
            stroke="#A2A2A2"
            strokeOpacity={0.18}
            strokeWidth={1}
          />
          <path
            d={trace.d}
            pathLength={100}
            stroke={pulse}
            strokeWidth={6}
            strokeLinecap="round"
            strokeOpacity={0.35}
            filter={`url(#${glowId})`}
            className="circuit-flow-dash motion-reduce:hidden"
            style={{
              animationDuration: trace.duration,
              animationDelay: trace.delay,
            }}
          />
          <path
            d={trace.d}
            pathLength={100}
            stroke={pulse}
            strokeWidth={1.25}
            strokeLinecap="round"
            className="circuit-flow-dash motion-reduce:hidden"
            style={{
              animationDuration: trace.duration,
              animationDelay: trace.delay,
            }}
          />
        </g>
      ))}
    </svg>
  )
}
