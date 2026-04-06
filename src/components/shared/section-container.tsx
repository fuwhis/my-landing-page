import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import { cn } from '@/lib/utils';

type SectionContainerProps = ComponentPropsWithoutRef<'section'> & {
  /** Renders inside `<section>` but outside the max-width wrapper (e.g. full-bleed backgrounds). */
  decoration?: ReactNode;
};

export function SectionContainer({
  className,
  children,
  decoration,
  ...props
}: SectionContainerProps) {
  return (
    <section className={cn('relative py-14 sm:py-20', className)} {...props}>
      {decoration}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 sm:px-10">
        {children}
      </div>
    </section>
  );
}
