import type { ReactNode } from 'react'
import { Container } from './Container'
import { cn } from '../../utils/cn'

export type PageHeroProps = {
  /** Small uppercase label above the title (e.g. “Careers”). */
  eyebrow: string
  /** Main headline — pass a string or nodes with `<br />` for multi-line titles. */
  title: ReactNode
  /** Supporting line under the title. */
  description?: ReactNode
  className?: string
  titleClassName?: string
  descriptionClassName?: string
  children?: ReactNode
}

/**
 * Centered page hero — Figma pattern used on Careers, About, Insights, Contact, etc.
 * Eyebrow (brand-label) → display title → body description.
 */
export function PageHero({
  eyebrow,
  title,
  description,
  className,
  titleClassName,
  descriptionClassName,
  children,
}: PageHeroProps) {
  return (
    <Container
      className={cn(
        'flex flex-col items-center pt-10 text-center md:pt-16',
        className,
      )}
    >
      <p className="text-eyebrow">{eyebrow}</p>
      <h1
        className={cn(
          'mt-3 max-w-[711px] font-display text-[clamp(2.5rem,6vw,4.5rem)] font-normal leading-none tracking-[-0.0556em] text-balance text-foreground',
          titleClassName,
        )}
      >
        {title}
      </h1>
      {description ? (
        <p
          className={cn(
            'mt-6 max-w-[392px] font-display text-base leading-[1.3] text-body md:mt-8',
            descriptionClassName,
          )}
        >
          {description}
        </p>
      ) : null}
      {children}
    </Container>
  )
}
