import Image from "next/image";
import type { ReactNode } from "react";
import { founderDemo } from "@/content/demoApp";
import { POLAROID } from "./phone";

/*
 * The "before" faces of the hero pieces: the manual stuff a gym really runs on
 * (sticky notes, receipts, paper ledgers, spreadsheets...). Built in HTML/CSS
 * so they stay crisp and tiny. Deliberately OFF-brand (warm paper, Excel green,
 * kraft, handwriting): the violet system is the cure.
 * Each is hidden by default; the hero timeline shows it, then morphs it into
 * the matching Bizqwik component (see hero-motion.ts). Sizes are in points,
 * like the rest of the phone's design space.
 */

const SHADOW = "shadow-[0_14px_22px_-10px_rgba(26,23,38,.38),0_2px_4px_rgba(26,23,38,.14)]";

interface ChaosProps {
  w: number;
  h: number;
  /** Starting tilt; the morph straightens it. */
  rot: number;
  /** Torn (zigzag) edge made with a CSS mask: needs its shadow on an outer shell. */
  torn?: boolean;
  className?: string;
  children: ReactNode;
}

/**
 * The morphing shell: the timeline tweens its size, radius and fade. Content stays at natural size,
 * centred and clipped. A torn (masked) face keeps its shadow on the OUTER shell as a drop-shadow:
 * a mask clips box-shadow away, so the masked paper lives one level in.
 */
function Chaos({ w, h, rot, torn, className = "", children }: ChaosProps) {
  const content = (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ width: w, height: h }}>
      {children}
    </div>
  );
  const base = "pointer-events-none invisible absolute left-1/2 top-1/2";
  if (torn) {
    return (
      <div data-chaos data-rot={rot} data-torn="" style={{ width: w, height: h }} className={`${base} [filter:drop-shadow(0_7px_7px_rgba(26,23,38,.2))_drop-shadow(0_1px_1.5px_rgba(26,23,38,.16))]`}>
        <div data-chaos-body className={`absolute inset-0 overflow-hidden rounded-[inherit] ${className}`}>
          {content}
        </div>
      </div>
    );
  }
  return (
    <div data-chaos data-rot={rot} style={{ width: w, height: h }} className={`${base} overflow-hidden ${className}`}>
      {content}
    </div>
  );
}

export function StickyNote() {
  return (
    <Chaos w={196} h={150} rot={-6} className={`rounded-[3px] bg-[#f7e27a] ${SHADOW}`}>
      <p className="p-[18px] font-hand text-[27px] leading-[1.02] text-[#4a4126]">Morning Karim — payouts due Thurs!!</p>
      <svg className="absolute bottom-3 left-[18px]" width="120" height="10" viewBox="0 0 120 10" fill="none" stroke="#b3402b" strokeWidth="2.4" strokeLinecap="round"><path d="M2 6c14-6 28 4 42-1s26 4 40-1 24 2 34-1" /></svg>
    </Chaos>
  );
}

/** A real polaroid: square photo, thick bottom border for the caption, tape. The photo morphs into the round avatar. */
export function Polaroid() {
  const { w, h, photo, pad } = POLAROID;
  return (
    <Chaos w={w} h={h} rot={7} className={`rounded-[3px] bg-[#fdfcf8] ${SHADOW}`}>
      <Image
        data-polaroid-photo
        src={founderDemo.avatar}
        alt=""
        width={photo}
        height={photo}
        unoptimized
        className="absolute object-cover shadow-[0_0_0_1px_rgba(26,23,38,.08)] [filter:sepia(.18)_saturate(.9)]"
        style={{ left: pad, top: pad, width: photo, height: photo }}
      />
      <span className="absolute bg-[linear-gradient(135deg,rgba(255,255,255,.22),transparent_45%)]" style={{ left: pad, top: pad, width: photo, height: photo }} />
      <p data-polaroid-fade className="absolute inset-x-0 bottom-[8px] text-center font-hand text-[22px] leading-none text-[#3b3b3b]">karim (new!!)</p>
      <span data-polaroid-fade className="absolute -top-1 left-1/2 h-[18px] w-[54px] -translate-x-1/2 rotate-[3deg] bg-[#f3e3a0]/80" />
    </Chaos>
  );
}

