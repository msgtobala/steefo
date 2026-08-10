import { Button } from '../ui'
import { careersStrings } from '../../resources/careers_strings'

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ')
}

export type OpeningCardProps = {
  title: string
  location: string
  employmentType: string
  applyTo: string
  className?: string
}

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
}: OpeningCardProps) {
  const meta = `${location}${careersStrings.metaSeparator}${employmentType}`

  return (
    <article
      className={cn(
        'flex flex-col gap-6 border-b border-border py-8',
        'md:flex-row md:items-center md:justify-between md:gap-10 md:py-10',
        className,
      )}
    >
      <div className="flex min-w-0 flex-col gap-4 md:gap-5 md:max-w-[607px]">
        <h3 className="font-display text-[clamp(1.5rem,3vw,2rem)] font-normal leading-[1.1] text-foreground">
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
