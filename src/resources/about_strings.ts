export const aboutStrings = {
  hero: {
    eyebrow: 'About Steefo',
    titleLine1: 'A new standard',
    titleHighlight: 'since 1982.',
    leadBefore: 'Four decades of',
    leadHighlight: 'engineering excellence.',
    body: 'Steefo Engineering Corporation is a Government-recognized Star Export House and ISO 9001 certified manufacturer. We design, manufacture, and export rolling mill plants, equipment, and components that meet global standards — built in India, delivered worldwide.',
  },
  stats: {
    founded: { label: 'Founded', value: '1982' },
    location: { label: 'Location', value: 'India' },
  },
  story: {
    titleLine1: 'Our story,',
    titleLine2: 'our values',
  },
  values: {
    vision: {
      pill: 'Vision',
      title: 'Global leader in turnkey steel plant solutions.',
      body: 'Continuously investing in cutting-edge technology and skilled expertise.',
    },
    mission: {
      pill: 'Mission',
      title: 'Maximum satisfaction through Make in India.',
      body: 'Leading with unwavering dedication to quality, productivity, and customer satisfaction.',
    },
  },
  quality: {
    eyebrow: 'Who We Serve',
    titleBefore: 'Quality is Our',
    titleHighlight: 'Steel Manufacturers',
    body: 'We partner with visionary leaders to deliver machinery that drives scale, efficiency, and uncompromising quality.',
  },
  capabilities: {
    eyebrow: 'Core Capabilities',
    titleBefore: 'End-to-End ',
    titleHighlight: 'Solutions',
    titleAfter: ' with Endless Possibilities.',
    prevAriaLabel: 'Previous capabilities',
    nextAriaLabel: 'Next capabilities',
  },
  capabilityItems: {
    'custom-layout': {
      title: 'Custom Layout Planning',
      body: 'Tailored mill layouts designed to optimize space, enhance workflow efficiency, and maximize your TMT bar output.',
    },
    'efficient-commissioning': {
      title: 'Efficient Commissioning',
      body: 'Steefo ensures smooth commissioning with expert on-site guidance, reducing downtime and maximizing operational efficiency for our clients.',
    },
    'precision-manufacturing': {
      title: 'Precision Manufacturing',
      body: 'State-of-the-art machinery built with expert craftsmanship, guaranteeing heavy-duty performance that meets the highest international standards.',
    },
    'innovative-design': {
      title: 'Innovative Design Solutions',
      body: 'Integrating cutting-edge technology to drive the performance, efficiency, and long-term sustainability of your production systems.',
    },
  },
  leadership: {
    eyebrow: 'Leadership',
    titleBefore: 'Powered by innovators',
    titleMid: 'in ',
    titleHighlight: 'tech & engineering.',
  },
  team: {
    founder: { name: 'Name', role: 'Founder & Chairman' },
    director: { name: 'Name', role: 'Director' },
    engineering: { name: 'Name', role: 'Engineering' },
    'sales-1': { name: 'Name', role: 'Global Sales' },
    'sales-2': { name: 'Name', role: 'Global Sales' },
    'sales-3': { name: 'Name', role: 'Global Sales' },
  },
  awards: {
    eyebrow: 'Certifications & Awards',
    title: 'Awards & Recognitions',
    body: 'Steefo Engineering Corporation is committed to maintaining the highest standards of quality, credibility, and industry recognition.',
  },
  awardItems: {
    certification: {
      pill: 'Certification',
      title: 'ISO 9001:2008 Certified',
      body: 'Integrating cutting-edge technology to drive the performance, efficiency, and long-term sustainability of your production systems.',
    },
    government: {
      pill: 'Government',
      title: 'Star Export House',
      body: 'Recognized by the Government of India as a Star Export House — one of the highest export performance recognitions awarded to Indian exporters for sustained global trade excellence.',
    },
    rating: {
      pill: 'Rating',
      title: 'NSIC-CRISIL Rating 1A',
      body: 'Steefo has received the prestigious NSIC-CRISIL Rating 1A — affirming our financial credibility, performance capability, and standing as a trusted partner for large-scale steel plant projects.',
    },
  },
  quote: {
    before: 'Our commitment is to deliver world-class steel manufacturing solutions that ',
    highlight: 'empower our clients to achieve excellence',
    after: ' in their production capabilities.',
    role: 'Founder & CEO',
    company: 'Steefo Engineering Corporation',
  },
  heroMediaAriaLabel: 'Steefo Engineering manufacturing facility',
  qualityMediaAriaLabel: 'Quality section media placeholder',
  teamMediaAriaLabel: 'Team member photo placeholder',
  capabilityMediaAriaLabel: 'Capability image placeholder',
} as const

export type AboutStrings = typeof aboutStrings
export type AboutStatId = keyof typeof aboutStrings.stats
export type AboutValueId = keyof typeof aboutStrings.values
export type AboutCapabilityId = keyof typeof aboutStrings.capabilityItems
export type AboutTeamId = keyof typeof aboutStrings.team
export type AboutAwardId = keyof typeof aboutStrings.awardItems