export function CalendarStrip() {
  return (
    <Chaos w={340} h={66} rot={-3} className={`rounded-[2px] bg-[#efe8d2] ${SHADOW}`}>
      <div className="flex h-full items-center justify-between px-5 font-mono text-[14px] font-bold tracking-[.12em] text-[#6b6248]">
        {["SEP", "OCT", "NOV", "DEC", "JAN"].map((m) => (
          <span key={m}>{m}</span>
        ))}
      </div>
      <svg className="absolute left-[66px] top-[8px]" width="70" height="50" viewBox="0 0 70 50" fill="none" stroke="#c63a2c" strokeWidth="2.6" strokeLinecap="round"><path d="M10 28C6 12 30 4 48 8c14 4 18 20 8 30C44 48 14 46 8 30" /></svg>
      <span className="absolute -bottom-4 right-6 size-14 rounded-full border-[5px] border-[#8a5a2b]/15" />
    </Chaos>
  );
}

export function Receipt() {
  const rows: [string, string][] = [
    ["GROUP PLAN x168", "412,300"],
    ["PT PACKS   x46", "126,800"],
    ["DROP-IN    x92", "34,500"],
    ["CASH ???", "13,800"],
  ];
  return (
    <Chaos w={152} h={300} rot={5} torn className={`bg-[#f4f3ee] [-webkit-mask:conic-gradient(from_-45deg_at_bottom,#0000,#000_1deg_89deg,#0000_90deg)_50%/14px_100%] [mask:conic-gradient(from_-45deg_at_bottom,#0000,#000_1deg_89deg,#0000_90deg)_50%/14px_100%]`}>
      <div className="px-3.5 pb-6 pt-4 font-mono text-[10px] leading-[1.55] text-[#3b3b3b]">
        <p className="text-center font-bold">BIZ GYM · SALES</p>
        <p className="text-center text-[#8d8d88]">oct — printed 23:41</p>
        <p className="my-1.5 border-t border-dashed border-[#9a9a94]" />
        {rows.map(([a, b]) => (
          <p key={a} className="flex justify-between gap-1 whitespace-pre">
            <span>{a}</span>
            <span>{b}</span>
          </p>
        ))}
        <p className="my-1.5 border-t border-dashed border-[#9a9a94]" />
        <p className="flex justify-between font-bold">
          <span>TOTAL</span>
          <span>587,400</span>
        </p>
        <p className="mt-2 font-hand text-[20px] leading-none text-[#c63a2c]">check again!!</p>
        <div className="mt-2.5 h-9 w-full bg-[repeating-linear-gradient(90deg,#222_0_2px,transparent_2px_4px,#222_4px_5px,transparent_5px_8px)]" />
      </div>
    </Chaos>
  );
}

const CALC_KEYS = ["7", "8", "9", "÷", "4", "5", "6", "×", "1", "2", "3", "-", "0", ".", "=", "+"];

export function Calculator() {
  return (
    <Chaos w={134} h={196} rot={-8} className={`rounded-[14px] bg-[#d9d5cb] ${SHADOW}`}>
      <div className="m-3 rounded-md bg-[#c4d1a5] px-2 py-1.5 text-right font-mono text-[22px] font-bold leading-none text-[#2c3a1c] shadow-[inset_0_2px_4px_rgba(0,0,0,.25)]">365,700</div>
      <div className="grid grid-cols-4 gap-1.5 px-3">
        {CALC_KEYS.map((k, i) => (
          <span
            key={k}
            className={`grid h-[22px] place-items-center rounded-[5px] font-mono text-[12px] font-bold leading-none shadow-[0_2px_0_rgba(0,0,0,.22)] ${i % 4 === 3 ? "bg-[#e8a24a] text-white" : "bg-[#f1eee7] text-[#3d3a33]"}`}
          >
            {k}
          </span>
        ))}
      </div>
    </Chaos>
  );
}

export function Ledger() {
  return (
    <Chaos w={176} h={210} rot={9} className={`rounded-[3px] bg-[#fbf8ef] ${SHADOW}`}>
      <div className="absolute inset-0 bg-[repeating-linear-gradient(transparent_0_27px,#a9bfd8_27px_28px)] [background-position:0_34px]" />
      <span className="absolute inset-y-0 left-[26px] w-px bg-[#e08a8a]" />
      <div className="relative pl-[34px] pr-3 pt-3 font-hand text-[23px] leading-[28px] text-[#2f3a55]">
        <p className="font-bold underline decoration-[#c63a2c]">payouts</p>
        <p className="flex justify-between"><span>Nour</span><span>4,200 ok</span></p>
        <p className="flex justify-between"><span>Omar</span><span>3,800 ??</span></p>
        <p className="flex justify-between"><span>Salma</span><span><s className="text-[#c63a2c]">5,150</s> 4,900</span></p>
        <p className="flex justify-between"><span>Adel</span><span>2,700 ok</span></p>
        <p className="text-[#c63a2c]">total ~ 14k ?</p>
      </div>
    </Chaos>
  );
}

