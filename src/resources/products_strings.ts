export const productsStrings = {
  hero: {
    productNumber: 'PRODUCT 01',
    title: 'Rolling Mill for TMT Bar',
    subtitle: 'High speed, automated lines for premium TMT bars production.',
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
  relatedItems: {
    'rolling-mill-sections': { title: 'Rolling Mill for Sections' },
    'induction-furnaces': { title: 'Induction Furnaces' },
    'continuous-casting': { title: 'Continuous Casting Machines' },
  },
  heroMediaAriaLabel: 'Product hero image placeholder',
  featuresMediaAriaLabel: 'Product features image',
  galleryMediaAriaLabel: 'Product gallery image placeholder',
  relatedMediaAriaLabel: 'Related product image placeholder',
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
export type ProductSpecId = keyof typeof productsStrings.specs
export type ProductWhyItemId = keyof typeof productsStrings.whyItems
export type ProductRelatedItemId = keyof typeof productsStrings.relatedItems
