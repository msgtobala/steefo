import { Link } from 'react-router-dom'
import { projectsStrings } from '../../resources/projects_strings'
import { cn, mediaPlaceholderProps } from '../../utils'

export type ProjectCardProps = {
  location: string
  year: string
  title: string
  href: string
  className?: string
}

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
}: ProjectCardProps) {
  const meta =
    `${location}${projectsStrings.metaSeparator}${year}`.toUpperCase()

  return (
    <article className={cn('flex min-w-0 flex-col gap-5', className)}>
      <Link to={href} className="group flex flex-col gap-5">
        <div
          {...mediaPlaceholderProps(projectsStrings.cardMediaAriaLabel)}
          className="h-[220px] w-full bg-surface-placeholder transition-opacity group-hover:opacity-90 md:h-[340px]"
        />
        <div className="flex flex-col gap-3">
          <p className="font-display text-xs font-normal uppercase leading-[1.25] tracking-[0.02em] text-subtle-foreground">
            {meta}
          </p>
          <h3 className="font-display text-xl font-medium leading-[1.3] text-foreground md:text-[26px] md:leading-[26px]">
            {title}
          </h3>
        </div>
      </Link>
    </article>
  )
}
