import type { HTMLAttributes } from 'react'
import { Link } from 'react-router-dom'
import { projectsStrings } from '../../resources/projects_strings'
import { cn, mediaPlaceholderProps } from '../../utils'

export type FeaturedProjectProps = {
  location: string
  year: string
  title: string
  description: string
  href: string
  className?: string
} & HTMLAttributes<HTMLElement>

/**
 * Featured project block — Figma Project Page 1:3515
 * Large image placeholder + meta/title left, description + case study right.
 */
export function FeaturedProject({
  location,
  year,
  title,
  description,
  href,
  className,
  ...rest
}: FeaturedProjectProps) {
  const meta = `${location}${projectsStrings.metaSeparator}${year}`

  return (
    <article
      className={cn('motion-lift group flex flex-col gap-8 md:gap-10', className)}
      data-animate-section
      {...rest}
    >
      <div
        className="motion-media relative h-[280px] w-full md:h-[460px] lg:h-[566px]"
        data-animate="scale"
      >
        <div
          {...mediaPlaceholderProps(projectsStrings.featuredMediaAriaLabel)}
          className="motion-zoom size-full bg-surface-placeholder"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-overlay-mid opacity-0 transition-opacity duration-500 group-hover:opacity-100 motion-reduce:transition-none"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-start lg:gap-16">
        <div
          className="flex flex-col gap-3 md:gap-4"
          data-animate="left"
        >
          <p className="font-display text-xs font-normal uppercase leading-[1.1] tracking-[0.02em] text-subtle-foreground md:text-sm md:leading-6">
            {meta}
          </p>
          <h2 className="max-w-[466px] font-display text-[clamp(1.5rem,3vw,2rem)] font-medium leading-[1.1] text-foreground">
            {title}
          </h2>
        </div>

        <div
          className="flex max-w-[538px] flex-col gap-4 lg:justify-self-end"
          data-animate="right"
        >
          <p className="font-display text-base leading-[1.3] text-subtle-foreground">
            {description}
          </p>
          <Link
            to={href}
            className="motion-underline w-fit font-display text-sm font-medium uppercase leading-[1.5] text-brand"
          >
            {projectsStrings.viewCaseStudy}
          </Link>
        </div>
      </div>
    </article>
  )
}
