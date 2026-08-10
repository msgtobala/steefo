import { icons, type IconKey } from '../../resources/icons'
import { aboutStrings } from '../../resources/about_strings'
import { cn, mediaPlaceholderProps } from '../../utils'

export type CapabilityCardProps = {
  icon: IconKey
  title: string
  body: string
  className?: string
}

/**
 * Capability showcase card — Figma About Component 1–4
 * Placeholder media until photography is wired.
 */
export function CapabilityCard({
  icon,
  title,
  body,
  className,
}: CapabilityCardProps) {
  return (
    <article
      data-capability-card
      className={cn(
        'relative flex h-[480px] w-[min(100%,427px)] shrink-0 flex-col justify-end overflow-hidden p-10',
        className,
      )}
    >
      <div
        {...mediaPlaceholderProps(aboutStrings.capabilityMediaAriaLabel)}
        className="absolute inset-0 bg-surface-placeholder"
      />

      <img
        src={icons[icon]}
        alt=""
        width={60}
        height={60}
        className="absolute top-10 left-10 size-[60px] brightness-0"
      />

      <div className="relative z-[1] flex flex-col gap-3">
        <h3 className="font-display text-2xl font-medium leading-[1.2] text-foreground">
          {title}
        </h3>
        <p className="max-w-[326px] font-display text-base font-normal leading-[1.3] text-foreground">
          {body}
        </p>
      </div>
    </article>
  )
}
