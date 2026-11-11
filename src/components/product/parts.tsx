import type { ReactNode } from "react";

/*
 * Small product pieces (ported from the app's components) shared by the feature demos and the card
 * illustrations, so a pill or a QR looks identical everywhere on the site.
 */

const mono = "font-mono font-bold uppercase tracking-[.06em]";

export type Tone = "amber" | "violet" | "green" | "danger" | "sunken";
const TONES: Record<Tone, string> = {
  amber: "bg-amber-bg text-amber-fg",
  violet: "bg-primary-tint-strong text-primary-pressed",
  green: "bg-green-bg text-green-fg",
  danger: "bg-danger-bg text-danger-fg",
  sunken: "bg-sunken text-ink-muted",
};

/** StatePill / PackageStatusPill: dot + mono caps. `chip` is the squarer attendance chip. */
export function Pill({ tone, children, chip = false }: { tone: Tone; children: ReactNode; chip?: boolean }) {
  return (
    <span className={`${mono} inline-flex items-center gap-1.5 whitespace-nowrap px-2.5 py-1 text-[11px] leading-none ${chip ? "rounded-[8px]" : "rounded-full"} ${TONES[tone]}`}>
      {!chip && <i className="size-1.5 shrink-0 rounded-full bg-current" />}
      {children}
    </span>
  );
}

/** Mono caps label (the app's section kicker). */
export const Kick = ({ children }: { children: ReactNode }) => (
  <p className="font-mono text-[11px] font-bold uppercase tracking-[.08em] text-ink-faint">{children}</p>
);

/** A QR code drawn as a grid (deterministic, decorative). */
const QR = (() => {
  let s = 7;
  const rnd = () => ((s = (s * 48271) % 2147483647) / 2147483647) > 0.5;
  const N = 9;
  const finder = (x: number, y: number) => (x < 3 && y < 3) || (x > N - 4 && y < 3) || (x < 3 && y > N - 4);
  return Array.from({ length: N * N }, (_, i) => ({ finder: finder(i % N, Math.floor(i / N)), on: rnd() }));
})();

export function QrGrid({ className = "" }: { className?: string }) {
  return (
    <div className={`grid grid-cols-9 grid-rows-9 gap-px ${className}`}>
      {QR.map((c, i) => (
        <span key={i} className={`rounded-[1.5px] ${c.finder ? "bg-ink" : c.on ? "bg-ink/85" : "bg-transparent"}`} />
      ))}
    </div>
  );
}
