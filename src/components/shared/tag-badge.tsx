import type { ReactNode } from 'react';

type TagBadgeProps = {
  label: string;
  icon?: ReactNode;
};

export function TagBadge({ label, icon }: TagBadgeProps) {
  return (
    <span className="border-border bg-muted text-surface-foreground inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium">
      {icon ? <span className="text-muted-foreground">{icon}</span> : null}
      {label}
    </span>
  );
}
