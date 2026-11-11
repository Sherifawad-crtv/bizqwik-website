# Brief: two 3D illustrations for the Bizqwik landing page (Weave)

You are creating images in the Figma Weave app (app.weavy.ai, Sherif Awad's Workspace). Two of four illustrations already exist. **Make the other two so all four look like one set.** Read the whole file first.

## 1. Context

Bizqwik is a SaaS for gyms, studios and clubs in Egypt. The landing page has a section of four outlined cards. Each card shows one 3D illustration, like the reference site link.com (glossy glass and smooth plastic objects, soft studio lighting, a small floating cluster). Ours use **violet** instead of their green.

| # | Card | Status | File name |
|---|------|--------|-----------|
| 1 | Check clients in fast | DONE (glass QR slab, check badge, dumbbell) | `checkin` |
| 2 | Take payment your way | DONE (violet zip wallet, glass card, coins) | `payment` |
| 3 | Know who is coming | **TO MAKE**: calendar + figures | `roster` |
| 4 | Stay in control | **TO MAKE**: dashboard bars + ring | `control` |

The two finished renders are attached to this brief (images 1 and 2). **Use them as references in every new generation** so material, lighting, angle, scale and colour match.

## 2. Settings (use exactly these)

- Model: **Nano Banana Pro** (`fal-ai/nano-banana-pro/edit`)
- Resolution: **2K**
- Aspect ratio: **4:3**
- Reference images: attach the two finished renders (and optionally the two link.com style references in section 6)
- Run once per image. Cost is about 11 credits each (the workspace has 128).

## 3. Style bible (all four illustrations obey this)

- **Look:** premium Apple-style 3D render. Frosted translucent glass with soft refraction and subtle iridescent edges, smooth matte plastic, a few small floating objects.
- **Camera:** isometric three-quarter view, slightly from above, same angle as the finished renders.
- **Composition:** one centred cluster with generous empty margin on all sides (about 12% of the frame). Nothing cropped by the frame.
- **Palette:** vivid violet `#5A41FF` is the hero colour. Light lavender glass, white, silver-lavender for metal (coins). A tiny soft-green accent is allowed **only** on a check mark.
- **Lighting:** soft studio light from the upper left, gentle contact shadow under the objects.
- **Background:** **pure flat white `#FFFFFF`**, even from corner to corner. No gradient, no vignette, no floor line, no coloured tint. (The payment render came out very slightly grey-lavender at the edges; avoid that.) The website blends the white into an off-white card, so any tint shows as a box.
- **Never include:** text, letters, numbers, logos, brand symbols, people, faces, hands.

## 4. Image 3: `roster` (card "Know who is coming")

Meaning: clients book classes and the front desk sees who is coming.

Prompt (paste as is):

```
Use the reference images only as a guide to the rendering quality and style: glossy frosted glass and smooth plastic materials, soft studio lighting, a floating cluster of 3D objects, the same camera angle and soft ground shadow. Create a NEW original 3D illustration with different objects: a glass desk calendar standing upright with a grid of small rounded squares and one square highlighted in violet, a glossy round violet badge with a white check mark overlapping its top-right corner, and in front of it three small smooth abstract figure tokens (a sphere on a round base, no faces) in violet, lavender and white. Colour palette: vivid violet #5A41FF as the hero colour, light lavender glass, white, a tiny soft-green accent only on the check mark outline. Premium Apple-style 3D render, high detail, subtle iridescent glass edges, centred composition with generous empty margin. Pure flat white background (#FFFFFF), even from corner to corner, no gradient, no floor line. No text, no letters, no numbers, no logos, no brand symbols, no people, no faces.
```

## 5. Image 4: `control` (card "Stay in control")

Meaning: the owner sees revenue, profit, payouts and subscribers in one dashboard.

Prompt (paste as is):

```
Use the reference images only as a guide to the rendering quality and style: glossy frosted glass and smooth plastic materials, soft studio lighting, a floating cluster of 3D objects, the same camera angle and soft ground shadow. Create a NEW original 3D illustration with different objects: a thick glass base slab with four chunky 3D bars rising from it in increasing height (the tallest in vivid violet, the others lavender), a translucent glass ring orbiting around the bars, a small silver-lavender coin floating beside the tallest bar, and a small glass tile floating at the side showing a simple upward line graph icon. Colour palette: vivid violet #5A41FF as the hero colour, light lavender glass, white, silver. Premium Apple-style 3D render, high detail, subtle iridescent glass edges, centred composition with generous empty margin. Pure flat white background (#FFFFFF), even from corner to corner, no gradient, no floor line. No text, no letters, no numbers, no logos, no brand symbols, no people, no faces.
```

## 6. Optional style references (public images from link.com)

Use as quality references only. Do not copy their objects, their logo or their green.

- https://images.stripeassets.com/45lcs49p4zxt/7x5gVBL0wQwgPcHnbdgNDg/2df8af90447b8d6e5c2516f8a48dc9a9/shop-with-confidence.png
- https://images.stripeassets.com/45lcs49p4zxt/1lvL07HUdHeehVjdwPWODK/c4f5718486a3779592fb983e7f761825/stay-in-control.png

## 7. The prompts that made the two finished renders (for consistency)

`checkin`: glass QR-code slab standing upright with a stylised QR pattern, a glossy round violet badge with a white check mark floating beside it, a smooth violet dumbbell resting in front, one small glass tile with a person silhouette icon floating behind.

`payment`: a chunky violet zip wallet standing upright with a matte finish and a white zipper, a glass bank card leaning against it with a small chip, a short stack of silver-lavender coins beside it, one small glass bubble floating above showing a banknote icon.

## 8. Check each result before keeping it

- [ ] Same camera angle, material finish and violet as images 1 and 2
- [ ] Whole cluster visible, nothing touches the frame edge
- [ ] Background is pure white all the way to the corners (no tint, no gradient)
- [ ] No text, letters, numbers, logos or faces anywhere
- [ ] The objects match the meaning (calendar and figures; dashboard bars and ring)
- [ ] Sharp at 100% zoom (glass edges clean, no melted shapes, no extra stray objects)

If a result fails, change **one thing** in the prompt (for example "tint-free pure white background" or "move the camera back") and run again. Do not run more than twice per image without asking.

## 9. Delivery

1. Download each result as **PNG** at the largest size offered. Name them `roster.png` and `control.png`.
2. Give both files back to Claude Code in the Bizqwik chat. Claude Code will crop to the subject, level the white to exactly `#FFFFFF`, convert to WebP, and replace the files in `public/illustrations/` (it also redoes `payment` to remove its slight tint).
3. Do not edit, resize or add anything to the images yourself.
