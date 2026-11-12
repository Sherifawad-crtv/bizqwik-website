"use client";

import { useEffect, useRef } from "react";
import { Container } from "@/components/layout/layout";
import { Icon } from "@/components/ui/Icon";
import { ReplayButton } from "@/components/ui/ReplayButton";
import { features, type FeatureId } from "@/content";
import { BusinessDemo, ClientDemo, CoachDemo, FrontDeskDemo } from "./demos";
import { initFeatureMotion } from "./features-motion";

const DEMOS: Record<FeatureId, () => React.JSX.Element> = {
  business: BusinessDemo,
  frontdesk: FrontDeskDemo,
  coaches: CoachDemo,
  clients: ClientDemo,
};

/** Phone panels hold a demo laid out at this size (px) and scaled to fit, so every panel has the same height. */
const DESIGN_W = 480;

/** The client demo shows two cards side by side, so its stage is wider. */
const WIDE: Partial<Record<FeatureId, true>> = { clients: true };

/**
 * Section 5 of the outline, laid out like the reference's feature list: one row per feature. The text sits on the
 * left and sticks `--header-offset` from the top while its row scrolls past; the panel on the right holds the live
 * demo and a Replay pill. A 1px divider above each title draws in as the row scrolls on screen. Rows are 16px apart on desktop; stacked (under 901px) they are 64px apart. Under 901px the title and headline are sticky (top 80px, under the floating bar) for as long as the row is on screen.
 * The demo plays when its panel scrolls into view (ecosystem-motion.ts, docs/MOTION.md).
 */
export function FeatureList() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    // Phones: every panel is the same shape. The demo is laid out at DESIGN_W and scaled to the panel's width.
    const fit = new ResizeObserver((entries) => {
      for (const e of entries) (e.target as HTMLElement).style.setProperty("--s", String(Math.min(1, e.contentRect.width / DESIGN_W)));
    });
    el.querySelectorAll("[data-panel]").forEach((p) => fit.observe(p));
    const stop = initFeatureMotion(el);
    return () => {
      fit.disconnect();
      stop?.();
    };
  }, []);

  return (
    <section ref={root} id="apps" aria-label="Features" className="mt-(--header-offset) pb-24 lg:pb-40">
      <Container>
        <div className="flex flex-col gap-4 max-[900px]:gap-16">
          {features.map((f) => {
            const Demo = DEMOS[f.id];
            return (
              <div key={f.id} className="flex flex-col gap-4 min-[901px]:grid min-[901px]:grid-cols-[1fr_2.03fr] min-[1441px]:grid-cols-[1fr_1.4fr]">
                {/* Desktop: one sticky column. Stacked (under 901px): the wrapper disappears, so the title and headline stick to the top
                    on their own for as long as this row is on screen, and the bullets and panel scroll beneath them. */}
                <div data-accordion className="contents min-[901px]:sticky min-[901px]:top-(--header-offset) min-[901px]:mb-(--header-offset) min-[901px]:block min-[901px]:self-start">
                  <div data-head className="sticky top-[80px] z-20 -mx-(--gutter) bg-paper px-(--gutter) pb-3 pt-3 min-[901px]:static min-[901px]:z-auto min-[901px]:m-0 min-[901px]:bg-transparent min-[901px]:p-0">
                    <span data-rule aria-hidden className="mb-4 block h-px bg-ink/15" />
                    <h3 className="text-[28px] font-extrabold leading-[1.05] tracking-[-.025em]">{f.title}</h3>
                    <p className="mt-3 max-w-[26rem] text-[18px] leading-snug text-ink-muted">{f.headline}</p>
                  </div>
                  <ul className="mt-3 max-w-[26rem] min-[901px]:mt-6">
                    {f.bullets.map((b) => (
                      <li key={b} className="flex items-center gap-3.5 border-t border-line py-3.5 text-[15px] leading-snug first:border-t-0 first:pt-1 last:pb-0">
                        <span className="grid size-8 shrink-0 place-items-center rounded-[10px] border border-line bg-paper text-ink">
                          <Icon name="check-circle" size={18} />
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>

                <div
                  data-panel
                  className="relative grid w-full min-w-0 place-items-center overflow-hidden rounded-[28px] border border-line bg-sunken max-[900px]:h-[calc(650px*var(--s,.8))] min-[901px]:aspect-[849/640] min-[901px]:min-h-[670px] min-[901px]:px-10 min-[901px]:py-10"
                >
                  <div className="contents max-[900px]:absolute max-[900px]:left-1/2 max-[900px]:top-0 max-[900px]:ml-[calc(-240px*var(--s,.8))] max-[900px]:flex max-[900px]:origin-top-left max-[900px]:items-center max-[900px]:justify-center max-[900px]:pb-20 max-[900px]:pt-5 max-[900px]:[scale:var(--s,.75)] max-[900px]:w-[480px] max-[900px]:h-[650px]">
                    <div data-demo={f.id} className={`w-full max-[900px]:w-[440px] max-[900px]:max-w-none ${WIDE[f.id] ? "max-w-[640px]" : "max-w-[520px]"}`}>
                      <Demo />
                    </div>
                  </div>
                  <ReplayButton className="absolute bottom-4 right-4 z-10" />
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
