# Decisions

Append-only. One line of context, the decision, and the date.

- **D-001 (2026-10-13) Stack:** Next.js (App Router) + TypeScript + Tailwind v4,
  npm, Vercel. Reason: the landing page grows into auth, dashboard and billing
  in one repo. Route groups will separate `(marketing)` from future `(app)`.
- **D-002 (2026-10-13) Tokens come from the app repo**, cross-checked with the
  brief. The website and product share one visual system.
- **D-003 (2026-10-13) Fonts are self-hosted** (Urbanist, Space Mono), Latin
  subset only (English-only v1). Add subsets when Arabic is decided.
- **D-004 (2026-10-13) Motion libraries deferred.** The brief asks for
  restrained motion (no parallax); the original request was an Awwwards/GSAP
  feel. GSAP + Lenis are not installed until design direction resolves this.
- **D-005 (2026-10-13) Payments provider undecided.** When billing starts, put
  a provider-agnostic `billing/` interface in front of it. Money is computed by
  the backend, never in the UI.
- **D-006 (2026-10-13) Design is code-led,** reviewed on live previews.
