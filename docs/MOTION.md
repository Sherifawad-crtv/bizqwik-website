# Motion system

One motion language for the whole site, taken from the reference landing page (link.com) and
enforced in code. If you are adding or editing anything that moves, start here.

**Source of truth:** `src/motion/tokens.ts` (values) and `src/motion/primitives.ts` (behaviour).
**Live reference:** `/foundation`, "Motion" section. **Guard:** `npm run check:motion`.

## 1. What the reference actually does (measured 2026-11-11)

Method: page CSS and JS read directly, plus frame-by-frame video of the load and a full scroll at 1280 and 1440 wide.
It is built on the Motion (Framer) library with hand-written sequences.

| Finding | Measured |
|---|---|
| Page load | No entrance animation on text, nav or headings. Static content is simply there. All motion lives in the product demos. |
| Workhorse ease | `cubic-bezier(.4, 0, .1, 1)`, used for every UI move, swap and card growth |
| Entrance ease | `cubic-bezier(.19, .1, .22, 1)`, 0.5s, from `y` offset, `scale .95`, `opacity 0` |
| Press / pop ease | Motion's `backOut`, `cubic-bezier(.33, 1.53, .69, .99)`; nav uses springs (stiffness 500, damping 25) |
| Duration ladder | 0.1 (hover colour), 0.2-0.25, 0.4, 0.45, 0.5, 0.6, 0.75 (an object arriving), 1.2, 2.4 (a long cycle) |
| Hover | Colour and background 0.1s ease-in-out; nav 0.15-0.2s linear; button corners animate radius over 0.25-0.3s |
| Press | `scale [1, .95, 1]` over 0.4s |
| Demos | Scripted sequences: steps placed with "at the same time as previous" (`<`), "+0.1 after", delays of 0.4-0.5. Played **once** when scrolled into view, then hold; a **Replay** pill restarts them. A loader spins at 0.5s per turn. |
| Scroll | Native scroll. Only CSS `position: sticky` (titles stick at 96px), plus a closing statement that brightens as you scroll. No pinning, no scroll-jacking. |
| Demo choreography | A logo pill morphs into the card (scale 0 to 1, 0.75s), a list of merchants cycles like a slot machine, the button dips to 0.95, the card grows (0.6s), fields slide in with 0.5s delays. |

## 2. Our tokens (`src/motion/tokens.ts`)

| Token | Value | Use |
|---|---|---|
| `ease.standard` | `cubic-bezier(.4, 0, .1, 1)` | moves, state swaps, card growth, counters |
| `ease.enter` | `cubic-bezier(.19, .1, .22, 1)` | everything that arrives |
| `ease.spring` | `cubic-bezier(.33, 1.53, .69, .99)` | press release, small pops |
| `ease.linear` | `none` | spinners, scan lines |
| `ease.scrub.*` | power2/power3 | scroll-linked timelines only (hero, navbar) |
| `duration.instant` | 0.1s | hover colour |
| `duration.fast` | 0.25s | small fades and swaps |
| `duration.base` | 0.4s | default UI move |
| `duration.enter` | 0.5s | entrances |
| `duration.slow` | 0.6s | card growth, big swaps |
| `duration.scene` | 0.75s | a whole object arriving |
| `duration.count` | 1.2s | numbers counting, scan lines travelling |
| `duration.spin` | 0.5s | one spinner turn |
| `stagger.tight / base / loose` | 0.04 / 0.08 / 0.14 | siblings |
| `gap.beat` | 0.1s | "just after" the previous step |
| `enterFrom` | `y 12`, `scale .95` | where entrances start |
| `press.scale` | 0.95 | pressed controls |

CSS twins live in `styles/tokens.css` (`--ease-*`, `--dur-*`); use them from Tailwind as
`duration-(--dur-fast) ease-standard`. `check:motion` fails if the twins drift from the TS values.

## 3. The kit (`src/motion/primitives.ts`)

| Primitive | What it does | Use it for |
|---|---|---|
| `data-reveal` attribute | Element is hidden until it scrolls to `view.start`, then enters (rise 12px, grow from 95%, fade, `enter` ease). Elements entering together stagger by 0.08s. Handled by `<Motion />` in the layout. | any card, panel, block. No JS in the component. |
| `enter(targets, vars?)` | The same entrance, on demand | something that appears after an action |
| `playOnView(trigger, play)` + `replay(tl)` | A paused demo timeline plays once when scrolled to, holds its last frame, restarts on Replay | every scripted demo |
| `<ReplayButton />` (`components/ui`) | The Replay pill (`data-replay`) | the corner of every demo panel |
| `swapIn(targets)` | Content changing inside a stable frame: fade and rise, no scale | tab copy, a list changing |
| `pressFeedback(el)` | 1 to 0.95 to 1 | a control that was pressed in JS |
| `scrubWords(el)` | Statement brightens word by word with scroll | closing statements |
| `sticky` (CSS) | `position: sticky; top: 96px`, no JS | stacking section titles |

