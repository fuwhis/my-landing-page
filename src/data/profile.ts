import type { Profile } from '@/types/content'

export const profile: Profile = {
  fullName: 'Nguyen Phu Quy',
  role: 'Frontend Engineer', // | 'Developer'
  tagline: 'Building high-converting products with scalable frontend architecture',
  location: 'Ho Chi Minh City, Vietnam',
  email: 'quynguyen.itengineer@gmail.com',
  availability: 'Open to frontend engineering opportunities on product-focused teams',
  summary:
    'Experienced across React, Vue, Next.js, and Nuxt.js with a strong focus on performance, maintainable UI architecture, and responsive user-centric interfaces.',
  aboutParagraphs: [
    'I am a Frontend Engineer with 4+ years of experience building dynamic web products, admin dashboards, and business-focused interfaces across React and Vue ecosystems.',
    'My approach emphasizes maintainability, performance optimization, and clear UX behavior. I adapt quickly to new technologies and use AI-assisted workflows to speed up debugging, refactoring, and implementation while validating outputs carefully before production.',
  ],
  contactTitle: 'Open to frontend engineering opportunities',
  contactDescription:
    'Interested in scalable web applications and product-focused frontend roles. Contact actions below are placeholders and can be replaced with final links anytime.',
  socialLinks: [
    { label: 'GitHub', href: 'https://github.com/fuwhis' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/quynp01' },
    { label: 'Resume', href: 'https://www.topcv.vn/xem-cv/DlcDDldUUVRZCwcHUFhUWg0DCwsOVlRUA1BfAg7ae4' },
  ],
  metrics: [
    { label: 'Years Experience', value: '4+', description: 'B2B and B2C products' },
    { label: 'Projects Shipped', value: '3+', description: 'From MVP to scale-up' },
    // { label: 'Lighthouse Score', value: '95+', description: 'Across key landing pages' },
    { label: 'Performance Impact', value: '30%', description: 'LCP improvement on production project' },
  ],
}
