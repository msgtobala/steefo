/**
 * Shared UI copy — header, footer, CTAs, a11y labels.
 * Page-specific copy lives in `*_strings.ts`.
 */
export const commonStrings = {
  brand: {
    logoAlt: 'Steefo Engineering Corporation — Shaping the future of steel',
    logoAltShort: 'Steefo Engineering Corporation',
    homeAriaLabel: 'Steefo home',
  },

  nav: {
    mainAriaLabel: 'Main',
    aboutUs: 'About us',
    productsAndSolutions: 'Products & Solutions',
    projects: 'Projects',
    insights: 'Insights',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
  },

  cta: {
    letsTalk: 'Let’s talk',
    letsTalkAriaLabel: "Let's talk",
    getAQuote: 'GET A QUOTE',
  },

  /** Shared mid-page “Ready to Build” banner — Insights / Projects */
  subscribe: {
    titleBefore: 'Ready to Build ',
    titleHighlight: 'Your Steel Plant?',
    body: "Partner with India's most trusted heavy machinery manufacturer.",
    emailPlaceholder: 'Your Email Address',
    submit: 'Submit',
    mailSubject: 'Steel plant inquiry',
    bannerAriaLabel: 'Steel plant worker at machinery',
  },

  footer: {
    addressLabel: 'Address',
    phoneLabel: 'Phone',
    emailLabel: 'Email',
    copyright: 'All Rights reserved by Steefo',
    primaryNavAriaLabel: 'Footer',
    legalNavAriaLabel: 'Legal',
    facebookAriaLabel: 'Facebook',
    instagramAriaLabel: 'Instagram',
    whatsappAriaLabel: 'Chat on WhatsApp',
    whatsappMessage:
      'Hello Steefo Team\n\nWe would like to know more about your products and services.\n\nLooking forward to your response.\n\nThank you',
    headline: {
      before: 'Your ',
      highlight: 'next steel',
      after: 'plant starts today.',
    },
    primaryLinks: {
      home: 'Home',
      aboutUs: 'About us',
      products: 'Products',
      blog: 'Blog',
      contactUs: 'Contact Us',
    },
    secondaryLinks: {
      career: 'Career',
      terms: 'Terms',
      privacy: 'Privacy Policy',
      disclaimer: 'Disclaimer',
    },
  },
} as const

export type CommonStrings = typeof commonStrings
