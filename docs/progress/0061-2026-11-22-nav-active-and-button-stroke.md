# 0061 Nav active state and secondary button stroke (2026-11-22)

- Secondary (white) buttons get a small 1px stroke (`border-ink/10`), same height.
- The desktop nav's selected tab keeps its original look (white pill, dark text) but loses its shadow, and the blue dot is removed. (An earlier version of this change also recoloured it violet; that was not asked for and is reverted.)

## Nav label (2026-11-22)
The first nav link now reads "Features" instead of "The apps" (same #apps anchor).
The mobile menu shares the same links (so it already reads Features), and its two white contact tiles (Phone, Email) get the same small stroke as the secondary buttons.

## One nav button and matching mobile styling (2026-11-22)
- The navbar has one button, "Contact sales" (`cta.nav` in site.ts), on the desktop bar and in the mobile menu. The Phone and Email tiles are removed from the mobile menu; the button is full width there. The page's other CTAs ("Talk to us", "See plans") are unchanged.
- The mobile bar, menu button and menu sheet now use the desktop pill's styling: light frosted glass (72% surface, soft blur), no shadow, no stroke.
