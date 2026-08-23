import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { buttonVariants } from '@/components/ui/button-variants';
import { cn } from '@/lib/utils';

type CtaButtonProps = {
  label: string;
  href?: string;
  variant?: 'default' | 'outline' | 'ghost';
  className?: string;
};

export function CtaButton({
  label,
  href,
  variant = 'default',
  className,
}: CtaButtonProps) {
  const classes = cn(
    buttonVariants({ variant, size: 'lg' }),
    'w-fit',
    className,
  );

  if (!href) {
    return (
      <Button variant={variant} size="lg" className={className}>
        {label}
      </Button>
    );
  }

  const isExternal = href.startsWith('http');
  const isFile = href.endsWith('.pdf');
  const isHash = href.startsWith('#');

  if (isHash) {
    return (
      <a href={href} className={classes}>
        {label}
      </a>
    );
  }

  if (isExternal || isFile) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
      >
        {label}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {label}
    </Link>
  );
}
