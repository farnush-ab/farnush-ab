import clsx from 'clsx';

type Props = {
  variant?: 'hairline' | 'terracotta';
  vertical?: boolean;
  className?: string;
};

export function Rule({ variant = 'hairline', vertical = false, className }: Props) {
  return (
    <span
      aria-hidden
      className={clsx(
        'block',
        vertical ? 'w-px h-20' : 'h-px w-full',
        variant === 'hairline' && 'bg-rule',
        variant === 'terracotta' && 'bg-terracotta',
        className,
      )}
    />
  );
}
