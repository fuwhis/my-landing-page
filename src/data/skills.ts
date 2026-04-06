import type { SkillGroup } from '@/types/content';

export const skillGroups: SkillGroup[] = [
  {
    title: 'Frontend Engineering',
    items: ['JavaScript', 'TypeScript', 'React', 'Next.js', 'Vue 3', 'Nuxt 3', 'HTML', 'CSS', 'Tailwind CSS'],
  },
  {
    title: 'State & Data Flow',
    items: ['Redux Toolkit', 'Zustand', 'Recoil', 'Pinia', 'TanStack Query', 'GraphQL'],
  },
  {
    title: 'UI Systems',
    items: ['Ant Design', 'Material UI', 'Tailwind CSS'],
  },
  {
    title: 'Quality & Workflow',
    items: ['ESLint', 'Prettier', 'Vitest', 'Git', 'GitHub', 'GitLab', 'SourceTree'],
  },
  {
    title: 'AI-Augmented Workflow',
    items: [
      'ChatGPT',
      'Cursor IDE',
      'Prompt Engineering',
      'AI-assisted debugging',
      'AI-assisted refactoring',
      'Manual validation before production',
    ],
  },
];
