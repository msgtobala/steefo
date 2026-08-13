import { Link } from 'react-router-dom'
import { Container } from '../../components/common'
import { usePageRevealRef } from '../../hooks/usePageReveal'
import { images } from '../../resources/images'
import { disclaimerStrings } from '../../resources/disclaimer_strings'
import { cn } from '../../utils'

type LegalLink = {
  label: string
  href: string
  external?: boolean
}

function BrandArrow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden
      className={cn('mt-1.5 size-3 shrink-0 text-brand', className)}
    >
      <path
        d="M2 3.5L8.5 3.5M8.5 3.5L8.5 10M8.5 3.5L2.5 9.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  )
}

function LegalLinkList({ links }: { links: readonly LegalLink[] }) {
  return (
    <ul className="mt-5 space-y-3">
      {links.map((link) => (
        <li key={link.href} className="flex items-start gap-2.5">
          <BrandArrow />
          {link.external ? (
            <a
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="font-display text-base font-medium text-brand underline decoration-solid underline-offset-4 transition-colors hover:text-brand-hover"
            >
              {link.label}
            </a>
          ) : (
            <Link
              to={link.href}
              className="font-display text-base font-medium text-brand underline decoration-solid underline-offset-4 transition-colors hover:text-brand-hover"
            >
              {link.label}
            </Link>
          )}
        </li>
      ))}
    </ul>
  )
}

function ParagraphBlock({
  paragraphs,
  links,
}: {
  paragraphs: readonly string[]
  links?: readonly LegalLink[]
}) {
  return (
    <div>
      <div className="space-y-4 font-display text-base leading-[1.55] text-body">
        {paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 48)}>{paragraph}</p>
        ))}
      </div>
      {links?.length ? <LegalLinkList links={links} /> : null}
    </div>
  )
}

/**
 * Disclaimer — same legal layout as Terms / Privacy.
 * Content from https://www.steefo.com/disclaimer/
 */
