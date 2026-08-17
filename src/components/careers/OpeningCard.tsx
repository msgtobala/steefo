import type { HTMLAttributes } from 'react'
import { Button } from '../ui'
import { careersStrings } from '../../resources/careers_strings'
import { cn } from '../../utils/cn'

export type OpeningCardProps = {
  title: string
  location: string
  employmentType: string
  applyTo: string
  className?: string
} & HTMLAttributes<HTMLElement>

/**
 * Careers opening row — Figma 13:3336
 * Title + meta on the left, Apply Now CTA on the right, hairline top/bottom rules.
 */
export function OpeningCard({
  title,
  location,
  employmentType,
  applyTo,
  className,
  ...rest
}: OpeningCardProps) {
  const meta = `${location}${careersStrings.metaSeparator}${employmentType}`

  return (
    <article
      className={cn(
        'group relative flex flex-col gap-6 border-b border-border py-8 transition-colors hover:bg-surface-subtle',
        'md:flex-row md:items-center md:justify-between md:gap-10 md:px-4 md:py-10',
        'before:absolute before:inset-y-0 before:left-0 before:w-0.5 before:origin-center before:scale-y-0 before:bg-brand',
        'before:transition-transform before:duration-300 before:ease-out hover:before:scale-y-100 motion-reduce:before:transition-none',
        className,
      )}
      {...rest}
    >
      <div className="flex min-w-0 flex-col gap-4 md:max-w-[607px] md:gap-5">
        <h3 className="font-display text-[clamp(1.5rem,3vw,2rem)] font-normal leading-[1.1] text-foreground transition-colors group-hover:text-brand">
          {title}
        </h3>
        <p className="font-display text-base leading-[1.3] text-body">{meta}</p>
      </div>

      <Button
        variant="primary"
        size="sm"
        to={applyTo}
        withArrow
        cutCorners="top-right"
        className="w-fit shrink-0 self-start md:self-center"
      >
        {careersStrings.applyNow}
      </Button>
    </article>
  )
}
