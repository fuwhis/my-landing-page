import { SectionContainer } from '@/components/shared/section-container';
import { SectionHeading } from '@/components/shared/section-heading';
import { TechStackList } from '@/components/shared/tech-stack-list';
import { skillGroups } from '@/data/skills';

export function SkillsSection() {
  return (
    <SectionContainer id="skills">
      <div className="space-y-8">
        <SectionHeading
          eyebrow="Skills"
          title="Capabilities by engineering focus"
          description="Grouped to highlight depth in frontend delivery, data flow, and quality-focused workflows."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {skillGroups.map((group) => (
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
