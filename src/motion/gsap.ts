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

export { gsap, ScrollTrigger, SplitText };
