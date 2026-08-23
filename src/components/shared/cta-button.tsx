import type { ReactNode } from 'react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { buttonVariants } from '@/components/ui/button-variants';
import { cn } from '@/lib/utils';

type CtaButtonProps = {
  label: string;
  href?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'lg' | 'sm';
  className?: string;
  icon?: ReactNode;
  visible?: boolean;
};

export function CtaButton({
  label,
  href,
  variant = 'default',
  size = 'lg',
  className,
  icon,
  visible = true,
}: CtaButtonProps) {
  if (!visible) {
    return null;
  }

  const content = (
    <>
      {icon ? (
        <span className="shrink-0" aria-hidden="true">
          {icon}
        </span>
      ) : null}
      {label}
    </>
  );

  const classes = cn(buttonVariants({ variant, size }), 'w-fit', className);

  if (!href) {
    return (
      <Button variant={variant} size={size} className={className}>
        {content}
      </Button>
    );
  }

  const isExternal = href.startsWith('http');
  const isFile = href.endsWith('.pdf');
  const isHash = href.startsWith('#');

  if (isHash) {
    return (
      <a href={href} className={classes}>
        {content}
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
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
