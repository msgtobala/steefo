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
 */
export function ProjectsGrid({ projects, className }: ProjectsGridProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-x-5 gap-y-12 sm:grid-cols-2 md:gap-y-14 lg:grid-cols-3',
        className,
      )}
    >
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          location={project.location}
          year={project.year}
          title={project.title}
          href={project.href}
        />
      ))}
    </div>
  )
}
