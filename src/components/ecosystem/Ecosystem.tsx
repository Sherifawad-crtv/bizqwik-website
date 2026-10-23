"use client";

import { useEffect, useRef } from "react";
import { appSummaries, ecosystem, type AppId } from "@/content";
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
 * Chapter 2. A white sheet rises over the (still pinned) hero, carrying a tilted tag, the
 * heading and five columns, one per person who touches the gym: a short title above a card that
 * holds one small live product moment for that role on loop (see Demos.tsx and ecosystem-motion.ts).
 * `-mt-[100svh]` pulls the sheet up over the last viewport of the hero's pin (see hero-motion.ts COVER_VH).
 */
export function Ecosystem() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    return initEcosystemMotion(el);
  }, []);

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

          <ol data-eco-grid className="mt-14 grid gap-x-4 gap-y-10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-5">
            {appSummaries.map((app) => {
              const Demo = DEMOS[app.id];
              return (
                <li key={app.id} data-eco-card>
                  <h3 className="mb-4 text-[26px] font-extrabold leading-none tracking-[-.02em]">{app.short}</h3>
                  <div data-demo={app.id} className="relative flex min-h-[300px] items-center rounded-[32px] bg-paper p-6">
                    <Demo />
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
