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
}

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
}: FeaturedProjectProps) {
  const meta = `${location}${projectsStrings.metaSeparator}${year}`

  return (
    <article className={cn('flex flex-col gap-8 md:gap-10', className)}>
      <div
        {...mediaPlaceholderProps(projectsStrings.featuredMediaAriaLabel)}
        className="h-[280px] w-full bg-surface-placeholder md:h-[460px] lg:h-[566px]"
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-start lg:gap-16">
        <div className="flex flex-col gap-3 md:gap-4">
          <p className="font-display text-xs font-normal uppercase leading-[1.1] tracking-[0.02em] text-subtle-foreground md:text-sm md:leading-6">
            {meta}
          </p>
          <h2 className="max-w-[466px] font-display text-[clamp(1.5rem,3vw,2rem)] font-medium leading-[1.1] text-foreground">
            {title}
          </h2>
        </div>

        <div className="flex max-w-[538px] flex-col gap-4 lg:justify-self-end">
          <p className="font-display text-base leading-[1.3] text-subtle-foreground">
            {description}
          </p>
          <Link
            to={href}
            className="w-fit font-display text-sm font-medium uppercase leading-[1.5] text-brand underline decoration-solid underline-offset-4 transition-colors hover:text-brand-hover"
          >
            {projectsStrings.viewCaseStudy}
          </Link>
        </div>
      </div>
    </article>
  )
}
