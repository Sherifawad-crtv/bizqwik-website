# 0047 Support hub illustration: no white box on iPhone
- Cause: the hub image relied on `mix-blend-multiply` to melt its white into the card. Inside the scrolling card, iOS Safari did not blend it, so a white rectangle showed (seen in the owner's screenshot).
- Fix: `public/illustrations/checkin-clear.webp`, the same render with its white turned into transparency (alpha from darkness, colour un-multiplied; composited over the card colour it differs from the multiply result by 0.3 levels on average, 6.7 at worst). The hub uses it with no blend mode, so it cannot fail in any browser.
- Not changed: the four landing cards still use `mix-blend-multiply` (they are in the normal page, where it works). If they ever show a white box on a device, make `-clear` versions of the other three with the same script.
- Chromium cannot reproduce the iOS bug; the fix removes the dependency instead.
