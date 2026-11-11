# 0046 Feature demos start when you arrive at them
- Cause: a demo started when its panel's top edge crossed 75% of the viewport, so only a sliver was on screen and the first beats played unseen.
- Change: `view.demoStart` is now `"center 75%"` (`src/motion/tokens.ts`): the demo starts once the middle of its panel is 75% of the way down the screen, so most of the panel is already visible. Still plays once, holds its finished frame, Replay as before.
- Measured at 1440x900 and 390x844 by scrolling up in 15px steps from below the fold: the first visible change happens when 650-670px (1440) or all 496px (390) of the panel is on screen.
