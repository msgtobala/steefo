import {
  HomeBrand,
  HomeDeliver,
  HomeHero,
  HomeInsights,
  HomeIntro,
  HomeMission,
  // HomePartners,
  HomePresence,
  HomeProducts,
  HomeStats,
  HomeTestimonials,
} from '../../components/home'
import { usePageRevealRef } from '../../hooks/usePageReveal'
import { insightArticles } from '../insights/insights.config'
import { getTopProducts } from '../products/products.config'
import {
  homeDeliverItems,
  // homePartnerLogos,
  homePresenceMarkets,
  homeTestimonials,
} from './home.config'

/**
 * Home page — Figma Home Page 1:16
 * Sections added component-by-component; Header / Subscribe / Footer from Layout.
 */
export function HomePage() {
  const rootRef = usePageRevealRef({ withHero: false })

  const topProducts = getTopProducts(5)
  const homeInsightArticles = insightArticles.slice(0, 4)

  return (
    <div ref={rootRef}>
      <HomeHero />
      <HomeIntro />
      <HomeMission />
      <HomeStats />
      <HomeDeliver items={homeDeliverItems} />
      <HomeBrand />
      <HomeProducts products={topProducts} />
      {/* <HomePartners logos={homePartnerLogos} /> */}
      <HomePresence markets={homePresenceMarkets} />
      <HomeInsights articles={homeInsightArticles} />
      <HomeTestimonials items={homeTestimonials} />
    </div>
  )
}
