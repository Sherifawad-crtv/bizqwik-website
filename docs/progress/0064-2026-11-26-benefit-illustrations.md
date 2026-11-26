# 0064 New clay illustrations for the four benefit cards (2026-11-26)

The four 3D clay renders supplied (QR check-in with a dumbbell, a zip wallet with a card and coins, a calendar with three figures, a growth chart with a ring) are now the benefit cards' art, in the order of the cards: Check members in, Take payment any way, See who's coming, Know your numbers.
- Converted to WebP at 1400 x 1050, quality 82 (34-42 KB each): `public/illustrations/benefit-{checkin,payment,roster,numbers}.webp`.
- The renders sit on their own lavender backdrop, so they show as rounded tiles filling the card (no `mix-blend-multiply` or white-background trick any more); Next.js now serves them responsively.
- The four older white-background illustrations (`checkin`, `payment`, `roster`, `control`) are removed; `checkin-clear.webp` (support hub) is untouched.
