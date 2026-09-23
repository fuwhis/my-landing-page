'use client';

import { useEffect, useMemo, useState } from 'react';

import { cn } from '@/lib/utils';

type TypewriterProps = {
  /** Lines to type, delete, and cycle. */
  text: string | string[];
  /** Typing speed in ms per character. @default 55 */
  speed?: number;
  /** Delete speed in ms per character. @default 35 */
  deleteSpeed?: number;
  /** Pause after a line is fully typed. @default 1800 */
  waitTime?: number;
  /** Delay before the first character. @default 400 */
  initialDelay?: number;
  /** Loop through lines. @default true */
  loop?: boolean;
  /** Show caret. @default true */
  showCursor?: boolean;
  cursorChar?: string;
  className?: string;
};

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Fancy-style typewriter without Motion — React timers + CSS caret blink.
 */
export function Typewriter({
  text,
  speed = 55,
  deleteSpeed = 35,
  waitTime = 1800,
  initialDelay = 400,
  loop = true,
  showCursor = true,
  cursorChar = '|',
  className,
}: TypewriterProps) {
  const lines = useMemo(
    () => (Array.isArray(text) ? text.filter(Boolean) : [text].filter(Boolean)),
    [text],
  );

  const [displayText, setDisplayText] = useState('');
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [started, setStarted] = useState(false);
  const [motionMode, setMotionMode] = useState<
    'pending' | 'animate' | 'static'
  >('pending');

  useEffect(() => {
    setMotionMode(prefersReducedMotion() ? 'static' : 'animate');
  }, []);

  useEffect(() => {
    if (motionMode !== 'animate' || lines.length === 0) {
      return;
    }

    if (!started) {
      const kickoff = window.setTimeout(() => {
        setStarted(true);
      }, initialDelay);
      return () => window.clearTimeout(kickoff);
    }

    const currentLine = lines[lineIndex] ?? '';
    let timeout: number;

    if (!isDeleting && charIndex < currentLine.length) {
      timeout = window.setTimeout(() => {
        setDisplayText(currentLine.slice(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
      }, speed);
    } else if (!isDeleting && charIndex >= currentLine.length) {
      if (lines.length === 1 && !loop) {
        return;
      }
      timeout = window.setTimeout(() => {
        setIsDeleting(true);
      }, waitTime);
    } else if (isDeleting && charIndex > 0) {
      timeout = window.setTimeout(() => {
        setDisplayText(currentLine.slice(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
      }, deleteSpeed);
    } else {
      const nextIndex = (lineIndex + 1) % lines.length;
      if (!loop && nextIndex === 0) {
        setIsDeleting(false);
        setDisplayText(currentLine);
        setCharIndex(currentLine.length);
        return;
      }
      timeout = window.setTimeout(() => {
        setIsDeleting(false);
        setLineIndex(nextIndex);
        setCharIndex(0);
        setDisplayText('');
      }, 0);
    }

    return () => window.clearTimeout(timeout);
  }, [
    lines,
    lineIndex,
    charIndex,
    isDeleting,
    speed,
    deleteSpeed,
    waitTime,
    loop,
    started,
    initialDelay,
    motionMode,
  ]);

  if (lines.length === 0) {
    return null;
  }

  if (motionMode !== 'animate') {
    return (
      <p
        className={cn(
          'text-surface-foreground max-w-2xl text-xl font-medium text-balance',
          className,
        )}
      >
        {lines.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </p>
    );
  }

  const longestLine = lines.reduce(
    (longest, line) => (line.length > longest.length ? line : longest),
    '',
  );

  return (
    <p
      className={cn(
        'text-surface-foreground relative max-w-2xl text-xl font-medium text-balance',
        className,
      )}
      aria-live="polite"
      aria-atomic="true"
    >
      {/* Reserve height of the longest line to reduce CLS while cycling. */}
      <span className="invisible block whitespace-pre-wrap" aria-hidden="true">
        {longestLine}
      </span>
      <span className="absolute inset-0">
        <span className="whitespace-pre-wrap">{displayText}</span>
        {showCursor ? (
          <span
            className="ml-0.5 inline-block animate-pulse text-sky-600 dark:text-sky-400"
            aria-hidden="true"
          >
            {cursorChar}
          </span>
        ) : null}
      </span>
    </p>
  );
}
