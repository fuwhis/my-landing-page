import { TagBadge } from '@/components/shared/tag-badge';
import { getTechTagIcon } from '@/components/shared/tech-tag-icon';

type TechStackListProps = {
  items: string[];
};

export function TechStackList({ items }: TechStackListProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <TagBadge key={item} label={item} icon={getTechTagIcon(item)} />
      ))}
    </div>
  );
}
