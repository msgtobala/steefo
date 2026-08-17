/**
 * Non-copy UI constants — contact details, routes, social URLs.
 * Display labels live in `resources/*_strings`.
 */
export const uiConstants = {
  company: {
    name: 'Steefo',
    legalName: 'Steefo Engineering Corporation',
  },

  contact: {
    phones: ['+91-98240-32959', '+91-98258-05793'] as const,
    email: 'info@steefo.com',
    addressLines: [
      '495, Tajpur Road, Sarkhej-Bavla Highway, Changodar,',
      'Ahmedabad - 382210',
      'Gujarat, India.',
    ] as const,
    /** Compact office block on Contact page (Figma 1:3890). */
    officeAddressLines: [
      '495, Tajpur Road, Changodar',
      'Ahmedabad 382210, Gujarat, India',
    ] as const,
  },

  social: {
    facebook: 'https://www.facebook.com/SteefoEngineeringCorporation/',
    instagram: 'https://www.instagram.com/steefoengineering/',
    /** WhatsApp Web (Business) click-to-chat — first office number, digits only. */
    whatsapp: 'https://web.whatsapp.com/send?phone=919824032959',
  },

  routes: {
    home: '/',
    about: '/about',
    products: '/products',
    projects: '/projects',
    insights: '/insights',
    careers: '/careers',
    contact: '/contact',
    terms: '/terms',
    privacy: '/privacy',
    disclaimer: '/disclaimer',
  },
} as const

export type UiConstants = typeof uiConstants
