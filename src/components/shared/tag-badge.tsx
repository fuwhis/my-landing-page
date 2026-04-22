import type { ReactNode } from 'react';

type TagBadgeProps = {
  label: string;
  icon?: ReactNode;
};

export function TagBadge({ label, icon }: TagBadgeProps) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700">
      {icon ? <span className="text-neutral-600">{icon}</span> : null}
      {label}
    </span>
  );
}
