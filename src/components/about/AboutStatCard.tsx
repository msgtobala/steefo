import type { HTMLAttributes } from 'react'
import { cn } from '../../utils'

export type AboutStatCardProps = {
  label: string
  value: string
  variant?: 'light' | 'brand'
  className?: string
} & HTMLAttributes<HTMLDivElement>

/**
 * Hero overlay stat — Figma About 1:3061 / 1:3064 (315×160)
 */
export function AboutStatCard({
  label,
  value,
  variant = 'light',
  className,
  ...rest
}: AboutStatCardProps) {
  const isBrand = variant === 'brand'

  return (
    <div
      className={cn(
        'flex h-40 shrink-0 flex-col px-6 pt-[30px] backdrop-blur-[37px]',
        isBrand ? 'bg-brand text-white' : 'bg-white text-foreground',
        'motion-lift',
        className,
      )}
      {...rest}
    >
      <p className="font-display text-xl font-normal leading-[1.1]">{label}</p>
      <p
        className="mt-1 font-display text-[4.5rem] font-normal leading-[1.1]"
        data-count-up={value}
      >
        {value}
      </p>
    </div>
  )
}
