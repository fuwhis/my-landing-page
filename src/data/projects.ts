import type { ProjectItem } from '@/types/content'

export const projects: ProjectItem[] = [
  {
    title: 'Gia Phuoc Express',
    category: 'Admin Dashboard / Logistics',
    description:
      'A web-based admin dashboard for local freight transportation operations across stations, including shipment registration, customer management, and shipping fee calculation.',
    impact:
      'Built the frontend from scratch, improved LCP by 30%+, and designed a scalable architecture for growth.',
    stack: ['Vue 3', 'Nuxt 3', 'Pinia', 'Tailwind CSS', 'Naive UI'],
  },
  {
    title: 'MyLiking',
    category: 'Browser Widget / Accessibility',
    description:
      'A SaaS-style browser widget and related portal/landing page focused on improving website accessibility through embeddable client-side features.',
    impact:
      'Implemented lightweight browser-side functionality and contributed to accessibility-oriented feature research.',
    stack: ['JavaScript', 'HTML', 'CSS/SCSS', 'Django', 'Python'],
  },
  {
    title: 'ES-Shoe',
    category: 'Admin Dashboard / Footwear Tech',
    description:
      'A web-based admin dashboard used to manage feet measurement data for a mobile-first shoe ordering experience.',
    impact:
      'Built polished admin UI, integrated APIs with Redux-based state flow, and supported deployment consistency with Docker.',
    stack: ['React', 'TypeScript', 'Redux', 'Ant Design', 'Docker', 'SCSS'],
  },
  {
    title: 'KNFT - Kumho NFT',
    category: 'Web Platform / Blockchain',
    description:
      'A blockchain-related web platform focused on NFT marketplace functionality in an e-commerce-oriented context.',
    impact: 'Built responsive frontend features, improved load time by over 30%, and used GraphQL-driven rendering.',
    stack: ['React', 'Next.js', 'Redux', 'GraphQL', 'Docker', 'Ant Design'],
  },
  {
    title: 'BMG Color',
    category: 'Design Tooling / Figma Plugin',
    description: 'A Figma plugin to manage and reuse design kits for better team workflow.',
    impact:
      'Expanded plugin features, refactored architecture with Svelte and Rollup, and improved loading performance.',
    stack: ['TypeScript', 'Svelte', 'Rollup', 'SCSS', 'HTML'],
  },
]