## 4. Rules

1. **No raw eases or durations in components.** Import from `@/motion/tokens`. Opt out only with a trailing `// motion-ok: reason`.
2. **Static content does not animate on load.** Headings, body text, nav: no entrance. Motion belongs to products, cards and panels.
3. **Demos play once and hold.** Never loop a demo on a page the visitor is reading. Provide Replay.
4. **Hover is colour at `duration.instant`/`fast`.** Press is `press.scale`.
5. **One entrance.** Use `data-reveal` or `enter()`. Do not invent a new entrance curve.
6. **Positions in a timeline are choreography, not tokens.** Place steps with `gap.beat` after the previous one, or at explicit seconds. Their lengths are tokens.
7. **Reduced motion:** nothing plays; every demo shows its final state, reveals show at once. `check:motion` does not test this; test it when you add a demo (`showFinal` in `ecosystem-motion.ts`).
8. **Measure layout inside the timeline, not outside.** Use function values (`x: () => ...`). Never rely on a width read while a panel is hidden. State both ends of a tween that animates a measured property.

## 5. Exceptions (documented, deliberate)

| Where | Why |
|---|---|
| `hero-motion.ts`, `nav/motion.ts` | Scroll-scrubbed timelines. Their durations are positions on the scroll timeline, not seconds, so `check:motion` skips the duration rule there. Their eases come from `ease.scrub.*`. |
| Lenis smooth scroll | The reference uses native scroll. We keep Lenis (original brief). `smoothScroll.lerp` is a token. Open question for phase 3. |
| Pinned hero | Our signature moment; the reference has none. Kept until the phase 3 decision. |

## 7. The scroll-scrubbed statement (read from the reference's source, 2026-11-11)

The dark section below the hero is the reference's signature scroll moment, and ours now works the same way
(`components/sections/StatementSection.tsx`, `statement-motion.ts`).

**Scroll (scrubbed, linear, no easing).** Progress is 0 when the box's top reaches the bottom of the viewport and 1 when its bottom does
(`scrubRange()` in the kit). `c` = progress mapped from [0.4, 1] to [0, 1] (phones: [0.35, 0.8]). Then:

| Thing | Value at c = 0 | Value at c = 1 |
|---|---|---|
| Box shape | `clip-path: inset(0 calc(50% - 223px) calc(100% - 224px) round 112px)`: a 446 x 224 pill at the top | `inset(0 round 40px)`: the full box |
| Box corner radius | 112px, holds until c = 0.8 | 40px (the reference ends at 8px) |
| Headline + list container | `translateY(-250px) scale(.6) opacity 0` | identity |
| Logo tile (100px) | `translateY(-250px)`, inside the pill | `translateY(0)`, centre of the box (tablet -160, phone -100) |

Phones: pill half-width 140 and height 140, box 620px tall, centred stack (headline, logo, list). Box is 720px tall on desktop.

**Time (the pills keep moving).** Twelve pills on an arc through eleven slots (`slot = (index + current) % count`, slots 10 and above wrap to 0 and hide).
- Per slot: scale `.5 .6 .7 .8 .9 1 .9 .8 .7 .6 .5`; opacity `0 0 .3 .4 .6 1 .6 .4 .3 0 0`; y `-460 ... 460` (phones `-300 ... 300`);
  x = `|slot/11 - 5/11| ^ 1.6 x 1500 + 60` (the arc; phones: centred).
- The centre slot (5) is highlighted (white at 12%). A pill wrapping to the far end jumps; the others glide (the reference uses a
  spring, stiffness 150 and damping 35, overdamped; we use `duration.scene` with `ease.enter`).
- The list drifts: velocity starts at 3, eases to an idle 0.4 (px per frame at 60fps, friction .3), and the slot advances every 90px of travel,
  so it spins fast for about a second, then advances one slot every few seconds. Runs only while the section is on screen.
- Reduced motion: the finished box, the list at rest, no ticker.

Reuse: `scrubRange(el, apply)` and `mapRange(v, [a,b], [c,d])` in `motion/primitives.ts` give any section this behaviour.

## 6. Recipe: adding a new animated thing

- A card or block that should enter on scroll: add `data-reveal`. Done.
- A scripted product demo: build a paused timeline with `tl.fromTo(...)` steps (state both ends), wrap it with `playOnView` and `replay`, add `<ReplayButton />`, write its reduced-motion final state. See `ecosystem-motion.ts`.
- A section that transforms as you scroll through it: `scrubRange()` + `mapRange()` (see section 7). No easing: it is linear on purpose.
- A hover or press state: Tailwind with `duration-(--dur-fast) ease-standard`, `active:scale-95`.
- A new duration or ease: do not. Pick the nearest rung. If the ladder truly lacks one, add it to `tokens.ts` and `tokens.css`, update this file, log it in `docs/progress/`.
