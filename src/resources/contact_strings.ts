export const contactStrings = {
  eyebrow: 'Contact',
  heroTitle: 'Let’s Talk',
  reachOutHeading: 'Reach out on your terms',
  officeHeading: 'Office',
  phoneLabel: 'Phone:',
  emailLabel: 'Email:',
  formHeading: 'Tell us about you',
  mapHeading: 'Find us',
  mapTitle: 'Map of Steefo Engineering Corporation, Changodar, Ahmedabad',
  fields: {
    fullName: 'Full Name',
    email: 'Email Address',
    phone: 'Phone Number',
    company: 'Company / Organization',
    projectType: 'Project Type',
    message: 'Message / Inquiry',
  },
  submit: 'Submit Inquiry',
  mailSubject: 'Steefo inquiry',
} as const

export type ContactStrings = typeof contactStrings
