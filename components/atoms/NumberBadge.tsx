import { cn } from "@/lib/utils";

export function NumberBadge({
  index,
  label,
  className,
}: {
  index: number;
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 font-sans text-eyebrow uppercase text-gold/90 num",
        className,
      )}
    >
      <span className="ltr inline-flex">
        {String(index).padStart(2, "0")}
      </span>
      <span aria-hidden className="block h-px w-12 bg-gold/40" />
      {label && <span>{label}</span>}
    </div>
  );
}
