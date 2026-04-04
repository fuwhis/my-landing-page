import Link from 'next/link';

import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type CtaButtonProps = {
  label: string;
  href?: string;
  variant?: 'default' | 'outline' | 'ghost';
};

export function CtaButton({ label, href, variant = 'default' }: CtaButtonProps) {
  if (!href) {
    return (
      <Button variant={variant} size="lg">
        {label}
      </Button>
    );
  }

  return (
    <Link
      href={href}
      className={cn(buttonVariants({ variant, size: 'lg' }), 'w-fit')}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
    >
      {label}
    </Link>
  );
}
