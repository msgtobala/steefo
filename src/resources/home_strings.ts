export const homeStrings = {
  hero: {
    titleLine1: 'Engineering the backbone',
    titleLine2: 'of modern steel.',
    mediaAriaLabel: 'Steefo manufacturing facility',
  },
  intro: {
    titleLine1: 'through every',
    titleLine2: 'mill we build.',
    subtitleLine1: 'Precision',
    subtitleLine2: 'manufacturing',
    subtitleLine3: 'that powers nations.',
  },
  mission: {
    eyebrow: 'SINCE 1982',
    titleBefore: 'Beyond equipment.',
    titleHighlight1: 'Engineering',
    titleHighlight2: 'steel',
    titleAfter: ' for generations.',
    body: 'Government-recognized Star Export House. ISO 9001 certified. NSIC-CRISIL 1A rated.',
    aboutCta: 'About Steefo',
    contactCta: 'Contact Us',
  },
  stats: {
    ariaLabel: 'Steefo by the numbers',
    items: [
      { value: '45+', label: 'YEARS OF LEGACY' },
      { value: '15+', label: 'COUNTRIES SERVED' },
      { value: '200+', label: 'PLANTS DELIVERED' },
      { value: 'ISO', label: '9001 • STAR EXPORT' },
    ],
  },
  deliver: {
    eyebrow: 'WHAT WE DELIVER',
    mediaAriaLabel: 'Delivery capability visual',
    items: {
      design: {
        index: '01',
        title: 'In-house design & manufacturing',
      },
      standards: {
        index: '02',
        title: 'Built to European standards',
      },
      turnkey: {
        index: '03',
        title: 'Turnkey — layout to commissioning',
      },
      configurable: {
        index: '04',
        title: 'Configurable to your production',
      },
      support: {
        index: '05',
        title: 'After-sales support & spares',
      },
      proven: {
        index: '06',
        title: 'Proven across 15+ countries',
      },
    },
  },
  brand: {
    lead: 'That’s',
    titleLine1: 'Steefo',
    titleLine2: 'Engineering.',
  },
  projects: {
    eyebrow: 'OUR PROJECTS',
    titleBefore: 'Core ',
    titleHighlight: 'Project ',
    titleAfter: 'Line',
    body: 'Explore plants delivered across 15+ countries — turnkey rolling mills, furnaces, and casting lines engineered for reliable, round-the-clock production.',
    viewAll: 'View All',
    knowMore: 'Know More',
    prevAriaLabel: 'Previous projects',
    nextAriaLabel: 'Next projects',
    mediaAriaLabel: 'Project image placeholder',
  },
  partners: {
    eyebrow: 'ABOUT OUR GLOBAL IMPACT',
    titleBefore: 'Trusted by steel manufacturers',
    titleHighlight: 'across 4 continents.',
  },
} as const

export type HomeStrings = typeof homeStrings
export type HomeDeliverItemId = keyof typeof homeStrings.deliver.items
