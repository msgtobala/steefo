import { Container } from '../common'
import { icons } from '../../resources/icons'

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ')
}

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

/** How far grid hairlines extend past the card grid edges. */
const LINE_OVERHANG_PX = 48

const V_LINES = ['0%', '33.333%', '66.666%', '100%'] as const
const H_LINES = ['0%', '50%', '100%'] as const

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
 * Continuous hairlines (with overhang) + `icons.plus` at every junction.
 */
export function ProductWhySteefo({
  eyebrow,
  title,
  items,
  className,
}: ProductWhySteefoProps) {
  return (
    <section
      className={cn(
        'relative mt-16 w-full bg-black text-white md:mt-24',
        className,
      )}
    >
      <Container className="relative overflow-visible py-14 md:py-20 lg:py-24">
        <div className="mx-auto max-w-[560px] text-center">
          <p className="text-eyebrow">{eyebrow}</p>
          <h2 className="mt-2 font-display text-[clamp(1.75rem,4vw,2.5rem)] font-medium leading-[1.1] text-white">
            {title}
          </h2>
        </div>

        <div className="relative mt-12 lg:mt-16">
          <div className="relative hidden overflow-visible lg:block">
            <div
              className="relative min-h-[560px] overflow-visible xl:min-h-[628px]"
              style={{
                marginInline: LINE_OVERHANG_PX,
                marginBlock: LINE_OVERHANG_PX,
              }}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 overflow-visible"
              >
                {H_LINES.map((top) => (
                  <span
                    key={`h-${top}`}
                    className="absolute h-px -translate-y-1/2 bg-white/20"
                    style={{
                      top,
                      left: -LINE_OVERHANG_PX,
                      width: `calc(100% + ${LINE_OVERHANG_PX * 2}px)`,
                    }}
                  />
                ))}
                {V_LINES.map((left) => (
                  <span
                    key={`v-${left}`}
                    className="absolute w-px -translate-x-1/2 bg-white/20"
                    style={{
                      left,
                      top: -LINE_OVERHANG_PX,
                      height: `calc(100% + ${LINE_OVERHANG_PX * 2}px)`,
                    }}
                  />
                ))}
                {H_LINES.flatMap((top) =>
                  V_LINES.map((left) => (
                    <img
                      key={`plus-${left}-${top}`}
                      src={icons.plus}
                      alt=""
                      width={13.64}
                      height={13.64}
                      className="absolute z-10 size-[13.64px] -translate-x-1/2 -translate-y-1/2"
                      style={{ left, top }}
                    />
                  )),
                )}
              </div>

              <div className="relative z-[1] grid h-full min-h-[560px] grid-cols-3 grid-rows-2 xl:min-h-[628px]">
                {items.map((item) => (
                  <article
                    key={item.id}
                    className="flex flex-col justify-center gap-4 px-10 py-10"
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
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:hidden">
            {items.map((item) => (
              <article key={item.id} className="flex flex-col gap-4">
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
