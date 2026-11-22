# 0061 Nav active state and secondary button stroke (2026-11-22)

- Secondary (white) buttons get a small 1px stroke (`border-ink/10`), same height.
- The desktop nav's selected tab keeps its original look (white pill, dark text) but loses its shadow, and the blue dot is removed. (An earlier version of this change also recoloured it violet; that was not asked for and is reverted.)

## Nav label (2026-11-22)
The first nav link now reads "Features" instead of "The apps" (same #apps anchor).
The mobile menu shares the same links (so it already reads Features), and its two white contact tiles (Phone, Email) get the same small stroke as the secondary buttons.

## One nav button and matching mobile styling (2026-11-22)
- The navbar has one button, "Contact sales" (`cta.nav` in site.ts), on the desktop bar and in the mobile menu. The Phone and Email tiles are removed from the mobile menu; the button is full width there. The page's other CTAs ("Talk to us", "See plans") are unchanged.
- The mobile bar, menu button and menu sheet now use the desktop pill's styling: light frosted glass (72% surface, soft blur), no shadow, no stroke.

## Same CTA effects on touch and desktop (2026-11-22)
Hover styles do not run on touch screens, so phones got no corner or colour feedback. The `Button` now has the same effects while pressed (`active:`): corners ease to the full pill, the colour darkens (primary) or takes `sunken` (secondary), plus the existing scale dip. Checked at 1440 (rest 20px, hover and pressed 28px) and on a touch viewport at 390 (rest 20px, pressed 28px, darker). The desktop nav links and the mobile menu links also get a press dip, and the mobile menu links a soft white fill on hover and press.

Fix (2026-11-22): the corner morph while pressed felt odd on phones (the corners animate slowly, so a tap makes the button wobble and settle after release). Pressed on touch is now the colour change and the scale dip only; the corner morph is hover-only (hover devices). Buttons and summaries also lose the grey tap flash (links already did).

Revert (2026-11-22): mobile should behave exactly like desktop, so the pressed state is back to the hover look (corners ease to the full pill with the same transition, same darker colour, scale dip). The grey tap flash stays removed.

Update (2026-11-22): no scale dip on touch. The press scale on CTAs, nav links, the menu button and the Replay pill now applies only to mouse-like pointers (`pointer-fine:`); on a phone a press keeps the corner morph and the darker colour but the button no longer shrinks. Checked: pressed scale is 0.95 on desktop and none on a touch viewport.
