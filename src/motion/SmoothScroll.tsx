"use client";

import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { useEffect } from "react";
import { gsap, ScrollTrigger } from "./gsap";
import { setLenis } from "./lenis";
import { smoothScroll } from "./tokens";

/**
 * Lenis smooth scroll driven by GSAP's ticker, so scroll and every
 * ScrollTrigger animation share one clock (no drift, no double rAF loops).
 * Skipped entirely for visitors who prefer reduced motion: native scroll.
 */
export function SmoothScroll() {
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | null = null;
    let tick: ((time: number) => void) | null = null;

    const start = () => {
      lenis = new Lenis({
        autoRaf: false,
        lerp: smoothScroll.lerp,
        wheelMultiplier: smoothScroll.wheelMultiplier,
        // Anchor offset comes from `scroll-padding-top` in globals.css (Lenis honours it).
        anchors: true,
      });
      setLenis(lenis);
      lenis.on("scroll", ScrollTrigger.update);
      tick = (time) => lenis?.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    };

    const stop = () => {
      if (tick) gsap.ticker.remove(tick);
      lenis?.destroy();
      setLenis(null);
      lenis = null;
      tick = null;
    };

    const sync = () => (query.matches ? stop() : lenis || start());
    sync();
    query.addEventListener("change", sync);
    return () => {
      query.removeEventListener("change", sync);
      stop();
    };
  }, []);

  return null;
}
