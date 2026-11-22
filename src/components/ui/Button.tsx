import type { AnchorHTMLAttributes } from "react";

type Variant = "primary" | "secondary";
type Size = "md" | "lg";

/* The corners get their own, longer transition so the rounding is visible as a motion (see docs/MOTION.md). */
const TRANSITION =
  "[transition:border-radius_var(--dur-enter)_var(--ease-standard),transform_var(--dur-fast)_var(--ease-standard),filter_var(--dur-fast)_var(--ease-standard),background-color_var(--dur-fast)_var(--ease-standard),color_var(--dur-fast)_var(--ease-standard)]";
/* text-center + leading-none + pt-[2px]: Urbanist sits about 1px high in its line box, the padding puts the caps on the button's optical centre. */
const base = `inline-flex min-w-[190px] items-center justify-center rounded-[20px] pt-[2px] text-center font-bold leading-none whitespace-nowrap select-none ${TRANSITION} hover:rounded-[28px] active:rounded-[28px] pointer-fine:active:scale-95`;
const variants: Record<Variant, string> = {
  primary: "bg-primary text-white hover:bg-primary-pressed hover:brightness-105 active:bg-primary-pressed active:brightness-105",
  /** The white CTA: a small stroke, no shadow. On hover it takes a darker shade of itself (`sunken`). No brightness boost here, it would undo the darkening. */
  secondary: "border border-ink/10 bg-surface text-ink hover:bg-sunken active:bg-sunken",
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

/** Link-styled-as-button. Every CTA is at least 190px wide, so they all share one width (the closing cards are 190px inside). Corners are 20px at rest and ease to a full pill on hover (and while pressed, so touch screens, which have no hover, behave exactly like desktop hover) (28px is half the 56px height, so it reads the same as 100px but moves visibly). Every CTA on the page is a real anchor (tel:, mailto:, #section). */
export function Button({ variant = "primary", size = "md", className = "", ...props }: ButtonProps) {
  return <a className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props} />;
}
