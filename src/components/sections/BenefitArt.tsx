import Image from "next/image";
import type { ReactNode } from "react";
import { Kick, Pill, QrGrid } from "@/components/product/parts";
import { Icon } from "@/components/ui/Icon";

/*
 * The four card illustrations (section 4 of the outline). Each is a small collage of our own product
 * pieces, drawn in HTML so it is sharp at any size and uses the site's tokens. No image files.
 * Decorative: the card's title and line carry the meaning, so every stage is aria-hidden.
 * Pieces lift slightly when the card is hovered (the card is the `group`).
 */

const piece =
  "absolute rounded-[20px] border border-line bg-surface shadow-[0_18px_40px_-18px_rgba(26,23,38,.3)] transition-transform duration-(--dur-slow) ease-standard";

function Stage({ children }: { children: ReactNode }) {
  return (
    <div aria-hidden className="relative mx-auto h-[300px] w-full max-w-[440px]">
      <span className="absolute inset-x-[12%] top-1/2 h-44 -translate-y-1/2 rounded-full bg-primary-tint-strong blur-3xl" />
      {children}
    </div>
  );
}

const Tick = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
);

/** The solid green "done" pill used across the demos. */
const Done = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <span
    className={`absolute inline-flex h-12 items-center gap-2 whitespace-nowrap rounded-full bg-green-fg px-5 text-[16px] font-bold text-white shadow-[0_14px_28px_-12px_rgba(23,122,75,.7)] transition-transform duration-(--dur-slow) ease-standard ${className}`}
  >
    <Tick />
    {children}
  </span>
);

const Person = ({ name, sub }: { name: string; sub: string }) => (
  <span className="min-w-0 flex-1">
    <span className="block truncate text-[15px] font-bold">{name}</span>
    <span className="block truncate font-mono text-[11px] text-ink-faint">{sub}</span>
  </span>
);

/* Check clients in fast: the code, the member it belongs to, the result. */
export function CheckInArt() {
  return (
    <Stage>
      <div className={`${piece} left-[4%] top-[34px] aspect-square w-[40%] -rotate-[5deg] p-[5%] group-hover:-translate-y-1.5`}>
        <QrGrid className="size-full" />
      </div>
      <div className={`${piece} right-[2%] top-[22px] w-[57%] rotate-[3deg] p-3.5 group-hover:-translate-y-1`}>
        <div className="flex items-center gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary-tint-strong text-[15px] font-extrabold text-primary-pressed">M</span>
          <Person name="Mona K." sub="Monthly plan" />
        </div>
        <div className="mt-3 flex items-center justify-between gap-2">
          <span className="whitespace-nowrap font-mono text-[11px] text-ink-muted">12 visits</span>
          <Pill tone="green">ACTIVE</Pill>
        </div>
      </div>
      <Done className="bottom-[34px] left-[38%] rotate-[-2deg] group-hover:-translate-y-2">Checked in</Done>
    </Stage>
  );
}

/* Take payment your way: the three ways to pay, one chosen, paid. */
const WAYS = [
  { label: "Cash", icon: "banknote", pos: "left-[5%] top-[84px] -rotate-[8deg] group-hover:-translate-y-1" },
  { label: "Card", icon: "card", pos: "left-[35%] top-[66px] group-hover:-translate-y-1.5" },
  { label: "InstaPay", icon: "wallet", pos: "right-[5%] top-[84px] rotate-[8deg] group-hover:-translate-y-2", on: true },
] as const;

