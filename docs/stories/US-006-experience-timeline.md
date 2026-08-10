# US-006 Experience Timeline

## Status

Ready for implementation

## Scope

Create a brand new section component, `TimelineRecordSection`, in a new file: `src/sections/experience/timeline-record-section.tsx`. Update `src/app/page.tsx` to import and render `TimelineRecordSection` in place of `ExperienceSection`.

The existing `ExperienceSection` component and its file (`src/sections/experience/experience-section.tsx`) must not be touched in any way — no edits, no renaming, no re-exporting through it. It stays in the codebase exactly as it is today, simply no longer imported by `page.tsx`. It may be reused elsewhere later.

Do not modify any other section (Hero, Tech Stack, Selected Work, Skills, Contact). If a shared component or type needs to change to make this work, stop and ask before making that change.

## Description

Build a new, compact Timeline component to replace what `ExperienceSection` currently shows on the homepage — the block listing 4-6 responsibility bullets per company under "Professional track record." The goal is a 5-10 second scan, not a detailed task list. Task-level detail already exists in "Selected Work" below and in the CV PDF, so this component should not repeat that content.

`TimelineRecordSection` takes over the heading, layout wrapper, and spacing role that `ExperienceSection` currently has on the page — it does not import or reuse `ExperienceSection` internally, it's an independent component with its own markup.

## Data

First check `src/data/*.ts` for an existing file that feeds the current bullet-list component.

- If one exists: refactor that file to the new shape below instead of creating a duplicate.
- If none exists (data is currently hardcoded in the component): create `src/data/experience-timeline.ts`, following the naming and export conventions already used in that folder.

Type definition (add to `src/data/types.ts` if that file exists, otherwise the shared types file already used in `src/data/`):

```ts
interface TimelineEntry {
  company: string;
  role: string;
  location: string;
  startDate: string; // "MMM YYYY"
  endDate: string; // "MMM YYYY" | "Present"
  outcome: string; // exactly one sentence, outcome-driven, not a task list
  techTags: string[]; // max 5 tags
  projectSlug?: string; // optional, links to the matching card in "Selected Work"
}
```

Data to use, exactly as written below:

```ts
export const experienceTimeline: TimelineEntry[] = [
  {
    company: 'Gia Phuoc Express',
    role: 'Frontend Developer',
    location: 'Ho Chi Minh City, Vietnam',
    startDate: 'May 2025',
    endDate: 'Apr 2026',
    outcome:
      'Built the freight transportation management dashboard from scratch using Vue 3 & Nuxt 3.',
    techTags: ['Vue 3', 'Nuxt 3', 'Pinia', 'Tailwind CSS'],
    projectSlug: 'gia-phuoc-express',
  },
  {
    company: 'CloudSky',
    role: 'Frontend Developer',
    location: 'Ho Chi Minh City, Vietnam',
    startDate: 'Jan 2024',
    endDate: 'May 2024',
    outcome:
      'Built an accessibility-focused browser widget for a Japan-based SaaS product.',
    techTags: ['JavaScript', 'Django', 'HTML', 'SCSS'],
    projectSlug: 'my-liking',
  },
  {
    company: 'BrickMate Group VN',
    role: 'Software Developer',
    location: 'Ho Chi Minh City, Vietnam',
    startDate: 'Mar 2022',
    endDate: 'Sep 2023',
    outcome:
      'Delivered frontend features across 4 products spanning NFT marketplace, footwear admin tools, and design tooling.',
    techTags: ['React', 'Next.js', 'TypeScript', 'Redux', 'GraphQL'],
    projectSlug: 'knft-kumho-nft',
  },
  {
    company: 'FPT Software',
    role: 'Frontend Developer',
    location: 'Ho Chi Minh City, Vietnam',
    startDate: 'Apr 2021',
    endDate: 'Mar 2022',
    outcome:
      "Delivered admin dashboard features for AIA Vietnam's broadcast management system.",
    techTags: ['React', 'Ant Design', 'Redux', 'SCSS'],
  },
];
```

