# 0040 Statement section: smoother on phones and tablets
- Cause (likely): Lenis does not smooth touch scrolling, and the box/headline/logo were driven by the raw scroll position, so the scene advanced in the steps the thumb scroll arrives in.
- Change: `scrubRange` takes `{ smooth }` (seconds); the shown progress eases toward the real one each frame. The statement uses `scrubSmooth.touch` (0.2s, new token) under 901px; desktop stays exact. `will-change` hints added on the clip box and the animated block.
- Not verified on a real phone: headless Chromium cannot show the feel. If it still looks off, the number to tune is `scrubSmooth.touch` in `src/motion/tokens.ts` (lower = tighter, higher = floatier).
