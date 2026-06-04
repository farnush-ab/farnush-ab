'use client';

import clsx from 'clsx';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export function SubmitPill({ children, className, ...rest }: Props) {
  return (
    <button
      {...rest}
      className={clsx(
        'group relative inline-flex items-center gap-3',
        'overflow-hidden rounded-full',
        'px-7 py-4 bg-ink text-bone text-cap tracking-[0.08em]',
        'transition-[padding] duration-glance ease-glance',
        'hover:pe-9',
        className,
      )}
    >
      <span className="relative z-10 flex items-center gap-3">{children}</span>
      <span
        aria-hidden
        className="absolute inset-0 bg-terracotta-deep translate-y-full group-hover:translate-y-0 transition-transform duration-reveal ease-reveal"
      />
    </button>
  );
}
