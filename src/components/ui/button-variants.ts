import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-foreground text-background hover:bg-foreground/90',
        outline: 'border border-border text-foreground hover:bg-muted',
        ghost: 'text-muted-foreground hover:bg-muted',
        liquid: 'button-liquid text-stale-900',
      },
      size: {
        default: 'h-10 px-5',
        lg: 'h-11 px-6 text-base',
        sm: 'h-7 gap-1.5 px-3 text-xs',
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
