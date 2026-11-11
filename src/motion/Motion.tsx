"use client";

import { useEffect } from "react";
import { revealOnView } from "./primitives";

/**
 * Mount once in the layout. Wires the `data-reveal` convention for everything on the page,
 * so a new component only has to add the attribute to get the site's entrance.
 */
export function Motion() {
  useEffect(() => {
    // Wait two frames so pinned sections (the hero) have added their spacers: reveal start lines are measured after them.
    let stop = () => {};
    const id = requestAnimationFrame(() => requestAnimationFrame(() => (stop = revealOnView(document))));
    return () => {
      cancelAnimationFrame(id);
      stop();
    };
  }, []);
  return null;
}
