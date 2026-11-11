# 0045 Support centre and policy pages
Needed for the payment-gateway review, written as Bizqwik's own pages (no gateway named).
- Routes: `/support` (hub), `/about`, `/contact`, `/privacy`, `/refund-policy` (Refund & Cancellation), `/delivery` (Delivery & Shipping). Static, linked from the landing footer and from each other.
- Style follows support.link.com (read with a browser): slim top bar (mark + "Support", pill action), one large rounded bordered card, two-tone greeting with pill links, icon tiles for articles, narrow 680px reading column, accent breadcrumb, hairline-divided sections. Our tokens: paper and surface, violet accents, Urbanist, our 3D check-in illustration on the hub.
- Structure: route groups. `(site)` holds the landing page, `/foundation` and the floating nav; `(support)` has its own shell (`components/support/SupportShell.tsx`, `parts.tsx`). Copy lives in `src/content/support.ts`; business address and map link in `content/site.ts` (`business`).
- Privacy content was checked against the product repo: staff (name, email, role, photo), clients (name, optional age, phone, email, optional conditions note visible to coach and heads), memberships, bookings, QR check-ins, wallet and points, payment records by method (no card numbers), InstaPay receipt images (private, short-lived links), push addresses, branding; analytics and error reporting off until configured, no names, emails or phones sent, no autocapture, replay masks text; per-business isolation.
- Refund & Cancellation: B2B, handled by contacting support and settled case by case in writing; no automatic refunds; gym-to-client payments are the gym's own. No time limits are stated because none were given.
- Delivery: digital, set up with our team, native app per store review times, on-site work agreed in advance, nothing shipped.
- Footer links added; Organization data now includes the address (16 Hassan Mazhar, Heliopolis, Cairo, Egypt).
- Not legal advice: the owner should have a lawyer read Privacy and Refund before launch. A Terms page is not built (not requested).
- Environment: hosts `support.link.com` and `a300.stripecdn.com` added to the "Open" environment to read the reference.
