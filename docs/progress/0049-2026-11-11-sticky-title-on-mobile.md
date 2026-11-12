# 0049 Mobile: the title and headline stay while the panel is on screen
- Before: under 901px the text sat above its panel and scrolled away (and faded out) while the panel was still on screen.
- Now: under 901px the row is a flex column and the text wrapper is `display: contents`, so the title and headline (`data-head`) are `sticky` at 80px (just under the floating bar) with an opaque paper background. They stay for as long as the row is on screen; the bullets and the panel scroll beneath them; they leave with the row. Only the title and headline stick, because with the bullets the block was about 420px of an 844px screen.
- The fade in/out of the text block now runs on desktop only (stacked layouts always show it).
- Also fixed on 641-900px widths: the scaled demo sat at the top-left of a very tall panel. The panel height is now `650px * scale` and the demo is centred (`--s` still comes from the panel width, capped at 1).
- Checked at 390, 768 and 1440: the head stays at 80px while the panel is on screen and leaves with its row; desktop unchanged; panel heights equal at 360/390/440.

## Update: only the title sticks, with a fade
The owner found the sticky title and headline block heavy and glitchy on a phone (a hard edge cut the panel and text under it). Now only the divider and title stick (about 74px, top 80px) and the headline joins the bullets that scroll away. The sticky block fades out over its last 16px (`mask-image`), so content passes under it softly instead of being cut. Desktop unchanged.