Do not store `durationMonths` in the data. Write a helper function `getDurationMonths(start, end)` that computes it at runtime from `startDate` and `endDate`, so it never drifts out of sync when dates get updated later. Place this helper in `src/lib/` or `src/utils/`, following whatever convention the project already uses. Do not write it inline in the component.

## UI/UX requirements

- Vertical timeline: a vertical line on the left with a dot marking each entry. Do not reuse the current card layout (bordered box with a bullet list).
- Each entry shows: company and role on the same line, dates on the right (stacked below company on mobile), the outcome sentence directly underneath, and tech tags as small pills at the bottom.
- The line segment between two dots can scale slightly with `durationMonths` to hint at tenure. Keep this simple; clarity matters more than precision here.
- If an entry has a `projectSlug`, the whole entry becomes a `<button>` that smooth-scrolls to the matching card in "Selected Work." No new tab.
- Entries with `projectSlug` must look the same as entries without it — no hover background, focus ring, or other affordance that makes clickable rows visually distinct. Click behavior is the only difference.
- Responsive: on mobile, dots sit near the left edge and company/dates stack instead of sharing a row.
- Use the existing design tokens (colors, spacing, fonts) from the current theme. Check the theme or Tailwind config before styling. Do not introduce new tokens.
- Reuse the icon component already used in the "Tech Stack" section for tech tags. Do not build a new icon set.
- Minimum semantic HTML: use `<ol>` for the timeline list and `<time dateTime="">` for each date.

## Animation

Check whether the project already has an animation approach (framer-motion, AOS, or plain CSS transitions with Intersection Observer) and reuse it. If nothing exists yet, use plain CSS transitions with Intersection Observer — no new dependency needed for that. Only install a new package if there's genuinely no way around it, and ask first.

Effect: fade-in with a slight slide-up as each entry enters the viewport.

## Constraints

- `src/sections/experience/experience-section.tsx` and everything it exports (`ExperienceSection`) must not be edited, renamed, or deleted. Do not touch this file at all.
- Before editing `page.tsx`, search the project for any other place that imports `ExperienceSection` (tests, Storybook, other pages). If it's used anywhere besides `page.tsx`, leave those usages alone and only change the import/render in `page.tsx`.
- No multi-line responsibility bullets ("Built...", "Integrated...", "Maintained..."). Each entry gets exactly one outcome sentence, as shown in the data above.
- Do not add any numbers or metrics (percentages, counts, etc.) beyond what's provided in the data.
- `TimelineRecordSection` should render its own heading ("Experience" or "Professional track record" — reuse whichever heading text/copy `ExperienceSection` currently uses, for consistency).
- Do not delete anything. This ticket only adds a new file and edits `page.tsx`.

## Acceptance criteria

- [ ] `src/sections/experience/experience-section.tsx` is byte-for-byte unchanged (diff shows no modification)
- [ ] `page.tsx` imports `TimelineRecordSection` from `@/sections/experience/timeline-record-section` and renders it in the same position `ExperienceSection` used to occupy
- [ ] `TimelineRecordSection` renders all 4 entries from the data above, in reverse chronological order (most recent first)
- [ ] No responsibility-bullet content remains on the homepage in this section
- [ ] Timeline works correctly on mobile (< 768px) and desktop
- [ ] Clicking an entry with a `projectSlug` smooth-scrolls to the correct card in "Selected Work"
- [ ] Entries with and without `projectSlug` share the same visual treatment (no hover/focus styling on clickable rows)
- [ ] No new console warnings or errors, and no new build warnings
- [ ] Nothing is deleted; `ExperienceSection` remains available for import elsewhere if needed later
- [ ] Production build succeeds (`npm run build` or equivalent)

## Output required

After implementation: start the dev server for preview, list every file added, modified, or deleted, and confirm each acceptance criterion above has been checked.
