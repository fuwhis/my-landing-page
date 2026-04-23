'use client';

import { useMemo, useRef } from 'react';

import { gsap, useGSAP } from '@/lib/gsap';

type RollingMetricValueProps = {
  value: string;
};

type DigitToken = {
  kind: 'digit';
  digit: number;
};

type SeparatorToken = {
  kind: 'separator';
  char: string;
};

type ParsedMetricValue = {
  prefix: string;
  suffix: string;
  tokens: Array<DigitToken | SeparatorToken>;
};

function parseMetricValue(value: string): ParsedMetricValue | null {
  const match = value.trim().match(/^([^0-9]*)([0-9][0-9,]*)([^0-9]*)$/);

  if (!match) {
    return null;
  }

  const [, prefix, numberPart, suffix] = match;
  const tokens: ParsedMetricValue['tokens'] = [];

  for (const char of numberPart) {
    if (/\d/.test(char)) {
      tokens.push({ kind: 'digit', digit: Number(char) });
      continue;
    }

    if (char === ',') {
      tokens.push({ kind: 'separator', char });
      continue;
    }

    return null;
  }

  return { prefix, suffix, tokens };
}

function buildDigitSteps(targetDigit: number, turns: number) {
  const totalSteps = turns * 10 + targetDigit;
  return Array.from({ length: totalSteps + 1 }, (_, index) => index % 10);
}

export function RollingMetricValue({ value }: RollingMetricValueProps) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const digitTrackRefs = useRef<Array<HTMLSpanElement | null>>([]);

  const parsedValue = useMemo(() => parseMetricValue(value), [value]);

  useGSAP(
    () => {
      if (!rootRef.current || !parsedValue) {
        return;
      }

      const digitTokens = parsedValue.tokens.filter(
        (token): token is DigitToken => token.kind === 'digit'
      );
      const tracks = digitTrackRefs.current.filter(
        (track): track is HTMLSpanElement => track !== null
      );

      if (digitTokens.length === 0 || tracks.length === 0) {
        return;
      }

      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const targetSteps = digitTokens.map((token, index) => (2 + index) * 10 + token.digit);

      if (reducedMotion) {
        tracks.forEach((track, index) => {
          gsap.set(track, { y: `-${targetSteps[index]}em` });
        });
        return;
      }

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top 85%',
          once: true,
        },
      });

      tracks.forEach((track, index) => {
        timeline.to(
          track,
          {
            y: `-${targetSteps[index]}em`,
            duration: 1.1 + index * 0.1,
            ease: 'power4.out',
            force3D: true,
          },
          index * 0.06
        );
      });
    },
    { scope: rootRef, dependencies: [parsedValue] }
  );

  if (!parsedValue) {
    return <>{value}</>;
  }

  let digitIndex = 0;

  return (
    <span ref={rootRef} role="text" aria-label={value}>
      {parsedValue.prefix}
      {parsedValue.tokens.map((token, tokenIndex) => {
        if (token.kind === 'separator') {
          return (
            <span key={`sep-${tokenIndex}`} aria-hidden className="inline-block align-baseline">
              {token.char}
            </span>
          );
        }

        const currentDigitIndex = digitIndex;
        digitIndex += 1;

        const turns = 2 + currentDigitIndex;
        const steps = buildDigitSteps(token.digit, turns);

        return (
          <span
            key={`digit-${tokenIndex}`}
            aria-hidden
            className="inline-flex h-[1em] w-[0.65em] overflow-hidden align-baseline tabular-nums"
          >
            <span
              ref={(element) => {
                digitTrackRefs.current[currentDigitIndex] = element;
              }}
              className="flex flex-col will-change-transform"
            >
              {steps.map((stepDigit, stepIndex) => (
                <span
                  key={`${stepDigit}-${stepIndex}`}
                  className="flex h-[1em] items-center justify-center leading-none"
                >
                  {stepDigit}
                </span>
              ))}
            </span>
          </span>
        );
      })}
      {parsedValue.suffix}
    </span>
  );
}
