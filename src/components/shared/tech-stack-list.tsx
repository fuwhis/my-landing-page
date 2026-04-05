import { TagBadge } from '@/components/shared/tag-badge';

type TechStackListProps = {
  items: string[];
};

export function TechStackList({ items }: TechStackListProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <TagBadge key={item} label={item} />
      ))}
    </div>
  );
}
