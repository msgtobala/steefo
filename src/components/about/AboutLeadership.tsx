import { Container } from '../common'
import { TeamMemberCard } from './TeamMemberCard'
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
  return (
    <section className={cn('mt-16 md:mt-24', className)}>
      <Container className="flex flex-col items-center text-center">
        <p className="text-eyebrow">{eyebrow}</p>
        <h2 className="mt-2 max-w-[1030px] font-display text-[clamp(2rem,5vw,4.5rem)] font-normal leading-[1.1] tracking-[-0.0556em] text-foreground">
          {titleBefore}
          <br />
          {titleMid}
          <span className="text-brand">{titleHighlight}</span>
        </h2>
      </Container>

      <Container className="relative mt-12 md:mt-16">
        <div className="relative hidden lg:block">
          <div className="relative overflow-visible px-2 py-2">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 overflow-visible"
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
                  <img
                    key={`plus-${left}-${top}`}
                    src={icons.plus}
                    alt=""
                    width={13.64}
                    height={13.64}
                    className="absolute z-10 size-[13.64px] -translate-x-1/2 -translate-y-1/2"
                    style={plusGridPlusStyle(left, top)}
                  />
                )),
              )}
            </div>

            <div className="relative z-[1] grid grid-cols-3 gap-x-12 gap-y-16 px-8 py-12">
              {members.map((member) => (
                <TeamMemberCard
                  key={member.id}
                  name={member.name}
                  role={member.role}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:hidden">
          {members.map((member) => (
            <TeamMemberCard
              key={member.id}
              name={member.name}
              role={member.role}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}
