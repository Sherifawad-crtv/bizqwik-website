/**
 * Motion guard. Run: npm run check:motion   (Node strips the types, no extra dependency)
 *
 * 1. The CSS twins in styles/tokens.css (--ease-*, --dur-*) must equal motion/tokens.ts.
 * 2. No feature file may write a raw GSAP ease string or a raw numeric tween duration:
 *    they come from motion/tokens.ts. Scrub-timeline files (hero, navbar) are exempt from
 *    the duration rule because their durations are timeline positions, not seconds.
 *    A line can opt out with a trailing `// motion-ok: reason`.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { duration, ease } from "../src/motion/tokens.ts";

const errors: string[] = [];

// 1. CSS twins
const css = readFileSync("src/styles/tokens.css", "utf8");
const cssVar = (name: string) => css.match(new RegExp(`${name}:\\s*([^;]+);`))?.[1].trim();
const gsapSrc = readFileSync("src/motion/gsap.ts", "utf8");
const gsapBezier = (name: string) => gsapSrc.match(new RegExp(`CustomEase\\.create\\("${name}", "([^"]+)"\\)`))?.[1];
for (const [token, cssName] of [["bq-standard", "--ease-standard"], ["bq-enter", "--ease-enter"], ["bq-spring", "--ease-spring"]] as const) {
  const g = gsapBezier(token);
  const c = cssVar(cssName)?.match(/cubic-bezier\(([^)]+)\)/)?.[1];
  const norm = (s?: string) => (s ? s.split(",").map((n) => Number(n.trim())).join(",") : "missing");
  if (norm(g) !== norm(c)) errors.push(`${cssName} (${c}) does not match ${token} in motion/gsap.ts (${g})`);
}
for (const k of ["instant", "fast", "base", "enter", "slow", "scene"] as const) {
  const v = cssVar(`--dur-${k}`);
  if (v !== `${Math.round(duration[k] * 1000)}ms`) errors.push(`--dur-${k} (${v}) does not match duration.${k} (${duration[k]}s)`);
}
if (ease.standard !== "bq-standard") errors.push("ease.standard must be bq-standard");

// 2. raw eases / durations
const walk = (dir: string): string[] =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : /\.(ts|tsx)$/.test(p) ? [p] : [];
  });
const SCRUB_FILES = ["src/components/hero/hero-motion.ts", "src/components/nav/motion.ts"];
for (const file of walk("src").filter((f) => !f.startsWith("src/motion/"))) {
  const scrub = SCRUB_FILES.includes(file);
  readFileSync(file, "utf8").split("\n").forEach((line, i) => {
    if (line.includes("motion-ok")) return;
    if (/ease:\s*"/.test(line)) errors.push(`${file}:${i + 1} raw ease string, use ease.* from @/motion/tokens`);
    if (!scrub && /duration:\s*\d/.test(line)) errors.push(`${file}:${i + 1} raw duration, use duration.* from @/motion/tokens`);
    if (/\bduration-\d+\b/.test(line)) errors.push(`${file}:${i + 1} Tailwind duration-NNN, use duration-(--dur-*)`);
  });
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log("Motion check passed.");
