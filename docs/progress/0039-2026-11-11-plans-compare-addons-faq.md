# 0039 Phase 7: Plans, Compare, Add-ons, FAQ
- `src/components/plans/`: PlansSection (four equal cards, Grow inverted with its badge, Enterprise shows "Contact us", never a number; the "extra clients never cost more than the next plan" rule and VAT note under them), CompareSection (table from 768px with Grow tinted; one block per plan on phones, no sideways scroll), AddonsSection (grouped outlined cards, no prices), FaqSection (sticky heading left, one answer open at a time, grid-rows open transition on motion tokens, inert when closed).
- All copy comes from `src/content` (plans, addons, faq); `check:content` still passes. Removed `Shells.tsx`.
- Seven Solar icons added to `ui/Icon.tsx`.
- Checked at 1440, 1024 and 390: no sideways scroll, no console errors.
- Open: plan CTAs all go to "Talk to us" (#contact); there is no checkout yet.

## Update: Compare and Add-ons hidden
Owner asked to keep only Plans and FAQ on the page. `CompareSection` and `AddonsSection` (and their content) stay in the repo but are not rendered. The "Add-ons" nav link and the FAQ's "See add-ons" link are removed so no anchor dead-ends. To bring them back: render them in `app/page.tsx` and restore those two links.
