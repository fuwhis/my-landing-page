import Link from 'next/link';

import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type CtaButtonProps = {
  label: string;
  href?: string;
  variant?: 'default' | 'outline' | 'ghost';
};

export function CtaButton({
  label,
  href,
  variant = 'default',
}: CtaButtonProps) {
  if (!href) {
    return (
      <Button variant={variant} size="lg">
        {label}
      </Button>
    );
  }

  const isExternal = href.startsWith('http');
  const isFile = href.endsWith('.pdf');

  const className = cn(buttonVariants({ variant, size: 'lg' }), 'w-fit');

  if (isExternal || isFile) {
    return (
      <a
        href={href}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
      >
        {label}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {label}
    </Link>
  );
}
