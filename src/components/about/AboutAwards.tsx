import { Container } from '../common'
import { AwardCard } from './AwardCard'
import { cn } from '../../utils/cn'

export type AboutAwardItem = {
  id: string
  pill: string
  title: string
  body: string
  tone: 'dark' | 'brand'
}

export type AboutAwardsProps = {
  eyebrow: string
  title: string
  body: string
  items: AboutAwardItem[]
  className?: string
}

/**
 * Awards & Recognitions — Figma About certifications band
 */
export function AboutAwards({
  eyebrow,
  title,
  body,
  items,
  className,
}: AboutAwardsProps) {
  return (
    <section className={cn('mt-16 md:mt-24', className)}>
      <Container className="flex flex-col items-center text-center">
        <p className="text-eyebrow">{eyebrow}</p>
        <h2 className="mt-2 max-w-[719px] font-display text-[clamp(2rem,5vw,4.5rem)] font-normal leading-[1.1] tracking-[-0.0556em] text-foreground">
          {title}
        </h2>
        <p className="mt-5 max-w-[568px] font-display text-base leading-[1.2] text-body md:mt-6">
          {body}
        </p>
      </Container>

      <Container className="mt-10 grid grid-cols-1 gap-5 md:mt-12 md:grid-cols-3">
        {items.map((item) => (
          <AwardCard
            key={item.id}
            pill={item.pill}
            title={item.title}
            body={item.body}
            tone={item.tone}
          />
        ))}
      </Container>
    </section>
  )
}