export function Clipboard() {
  return (
    <Chaos w={152} h={206} rot={-7} className={`rounded-[9px] bg-[#b8894f] ${SHADOW}`}>
      <span className="absolute left-1/2 top-[6px] h-[22px] w-[64px] -translate-x-1/2 rounded-[5px] bg-[#9c9ba3] shadow-[0_2px_0_rgba(0,0,0,.25)]" />
      <div className="absolute inset-x-[12px] bottom-[12px] top-[24px] rounded-[3px] bg-[#fdfcf8] px-2.5 pt-3.5">
        <p className="font-mono text-[9px] font-bold tracking-[.1em] text-[#6b6b66]">SIGN-IN</p>
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="mt-[11px] flex items-center gap-2">
            <span className="size-[11px] rounded-[2px] border border-[#8d8d88] text-center font-hand text-[13px] leading-[10px] text-[#2f3a55]">{i % 3 === 1 ? "" : "x"}</span>
            <span className="h-px flex-1 bg-[#b9b9b3]" />
          </div>
        ))}
      </div>
    </Chaos>
  );
}

export function PunchCard() {
  return (
    <Chaos w={204} h={120} rot={10} className={`rounded-[8px] bg-[#d9b98c] ${SHADOW}`}>
      <p className="px-4 pt-3 font-mono text-[11px] font-bold tracking-[.1em] text-[#6a4e2a]">CLASS CARD · 10 SESSIONS</p>
      <div className="mt-2.5 grid grid-cols-5 gap-x-3 gap-y-3 px-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <span key={i} className="grid size-[26px] place-items-center rounded-full border-2 border-[#8b6a3c]/70">
            {i < 6 && <span className="size-[9px] rounded-full bg-[#5a3f1c]" />}
          </span>
        ))}
      </div>
      <p className="absolute bottom-1.5 right-3 font-hand text-[20px] leading-none text-[#6a4e2a]">4 left?</p>
    </Chaos>
  );
}

export function Spreadsheet() {
  const cols = ["A", "B", "C", "D", "E"];
  const data = [
    ["Jun", "348,9", "131,2", "217", "?"],
    ["Jul", "371,2", "140,8", "230", "?"],
    ["Aug", "429,8", "163,9", "265", "ok"],
    ["Sep", "506,1", "#REF!", "313", ""],
    ["Oct", "587,4", "221,7", "365", "FINAL"],
  ];
  return (
    <Chaos w={304} h={200} rot={-4} className={`rounded-[6px] bg-white ${SHADOW}`}>
      <div className="flex h-[22px] items-center bg-[#1d6f42] px-2.5 font-sans text-[10px] font-semibold text-white">revenue_FINAL_v7 (2).xlsx</div>
      <div className="grid grid-cols-[22px_repeat(5,1fr)] font-sans text-[10px] text-[#333]">
        <span className="h-[20px] bg-[#e6e6e6]" />
        {cols.map((c) => (
          <span key={c} className="grid h-[20px] place-items-center border-l border-[#cfcfcf] bg-[#e6e6e6] font-semibold">{c}</span>
        ))}
        {data.map((row, r) => (
          <div key={r} className="contents">
            <span className="grid h-[24px] place-items-center bg-[#e6e6e6] font-semibold">{r + 1}</span>
            {row.map((cell, c) => (
              <span
                key={c}
                className={`flex h-[24px] items-center border-b border-l border-[#e1e1e1] px-1.5 ${cell === "#REF!" ? "bg-[#fde0dc] font-bold text-[#c63a2c]" : r % 2 ? "bg-[#f7f7f7]" : ""} ${r === 3 && c === 1 ? "outline outline-2 -outline-offset-2 outline-[#1d6f42]" : ""}`}
              >
                {cell}
              </span>
            ))}
          </div>
        ))}
      </div>
    </Chaos>
  );
}
