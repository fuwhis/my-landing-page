import { profile } from "@/data/profile"
import { projects } from "@/data/projects"
import { z } from "zod"

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.fuwhis.io.vn").replace(/\/$/, "")

const toAbsoluteUrl = (href: string) => (href.startsWith("/") ? `${SITE_URL}${href}` : href)

/* ------------ Output schemas (whitelist: only these fields can ever leave the server) ------------ */

export const ProfileSchema = z.object({
  fullName: z.string(),
  role: z.string(),
  tagline: z.string(),
  location: z.string(),
  availability: z.string(),
  summary: z.string(),
  about: z.array(z.string()).describe("About paragraphs as plain text"),
  metrics: z.array(
    z.object({ label: z.string(), value: z.string(), description: z.string().optional() }),
  ),
})

export const ProjectSchema = z.object({
  title: z.string(),
  category: z.string(),
  description: z.string(),
  impact: z.string(),
  stack: z.array(z.string()),
})

export const ProjectsResultSchema = z.object({
  count: z.number(),
  projects: z.array(ProjectSchema),
  availableTech: z
    .array(z.string())
    .optional()
    .describe("Only present when no project matched: the technologies you can filter by"),
})

export const ContactSchema = z.object({
  email: z.string(),
  note: z.string(),
  links: z.array(z.object({ label: z.string(), url: z.string() })),
})

/* ---------- Mappers (explicit projection: never spread the raw data objects) ---------- */

export function getPublicProfile(): z.infer<typeof ProfileSchema> {
  return {
    fullName: profile.fullName,
    role: profile.role,
    tagline: profile.tagline,
    location: profile.location,
    availability: profile.availability,
    summary: profile.summary,
    about: profile.aboutParagraphs.map((p) => p.segments.map((s) => s.text).join("")),
    metrics: profile.metrics.map(({ label, value, description }) => ({ label, value, description })),
  }
}

export function getPublicContact(): z.infer<typeof ContactSchema> {
  return {
    email: profile.email,
    note: profile.contactDescription,
    links: profile.socialLinks
      .filter((l) => l.visible)
      .map((l) => ({ label: l.label, url: toAbsoluteUrl(l.href) })),
  }
}

export function findProjects(tech?: string): z.infer<typeof ProjectsResultSchema> {
  const all = projects.map(({ title, category, description, impact, stack }) => ({
    title,
    category,
    description,
    impact,
    stack: [...stack],
  }))

  const q = tech?.trim().toLowerCase()
  const matched = q ? all.filter((p) => p.stack.some((s) => s.toLowerCase().includes(q))) : all

  if (matched.length > 0) return { count: matched.length, projects: matched }

  const availableTech = [...new Set(all.flatMap((p) => p.stack))].sort((a, b) => a.localeCompare(b))
  return { count: 0, projects: [], availableTech }
}
