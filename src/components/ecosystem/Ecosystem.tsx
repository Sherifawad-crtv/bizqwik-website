"use client";

import Image from "next/image";
import { Fragment, useEffect, useRef } from "react";
import { Icon, type IconName } from "@/components/ui/Icon";
import { appSummaries, ecosystem } from "@/content";
import { initEcosystemMotion } from "./ecosystem-motion";

/**
 * Chapter 2. A white sheet rises over the (still pinned) hero, carrying a tilted tag, the
 * heading and five app cards, one per person who touches the gym. Scrolling through the row
 * "syncs" them: each icon tile, then the arrow after it, lights up in turn.
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

          <ol data-eco-grid className="mt-14 flex flex-col items-stretch lg:mt-20 lg:flex-row">
            {appSummaries.map((app, i) => (
              <Fragment key={app.id}>
                <li data-eco-card className="lg:min-w-0 lg:flex-1">
                  <a
                    href="#apps"
                    className="group flex h-full flex-col rounded-[32px] bg-paper p-6 text-ink transition-[transform,box-shadow] duration-300 hover:-translate-y-1.5 hover:text-ink hover:shadow-card"
                  >
                    <div className="relative size-[104px]">
                      <Image
                        src={app.portrait}
                        alt=""
                        width={104}
                        height={104}
                        unoptimized
                        className="size-full rounded-full object-cover ring-4 ring-surface transition-transform duration-500 group-hover:scale-105"
                      />
                      <span
                        data-eco-tile
                        className="absolute -bottom-1 -right-1 grid size-11 place-items-center rounded-[14px] bg-primary-tint text-primary-pressed ring-4 ring-paper transition-colors duration-500 data-[on]:bg-primary data-[on]:text-white"
                      >
                        <Icon name={app.icon as IconName} size={22} />
                      </span>
                    </div>
                    <p aria-hidden className="mt-6 font-mono text-label font-bold text-ink-faint">
                      {app.number}
                    </p>
                    <h3 className="mt-1 text-[24px] font-extrabold leading-[1.1] tracking-[-.02em]">{app.title}</h3>
                    <p className="mt-3 text-[17px] leading-snug text-ink-muted">{app.role}</p>
                    <div className="mt-auto pt-6">
                      <p className="font-mono text-[11px] font-bold uppercase tracking-[.1em] text-ink-muted">Used by</p>
                      <p className="mt-1 text-[16px] font-semibold leading-snug">{app.usedBy}</p>
                    </div>
                  </a>
                </li>
                {i < appSummaries.length - 1 && (
                  <li aria-hidden data-eco-link className="flex items-center justify-center py-2 lg:w-12 lg:flex-none lg:items-start lg:py-0 lg:pt-[62px]">
                    <span className="grid size-7 rotate-90 place-items-center rounded-full bg-sunken text-ink-faint transition-colors duration-500 data-[on]:bg-primary data-[on]:text-white lg:rotate-0">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 7h8M7.5 3.5 11 7l-3.5 3.5" />
                      </svg>
                    </span>
                  </li>
                )}
              </Fragment>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
