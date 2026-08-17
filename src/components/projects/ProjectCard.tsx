import type { HTMLAttributes } from 'react'
import { Link } from 'react-router-dom'
import { projectsStrings } from '../../resources/projects_strings'
import { cn, mediaPlaceholderProps } from '../../utils'

export type ProjectCardProps = {
  location: string
  year: string
  title: string
  href: string
  className?: string
} & HTMLAttributes<HTMLElement>

/**
 * Project grid card — Figma 1:3599
 * Placeholder media + LOCATION · YEAR + title.
 */
export function ProjectCard({
  location,
  year,
  title,
  href,
  className,
  ...rest
}: ProjectCardProps) {
  const meta =
    `${location}${projectsStrings.metaSeparator}${year}`.toUpperCase()

  return (
    <article
      className={cn('motion-lift flex min-w-0 flex-col gap-5', className)}
      {...rest}
    >
      <Link to={href} className="group flex flex-col gap-5">
        <div className="motion-media relative h-[220px] w-full md:h-[340px]">
          <div
            {...mediaPlaceholderProps(projectsStrings.cardMediaAriaLabel)}
            className="motion-zoom size-full bg-surface-placeholder"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-overlay-mid opacity-0 transition-opacity duration-500 group-hover:opacity-100 motion-reduce:transition-none"
          />
        </div>
        <div className="flex flex-col gap-3">
          <p className="font-display text-xs font-normal uppercase leading-[1.25] tracking-[0.02em] text-subtle-foreground">
            {meta}
          </p>
          <h3 className="font-display text-xl font-medium leading-[1.3] text-foreground transition-colors group-hover:text-brand md:text-[26px] md:leading-[26px]">
            {title}
          </h3>
        </div>
      </Link>
    </article>
  )
}
