import { SectionContainer } from '@/components/shared/section-container';
import { SectionHeading } from '@/components/shared/section-heading';
import { TechStackList } from '@/components/shared/tech-stack-list';
import { profile } from '@/data/profile';
import { skillGroups } from '@/data/skills';

export function AboutSection() {
  return (
    <SectionContainer id="about">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr]">
        <SectionHeading
          eyebrow="About"
          title="Building premium product experiences with engineering discipline"
          description={profile.availability}
        />

        <div className="space-y-6">
          <p className="text-base leading-relaxed text-neutral-600">
            I translate business goals into clear frontend systems by combining component-driven
            architecture, strong TypeScript practices, and thoughtful UI motion. I care deeply
            about maintainability, accessibility, and delivery speed.
          </p>

          <div className="space-y-5">
            {skillGroups.map((group) => (
              <div key={group.title} className="space-y-2">
                <h3 className="text-sm font-semibold tracking-wide text-neutral-800 uppercase">
                  {group.title}
                </h3>
                <TechStackList items={group.items} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
