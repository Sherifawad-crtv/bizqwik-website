import type { ElementType, HTMLAttributes, ReactNode } from "react";

/*
 * Layout primitives for the landing outline (docs/PLAN-landing-outline.md). Every section is built
 * from these so spacing, hairlines and radii are decided in one place.
 *
 *   Container   page width and gutters
 *   Box         hairline box: the page is made of these
 *   Panel       the quiet sunken panel that holds a product or an illustration
 *   Skeleton    dashed placeholder, marks a slot that a later phase fills
 */

export function Container({ className = "", ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`mx-auto w-full max-w-page px-4 lg:px-8 ${className}`} {...rest} />;
}

const TONES = {
  /** Light card on the paper page. */
  surface: "[--sq-fill:var(--color-surface)] [--sq-stroke:var(--color-line)] [--sq-sw:1px]",
  /** Outline only. */
  paper: "[--sq-stroke:var(--color-line)] [--sq-sw:1px]",
  /** The inverted section. */
  dark: "[--sq-fill:var(--color-ink)] text-white",
  /** A card sitting on the dark section. */
  raised: "[--sq-fill:rgb(255_255_255/0.07)] text-white",
} as const;

export function Box<T extends ElementType = "div">({
  as,
  tone = "surface",
  className = "",
  ...rest
}: { as?: T; tone?: keyof typeof TONES } & Omit<HTMLAttributes<HTMLElement>, "as">) {
  const Tag = (as ?? "div") as ElementType;
  return <Tag data-sq className={`[--sq-r:28px] ${TONES[tone]} ${className}`} {...rest} />;
}

export function Panel({ className = "", ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div data-sq className={`[--sq-r:28px] [--sq-fill:var(--color-sunken)] [--sq-stroke:var(--color-line)] [--sq-sw:1px] ${className}`} {...rest} />;
}

export function Skeleton({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      data-skeleton
      className={`grid place-items-center rounded-[20px] border border-dashed border-ink/20 px-4 text-center font-mono text-[11px] font-bold uppercase leading-relaxed tracking-[.08em] text-ink-faint ${className}`}
    >
      {children}
    </div>
  );
}
