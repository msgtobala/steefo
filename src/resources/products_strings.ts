export const productsStrings = {
  listing: {
    eyebrow: 'Products',
    title: 'Built for scale.',
  },
  catalog: {
    'rolling-mill-tmt-bar': {
      title: 'Rolling Mill for TMT Bar',
      excerpt:
        'High speed, automated lines for premium TMT bars production.',
    },
    'rolling-mill-section': {
      title: 'Rolling Mill for Section',
      excerpt:
        'Flexible section mills configured for beams, channels, and angles.',
    },
    'induction-furnaces': {
      title: 'Induction Furnaces',
      excerpt: 'Energy-efficient melting with precision temperature control.',
    },
    'wire-rod-lines': {
      title: 'Wire Rod Lines',
      excerpt:
        'High-speed wire rod production with consistent metallurgical quality.',
    },
    'turnkey-solutions-for-steel-plants': {
      title: 'Turnkey Solutions For Steel Plants',
      excerpt:
        'End-to-end plant solutions from layout planning to commissioning.',
    },
  },
  features: {
    eyebrow: 'OVERVIEW',
    titleBefore: 'Built for scale. ',
    titleHighlight: 'Engineered for precision.',
    body: 'Designed for high throughput and consistent metallurgical quality across bar sizes. Every line is engineered for reliability, efficiency, and long-term plant performance.',
  },
  specs: {
    capacity: { label: 'Capacity', value: '500 TPD' },
    'bar-size': { label: 'Bar Size', value: '8—32mm' },
    speed: { label: 'Speed', value: '105 m/s' },
    standard: { label: 'Standard', value: 'IS/BS/EU' },
  },
  why: {
    eyebrow: 'Why Choose Us',
    title: 'What sets it apart.',
  },
  whyItems: {
    'continuous-flow': {
      title: 'Continuous production flow',
      body: 'From input to finished product without interruption.',
    },
    'in-house-design': {
      title: 'In-house designed components',
      body: 'Precision-engineered for superior consistency.',
    },
    'automated-controls': {
      title: 'Automated controls',
      body: 'Integrated automation for optimal performance.',
    },
    'low-maintenance': {
      title: 'Low maintenance design',
      body: 'Fewer moving parts, longer service intervals.',
    },
    'modular-config': {
      title: 'Modular configuration',
      body: 'Adaptable to your specific requirements.',
    },
    'global-compliance': {
      title: 'Global compliance',
      body: 'Meets IS, BS, ASTM, and European standards.',
    },
  },
  interest: {
    title: 'Interested in this product?',
    body: 'Get a detailed technical proposal and pricing customized for your plant capacity.',
  },
  related: {
    eyebrow: 'Related Products',
    title: 'You may also need',
  },
  readMore: 'Read More',
  cardMediaAriaLabel: 'Product image',
  heroMediaAriaLabel: 'Product hero image',
  featuresMediaAriaLabel: 'Product features image',
  galleryMediaAriaLabel: 'Product gallery image placeholder',
  relatedMediaAriaLabel: 'Related product image',
  relatedPrevAriaLabel: 'Previous related products',
  relatedNextAriaLabel: 'Next related products',
  requestQuote: 'Request a Quote →',
  contactUs: 'Contact Us',
  detailsTitle: 'Product Details',
  detailsDescription: (productId: string) =>
    `Details for product ${productId}. This is the product details page placeholder.`,
  backToProducts: 'Back to products',
} as const

export type ProductsStrings = typeof productsStrings
export type ProductCatalogId = keyof typeof productsStrings.catalog
export type ProductSpecId = keyof typeof productsStrings.specs
export type ProductWhyItemId = keyof typeof productsStrings.whyItems
