import {
  HomeBrand,
  HomeDeliver,
  HomeHero,
  HomeInsights,
  HomeIntro,
  HomeMission,
  HomePartners,
  HomePresence,
  HomeProjects,
  HomeStats,
  HomeTestimonials,
} from '../../components/home'
import { usePageRevealRef } from '../../hooks/usePageReveal'
import { homeStrings } from '../../resources/home_strings'
import { insightArticles } from '../insights/insights.config'
import { getTopProjects } from '../projects/projects.config'
import {
  homeDeliverItems,
  homePartnerLogos,
  homePresenceMarkets,
  homeTestimonials,
} from './home.config'

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
  const homeInsightArticles = insightArticles.slice(0, 4)

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
      <HomePresence markets={homePresenceMarkets} />
      <HomeInsights articles={homeInsightArticles} />
      <HomeTestimonials items={homeTestimonials} />
    </div>
  )
}
