import clsx from 'clsx';
import type { HTMLAttributes, ReactNode } from 'react';

type Tag = 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';

type Props = HTMLAttributes<HTMLElement> & {
  as?: Tag;
  children: ReactNode;
};

export function Display({ as: Tag = 'h1', className, children, ...rest }: Props) {
  return (
    <Tag className={clsx('type-display', className)} {...rest}>
      {children}
    </Tag>
  );
}

export function Cap({ as: Tag = 'span', className, children, ...rest }: Props) {
  return (
    <Tag className={clsx('type-cap', className)} {...rest}>
      {children}
    </Tag>
  );
}

export function Lede({ as: Tag = 'p', className, children, ...rest }: Props) {
  return (
    <Tag className={clsx('text-lede text-ink-soft max-w-measure', className)} {...rest}>
      {children}
    </Tag>
  );
}
