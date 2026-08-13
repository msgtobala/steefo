import type { HTMLAttributes } from 'react'
import { aboutStrings } from '../../resources/about_strings'
import { cn, mediaPlaceholderProps } from '../../utils'

export type TeamMemberCardProps = {
  name: string
  role: string
  className?: string
} & HTMLAttributes<HTMLElement>

/**
 * Leadership member card — Figma About team grid
 */
export function TeamMemberCard({
  name,
  role,
  className,
  ...rest
}: TeamMemberCardProps) {
  return (
    <article
      className={cn('flex flex-col items-center gap-10 text-center', className)}
      {...rest}
    >
      <div
        {...mediaPlaceholderProps(aboutStrings.teamMediaAriaLabel)}
        className="aspect-[330/270] w-full max-w-[330px] bg-surface-placeholder"
      />
      <div className="flex flex-col gap-2">
        <h3 className="font-display text-2xl font-normal leading-[1.1] text-foreground">
          {name}
        </h3>
        <p className="font-display text-base font-normal leading-[1.1] text-[#bcbcbc]">
          {role}
        </p>
      </div>
    </article>
  )
}
