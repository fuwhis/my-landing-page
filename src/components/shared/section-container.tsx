import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import { cn } from '@/lib/utils';

type SectionContainerProps = ComponentPropsWithoutRef<'section'> & {
  /** Full-bleed layer behind content (e.g. organic blob). */
  decoration?: ReactNode;
  /** Full-bleed rising-bubble layer; rendered above `decoration`, below content. */
  bubbles?: ReactNode;
};

export function SectionContainer({
  className,
  children,
  decoration,
  bubbles,
  ...props
}: SectionContainerProps) {
  return (
    <section className={cn('relative py-14 sm:py-20', className)} {...props}>
      {decoration}
      {bubbles}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 sm:px-10">
        {children}
      </div>
    </section>
  );
}
