import { useEffect, useMemo, useState, type MouseEvent } from 'react'
import {
  geoMercator,
  geoPath,
  type GeoPermissibleObjects,
} from 'd3-geo'
import { feature } from 'topojson-client'
import type { Feature, FeatureCollection, Geometry } from 'geojson'
import type { GeometryCollection, Topology } from 'topojson-specification'
import { cn } from '../../utils'

type CountryProperties = {
  name?: string
  claim?: string
}

type CountryFeature = Feature<Geometry, CountryProperties> & {
  id?: string | number
}

type CountriesTopology = Topology<{
  countries: GeometryCollection<CountryProperties>
}>

export type PresenceMapProps = {
  /** ISO 3166-1 numeric ids (as in world-atlas), e.g. "356" for India */
  activeNumericIds: ReadonlySet<string>
  activeIsoByNumeric: ReadonlyMap<string, string>
  /** Display names for presence markets (ISO 3166-1 alpha-2) */
  labelByIso2?: ReadonlyMap<string, string>
  hoveredIso2: string | null
  onHoverIso2: (iso2: string | null) => void
  className?: string
  ariaLabel: string
}

/** Figma Layer_1 map frame — 880×571 */
const MAP_WIDTH = 880
const MAP_HEIGHT = 571
const GEO_URL = '/geo/countries-50m.json'
/** PoK / CoK (+ related) overlays claimed as India on this site */
const INDIA_CLAIMED_URL = '/geo/india-claimed-areas.json'
/** Antarctica — omit so the fit matches the Figma crop */
const ANTARCTICA_ID = '10'
const INDIA_NUMERIC = '356'
const INDIA_ISO2 = 'IN'
/** Features in world-atlas without a numeric id that belong with India */
const INDIA_BY_NAME = new Set(['Siachen Glacier'])

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

function isIndiaBaseFeature(geo: CountryFeature) {
  if (numericKey(geo.id) === INDIA_NUMERIC) return true
  const name = geo.properties?.name
  return name != null && INDIA_BY_NAME.has(name)
}

function resolveIso2(
  geo: CountryFeature,
  activeIsoByNumeric: ReadonlyMap<string, string>,
): string | null {
  const numeric = numericKey(geo.id)
  if (numeric && activeIsoByNumeric.has(numeric)) {
    return activeIsoByNumeric.get(numeric) ?? null
  }
  if (geo.properties?.claim === INDIA_ISO2) return INDIA_ISO2
  if (isIndiaBaseFeature(geo)) return INDIA_ISO2
  return null
}

function countryLabel(
  geo: CountryFeature,
  iso2: string | null,
  labelByIso2: ReadonlyMap<string, string> | undefined,
): string | null {
  if (iso2 && labelByIso2?.get(iso2)) return labelByIso2.get(iso2) ?? null
  if (geo.properties?.claim === INDIA_ISO2) {
    return labelByIso2?.get(INDIA_ISO2) ?? 'India'
  }
  if (isIndiaBaseFeature(geo)) {
    return labelByIso2?.get(INDIA_ISO2) ?? 'India'
  }
  return geo.properties?.name ?? null
}

/**
 * Data-driven world map — flat Mercator (Figma 1:58), ISO-driven fills.
 * India includes PoK / CoK fills without internal claim borders.
 */
