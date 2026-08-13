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
  description: string
  href: string
}

export type ProjectsConfig = {
  featured: FeaturedProject
  projects: ProjectItem[]
}

/**
 * Projects page data — Figma 1:3515
 * Images are placeholders in UI until assets are registered.
 * Home “top 5” = featured + first 4 grid items.
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
      description:
        'High-speed wire rod production with consistent metallurgical quality across diameters.',
      href: '#',
    },
    {
      id: 'ghana-induction-furnace',
      location: 'Ghana',
      year: '2024',
      title: 'Induction Furnace Plant',
      description:
        'Energy-efficient melting with precision temperature control and seamless casting integration.',
      href: '#',
    },
    {
      id: 'sri-lanka-section-mill',
      location: 'Sri Lanka',
      year: '2023',
      title: 'Section Mill',
      description:
        'Flexible section rolling configured for regional demand and long-term plant performance.',
      href: '#',
    },
    {
      id: 'ethiopia-tmt-rolling-mill',
      location: 'Ethiopia',
      year: '2021',
      title: 'TMT Rolling Mill',
      description:
        'High-yield TMT line engineered for reliable throughput and European-standard build quality.',
      href: '#',
    },
    {
      id: 'qatar-turnkey-steel-plant',
      location: 'Qatar',
      year: '2022',
      title: 'Turnkey Steel Plant',
      description:
        'End-to-end plant delivery — layout, manufacture, installation, and commissioning.',
      href: '#',
    },
    {
      id: 'rwanda-continuous-casting',
      location: 'Rwanda',
      year: '2024',
      title: 'Continuous Casting',
      description:
        'Precision casting systems built for uptime, quality, and easy integration with melt shop flow.',
      href: '#',
    },
  ],
}

/** Featured + first four grid projects for the home showcase carousel. */
export function getTopProjects(count = 5) {
  const { featured, projects } = projectsConfig
  return [featured, ...projects].slice(0, count)
}
