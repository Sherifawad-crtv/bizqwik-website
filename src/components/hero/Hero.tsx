"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { cta, hero } from "@/content";
import { ScrollTrigger } from "@/motion/gsap";
import { initHeroMotion } from "./hero-motion";
import { PhoneMockup } from "./PhoneMockup";

/**
 * Hero: title, subtitle and two CTAs above, an empty phone below it bleeding off the bottom,
 * the founder-home UI scattered around it. Scrolling pins the section and
 * assembles the screen (see hero-motion.ts).
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const cleanup = initHeroMotion(el);
    // Fonts and the frame image change layout: re-measure once they land.
    document.fonts.ready.then(() => ScrollTrigger.refresh());
    return cleanup;
  }, []);

  return (
    <section
      ref={root}
      id="top"
      data-hero
      aria-labelledby="hero-title"
      className="relative h-svh overflow-clip [--phone-w:min(72vw,calc((100svh-130px)/2.04))] lg:[--phone-w:min(26vw,calc((100svh-130px)/2.04))]"
    >
      <div
        data-hero-text
        className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-5 pt-[calc(76px+clamp(8px,2.6svh,36px))] text-center"
      >
        <h1
          id="hero-title"
          className="text-[clamp(2.5rem,0.8rem+4vw,4.75rem)] font-extrabold leading-[0.98] tracking-[-0.035em] text-balance"
        >
          <span className="block">{hero.headline.line1}</span>
          <span className="block">
            {hero.headline.line2Before}
            <span className="bg-[linear-gradient(transparent_62%,rgb(90_65_255/0.24)_62%,rgb(90_65_255/0.24)_90%,transparent_90%)]">
              {hero.headline.highlight}
            </span>
          </span>
        </h1>
        <p className="mt-4 max-w-2xl text-[clamp(1.0625rem,0.95rem+0.55vw,1.5rem)] leading-snug text-ink-muted text-balance">
          {hero.support}
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Button href={cta.primary.href} size="lg">
            {cta.primary.label}
          </Button>
          <Button href={cta.secondary.href} size="lg" variant="secondary">
            {cta.secondary.label}
          </Button>
        </div>
      </div>

      <div data-phone-wrap className="relative z-10 mx-auto mt-[clamp(16px,3svh,40px)]" style={{ width: "var(--phone-w)" }}>
        <PhoneMockup alt={hero.alt} />
      </div>

      {/* Bleeds the phone into the page at the viewport's bottom edge; gone once it has risen. */}
      <div data-hero-fade aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[20svh] bg-gradient-to-t from-paper via-paper/80 to-transparent" />
    </section>
  );
}
