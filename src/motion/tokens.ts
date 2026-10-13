/**
 * Motion tokens: the single source for every duration and ease on the site.
 * Lives in TS (not CSS) because GSAP consumes numbers and ease strings.
 * Changing the motion language = editing this file. Log it in docs/progress/.
 */
export const ease = {
  /** Default entrance: fast start, long soft landing. */
  out: "expo.out",
  /** Symmetric moves (pins, scrubs, toggles). */
  inOut: "power3.inOut",
  /** Gentle settle for small UI feedback. */
  soft: "power2.out",
} as const;

export const duration = {
  fast: 0.3,
  base: 0.7,
  slow: 1.2,
  /** Hero / signature moments. */
  hero: 1.6,
} as const;

export const stagger = {
  tight: 0.04,
  base: 0.08,
  loose: 0.14,
} as const;

/** Lenis smooth-scroll feel. */
export const smoothScroll = {
  /** 0–1: lower = heavier, more cinematic glide. */
  lerp: 0.085,
  wheelMultiplier: 1,
} as const;
