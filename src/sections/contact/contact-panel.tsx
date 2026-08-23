'use client';

import { ArrowUpRight, Copy, Mail } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/toast';
import { contactPanel } from '@/data/contact-panel';
import { profile } from '@/data/profile';

type ContactPanelProps = {
  onAskAbout: (prompt: string) => void;
};

export function ContactPanel({ onAskAbout }: ContactPanelProps) {
  const { success: showSuccessToast, error: showErrorToast } = useToast();

  const linkedIn = profile.socialLinks.find(
    (link) => link.label === contactPanel.linkedInLabel,
  );

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      showSuccessToast({
        title: contactPanel.emailCopiedTitle,
        description: profile.email,
      });
    } catch {
      showErrorToast({
        title: contactPanel.emailCopyFailedTitle,
        description: profile.email,
      });
    }
  };

  return (
    <aside
      aria-labelledby="contact-close-kit-title"
      className="border-border space-y-6 lg:col-start-2 lg:row-span-2 lg:border-l lg:pl-8"
    >
      <header className="space-y-2">
        <p className="text-xs font-semibold tracking-[0.22em] text-sky-600 uppercase dark:text-sky-400">
          {contactPanel.eyebrow}
        </p>
        <h3
          id="contact-close-kit-title"
          className="text-surface-foreground text-lg font-semibold"
        >
          {contactPanel.title}
        </h3>
      </header>

      <div className="space-y-3">
        <p className="text-surface-foreground text-sm font-medium">
          {contactPanel.directLineLabel}
        </p>

        <div className="flex items-center justify-between gap-3">
          <a
            href={`mailto:${profile.email}`}
            aria-label={`${contactPanel.emailLabel}: ${profile.email}`}
            className="text-muted-foreground hover:text-surface-foreground inline-flex min-w-0 items-center gap-2 text-sm"
          >
            <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span className="truncate">{profile.email}</span>
          </a>
          <Button
            type="button"
            variant="outline"
            className="h-9 shrink-0 px-3 text-xs"
            onClick={copyEmail}
          >
            <Copy className="h-3.5 w-3.5" aria-hidden="true" />
            {contactPanel.emailCopyLabel}
          </Button>
        </div>

        {linkedIn ? (
          <a
            href={linkedIn.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-surface-foreground inline-flex items-center gap-2 text-sm"
          >
            {contactPanel.linkedInLabel}
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        ) : null}
      </div>

      <div className="space-y-1">
        <p className="text-surface-foreground text-sm">
          {contactPanel.contract}
        </p>
        <p className="text-muted-foreground text-sm">{contactPanel.nextStep}</p>
      </div>

      <div className="space-y-2">
        <p className="text-surface-foreground text-sm font-medium">
          {contactPanel.hooksLabel}
        </p>
        <p className="text-subtle-foreground text-xs">
          {contactPanel.hooksHint}
        </p>
        <div className="flex flex-col gap-2">
          {contactPanel.hooks.map((hook) => (
            <button
              key={hook.id}
              type="button"
              onClick={() => onAskAbout(hook.messagePrompt)}
              className="border-border text-surface-foreground hover:bg-muted rounded-2xl border px-3 py-2 text-left text-sm focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:outline-none"
            >
              {hook.label}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
