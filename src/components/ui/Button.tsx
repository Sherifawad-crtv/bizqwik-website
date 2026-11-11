import type { AnchorHTMLAttributes } from "react";

type Variant = "primary" | "secondary";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center [--sq-r:24px] font-bold whitespace-nowrap select-none transition-[transform,filter] duration-(--dur-fast) ease-standard active:scale-95";
const variants: Record<Variant, string> = {
  primary: "[--sq-fill:var(--color-primary)] hover:[--sq-fill:var(--color-primary-pressed)] text-white",
  secondary: "[--sq-fill:var(--color-surface)] [--sq-drop:var(--drop-card)] text-ink",
};
const sizes: Record<Size, string> = {
  md: "h-14 px-7 text-[17px]",
  lg: "h-14 px-9 text-[19px]",
};

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: Variant;
  size?: Size;
}

/** Link-styled-as-button. Every CTA on the page is a real anchor (tel:, mailto:, #section). */
export function Button({ variant = "primary", size = "md", className = "", ...props }: ButtonProps) {
  return <a data-sq className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props} />;
}
