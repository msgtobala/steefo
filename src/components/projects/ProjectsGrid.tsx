import { ProjectCard } from './ProjectCard'
import { cn } from '../../utils/cn'

export type ProjectsGridItem = {
  id: string
  location: string
  year: string
  title: string
  href: string
}

export type ProjectsGridProps = {
  projects: ProjectsGridItem[]
  className?: string
}

/**
 * Projects grid — Figma 1:3515
 * Desktop 3 cols (~20px gap); tablet 2; mobile stack.
 * Cards reveal in staggered waves as each row enters view.
 */
export function ProjectsGrid({ projects, className }: ProjectsGridProps) {
  const rows: ProjectsGridItem[][] = []
  for (let i = 0; i < projects.length; i += 3) {
    rows.push(projects.slice(i, i + 3))
  }

  return (
    <div
      className={cn('flex flex-col gap-y-12 md:gap-y-14', className)}
    >
      {rows.map((row, rowIndex) => (
        <div
          key={row.map((p) => p.id).join('-') || `row-${rowIndex}`}
          className="grid grid-cols-1 gap-x-5 gap-y-12 sm:grid-cols-2 md:gap-y-14 lg:grid-cols-3"
          data-animate-section
          data-animate-stagger
        >
          {row.map((project) => (
            <ProjectCard
              key={project.id}
              location={project.location}
              year={project.year}
              title={project.title}
              href={project.href}
              data-animate="up"
            />
          ))}
        </div>
      ))}
    </div>
  )
}
