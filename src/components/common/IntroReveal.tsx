import { useId, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import {
  gsap,
  prefersReducedMotion,
  registerGsap,
  ScrollTrigger,
} from '../../lib/gsap'
import { images } from '../../resources/images'
import { commonStrings } from '../../resources/common_strings'
import { cn } from '../../utils/cn'

const CLOSED = { openY: 0, openX: 0, tip: 0.04 }
const LINE = { openY: 0.01, openX: 0.94, tip: 0.045 }

/** Horizontal eye / tapered slit in 0–1 objectBoundingBox space. */
function eyeHolePath(openY: number, openX: number, tip: number) {
  if (openY <= 0 || openX <= 0) return 'M 0.5 0.5 Z'
  const cx = 0.5
  const cy = 0.5
  const halfH = openY / 2
  const halfW = openX / 2
  const left = cx - halfW
  const right = cx + halfW
  const tipW = Math.min(halfW * 0.38, tip)
  const yTop = cy - halfH
  const yBot = cy + halfH
  const xL2 = left + tipW
  const xR2 = right - tipW
  return `M ${left} ${cy} L ${xL2} ${yTop} L ${xR2} ${yTop} L ${right} ${cy} L ${xR2} ${yBot} L ${xL2} ${yBot} Z`
}

const CORNERS = [
  {
    className: 'top-0 left-0 origin-top-left',
    objectPosition: 'left top',
    fade: 'linear-gradient(135deg, black 32%, transparent 76%)',
    clipFrom: 'inset(0 70% 70% 0)',
  },
  {
    className: 'top-0 right-0 origin-top-right',
    objectPosition: 'right top',
    fade: 'linear-gradient(225deg, black 32%, transparent 76%)',
    clipFrom: 'inset(0 0 70% 70%)',
  },
  {
    className: 'bottom-0 left-0 origin-bottom-left',
    objectPosition: 'left bottom',
    fade: 'linear-gradient(45deg, black 32%, transparent 76%)',
    clipFrom: 'inset(70% 70% 0 0)',
  },
  {
    className: 'bottom-0 right-0 origin-bottom-right',
    objectPosition: 'right bottom',
    fade: 'linear-gradient(315deg, black 32%, transparent 76%)',
    clipFrom: 'inset(70% 0 0 70%)',
  },
] as const

function CornerCircuits() {
  return (
    <>
      {CORNERS.map((corner) => (
        <div
          key={corner.className}
          data-corner
          className={cn(
            'absolute h-[min(48%,28rem)] w-[min(46%,32rem)] overflow-hidden',
            corner.className,
          )}
          style={{
            clipPath: corner.clipFrom,
            WebkitMaskImage: corner.fade,
            maskImage: corner.fade,
          }}
        >
          <img
            src={images.patternDark}
            alt=""
            className="size-full object-cover"
            style={{ objectPosition: corner.objectPosition }}
          />
        </div>
      ))}
    </>
  )
}

export type IntroRevealProps = {
  className?: string
  onComplete?: () => void
}

/**
 * Splash: corner circuit pattern, logo, then a center line grows and opens.
 * to reveal the page.
 */
export function IntroReveal({ className, onComplete }: IntroRevealProps) {
  const [active, setActive] = useState(true)
  const rootRef = useRef<HTMLDivElement>(null)
  const holeRef = useRef<SVGPathElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const patternRef = useRef<HTMLDivElement>(null)
  const maskId = `intro-mask-${useId().replace(/:/g, '')}`

  useGSAP(
    () => {
      if (!active) return
      registerGsap()

      const root = rootRef.current
      const hole = holeRef.current
      const logo = logoRef.current
      const pattern = patternRef.current
      if (!root || !hole || !logo || !pattern) return

      const prevOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'

      const finish = () => {
        document.body.style.overflow = prevOverflow
        setActive(false)
        onComplete?.()
        ScrollTrigger.refresh()
      }

      const applyHole = (openY: number, openX: number, tip: number) => {
        hole.setAttribute('d', eyeHolePath(openY, openX, tip))
      }

      applyHole(CLOSED.openY, CLOSED.openX, CLOSED.tip)

      if (prefersReducedMotion()) {
        const tween = gsap.to(root, {
          opacity: 0,
          duration: 0.25,
          onComplete: finish,
        })
        return () => {
          tween.kill()
          document.body.style.overflow = prevOverflow
        }
      }

      const corners = Array.from(
        pattern.querySelectorAll<HTMLElement>('[data-corner]'),
      )

      const state = { ...CLOSED }
      const sync = () => applyHole(state.openY, state.openX, state.tip)

      const tl = gsap.timeline({
        defaults: { ease: 'power2.inOut' },
        onComplete: finish,
      })

      tl.fromTo(
        corners,
        { opacity: 0 },
        {
          opacity: 1,
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.1,
          stagger: 0.12,
          ease: 'power2.out',
        },
        0,
      )
      tl.fromTo(
        logo,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.65, ease: 'power3.out' },
        '+=0.12',
      )
      tl.to(
        state,
        {
          openY: LINE.openY,
          openX: 0.06,
          tip: LINE.tip,
          duration: 0.18,
          ease: 'power2.out',
          onUpdate: sync,
        },
        '+=0.28',
      )
      tl.to(state, {
        openX: LINE.openX,
        duration: 0.5,
        ease: 'power2.inOut',
        onUpdate: sync,
      })
      tl.to(
        logo,
        { opacity: 0, scale: 0.97, duration: 0.32, ease: 'power2.in' },
        '+=0.1',
      )
      tl.to(
        state,
        {
          openY: 0.22,
          openX: 0.92,
          tip: 0.05,
          duration: 0.65,
          ease: 'power3.out',
          onUpdate: sync,
        },
        '-=0.12',
      )
      tl.to(state, {
        openY: 1.22,
        openX: 1.12,
        tip: 0.01,
        duration: 0.95,
        ease: 'power3.inOut',
        onUpdate: sync,
      })
      tl.to(root, { opacity: 0, duration: 0.22, ease: 'power2.out' }, '-=0.1')

      const onResize = () => sync()
      window.addEventListener('resize', onResize)

      return () => {
        tl.kill()
        window.removeEventListener('resize', onResize)
        document.body.style.overflow = prevOverflow
      }
    },
    { dependencies: [active], scope: rootRef },
  )

  if (!active) return null

  return (
    <div
      ref={rootRef}
      className={cn('fixed inset-0 z-200 overflow-hidden', className)}
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <svg
        className="absolute inset-0 size-full"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <defs>
          <mask
            id={maskId}
            maskUnits="objectBoundingBox"
            maskContentUnits="objectBoundingBox"
          >
            <rect x="0" y="0" width="1" height="1" fill="white" />
            <path
              ref={holeRef}
              fill="black"
              d={eyeHolePath(CLOSED.openY, CLOSED.openX, CLOSED.tip)}
            />
          </mask>
        </defs>
      </svg>

      <div
        className="absolute inset-0 bg-[#E8E8E8]"
        style={{
          WebkitMaskImage: `url(#${maskId})`,
          maskImage: `url(#${maskId})`,
        }}
      >
        <div ref={patternRef} className="absolute inset-0 overflow-hidden">
          <CornerCircuits />
        </div>
      </div>

      <div
        ref={logoRef}
        className="pointer-events-none absolute inset-0 z-1 flex items-center justify-center opacity-0"
      >
        <img
          src={images.logo}
          alt={commonStrings.brand.logoAltShort}
          width={155}
          height={46}
          className="h-10 w-auto object-contain brightness-0 sm:h-12"
        />
      </div>
    </div>
  )
}
