# 0064 New clay illustrations for the four benefit cards (2026-11-26)

The four 3D clay renders supplied (QR check-in with a dumbbell, a zip wallet with a card and coins, a calendar with three figures, a growth chart with a ring) are now the benefit cards' art, in the order of the cards: Check members in, Take payment any way, See who's coming, Know your numbers.
- Converted to WebP at 1400 x 1050, quality 82 (34-42 KB each): `public/illustrations/benefit-{checkin,payment,roster,numbers}.webp`.
- The renders came on a lavender backdrop, which is now removed: each is a transparent-background WebP (alpha), 76-82 KB. The clay objects are cut out; the soft floor shadow is kept but redrawn as a transparent violet shadow so it sits on the card colour. They sit straight on the card (no tile, no blend trick); Next.js serves them responsively.
- The four older white-background illustrations (`checkin`, `payment`, `roster`, `control`) are removed; `checkin-clear.webp` (support hub) is untouched.

## Replaced with the Figma cut-outs (2026-11-26)
My own automatic background removal left soft smudges, so the four illustrations now come from the "Website" page of the "Bizqwik Launch Visuals" Figma file (the four "Generated Image" frames): the transparent-background versions stored in the file, exported at their native 1280 x 960 and saved as WebP with alpha (64-74 KB each). There is no floor shadow in these; the objects sit directly on the card.

Quality (2026-11-26): the first export used WebP quality 88, and the Next.js image optimizer then re-encoded at its default 75 (the PNGs in Figma are 730-920 KB). The files are now WebP quality 95 with lossless alpha (110-133 KB each), served as they are (`unoptimized`), so there is no second compression.
