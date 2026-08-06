'use client';

import { useEffect, useRef, useState } from 'react';

import { gsap } from '@/lib/gsap';

const MIN_VISIBLE_MS = 500;
const MAX_LOADING_MS = 3000;
const EXIT_DURATION_S = 0.4;

type LoadingPhase = 'showing' | 'exiting' | 'gone';

function waitForPageReady(): Promise<void> {
  const fontsReady = document.fonts?.ready ?? Promise.resolve();

  const windowLoad =
    document.readyState === 'complete'
      ? Promise.resolve()
      : new Promise<void>((resolve) => {
          window.addEventListener('load', () => resolve(), { once: true });
        });

  return Promise.all([fontsReady, windowLoad]).then(
    () =>
      new Promise<void>((resolve) => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => resolve());
        });
      }),
  );
}

function waitMs(ms: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

export function InitialPageLoading() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<LoadingPhase>('showing');
  const dismissedRef = useRef(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    document.body.setAttribute('aria-busy', 'true');

    let maxTimer = 0;

    const clearBusy = () => {
      document.body.removeAttribute('aria-busy');
    };

    const finish = () => {
      if (dismissedRef.current) {
        return;
      }
      dismissedRef.current = true;

      setPhase('exiting');

      const overlay = overlayRef.current;
      if (!overlay || prefersReducedMotion) {
        clearBusy();
        setPhase('gone');
        return;
      }

      gsap.to(overlay, {
        autoAlpha: 0,
        duration: EXIT_DURATION_S,
        ease: 'power2.out',
        onComplete: () => {
          clearBusy();
          setPhase('gone');
        },
      });
    };

    maxTimer = window.setTimeout(finish, MAX_LOADING_MS);

    Promise.all([waitForPageReady(), waitMs(MIN_VISIBLE_MS)]).then(() => {
      window.clearTimeout(maxTimer);
      finish();
    });

    return () => {
      window.clearTimeout(maxTimer);
      clearBusy();
    };
  }, []);

  useEffect(() => {
    if (phase !== 'showing' || !barRef.current) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    const tween = gsap.fromTo(
      barRef.current,
      { scaleX: 0.2, transformOrigin: 'left center' },
      {
        scaleX: 0.85,
        duration: 1.2,
        ease: 'power1.inOut',
        repeat: -1,
        yoyo: true,
      },
    );

    return () => {
      tween.kill();
    };
  }, [phase]);

  if (phase === 'gone') {
    return null;
  }

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-neutral-50"
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
    >
      <div
        className="mt-4 h-0.5 w-24 overflow-hidden rounded-full bg-neutral-200"
        aria-hidden="true"
      >
        <div
          ref={barRef}
          className="h-full w-full bg-sky-500 motion-reduce:scale-x-[0.55]"
        />
      </div>
      <span className="sr-only">please wait...</span>
    </div>
  );
}
