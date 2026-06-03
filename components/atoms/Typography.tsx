import { cn } from "@/lib/utils";

type DisplayProps = React.HTMLAttributes<HTMLHeadingElement> & {
  as?: "h1" | "h2" | "h3" | "h4" | "p";
  size?: "sm" | "md" | "lg" | "xl";
  italic?: boolean;
};

export function Display({
  as: Tag = "h2",
  size = "md",
  italic,
  className,
  children,
  ...rest
}: DisplayProps) {
  const sizeMap = {
    sm: "text-display-sm",
    md: "text-display-md",
    lg: "text-display-lg",
    xl: "text-display-xl",
  } as const;

  return (
    <Tag
      className={cn(
        "font-display font-normal text-balance leading-[0.95]",
        sizeMap[size],
        italic && "italic",
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export function Eyebrow({
  className,
  children,
  ...rest
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-block text-eyebrow uppercase font-sans text-gold/90 num",
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  );
}

export function Body({
  className,
  children,
  ...rest
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "font-sans text-base leading-[1.75] text-ink/80 max-w-column text-balance",
        className,
      )}
      {...rest}
    >
      {children}
    </p>
  );
}

export function Caption({
  className,
  children,
  ...rest
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn("font-sans text-caption text-ash/80", className)}
      {...rest}
    >
      {children}
    </span>
  );
}
