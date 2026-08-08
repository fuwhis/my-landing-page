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
          className="border-border bg-surface rounded-2xl border p-6 sm:p-8"
        >
          <div className="space-y-2">
            <h3 className="text-surface-foreground text-lg font-semibold">
              Get in touch
            </h3>
            <p className="text-muted-foreground text-sm">
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
