'use client';

import { useEffect, useMemo, useState } from 'react';

import { cn } from '@/lib/utils';

type TypewriterProps = {
  /** Lines to type, delete, and cycle. */
  text: string | string[];
  /** Typing speed in ms per grapheme. @default 55 */
  speed?: number;
  /** Delete speed in ms per grapheme. @default 35 */
  deleteSpeed?: number;
  /** Pause after a line is fully typed. @default 1800 */
  waitTime?: number;
  /** Delay before the first grapheme. @default 400 */
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
 * Split by user-perceived characters (emoji, ZWJ sequences, etc.).
 * Avoids slicing UTF-16 surrogate pairs mid-glyph (broken 👋 → �).
 */
function splitIntoGraphemes(value: string): string[] {
  if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
    const segmenter = new Intl.Segmenter('en', { granularity: 'grapheme' });
    return Array.from(segmenter.segment(value), ({ segment }) => segment);
  }
  // Fallback: Array.from still splits most emoji as single code points better
  // than String#slice by index, but may not cover all ZWJ sequences.
  return Array.from(value);
}

/**
 * Fancy-style typewriter without Motion — React timers + CSS caret blink.
 * Advances by grapheme so emoji / complex scripts stay intact.
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

  const graphemeLines = useMemo(
    () => lines.map((line) => splitIntoGraphemes(line)),
    [lines],
  );

  const [displayText, setDisplayText] = useState('');
  const [lineIndex, setLineIndex] = useState(0);
  const [graphemeIndex, setGraphemeIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [started, setStarted] = useState(false);
  const [motionMode, setMotionMode] = useState<
    'pending' | 'animate' | 'static'
  >('pending');

  useEffect(() => {
    setMotionMode(prefersReducedMotion() ? 'static' : 'animate');
  }, []);

  useEffect(() => {
    if (motionMode !== 'animate' || graphemeLines.length === 0) {
      return;
    }

    if (!started) {
      const kickoff = window.setTimeout(() => {
        setStarted(true);
      }, initialDelay);
      return () => window.clearTimeout(kickoff);
    }

    const currentGraphemes = graphemeLines[lineIndex] ?? [];
    let timeout: number;

    if (!isDeleting && graphemeIndex < currentGraphemes.length) {
      timeout = window.setTimeout(() => {
        setDisplayText(currentGraphemes.slice(0, graphemeIndex + 1).join(''));
        setGraphemeIndex((prev) => prev + 1);
      }, speed);
    } else if (!isDeleting && graphemeIndex >= currentGraphemes.length) {
      if (graphemeLines.length === 1 && !loop) {
        return;
      }
      timeout = window.setTimeout(() => {
        setIsDeleting(true);
      }, waitTime);
    } else if (isDeleting && graphemeIndex > 0) {
      timeout = window.setTimeout(() => {
        setDisplayText(currentGraphemes.slice(0, graphemeIndex - 1).join(''));
        setGraphemeIndex((prev) => prev - 1);
      }, deleteSpeed);
    } else {
      const nextIndex = (lineIndex + 1) % graphemeLines.length;
      if (!loop && nextIndex === 0) {
        setIsDeleting(false);
        setDisplayText(currentGraphemes.join(''));
        setGraphemeIndex(currentGraphemes.length);
        return;
      }
      timeout = window.setTimeout(() => {
        setIsDeleting(false);
        setLineIndex(nextIndex);
        setGraphemeIndex(0);
        setDisplayText('');
      }, 0);
    }

    return () => window.clearTimeout(timeout);
  }, [
    graphemeLines,
    lineIndex,
    graphemeIndex,
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
