"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";

/*
 * One place that registers GSAP plugins. Import `gsap`, `ScrollTrigger`
 * and `SplitText` from here, never from "gsap" directly, so registration
 * is guaranteed and plugin additions stay in one file.
 */
gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase);
// The named eases in motion/tokens.ts (reference landing page curves, see docs/MOTION.md).
CustomEase.create("bq-standard", ".4,0,.1,1");
CustomEase.create("bq-enter", ".19,.1,.22,1");
CustomEase.create("bq-spring", ".33,1.53,.69,.99");
// Mobile browser chrome showing/hiding must not re-layout pinned sections.
ScrollTrigger.config({ ignoreMobileResize: true });

export { gsap, ScrollTrigger, SplitText };
