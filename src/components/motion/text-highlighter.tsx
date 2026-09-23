'use client';

import {
  type ElementType,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';

import { gsap, ScrollTrigger } from '@/lib/gsap';
import { cn } from '@/lib/utils';

/** Approximate Fancy spring `{ type: "spring", duration: 1, bounce: 0 }`. */
const HIGHLIGHT_DURATION = 1;
const HIGHLIGHT_EASE = 'power2.out';

type HighlightDirection = 'ltr' | 'rtl' | 'ttb' | 'btt';

type TextHighlighterProps = {
  children: React.ReactNode;
  /**
   * Wrapper element. Prefer `span` for inline copy.
   * If you pass `mark`, UA yellow fill is cleared via transparent background.
   * @default "span"
   */
  as?: ElementType;
  /** @default "inView" */
  triggerType?: 'hover' | 'ref' | 'inView' | 'auto';
  /** Seconds; maps Fancy `transition.duration`. @default 1 */
  duration?: number;
  /** Delay before the reveal tween starts. @default 0 */
  delay?: number;
  /**
   * In-view options when `triggerType` is `"inView"`.
   * `amount` is approximated via ScrollTrigger `start`.
   */
  useInViewOptions?: {
    once?: boolean;
    amount?: number;
  };
  className?: string;
  /**
   * CSS color for the highlight fill. When omitted, uses
   * `--text-highlighter-color` from `tokens.css` (light/dark).
   */
  highlightColor?: string;
  /** @default "ltr" */
  direction?: HighlightDirection;
} & Omit<React.HTMLAttributes<HTMLElement>, 'as' | 'children' | 'className'>;

export type TextHighlighterRef = {
  animate: (direction?: HighlightDirection) => void;
  reset: () => void;
};

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function getBackgroundSize(
  direction: HighlightDirection,
  animated: boolean,
): string {
  switch (direction) {
    case 'ttb':
    case 'btt':
      return animated ? '100% 100%' : '100% 0%';
    case 'ltr':
    case 'rtl':
    default:
      return animated ? '100% 100%' : '0% 100%';
  }
}

function getBackgroundPosition(direction: HighlightDirection): string {
  switch (direction) {
    case 'rtl':
      return '100% 0%';
    case 'btt':
      return '0% 100%';
    case 'ttb':
    case 'ltr':
    default:
      return '0% 0%';
  }
}

/**
 * Fancy-style text highlighter, orchestrated with GSAP (no Motion).
 * Single paint surface — only `background-image` carries the fill color.
 */
export const TextHighlighter = forwardRef<
  TextHighlighterRef,
  TextHighlighterProps
>(function TextHighlighter(
  {
    children,
    as: ElementTag = 'span',
    triggerType = 'inView',
    duration = HIGHLIGHT_DURATION,
    delay = 0,
    useInViewOptions,
    className,
    highlightColor,
    direction = 'ltr',
    onMouseEnter,
    onMouseLeave,
    style,
    ...props
  },
  ref,
) {
  const nodeRef = useRef<HTMLElement>(null);

  const inViewOnce = useInViewOptions?.once ?? true;
  const inViewAmount = useInViewOptions?.amount ?? 0.1;

  const [isAnimating, setIsAnimating] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [currentDirection, setCurrentDirection] =
    useState<HighlightDirection>(direction);

  useEffect(() => {
    setCurrentDirection(direction);
  }, [direction]);

  useImperativeHandle(ref, () => ({
    animate: (animationDirection?: HighlightDirection) => {
      if (animationDirection) {
        setCurrentDirection(animationDirection);
      }
      setIsAnimating(true);
    },
    reset: () => {
      setIsAnimating(false);
    },
  }));

  useEffect(() => {
    if (triggerType !== 'inView') {
      return;
    }

    const node = nodeRef.current;
    if (!node) {
      return;
    }

    const startOffset = Math.round(
      (1 - Math.min(Math.max(inViewAmount, 0), 1)) * 100,
    );

    const trigger = ScrollTrigger.create({
      trigger: node,
      start: `top ${startOffset}%`,
      onEnter: () => {
        setIsInView(true);
      },
      onLeaveBack: () => {
        if (!inViewOnce) {
          setIsInView(false);
        }
      },
      once: inViewOnce,
    });

    return () => {
      trigger.kill();
    };
  }, [triggerType, inViewOnce, inViewAmount]);

  const shouldAnimate =
    triggerType === 'hover'
      ? isHovered
      : triggerType === 'inView'
        ? isInView
        : triggerType === 'ref'
          ? isAnimating
          : triggerType === 'auto'
            ? true
            : false;

  const animatedSize = useMemo(
    () => getBackgroundSize(currentDirection, shouldAnimate),
    [shouldAnimate, currentDirection],
  );
  const collapsedSize = useMemo(
    () => getBackgroundSize(currentDirection, false),
    [currentDirection],
  );
  const backgroundPosition = useMemo(
    () => getBackgroundPosition(currentDirection),
    [currentDirection],
  );

  useEffect(() => {
    const el = nodeRef.current;
    if (!el) {
      return;
    }

    const targetSize = shouldAnimate ? animatedSize : collapsedSize;

    if (prefersReducedMotion()) {
      gsap.set(el, {
        backgroundSize: shouldAnimate
          ? getBackgroundSize(currentDirection, true)
          : collapsedSize,
      });
      return;
    }

    gsap.killTweensOf(el);
    gsap.to(el, {
      backgroundSize: targetSize,
      duration,
      delay,
      ease: HIGHLIGHT_EASE,
      overwrite: true,
    });
  }, [
    shouldAnimate,
    animatedSize,
    collapsedSize,
    currentDirection,
    duration,
    delay,
  ]);

  const fillColor = highlightColor ?? 'var(--text-highlighter-color)';

  return (
    <ElementTag
      {...props}
      ref={nodeRef as React.Ref<HTMLElement>}
      className={cn(
        'inline rounded-[0.2em] bg-transparent box-decoration-clone px-[0.12em] text-inherit not-italic',
        className,
      )}
      style={
        {
          ...style,
          // Kill UA <mark> background-color so only background-image paints.
          backgroundColor: 'transparent',
          backgroundImage: `linear-gradient(${fillColor}, ${fillColor})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition,
          backgroundSize: collapsedSize,
        } as React.CSSProperties
      }
      onMouseEnter={(event: React.MouseEvent<HTMLElement>) => {
        onMouseEnter?.(event);
        if (triggerType === 'hover') {
          setIsHovered(true);
        }
      }}
      onMouseLeave={(event: React.MouseEvent<HTMLElement>) => {
        onMouseLeave?.(event);
        if (triggerType === 'hover') {
          setIsHovered(false);
        }
      }}
    >
      {children}
    </ElementTag>
  );
});

TextHighlighter.displayName = 'TextHighlighter';

export default TextHighlighter;
