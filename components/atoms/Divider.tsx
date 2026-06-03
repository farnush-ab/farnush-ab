import { cn } from "@/lib/utils";

export function Divider({
  vertical,
  className,
}: {
  vertical?: boolean;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "block bg-hairline",
        vertical ? "w-px h-full" : "h-px w-full",
        className,
      )}
    />
  );
}
