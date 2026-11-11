# 0042 Phase 8: closing, footer, SEO
- `ClosingStatement` (client): the statement brightens word by word as it scrolls (`scrubWords`), larger type; reduced motion shows it lit.
- Three CTA cards unchanged. Footer rebuilt: white wordmark and tagline, Explore links, Contact (phone, email), copyright and the VAT line. No address yet (not invented).
- SEO: Open Graph and Twitter metadata, `app/opengraph-image.tsx` (wordmark + tagline on paper, 1200x630), Organization JSON-LD (name, email, phone, Egypt; add `address` once confirmed).
- Left as is: `robots: noindex` in `layout.tsx` (foundation stage). Flip it when the site goes public.
- Still to do: About, Contact page, Privacy, Refund & Cancellation, Delivery pages and their footer links (needs owner facts).

## Share image replaced
The generated share image was replaced with the product repo's `public/og-image.png` (1200x630, wordmark, hand-held phone, "Community Management Operating System"), saved as `src/app/opengraph-image.png` and `src/app/twitter-image.png` (Next serves both and writes the meta tags). `metadataBase` comes from `VERCEL_PROJECT_PRODUCTION_URL` on Vercel; replace it with the real domain once chosen. The image's line differs from the site tagline ("One ecosystem. Your whole community."); owner to decide if that is fine.
