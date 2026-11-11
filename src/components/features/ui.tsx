import type { HTMLAttributes, ReactNode } from "react";
import { Icon, type IconName } from "@/components/ui/Icon";

/*
 * The small, simple UI pieces the feature demos are made of, after the reference page's panels
 * (docs/DESIGN-SYSTEM.md "Feature demos"): a white card with a large soft shadow, light rows with a small
 * icon tile, a plain key-value table, status as a dot and a word, small bordered buttons. Sentence case,
 * regular weights, no dense app chrome. Colours are our tokens.
 */

/** The demo's stage. `data-stage` is what the cursor moves in; `data-inner` is what enters when the demo starts. */
export function Stage({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div data-stage className={`relative w-full ${className}`}>
      <div data-inner>
        {children}
        <Cursor />
      </div>
    </div>
  );
}

/** The white card. */
export function Card({ children, className = "", ...rest }: { children: ReactNode; className?: string } & HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`rounded-[28px] bg-surface p-5 shadow-[0_28px_56px_rgba(26,23,38,.09)] ${className}`} {...rest}>
      {children}
    </div>
  );
}

/** The pointer that clicks things in a demo (the reference has one too). */
export const Cursor = () => (
  <svg data-cursor aria-hidden width="24" height="28" viewBox="0 0 24 28" className="pointer-events-none absolute left-0 top-0 z-20 opacity-0 drop-shadow-[0_4px_8px_rgba(26,23,38,.25)]">
    <path d="M3 2.5 20.5 12l-7.6 2.4L9.4 22z" fill="#5A41FF" stroke="#fff" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);

export const Label = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <p className={`mb-2 text-[14px] text-ink-muted ${className}`}>{children}</p>
);

/** A small square tile for an icon or an initial. */
export const Tile = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <span className={`grid size-10 shrink-0 place-items-center rounded-[12px] bg-sunken text-ink shadow-[inset_0_0_0_1px_rgba(26,23,38,.1)] ${className}`}>{children}</span>
);
export const IconTile = ({ name }: { name: IconName }) => (
  <Tile>
    <Icon name={name} size={20} />
  </Tile>
);
export const Initial = ({ letter }: { letter: string }) => (
  <Tile>
    <span className="text-[17px] font-bold">{letter}</span>
  </Tile>
);

/** A light row: tile, title, second line, something on the right. */
export function Row({
  tile,
  title,
  sub,
  right,
  className = "",
  ...rest
}: { tile?: ReactNode; title: ReactNode; sub?: ReactNode; right?: ReactNode; className?: string } & Omit<HTMLAttributes<HTMLDivElement>, "title">) {
  return (
    <div className={`flex items-center gap-3 rounded-[12px] bg-paper p-2.5 ${className}`} {...rest}>
      {tile}
      <div className="min-w-0 flex-1">
        <p className="truncate text-[15px] font-semibold leading-tight">{title}</p>
        {sub && <p className="mt-1 truncate text-[13px] leading-tight text-ink-muted">{sub}</p>}
      </div>
      {right && <div className="shrink-0 text-[13px] leading-tight">{right}</div>}
    </div>
  );
}

const TONES = { green: "text-green-fg", amber: "text-amber-fg", red: "text-danger-fg", muted: "text-ink-muted" } as const;

/** Status as a dot and a word. */
export const Status = ({ tone = "green", children }: { tone?: keyof typeof TONES; children: ReactNode }) => (
  <span className={`inline-flex items-center gap-1.5 whitespace-nowrap font-semibold ${TONES[tone]}`}>
    <i className="size-1.5 rounded-full bg-current" />
    {children}
  </span>
);

/** The plain key-value table. */
export function Table({ rows }: { rows: [string, ReactNode][] }) {
  return (
    <div className="rounded-[12px] border border-ink/5 bg-paper px-4 py-1.5">
      {rows.map(([k, v]) => (
        <div key={k} className="flex items-center justify-between gap-4 py-2 text-[15px]">
          <span>{k}</span>
          <span className="text-right text-ink-muted">{v}</span>
        </div>
      ))}
    </div>
  );
}

/** Two stacked layers in one grid cell: `a` is the start, `b` replaces it (the cell is as big as the larger). */
export function Swap({ a, b, name, className = "" }: { a: ReactNode; b: ReactNode; name: string; className?: string }) {
  return (
    <span className={`grid ${className}`}>
      <span data-swap-a={name} className="col-start-1 row-start-1">{a}</span>
      <span data-swap-b={name} className="col-start-1 row-start-1 opacity-0">{b}</span>
    </span>
  );
}

/** A section that can grow open (`data-grow`): the card gets taller as it reveals. */
export const Grow = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <div data-grow className="overflow-hidden">
    <div className={`pt-3 ${className}`}>{children}</div>
  </div>
);

export const Tick = ({ size = 15 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
);

export const SearchGlyph = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden className="shrink-0 text-ink-muted">
    <circle cx="11" cy="11" r="6.5" />
    <path d="m16 16 4 4" />
  </svg>
);

/** A small bordered button. `swap` renders a two-state label (start, done) the demo flips. */
export function MiniButton({ children, ...rest }: { children: ReactNode } & HTMLAttributes<HTMLSpanElement>) {
  return (
    <span {...rest} className="inline-flex h-9 items-center justify-center whitespace-nowrap rounded-[10px] border border-ink/15 bg-surface px-2 text-[13px] font-medium sm:px-3.5 sm:text-[14px]">
      {children}
    </span>
  );
}
