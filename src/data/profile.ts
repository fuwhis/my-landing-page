import type { Profile } from '@/types/content';

export const profile: Profile = {
  fullName: 'Nguyen Phu Quy',
  role: 'Frontend Engineer', // | 'Developer'
  tagline: 'Code today, ship our futures.',
  location: 'Ho Chi Minh City, Vietnam',
  email: 'quynguyen.itengineer@gmail.com',
  resumeHref: '/resume/nguyen-phu-quy-cv.pdf',
  availability:
    'Open to Front-end Engineering opportunities on product-focused teams',
  summary:
    "Hi — I'm Quy (Fuwhis). I build frontend for real products: clear for users, kind to the people who maintain it.",
  heroTypewriterLines: [
    "Hi 👋 I'm Quy Nguyen (Fuwhis).",
    'Code today, ship our futures.',
  ],
  aboutParagraphs: [
    {
      segments: [
        {
          kind: 'text',
          text: "I've been a frontend engineer for ",
        },
        {
          kind: 'highlight',
          text: '4+ years',
        },
        {
          kind: 'text',
          text: ' — shipping product UIs, admin dashboards, and the everyday tools teams actually rely on. Most days that means React, Vue, Next.js, and Nuxt: different stacks, same craft — ',
        },
        {
          kind: 'highlight',
          text: 'interfaces that feel clear and hold up in production',
        },
        {
          kind: 'text',
          text: '.',
        },
      ],
    },
    {
      segments: [
        {
          kind: 'text',
          text: 'I care more about maintainable code, snappy pages, and honest UX than about sounding clever on a portfolio. I pick up new tools quickly, and I use AI to move faster on debugging and refactors — then I read the output carefully before anything ships.',
        },
      ],
    },
  ],
  contactTitle: 'Open to Front-end Engineering opportunities',
  contactDescription:
    'I usually respond within 24 hours. Feel free to reach out via LinkedIn or Email for Frontend roles, project collaboration, or technical discussion.',
  socialLinks: [
    {
      label: 'GitHub',
      href: 'https://github.com/fuwhis',
      icon: 'github',
      visible: true,
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/fuwhis',
      icon: 'linkedin',
      visible: true,
    },
    {
      label: 'View my CV',
      href: '/resume/nguyen-phu-quy-cv.pdf',
      icon: 'cv',
      visible: true,
    },
    // {
    //   label: 'Contact me',
    //   href: '#contact-form',
    //   icon: 'mail',
    //   visible: false,
    // },
    // Replace href with a specific AWS or Azure badge URL when published.
    {
      label: 'Credly Badge',
      href: 'https://www.credly.com',
      icon: 'credly',
      visible: false,
    },
  ],
  metrics: [
    {
      label: 'Years Experience',
      value: '4+',
      description: 'B2B and B2C products',
    },
    {
      label: 'Projects Shipped',
      value: '3+',
      description: 'From MVP to scale-up',
    },
    // {
    //   label: 'Lighthouse Score',
    //   value: '95+',
    //   description: 'Across key landing pages',
    // },
    {
      label: 'Performance Impact',
      value: '30%',
      description: 'LCP improvement on production project',
    },
  ],
};
