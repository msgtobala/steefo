import type { HTMLAttributes } from 'react'
import { aboutStrings } from '../../resources/about_strings'
import { images, type ImageKey } from '../../resources/images'
import { cn } from '../../utils'

export type AwardCardProps = {
  image: ImageKey
  className?: string
} & HTMLAttributes<HTMLElement>

/**
 * Award image card — certificate / recognition photo
 */
export function AwardCard({ image, className, ...rest }: AwardCardProps) {
  return (
    <article
      data-award-card
      className={cn(
        'motion-lift relative flex h-[420px] w-[min(100%,300px)] shrink-0 items-center justify-center overflow-hidden bg-surface-muted p-6',
        className,
      )}
      {...rest}
    >
      <img
        src={images[image]}
        alt={aboutStrings.awardMediaAriaLabel}
        className="size-full object-contain"
      />
    </article>
  )
}
