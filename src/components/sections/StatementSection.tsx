"use client";

import Image from "next/image";
import { Container } from "@/components/layout/layout";
import { useEffect, useRef } from "react";
import { Icon, type IconName } from "@/components/ui/Icon";
import { orbit, statement } from "@/content";
import { initStatementMotion } from "./statement-motion";

/**
 * Section 3 of the outline: the dark statement. A small pill grows into the full box as you scroll, while
 * the pills inside keep moving (statement-motion.ts, docs/MOTION.md section 7). Without JS it is the
 * finished box. The box is 720px tall (620 on phones) like the reference.
 */
export function StatementSection() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    return el ? initStatementMotion(el) : undefined;
  }, []);

  return (
    <section ref={root} id="ecosystem" aria-labelledby="statement-title" className="relative mt-20">
      <Container>
        <div data-st-content className="relative h-[620px] overflow-hidden rounded-[40px] bg-ink text-white min-[901px]:h-[720px]">
          <div data-st-anim className="grid h-full grid-rows-[auto_1fr] gap-y-20 min-[901px]:grid-cols-2 min-[901px]:grid-rows-1 min-[901px]:items-center min-[901px]:gap-y-0">
            <h2
              id="statement-title"
              className="mx-auto max-w-[560px] px-6 pt-12 text-center text-[clamp(2.5rem,1.4rem+3.4vw,4rem)] font-extrabold leading-[.96] tracking-[-.035em] min-[901px]:mx-0 min-[901px]:pl-[8%] min-[901px]:pt-0 min-[901px]:text-left"
            >
              {statement.line1}{" "}
              <span className="block">
                {statement.line2Before}
                <span className="text-primary-light">{statement.highlight}</span>
              </span>
            </h2>

            <p className="sr-only">{orbit.map((o) => o.label).join(". ")}.</p>
            <ul aria-hidden className="relative h-full min-[901px]:overflow-hidden">
              {orbit.map((o) => (
                <li
                  key={o.label}
                  data-st-pill
                  style={{ opacity: 0 }}
                  className="absolute left-0 top-1/2 flex h-[60px] items-center gap-3 whitespace-nowrap rounded-full border border-white/10 py-2 pl-2 pr-4 text-[15px] font-bold max-[900px]:left-1/2 min-[901px]:h-[100px] min-[901px]:gap-4 min-[901px]:py-[18px] min-[901px]:pl-[18px] min-[901px]:pr-7 min-[901px]:text-[18px]"
                >
                  <span className="grid aspect-square h-full place-items-center rounded-full bg-white/10">
                    <Icon name={o.icon as IconName} size={22} />
                  </span>
                  {o.label}
                </li>
              ))}
            </ul>
          </div>

          <span
            data-st-logo
            aria-hidden
            className="absolute left-1/2 top-1/2 grid size-[100px] place-items-center rounded-[30px] bg-surface shadow-[0_20px_44px_-12px_rgba(90,65,255,.55)] max-[900px]:size-[84px]"
          >
            <Image src="/brand/mark.png" alt="" width={386} height={403} className="h-11 w-auto max-[900px]:h-9" />
          </span>
        </div>
      </Container>
    </section>
  );
}
