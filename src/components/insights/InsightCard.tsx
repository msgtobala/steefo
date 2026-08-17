import type { HTMLAttributes } from 'react'
import { Link } from 'react-router-dom'
import { images, type ImageKey } from '../../resources/images'
import { insightsStrings } from '../../resources/insights_strings'
import { cn } from '../../utils/cn'

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
  /** Overrides default size-based image height (e.g. home staggered strip). */
  imageClassName?: string
  className?: string
} & HTMLAttributes<HTMLElement>

/**
 * Insights article card — Figma 14:3343
 * Whole-card link: image + meta + title + excerpt + underlined Read More.
 */
export function InsightCard({
  category,
  readTime,
  title,
  excerpt,
  image,
  href,
  size,
  imageClassName,
  className,
  ...rest
}: InsightCardProps) {
  const meta = `${category}${insightsStrings.metaSeparator}${readTime}`.toUpperCase()

  return (
    <article
      className={cn('motion-lift group flex min-w-0 flex-col', className)}
      {...rest}
    >
      <Link to={href} className="flex flex-col gap-4">
        <div
          className={cn(
            'motion-media w-full bg-surface-placeholder',
            imageClassName ?? IMAGE_HEIGHT[size],
          )}
        >
          <img
            src={images[image]}
            alt=""
            className="motion-zoom size-full object-cover"
          />
        </div>

        <div className="flex flex-col gap-3">
          <p className="font-display text-xs font-normal uppercase leading-[1.1] tracking-[0.02em] text-subtle-foreground">
            {meta}
          </p>
          <h3 className="font-display text-base font-medium leading-[1.3] text-foreground transition-colors group-hover:text-brand">
            {title}
          </h3>
          <p className="line-clamp-2 font-display text-sm font-normal leading-[1.3] text-subtle-foreground">
            {excerpt}
          </p>
          <span className="motion-underline w-fit font-display text-sm font-medium leading-[1.3] text-foreground">
            {insightsStrings.readMore}
          </span>
        </div>
      </Link>
    </article>
  )
}
