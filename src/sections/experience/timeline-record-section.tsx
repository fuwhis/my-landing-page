'use client';

import { FadeInOnView } from '@/components/motion/fade-in-on-view';
import { SectionContainer } from '@/components/shared/section-container';
import { SectionHeading } from '@/components/shared/section-heading';
import { TechStackList } from '@/components/shared/tech-stack-list';
import { experienceTimeline } from '@/data/experience-timeline';
import { toDateTime } from '@/lib/duration';
import { scrollToProjectCard } from '@/lib/scroll-to-project';
import { cn } from '@/lib/utils';
import type { TimelineEntry } from '@/types/content';

function TimelineDateRange({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}) {
  const startDateTime = toDateTime(startDate);
  const endDateTime = toDateTime(endDate);

  return (
    <p className="text-xs font-semibold tracking-wide text-neutral-500 uppercase sm:text-right">
      <time dateTime={startDateTime}>{startDate}</time>
      {' – '}
      {endDateTime ? (
        <time dateTime={endDateTime}>{endDate}</time>
      ) : (
        <time>{endDate}</time>
      )}
    </p>
  );
}

function TimelineRecordEntry({
  entry,
  isLast,
  animationDelay,
}: {
  entry: TimelineEntry;
  isLast: boolean;
  animationDelay: number;
}) {
  const content = (
    <>
      <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
        <p className="text-base font-semibold text-neutral-900">
          {entry.company}
          <span className="font-normal text-neutral-400"> · </span>
          <span className="font-medium text-neutral-700">{entry.role}</span>
        </p>
        <TimelineDateRange
          startDate={entry.startDate}
          endDate={entry.endDate}
        />
      </div>

      <p className="text-sm leading-relaxed text-neutral-600">
        {entry.outcome}
      </p>

      <div className="mt-4">
        <TechStackList items={entry.techTags} />
      </div>
    </>
  );

  const entryBody = entry.projectSlug ? (
    <button
      type="button"
      onClick={() => scrollToProjectCard(entry.projectSlug!)}
      className={cn(
        'w-full rounded-xl text-left transition-colors',
        'hover:bg-neutral-50 focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none',
      )}
    >
      {content}
    </button>
  ) : (
    <div>{content}</div>
  );

  return (
    <li className="relative pl-8">
      <span
        aria-hidden="true"
        className="absolute top-1.5 left-0 z-10 size-3 rounded-full border-2 border-sky-500 bg-white"
      />
      {!isLast ? (
        <span
          aria-hidden="true"
          className="absolute top-4 -bottom-10 left-[5px] w-px bg-neutral-200"
        />
      ) : null}
      <FadeInOnView delay={animationDelay}>{entryBody}</FadeInOnView>
    </li>
  );
}

export function TimelineRecordSection() {
  return (
    <SectionContainer id="experience">
      <div className="space-y-8">
        <SectionHeading
          eyebrow="Experience"
          title="Professional track record"
          description="Focused on product outcomes, code quality, and collaborative delivery."
        />

        <ol className="relative m-0 list-none space-y-10 p-0">
          {experienceTimeline.map((entry, index) => (
            <TimelineRecordEntry
              key={entry.company}
              entry={entry}
              isLast={index === experienceTimeline.length - 1}
              animationDelay={index * 0.08}
            />
          ))}
        </ol>
      </div>
    </SectionContainer>
  );
}
