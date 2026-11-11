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

/** The client demo shows two cards side by side, so its stage is wider. */
const WIDE: Partial<Record<FeatureId, true>> = { clients: true };

/**
 * Section 5 of the outline, laid out like the reference's feature list: one row per feature. The text sits on the
 * left and sticks `--header-offset` from the top while its row scrolls past; the panel on the right holds the live
 * demo and a Replay pill. A 1px divider above each title draws in as the row scrolls on screen. Rows are 16px apart on desktop; stacked (under 901px) they are 64px apart and the text sits 32px above its panel, so each block groups with its own panel (proximity), as in the reference. Under 901px the text is not sticky and sits above its panel.
 * The demo plays when its panel scrolls into view (ecosystem-motion.ts, docs/MOTION.md).
 */
export function FeatureList() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    return el ? initFeatureMotion(el) : undefined;
  }, []);

  return (
    <section ref={root} id="apps" aria-label="Features" className="mt-(--header-offset) pb-24 lg:pb-40">
      <Container>
        <div className="flex flex-col gap-4 max-[900px]:gap-16">
          {features.map((f) => {
            const Demo = DEMOS[f.id];
            return (
              <div key={f.id} className="grid gap-4 min-[901px]:grid-cols-[1fr_2.03fr] min-[1441px]:grid-cols-[1fr_1.4fr]">
                <div data-accordion className="mb-4 min-[901px]:sticky min-[901px]:top-(--header-offset) min-[901px]:mb-(--header-offset) min-[901px]:self-start">
                  <span data-rule aria-hidden className="mb-4 block h-px bg-ink/15" />
                  <h3 className="text-[28px] font-extrabold leading-[1.05] tracking-[-.025em]">{f.title}</h3>
                  <p className="mt-3 max-w-[26rem] text-[18px] leading-snug text-ink-muted">{f.headline}</p>
                  <ul className="mt-6 max-w-[26rem]">
                    {f.bullets.map((b) => (
                      <li key={b} className="flex items-center gap-3.5 border-t border-line py-3.5 text-[15px] leading-snug first:border-t-0 first:pt-1 last:pb-0">
                        <span className="grid size-8 shrink-0 place-items-center rounded-[10px] border border-line bg-paper text-ink">
                          <Icon name="check-circle" size={17} />
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>

                <div
                  data-panel
                  className="relative grid w-full min-w-0 place-items-center overflow-hidden rounded-[28px] border border-line bg-sunken px-4 pb-20 pt-10 min-[901px]:aspect-[849/640] min-[901px]:min-h-[670px] min-[901px]:px-10 min-[901px]:py-10"
                >
                  <div data-demo={f.id} className={`w-full ${WIDE[f.id] ? "max-w-[640px]" : "max-w-[520px]"}`}>
                    <Demo />
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
