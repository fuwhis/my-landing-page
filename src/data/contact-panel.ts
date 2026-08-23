import type { ContactPanelContent } from '@/types/content';

export const contactPanel: ContactPanelContent = {
  eyebrow: 'Next step',
  title: 'How to reach me',
  directLineLabel: 'Direct line',
  emailLabel: 'Email',
  emailCopyLabel: 'Copy',
  emailCopiedTitle: 'Email copied',
  emailCopyFailedTitle: 'Could not copy email',
  linkedInLabel: 'LinkedIn',
  contract: 'I reply within 24 hours to the email you provide.',
  nextStep: 'If it looks like a fit, next step is a 20-minute intro.',
  hooksLabel: 'Ask me about',
  hooksHint: 'Adds a starter sentence to the message field.',
  hooks: [
    {
      id: 'gia-phuoc-lcp',
      label: '30%+ LCP on a freight dashboard built from scratch',
      messagePrompt:
        "I'd like to hear about how you improved LCP by 30%+ when building the Gia Phuoc Express freight dashboard from scratch.",
    },
    {
      id: 'myliking-a11y',
      label: 'Accessibility widget for a Japan SaaS',
      messagePrompt:
        "I'd like to hear about the accessibility-focused browser widget you built for a Japan-based SaaS.",
    },
    {
      id: 'knft-graphql',
      label: 'GraphQL-driven NFT marketplace UI',
      messagePrompt:
        "I'd like to hear about the GraphQL-driven frontend on the KNFT marketplace.",
    },
  ],
  formIntroTitle: 'Get in touch',
  formIntroDescription:
    "Recruiters and hiring teams can reach out directly. I'll reply to the email address you provide.",
};
