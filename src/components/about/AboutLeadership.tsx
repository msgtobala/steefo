import { useRef } from 'react'
import { Container, SpotlightCell } from '../common'
import { TeamMemberCard } from './TeamMemberCard'
import { usePlusPulse } from '../../hooks/usePlusPulse'
import { icons } from '../../resources/icons'
import {
  cn,
  PLUS_GRID_H_LINES,
  PLUS_GRID_V_LINES,
  plusGridHLineStyle,
  plusGridPlusStyle,
  plusGridVLineStyle,
} from '../../utils'

export type AboutTeamMember = {
  id: string
  name: string
  role: string
}

export type AboutLeadershipProps = {
  eyebrow: string
  titleBefore: string
  titleMid: string
  titleHighlight: string
  members: AboutTeamMember[]
  className?: string
}

const LINE_OVERHANG_PX = 48

/**
 * Leadership grid — Figma About 1:3053 / team cards + plus grid
 */
export function AboutLeadership({
  eyebrow,
  titleBefore,
  titleMid,
  titleHighlight,
  members,
  className,
}: AboutLeadershipProps) {
  const sectionRef = useRef<HTMLElement>(null)
  usePlusPulse(sectionRef)

  return (
    <section
      ref={sectionRef}
      className={cn('mt-16 md:mt-24', className)}
      data-animate-section
    >
      <Container className="flex flex-col items-center text-center">
        <p className="text-eyebrow" data-animate="up">
          {eyebrow}
        </p>
        <h2
          className="mt-2 max-w-[1030px] font-display text-[clamp(2rem,5vw,4.5rem)] font-normal leading-[1.1] tracking-[-0.0556em] text-foreground"
          data-animate="up"
        >
          {titleBefore}
          <br />
          {titleMid}
          <span className="text-brand">{titleHighlight}</span>
        </h2>
      </Container>

      <Container className="relative mt-12 md:mt-16">
        <div className="relative hidden lg:block">
          <div className="relative overflow-visible">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-10 overflow-visible"
              data-animate="scale"
            >
              {PLUS_GRID_H_LINES.map((top) => (
                <img
                  key={`h-${top}`}
                  src={icons.gridLine}
                  alt=""
                  className="absolute h-px max-w-none -translate-y-1/2"
                  style={plusGridHLineStyle(top, LINE_OVERHANG_PX)}
                />
              ))}
              {PLUS_GRID_V_LINES.map((left) => (
                <img
                  key={`v-${left}`}
                  src={icons.gridLineV}
                  alt=""
                  className="absolute w-px max-w-none -translate-x-1/2"
                  style={plusGridVLineStyle(left, LINE_OVERHANG_PX)}
                />
              ))}
              {PLUS_GRID_H_LINES.flatMap((top) =>
                PLUS_GRID_V_LINES.map((left) => (
                  <div
                    key={`plus-${left}-${top}`}
                    className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
                    style={plusGridPlusStyle(left, top)}
                  >
                    <img
                      data-plus-pulse
                      src={icons.plus}
                      alt=""
                      width={13.64}
                      height={13.64}
                      className="block size-[13.64px] max-w-none"
                    />
                  </div>
                )),
              )}
            </div>

            <div
              className="relative z-[1] grid grid-cols-3 grid-rows-2"
              data-animate-stagger
            >
              {members.map((member) => (
                <SpotlightCell key={member.id}>
                  <TeamMemberCard
                    name={member.name}
                    role={member.role}
                    className="h-full justify-center px-8 py-12"
                    data-animate="up"
                  />
                </SpotlightCell>
              ))}
            </div>
          </div>
        </div>

        <div
          className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:hidden"
          data-animate-stagger
        >
          {members.map((member) => (
            <TeamMemberCard
              key={member.id}
              name={member.name}
              role={member.role}
              data-animate="up"
            />
          ))}
        </div>
      </Container>
    </section>
  )
}
