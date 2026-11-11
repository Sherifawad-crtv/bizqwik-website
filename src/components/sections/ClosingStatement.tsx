"use client";

import { useEffect, useRef } from "react";
import { scrubWords } from "@/motion/primitives";

/** The closing statement. It brightens word by word as you scroll (docs/MOTION.md `scrubWords`); reduced motion shows it lit. */
export function ClosingStatement({ children }: { children: string }) {
  const el = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    const node = el.current;
    return node ? scrubWords(node, { from: 0.25 }) : undefined;
  }, []);
  return (
    <p ref={el} className="max-w-[1100px] text-[clamp(2rem,1rem+3.6vw,4.25rem)] font-extrabold leading-[1.04] tracking-[-.035em] text-balance">
      {children}
    </p>
  );
}
