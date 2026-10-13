"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

/*
 * One place that registers GSAP plugins. Import `gsap`, `ScrollTrigger`
 * and `SplitText` from here, never from "gsap" directly, so registration
 * is guaranteed and plugin additions stay in one file.
 */
gsap.registerPlugin(ScrollTrigger, SplitText);
// Mobile browser chrome showing/hiding must not re-layout pinned sections.
ScrollTrigger.config({ ignoreMobileResize: true });

export { gsap, ScrollTrigger, SplitText };
