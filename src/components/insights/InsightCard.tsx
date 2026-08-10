import { Link } from 'react-router-dom'
import { images, type ImageKey } from '../../resources/images'
import { insightsStrings } from '../../resources/insights_strings'

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ')
}

export type InsightCardSize = 'third' | 'twoThirds'

const IMAGE_HEIGHT: Record<InsightCardSize, string> = {
  third: 'h-[220px] md:h-[341px]',
  twoThirds: 'h-[240px] md:h-[460px] lg:h-[520px]',
}

export type InsightCardProps = {
  category: string
  readTime: string
  title: string
  excerpt: string
  image: ImageKey
  href: string
  size: InsightCardSize
  className?: string
}

/**
 * Insights article card — Figma 14:3343
 * Image + meta + title + excerpt + underlined Read More.
 */
export function InsightCard({
  category,
  readTime,
  title,
  excerpt,
  image,
  href,
  size,
  className,
}: InsightCardProps) {
  const meta = `${category}${insightsStrings.metaSeparator}${readTime}`.toUpperCase()

  return (
    <article className={cn('flex min-w-0 flex-col gap-4', className)}>
      <div
        className={cn(
          'w-full overflow-hidden bg-surface-placeholder',
          IMAGE_HEIGHT[size],
        )}
      >
        <img
          src={images[image]}
          alt=""
          className="size-full object-cover"
        />
      </div>

      <div className="flex flex-col gap-3">
        <p className="font-display text-xs font-normal uppercase leading-[1.1] tracking-[0.02em] text-subtle-foreground">
          {meta}
        </p>
        <h3 className="font-display text-base font-medium leading-[1.3] text-foreground">
          {title}
        </h3>
        <p className="line-clamp-2 font-display text-sm font-normal leading-[1.3] text-subtle-foreground">
          {excerpt}
        </p>
        <Link
          to={href}
          className="w-fit font-display text-sm font-medium leading-[1.3] text-foreground underline decoration-solid underline-offset-4 transition-colors hover:text-brand"
        >
          {insightsStrings.readMore}
        </Link>
      </div>
    </article>
  )
}
