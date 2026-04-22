import type { CSSProperties } from 'react';

export const HERO_BACKDROP_MOTION = {
  waveDurations: [9.5, 12.5, 15.5],
  palmSwayDegrees: 4,
  cloudCount: 3,
  glowIntensity: 0.28,
} as const;

const CLOUD_LAYERS = [
  {
    left: '14%',
    top: '20%',
    width: '11rem',
    duration: 46,
    delay: -11,
    opacity: 0.35,
  },
  {
    left: '43%',
    top: '14%',
    width: '9rem',
    duration: 59,
    delay: -27,
    opacity: 0.28,
  },
  {
    left: '68%',
    top: '24%',
    width: '7.5rem',
    duration: 52,
    delay: -16,
    opacity: 0.24,
  },
] as const;

type CssVars = CSSProperties & {
  '--wave-duration'?: string;
  '--wave-delay'?: string;
  '--cloud-duration'?: string;
  '--cloud-delay'?: string;
  '--cloud-opacity'?: string;
  '--cloud-size'?: string;
  '--sun-glow-alpha'?: string;
  '--palm-sway-max'?: string;
};

/**
 * Hero-only backdrop that keeps visuals softer than headline/CTA.
 * Layered assets are animated with transform/opacity only for performance.
 */
export function HeroBackdrop() {
  return (
    <div
      className="hero-beach-backdrop pointer-events-none absolute inset-0"
      aria-hidden
    >
      {/* Base composition from static assets for stable rendering quality. */}
      <div className="hero-beach-backdrop__sky-mountains" />
      <div className="hero-beach-backdrop__beach-sea" />
      <div className="hero-beach-backdrop__atmosphere" />

      <SunGlowLayer />
      <CloudLayer />
      <PalmMotionLayer />
      <WaveLayer />
      <div className="hero-beach-backdrop__bridge-fade" />

      {/* Readability veil keeps hero content visually dominant. */}
      <div className="hero-beach-backdrop__readability" />
    </div>
  );
}

function WaveLayer() {
  return (
    <div className="hero-beach-backdrop__waves">
      {HERO_BACKDROP_MOTION.waveDurations.map((duration, index) => (
        <span
          key={duration}
          className="hero-beach-backdrop__wave"
          style={
            {
              '--wave-duration': `${duration}s`,
              '--wave-delay': `${index * -2.4}s`,
            } as CssVars
          }
        />
      ))}
    </div>
  );
}

function CloudLayer() {
  return (
    <div className="hero-beach-backdrop__clouds">
      {CLOUD_LAYERS.slice(0, HERO_BACKDROP_MOTION.cloudCount).map((cloud) => (
        <span
          key={`${cloud.left}-${cloud.top}`}
          className="hero-beach-backdrop__cloud"
          style={
            {
              left: cloud.left,
              top: cloud.top,
              '--cloud-size': cloud.width,
              '--cloud-duration': `${cloud.duration}s`,
              '--cloud-delay': `${cloud.delay}s`,
              '--cloud-opacity': `${cloud.opacity}`,
            } as CssVars
          }
        />
      ))}
    </div>
  );
}

function SunGlowLayer() {
  return (
    <div className="hero-beach-backdrop__sun-zone">
      <span
        className="hero-beach-backdrop__sun-disc"
        style={
          {
            '--sun-glow-alpha': `${HERO_BACKDROP_MOTION.glowIntensity}`,
          } as CssVars
        }
      />
      <span className="hero-beach-backdrop__sun-ray" />
      <span className="hero-beach-backdrop__reflection" />
    </div>
  );
}

function PalmMotionLayer() {
  return (
    <div className="hero-beach-backdrop__palms">
      <PalmTree
        className="hero-beach-backdrop__palm hero-beach-backdrop__palm--far-left"
        swayDegrees={HERO_BACKDROP_MOTION.palmSwayDegrees}
      />
      <PalmTree
        className="hero-beach-backdrop__palm hero-beach-backdrop__palm--left-mid"
        swayDegrees={HERO_BACKDROP_MOTION.palmSwayDegrees - 0.8}
      />
      <PalmTree
        className="hero-beach-backdrop__palm hero-beach-backdrop__palm--right-mid"
        swayDegrees={HERO_BACKDROP_MOTION.palmSwayDegrees - 1}
      />
    </div>
  );
}

type PalmTreeProps = {
  className: string;
  swayDegrees: number;
};

function PalmTree({ className, swayDegrees }: PalmTreeProps) {
  return (
    <span className={className}>
      <span className="hero-beach-backdrop__palm-trunk" />
      <span className="hero-beach-backdrop__palm-crown-pivot">
        <span
          className="hero-beach-backdrop__palm-crown"
          style={
            {
              '--palm-sway-max': `${swayDegrees}deg`,
            } as CssVars
          }
        />
      </span>
    </span>
  );
}
