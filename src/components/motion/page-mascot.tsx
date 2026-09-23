'use client';

import { Mascot, type MascotProps } from 'page-mascot';

/**
 * Client wrapper for `page-mascot` so App Router server sections can render it.
 * Tracking and click squash already honour fine-pointer / reduced-motion inside the library.
 */
export function PageMascot(props: MascotProps) {
  return <Mascot {...props} />;
}
