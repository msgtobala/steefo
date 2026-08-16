import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import { gsap, prefersReducedMotion, registerGsap } from '../../lib/gsap'
import { cn } from '../../utils'

export type TypewriterCtaProps = {
  text: string
  to: string
  className?: string
}

/**
 * Footer CTA — full label at rest; brand-red block cursor types on hover/focus.
 */
export function TypewriterCta({ text, to, className }: TypewriterCtaProps) {
  const rootRef = useRef<HTMLAnchorElement>(null)
  const tweenRef = useRef<gsap.core.Tween | null>(null)
  const chars = Array.from(text.toUpperCase())
  const [revealed, setRevealed] = useState(chars.length)
  const [cursorAt, setCursorAt] = useState(-1)

  function showIdle() {
    tweenRef.current?.kill()
    tweenRef.current = null
    setRevealed(chars.length)
    setCursorAt(-1)
  }

  function playTypewriter() {
    if (prefersReducedMotion()) return
    if (tweenRef.current?.isActive()) return

    tweenRef.current?.kill()
    const n = chars.length
    setRevealed(0)
    setCursorAt(0)

    const state = { step: 0 }
    let last = -1

    tweenRef.current = gsap.to(state, {
      step: n,
      duration: Math.max(0.55, n * 0.07),
      ease: 'none',
      onUpdate: () => {
        const i = Math.min(n - 1, Math.floor(state.step))
        if (i === last) return
        last = i
        setRevealed(i + 1)
        setCursorAt(i)
      },
      onComplete: () => {
        setRevealed(n)
        setCursorAt(-1)
      },
    })
  }

  useGSAP(() => {
    registerGsap()
    return () => tweenRef.current?.kill()
  }, { scope: rootRef })

  return (
    <Link
      ref={rootRef}
      to={to}
      className={cn(
        'inline-flex font-sans text-sm font-semibold uppercase leading-none tracking-[0.18em] text-white',
        className,
      )}
      data-footer-cta
      onMouseEnter={playTypewriter}
      onMouseLeave={showIdle}
      onFocus={playTypewriter}
      onBlur={showIdle}
    >
      <span className="relative inline-flex border-b border-white pb-1">
        {chars.map((char, index) => {
          const show = index < revealed
          const cursor = index === cursorAt
          return (
            <span
              key={`${char}-${index}`}
              className="relative inline-block min-w-[0.65em] text-center"
              aria-hidden
            >
              <span className={show && !cursor ? 'visible' : 'invisible'}>
                {char === ' ' ? '\u00a0' : char}
              </span>
              {cursor ? (
                <span className="pointer-events-none absolute inset-x-0 -inset-y-0.5 bg-brand" />
              ) : null}
            </span>
          )
        })}
        <span className="sr-only">{text}</span>
      </span>
    </Link>
  )
}
