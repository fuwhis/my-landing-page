import { SectionContainer } from '@/components/shared/section-container';
import { SectionHeading } from '@/components/shared/section-heading';
import { profile } from '@/data/profile';

import { ContactCard } from './contact-card';

export function ContactSection() {
  return (
    <SectionContainer id="contact">
      <div className="space-y-8">
        <SectionHeading
          eyebrow="Contact"
          title={profile.contactTitle}
          description={profile.contactDescription}
        />

        <ContactCard />
      </div>
    </SectionContainer>
  );
}
