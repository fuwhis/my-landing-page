import type { CSSProperties } from 'react';

const BUBBLE_COUNT = 40;

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
 * CSS-only hero ambiance: morphing gradient blob + rising bubbles.
 * Animations live in `globals.css` (`.hero-fluid*`); no GSAP / runtime JS.
 */
export function HeroFluidBackdrop() {
  return (
    <div
      className="hero-fluid pointer-events-none absolute inset-0"
      aria-hidden
    >
      <div className="hero-fluid__blob" />
      <div className="hero-fluid__bubbles">
        {Array.from({ length: BUBBLE_COUNT }, (_, index) => (
          <span
            key={index}
            className="hero-fluid__bubble"
            style={createBubbleStyle(index)}
          />
        ))}
      </div>
    </div>
  );
}
