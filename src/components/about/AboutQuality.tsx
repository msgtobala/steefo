import { Container } from '../common'
import { aboutStrings } from '../../resources/about_strings'
import { cn, mediaPlaceholderProps } from '../../utils'

export type AboutQualityProps = {
  eyebrow: string
  titleBefore: string
  titleHighlight: string
  body: string
  className?: string
}

/**
 * Quality / Who We Serve — Figma About media block
 */
export function AboutQuality({
  eyebrow,
  titleBefore,
  titleHighlight,
  body,
  className,
}: AboutQualityProps) {
  return (
    <section
      className={cn('mt-16 md:mt-24', className)}
      data-animate-section
    >
      <Container className="flex flex-col items-center text-center">
        <p className="text-eyebrow" data-animate="up">
          {eyebrow}
        </p>
        <h2
          className="mt-2 max-w-[655px] font-display text-[clamp(2rem,5vw,4.5rem)] font-normal leading-[1.1] tracking-[-0.0556em] text-foreground"
          data-animate="up"
        >
          {titleBefore}
          <br />
          <span className="text-brand">{titleHighlight}</span>
        </h2>
        <p
          className="mt-5 max-w-[573px] font-display text-base leading-[1.2] text-body md:mt-6"
          data-animate="up"
        >
          {body}
        </p>
        <div
          {...mediaPlaceholderProps(aboutStrings.qualityMediaAriaLabel)}
          className="mt-10 h-[280px] w-full bg-surface-placeholder md:mt-12 md:h-[480px] lg:h-[600px]"
          data-animate="scale"
        />
      </Container>
    </section>
  )
}
