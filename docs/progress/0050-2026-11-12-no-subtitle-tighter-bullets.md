# 0050 Feature rows: no subtitle, tighter bullets
- The line under each feature title (the headline) is removed from the page. The strings stay in `content/features.ts` (`headline`) in case they are wanted again.
- The gap from title to first bullet is 20px on desktop and phones (it was a title, a 12px gap, a headline, then 24px; on phones the flex gap added 16px more). The first bullet's extra top padding is removed.
