"use client";

import { useId, useState } from "react";
import { Container } from "@/components/layout/layout";
import { Icon } from "@/components/ui/Icon";
import { faq, faqHeading } from "@/content";

/**
 * FAQ: heading sticks on the left (as the feature list does), answers open one at a time on the right.
 * The panel opens with a grid-rows transition on the motion tokens (docs/MOTION.md); reduced motion snaps via the global rule.
 */
export function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);
  const base = useId();
  return (
    <section id="faq" aria-labelledby="faq-title" className="pb-16 lg:pb-28">
      <Container>
        <div className="grid gap-8 min-[901px]:grid-cols-[1fr_2.03fr] min-[901px]:gap-4">
          <div data-reveal className="min-[901px]:sticky min-[901px]:top-(--header-offset) min-[901px]:self-start">
            <span aria-hidden className="mb-4 block h-px bg-ink/15" />
            <h2 id="faq-title" className="text-[clamp(2rem,1.2rem+2.6vw,3.25rem)] font-extrabold leading-[1.05] tracking-[-.03em] text-balance">
              {faqHeading}
            </h2>
          </div>

          <ul data-reveal className="border-t border-line">
            {faq.map((f, i) => {
              const isOpen = open === i;
              const id = `${base}-${i}`;
              return (
                <li key={f.question} className="border-b border-line">
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={id}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-6 py-5 text-left text-[19px] font-bold leading-snug tracking-[-.01em]"
                    >
                      {f.question}
                      <span
                        aria-hidden
                        className={`grid size-9 shrink-0 place-items-center rounded-full border border-line bg-surface transition-transform duration-(--dur-base) ease-standard ${isOpen ? "rotate-180" : ""}`}
                      >
                        <Icon name="alt-arrow-down" size={18} />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={id}
                    role="region"
                    inert={!isOpen}
                    className={`grid transition-[grid-template-rows,opacity] duration-(--dur-enter) ease-standard ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-2xl pb-5 text-[17px] leading-relaxed text-ink-muted">{f.answer}</p>
                      {f.cta && (
                        <a href={f.cta.href} className="mb-3 inline-flex min-h-11 items-center text-[16px] font-bold text-primary-pressed underline-offset-4 hover:underline">
                          {f.cta.label}
                        </a>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}
