'use client';

import { useToast } from '@/components/ui/toast';
import emailjs from '@emailjs/browser';
import { Sparkles } from 'lucide-react';
import Script from 'next/script';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { profile } from '@/data/profile';
import {
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

const RECAPTCHA_SCRIPT_SRC =
  'https://www.google.com/recaptcha/api.js?render=explicit';

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
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  const { success: showSuccessToast, error: showErrorToast } = useToast();

  const recaptchaContainerRef = useRef<HTMLDivElement | null>(null);
  const recaptchaWidgetIdRef = useRef<number | null>(null);
  const successPanelRef = useRef<HTMLDivElement | null>(null);

  const [status, setStatus] = useState<FormStatus>('idle');
  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<ContactFormFieldErrors>({});
  const [isTemplateLoading, setIsTemplateLoading] = useState(false);

  const [recaptchaToken, setRecaptchaToken] = useState('');
  const [recaptchaError, setRecaptchaError] = useState('');
  const [isRecaptchaReady, setIsRecaptchaReady] = useState(false);

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

  const scriptLoadedRef = useRef(false);

  const renderRecaptcha = useCallback(() => {
    if (
      !recaptchaSiteKey ||
      !recaptchaContainerRef.current ||
      !window.grecaptcha
    ) {
      return;
    }

    if (recaptchaWidgetIdRef.current !== null) {
      return;
    }

    window.grecaptcha.ready(() => {
      if (
        !recaptchaContainerRef.current ||
        recaptchaWidgetIdRef.current !== null
      ) {
        return;
      }

      recaptchaWidgetIdRef.current = window.grecaptcha!.render(
        recaptchaContainerRef.current,
        {
          sitekey: recaptchaSiteKey,
          theme: 'light',
          size: 'normal',
          callback: (token) => {
            setRecaptchaToken(token);
            setRecaptchaError('');
          },
          'expired-callback': () => {
            setRecaptchaToken('');
            setRecaptchaError('reCAPTCHA expired. Please verify again.');
          },
          'error-callback': () => {
            setRecaptchaToken('');
            setRecaptchaError('reCAPTCHA failed to load. Please try again.');
          },
        },
      );
    });

    setIsRecaptchaReady(true);
  }, [recaptchaSiteKey]);

  const resetRecaptcha = () => {
    if (
      typeof window === 'undefined' ||
      !window.grecaptcha ||
      recaptchaWidgetIdRef.current === null
    ) {
      return;
    }

    window.grecaptcha.reset(recaptchaWidgetIdRef.current);
    setRecaptchaToken('');
  };

  const removeContactHash = () => {
    if (
      typeof window === 'undefined' ||
      window.location.hash !== '#contact-form'
    ) {
      return;
    }

    const cleanUrl = `${window.location.pathname}${window.location.search}`;

    window.history.replaceState(null, '', cleanUrl);
  };

  const applyRecruiterTemplate = async () => {
    if (isLoading || isTemplateLoading) {
      return;
    }

    setIsTemplateLoading(true);
    // setStatus('idle');

    try {
      const { buildRecruiterOutreachTemplate } =
        await import('@/lib/recruiter-template');

      setValue('message', buildRecruiterOutreachTemplate(profile.fullName), {
        shouldDirty: true,
        shouldValidate: true,
      });
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error(
          '[ContactForm] Failed to load recruiter template:',
          error,
        );
      }

      // setStatus('error');
      showErrorToast({
        title: 'Could not load the recruiter template.',
        description: 'Please type your message manually and try again.',
      });
    } finally {
      setIsTemplateLoading(false);
    }
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

    if (!recaptchaToken) {
      setRecaptchaError('Please verify that you are not a robot.');
      // setStatus('idle');
      return;
    }

    setFieldErrors({});
    setRecaptchaError('');
    // setStatus('idle');

    const config = getEmailJsConfig();

    if (!config) {
      // setStatus('error');
      showErrorToast({
        title: 'Contact form is unavailable.',
        description:
          'Please refresh the page or contact me directly by email instead.',
      });

      resetRecaptcha();
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
          'g-recaptcha-response': recaptchaToken,
        },
        { publicKey: config.publicKey },
      );

      // setStatus('success');
      reset(defaultValues);
      resetRecaptcha();
      removeContactHash();

      showSuccessToast({
        title: 'Message sent successfully.',
        description:
          'Thanks for reaching out. I will reply to the email address you provided.',
      });
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('[ContactForm] EmailJS send failed:', error);
      }

      // setStatus('error');
      resetRecaptcha();

      showErrorToast({
        title: 'Message was not sent.',
        description:
          'Please try again or contact me directly by email if the issue continues.',
        duration: 8000,
      });
    } finally {
      setIsLoading(false);
    }
  });

  const getError = (field: keyof ContactFormFields) =>
    fieldErrors[field] ?? rhfErrors[field]?.message;

  useEffect(() => {
    renderRecaptcha();
  }, [renderRecaptcha]);

  // useEffect(() => {
  //   const sub = watch(() => {
  //     if (status !== 'idle') {
  //       setStatus('idle');
  //     }
  //   });

  //   return () => sub.unsubscribe();
  // }, [watch, status]);

  // useEffect(() => {
  //   if (status !== 'success') {
  //     return;
  //   }

  //   if (window.location.hash === '#contact-form') {
  //     const cleanUrl = `${window.location.pathname}${window.location.search}`;

  //     window.history.replaceState(null, '', cleanUrl);
  //   }

  //   const animationFrameId = window.requestAnimationFrame(() => {
  //     successPanelRef.current?.scrollIntoView({
  //       behavior: 'smooth',
  //       block: 'nearest',
  //     });

  //     successPanelRef.current?.focus({
  //       preventScroll: true,
  //     });
  //   });

  //   return () => {
  //     window.cancelAnimationFrame(animationFrameId);
  //   };
  // }, [status]);

  return (
    <div>
      {recaptchaSiteKey ? (
        <Script
          src={RECAPTCHA_SCRIPT_SRC}
          strategy="afterInteractive"
          onReady={() => {
            scriptLoadedRef.current = true;
            renderRecaptcha();
          }}
          onError={() => {
            setRecaptchaError('reCAPTCHA script failed to load.');
          }}
        />
      ) : null}

      <form
        className="flex w-full max-w-xl flex-col gap-4"
        onSubmit={onSubmit}
        noValidate
      >
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
            className={cn(
              fieldClassName,
              getError('email') && 'border-red-300',
            )}
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
              disabled={isLoading || isTemplateLoading}
            >
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              {isTemplateLoading
                ? 'Loading template...'
                : 'Use recruiter template'}
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
            disabled={isLoading || isTemplateLoading}
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

        <div className="space-y-2">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="h-[66px] w-[258px] shrink-0 overflow-visible">
              <div
                ref={recaptchaContainerRef}
                className="origin-top-left scale-[0.85]"
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full shrink-0 sm:w-fit"
              disabled={isLoading || isTemplateLoading}
            >
              {isLoading ? 'Sending...' : 'Send message'}
            </Button>
          </div>

          {!recaptchaSiteKey ? (
            <p className="text-sm text-red-600" role="alert">
              reCAPTCHA site key is missing.
            </p>
          ) : null}

          {recaptchaError ? (
            <p className="text-sm text-red-600" role="alert">
              {recaptchaError}
            </p>
          ) : null}

          {recaptchaSiteKey && !isRecaptchaReady ? (
            <p className="text-xs text-neutral-500">Loading reCAPTCHA...</p>
          ) : null}
        </div>
      </form>
    </div>
  );
}