export function PaymentArt() {
  return (
    <Stage>
      <div className={`${piece} left-1/2 top-[10px] -translate-x-1/2 whitespace-nowrap rounded-full px-5 py-2.5`}>
        <span className="tabular text-[20px] font-extrabold tracking-[-.02em]">1,250.00</span>
        <span className="ml-1.5 font-mono text-[11px] font-bold tracking-[.08em] text-ink-faint">EGP</span>
      </div>
      {WAYS.map((w) => (
        <div
          key={w.label}
          className={`${piece} ${w.pos} flex h-[132px] w-[30%] flex-col justify-between p-3.5 ${
            "on" in w ? "border-2 border-primary bg-[color-mix(in_srgb,var(--color-primary)_10%,var(--color-surface))] text-primary-pressed" : ""
          }`}
        >
          <Icon name={w.icon} size={30} />
          <span className="truncate text-[15px] font-extrabold tracking-[-.01em]">{w.label}</span>
        </div>
      ))}
      <Done className="bottom-[22px] left-1/2 -translate-x-1/2 group-hover:-translate-y-1.5">Paid</Done>
    </Stage>
  );
}

/* Know who is coming: the class roster, with who has arrived. */
const ROSTER = [
  { name: "Mona K.", sub: "On their plan", chip: ["green", "ARRIVED"], pos: "left-[4%] top-[40px] -rotate-[2deg] group-hover:-translate-y-1" },
  { name: "Omar H.", sub: "Drop-in · Paid", chip: ["sunken", "BOOKED"], pos: "left-[12%] top-[118px] rotate-[1.5deg] group-hover:-translate-y-1.5" },
  { name: "Salma A.", sub: "On their plan", chip: ["sunken", "BOOKED"], pos: "left-[5%] top-[196px] -rotate-[1deg] group-hover:-translate-y-2" },
] as const;

export function RosterArt() {
  return (
    <Stage>
      {ROSTER.map((r) => (
        <div key={r.name} className={`${piece} ${r.pos} flex w-[80%] items-center gap-3 px-4 py-3.5`}>
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-sunken text-[14px] font-extrabold text-ink-muted">{r.name[0]}</span>
          <Person name={r.name} sub={r.sub} />
          <Pill tone={r.chip[0]} chip>
            {r.chip[1]}
          </Pill>
        </div>
      ))}
      <span className="absolute right-[3%] top-[8px] grid size-[78px] place-content-center rounded-full bg-primary text-center text-white shadow-[0_16px_30px_-12px_rgba(90,65,255,.7)] transition-transform duration-(--dur-slow) ease-standard group-hover:-translate-y-2">
        <span className="text-[28px] font-extrabold leading-none tracking-[-.03em]">8</span>
        <span className="mt-1 font-mono text-[9px] font-bold tracking-[.08em]">COMING</span>
      </span>
    </Stage>
  );
}

/* Stay in control: the month's revenue and a payout that went out. */
const BARS = [38, 52, 44, 63, 58, 74, 100];

export function ControlArt() {
  return (
    <Stage>
      <div className={`${piece} left-[4%] top-[26px] w-[64%] -rotate-[2deg] p-4 group-hover:-translate-y-1`}>
        <Kick>Revenue · Oct</Kick>
        <p className="tabular mt-1 whitespace-nowrap text-[34px] font-extrabold leading-none tracking-[-.03em]">
          118,400 <span className="font-mono text-[11px] font-bold tracking-[.08em] text-ink-faint">EGP</span>
        </p>
        <div className="mt-4 flex h-14 items-end gap-1.5">
          {BARS.map((h, i) => (
            <span key={i} className={`flex-1 rounded-t-[4px] ${i === BARS.length - 1 ? "bg-primary" : "bg-primary-tint-strong"}`} style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
      <div className={`${piece} bottom-[26px] right-[3%] flex w-[62%] rotate-[3deg] items-center gap-3 px-4 py-3.5 group-hover:-translate-y-2`}>
        <Person name="Coach Nour" sub="14 sessions · 4,200" />
        <Pill tone="green">PAID</Pill>
      </div>
      <span className={`${piece} right-[9%] top-[16px] grid size-[58px] rotate-[7deg] place-items-center rounded-[18px] group-hover:-translate-y-1.5`}>
        <Image src="/brand/mark.png" alt="" width={386} height={403} className="h-7 w-auto" />
      </span>
    </Stage>
  );
}
