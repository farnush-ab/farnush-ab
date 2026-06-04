'use client';

import clsx from 'clsx';
import { useState, type InputHTMLAttributes } from 'react';

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'placeholder'> & {
  label: string;
  /** Force LTR for phone, email, etc. */
  ltr?: boolean;
};

export function FloatingInput({ label, ltr, className, ...rest }: Props) {
  const [value, setValue] = useState('');
  const filled = value.length > 0;

  return (
    <div className={clsx('relative pt-5', className)}>
      <input
        {...rest}
        dir={ltr ? 'ltr' : undefined}
        value={rest.value ?? value}
        onChange={(e) => {
          setValue(e.target.value);
          rest.onChange?.(e);
        }}
        placeholder=" "
        className={clsx(
          'w-full bg-transparent border-0 outline-none',
          'border-b border-ink-mute focus:border-terracotta',
          'py-2 text-[0.95rem] text-ink',
          'transition-colors duration-glance ease-glance',
          'placeholder-transparent',
          'peer',
        )}
      />
      <label
        className={clsx(
          'absolute top-5 inset-inline-start-0 pointer-events-none',
          'text-[0.92rem] text-ink-faint',
          'transition-all duration-reveal ease-reveal origin-[inline-start_top]',
          (filled || rest.value) &&
            '-translate-y-5 text-[0.6rem] tracking-[0.08em] text-ink-soft',
          'peer-focus:-translate-y-5 peer-focus:text-[0.6rem] peer-focus:tracking-[0.08em] peer-focus:text-ink-soft',
        )}
      >
        {label}
      </label>
    </div>
  );
}
