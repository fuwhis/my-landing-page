import type { Profile } from '@/types/content'

export const profile: Profile = {
  fullName: 'Fuwhis Nguyen',
  role: 'Senior Frontend Engineer',
  tagline: 'Building high-converting products with scalable frontend architecture',
  location: 'Ho Chi Minh City, Vietnam',
  email: 'fuwhis.nguyen@gmail.com',
  availability: 'Open to senior IC roles and product-focused teams',
  summary:
    'Frontend engineer with 4+ years delivering production web applications. I focus on performance, design systems, and maintainable component architecture to move quickly without sacrificing quality.',
  socialLinks: [
    { label: 'GitHub', href: 'https://github.com/fuwhis' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
    { label: 'Resume', href: '#' },
  ],
  metrics: [
    { label: 'Years Experience', value: '4+', description: 'B2B and B2C products' },
    { label: 'Projects Shipped', value: '18+', description: 'From MVP to scale-up' },
    { label: 'Lighthouse Score', value: '95+', description: 'Across key landing pages' },
  ],
}
