import { SectionContainer } from '@/components/shared/section-container';
import { SectionHeading } from '@/components/shared/section-heading';
import { profile } from '@/data/profile';

export function AboutSection() {
  return (
    <SectionContainer id="about">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr]">
        <SectionHeading
          eyebrow="About"
          title="Frontend engineer focused on scalable, high-performance product delivery"
          description={profile.availability}
        />

        <div className="space-y-6">
          {profile.aboutParagraphs.map((paragraph) => (
            <p key={paragraph} className="text-base leading-relaxed text-neutral-600">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
