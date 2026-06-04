import { toFa } from '@/lib/utils/faNum';

type Props = {
  value: number | string;
  /** opt out of Persian conversion (e.g. for product codes that should remain Latin) */
  latn?: boolean;
  className?: string;
};

export function NumeralFa({ value, latn = false, className }: Props) {
  const out = latn ? String(value) : toFa(value);
  return <span className={className}>{out}</span>;
}
