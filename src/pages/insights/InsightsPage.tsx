import { Container, PageHero } from '../../components/common'
import { InsightsGrid } from '../../components/insights'
import { insightsStrings } from '../../resources/insights_strings'
import { insightArticles } from './insights.config'

/**
 * Insights page — Figma 1:3684
 * Hero + article grid (14:3343). SubscribeBanner lives in Layout.
 */
export function InsightsPage() {
  return (
    <>
      <PageHero
        eyebrow={insightsStrings.eyebrow}
        title={insightsStrings.title}
      />

      <Container className="mt-12 md:mt-16">
        <InsightsGrid articles={insightArticles} />
      </Container>
    </>
  )
}
