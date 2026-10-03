import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "tertiary";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-text text-inverse-text hover:bg-inverse border border-transparent",
  secondary:
    "bg-transparent text-text border border-line hover:border-text hover:bg-subtle",
  tertiary:
    "bg-transparent text-text border border-transparent hover:underline underline-offset-4 px-0",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-[0.9375rem]",
};

const base =
  "btn-base focus-ring disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]";

/** One button, both element types. Pass href to render a Link. */
export function Button({
  variant = "primary",
  size = "md",
  href,
  className = "",
  children,
  ...rest
}: {
  variant?: Variant;
  size?: Size;
  href?: string;
  children: ReactNode;
} & Omit<ComponentProps<"button">, "ref">) {
  const cls = `${base} ${variants[variant ?? "primary"]} ${sizes[size ?? "md"]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button {...rest} className={cls}>
      {children}
    </button>
  );
}
