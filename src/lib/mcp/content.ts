import { experiences } from '@/data/experience';
import { experienceTimeline } from '@/data/experience-timeline';
import { profile } from '@/data/profile';
import { projects } from '@/data/projects';
import { skillGroups } from '@/data/skills';
import { z } from 'zod';

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.fuwhis.io.vn'
).replace(/\/$/, '');

const toAbsoluteUrl = (href: string) =>
  href.startsWith('/') ? `${SITE_URL}${href}` : href;

/* ------------ Output schemas (whitelist: only these fields can ever leave the server) ------------ */

export const ProfileSchema = z.object({
  fullName: z.string(),
  role: z.string(),
  tagline: z.string(),
  location: z.string(),
  availability: z.string(),
  summary: z.string(),
  about: z.array(z.string()).describe('About paragraphs as plain text'),
  metrics: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
      description: z.string().optional(),
    }),
  ),
});

export const ProjectSchema = z.object({
  title: z.string(),
  category: z.string(),
  description: z.string(),
  impact: z.string(),
  stack: z.array(z.string()),
});

export const ProjectsResultSchema = z.object({
  count: z.number(),
  projects: z.array(ProjectSchema),
  availableTech: z
    .array(z.string())
    .optional()
    .describe(
      'Only present when no project matched: the technologies you can filter by',
    ),
});

export const ContactSchema = z.object({
  email: z.string(),
  note: z.string(),
  links: z.array(z.object({ label: z.string(), url: z.string() })),
});

export const ExperienceItemSchema = z.object({
  company: z.string(),
  role: z.string(),
  location: z.string(),
  startDate: z.string().describe("Start month, e.g. 'Apr 2021'"),
  endDate: z.string().describe("End month, e.g. 'Mar 2022'"),
  outcome: z.string().describe('One-line result of the role'),
  highlights: z.array(z.string()).describe('Responsibilities and achievements'),
  technologies: z.array(z.string()),
});

export const ExperienceResultSchema = z.object({
  count: z.number(),
  experience: z
    .array(ExperienceItemSchema)
    .describe('Employment history, most recent first'),
  availableTech: z
    .array(z.string())
    .optional()
    .describe(
      'Only present when no entry matched: the technologies you can filter by',
    ),
});

export const SkillsSchema = z.object({
  groups: z.array(
    z.object({ category: z.string(), skills: z.array(z.string()) }),
  ),
});

/* ---------- Mappers (explicit projection: never spread the raw data objects) ---------- */

export function getPublicProfile(): z.infer<typeof ProfileSchema> {
  return {
    fullName: profile.fullName,
    role: profile.role,
    tagline: profile.tagline,
    location: profile.location,
    availability: profile.availability,
    summary: profile.summary,
    about: profile.aboutParagraphs.map((p) =>
      p.segments.map((s) => s.text).join(''),
    ),
    metrics: profile.metrics.map(({ label, value, description }) => ({
      label,
      value,
      description,
    })),
  };
}

export function getPublicContact(): z.infer<typeof ContactSchema> {
  return {
    email: profile.email,
    note: profile.contactDescription,
    links: profile.socialLinks
      .filter((l) => l.visible)
      .map((l) => ({ label: l.label, url: toAbsoluteUrl(l.href) })),
  };
}

export function findProjects(
  tech?: string,
): z.infer<typeof ProjectsResultSchema> {
  const all = projects.map(
    ({ title, category, description, impact, stack }) => ({
      title,
      category,
      description,
      impact,
      stack: [...stack],
    }),
  );

  const q = tech?.trim().toLowerCase();
  const matched = q
    ? all.filter((p) => p.stack.some((s) => s.toLowerCase().includes(q)))
    : all;

  if (matched.length > 0) return { count: matched.length, projects: matched };

  const availableTech = [...new Set(all.flatMap((p) => p.stack))].sort((a, b) =>
    a.localeCompare(b),
  );
  return { count: 0, projects: [], availableTech };
}

/**
 * Employment history. `experienceTimeline` is the spine (it is what the website's Timeline section
 * shows); `experiences` is joined by company to add highlights and the fuller technology list.
 * Deliberately NOT exposed: projectSlug (internal), and `summary` (free text that names internal projects).
 */
const experienceDetailByCompany = new Map(
  experiences.map((x) => [x.company, x]),
);

export function findExperience(
  tech?: string,
): z.infer<typeof ExperienceResultSchema> {
  const all = experienceTimeline.map((t) => {
    const detail = experienceDetailByCompany.get(t.company);
    return {
      company: t.company,
      role: t.role,
      location: t.location,
      startDate: t.startDate,
      endDate: t.endDate ?? 'Present',
      outcome: t.outcome,
      highlights: detail ? [...detail.highlights] : [],
      technologies: [...(detail?.technologies ?? t.techTags)],
    };
  });

  const q = tech?.trim().toLowerCase();
  const matched = q
    ? all.filter((e) => e.technologies.some((x) => x.toLowerCase().includes(q)))
    : all;

  if (matched.length > 0) return { count: matched.length, experience: matched };

  const availableTech = [...new Set(all.flatMap((e) => e.technologies))].sort(
    (a, b) => a.localeCompare(b),
  );
  return { count: 0, experience: [], availableTech };
}

export function getPublicSkills(): z.infer<typeof SkillsSchema> {
  return {
    groups: skillGroups.map((g) => ({
      category: g.title,
      skills: [...g.items],
    })),
  };
}
