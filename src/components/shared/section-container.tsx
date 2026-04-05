import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '@/lib/utils';

type SectionContainerProps = ComponentPropsWithoutRef<'section'>;

export function SectionContainer({
  className,
  children,
  ...props
}: SectionContainerProps) {
  return (
    <section className={cn('py-14 sm:py-20', className)} {...props}>
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-10">{children}</div>
    </section>
  );
}
