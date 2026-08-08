import type { ExperienceItem } from '@/types/content';

import { TechStackList } from '@/components/shared/tech-stack-list';

type TimelineItemProps = {
  item: ExperienceItem;
};

export function TimelineItem({ item }: TimelineItemProps) {
  return (
    <article className="border-border bg-surface relative rounded-2xl border p-6 sm:p-7">
      <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-surface-foreground text-lg font-semibold">
            {item.role}
          </h3>
          <p className="text-muted-foreground text-sm">
            {item.company} · {item.location}
          </p>
        </div>
        <p className="text-subtle-foreground text-xs font-semibold tracking-wide uppercase">
          {item.period}
        </p>
      </div>

      <p className="text-muted-foreground text-sm leading-relaxed">
        {item.summary}
      </p>

      <ul className="text-surface-foreground mt-4 space-y-2 text-sm">
        {item.highlights.map((highlight) => (
          <li key={highlight} className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500" />
            <span>{highlight}</span>
          </li>
        ))}
      </ul>

      <div className="mt-5">
        <TechStackList items={item.technologies} />
      </div>
    </article>
  );
}
