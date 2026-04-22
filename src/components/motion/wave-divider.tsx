import type { CSSProperties } from 'react';

import { cn } from '@/lib/utils';

export type WaveDividerLayer = {
  duration: number;
  delay: number;
  opacity: number;
  scale: number;
  driftX: number;
  breatheY: number;
  scaleBreathe?: number;
  opacityDrift?: number;
  blur?: number;
  motionPattern?: 'a' | 'b' | 'c' | 'd';
  pathData?: string;
  fill?: string;
  height?: number;
  bottom?: number;
};

export const DEFAULT_WAVE_DIVIDER_LAYERS: WaveDividerLayer[] = [
  {
    duration: 10,
    delay: 0,
    opacity: 0.12,
    opacityDrift: 0.02,
    scale: 1.004,
    driftX: 0.52,
    breatheY: 0.04,
    scaleBreathe: 0.0007,
    blur: 2.2,
    motionPattern: 'a',
    fill: 'rgb(241 249 252 / 0.28)',
    height: 106,
    bottom: 20,
    pathData:
      'M0 118C138 102 262 101 388 116C524 132 646 158 786 156C936 154 1058 119 1184 106C1292 96 1369 101 1440 112V220H0V118Z',
  },
  {
    duration: 13,
    delay: -2,
    opacity: 0.16,
    opacityDrift: 0.024,
    scale: 1.006,
    driftX: 0.68,
    breatheY: 0.055,
    scaleBreathe: 0.0009,
    blur: 1.4,
    motionPattern: 'b',
    fill: 'rgb(226 242 249 / 0.34)',
    height: 98,
    bottom: 14,
    pathData:
      'M0 132C124 118 252 112 388 124C528 136 664 166 802 166C940 167 1056 141 1178 129C1299 116 1381 117 1440 126V220H0V132Z',
  },
  {
    duration: 16,
    delay: -4,
    opacity: 0.2,
    opacityDrift: 0.028,
    scale: 1.008,
    driftX: 0.82,
    breatheY: 0.06,
    scaleBreathe: 0.0011,
    blur: 0.8,
    motionPattern: 'c',
    fill: 'rgb(204 233 245 / 0.4)',
    height: 92,
    bottom: 8,
    pathData:
      'M0 148C126 136 254 128 392 139C538 151 672 176 808 177C940 177 1055 154 1176 145C1302 136 1384 139 1440 146V220H0V148Z',
  },
  {
    duration: 19,
    delay: -6,
    opacity: 0.25,
    opacityDrift: 0.03,
    scale: 1.01,
    driftX: 0.94,
    breatheY: 0.07,
    scaleBreathe: 0.0012,
    blur: 0.25,
    motionPattern: 'd',
    fill: 'rgb(176 216 235 / 0.48)',
    height: 86,
    bottom: 2,
    pathData:
      'M0 162C122 150 262 143 406 154C548 164 684 187 822 188C948 188 1061 170 1186 160C1310 150 1390 153 1440 160V220H0V162Z',
  },
];

const DEFAULT_WAVE_PATH =
  'M0 120C120 98 230 90 350 108C470 126 590 154 720 150C850 146 968 110 1080 98C1192 86 1304 94 1440 122V220H0V120Z';

type WaveDividerStyleVars = CSSProperties & {
  '--divider-duration'?: string;
  '--divider-delay'?: string;
  '--divider-opacity-min'?: string;
  '--divider-opacity-max'?: string;
  '--divider-opacity'?: string;
  '--divider-scale'?: string;
  '--divider-drift-x'?: string;
  '--divider-breathe-y'?: string;
  '--divider-scale-breathe'?: string;
  '--divider-blur'?: string;
  '--divider-motion-name'?: string;
  '--divider-fill'?: string;
  '--divider-layer-height'?: string;
  '--divider-layer-bottom'?: string;
};

type WaveDividerProps = {
  className?: string;
  layers?: WaveDividerLayer[];
  layerCount?: number;
  pathData?: string;
};

export function WaveDivider({
  className,
  layers = DEFAULT_WAVE_DIVIDER_LAYERS,
  layerCount = layers.length,
  pathData = DEFAULT_WAVE_PATH,
}: WaveDividerProps) {
  return (
    <div className={cn('wave-divider', className)}>
      {layers.slice(0, layerCount).map((layer, index) => (
        <span
          key={`${layer.duration}-${layer.delay}-${index}`}
          className="wave-divider__layer"
          style={
            {
              '--divider-duration': `${layer.duration}s`,
              '--divider-delay': `${layer.delay}s`,
              '--divider-opacity': `${layer.opacity}`,
              '--divider-opacity-min': `${Math.max(
                0.01,
                layer.opacity - (layer.opacityDrift ?? 0.02),
              )}`,
              '--divider-opacity-max': `${Math.min(
                0.4,
                layer.opacity + (layer.opacityDrift ?? 0.02),
              )}`,
              '--divider-scale': `${layer.scale}`,
              '--divider-drift-x': `${layer.driftX}%`,
              '--divider-breathe-y': `${layer.breatheY}%`,
              '--divider-scale-breathe': `${layer.scaleBreathe ?? 0.003}`,
              '--divider-blur': `${layer.blur ?? 0}px`,
              '--divider-motion-name': `beach-divider-drift-${layer.motionPattern ?? 'a'}`,
              '--divider-fill': layer.fill ?? 'rgb(230 246 252 / 0.92)',
              '--divider-layer-height': `${layer.height ?? 100}%`,
              '--divider-layer-bottom': `${layer.bottom ?? 0}%`,
            } as WaveDividerStyleVars
          }
        >
          <svg viewBox="0 0 1440 220" preserveAspectRatio="none" className="wave-divider__svg" aria-hidden>
            <path d={layer.pathData ?? pathData} />
          </svg>
        </span>
      ))}
    </div>
  );
}
