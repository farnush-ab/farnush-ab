'use client';

import clsx from 'clsx';
import { toFa } from '@/lib/utils/faNum';

type Props = {
  date: Date;
  active?: boolean;
  onClick?: () => void;
};

const DOW_FA = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];

export function TimeSlot({ date, active = false, onClick }: Props) {
  // Persian week: Saturday = 0. JS Sunday = 0 → shift by 1.
  const dow = DOW_FA[(date.getDay() + 1) % 7];
  const day = toFa(date.getDate());

  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        'flex flex-col items-center gap-0.5',
        'px-2 py-2.5 rounded border',
        'transition-all duration-glance ease-glance',
        active
          ? 'bg-terracotta border-terracotta text-bone'
          : 'border-ink-mute text-ink-soft hover:border-terracotta',
      )}
    >
      <span className="text-[0.58rem] tracking-[0.08em] opacity-60">{dow}</span>
      <span className="text-[1.05rem] font-normal tabular-nums">{day}</span>
    </button>
  );
}
