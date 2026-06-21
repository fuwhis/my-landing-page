import type { ContactFormFields } from '@/types/contact-form';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const CONTACT_FORM_LIMITS = {
  nameMax: 100,
  emailMax: 150,
  messageMin: 20,
  messageMax: 2000,
} as const;

export type ContactFormFieldErrors = Partial<
  Record<keyof ContactFormFields, string>
>;

export function validateContactForm(
  values: ContactFormFields,
): ContactFormFieldErrors {
  const errors: ContactFormFieldErrors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const message = values.message.trim();

  if (!name) {
    errors.name = 'Name is required.';
  } else if (name.length > CONTACT_FORM_LIMITS.nameMax) {
    errors.name = `Name must be ${CONTACT_FORM_LIMITS.nameMax} characters or fewer.`;
  }

  if (!email) {
    errors.email = 'Email is required.';
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = 'Please enter a valid email address.';
  } else if (email.length > CONTACT_FORM_LIMITS.emailMax) {
    errors.email = `Email must be ${CONTACT_FORM_LIMITS.emailMax} characters or fewer.`;
  }

  if (!message) {
    errors.message = 'Message is required.';
  } else if (message.length < CONTACT_FORM_LIMITS.messageMin) {
    errors.message = `Message must be at least ${CONTACT_FORM_LIMITS.messageMin} characters.`;
  } else if (message.length > CONTACT_FORM_LIMITS.messageMax) {
    errors.message = `Message must be ${CONTACT_FORM_LIMITS.messageMax} characters or fewer.`;
  }

  return errors;
}

export function trimContactFormValues(
  values: ContactFormFields,
): ContactFormFields {
  return {
    name: values.name.trim(),
    email: values.email.trim(),
    message: values.message.trim(),
  };
}

export function formatContactTimestamp(date = new Date()): string {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
}

export type EmailJsConfig = {
  serviceId: string;
  templateId: string;
  publicKey: string;
};

export function getEmailJsConfig(): EmailJsConfig | null {
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  if (!serviceId?.trim() || !templateId?.trim() || !publicKey?.trim()) {
    return null;
  }

  return {
    serviceId: serviceId.trim(),
    templateId: templateId.trim(),
    publicKey: publicKey.trim(),
  };
}
