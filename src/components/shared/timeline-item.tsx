import type { ExperienceItem } from '@/types/content';

import { TechStackList } from '@/components/shared/tech-stack-list';

type TimelineItemProps = {
  item: ExperienceItem;
};

export function TimelineItem({ item }: TimelineItemProps) {
  return (
    <article className="relative rounded-2xl border border-neutral-200 bg-white p-6 sm:p-7">
      <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-neutral-900">
            {item.role}
          </h3>
          <p className="text-sm text-neutral-600">
            {item.company} · {item.location}
          </p>
        </div>
        <p className="text-xs font-semibold tracking-wide text-neutral-500 uppercase">
          {item.period}
        </p>
      </div>

      <p className="text-sm leading-relaxed text-neutral-600">{item.summary}</p>

      <ul className="mt-4 space-y-2 text-sm text-neutral-700">
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
