'use client';

import { useRef } from 'react';

import { useGSAP } from '@/lib/gsap';
import { gsap } from '@/lib/gsap';

type FadeInOnViewProps = {
  children: React.ReactNode;
  y?: number;
  delay?: number;
};

export function FadeInOnView({ children, y = 16, delay = 0 }: FadeInOnViewProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) {
        return;
      }

      gsap.fromTo(
        ref.current,
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          delay,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 85%',
            once: true,
          },
        }
      );
    },
    { scope: ref }
  );

  return <div ref={ref}>{children}</div>;
}
