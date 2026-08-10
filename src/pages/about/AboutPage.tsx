import {
  AboutAwards,
  AboutCapabilities,
  AboutHero,
  AboutLeadership,
  AboutQuality,
  AboutQuote,
  AboutStory,
} from '../../components/about'
import { aboutStrings } from '../../resources/about_strings'
import {
  aboutAwards,
  aboutCapabilities,
  aboutStats,
  aboutTeam,
  aboutValues,
} from './about.config'

/**
 * About Us page — Figma About Us Page 1:2976
 * Hero → story → quality → capabilities → leadership → awards → quote.
 * SubscribeBanner + Footer come from Layout.
 */
export function AboutPage() {
  const stats = aboutStats.map((stat) => ({
    id: stat.id,
    variant: stat.variant,
    ...aboutStrings.stats[stat.id],
  }))

  const values = aboutValues.map((item) => ({
    id: item.id,
    ...aboutStrings.values[item.id],
  }))

  const capabilities = aboutCapabilities.map((item) => ({
    id: item.id,
    icon: item.icon,
    ...aboutStrings.capabilityItems[item.id],
  }))

  const members = aboutTeam.map((item) => ({
    id: item.id,
    ...aboutStrings.team[item.id],
  }))

  const awards = aboutAwards.map((item) => ({
    id: item.id,
    tone: item.tone,
    ...aboutStrings.awardItems[item.id],
  }))

  return (
    <div>
      <AboutHero
        eyebrow={aboutStrings.hero.eyebrow}
        titleLine1={aboutStrings.hero.titleLine1}
        titleHighlight={aboutStrings.hero.titleHighlight}
        leadBefore={aboutStrings.hero.leadBefore}
        leadHighlight={aboutStrings.hero.leadHighlight}
        body={aboutStrings.hero.body}
        stats={stats}
      />

      <AboutStory
        titleLine1={aboutStrings.story.titleLine1}
        titleLine2={aboutStrings.story.titleLine2}
        values={values}
      />

      <AboutQuality
        eyebrow={aboutStrings.quality.eyebrow}
        titleBefore={aboutStrings.quality.titleBefore}
        titleHighlight={aboutStrings.quality.titleHighlight}
        body={aboutStrings.quality.body}
      />

      <AboutCapabilities
        eyebrow={aboutStrings.capabilities.eyebrow}
        titleBefore={aboutStrings.capabilities.titleBefore}
        titleHighlight={aboutStrings.capabilities.titleHighlight}
        titleAfter={aboutStrings.capabilities.titleAfter}
        items={capabilities}
      />

      <AboutLeadership
        eyebrow={aboutStrings.leadership.eyebrow}
        titleBefore={aboutStrings.leadership.titleBefore}
        titleMid={aboutStrings.leadership.titleMid}
        titleHighlight={aboutStrings.leadership.titleHighlight}
        members={members}
      />

      <AboutAwards
        eyebrow={aboutStrings.awards.eyebrow}
        title={aboutStrings.awards.title}
        body={aboutStrings.awards.body}
        items={awards}
      />

      <AboutQuote
        before={aboutStrings.quote.before}
        highlight={aboutStrings.quote.highlight}
        after={aboutStrings.quote.after}
        role={aboutStrings.quote.role}
        company={aboutStrings.quote.company}
        className="mb-4 md:mb-8"
      />
    </div>
  )
}
