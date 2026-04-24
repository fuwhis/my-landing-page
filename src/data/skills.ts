import type { SkillGroup } from '@/types/content'

export const skillGroups: SkillGroup[] = [
  {
    title: 'Frontend Engineering',
    items: ['JavaScript', 'TypeScript', 'React', 'Next.js', 'Vue 3', 'Nuxt 3', 'HTML', 'SCSS', 'Tailwind CSS'],
  },
  {
    title: 'State & Data Flow',
    items: ['Redux Toolkit', 'Zustand', 'Recoil', 'Pinia', 'TanStack Query', 'GraphQL'],
  },
  {
    title: 'UI Systems',
    items: ['Ant Design', 'Material UI', 'Shadcn UI', 'Tailwind CSS',],
  },
  {
    title: 'Quality & Workflow',
    items: ['ESLint', 'Prettier', 'Vitest', 'Git', 'GitHub', 'GitLab', 'SourceTree'],
  },
  {
    title: 'AI-Augmented Workflow',
    items: [
      'chatGPT',
      'Cursor IDE',
      'Prompt Engineering',
      'AI-assisted debugging',
      'AI-assisted refactoring',
      'Manual validation before production',
    ],
  },
  {
    title: 'Deployment & Infrastructure',
    items: ['AWS', 'Docker', 'Nginx', 'GitHub Actions'],
  },
]
