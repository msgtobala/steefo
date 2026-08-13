import { Container, PageHero } from '../../components/common'
import {
  FeaturedProject,
  ProjectsGrid,
} from '../../components/projects'
import { usePageRevealRef } from '../../hooks/usePageReveal'
import { projectsStrings } from '../../resources/projects_strings'
import { projectsConfig } from './projects.config'

/**
 * Projects page — Figma 1:3515
 * Hero + featured project + 3×2 grid. SubscribeBanner lives in Layout.
 */
export function ProjectsPage() {
  const rootRef = usePageRevealRef({ withHero: true })
  const { featured, projects } = projectsConfig

  return (
    <div ref={rootRef}>
      <PageHero
        eyebrow={projectsStrings.eyebrow}
        title={
          <>
            {projectsStrings.heroTitleLine1}
            <br />
            {projectsStrings.heroTitleLine2}
          </>
        }
      />

      <Container className="mt-10 md:mt-14">
        <FeaturedProject
          location={featured.location}
          year={featured.year}
          title={featured.title}
          description={featured.description}
          href={featured.href}
        />
      </Container>

      <Container className="mt-14 md:mt-20">
        <ProjectsGrid projects={projects} />
      </Container>
    </div>
  )
}
