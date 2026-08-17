import type { HTMLAttributes } from 'react'
import { icons, type IconKey } from '../../resources/icons'
import { images, type ImageKey } from '../../resources/images'
import { cn } from '../../utils'

export type CapabilityCardProps = {
  icon: IconKey
  image: ImageKey
  title: string
  body: string
  className?: string
} & HTMLAttributes<HTMLElement>

/**
 * Capability showcase card — Figma About Component 1–4
 */
export function CapabilityCard({
  icon,
  image,
  title,
  body,
  className,
  ...rest
}: CapabilityCardProps) {
  return (
    <article
      data-capability-card
      className={cn(
        'group relative flex h-[480px] w-[min(100%,427px)] shrink-0 flex-col justify-end overflow-hidden p-10 text-white',
        className,
      )}
      {...rest}
    >
      <div className="motion-media absolute inset-0">
        <img
          src={images[image]}
          alt=""
          className="capability-gloss size-full object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-overlay-mid"
        />
      </div>

      <img
        src={icons[icon]}
        alt=""
        width={60}
        height={60}
        className="absolute top-10 left-10 z-[1] size-[60px] brightness-0 invert"
      />

      <div className="relative z-[1] flex flex-col gap-3">
        <h3 className="font-display text-2xl font-medium leading-[1.2] text-white">
          {title}
        </h3>
        <p className="max-w-[326px] font-display text-base font-normal leading-[1.3] text-white">
          {body}
        </p>
      </div>
    </article>
  )
}
