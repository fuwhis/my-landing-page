'use client';

import { useCallback, useState } from 'react';

import { contactPanel } from '@/data/contact-panel';

import { ContactForm } from './contact-form';
import { ContactPanel } from './contact-panel';

export function ContactCard() {
  const [seedMessage, setSeedMessage] = useState<string | null>(null);

  const handleAskAbout = useCallback((prompt: string) => {
    setSeedMessage(prompt);
  }, []);

  const handleSeedConsumed = useCallback(() => {
    setSeedMessage(null);
  }, []);

  return (
    <div
      id="contact-form"
      className="border-border bg-surface grid gap-8 rounded-2xl border p-6 sm:p-8 lg:grid-cols-[minmax(0,36rem)_minmax(16rem,1fr)] lg:items-start"
    >
      <div className="space-y-2">
        <h3 className="text-surface-foreground text-lg font-semibold">
          {contactPanel.formIntroTitle}
        </h3>
        <p className="text-muted-foreground text-sm">
          {contactPanel.formIntroDescription}
        </p>
      </div>

      <ContactPanel onAskAbout={handleAskAbout} />

      <div>
        <ContactForm
          seedMessage={seedMessage}
          onSeedConsumed={handleSeedConsumed}
        />
      </div>
    </div>
  );
}
