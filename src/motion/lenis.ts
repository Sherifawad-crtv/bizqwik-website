import type Lenis from "lenis";

/** Shared handle on the running Lenis instance (null when reduced motion or not mounted). */
let instance: Lenis | null = null;

export const setLenis = (next: Lenis | null) => {
  instance = next;
};
export const getLenis = () => instance;
