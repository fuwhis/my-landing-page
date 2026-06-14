'use client';

import emailjs from '@emailjs/browser';
import { Sparkles } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { profile } from '@/data/profile';
import {
  buildRecruiterOutreachTemplate,
  CONTACT_FORM_LIMITS,
  formatContactTimestamp,
  getEmailJsConfig,
  trimContactFormValues,
  validateContactForm,
  type ContactFormFieldErrors,
} from '@/lib/contact-form';
import { cn } from '@/lib/utils';
import type { ContactFormFields } from '@/types/contact-form';

type FormStatus = 'idle' | 'success' | 'error';

type ContactFormValues = ContactFormFields & {
  company_website: string;
};

const defaultValues: ContactFormValues = {
  name: '',
  email: '',
  message: '',
  company_website: '',
};

const fieldClassName = cn(
  'w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900',
  'placeholder:text-neutral-400',
  'focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:outline-none',
);

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<ContactFormFieldErrors>({});

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors: rhfErrors },
  } = useForm<ContactFormValues>({
    defaultValues,
  });

  const message = watch('message') ?? '';
  const messageCharsLeft = CONTACT_FORM_LIMITS.messageMax - message.length;

  const applyRecruiterTemplate = () => {
    setValue('message', buildRecruiterOutreachTemplate(profile.fullName), {
      shouldDirty: true,
      shouldValidate: true,
    });
    setStatus('idle');
  };

  const onSubmit = handleSubmit(async (values) => {
    if (isLoading) {
      return;
    }

    if (values.company_website.trim()) {
      return;
    }

    const trimmed = trimContactFormValues(values);
    const validationErrors = validateContactForm(trimmed);

    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors);
      setStatus('idle');
      return;
    }

    setFieldErrors({});
    setStatus('idle');

    const config = getEmailJsConfig();
    if (!config) {
      setStatus('error');
      return;
    }

    setIsLoading(true);

    try {
      await emailjs.send(
        config.serviceId,
        config.templateId,
        {
          from_name: trimmed.name,
          from_email: trimmed.email,
          message: trimmed.message,
          time: formatContactTimestamp(),
        },
        { publicKey: config.publicKey },
      );

      setStatus('success');
      reset(defaultValues);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('[ContactForm] EmailJS send failed:', error);
      }
      setStatus('error');
    } finally {
      setIsLoading(false);
    }
  });

  const getError = (field: keyof ContactFormFields) =>
    fieldErrors[field] ?? rhfErrors[field]?.message;

  return (
    <form
      className="flex w-full max-w-xl flex-col gap-4"
      onSubmit={onSubmit}
      noValidate
    >
      {/* TODO: Add reCAPTCHA or Cloudflare Turnstile if spam volume increases. */}
      <input
        {...register('company_website')}
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="pointer-events-none absolute h-0 w-0 opacity-0"
      />

      <div className="space-y-2">
        <label
          htmlFor="contact-name"
          className="text-sm font-medium text-neutral-800"
        >
          Name
        </label>
        <input
          {...register('name', { required: 'Name is required.' })}
          id="contact-name"
          type="text"
          name="name"
          autoComplete="name"
          maxLength={CONTACT_FORM_LIMITS.nameMax}
          placeholder="Your name"
          className={cn(fieldClassName, getError('name') && 'border-red-300')}
          disabled={isLoading}
        />
        {getError('name') ? (
          <p className="text-sm text-red-600" role="alert">
            {getError('name')}
          </p>
        ) : null}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="contact-email"
          className="text-sm font-medium text-neutral-800"
        >
          Email
        </label>
        <input
          {...register('email', { required: 'Email is required.' })}
          id="contact-email"
          type="email"
          name="email"
          autoComplete="email"
          maxLength={CONTACT_FORM_LIMITS.emailMax}
          placeholder="you@company.com"
          className={cn(fieldClassName, getError('email') && 'border-red-300')}
          disabled={isLoading}
        />
        {getError('email') ? (
          <p className="text-sm text-red-600" role="alert">
            {getError('email')}
          </p>
        ) : null}
      </div>

      <div className="space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <label
            htmlFor="contact-message"
            className="text-sm font-medium text-neutral-800"
          >
            Message
          </label>
          <Button
            type="button"
            variant="outline"
            size="default"
            className="h-9 gap-1.5 px-4 text-xs"
            onClick={applyRecruiterTemplate}
            disabled={isLoading}
          >
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            Use recruiter template
          </Button>
        </div>
        <textarea
          {...register('message', { required: 'Message is required.' })}
          id="contact-message"
          name="message"
          rows={6}
          maxLength={CONTACT_FORM_LIMITS.messageMax}
          placeholder="Share role details, team context, or next steps."
          className={cn(
            fieldClassName,
            'min-h-[160px] resize-y',
            getError('message') && 'border-red-300',
          )}
          disabled={isLoading}
        />
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-neutral-500">
          {getError('message') ? (
            <p className="text-sm text-red-600" role="alert">
              {getError('message')}
            </p>
          ) : (
            <span>Minimum {CONTACT_FORM_LIMITS.messageMin} characters.</span>
          )}
          <span aria-live="polite">{messageCharsLeft} characters left</span>
        </div>
      </div>

      {status === 'success' ? (
        <p
          className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
          role="status"
        >
          Thanks! Your message has been sent.
        </p>
      ) : null}

      {status === 'error' ? (
        <p
          className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
          role="alert"
        >
          Something went wrong. Please try again or contact me directly by
          email.
        </p>
      ) : null}

      <Button type="submit" size="lg" className="w-fit" disabled={isLoading}>
        {isLoading ? 'Sending...' : 'Send message'}
      </Button>
    </form>
  );
}
