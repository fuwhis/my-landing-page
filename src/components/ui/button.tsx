'use client';

import { type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { gsap, useGSAP } from '@/lib/gsap';
import { cn } from '@/lib/utils';

import { buttonVariants } from './button-variants';

function mixSkyColor(t: number) {
  const clamped = Math.min(1, Math.max(0, t));
  const mix = (start: number, end: number) =>
    Math.round(start + (end - start) * clamped);

  return `rgb(${mix(2, 56)} ${mix(132, 189)} ${mix(199, 248)})`;
}

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, glow, children, type = 'button', ...props },
    ref,
  ) => {
    const buttonRef = React.useRef<HTMLButtonElement>(null);

    React.useImperativeHandle(ref, () => buttonRef.current as HTMLButtonElement);

    useGSAP(
      () => {
        if (!glow || !buttonRef.current) {
          return;
        }

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          return;
        }

        const button = buttonRef.current;

        const handlePointerMove = (event: PointerEvent) => {
          const rect = button.getBoundingClientRect();
          const x = event.clientX - rect.left;
          const y = event.clientY - rect.top;

          gsap.to(button, {
            '--pointer-x': `${x}px`,
            '--pointer-y': `${y}px`,
            '--button-glow': mixSkyColor(x / rect.width),
            duration: 0.2,
            overwrite: true,
          });
        };

        button.addEventListener('pointermove', handlePointerMove);

        return () => {
          button.removeEventListener('pointermove', handlePointerMove);
        };
      },
      { scope: buttonRef, dependencies: [glow] },
    );

    if (glow) {
      return (
        <button
          ref={buttonRef}
          type={type}
          className="button-glow rounded-full text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 disabled:pointer-events-none disabled:opacity-50"
          {...props}
        >
          <span className="button-glow__gradient" aria-hidden="true" />
          <span
            className={cn('button-glow__surface', buttonVariants({ size }), className)}
          >
            {children}
          </span>
        </button>
      );
    }

    return (
      <button
        ref={buttonRef}
        className={cn(buttonVariants({ variant, size, glow }), className)}
        type={type}
        {...props}
      >
        {children}
      </button>
    );
  },
);
Button.displayName = 'Button';

export { Button };
