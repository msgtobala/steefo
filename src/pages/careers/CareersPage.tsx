import { Container, PageHero } from '../../components/common'
import { OpeningCard } from '../../components/careers'
import { usePageRevealRef } from '../../hooks/usePageReveal'
import { careersStrings } from '../../resources/careers_strings'
import { mediaPlaceholderProps } from '../../utils'
import { careerOpenings } from './openings.config'

/**
 * Careers page — Figma 1:4045
 * Hero + placeholder banner + openings list (cards from config).
 */
export function CareersPage() {
  const rootRef = usePageRevealRef({ withHero: true })

  return (
    <div ref={rootRef}>
      <PageHero
        eyebrow={careersStrings.eyebrow}
        title={
          <>
            {careersStrings.heroTitleLine1}
            <br />
            {careersStrings.heroTitleLine2}
          </>
        }
        description={careersStrings.heroBody}
      >
        {/* Banner placeholder — Figma #d9d9d9 1320×460 */}
        <div
          {...mediaPlaceholderProps(careersStrings.bannerAriaLabel)}
          className="mt-8 h-[280px] w-full bg-surface-placeholder md:mt-10 md:h-[460px]"
        />
      </PageHero>

      {/* Openings */}
      <Container className="mt-14 md:mt-20" data-animate-section>
        <div className="mb-6 md:mb-8" data-animate="up">
          <p className="text-eyebrow">{careersStrings.openingsEyebrow}</p>
          <h2 className="mt-1 max-w-[487px] font-display text-[clamp(1.75rem,4vw,2.5rem)] font-medium leading-[1.1] text-foreground">
            {careersStrings.openingsTitleBefore}
            <span className="text-brand">
              {careersStrings.openingsTitleHighlight}
            </span>
          </h2>
        </div>

        <div className="border-t border-border" data-animate-stagger>
          {careerOpenings.map((opening) => (
            <OpeningCard
              key={opening.id}
              title={opening.title}
              location={opening.location}
              employmentType={opening.employmentType}
              applyTo={opening.applyTo}
              data-animate="up"
            />
          ))}
        </div>
      </Container>
    </div>
  )
}
