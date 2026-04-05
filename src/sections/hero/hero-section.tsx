import { MapPin, Mail } from 'lucide-react';

import { CtaButton } from '@/components/shared/cta-button';
import { MetricItem } from '@/components/shared/metric-item';
import { SectionContainer } from '@/components/shared/section-container';
import { TagBadge } from '@/components/shared/tag-badge';
import { profile } from '@/data/profile';

export function HeroSection() {
  return (
    <SectionContainer id="hero" className="pt-20 sm:pt-28">
      <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <div className="space-y-6">
          <TagBadge label="Frontend Engineer · 4+ Years" />
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance text-neutral-900 sm:text-5xl lg:text-6xl">
            {profile.fullName}
          </h1>
          <p className="max-w-2xl text-xl font-medium text-neutral-700">{profile.tagline}</p>
          <p className="max-w-2xl text-base leading-relaxed text-neutral-600">{profile.summary}</p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-600">
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              {profile.location}
            </span>
            <span className="inline-flex items-center gap-2">
              <Mail className="h-4 w-4" />
              {profile.email}
            </span>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <CtaButton label="View Resume" href="#" />
            <CtaButton label="Contact Me" href="#contact" variant="outline" />
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
          {profile.metrics.map((metric) => (
            <MetricItem key={metric.label} metric={metric} />
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
