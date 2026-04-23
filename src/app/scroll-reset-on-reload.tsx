'use client';

import { useEffect } from 'react';

import { ScrollTrigger } from '@/lib/gsap';

function isReloadNavigation() {
  const [navigationEntry] = performance.getEntriesByType('navigation');

  if (!navigationEntry) {
    return false;
  }

  return (
    navigationEntry instanceof PerformanceNavigationTiming &&
    navigationEntry.type === 'reload'
  );
}

export function ScrollResetOnReload() {
  useEffect(() => {
    if (!isReloadNavigation()) {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'auto';
      }
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    ScrollTrigger.clearScrollMemory();
    ScrollTrigger.refresh();
  }, []);

  return null;
}
