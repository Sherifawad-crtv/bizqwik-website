import type { AnchorHTMLAttributes } from "react";

type Variant = "primary" | "secondary";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center rounded-button font-bold whitespace-nowrap select-none transition-[filter,transform] duration-200 hover:brightness-105 active:scale-[0.97]";
const variants: Record<Variant, string> = {
  primary: "bg-primary text-white hover:bg-primary-pressed",
  secondary: "bg-surface text-ink shadow-card",
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
