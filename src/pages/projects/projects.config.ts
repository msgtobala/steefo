export type FeaturedProject = {
  id: string
  location: string
  year: string
  title: string
  description: string
  href: string
}

export type ProjectItem = {
  id: string
  location: string
  year: string
  title: string
  href: string
}

export type ProjectsConfig = {
  featured: FeaturedProject
  projects: ProjectItem[]
}

/**
 * Projects page data — Figma 1:3515
 * Images are placeholders in UI until assets are registered.
 */
export const projectsConfig: ProjectsConfig = {
  featured: {
    id: 'bangladesh-500-tpd-tmt',
    location: 'Bangladesh',
    year: '2023',
    title: '500 TPD TMT Rolling Mill',
    description:
      'Complete turnkey delivery from custom layout planning to final commissioning. Operational within 6 months.',
    href: '#',
  },
  projects: [
    {
      id: 'saudi-arabia-wire-rod',
      location: 'Saudi Arabia',
      year: '2022',
      title: 'Wire Rod Line',
      href: '#',
    },
    {
      id: 'ghana-induction-furnace',
      location: 'Ghana',
      year: '2024',
      title: 'Induction Furnace Plant',
      href: '#',
    },
    {
      id: 'sri-lanka-section-mill',
      location: 'Sri Lanka',
      year: '2023',
      title: 'Section Mill',
      href: '#',
    },
    {
      id: 'ethiopia-tmt-rolling-mill',
      location: 'Ethiopia',
      year: '2021',
      title: 'TMT Rolling Mill',
      href: '#',
    },
    {
      id: 'qatar-turnkey-steel-plant',
      location: 'Qatar',
      year: '2022',
      title: 'Turnkey Steel Plant',
      href: '#',
    },
    {
      id: 'rwanda-continuous-casting',
      location: 'Rwanda',
      year: '2024',
      title: 'Continuous Casting',
      href: '#',
    },
  ],
}
