import type { InsightArticle } from '../../pages/insights/insights.config'
import { InsightCard } from './InsightCard'
import { cn } from '../../utils/cn'

export type InsightsGridProps = {
  articles: InsightArticle[]
  className?: string
}

/**
 * Masonry-style insights grid — Figma 14:3343
 * Desktop: 1/3+2/3 · 3×1/3 · 2/3+1/3. Tablet: 2-col. Mobile: stack.
 */
export function InsightsGrid({ articles, className }: InsightsGridProps) {
  const [a, b, c, d, e, f, g] = articles

  // Figma 14:3343 — column gutter ≈20px; row gap after card text ≈56px
  const rowClass =
    'grid grid-cols-1 gap-x-5 gap-y-12 md:grid-cols-2 md:gap-y-14 lg:grid-cols-3'

  return (
    <div className={cn('flex flex-col gap-12 md:gap-14', className)}>
      {/* Row 1 — third + twoThirds */}
      <div className={rowClass}>
        {a ? (
          <InsightCard
            {...a}
            className="lg:col-span-1"
          />
        ) : null}
        {b ? (
          <InsightCard
            {...b}
            className="md:col-span-1 lg:col-span-2"
          />
        ) : null}
      </div>

      {/* Row 2 — three thirds */}
      <div className={rowClass}>
        {c ? <InsightCard {...c} /> : null}
        {d ? <InsightCard {...d} /> : null}
        {e ? <InsightCard {...e} className="md:col-span-2 lg:col-span-1" /> : null}
      </div>

      {/* Row 3 — twoThirds + third */}
      <div className={rowClass}>
        {f ? (
          <InsightCard
            {...f}
            className="md:col-span-1 lg:col-span-2"
          />
        ) : null}
        {g ? (
          <InsightCard
            {...g}
            className="lg:col-span-1"
          />
        ) : null}
      </div>
    </div>
  )
}
