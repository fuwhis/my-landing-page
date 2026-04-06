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

export type Profile = {
  fullName: string;
  role: string;
  tagline: string;
  location: string;
  email: string;
  availability: string;
  summary: string;
  aboutParagraphs: string[];
  contactTitle: string;
  contactDescription: string;
  socialLinks: SocialLink[];
  metrics: Metric[];
};
