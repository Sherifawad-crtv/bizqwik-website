"use client";

import { useEffect, useRef, useState } from "react";
import { ecosystem, features, type FeatureId } from "@/content";
import { Icon, type IconName } from "@/components/ui/Icon";
import { ReplayButton } from "@/components/ui/ReplayButton";
import { BookingsDemo, CheckInDemo, ClientDemo, MembershipsDemo, PaymentsDemo, PayoutsDemo, RevenueDemo, SchedulingDemo, SessionsDemo } from "./Demos";
import { initEcosystemMotion } from "./ecosystem-motion";

const DEMOS: Record<FeatureId, () => React.JSX.Element> = {
  revenue: RevenueDemo,
  scheduling: SchedulingDemo,
  bookings: BookingsDemo,
  checkin: CheckInDemo,
  payments: PaymentsDemo,
  memberships: MembershipsDemo,
  payouts: PayoutsDemo,
  sessions: SessionsDemo,
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

  const app = features[active];
  const go = (i: number) => setActive((i + features.length) % features.length);

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const next = e.key === "ArrowRight" ? i + 1 : e.key === "ArrowLeft" ? i - 1 : null;
    if (next === null) return;
    e.preventDefault();
    go(next);
    document.getElementById(`eco-tab-${features[(next + features.length) % features.length].id}`)?.focus();
  };

  return (
    <section ref={root} id="apps" aria-labelledby="ecosystem-title" className="px-4 py-16 lg:px-8 lg:py-24">
      <div className="relative">
        <div className="mx-auto max-w-page">
          <div className="flex flex-col items-center text-center">
            <span

              className="inline-flex -rotate-3 items-center gap-2 rounded-full bg-ink py-1.5 pl-1.5 pr-4 font-mono text-[13px] font-bold uppercase tracking-[.08em] text-white shadow-[0_8px_18px_-8px_rgba(26,23,38,.5)]"
            >
              <span className="rounded-full bg-white/15 px-2.5 py-1">01</span>
              Features
            </span>
            <h2 id="ecosystem-title" className="mt-8 text-h2 font-extrabold text-balance">
              {ecosystem.heading}
            </h2>
            <p className="mt-6 max-w-2xl text-body text-ink-muted text-balance">
              {ecosystem.lede}
            </p>
          </div>

          <div data-reveal className="mt-12 lg:mt-16">
            {/* Chips: one swipeable row on phones, centred and wrapping on desktop. */}
            <div role="tablist" aria-label="Features" className="-mx-5 flex snap-x gap-2.5 overflow-x-auto px-5 pb-1 [scrollbar-width:none] lg:mx-0 lg:flex-wrap lg:justify-center lg:gap-3 lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden">
              {features.map((a, i) => (
                <button
                  key={a.id}
                  id={`eco-tab-${a.id}`}
                  role="tab"
                  type="button"
                  aria-selected={i === active}
                  aria-controls="eco-stage"
                  tabIndex={i === active ? 0 : -1}
                  onClick={(e) => {
                    setActive(i);
                    e.currentTarget.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
                  }}
                  onKeyDown={(e) => onKey(e, i)}
                  className={`inline-flex h-12 shrink-0 snap-center items-center gap-2.5 rounded-xl border px-5 text-[17px] font-semibold transition-colors duration-(--dur-fast) ease-standard ${
                    i === active ? "border-primary bg-primary-tint text-primary-pressed" : "border-line bg-surface text-ink hover:border-ink/30"
                  }`}
                >
                  <Icon name={a.icon as IconName} className="size-5" />
                  {a.label}
                </button>
              ))}
            </div>

            <div id="eco-stage" role="tabpanel" aria-labelledby={`eco-tab-${app.id}`} className="mt-6 grid gap-4 lg:mt-8 lg:grid-cols-[5fr_7fr] lg:gap-5">
              <div key={app.id} data-eco-copy className="order-2 flex flex-col justify-center rounded-[28px] bg-primary-tint px-7 py-10 lg:order-1 lg:px-12 lg:py-14">
                <h3 className="text-[34px] font-extrabold leading-[1.05] tracking-[-.025em] text-balance lg:text-[40px]">{app.title}</h3>
                <p className="mt-5 text-[19px] leading-snug text-ink">{app.headline}</p>
                <ul className="mt-6 space-y-3 text-[16px] leading-snug text-ink-muted">
                  {app.bullets.map((b) => (
                    <li key={b} className="flex gap-3">
                      <Icon name="check-circle" className="mt-0.5 size-5 shrink-0 text-primary" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative order-1 flex min-h-[460px] items-center justify-center rounded-[28px] bg-sunken px-5 py-10 lg:order-2 lg:min-h-[600px] lg:px-10">
                <ReplayButton className="absolute bottom-4 right-4 z-10" />
                {features.map((a, i) => {
                  const Demo = DEMOS[a.id];
                  return (
                    <div key={a.id} data-demo={a.id} data-active={i === active} hidden={i !== active} className="w-full max-w-[520px]">
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
