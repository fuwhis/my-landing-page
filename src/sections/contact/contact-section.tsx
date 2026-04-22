import { WaveDivider } from '@/components/motion/wave-divider';
import { CtaButton } from '@/components/shared/cta-button';
import { SectionContainer } from '@/components/shared/section-container';
import { SectionHeading } from '@/components/shared/section-heading';
import { profile } from '@/data/profile';

export function ContactSection() {
  return (
    <SectionContainer
      id="contact"
      decoration={<WaveDivider className="section-continuity__section-wave-divider" />}
    >
      <div className="space-y-8">
        <SectionHeading
          eyebrow="Contact"
          title={profile.contactTitle}
          description={profile.contactDescription}
        />

        <div className="flex flex-wrap gap-3">
          {profile.socialLinks.map((link) => (
            <CtaButton
              key={link.label}
              label={link.label}
              href={link.href}
              variant="outline"
            />
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
