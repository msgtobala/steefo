import type {
  AboutCapabilityId,
  AboutStatId,
  AboutTeamId,
  AboutValueId,
} from '../../resources/about_strings'
import type { ImageKey } from '../../resources/images'
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
  image: ImageKey
}

export type AboutTeamConfig = {
  id: AboutTeamId
  image?: ImageKey
}

export type AboutAwardConfig = {
  id: string
  image: ImageKey
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
  { id: 'custom-layout', icon: 'handyman', image: 'capability01' },
  { id: 'efficient-commissioning', icon: 'ruleSettings', image: 'capability02' },
  { id: 'precision-manufacturing', icon: 'designServices', image: 'capability03' },
  { id: 'innovative-design', icon: 'verifiedUser', image: 'capability04' },
]

/** Leadership single row — 3 tiles (sales row removed) */
export const aboutTeam: AboutTeamConfig[] = [
  { id: 'suresh-agrawal', image: 'innovatorSureshAgrawal' },
  { id: 'suril-agarwal', image: 'innovatorSurilAgarwal' },
  { id: 'engineering' },
]

/** Awards gallery — award_1 … award_9 */
export const aboutAwards: AboutAwardConfig[] = [
  { id: 'award-1', image: 'award01' },
  { id: 'award-2', image: 'award02' },
  { id: 'award-3', image: 'award03' },
  { id: 'award-4', image: 'award04' },
  { id: 'award-5', image: 'award05' },
  { id: 'award-6', image: 'award06' },
  { id: 'award-7', image: 'award07' },
  { id: 'award-8', image: 'award08' },
  { id: 'award-9', image: 'award09' },
]
