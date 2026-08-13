import { Container, PageHero } from '../../components/common'
import { InsightsGrid } from '../../components/insights'
import { usePageRevealRef } from '../../hooks/usePageReveal'
import { insightsStrings } from '../../resources/insights_strings'
import { insightArticles } from './insights.config'

/**
 * Insights page — Figma 1:3684
 * Hero + article grid (14:3343). SubscribeBanner lives in Layout.
 */
export function InsightsPage() {
  const rootRef = usePageRevealRef({ withHero: true })

  return (
    <div ref={rootRef}>
      <PageHero
        eyebrow={insightsStrings.eyebrow}
        title={insightsStrings.title}
      />

      <Container className="mt-12 md:mt-16">
        <InsightsGrid articles={insightArticles} />
      </Container>
    </div>
  )
}
