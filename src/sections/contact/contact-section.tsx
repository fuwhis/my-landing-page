import { SectionContainer } from '@/components/shared/section-container';
import { SectionHeading } from '@/components/shared/section-heading';
import { profile } from '@/data/profile';
import { ContactForm } from './contact-form';

export function ContactSection() {
  return (
    <SectionContainer id="contact">
      <div className="space-y-8">
        <SectionHeading
          eyebrow="Contact"
          title={profile.contactTitle}
          description={profile.contactDescription}
        />

        {/* <div className="flex flex-wrap gap-3">
          {profile.socialLinks.map((link) => (
            <CtaButton
              key={link.label}
              label={link.label}
              href={link.href}
              variant="outline"
            />
          ))}
        </div> */}

        <div
          id="contact-form"
          className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8"
        >
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-neutral-900">
              Get in touch
            </h3>
            <p className="text-sm text-neutral-600">
              Recruiters and hiring teams can reach out directly. I&apos;ll
              reply to the email address you provide.
            </p>
          </div>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