export function DisclaimerPage() {
  const rootRef = usePageRevealRef({ withHero: true })
  const { eyebrow, title, titleLines, intro, sections } = disclaimerStrings

  return (
    <div ref={rootRef} className="bg-surface-muted pb-24 md:pb-32">
      <section className="relative isolate mt-10 overflow-hidden bg-black text-white md:mt-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 90% at 92% 55%, rgb(219 37 28 / 0.55), transparent 55%), linear-gradient(100deg, #050505 35%, #180909 72%, #2a0e0e 100%)',
          }}
        />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-[min(100%,52rem)]"
          style={{
            backgroundImage: `url(${images.pattern})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
            backgroundRepeat: 'no-repeat',
            filter: 'brightness(2.8) contrast(1.15)',
            mixBlendMode: 'screen',
            opacity: 0.85,
            maskImage:
              'linear-gradient(90deg, transparent 0%, rgb(0 0 0 / 0.4) 30%, black 58%)',
            WebkitMaskImage:
              'linear-gradient(90deg, transparent 0%, rgb(0 0 0 / 0.4) 30%, black 58%)',
          }}
        />

        <Container className="relative z-[1] flex min-h-[20rem] flex-col justify-end pb-16 pt-12 md:min-h-[26rem] md:pb-24 md:pt-16 lg:min-h-[30rem]">
          <div className="max-w-[36rem]">
            <p className="text-eyebrow" data-animate-hero>
              {eyebrow}
            </p>
            <h1
              className="mt-4 font-display text-[clamp(2.75rem,6.8vw,5.5rem)] font-medium leading-[0.94] tracking-[-0.05em] text-white"
              data-animate-hero
            >
              {titleLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>
            <p
              className="mt-6 max-w-[28rem] font-display text-base leading-[1.45] text-white/55 md:mt-8 md:text-lg"
              data-animate-hero
            >
              {intro}
            </p>
            <span className="sr-only">{title}</span>
          </div>
        </Container>
      </section>

      <Container className="mt-8 md:mt-12" data-animate-section>
        <nav
          aria-label="Disclaimer sections"
          className="mb-8 -mx-1 overflow-x-auto pb-1 lg:hidden"
          data-animate="up"
        >
          <ul className="flex w-max gap-2 px-1">
            {sections.map((section, index) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="inline-flex items-center gap-2 border border-border bg-white px-3 py-2 font-display text-xs text-body transition-colors hover:border-brand hover:text-brand"
                >
                  <span className="tabular-nums text-brand">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="grid gap-12 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] lg:gap-16 xl:grid-cols-[minmax(0,17rem)_minmax(0,1fr)]">
          <aside className="hidden lg:block" data-animate="up">
            <div className="sticky top-32">
              <p className="font-display text-xs font-medium uppercase tracking-[0.08em] text-subtle-foreground">
                On this page
              </p>
              <nav
                aria-label="Disclaimer table of contents"
                className="mt-4 border-l border-border"
              >
                <ul className="space-y-0">
                  {sections.map((section, index) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="group flex gap-3 border-l-2 border-transparent py-2.5 pl-4 transition-colors hover:border-brand hover:text-brand"
                      >
                        <span className="font-display text-xs tabular-nums text-subtle-foreground group-hover:text-brand">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="font-display text-sm leading-[1.3] text-body group-hover:text-brand">
                          {section.title}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>

          <div className="min-w-0 space-y-8 md:space-y-10">
            {sections.map((section, sectionIndex) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-28 border border-border bg-white"
                data-animate="up"
              >
                <header className="flex items-start gap-4 border-b border-border px-5 py-5 md:gap-5 md:px-8 md:py-6">
                  <span
                    aria-hidden
                    className="mt-1.5 h-8 w-1 shrink-0 bg-brand md:mt-2 md:h-9"
                  />
                  <div className="min-w-0">
                    <p className="font-display text-xs font-medium tabular-nums tracking-[0.06em] text-brand">
                      Section {String(sectionIndex + 1).padStart(2, '0')}
                    </p>
                    <h2 className="mt-1 font-display text-[clamp(1.35rem,2.5vw,1.75rem)] font-medium leading-[1.15] text-foreground">
                      {section.title}
                    </h2>
                  </div>
                </header>

                <div className="space-y-8 px-5 py-6 md:space-y-10 md:px-8 md:py-8">
                  {section.blocks.map((block, index) => {
                    if (block.type === 'subsection') {
                      return (
                        <div key={`${section.id}-sub-${index}`}>
                          <div className="flex items-start gap-2.5">
                            <BrandArrow className="mt-1" />
                            <h3 className="font-display text-lg font-medium text-foreground">
                              {block.title}
                            </h3>
                          </div>
                          <div className="mt-3 space-y-4 pl-5.5 font-display text-base leading-[1.55] text-body">
                            {block.paragraphs.map((paragraph) => (
                              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                            ))}
                          </div>
                        </div>
                      )
                    }

                    if (block.type === 'definitions') {
                      return (
                        <div key={`${section.id}-defs-${index}`}>
                          <div className="flex items-start gap-2.5">
                            <BrandArrow className="mt-1" />
                            <h3 className="font-display text-lg font-medium text-foreground">
                              {block.title}
                            </h3>
                          </div>
                          <p className="mt-3 pl-5.5 font-display text-base leading-[1.55] text-body">
                            {block.lead}
                          </p>
                          <dl className="mt-6 divide-y divide-border border border-border">
                            {block.items.map((item) => (
                              <div
                                key={item.term}
                                className="flex gap-3 bg-surface-muted/50 px-4 py-4 md:gap-4 md:px-5"
                              >
                                <BrandArrow />
                                <div className="min-w-0">
                                  <dt className="font-display text-sm font-semibold text-foreground md:text-base">
                                    {item.term}
                                  </dt>
                                  <dd className="mt-1.5 font-display text-sm leading-normal text-body md:text-base md:leading-[1.55]">
                                    {item.definition}
                                  </dd>
                                </div>
                              </div>
                            ))}
                          </dl>
                        </div>
                      )
                    }

                    return (
                      <ParagraphBlock
                        key={`${section.id}-p-${index}`}
                        paragraphs={block.paragraphs}
                        links={
                          'links' in block
                            ? (block.links as readonly LegalLink[] | undefined)
                            : undefined
                        }
                      />
                    )
                  })}
                </div>
              </section>
            ))}
          </div>
        </div>
      </Container>
    </div>
  )
}
