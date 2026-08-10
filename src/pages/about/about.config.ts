import type {
  AboutAwardId,
  AboutCapabilityId,
  AboutStatId,
  AboutTeamId,
  AboutValueId,
} from '../../resources/about_strings'
import type { IconKey } from '../../resources/icons'

export type AboutStatConfig = {
  id: AboutStatId
  variant: 'light' | 'brand'
}

export type AboutValueConfig = {
  id: AboutValueId
}

export type AboutCapabilityConfig = {
  id: AboutCapabilityId
  icon: IconKey
}

export type AboutTeamConfig = {
  id: AboutTeamId
}

export type AboutAwardConfig = {
  id: AboutAwardId
  tone: 'dark' | 'brand'
}

/** Hero overlay stats — Figma About 1:3061 / 1:3064 */
export const aboutStats: AboutStatConfig[] = [
  { id: 'founded', variant: 'light' },
  { id: 'location', variant: 'brand' },
]

/** Vision / Mission — Figma About story band */
export const aboutValues: AboutValueConfig[] = [
  { id: 'vision' },
  { id: 'mission' },
]

/** Capabilities row — Figma 1:3175 */
export const aboutCapabilities: AboutCapabilityConfig[] = [
  { id: 'custom-layout', icon: 'handyman' },
  { id: 'efficient-commissioning', icon: 'ruleSettings' },
  { id: 'precision-manufacturing', icon: 'designServices' },
  { id: 'innovative-design', icon: 'verifiedUser' },
]

/** Leadership 3×2 grid — Figma 1:3074 / 1:3090 */
export const aboutTeam: AboutTeamConfig[] = [
  { id: 'founder' },
  { id: 'director' },
  { id: 'engineering' },
  { id: 'sales-1' },
  { id: 'sales-2' },
  { id: 'sales-3' },
]

/** Awards row — Figma 1:3181–1:3183 */
export const aboutAwards: AboutAwardConfig[] = [
  { id: 'certification', tone: 'dark' },
  { id: 'government', tone: 'brand' },
  { id: 'rating', tone: 'dark' },
]
