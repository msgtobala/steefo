import { useEffect, useMemo, useState } from 'react'
import {
  geoMercator,
  geoPath,
  type GeoPermissibleObjects,
} from 'd3-geo'
import { feature } from 'topojson-client'
import type { Feature, FeatureCollection, Geometry } from 'geojson'
import type { Topology } from 'topojson-specification'
import { cn } from '../../utils'

type CountryProperties = {
  name?: string
}

type CountryFeature = Feature<Geometry, CountryProperties> & {
  id?: string | number
}

type CountriesTopology = Topology<{
  countries: {
    type: 'GeometryCollection'
    geometries: Array<{
      type: string
      id?: string | number
      properties?: CountryProperties
      arcs: unknown
    }>
  }
}>

export type PresenceMapProps = {
  /** ISO 3166-1 numeric ids (as in world-atlas), e.g. "356" for India */
  activeNumericIds: ReadonlySet<string>
  activeIsoByNumeric: ReadonlyMap<string, string>
  hoveredIso2: string | null
  onHoverIso2: (iso2: string | null) => void
  className?: string
  ariaLabel: string
}

/** Figma Layer_1 map frame — 880×571 */
const MAP_WIDTH = 880
const MAP_HEIGHT = 571
const GEO_URL = '/geo/countries-50m.json'
/** Antarctica — omit so the fit matches the Figma crop */
const ANTARCTICA_ID = '10'

/**
 * Figma World map (1:58) path paints — from exported SVG:
 * inactive fill #BCBCBC @ 16% (reads as ~#1E1E1E on black),
 * active #DB251C solid, stroke #565656 / 0.5
 */
const FILL_DEFAULT = '#bcbcbc'
const FILL_DEFAULT_OPACITY = 0.16
const FILL_ACTIVE = '#db251c'
const FILL_HOVER = '#eb1c24'
const STROKE = '#565656'
const STROKE_WIDTH = 0.5

function numericKey(id: string | number | undefined) {
  if (id == null || id === '') return ''
  return String(Number(id))
}

/**
 * Data-driven world map — flat Mercator (Figma 1:58), ISO-driven fills.
 * No curved / Natural-Earth silhouette; Antarctica omitted from the fit.
 */
export function PresenceMap({
  activeNumericIds,
  activeIsoByNumeric,
  hoveredIso2,
  onHoverIso2,
  className,
  ariaLabel,
}: PresenceMapProps) {
  const [countries, setCountries] = useState<CountryFeature[] | null>(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const res = await fetch(GEO_URL)
        if (!res.ok) return
        const topo = (await res.json()) as CountriesTopology
        const fc = feature(
          topo,
          topo.objects.countries,
        ) as FeatureCollection<Geometry, CountryProperties>
        if (!cancelled) {
          setCountries(
            (fc.features as CountryFeature[]).filter(
              (geo) => numericKey(geo.id) !== ANTARCTICA_ID,
            ),
          )
        }
      } catch {
        if (!cancelled) setCountries([])
      }
    }

    void load()
    return () => {
      cancelled = true
    }
  }, [])

  const pathGen = useMemo(() => {
    if (!countries?.length) return null
    const collection: FeatureCollection = {
      type: 'FeatureCollection',
      features: countries,
    }
    // Flat cylindrical projection — matches Figma (large blocky Greenland, no globe curve).
    const projection = geoMercator().fitExtent(
      [
        [8, 4],
        [MAP_WIDTH - 8, MAP_HEIGHT - 8],
      ],
      collection,
    )
    return geoPath(projection)
  }, [countries])

  return (
    <div
      className={cn('relative w-full', className)}
      role="img"
      aria-label={ariaLabel}
    >
      {!countries ? (
        <div
          className="aspect-[880/571] w-full animate-pulse bg-white/5"
          aria-hidden
        />
      ) : (
        <svg
          viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
          className="block h-auto w-full overflow-visible"
          aria-hidden
        >
          {pathGen
            ? countries.map((geo) => {
                const numeric = numericKey(geo.id)
                const iso2 = activeIsoByNumeric.get(numeric) ?? null
                const active = activeNumericIds.has(numeric)
                const hovered = iso2 != null && iso2 === hoveredIso2
                const d = pathGen(geo as GeoPermissibleObjects)
                if (!d) return null

                return (
                  <path
                    key={numeric || geo.properties?.name}
                    d={d}
                    fill={
                      hovered ? FILL_HOVER : active ? FILL_ACTIVE : FILL_DEFAULT
                    }
                    fillOpacity={active || hovered ? 1 : FILL_DEFAULT_OPACITY}
                    stroke={STROKE}
                    strokeWidth={STROKE_WIDTH}
                    strokeMiterlimit={10}
                    className={cn(
                      'outline-none transition-colors duration-200',
                      active && 'cursor-pointer',
                    )}
                    onMouseEnter={() => {
                      if (iso2) onHoverIso2(iso2)
                    }}
                    onMouseLeave={() => onHoverIso2(null)}
                    onFocus={() => {
                      if (iso2) onHoverIso2(iso2)
                    }}
                    onBlur={() => onHoverIso2(null)}
                    tabIndex={active ? 0 : undefined}
                  />
                )
              })
            : null}
        </svg>
      )}
    </div>
  )
}
