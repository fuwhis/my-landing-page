export type SocialLink = {
  label: string;
  href: string;
};

export type Metric = {
  label: string;
  value: string;
  description?: string;
};

export type ExperienceItem = {
  company: string;
  role: string;
  location: string;
  period: string;
  summary: string;
  highlights: string[];
  technologies: string[];
};

export type TimelineEntry = {
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  outcome: string;
  techTags: string[];
  projectSlug?: string;
};

export type ProjectItem = {
  title: string;
  category: string;
  description: string;
  impact: string;
  stack: string[];
  href?: string;
  repoHref?: string;
};

export type SkillGroup = {
  title: string;
  items: string[];
};

export type VastItem = {
  letter: string;
  title: string;
  description: string;
};

export type ContactHook = {
  id: string;
  label: string;
  messagePrompt: string;
};

export type ContactPanelContent = {
  eyebrow: string;
  title: string;
  directLineLabel: string;
  emailLabel: string;
  emailCopyLabel: string;
  emailCopiedTitle: string;
  emailCopyFailedTitle: string;
  linkedInLabel: string;
  contract: string;
  nextStep: string;
  profilesLabel: string;
  hooksLabel?: string;
  hooksHint?: string;
  hooks?: ContactHook[];
  formIntroTitle: string;
  formIntroDescription: string;
};

export type Profile = {
  fullName: string;
  role: string;
  tagline: string;
  location: string;
  email: string;
  resumeHref: string;
  availability: string;
  summary: string;
  aboutParagraphs: string[];
  contactTitle: string;
  contactDescription: string;
  socialLinks: SocialLink[];
  metrics: Metric[];
};
