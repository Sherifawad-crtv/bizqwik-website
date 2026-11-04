"use client";

import { useEffect, useRef, useState } from "react";
import { appBlocks, appSummaries, ecosystem, type AppId } from "@/content";
import { Icon, type IconName } from "@/components/ui/Icon";
import { AccountantDemo, ClientDemo, CoachDemo, FounderDemo, FrontDeskDemo } from "./Demos";
import { initEcosystemMotion } from "./ecosystem-motion";

const DEMOS: Record<AppId, () => React.JSX.Element> = {
  founder: FounderDemo,
  accountant: AccountantDemo,
  frontDesk: FrontDeskDemo,
  coaches: CoachDemo,
  client: ClientDemo,
};

/**
 * Chapter 2. A white sheet rises over the (still pinned) hero. Below the heading, five role chips
 * switch one two-panel stage: a lavender card with the role's real content on the left, and on
 * the right a quiet panel holding that role's live product moment on loop (Demos.tsx, ecosystem-motion.ts).
 * `-mt-[100svh]` pulls the sheet up over the last viewport of the hero's pin (see hero-motion.ts COVER_VH).
 */
export function Ecosystem() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    return initEcosystemMotion(el);
  }, []);

  const app = appSummaries[active];
  const block = appBlocks.find((b) => b.id === app.id)!;
  const go = (i: number) => setActive((i + appSummaries.length) % appSummaries.length);

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const next = e.key === "ArrowRight" ? i + 1 : e.key === "ArrowLeft" ? i - 1 : null;
    if (next === null) return;
    e.preventDefault();
    go(next);
    document.getElementById(`eco-tab-${appSummaries[(next + appSummaries.length) % appSummaries.length].id}`)?.focus();
  };

  return (
    <section ref={root} id="ecosystem" aria-labelledby="ecosystem-title" className="relative z-20 -mt-[100svh]">
      {/* Two tinted sheets peek out above the main one, like stacked pages. */}
      <span aria-hidden className="absolute inset-x-[7%] -top-[22px] h-24 rounded-t-[72px] bg-primary-tint-strong" />
      <span aria-hidden className="absolute inset-x-[3%] -top-[11px] h-24 rounded-t-[72px] bg-[#e9e5ff]" />

      <div className="relative min-h-svh rounded-t-[48px] bg-surface px-5 pb-44 pt-16 shadow-[0_-30px_70px_-30px_rgba(26,23,38,.22)] lg:rounded-t-[72px] lg:px-8 lg:pt-24">
        <div className="mx-auto max-w-page">
          <div className="flex flex-col items-center text-center">
            <span
              data-eco-tag
              className="inline-flex -rotate-3 items-center gap-2 rounded-full bg-ink py-1.5 pl-1.5 pr-4 font-mono text-[13px] font-bold uppercase tracking-[.08em] text-white shadow-[0_8px_18px_-8px_rgba(26,23,38,.5)]"
            >
              <span className="rounded-full bg-white/15 px-2.5 py-1">01</span>
              The ecosystem
            </span>
            <h2 id="ecosystem-title" data-eco-title className="mt-8 text-h2 font-extrabold text-balance">
              {ecosystem.heading}
            </h2>
            <p data-eco-lede className="mt-6 max-w-2xl text-body text-ink-muted text-balance">
              {ecosystem.lede}
            </p>
          </div>

          <div data-eco-card className="mt-12 lg:mt-16">
            {/* Mobile: a select + progress, like the reference. */}
            <div className="lg:hidden">
              <div className="relative">
                <select
                  aria-label="Choose an app"
                  value={active}
                  onChange={(e) => setActive(Number(e.target.value))}
                  className="h-14 w-full appearance-none rounded-xl border border-line bg-surface px-4 pr-11 text-[17px] font-semibold text-ink"
                >
                  {appSummaries.map((a, i) => (
                    <option key={a.id} value={i}>{a.short}</option>
                  ))}
                </select>
                <Icon name="alt-arrow-down" className="pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2 text-ink-muted" />
              </div>
              <div className="mt-5 flex items-center gap-4">
                <div className="h-0.5 flex-1 rounded-full bg-line">
                  <div className="h-full rounded-full bg-primary transition-[width] duration-500 ease-out" style={{ width: `${((active + 1) / appSummaries.length) * 100}%` }} />
                </div>
                <span className="font-mono text-[13px] font-bold tabular-nums text-ink-muted">{active + 1}/{appSummaries.length}</span>
              </div>
            </div>

            {/* Desktop: chips. */}
            <div role="tablist" aria-label="Apps" className="hidden flex-wrap justify-center gap-3 lg:flex">
              {appSummaries.map((a, i) => (
                <button
                  key={a.id}
                  id={`eco-tab-${a.id}`}
                  role="tab"
                  type="button"
                  aria-selected={i === active}
                  aria-controls="eco-stage"
                  tabIndex={i === active ? 0 : -1}
                  onClick={() => setActive(i)}
                  onKeyDown={(e) => onKey(e, i)}
                  className={`inline-flex h-12 items-center gap-2.5 rounded-xl border px-5 text-[17px] font-semibold transition-colors duration-300 ${
                    i === active ? "border-primary bg-primary-tint text-primary-pressed" : "border-line bg-surface text-ink hover:border-ink/30"
                  }`}
                >
                  <Icon name={a.icon as IconName} className="size-5" />
                  {a.short}
                </button>
              ))}
            </div>

            <div id="eco-stage" role="tabpanel" aria-labelledby={`eco-tab-${app.id}`} className="mt-6 grid gap-4 lg:mt-8 lg:grid-cols-[5fr_7fr] lg:gap-5">
              <div key={app.id} data-eco-copy className="order-2 flex flex-col justify-center rounded-[28px] bg-primary-tint px-7 py-10 lg:order-1 lg:px-12 lg:py-14">
                <h3 className="text-[34px] font-extrabold leading-[1.05] tracking-[-.025em] text-balance lg:text-[40px]">{app.title}</h3>
                <p className="mt-5 text-[19px] leading-snug text-ink">{block.headline}</p>
                <ul className="mt-6 space-y-3 text-[16px] leading-snug text-ink-muted">
                  {block.bullets.slice(0, 3).map((b) => (
                    <li key={b.text} className="flex gap-3">
                      <Icon name="check-circle" className="mt-0.5 size-5 shrink-0 text-primary" />
                      <span>
                        {b.lead && <strong className="font-semibold text-ink">{b.lead} </strong>}
                        {b.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative order-1 flex min-h-[460px] items-center justify-center rounded-[28px] bg-sunken px-5 py-10 lg:order-2 lg:min-h-[600px] lg:px-10">
                {appSummaries.map((a, i) => {
                  const Demo = DEMOS[a.id];
                  return (
                    <div key={a.id} data-demo={a.id} data-active={i === active} hidden={i !== active} className="w-full max-w-[440px]">
                      <Demo />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
