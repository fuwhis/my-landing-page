import type { ExperienceItem } from '@/types/content'

export const experiences: ExperienceItem[] = [
  {
    company: 'NovaCommerce',
    role: 'Frontend Engineer',
    location: 'Ho Chi Minh City, Vietnam',
    period: '2023 - Present',
    summary:
      'Leading the frontend architecture for a multi-tenant commerce dashboard used by enterprise merchants.',
    highlights: [
      'Built reusable analytics modules that reduced feature delivery time by 30%.',
      'Migrated legacy pages to App Router patterns and improved route-level performance.',
      'Collaborated with design and backend teams to define stable API contracts.',
    ],
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'GSAP'],
  },
  {
    company: 'PixelForge Studio',
    role: 'Frontend Developer',
    location: 'Remote',
    period: '2021 - 2023',
    summary:
      'Delivered polished marketing websites and product surfaces for SaaS startups across APAC.',
    highlights: [
      'Created a shared component library that improved visual consistency across clients.',
      'Optimized Core Web Vitals and cut Largest Contentful Paint by up to 40%.',
      'Set up frontend quality gates using linting, type-checking, and CI workflows.',
    ],
    technologies: ['React', 'Next.js', 'Framer Motion', 'Storybook'],
  },
]
