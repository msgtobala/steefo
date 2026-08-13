import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import { CarouselNav, Container } from '../common'
import { InsightCard } from '../insights'
import { uiConstants } from '../../constants/ui_constants'
import type { InsightArticle } from '../../pages/insights/insights.config'
import { gsap, prefersReducedMotion, registerGsap } from '../../lib/gsap'
import { homeStrings } from '../../resources/home_strings'
import { cn } from '../../utils'

export type HomeInsightsProps = {
  articles: readonly InsightArticle[]
  className?: string
}

const CARD_GAP_PX = 20

/** Figma 54:5758 card image heights (432-wide strip). */
const IMAGE_HEIGHTS = [
  'h-[220px] md:h-[360px]',
  'h-[280px] md:h-[496px]',
  'h-[200px] md:h-[334px]',
  'h-[220px] md:h-[359px]',
] as const

/**
 * Home insights strip — Figma 54:5758
 * Header + View All / arrows + horizontal cards + solid hairline.
 */
export function HomeInsights({ articles, className }: HomeInsightsProps) {
  const rootRef = useRef<HTMLElement>(null)
  const scrollerRef = useRef<HTMLDivElement>(null)
  const {
    eyebrow,
    titleBefore,
    titleHighlight,
    viewAll,
    prevAriaLabel,
    nextAriaLabel,
  } = homeStrings.insights

  useGSAP(
    () => {
      registerGsap()
      if (prefersReducedMotion()) return

      const header = gsap.utils.toArray<HTMLElement>(
        '[data-home-insights-header]',
      )
      const cards = gsap.utils.toArray<HTMLElement>('[data-home-insight-card]')

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

  function scrollByCard(direction: -1 | 1) {
    const scroller = scrollerRef.current
    if (!scroller) return
    const card = scroller.querySelector<HTMLElement>('[data-home-insight-card]')
    const amount = (card?.offsetWidth ?? 432) + CARD_GAP_PX
    scroller.scrollBy({ left: direction * amount, behavior: 'smooth' })
  }

  return (
    <section
      ref={rootRef}
      className={cn('my-[120px] w-full bg-white', className)}
      aria-label={eyebrow}
    >
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between sm:gap-12">
          <header className="max-w-[400px]" data-home-insights-header>
            <p className="text-eyebrow">{eyebrow}</p>
            <h2 className="mt-2 font-display text-[clamp(1.75rem,4vw,2.5rem)] font-medium leading-[1.1] text-foreground">
              <span className="block">{titleBefore}</span>
              <span className="block text-brand-label">{titleHighlight}</span>
            </h2>
          </header>

          <div
            className="flex shrink-0 items-center gap-2.5"
            data-home-insights-header
          >
            <Link
              to={uiConstants.routes.insights}
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
      </Container>

      <div
        ref={scrollerRef}
        className="scrollbar-none mt-10 overflow-x-auto overscroll-x-contain touch-pan-y md:mt-12"
      >
        <div className="container-content flex w-max gap-5 pb-1">
          {articles.map((article, index) => (
            <InsightCard
              key={article.id}
              category={article.category}
              readTime={article.readTime}
              title={article.title}
              excerpt={article.excerpt}
              image={article.image}
              href={article.href}
              size={article.size}
              imageClassName={IMAGE_HEIGHTS[index % IMAGE_HEIGHTS.length]}
              className="w-[min(27rem,78vw)] shrink-0 gap-4"
              data-home-insight-card
            />
          ))}
        </div>
      </div>

      <Container className="mt-20">
        <div className="w-full border-t border-black" aria-hidden />
      </Container>
    </section>
  )
}
