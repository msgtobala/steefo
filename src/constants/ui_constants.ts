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
    /** Google Maps embed — Steefo Engineering Corporation, Changodar. */
    mapsEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3674.824149543888!2d72.4457188!3d22.9198561!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e90dccc524883%3A0x805215a58a504fdd!2sSteefo%20Engineering%20Corporation%20-%20Rolling%20Mills%20Manufacturer!5e0!3m2!1sen!2sin!4v1786990114352!5m2!1sen!2sin',
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
