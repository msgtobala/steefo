import type { HTMLAttributes } from 'react'
import { cn } from '../../utils'

export type AwardCardProps = {
  pill: string
  title: string
  body: string
  tone?: 'dark' | 'brand'
  className?: string
} & HTMLAttributes<HTMLElement>

/**
 * Certification / award card — Figma About 1:3181–1:3183
 */
export function AwardCard({
  pill,
  title,
  body,
  tone = 'dark',
  className,
  ...rest
}: AwardCardProps) {
  const isBrand = tone === 'brand'

  return (
    <article
      className={cn(
        'motion-lift flex min-h-[460px] flex-col px-10 py-9 text-white',
        isBrand ? 'bg-brand' : 'bg-black',
        className,
      )}
      {...rest}
    >
      <span
        className={cn(
          'inline-flex w-fit items-center rounded px-3 py-1.5 font-display text-sm font-medium uppercase leading-[1.2]',
          isBrand ? 'bg-white text-brand' : 'bg-brand text-white',
        )}
      >
        {pill}
      </span>
      <h3 className="mt-auto pt-16 font-display text-2xl font-normal leading-[1.2] text-white">
        {title}
      </h3>
      <p className="mt-4 font-display text-base font-normal leading-[1.3] text-white">
        {body}
      </p>
    </article>
  )
}
