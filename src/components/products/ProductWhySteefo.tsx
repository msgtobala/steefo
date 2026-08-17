import { useRef } from 'react'
import { Container, SpotlightCell } from '../common'
import { usePlusPulse } from '../../hooks/usePlusPulse'
import { icons } from '../../resources/icons'
import {
  cn,
  PLUS_GRID_H_LINES,
  PLUS_GRID_V_LINES,
  plusGridHLineStyle,
  plusGridPlusStyle,
  plusGridVLineStyle,
} from '../../utils'

/** Crossed design mark — Figma design_services on Why Choose Us cards */
function FeatureIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <rect
          x="8"
          y="17.5"
          width="24"
          height="5"
          transform="rotate(-45 20 20)"
        />
        <path d="M12.5 14.5l1.2 1.2M15.5 11.5l1.2 1.2M18.5 8.5l1.2 1.2" />
        <rect
          x="8"
          y="17.5"
          width="24"
          height="5"
          transform="rotate(45 20 20)"
        />
      </g>
    </svg>
  )
}

/**
 * Figma Line 28 (21:3465) fades over the first/last ~8% of stroke length.
 * Overhang keeps outer “+” markers outside that near-zero tip zone (~8% of
 * ~1414px ≈ 116px).
 */
const LINE_OVERHANG_PX = 116

export type ProductWhyItemProps = {
  id: string
  title: string
  body: string
}

export type ProductWhySteefoProps = {
  eyebrow: string
  title: string
  items: ProductWhyItemProps[]
  className?: string
}

/**
 * Why Choose Us — Figma grid 1:3395
 * Gradient hairlines from Figma 21:3465 + `icons.plus` at every junction.
 */
export function ProductWhySteefo({
  eyebrow,
  title,
  items,
  className,
}: ProductWhySteefoProps) {
  const sectionRef = useRef<HTMLElement>(null)
  usePlusPulse(sectionRef)

  return (
    <section
      ref={sectionRef}
      className={cn(
        'relative mt-16 w-full bg-black text-white md:mt-24',
        className,
      )}
      data-animate-section
    >
      <Container className="relative overflow-visible py-14 md:py-20 lg:py-24">
        <div className="mx-auto max-w-[560px] text-center">
          <p className="text-eyebrow" data-animate="up">
            {eyebrow}
          </p>
          <h2
            className="mt-2 font-display text-[clamp(1.75rem,4vw,2.5rem)] font-medium leading-[1.1] text-white"
            data-animate="up"
          >
            {title}
          </h2>
        </div>

        <div className="relative mt-12 mb-12 lg:mt-36 lg:mb-16">
          <div className="relative hidden overflow-visible lg:block">
            <div className="relative min-h-[560px] overflow-visible xl:min-h-[628px]">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-10 overflow-visible"
                data-animate="scale"
              >
                {PLUS_GRID_H_LINES.map((top) => (
                  <img
                    key={`h-${top}`}
                    src={icons.gridLine}
                    alt=""
                    className="absolute h-px max-w-none -translate-y-1/2"
                    style={plusGridHLineStyle(top, LINE_OVERHANG_PX)}
                  />
                ))}
                {PLUS_GRID_V_LINES.map((left) => (
                  <img
                    key={`v-${left}`}
                    src={icons.gridLineV}
                    alt=""
                    className="absolute w-px max-w-none -translate-x-1/2"
                    style={plusGridVLineStyle(left, LINE_OVERHANG_PX)}
                  />
                ))}
                {PLUS_GRID_H_LINES.flatMap((top) =>
                  PLUS_GRID_V_LINES.map((left) => (
                    <div
                      key={`plus-${left}-${top}`}
                      className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
                      style={plusGridPlusStyle(left, top)}
                    >
                      <img
                        data-plus-pulse
                        src={icons.plus}
                        alt=""
                        width={13.64}
                        height={13.64}
                        className="block size-[13.64px] max-w-none"
                      />
                    </div>
                  )),
                )}
              </div>

              <div
                className="relative z-[1] grid h-full min-h-[560px] grid-cols-3 grid-rows-2 xl:min-h-[628px]"
                data-animate-stagger
              >
                {items.map((item) => (
                  <SpotlightCell key={item.id}>
                    <article
                      className="flex h-full flex-col justify-center gap-4 px-10 py-10"
                      data-animate="up"
                    >
                      <FeatureIcon className="size-10 shrink-0 text-brand" />
                      <div className="flex max-w-[327px] flex-col gap-4">
                        <h3 className="font-display text-xl font-medium leading-[1.25] text-white">
                          {item.title}
                        </h3>
                        <p className="font-display text-sm font-normal leading-[1.4] text-white/60">
                          {item.body}
                        </p>
                      </div>
                    </article>
                  </SpotlightCell>
                ))}
              </div>
            </div>
          </div>

          <div
            className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:hidden"
            data-animate-stagger
          >
            {items.map((item) => (
              <article
                key={item.id}
                className="flex flex-col gap-4"
                data-animate="up"
              >
                <FeatureIcon className="size-10 text-brand" />
                <div className="flex flex-col gap-3">
                  <h3 className="font-display text-xl font-medium leading-[1.25] text-white">
                    {item.title}
                  </h3>
                  <p className="font-display text-sm font-normal leading-[1.4] text-white/60">
                    {item.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
