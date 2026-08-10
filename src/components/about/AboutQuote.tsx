import { Container } from '../common'
import { cn } from '../../utils/cn'

export type AboutQuoteProps = {
  before: string
  highlight: string
  after: string
  role: string
  company: string
  className?: string
}

/**
 * Closing quote — Figma About 1:3196–1:3197
 */
export function AboutQuote({
  before,
  highlight,
  after,
  role,
  company,
  className,
}: AboutQuoteProps) {
  return (
    <section className={cn('mt-16 md:mt-24', className)}>
      <Container className="flex flex-col items-center text-center">
        <blockquote className="max-w-[1139px] font-display text-[clamp(1.5rem,3.5vw,2.5rem)] font-normal leading-[1.1] tracking-[-0.025em] text-body">
          <span className="text-brand">&ldquo;</span>
          {before}
          <span className="text-brand">{highlight}</span>
          {after}
          <span className="text-brand">&rdquo;</span>
        </blockquote>
        <footer className="mt-8 font-display text-xl leading-[1.2] text-body md:mt-10">
          <p className="font-normal">{role}</p>
          <p className="font-medium">{company}</p>
        </footer>
      </Container>
    </section>
  )
}
