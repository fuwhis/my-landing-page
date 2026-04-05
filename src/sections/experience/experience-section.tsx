import { FadeInOnView } from '@/components/motion/fade-in-on-view';
import { SectionContainer } from '@/components/shared/section-container';
import { SectionHeading } from '@/components/shared/section-heading';
import { TimelineItem } from '@/components/shared/timeline-item';
import { experiences } from '@/data/experience';

export function ExperienceSection() {
  return (
    <SectionContainer id="experience">
      <div className="space-y-8">
        <SectionHeading
          eyebrow="Experience"
          title="Professional track record"
          description="Focused on product outcomes, code quality, and collaborative delivery."
        />

        <div className="space-y-4">
          {experiences.map((item, index) => (
            <FadeInOnView key={item.company} delay={index * 0.08}>
              <TimelineItem item={item} />
            </FadeInOnView>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
