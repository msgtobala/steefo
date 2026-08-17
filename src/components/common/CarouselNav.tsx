import { icons } from '../../resources/icons'
import { cn } from '../../utils'

export type CarouselNavProps = {
  prevAriaLabel: string
  nextAriaLabel: string
  onPrev?: () => void
  onNext?: () => void
  className?: string
}

/**
 * Prev / next controls using shared `icons.left` / `icons.right`.
 */
export function CarouselNav({
  prevAriaLabel,
  nextAriaLabel,
  onPrev,
  onNext,
  className,
}: CarouselNavProps) {
  return (
    <div className={cn('hidden shrink-0 items-center gap-4 sm:flex', className)}>
      <button
        type="button"
        aria-label={prevAriaLabel}
        onClick={onPrev}
        className="flex size-10 items-center justify-center transition-transform duration-200 hover:opacity-70 active:scale-90 motion-reduce:transition-none"
      >
        <img
          src={icons.left}
          alt=""
          width={18}
          height={32}
          className="h-8 w-[18px]"
        />
      </button>
      <button
        type="button"
        aria-label={nextAriaLabel}
        onClick={onNext}
        className="flex size-10 items-center justify-center transition-transform duration-200 hover:opacity-70 active:scale-90 motion-reduce:transition-none"
      >
        <img
          src={icons.right}
          alt=""
          width={18}
          height={32}
          className="h-8 w-[18px]"
        />
      </button>
    </div>
  )
}
