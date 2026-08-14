'use client';

import { useRef } from 'react';

import { SectionContainer } from '@/components/shared/section-container';
import { SectionHeading } from '@/components/shared/section-heading';
import { vastItems } from '@/data/vast';
import { gsap, useGSAP } from '@/lib/gsap';

/** Matches `FadeInOnView` motion language (hero / section entrances). */
const ENTRANCE_DURATION = 0.7;
const ENTRANCE_EASE = 'power2.out';
const ENTRANCE_START = 'top 85%';

export function VastSection() {
  const gridRef = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      const grid = gridRef.current;
      if (!grid) {
        return;
      }

      const items = gsap.utils.toArray<HTMLElement>(
        grid.querySelectorAll('[data-vast-item]'),
      );

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(items, { clearProps: 'all' });
        items.forEach((item) => {
          gsap.set(item.querySelectorAll('[data-vast-part]'), {
            autoAlpha: 1,
            y: 0,
          });
        });
        return;
      }

      const isMobile = window.matchMedia('(max-width: 639px)').matches;
      const driftY = isMobile ? 8 : 18;
      const stagger = isMobile ? 0.05 : 0.12;

      items.forEach((item) => {
        const parts = item.querySelectorAll<HTMLElement>('[data-vast-part]');

        gsap.fromTo(
          parts,
          { autoAlpha: 0, y: driftY },
          {
            autoAlpha: 1,
            y: 0,
            duration: ENTRANCE_DURATION,
            ease: ENTRANCE_EASE,
            stagger,
            scrollTrigger: {
              trigger: item,
              start: ENTRANCE_START,
              once: true,
            },
          },
        );
      });
    },
    { scope: gridRef },
  );

  return (
    <SectionContainer id="vast">
      <div className="space-y-8">
        <SectionHeading
          eyebrow="How I Engineer"
          title="V.A.S.T — principles that shape how I build"
          description="How I approach engineering work, not which tools I use. Tooling depth lives in Skills."
        />

        <ul
          ref={gridRef}
          className="grid list-none gap-8 sm:gap-10 md:grid-cols-2 md:gap-x-12 md:gap-y-12"
        >
          {vastItems.map((item) => (
            <li
              key={item.letter}
              data-vast-item
              className="flex min-w-0 gap-4 sm:gap-5"
            >
              <span
                data-vast-part
                aria-hidden="true"
                className="w-10 shrink-0 text-4xl font-semibold tracking-tight text-sky-600 sm:w-12 sm:text-5xl dark:text-sky-400"
              >
                {item.letter}
              </span>
              <div className="min-w-0 space-y-2 pt-1">
                <h3
                  data-vast-part
                  className="text-surface-foreground text-base font-semibold tracking-tight sm:text-lg"
                >
                  <span className="sr-only">{item.letter} — </span>
                  {item.title}
                </h3>
                <p
                  data-vast-part
                  className="text-muted-foreground text-sm leading-relaxed sm:text-base"
                >
                  {item.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </SectionContainer>
  );
}
