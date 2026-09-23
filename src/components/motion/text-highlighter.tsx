'use client';

import { useRef } from 'react';

import { gsap, useGSAP } from '@/lib/gsap';
import { cn } from '@/lib/utils';

/** Matches `FadeInOnView` / V.A.S.T entrance language. */
const HIGHLIGHT_DURATION = 0.85;
const HIGHLIGHT_EASE = 'power2.out';
const HIGHLIGHT_START = 'top 85%';

type TextHighlighterProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Scroll-triggered LTR highlight reveal via CSS gradient `background-size`.
 * GSAP + CSS only — no Motion.
 */
export function TextHighlighter({ children, className }: TextHighlighterProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) {
        return;
      }

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(el, { backgroundSize: '100% 100%' });
        return;
      }

      gsap.fromTo(
        el,
        { backgroundSize: '0% 100%' },
        {
          backgroundSize: '100% 100%',
          duration: HIGHLIGHT_DURATION,
          ease: HIGHLIGHT_EASE,
          scrollTrigger: {
            trigger: el,
            start: HIGHLIGHT_START,
            once: true,
          },
        },
      );
    },
    { scope: ref },
  );

  return (
    <mark ref={ref} className={cn('text-highlighter', className)}>
      {children}
    </mark>
  );
}
