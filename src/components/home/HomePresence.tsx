import { useMemo, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { PresenceMap } from './PresenceMap'
import { gsap, prefersReducedMotion, registerGsap } from '../../lib/gsap'
import { homeStrings } from '../../resources/home_strings'
import { images } from '../../resources/images'
import { cn } from '../../utils'

export type HomePresenceMarket = {
  iso2: string
  numeric: string
  label: string
}

export type HomePresenceProps = {
  markets: readonly HomePresenceMarket[]
  className?: string
}

/** Figma Frame 38 / Frame 37 row split */
const ROW1_COUNT = 12

/**
 * Home global presence — Figma 51:4055
 * Black band + bottom trapezoid tab; flat Mercator map; two country rows.
 */
export function HomePresence({ markets, className }: HomePresenceProps) {
  const rootRef = useRef<HTMLElement>(null)
  const { eyebrow, titleLine1, titleHighlight, mapAriaLabel } =
    homeStrings.presence
  const [hoveredIso2, setHoveredIso2] = useState<string | null>(null)

  const activeNumericIds = useMemo(
    () => new Set(markets.map((m) => String(Number(m.numeric)))),
    [markets],
  )

  const activeIsoByNumeric = useMemo(() => {
    const map = new Map<string, string>()
    for (const market of markets) {
      map.set(String(Number(market.numeric)), market.iso2)
    }
    return map
  }, [markets])

  const labelByIso2 = useMemo(() => {
    const map = new Map<string, string>()
    for (const market of markets) {
      map.set(market.iso2, market.label)
    }
    return map
  }, [markets])

  const row1 = markets.slice(0, ROW1_COUNT)
  const row2 = markets.slice(ROW1_COUNT)

  useGSAP(
    () => {
      registerGsap()
      if (prefersReducedMotion()) return

      const items = gsap.utils.toArray<HTMLElement>('[data-home-presence]')
      gsap.fromTo(
        items,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.4,
          stagger: 0.22,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        },
      )
    },
    { scope: rootRef },
  )

  return (
    <section
      ref={rootRef}
      className={cn('relative w-full overflow-hidden', className)}
      aria-label={eyebrow}
    >
      {/* Figma 51:4055 — black shell + bottom trapezoid tab (reveals page white) */}
      <img
        src={images.homePresenceBg}
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 size-full max-w-none"
      />

      {/*
        Figma 51:4055 — 1440×980 shell.
        Title ~60px from top; map 880×571 centered; labels ~49px under map.
      */}
      <div className="relative z-[1] mx-auto flex aspect-[1440/980] w-full max-w-page flex-col items-center px-6 pt-[clamp(2.75rem,4.2vw,3.75rem)] pb-[calc((40/980)*100%+1.25rem)] md:px-10">
        <header
          className="flex shrink-0 flex-col items-center text-center"
          data-home-presence
        >
          <p className="font-display text-sm font-medium uppercase leading-[1.2] text-white">
            {eyebrow}
          </p>
          <h2 className="mt-2 max-w-[625px] font-display text-[clamp(1.75rem,4vw,2.5rem)] font-medium leading-[1.1] text-balance text-white md:mt-3">
            <span className="block">{titleLine1}</span>
            <span className="block text-brand">{titleHighlight}</span>
          </h2>
        </header>

        <div data-home-presence className="mt-[clamp(1.5rem,3vw,2.5rem)] w-full max-w-[64rem] shrink-0">
          <PresenceMap
            className="w-full"
            activeNumericIds={activeNumericIds}
            activeIsoByNumeric={activeIsoByNumeric}
            labelByIso2={labelByIso2}
            hoveredIso2={hoveredIso2}
            onHoverIso2={setHoveredIso2}
            ariaLabel={mapAriaLabel}
          />
        </div>

        <div
          className="mt-[clamp(1.5rem,3vw,2.5rem)] flex w-full max-w-[67.5rem] flex-col items-center gap-y-2.5 md:gap-y-5"
          data-home-presence
        >
          <CountryRow
            markets={row1}
            hoveredIso2={hoveredIso2}
            onHoverIso2={setHoveredIso2}
            className="justify-center gap-x-5 sm:gap-x-6 md:gap-x-8"
          />
          <CountryRow
            markets={row2}
            hoveredIso2={hoveredIso2}
            onHoverIso2={setHoveredIso2}
            className="justify-center gap-x-5 sm:gap-x-6 md:gap-x-8"
          />
        </div>
      </div>
    </section>
  )
}

function CountryRow({
  markets,
  hoveredIso2,
  onHoverIso2,
  className,
}: {
  markets: readonly HomePresenceMarket[]
  hoveredIso2: string | null
  onHoverIso2: (iso2: string | null) => void
  className?: string
}) {
  return (
    <ul className={cn('flex flex-wrap items-center', className)}>
      {markets.map((market) => {
        const active = hoveredIso2 === market.iso2
        return (
          <li key={market.iso2}>
            <button
              type="button"
              className={cn(
                'font-display text-sm font-normal leading-[1.2] whitespace-nowrap transition-colors',
                active ? 'text-brand' : 'text-white hover:text-brand',
              )}
              onMouseEnter={() => onHoverIso2(market.iso2)}
              onMouseLeave={() => onHoverIso2(null)}
              onFocus={() => onHoverIso2(market.iso2)}
              onBlur={() => onHoverIso2(null)}
            >
              {market.label}
            </button>
          </li>
        )
      })}
    </ul>
  )
}
