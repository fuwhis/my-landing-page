import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

type TagBadgeProps = {
  label: string;
  icon?: ReactNode;
  /** Enables hover scale transition via `.tag-badge--animated` in tag-badge.css */
  animate?: boolean;
};

export function TagBadge({ label, icon, animate = false }: TagBadgeProps) {
  return (
    <span
      className={cn(
        'border-border bg-muted text-surface-foreground inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium',
        animate && 'tag-badge--animated',
      )}
    >
      {icon ? <span className="text-muted-foreground">{icon}</span> : null}
      {label}
    </span>
  );
}
