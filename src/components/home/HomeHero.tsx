import { images } from '../../resources/images'
import { homeStrings } from '../../resources/home_strings'
import { cn } from '../../utils'

export type HomeHeroProps = {
  className?: string
}

/**
 * Home hero banner — Figma Home 1:16 / 1:17 / 1:2308
 * Full-viewport background (`images.heroBanner`) with centered headline.
 * Pulls under the fixed Header via negative margin (Layout main top padding).
 */
export function HomeHero({ className }: HomeHeroProps) {
  const { titleLine1, titleLine2, mediaAriaLabel } = homeStrings.hero

  return (
    <section
      className={cn(
        'relative -mt-20 h-svh w-full overflow-hidden md:-mt-[120px]',
        className,
      )}
      aria-label={mediaAriaLabel}
    >
      <img
        src={images.heroBanner}
        alt=""
        className="absolute inset-0 size-full object-cover object-center"
      />
      {/* Soft scrim so white type stays readable on bright areas */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/25 to-black/20"
      />

      <div className="relative z-[1] flex h-full flex-col items-center justify-end px-6 pb-[22vh] text-center md:pb-[26vh]">
        <h1 className="max-w-[1006px] font-display text-[clamp(2.25rem,5.5vw,4.5rem)] font-medium leading-none tracking-[-0.0556em] text-balance text-white">
          {titleLine1}
          <br />
          {titleLine2}
        </h1>
      </div>
    </section>
  )
}
