import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import { CarouselNav, Container } from '../common'
import { Button } from '../ui'
import { uiConstants } from '../../constants/ui_constants'
import {
  gsap,
  prefersReducedMotion,
  registerGsap,
} from '../../lib/gsap'
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
const INACTIVE_MAX_PX = 744
const ACTIVE_MAX_PX = 1015
const INACTIVE_H_PX = 458
const ACTIVE_H_PX = 540
const TWEEN_DURATION = 0.75
const TWEEN_EASE = 'power3.inOut'

/** Top-right diagonal cut — Figma mask on carousel media. */
const mediaClip =
  'polygon(0 0, calc(100% - 48px) 0, 100% 48px, 100% 100%, 0 100%)'

function inactiveWidthPx() {
  return Math.min(INACTIVE_MAX_PX, window.innerWidth * 0.78)
}

function activeWidthPx() {
  return Math.min(ACTIVE_MAX_PX, window.innerWidth * 0.88)
}

/**
 * Home projects carousel — Figma 42:4051
 * Active card grows while the track scrolls with the same tween (no layout jump).
 */
export function HomeProjects({ projects, className }: HomeProjectsProps) {
  const rootRef = useRef<HTMLElement>(null)
  const scrollerRef = useRef<HTMLDivElement>(null)
  const activeIndexRef = useRef(0)
  const tweenRef = useRef<gsap.core.Tween | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
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
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.4,
          stagger: 0.18,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        },
      )

      if (cards.length) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 48 },
          {
            opacity: 1,
            y: 0,
            duration: 1.35,
            stagger: 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: scrollerRef.current,
              start: 'top 78%',
              toggleActions: 'play none none none',
            },
          },
        )
      }
    },
    { scope: rootRef },
  )

  function goToIndex(nextIndex: number) {
    const scroller = scrollerRef.current
    if (!scroller) return
    const to = Math.min(projects.length - 1, Math.max(0, nextIndex))
    if (to === activeIndexRef.current) return

    const cards = Array.from(
      scroller.querySelectorAll<HTMLElement>('[data-home-project-card]'),
    )
    const startW = cards.map((card) => card.offsetWidth)
    const endW = cards.map((_, i) =>
      i === to ? activeWidthPx() : inactiveWidthPx(),
    )
    const startH = cards.map((card) => {
      const media = card.querySelector<HTMLElement>('[data-home-project-media]')
      return media?.offsetHeight ?? INACTIVE_H_PX
    })
    const endH = cards.map((_, i) => (i === to ? ACTIVE_H_PX : INACTIVE_H_PX))

    const offsetBefore = (index: number, t: number) => {
      let offset = 0
      for (let i = 0; i < index; i += 1) {
        offset += gsap.utils.interpolate(startW[i], endW[i], t) + CARD_GAP_PX
      }
      return offset
    }

    const startScroll = scroller.scrollLeft

    const apply = (t: number) => {
      cards.forEach((card, i) => {
        const width = gsap.utils.interpolate(startW[i], endW[i], t)
        const height = gsap.utils.interpolate(startH[i], endH[i], t)
        card.style.width = `${width}px`
        const media = card.querySelector<HTMLElement>('[data-home-project-media]')
        if (media) media.style.height = `${height}px`
      })
      scroller.scrollLeft = gsap.utils.interpolate(
        startScroll,
        offsetBefore(to, t),
        t,
      )
    }

    activeIndexRef.current = to
    setActiveIndex(to)
    tweenRef.current?.kill()

    if (prefersReducedMotion()) {
      apply(1)
      return
    }

    const state = { t: 0 }
    tweenRef.current = gsap.to(state, {
      t: 1,
      duration: TWEEN_DURATION,
      ease: TWEEN_EASE,
      overwrite: 'auto',
      onUpdate: () => apply(state.t),
    })
  }

  function scrollByCard(direction: -1 | 1) {
    goToIndex(activeIndexRef.current + direction)
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
        <div className="container-content flex w-max items-start gap-5 pb-1">
          {projects.map((project, index) => {
            const featured = index === activeIndex
            const meta =
              `${project.location}${projectsStrings.metaSeparator}${project.year}`.toUpperCase()

            return (
              <article
                key={project.id}
                data-home-project-card
                className={cn(
                  'flex shrink-0 flex-col gap-5',
                  featured
                    ? 'w-[min(1015px,88vw)]'
                    : 'w-[min(744px,78vw)]',
                )}
              >
                <div
                  data-home-project-media
                  className={cn(
                    'relative w-full overflow-hidden bg-surface-placeholder',
                    featured ? 'h-[540px] max-md:h-[54vw]' : 'h-[458px] max-md:h-[48vw]',
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

      <Container className="mt-20">
        <div className="w-full border-t border-black" aria-hidden />
      </Container>
    </section>
  )
}
