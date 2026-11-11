/**
 * Motion tokens: the single source for every ease, duration, distance and trigger on the site.
 * Measured from the reference landing page (see docs/MOTION.md). Lives in TS (not CSS) because GSAP
 * consumes numbers and ease names; the CSS twins in styles/tokens.css are verified by `npm run check:motion`.
 *
 * Rule: no component writes a raw ease string or a raw duration. Import from here.
 * Changing the motion language = editing this file + docs/MOTION.md, logged in docs/progress/.
 */

/** Named eases. The bezier ones are registered in motion/gsap.ts. */
export const ease = {
  /** The workhorse, cubic-bezier(.4, 0, .1, 1): moves, state swaps, a card growing. */
  standard: "bq-standard",
  /** Entrances, cubic-bezier(.19, .1, .22, 1): quick start, long soft landing. */
  enter: "bq-enter",
  /** Press release and small pops, cubic-bezier(.33, 1.53, .69, .99): a slight overshoot. */
  spring: "bq-spring",
  /** Constant speed: spinners, scan lines, scrubbed values. */
  linear: "none",
  /**
   * Scroll-linked timelines (the pinned hero, the navbar). Their durations are positions on a
   * scrubbed timeline, not seconds, and these curves keep the tuned feel.
   */
  scrub: { in: "power2.in", inOut: "power2.inOut", out: "power2.out", inOutStrong: "power3.inOut", outStrong: "power3.out" },
} as const;

/** Seconds. The reference uses exactly this ladder. */
export const duration = {
  /** Hover colour, hairline changes. */
  instant: 0.1,
  /** Small fades and swaps. */
  fast: 0.25,
  /** Default UI move. */
  base: 0.4,
  /** Entrances. */
  enter: 0.5,
  /** Card growth, big swaps. */
  slow: 0.6,
  /** A whole object arriving (the hero card scaling in). */
  scene: 0.75,
  /** Numbers counting, scan lines travelling. */
  count: 1.2,
  /** One turn of a spinner. */
  spin: 0.5,
} as const;

/** Seconds between siblings. */
export const stagger = {
  tight: 0.04,
  base: 0.08,
  loose: 0.14,
} as const;

/** Gaps used when a sequence places a step "just after" the previous one. */
export const gap = {
  /** The reference's "+0.1". */
  beat: 0.1,
  /** A pause long enough to read a state before the next step. */
  read: 0.8,
} as const;

/** How far and how small things start when they enter. */
export const enterFrom = {
  y: 12,
  scale: 0.95,
} as const;

/** Press feedback: the scale a pressed control dips to. */
export const press = { scale: 0.95 } as const;

/** When scroll-triggered things start. */
export const view = {
  /** An element enters when its top reaches this line of the viewport. */
  start: "top 88%",
  /** A demo starts once the middle of its panel is 75% of the way down the viewport, so most of it is on screen first. */
  demoStart: "center 75%",
} as const;

/** Lenis smooth-scroll feel. */
/** Scroll-linked scenes on touch screens (Lenis does not smooth touch): seconds the shown progress takes to catch up with the finger. */
export const scrubSmooth = { touch: 0.2 } as const;

export const smoothScroll = {
  /** 0-1: lower = heavier glide. */
  lerp: 0.085,
  wheelMultiplier: 1,
} as const;
