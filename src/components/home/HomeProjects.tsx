import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import { CarouselNav, Container } from '../common'
import { Button } from '../ui'
import { uiConstants } from '../../constants/ui_constants'
import { gsap, prefersReducedMotion, registerGsap } from '../../lib/gsap'
import { homeStrings } from '../../resources/home_strings'
import { projectsStrings } from '../../resources/projects_strings'
import { cn, mediaPlaceholderProps } from '../../utils'

export type HomeProjectItem = {
  id: string
  location: string
  year: string
  title: string
  description: string
  href: string
}

export type HomeProjectsProps = {
  projects: HomeProjectItem[]
  className?: string
}

const CARD_GAP_PX = 20

/** Top-right diagonal cut — Figma mask on carousel media. */
const mediaClip =
  'polygon(0 0, calc(100% - 48px) 0, 100% 48px, 100% 100%, 0 100%)'

/**
 * Home projects carousel — Figma 42:4051
 * Top projects row with View All → /projects and shared arrow controls.
 */
export function HomeProjects({ projects, className }: HomeProjectsProps) {
  const rootRef = useRef<HTMLElement>(null)
  const scrollerRef = useRef<HTMLDivElement>(null)
  const {
    eyebrow,
    titleBefore,
    titleHighlight,
    titleAfter,
    body,
    viewAll,
    knowMore,
    prevAriaLabel,
    nextAriaLabel,
    mediaAriaLabel,
  } = homeStrings.projects

  useGSAP(
    () => {
      registerGsap()
      if (prefersReducedMotion()) return

      const header = gsap.utils.toArray<HTMLElement>(
        '[data-home-projects-header]',
      )
      const cards = gsap.utils.toArray<HTMLElement>('[data-home-project-card]')

      gsap.fromTo(
        header,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top 78%',
            toggleActions: 'play none none none',
          },
        },
      )

      if (cards.length) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 0.95,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: scrollerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          },
        )
      }
    },
    { scope: rootRef },
  )

  function scrollByCard(direction: -1 | 1) {
    const scroller = scrollerRef.current
    if (!scroller) return
    const card = scroller.querySelector<HTMLElement>('[data-home-project-card]')
    const amount = (card?.offsetWidth ?? 744) + CARD_GAP_PX
    scroller.scrollBy({ left: direction * amount, behavior: 'smooth' })
  }

  return (
    <section
      ref={rootRef}
      className={cn('my-[120px] w-full bg-white', className)}
      aria-label={eyebrow}
    >
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
          <div className="max-w-[400px] shrink-0" data-home-projects-header>
            <p className="text-eyebrow">{eyebrow}</p>
            <h2 className="mt-2 font-display text-[clamp(1.75rem,4vw,2.5rem)] font-medium leading-[1.1] text-foreground">
              {titleBefore}
              <span className="text-brand">{titleHighlight}</span>
              {titleAfter}
            </h2>
          </div>

          <div
            className="flex max-w-[538px] flex-col gap-6 lg:items-end"
            data-home-projects-header
          >
            <p className="font-display text-base leading-[1.3] text-body lg:text-right">
              {body}
            </p>
            <div className="flex items-center gap-2.5">
              <Link
                to={uiConstants.routes.projects}
                className="font-display text-sm font-medium uppercase leading-[1.2] text-brand-label underline decoration-solid underline-offset-4 transition-colors hover:text-brand"
              >
                {viewAll}
              </Link>
              <CarouselNav
                prevAriaLabel={prevAriaLabel}
                nextAriaLabel={nextAriaLabel}
                onPrev={() => scrollByCard(-1)}
                onNext={() => scrollByCard(1)}
                className="!flex"
              />
            </div>
          </div>
        </div>
      </Container>

      <div
        ref={scrollerRef}
        className="scrollbar-none mt-10 overflow-x-auto overscroll-x-contain touch-pan-y md:mt-12"
      >
        <div className="container-content flex w-max gap-5 pb-1">
          {projects.map((project, index) => {
            const featured = index === 0
            const meta =
              `${project.location}${projectsStrings.metaSeparator}${project.year}`.toUpperCase()

            return (
              <article
                key={project.id}
                data-home-project-card
                className={cn(
                  'flex shrink-0 flex-col',
                  featured
                    ? 'w-[min(1015px,88vw)] gap-[29px]'
                    : 'w-[min(744px,78vw)] gap-5',
                )}
              >
                <div
                  className={cn(
                    'relative w-full overflow-hidden bg-surface-placeholder',
                    featured
                      ? 'aspect-[1015/540] md:h-[540px] md:aspect-auto'
                      : 'aspect-[744/458] md:h-[458px] md:aspect-auto',
                  )}
                  style={{ clipPath: mediaClip }}
                  {...mediaPlaceholderProps(mediaAriaLabel)}
                >
                  {featured ? (
                    <span
                      className="pointer-events-none absolute right-6 bottom-6 flex size-14 items-center justify-center rounded-full border border-white/80 text-white"
                      aria-hidden
                    >
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M8 5v14l11-7L8 5z" />
                      </svg>
                    </span>
                  ) : null}
                </div>

                <div className="flex items-start justify-between gap-6">
                  <div className="min-w-0 max-w-[492px] flex-1">
                    <p className="font-display text-xs font-normal uppercase leading-[1.25] tracking-[0.02em] text-subtle-foreground">
                      {meta}
                    </p>
                    <h3 className="mt-1 font-display text-xl font-medium leading-[1.2] text-foreground md:text-2xl">
                      {project.title}
                    </h3>
                    <p className="mt-2 font-display text-sm font-normal leading-[1.3] text-foreground/80">
                      {project.description}
                    </p>
                  </div>

                  <Button
                    variant="primary"
                    size="sm"
                    to={
                      project.href === '#'
                        ? uiConstants.routes.projects
                        : project.href
                    }
                    cutCorners="top-right"
                    withArrow={false}
                    className="mt-0.5 shrink-0 min-w-[138px]"
                  >
                    {knowMore}
                  </Button>
                </div>
              </article>
            )
          })}
        </div>
      </div>

      {/* Figma 47:4052 — 1px solid black hairline under the carousel */}
      <Container className="mt-20">
        <div className="w-full border-t border-black" aria-hidden />
      </Container>
    </section>
  )
}
