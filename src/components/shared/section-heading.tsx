import { cn } from '@/lib/utils';

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
}: SectionHeadingProps) {
  return (
    <header className={cn('space-y-4', align === 'center' && 'text-center')}>
      {eyebrow ? (
        <p className="text-xs font-semibold tracking-[0.22em] text-sky-600 uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-2xl font-semibold tracking-tight text-sky-900 sm:text-3xl">
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl text-sm leading-relaxed text-neutral-600 sm:text-base">
          {description}
        </p>
      ) : null}
    </header>
  );
}
