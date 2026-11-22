import type { TL } from "./demo-kit";
import type { PhoneColors } from "./phone-motion";

/*
 * "Your gym, your brand": no in-app motion for now. The phone shows the gym's branded home, still, until the new motion is
 * decided. (The earlier five-step scene, with the brand form, booking, plan, wallet top-up and QR check-in, is in git history:
 * `git log -- src/components/features/brand-motion.ts`.)
 */

type Q = { one: <T extends HTMLElement>(sel: string) => T; all: <T extends HTMLElement>(sel: string) => T[] };

export function buildBrand(_tl: TL, _stage: HTMLElement, _c: PhoneColors, _q: Q) {}
