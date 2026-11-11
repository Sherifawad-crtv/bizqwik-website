# 0041 Desktop navbar: slight glass
- Desktop pill and logo tile: a white-to-clear gradient (62% to 28%), `backdrop-blur-2xl`, saturation 2, top highlight, light inner edge and a faint ring. Content scrolling behind now shows blurred through it (checked over the dark section and the card illustrations).
- Mobile bar and menu unchanged. Checked over the paper, the phone hero and the dark section at 1440.

## Root cause of "no glass" (fixed)
The desktop bar wrapper reset its blur with `lg:backdrop-blur-none`, but its `backdrop-saturate-150` stayed, so the wrapper still had a `backdrop-filter`. A parent with a backdrop-filter becomes a "backdrop root": the glass pill inside could only blur the wrapper's own (empty) content, never the page. The wrapper now uses `lg:[backdrop-filter:none]`. Verified with a striped test layer under the pill: the stripes now blur through it.
