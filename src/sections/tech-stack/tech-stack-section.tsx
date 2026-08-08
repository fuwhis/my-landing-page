import { SectionContainer } from '@/components/shared/section-container';
import { SectionHeading } from '@/components/shared/section-heading';
import { TechStackList } from '@/components/shared/tech-stack-list';
import { techStackGroups } from '@/data/tech-stack';

export function TechStackSection() {
  return (
    <SectionContainer id="tech-stack">
      <div className="space-y-8">
        <SectionHeading
          eyebrow="Tech Stack"
          title="Core technologies used in real projects"
          description="Focused, recruiter-friendly stack overview from hands-on production work."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {techStackGroups.map((group) => (
            <div
              key={group.title}
              className="border-border bg-surface space-y-3 rounded-2xl border p-6"
            >
              <h3 className="text-surface-foreground text-sm font-semibold tracking-wide uppercase">
                {group.title}
              </h3>
              <TechStackList items={group.items} />
            </div>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
