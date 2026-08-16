import { Container } from '../common'
import { AboutStatCard } from './AboutStatCard'
import { aboutStrings } from '../../resources/about_strings'
import { images } from '../../resources/images'
import { cn } from '../../utils'

export type AboutHeroStat = {
  id: string
  label: string
  value: string
  variant: 'light' | 'brand'
}

export type AboutHeroProps = {
  eyebrow: string
  titleLine1: string
  titleHighlight: string
  leadBefore: string
  leadHighlight: string
  body: string
  stats: AboutHeroStat[]
  className?: string
}

/**
 * About hero — Figma About Us 1:2976 top block
 */
export function AboutHero({
  eyebrow,
  titleLine1,
  titleHighlight,
  leadBefore,
  leadHighlight,
  body,
  stats,
  className,
}: AboutHeroProps) {
  return (
    <section className={cn('relative', className)}>
      <Container className="flex flex-col items-center pt-10 text-center md:pt-16">
        <p className="text-eyebrow" data-animate-hero>
          {eyebrow}
        </p>
        <h1
          className="mt-3 max-w-[1030px] font-display text-[clamp(2.5rem,6vw,4.5rem)] font-normal leading-none tracking-[-0.0556em] text-balance text-foreground"
          data-animate-hero
        >
          {titleLine1}
          <br />
          <span className="text-brand">{titleHighlight}</span>
        </h1>
      </Container>

      <Container className="mt-[112px] grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
        <h2
          className="max-w-[538px] font-display text-[clamp(1.75rem,4vw,2.5rem)] font-medium leading-[1.1] text-foreground"
          data-animate-hero
        >
          {leadBefore}
          <br />
          <span className="text-brand">{leadHighlight}</span>
        </h2>
        <p
          className="max-w-[650px] font-display text-base leading-[1.3] text-body lg:justify-self-end"
          data-animate-hero
        >
          {body}
        </p>
      </Container>

      <div className="relative mt-10 md:mt-12">
        <img
          src={images.aboutBanner}
          alt={aboutStrings.heroMediaAriaLabel}
          className="h-[320px] w-full object-cover object-center md:h-[520px] lg:h-[688px]"
          data-animate-hero
        />
        {/* Figma 1:3061/1:3064 — equal 315×160 cards, 22px gap, ~47px above media bottom */}
        <Container className="pointer-events-none absolute inset-x-0 bottom-8 md:bottom-12">
          <div className="pointer-events-auto flex flex-col items-stretch gap-[22px] sm:flex-row sm:items-end sm:justify-end">
            {stats.map((stat) => (
              <AboutStatCard
                key={stat.id}
                label={stat.label}
                value={stat.value}
                variant={stat.variant}
                className="w-full sm:w-[315px]"
                data-animate-hero
              />
            ))}
          </div>
        </Container>
      </div>
    </section>
  )
}
