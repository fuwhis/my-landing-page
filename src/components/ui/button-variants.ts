import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-neutral-900 text-white hover:bg-neutral-700',
        outline:
          'border border-neutral-300 text-neutral-900 hover:bg-neutral-100',
        ghost: 'text-neutral-700 hover:bg-neutral-100',
        liquid: 'button-liquid text-stale-900',
      },
      size: {
        default: 'h-10 px-5',
        lg: 'h-11 px-6 text-base',
      },
      glow: {
        true: '',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      glow: false,
    },
  },
);

export type ButtonVariantProps = Parameters<typeof buttonVariants>[0];