export function PresenceMap({
  activeNumericIds: _activeNumericIds,
  activeIsoByNumeric,
  labelByIso2,
  hoveredIso2,
  onHoverIso2,
  className,
  ariaLabel,
}: PresenceMapProps) {
  const [countries, setCountries] = useState<CountryFeature[] | null>(null)
  const [indiaClaims, setIndiaClaims] = useState<CountryFeature[]>([])
  const [tooltip, setTooltip] = useState<{
    name: string
    x: number
    y: number
  } | null>(null)

  const indiaActive = useMemo(() => {
    for (const iso of activeIsoByNumeric.values()) {
      if (iso === INDIA_ISO2) return true
    }
    return false
  }, [activeIsoByNumeric])

  const activeIsos = useMemo(
    () => new Set(activeIsoByNumeric.values()),
    [activeIsoByNumeric],
  )

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const [countriesRes, claimsRes] = await Promise.all([
          fetch(GEO_URL),
          fetch(INDIA_CLAIMED_URL),
        ])
        if (!countriesRes.ok) return

        const topo = (await countriesRes.json()) as CountriesTopology
        const fc = feature(topo, topo.objects.countries) as unknown as FeatureCollection<
          Geometry,
          CountryProperties
        >
        const claimFc = claimsRes.ok
          ? ((await claimsRes.json()) as FeatureCollection<
              Geometry,
              CountryProperties
            >)
          : { type: 'FeatureCollection' as const, features: [] }

        if (!cancelled) {
          setCountries(
            (fc.features as CountryFeature[]).filter(
              (geo) => numericKey(geo.id) !== ANTARCTICA_ID,
            ),
          )
          setIndiaClaims(claimFc.features as CountryFeature[])
        }
      } catch {
        if (!cancelled) {
          setCountries([])
          setIndiaClaims([])
        }
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

  function setTooltipFromEvent(
    event: MouseEvent<SVGPathElement>,
    name: string,
  ) {
    const root = event.currentTarget.ownerSVGElement?.parentElement
    if (!root) return
    const rect = root.getBoundingClientRect()
    setTooltip({
      name,
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    })
  }

  function clearHover(event: MouseEvent<SVGPathElement>) {
    const next = event.relatedTarget
    if (
      next instanceof SVGPathElement &&
      next.dataset.mapActive === 'true'
    ) {
      return
    }
    onHoverIso2(null)
    setTooltip(null)
  }

  function renderPath(
    geo: CountryFeature,
    key: string,
    { fillOnly = false }: { fillOnly?: boolean } = {},
  ) {
    if (!pathGen) return null
    const iso2 = resolveIso2(geo, activeIsoByNumeric)
    const active = iso2 != null && activeIsos.has(iso2)
    const hovered = active && iso2 === hoveredIso2
    const label = active ? countryLabel(geo, iso2, labelByIso2) : null
    const d = pathGen(geo as GeoPermissibleObjects)
    if (!d) return null

    return (
      <path
        key={key}
        d={d}
        data-map-active={active ? 'true' : undefined}
        fill={hovered ? FILL_HOVER : active ? FILL_ACTIVE : FILL_DEFAULT}
        fillOpacity={active || hovered ? 1 : FILL_DEFAULT_OPACITY}
        stroke={fillOnly ? 'none' : STROKE}
        strokeWidth={fillOnly ? 0 : STROKE_WIDTH}
        strokeMiterlimit={10}
        className={cn(
          'outline-none transition-colors duration-200',
          active ? 'cursor-pointer' : 'pointer-events-none',
        )}
        aria-label={label ?? undefined}
        onMouseEnter={
          active && label
            ? (event) => {
                if (iso2) onHoverIso2(iso2)
                setTooltipFromEvent(event, label)
              }
            : undefined
        }
        onMouseMove={
          active && label
            ? (event) => setTooltipFromEvent(event, label)
            : undefined
        }
        onMouseLeave={active ? clearHover : undefined}
        onFocus={
          active
            ? () => {
                if (iso2) onHoverIso2(iso2)
              }
            : undefined
        }
        onBlur={
          active
            ? () => {
                onHoverIso2(null)
                setTooltip(null)
              }
            : undefined
        }
        tabIndex={active ? 0 : undefined}
      />
    )
  }

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
          className="block h-auto w-full overflow-hidden"
          aria-hidden
        >
          {pathGen
            ? countries.map((geo, index) => {
                // Siachen is also in the claim layer — skip its separate stroke.
                const fillOnly =
                  indiaActive &&
                  geo.properties?.name != null &&
                  INDIA_BY_NAME.has(geo.properties.name)
                return renderPath(
                  geo,
                  numericKey(geo.id) ||
                    geo.properties?.name ||
                    `country-${index}`,
                  { fillOnly },
                )
              })
            : null}

          {/* PoK / CoK fills on top — no strokes, so no internal gray lines */}
          {pathGen && indiaActive
            ? indiaClaims.map((geo, index) =>
                renderPath(
                  geo,
                  `in-claim-${geo.properties?.name ?? index}`,
                  { fillOnly: true },
                ),
              )
            : null}
        </svg>
      )}

      {tooltip ? (
        <div
          role="tooltip"
          className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[calc(100%+10px)] whitespace-nowrap rounded-sm bg-white px-2.5 py-1 font-display text-xs font-medium leading-none text-foreground shadow-[0_4px_16px_rgba(0,0,0,0.35)]"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          {tooltip.name}
        </div>
      ) : null}
    </div>
  )
}
