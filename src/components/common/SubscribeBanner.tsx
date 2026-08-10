import { type FormEvent } from 'react'
import { uiConstants } from '../../constants/ui_constants'
import { commonStrings } from '../../resources/common_strings'
import { images } from '../../resources/images'
import { Button } from '../ui'
import { Container } from './Container'

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ')
}

export type SubscribeBannerProps = {
  className?: string
}

function buildMailto(email: string) {
  const params = new URLSearchParams({
    subject: commonStrings.subscribe.mailSubject,
    body: `Email: ${email}`,
  })
  return `mailto:${uiConstants.contact.email}?${params.toString()}`
}

/**
 * Shared “Ready to Build” CTA — Figma Insights 1:3684 / Projects 1:3574
 * Full-bleed black band with email capture (15:3455) + subscribeBanner visual.
 */
export function SubscribeBanner({ className }: SubscribeBannerProps) {
  const { subscribe } = commonStrings

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const email = String(data.get('email') ?? '').trim()
    if (!email) return
    window.location.href = buildMailto(email)
  }

  return (
    <section
      className={cn('w-full overflow-hidden bg-black text-white', className)}
    >
      <Container className="grid grid-cols-1 items-center gap-10 py-12 md:gap-12 md:py-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,480px)] lg:gap-16 lg:py-0">
        <div className="flex max-w-[560px] flex-col gap-6 py-4 lg:py-16">
          <h2 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-medium leading-[1.15] tracking-[-0.02em] text-balance">
            {subscribe.titleBefore}
            <span className="text-brand">{subscribe.titleHighlight}</span>
          </h2>
          <p className="max-w-[420px] font-display text-base leading-[1.3] text-white/80">
            {subscribe.body}
          </p>

          <form
            className="mt-2 flex h-10 w-full max-w-[460px] items-stretch"
            onSubmit={handleSubmit}
            noValidate
          >
            {/* Figma 15:3455 — 335×40 bordered field flush to 126×40 Submit */}
            <input
              name="email"
              type="email"
              placeholder={subscribe.emailPlaceholder}
              autoComplete="email"
              required
              aria-label={subscribe.emailPlaceholder}
              className={cn(
                'h-10 min-w-0 flex-1 border border-r-0 border-border-input bg-transparent',
                'px-3.5 font-display text-sm font-light leading-[1.3] text-white',
                'placeholder:text-muted-foreground',
                'outline-none transition-colors focus-visible:border-brand',
                'disabled:cursor-not-allowed disabled:opacity-50',
              )}
            />
            <Button
              type="submit"
              variant="primary"
              size="sm"
              withArrow
              cutCorners="top-right"
              className="h-10 w-[126px] shrink-0"
            >
              {subscribe.submit}
            </Button>
          </form>
        </div>

        <div className="relative mx-auto w-full max-w-[420px] lg:max-w-none lg:justify-self-end">
          <img
            src={images.subscribeBanner}
            alt={subscribe.bannerAriaLabel}
            className="h-auto w-full object-contain object-bottom lg:max-h-[520px]"
          />
        </div>
      </Container>
    </section>
  )
}
