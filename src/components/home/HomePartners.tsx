import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { Container } from '../common'
import { gsap, prefersReducedMotion, registerGsap } from '../../lib/gsap'
import { homeStrings } from '../../resources/home_strings'
import { images, type ImageKey } from '../../resources/images'
import { cn } from '../../utils'

export type HomePartnerItem = {
  id: string
  label: string
  image?: ImageKey
}

export type HomePartnersProps = {
  logos: HomePartnerItem[]
  className?: string
}

function PartnerLogo({ logo }: { logo: HomePartnerItem }) {
  if (logo.image) {
    return (
      <img
        src={images[logo.image]}
        alt={logo.label}
        className="h-10 w-auto max-w-[14.5rem] object-contain opacity-40"
      />
    )
  }

  return (
    <span className="font-display text-[clamp(1.25rem,3vw,2.5rem)] font-medium leading-[1.1] whitespace-nowrap text-black/28">
      {logo.label}
    </span>
  )
}

/**
 * Home partners / global impact — Figma 47:4053
 * Centered eyebrow + title; infinite sliding logo marquee.
 */
export function HomePartners({ logos, className }: HomePartnersProps) {
  const rootRef = useRef<HTMLElement>(null)
  const { eyebrow, titleBefore, titleHighlight } = homeStrings.partners
  // Duplicate the set so translateX(-50%) loops seamlessly.
  const track = [...logos, ...logos]

  useGSAP(
    () => {
      registerGsap()
      if (prefersReducedMotion()) return

      const items = gsap.utils.toArray<HTMLElement>('[data-home-partners]')
      gsap.fromTo(
        items,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top 78%',
            toggleActions: 'play none none none',
          },
        },
      )
    },
    { scope: rootRef },
  )

  return (
    <section
      ref={rootRef}
      className={cn('w-full overflow-hidden bg-white pb-16 md:pb-24', className)}
      aria-label={eyebrow}
    >
      <Container className="flex flex-col items-center text-center">
        <p className="text-eyebrow" data-home-partners>
          {eyebrow}
        </p>

        <h2
          className="mt-3 max-w-[625px] font-display text-[clamp(1.75rem,4vw,2.5rem)] font-medium leading-[1.1] text-balance text-body"
          data-home-partners
        >
          {titleBefore}{' '}
          <span className="text-brand">{titleHighlight}</span>
        </h2>
      </Container>

      <div
        className="group mt-16 w-full overflow-hidden md:mt-20"
        data-home-partners
      >
        <ul
          className="animate-partner-marquee flex w-max items-center gap-[60px] pr-[60px] group-hover:[animation-play-state:paused]"
          aria-hidden={false}
        >
          {track.map((logo, index) => (
            <li
              key={`${logo.id}-${index}`}
              className="flex min-h-11 shrink-0 items-center justify-center"
              aria-hidden={index >= logos.length ? true : undefined}
            >
              <PartnerLogo logo={logo} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
