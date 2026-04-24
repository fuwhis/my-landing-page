import type { ExperienceItem } from '@/types/content'

export const experiences: ExperienceItem[] = [
  {
    company: 'Gia Phuoc Express',
    role: 'Frontend Developer',
    location: 'Ho Chi Minh City, Vietnam',
    period: 'May 2025 - Jan 2026',
    summary:
      'Developed the Express Management System for local freight transportation operations.',
    highlights: [
      'Built the frontend codebase from scratch using Vue 3 and Nuxt 3.',
      'Created a scalable, modular dashboard structure to support future feature growth.',
      'Improved Largest Contentful Paint by over 30%.',
      'Integrated REST APIs and maintained consistent data flow with Pinia.',
      'Used Tailwind CSS to keep styling modern and consistent.',
    ],
    technologies: ['Vue 3', 'Nuxt 3', 'Tailwind CSS', 'Pinia', 'Naive UI'],
  },
  {
    company: 'CloudSky Vietnam',
    role: 'Fullstack Developer',
    location: 'Ho Chi Minh City, Vietnam',
    period: 'Jan 2024 - May 2024',
    summary:
      'Contributed to MyLiking Portal and MyLiking Landing Page in an accessibility-focused product context.',
    highlights: [
      'Worked on SaaS-style browser-widget functionality focused on accessibility features.',
      'Researched requirements and compared existing solution approaches.',
      'Implemented lightweight browser-side behavior with Vanilla JavaScript.',
      'Contributed to frontend implementation and supporting backend/data work when needed.',
    ],
    technologies: ['JavaScript', 'HTML', 'CSS/SCSS', 'Django', 'Python'],
  },
  {
    company: 'BrickMate Group VN',
    role: 'Software Developer',
    location: 'Ho Chi Minh City, Vietnam',
    period: 'Mar 2022 - Sep 2023',
    summary:
      'Worked across multiple products including KNFT, BMG Color, ES-Shoe, and Main Content phase 1.',
    highlights: [
      'Built and improved frontend and admin products across different business domains.',
      'Worked with React, Next.js, TypeScript, Redux, GraphQL, Docker, and Svelte in plugin/tooling work.',
      'Contributed to responsive UI, API integration, and performance optimization.',
      'Improved code structure and maintainability through collaboration and review.',
    ],
    technologies: ['React', 'Next.js', 'TypeScript', 'Redux', 'GraphQL', 'Docker', 'Svelte'],
  },
  {
    company: 'FPT Software',
    role: 'Frontend Developer',
    location: 'Ho Chi Minh City, Vietnam',
    period: 'Apr 2021 - Mar 2022',
    summary: 'Participated in the Z-M360 project and delivered admin dashboard frontend features.',
    highlights: [
      'Built and maintained dashboard functionality for business operations.',
      'Integrated APIs and handled frontend state/data flow using Redux.',
      'Collaborated with team members to refine business logic and component behavior.',
      'Maintained implementation consistency through linting and structured frontend practices.',
    ],
    technologies: ['React', 'Ant Design', 'Redux', 'SCSS'],
  },
]
