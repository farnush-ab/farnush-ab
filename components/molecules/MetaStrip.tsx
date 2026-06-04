'use client';

import { useEffect, useState } from 'react';
import { formatTehranTime, daypartFa } from '@/lib/utils/time';

type Props = {
  variant?: 'nav' | 'hero' | 'footer';
  className?: string;
};

export function MetaStrip({ variant = 'nav', className }: Props) {
  const [now, setNow] = useState(() => formatTehranTime());
  const [daypart, setDaypart] = useState(() => daypartFa());

  useEffect(() => {
    const tick = () => {
      setNow(formatTehranTime());
      setDaypart(daypartFa());
    };
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  if (variant === 'hero') {
    return <span className={className}>تهران · {daypart}</span>;
  }

  if (variant === 'footer') {
    return <span className={className}>تهران · {now}</span>;
  }

  return (
    <span className={className}>
      <span className="inline-block w-[6px] h-[6px] rounded-full bg-terracotta align-middle me-2 animate-pulse" />
      تهران · {now}
    </span>
  );
}
