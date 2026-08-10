import type { InsightCardSize } from '../../components/insights/InsightCard'
import type { ImageKey } from '../../resources/images'

export type InsightArticle = {
  id: string
  category: string
  readTime: string
  title: string
  excerpt: string
  image: ImageKey
  href: string
  size: InsightCardSize
}

/**
 * Insights article grid — Figma 14:3343
 * Rows: third+twoThirds · third×3 · twoThirds+third
 */
export const insightArticles: InsightArticle[] = [
  {
    id: 'turnkey-rolling-mill',
    category: 'Blog',
    readTime: '5 Min',
    title: 'What makes a rolling mill truly turnkey?',
    excerpt:
      'A turnkey mill is more than equipment — it’s a fully integrated production ecosystem designed for reliability from day one.',
    image: 'insight01',
    href: '#',
    size: 'third',
  },
  {
    id: 'bangladesh-500-tpd',
    category: 'Case Study',
    readTime: '8 Min',
    title: '500 TPD plant in Bangladesh — start to finish.',
    excerpt:
      'See how Steefo delivered a complete rolling mill from concept to production. A story of engineering precision, speed, and execution excellence.',
    image: 'insight02',
    href: '#',
    size: 'twoThirds',
  },
  {
    id: 'choose-right-mill',
    category: 'Guide',
    readTime: '6 Min',
    title: 'The Art of Craftsmanship: Behind AKFD’s Design Philosophy',
    excerpt:
      'The right mill depends on your product mix, scale, and future growth plans — here’s how to evaluate the fit.',
    image: 'insight03',
    href: '#',
    size: 'third',
  },
  {
    id: 'in-house-design',
    category: 'Blog',
    readTime: '4 Min',
    title: 'Why in-house design matters for quality.',
    excerpt:
      'Designing and manufacturing under one roof ensures better precision and reliability across every stage of the build.',
    image: 'insight04',
    href: '#',
    size: 'third',
  },
  {
    id: 'plant-execution',
    category: 'Blog',
    readTime: '4 Min',
    title: 'Why in-house design matters for quality.',
    excerpt:
      'Designing and manufacturing under one roof ensures better precision and reliability across every stage of the build.',
    image: 'insight05',
    href: '#',
    size: 'third',
  },
  {
    id: 'hot-mill-delivery',
    category: 'Case Study',
    readTime: '8 Min',
    title: '500 TPD plant in Bangladesh — start to finish.',
    excerpt:
      'See how Steefo delivered a complete rolling mill from concept to production. A story of engineering precision, speed, and execution excellence.',
    image: 'insight06',
    href: '#',
    size: 'twoThirds',
  },
  {
    id: 'quality-systems',
    category: 'Blog',
    readTime: '4 Min',
    title: 'Why in-house design matters for quality.',
    excerpt:
      'Designing and manufacturing under one roof ensures better precision and reliability across every stage of the build.',
    image: 'insight07',
    href: '#',
    size: 'third',
  },
]
