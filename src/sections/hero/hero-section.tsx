import { Mail, MapPin } from 'lucide-react';

import {
  HeroFluidBlob,
  HeroFluidBubbles,
} from '@/components/motion/hero-fluid-backdrop';
import { PageMascot } from '@/components/motion/page-mascot';
import { Typewriter } from '@/components/motion/typewriter';
import { MetricItem } from '@/components/shared/metric-item';
import { SectionContainer } from '@/components/shared/section-container';
import { TagBadge } from '@/components/shared/tag-badge';
import { profile } from '@/data/profile';

export function HeroSection() {
  return (
    <SectionContainer
      id="hero"
      className="overflow-hidden pt-20 sm:pt-28"
      decoration={
        <HeroFluidBlob
          position="right"
          top="0"
          right="1%"
          size="min(60vw, 500px)"
          morphDuration={15}
        />
      }
      bubbles={<HeroFluidBubbles />}
    >
      <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <div className="space-y-6">
          <PageMascot
            directions="/mascots/otter-directions.webp"
            reactions="/mascots/otter-reactions.webp"
            size={112}
            label={`${profile.fullName} mascot`}
            className="shrink-0"
          />
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-5">
            <h1 className="text-foreground max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              {profile.fullName}
            </h1>
          </div>
          <TagBadge label={`${profile.role} · 4+ Years`} />
          <Typewriter text={profile.heroTypewriterLines} />

          <div className="text-muted-foreground flex flex-wrap items-center gap-4 text-sm">
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              {profile.location}
            </span>
            <span className="inline-flex items-center gap-2">
              <Mail className="h-4 w-4" />
              {profile.email}
            </span>
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
