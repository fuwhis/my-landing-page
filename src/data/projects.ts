import type { ProjectItem } from '@/types/content';

export const projects: ProjectItem[] = [
  {
    title: 'Revenue Insights Dashboard',
    description:
      'A modular dashboard for executive teams to monitor conversion, retention, and revenue health in real time.',
    impact: 'Increased weekly active usage by 22% after redesign and performance improvements.',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Recharts'],
    href: '#',
    repoHref: '#',
  },
  {
    title: 'SaaS Marketing Platform',
    description:
      'A conversion-first marketing platform with CMS-backed content and reusable landing page sections.',
    impact: 'Improved lead form completion rate by 18% through UX iteration and A/B tests.',
    stack: ['Next.js', 'MDX', 'Tailwind CSS', 'Vercel'],
    href: '#',
    repoHref: '#',
  },
  {
    title: 'Design System Starter',
    description:
      'Internal design system starter featuring typed UI primitives, themes, and documentation for product squads.',
    impact: 'Reduced duplicated UI implementations across teams and improved consistency.',
    stack: ['React', 'TypeScript', 'Storybook', 'Vitest'],
    href: '#',
    repoHref: '#',
  },
];
