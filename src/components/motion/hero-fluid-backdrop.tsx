import type { CSSProperties, ReactNode } from 'react';

import { cn } from '@/lib/utils';

const BUBBLE_COUNT = 40;

const DEFAULT_BLOB_SIZE = 'min(52vw, 420px)';
const DEFAULT_MORPH_DURATION_S = 22;

export type HeroFluidBlobPosition = 'left' | 'right';

/** CSS length (`"1%"`, `"5px"`) or a number treated as pixels. */
export type HeroFluidInset = string | number;

export type HeroFluidBlobProps = {
  position?: HeroFluidBlobPosition;
  top?: HeroFluidInset;
  right?: HeroFluidInset;
  bottom?: HeroFluidInset;
  left?: HeroFluidInset;
  /** Sets width and height. Default `min(52vw, 420px)`. */
  size?: HeroFluidInset;
  width?: HeroFluidInset;
  height?: HeroFluidInset;
  /** Morph animation duration in seconds. Default 22. */
  morphDuration?: number;
  /** Uniform `scale()`. Multiplies axis scales when combined with scaleX/Y/Z. */
  scale?: number;
  /** Default `1` (right) or `-1` (left mirror). */
  scaleX?: number;
  /** Default `1`. */
  scaleY?: number;
  /** Default `1`. */
  scaleZ?: number;
  /** Full `scale3d(x, y, z)` — overrides scale / scaleX / scaleY / scaleZ. */
  scale3d?: readonly [number, number, number] | string;
  className?: string;
};

function toCssLength(value: HeroFluidInset): string {
  return typeof value === 'number' ? `${value}px` : value;
}

function defaultScaleX(position: HeroFluidBlobPosition): number {
  return position === 'left' ? -1 : 1;
}

function buildBlobTransform({
  position,
  scale,
  scaleX,
  scaleY,
  scaleZ,
  scale3d,
}: Pick<
  HeroFluidBlobProps,
  'scale' | 'scaleX' | 'scaleY' | 'scaleZ' | 'scale3d' | 'position'
> & { position: HeroFluidBlobPosition }): string | undefined {
  if (scale3d != null) {
    const value = Array.isArray(scale3d) ? scale3d.join(', ') : scale3d;
    return `scale3d(${value})`;
  }

  const resolvedScaleX = scaleX ?? defaultScaleX(position);
  const resolvedScaleY = scaleY ?? 1;
  const resolvedScaleZ = scaleZ ?? 1;

  const parts: string[] = [];

  if (scale != null) {
    parts.push(`scale(${scale})`);
  }

  if (scaleX != null || resolvedScaleX !== 1) {
    parts.push(`scaleX(${resolvedScaleX})`);
  }

  if (scaleY != null && resolvedScaleY !== 1) {
    parts.push(`scaleY(${resolvedScaleY})`);
  }

  if (scaleZ != null && resolvedScaleZ !== 1) {
    parts.push(`scaleZ(${resolvedScaleZ})`);
  }

  return parts.length > 0 ? parts.join(' ') : undefined;
}

function blobStyle({
  position,
  top,
  right,
  bottom,
  left,
  size,
  width,
  height,
  morphDuration,
  scale,
  scaleX,
  scaleY,
  scaleZ,
  scale3d,
}: HeroFluidBlobProps & { position: HeroFluidBlobPosition }): CSSProperties {
  const resolvedWidth = width ?? size ?? DEFAULT_BLOB_SIZE;
  const resolvedHeight = height ?? size ?? DEFAULT_BLOB_SIZE;
  const transform = buildBlobTransform({
    position,
    scale,
    scaleX,
    scaleY,
    scaleZ,
    scale3d,
  });

  return {
    ...(top != null ? { '--blob-top': toCssLength(top) } : null),
    ...(right != null ? { '--blob-right': toCssLength(right) } : null),
    ...(bottom != null ? { '--blob-bottom': toCssLength(bottom) } : null),
    ...(left != null ? { '--blob-left': toCssLength(left) } : null),
    '--blob-width': toCssLength(resolvedWidth),
    '--blob-height': toCssLength(resolvedHeight),
    '--blob-morph-duration': `${morphDuration ?? DEFAULT_MORPH_DURATION_S}s`,
    ...(transform ? { '--blob-transform': transform } : null),
  } as CSSProperties;
}

function HeroFluidLayer({ children }: { children: ReactNode }) {
  return (
    <div
      className="hero-fluid pointer-events-none absolute inset-0"
      aria-hidden
    >
      {children}
    </div>
  );
}

function createBubbleStyle(index: number): CSSProperties {
  // Deterministic pseudo-random values so SSR/CSR markup stays stable.
  const seed = index * 9301 + 49297;
  const random = (offset: number) => ((seed + offset * 233) % 233280) / 233280;

  const x = 4 + random(1) * 92;
  const size = 4 + random(2) * 6;
  const delay = random(3) * 12;
  const duration = 10 + random(4) * 12;
  const peakOpacity = 9.88 + random(5) * 0.16;
  const midOpacity = 0.2 + random(6) * 0.14;
  const drift = -16 + random(7) * 32;

  return {
    '--bubble-x': `${x.toFixed(2)}%`,
    '--bubble-size': `${size.toFixed(2)}px`,
    '--bubble-delay': `${delay.toFixed(2)}s`,
    '--bubble-duration': `${duration.toFixed(2)}s`,
    '--bubble-peak-opacity': peakOpacity.toFixed(2),
    '--bubble-mid-opacity': midOpacity.toFixed(2),
    '--bubble-drift': `${drift.toFixed(2)}px`,
  } as CSSProperties;
}

/**
 * Morphing organic blob. Styles live in `src/styles/components/hero-fluid.css`.
 * `position` chooses the side/mirror; inset, size, morph duration, and scale props
 * map to CSS variables on the blob element.
 */
export function HeroFluidBlob({
  position = 'right',
  top,
  right,
  bottom,
  left,
  size,
  width,
  height,
  morphDuration,
  scale,
  scaleX,
  scaleY,
  scaleZ,
  scale3d,
  className,
}: HeroFluidBlobProps) {
  return (
    <HeroFluidLayer>
      <div
        className={cn(
          'hero-fluid__blob',
          position === 'left'
            ? 'hero-fluid__blob--left'
            : 'hero-fluid__blob--right',
          className,
        )}
        style={blobStyle({
          position,
          top,
          right,
          bottom,
          left,
          size,
          width,
          height,
          morphDuration,
          scale,
          scaleX,
          scaleY,
          scaleZ,
          scale3d,
        })}
      />
    </HeroFluidLayer>
  );
}

/**
 * Rising-bubble layer. CSS-only; no GSAP / runtime animation.
 */
export function HeroFluidBubbles({ className }: { className?: string }) {
  return (
    <HeroFluidLayer>
      <div className={cn('hero-fluid__bubbles', className)}>
        {Array.from({ length: BUBBLE_COUNT }, (_, index) => (
          <span
            key={index}
            className="hero-fluid__bubble"
            style={createBubbleStyle(index)}
          />
        ))}
      </div>
    </HeroFluidLayer>
  );
}
