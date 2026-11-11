"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/motion/gsap";
import { pressFeedback, replay, scrubWords } from "@/motion/primitives";
import { duration, ease, enterFrom, stagger } from "@/motion/tokens";

/*
 * Living reference for the motion system. Every sample below uses the shared kit exactly as a
 * real section would; if a sample looks wrong, the kit is wrong. Spec: docs/MOTION.md.
 */

const mono = "font-mono text-[12px] font-bold uppercase tracking-[.06em]";

const EASES: [string, string, string][] = [
  ["ease.standard", "cubic-bezier(.4, 0, .1, 1)", "Moves, swaps, a card growing"],
  ["ease.enter", "cubic-bezier(.19, .1, .22, 1)", "Entrances"],
  ["ease.spring", "cubic-bezier(.33, 1.53, .69, .99)", "Press release, small pops"],
  ["ease.linear", "none", "Spinners, scan lines"],
];

const DURATIONS = Object.entries(duration) as [string, number][];

export function MotionGallery() {
  const ladder = useRef<HTMLDivElement>(null);
  const demo = useRef<gsap.core.Timeline | null>(null);
  const [pressed, setPressed] = useState(0);
  const statement = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const root = ladder.current;
    if (!root) return;
    const tl = gsap.timeline({ paused: true });
    root.querySelectorAll<HTMLElement>("[data-bar]").forEach((bar) => {
      tl.fromTo(bar, { scaleX: 0 }, { scaleX: 1, duration: Number(bar.dataset.bar), ease: ease.standard }, 0);
    });
    demo.current = tl;
    return () => void tl.kill();
  }, []);

  useEffect(() => {
    const el = statement.current;
    return el ? scrubWords(el) : undefined;
  }, []);

  return (
    <>
      <div className="overflow-hidden rounded-card border border-line bg-surface">
        {EASES.map(([name, curve, use]) => (
          <div key={name} className="grid gap-1 border-b border-line px-5 py-4 last:border-b-0 sm:grid-cols-[170px_1fr_1fr]">
            <code className="font-mono text-[13px] font-bold">{name}</code>
            <span className="font-mono text-[13px] text-ink-muted">{curve}</span>
            <span className="text-[15px] text-ink-muted">{use}</span>
          </div>
        ))}
      </div>

      <div ref={ladder} className="mt-5 rounded-card border border-line bg-surface p-5">
        <div className="flex items-center justify-between">
          <p className={`${mono} text-ink-faint`}>Duration ladder</p>
          <button type="button" onClick={() => demo.current && replay(demo.current)} className="rounded-[12px] bg-primary-tint px-3.5 py-2 text-[14px] font-bold text-primary-pressed">
            Play
          </button>
        </div>
        <div className="mt-4 space-y-2.5">
          {DURATIONS.map(([name, d]) => (
            <div key={name} className="grid grid-cols-[150px_1fr_56px] items-center gap-3">
              <code className="font-mono text-[13px] font-bold">duration.{name}</code>
              <span className="h-2.5 rounded-full bg-sunken">
                <span data-bar={d} className="block h-full origin-left rounded-full bg-primary" />
              </span>
              <span className="text-right font-mono text-[13px] text-ink-muted">{d}s</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-3">
        {["Revenue", "Bookings", "Payouts"].map((t) => (
          <div key={t} data-reveal className="rounded-card border border-line bg-surface p-5">
            <p className={`${mono} text-ink-faint`}>data-reveal</p>
            <p className="mt-2 text-[22px] font-extrabold tracking-[-.02em]">{t}</p>
            <p className="mt-1 text-[15px] text-ink-muted">Rises {enterFrom.y}px, grows from {enterFrom.scale * 100}%, staggers {stagger.base}s.</p>
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-4 rounded-card border border-line bg-surface p-5">
        <button
          type="button"
          data-sq
          onClick={(e) => {
            pressFeedback(e.currentTarget);
            setPressed((n) => n + 1);
          }}
          className="h-14 [--sq-r:24px] [--sq-fill:var(--color-primary)] px-8 text-[17px] font-bold text-white"
        >
          pressFeedback()
        </button>
        <span className="font-mono text-[13px] text-ink-muted">pressed {pressed} times</span>
      </div>

      <p ref={statement} className="mt-5 rounded-card border border-line bg-surface p-6 text-[28px] font-bold leading-tight tracking-[-.02em] text-balance">
        scrubWords() brightens a statement word by word as the block crosses the screen, so a closing paragraph reads itself in as you scroll.
      </p>
    </>
  );
}
