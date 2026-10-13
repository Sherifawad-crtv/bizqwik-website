# Design system

Source of truth in code: `src/styles/tokens.css`. Live preview: `/foundation`.
Origin: app repo `Sherifawad-crtv/bizqwik` (`src/index.css`) + brief §3.

## Principles
Warm, friendly, approachable; never an enterprise admin panel. Group with space
and soft elevation, not hard borders. No cards inside cards. No pure white.
Violet is used sparingly: key numbers, the Grow card, primary actions, icons.

## Colour
| Token (Tailwind) | Hex | Use |
|---|---|---|
| `paper` | #F3F2EE | Page background |
| `surface` | #FBFAF7 | Cards |
| `sunken` | #ECEBE5 | Wells, tags, selector |
| `line` | #E3E1DA | Hairlines |
| `ink` | #1A1726 | Main text |
| `ink-muted` | #6C687A | Secondary text |
| `ink-faint` | #9A96A6 | Decoration only (2.6:1) |
| `primary` | #5A41FF | Key numbers, actions, Grow |
| `primary-pressed` | #4832D6 | Hover/pressed, small violet text |
| `primary-tint` | rgb(90 65 255 / .10) | Icon tiles, soft containers |
| `primary-light` / `primary-dark` | #A193FF / #2E1F99 | Accent shades (aesthetics only) |
| `amber-fg/bg` | #946200 / #F6E7C4 | "Scale plan only" tags |
| `green-fg/bg` | #177A4B / #D8EFE0 | Included ticks |
| `danger-fg/bg` | #B23A3A / #F6DEDC | Errors (from app, not in brief) |

Gradients (CSS vars): `--gradient-mark` (emblem only), `--gradient-grow`
(Grow card only), `--wash-violet` (5–7% section wash).
Text on violet is white (5.8:1). Small violet text uses `primary-pressed`.

## Type
- **Urbanist** (500/600/700/800): everything except labels. Headlines 800,
  tracking −2% to −3.5%. Numbers 800 + `tabular`.
- **Space Mono** (400/700): small uppercase labels, units, captions, eyebrows.
  Never sentences or buttons.
- Fluid scale (desktop → mobile): `text-h1` 104→44, `text-h2` 96→36,
  `text-h3` 34→22, `text-body` 26→17, `text-label` 16→12.

## Shape and elevation
Radius: `tile` 16, `input` 20, `button` 24, `card` 28, `card-lg` 32; pills round.
Shadows: `shadow-card` (default), `shadow-float` (sticky nav, call button),
`shadow-glow` (Grow card only).

## Layout
Content max `max-w-page` (1280). Section padding 120px desktop / 72px mobile.
Breakpoints: 768 (`sm`), 1024 (`lg`, real layout swap), 1280 (`xl`).
Gutters 16–20px mobile, 28–32px desktop. Touch targets >= 44px.

## Motion (defaults from brief §3.8, pending direction)
`--ease-out`, `--duration-reveal` 350ms, `--reveal-distance` 16px,
`--stagger` 60ms. Everything respects `prefers-reduced-motion`.

## Assets
`public/brand/wordmark.png`, `public/brand/mark.png`: use as supplied, light
backgrounds only, never recolour or stretch. Fonts: `src/assets/fonts/`.
