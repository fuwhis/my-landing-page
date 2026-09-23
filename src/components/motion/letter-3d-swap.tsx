'use client';

import React, { type ElementType, useCallback, useMemo, useRef } from 'react';

import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { cn } from '@/lib/utils';

/** Approximate Fancy spring `{ damping: 30, stiffness: 300 }`. */
const SWAP_DURATION = 0.7;
const SWAP_EASE = 'power3.out';
const AUTO_INTERVAL_MS = 4800;

type RotateDirection = 'top' | 'right' | 'bottom' | 'left';
type StaggerFrom = 'first' | 'last' | 'center' | 'random' | number;

type Letter3DSwapProps = {
  /** Prefer `children`; `label` is a short-string convenience for single letters. */
  children?: React.ReactNode;
  label?: string;
  as?: ElementType;
  mainClassName?: string;
  frontFaceClassName?: string;
  secondFaceClassName?: string;
  staggerDuration?: number;
  staggerFrom?: StaggerFrom;
  rotateDirection?: RotateDirection;
  /**
   * When true, excluded from the accessibility tree (pair with visible text
   * elsewhere). Default false exposes text via `sr-only`.
   */
  decorative?: boolean;
};

type WordObject = {
  characters: string[];
  needsSpace: boolean;
};

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function canHoverFinePointer(): boolean {
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
}

function splitIntoCharacters(text: string): string[] {
  if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
    const segmenter = new Intl.Segmenter('en', { granularity: 'grapheme' });
    return Array.from(segmenter.segment(text), ({ segment }) => segment);
  }
  return Array.from(text);
}

function extractTextFromChildren(children: React.ReactNode): string {
  if (children == null) {
    return '';
  }
  if (typeof children === 'string') {
    return children;
  }
  if (typeof children === 'number') {
    return String(children);
  }
  if (Array.isArray(children)) {
    return children.map(extractTextFromChildren).join('');
  }
  if (React.isValidElement(children)) {
    const childText = (children.props as { children?: React.ReactNode })
      .children;
    if (childText != null) {
      return extractTextFromChildren(childText);
    }
  }
  return '';
}

function rotationTransformFor(direction: RotateDirection): string {
  switch (direction) {
    case 'top':
      return 'rotateX(90deg)';
    case 'right':
      return 'rotateY(90deg)';
    case 'bottom':
      return 'rotateX(-90deg)';
    case 'left':
      // Fancy uses +90deg for both left and right; face placement differs.
      return 'rotateY(90deg)';
    default:
      return 'rotateY(90deg)';
  }
}

function staggerFromToGsap(
  staggerFrom: StaggerFrom,
): 'start' | 'end' | 'center' | 'random' | number {
  if (typeof staggerFrom === 'number') {
    return staggerFrom;
  }
  switch (staggerFrom) {
    case 'last':
      return 'end';
    case 'center':
      return 'center';
    case 'random':
      return 'random';
    case 'first':
    default:
      return 'start';
  }
}

function CharBox({
  char,
  frontFaceClassName,
  secondFaceClassName,
  rotateDirection,
}: {
  char: string;
  frontFaceClassName?: string;
  secondFaceClassName?: string;
  rotateDirection: RotateDirection;
}) {
  const secondFaceTransform = (() => {
    switch (rotateDirection) {
      case 'top':
        return 'rotateX(-90deg) translateZ(0.5lh)';
      case 'right':
        return 'rotateY(90deg) translateX(50%) rotateY(-90deg) translateX(-50%) rotateY(-90deg) translateX(50%)';
      case 'bottom':
        return 'rotateX(90deg) translateZ(0.5lh)';
      case 'left':
        return 'rotateY(90deg) translateX(50%) rotateY(-90deg) translateX(50%) rotateY(-90deg) translateX(50%)';
      default:
        return 'rotateY(90deg) translateZ(1ch)';
    }
  })();

  const boxBaseTransform =
    rotateDirection === 'top' || rotateDirection === 'bottom'
      ? 'translateZ(-0.5lh)'
      : 'rotateY(90deg) translateX(50%) rotateY(-90deg)';

  const frontFaceTransform =
    rotateDirection === 'top' || rotateDirection === 'bottom'
      ? 'translateZ(0.5lh)'
      : rotateDirection === 'left'
        ? 'rotateY(90deg) translateX(50%) rotateY(-90deg)'
        : 'rotateY(-90deg) translateX(50%) rotateY(90deg)';

  return (
    <span
      className="letter-3d-swap-char-box"
      style={{ transform: boxBaseTransform }}
    >
      {/* Tween target only — base centering transform stays on the parent. */}
      <span className="letter-3d-swap-char-box-item">
        <span
          className={cn('letter-3d-swap-char-face-front', frontFaceClassName)}
          style={{ transform: frontFaceTransform }}
        >
          {char}
        </span>
        <span
          className={cn('letter-3d-swap-char-face-second', secondFaceClassName)}
          style={{ transform: secondFaceTransform }}
        >
          {char}
        </span>
      </span>
    </span>
  );
}

