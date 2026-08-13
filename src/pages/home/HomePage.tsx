import {
  HomeBrand,
  HomeDeliver,
  HomeHero,
  HomeIntro,
  HomeMission,
  HomePartners,
  HomeProjects,
  HomeStats,
} from '../../components/home'
import { usePageRevealRef } from '../../hooks/usePageReveal'
import { homeStrings } from '../../resources/home_strings'
import { getTopProjects } from '../projects/projects.config'
import { homeDeliverItems, homePartnerLogos } from './home.config'

/**
 * Home page — Figma Home Page 1:16
 * Sections added component-by-component; Header / Subscribe / Footer from Layout.
 */
export function HomePage() {
  const rootRef = usePageRevealRef({ withHero: true })

  const deliverItems = homeDeliverItems.map((item) => ({
    id: item.id,
    image: item.image,
    ...homeStrings.deliver.items[item.id],
  }))

  const topProjects = getTopProjects(5)

  return (
    <div ref={rootRef}>
      <HomeHero />
      <HomeIntro />
      <HomeMission />
      <HomeStats />
      <HomeDeliver items={deliverItems} />
      <HomeBrand />
      <HomeProjects projects={topProjects} />
      <HomePartners logos={homePartnerLogos} />
    </div>
  )
}
