import { Container } from '../common'
import { cn } from '../../utils'

export type AboutStoryValue = {
  id: string
  pill: string
  title: string
  body: string
}

export type AboutStoryProps = {
  titleLine1: string
  titleLine2: string
  values: AboutStoryValue[]
  className?: string
}

/**
 * Story / Vision / Mission — Figma About 1:2977
 * Inset #080808 panel; title top-aligned with Vision pill.
 */
export function AboutStory({
  titleLine1,
  titleLine2,
  values,
  className,
}: AboutStoryProps) {
  return (
    <section className={cn('mt-10 md:mt-14', className)}>
      <Container>
        <div className="bg-[#080808] px-6 py-16 sm:px-10 md:py-[78px]">
          <div className="flex flex-col items-start gap-12 lg:flex-row lg:justify-between lg:gap-16">
            <h2 className="max-w-[385px] shrink-0 font-display text-[clamp(2.5rem,5vw,4.5rem)] font-normal leading-[1.1] tracking-[-0.0556em] text-white">
              {titleLine1}
              <br />
              {titleLine2}
            </h2>

            <div className="flex w-full max-w-[538px] flex-col gap-10 md:gap-12">
              {values.map((item) => (
                <div key={item.id} className="flex flex-col gap-2">
                  <span className="inline-flex w-fit items-center rounded bg-brand px-3 py-1.5 font-display text-sm font-medium uppercase leading-[1.2] text-white">
                    {item.pill}
                  </span>
                  <h3 className="max-w-[402px] font-display text-[clamp(1.25rem,2.5vw,1.75rem)] font-normal leading-[1.2] text-white">
                    {item.title}
                  </h3>
                  <p className="font-display text-base font-normal leading-[1.3] text-white">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
