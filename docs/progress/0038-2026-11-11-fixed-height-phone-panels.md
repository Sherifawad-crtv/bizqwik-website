# 0038 Fixed-height feature panels on phones
- Problem: on phones the panel grew with its demo, so the four frames differed in height (the reference keeps one size).
- Change: panel aspect 480/650 under 901px; the demo is laid out at 480px and scaled to fit. Pointer maths corrected for scale.
- Result at 360/390/440 wide: all four panels equal height (455/496/563px), no sideways scroll.