/**
 * Fancy-style 3D letter swap, orchestrated with GSAP (no Motion).
 * Fine pointer: hover. Touch/coarse: in-view auto-swap. Reduced-motion: static.
 */
export function Letter3DSwap({
  children,
  label,
  as: ElementTag = 'span',
  mainClassName,
  frontFaceClassName,
  secondFaceClassName,
  staggerDuration = 0.05,
  staggerFrom = 'first',
  rotateDirection = 'right',
  decorative = false,
}: Letter3DSwapProps) {
  const rootRef = useRef<HTMLElement>(null);

  const text = useMemo(() => {
    if (label != null && label !== '') {
      return label;
    }
    try {
      return extractTextFromChildren(children);
    } catch {
      return '';
    }
  }, [children, label]);

  const characters = useMemo((): WordObject[] => {
    const words = text.length > 0 ? text.split(' ') : [];
    return words.map((word, i) => ({
      characters: splitIntoCharacters(word),
      needsSpace: i !== words.length - 1,
    }));
  }, [text]);

  const playSwap = useCallback(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) {
      return gsap.timeline();
    }

    const boxes = gsap.utils.toArray<HTMLElement>(
      root.querySelectorAll('.letter-3d-swap-char-box-item'),
    );
    if (boxes.length === 0) {
      return gsap.timeline();
    }

    const rotationTransform = rotationTransformFor(rotateDirection);

    gsap.killTweensOf(boxes);
    gsap.set(boxes, { transform: 'rotateX(0deg) rotateY(0deg)' });

    return gsap.to(boxes, {
      transform: rotationTransform,
      duration: SWAP_DURATION,
      ease: SWAP_EASE,
      stagger: {
        each: staggerDuration,
        from: staggerFromToGsap(staggerFrom),
      },
      onComplete: () => {
        // Fancy resets to identity on the tween layer; parent keeps base offset.
        gsap.set(boxes, { transform: 'rotateX(0deg) rotateY(0deg)' });
      },
    });
  }, [rotateDirection, staggerDuration, staggerFrom]);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root || prefersReducedMotion()) {
        return;
      }

      const boxes = root.querySelectorAll<HTMLElement>(
        '.letter-3d-swap-char-box-item',
      );

      let busy = false;
      let active: gsap.core.Tween | gsap.core.Timeline | undefined;

      const run = () => {
        if (busy) {
          return;
        }
        busy = true;
        active?.kill();
        active = playSwap();
        active.eventCallback('onComplete', () => {
          busy = false;
          active = undefined;
        });
      };

      if (canHoverFinePointer()) {
        const onEnter = () => {
          run();
        };

        root.addEventListener('mouseenter', onEnter);

        return () => {
          root.removeEventListener('mouseenter', onEnter);
          active?.kill();
          gsap.killTweensOf(boxes);
        };
      }

      let intervalId: ReturnType<typeof setInterval> | undefined;

      const stopAuto = () => {
        if (intervalId !== undefined) {
          clearInterval(intervalId);
          intervalId = undefined;
        }
      };

      const startAuto = () => {
        stopAuto();
        intervalId = setInterval(run, AUTO_INTERVAL_MS);
      };

      const trigger = ScrollTrigger.create({
        trigger: root,
        start: 'top 90%',
        end: 'bottom top',
        onEnter: () => {
          run();
          startAuto();
        },
        onEnterBack: () => {
          startAuto();
        },
        onLeave: stopAuto,
        onLeaveBack: stopAuto,
      });

      return () => {
        stopAuto();
        trigger.kill();
        active?.kill();
        gsap.killTweensOf(boxes);
      };
    },
    {
      scope: rootRef,
      dependencies: [playSwap, text, rotateDirection],
    },
  );

  return (
    <ElementTag
      ref={rootRef as React.Ref<HTMLElement>}
      className={cn('letter-3d-swap', mainClassName)}
      data-rotate={rotateDirection}
      aria-hidden={decorative || undefined}
    >
      {decorative ? null : <span className="sr-only">{text}</span>}

      {characters.map((wordObj, wordIndex, array) => {
        const previousCharsCount = array
          .slice(0, wordIndex)
          .reduce((sum, word) => sum + word.characters.length, 0);

        return (
          <span key={wordIndex} className="letter-3d-swap-word">
            {wordObj.characters.map((char, charIndex) => {
              const totalIndex = previousCharsCount + charIndex;
              return (
                <CharBox
                  key={totalIndex}
                  char={char}
                  frontFaceClassName={frontFaceClassName}
                  secondFaceClassName={secondFaceClassName}
                  rotateDirection={rotateDirection}
                />
              );
            })}
            {wordObj.needsSpace ? (
              <span className="letter-3d-swap-space"> </span>
            ) : null}
          </span>
        );
      })}
    </ElementTag>
  );
}
