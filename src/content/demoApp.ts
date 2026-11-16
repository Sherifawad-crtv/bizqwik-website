/**
 * ILLUSTRATIVE demo data for the founder-home mockup in the hero.
 * Not real customers or revenue. Open item (brief GAP 7): replace with
 * approved demo content before launch. Figures are internally consistent:
 * profit = revenue - payouts, deltas are vs the previous month. Mirrors the dev branch's founder Overview (routes/Oversight.tsx).
 */
export const founderDemo = {
  greeting: "Hi, Karim",
  avatar: "/demo/founder-photo.webp", // square 256px WebP: avatar (64pt) and the polaroid
  ranges: ["MONTH", "3M", "6M", "12M"],
  activeRange: "MONTH",
  caption: "OCT 2026",
  /** The founder's overview: four equal tiles (the department head has no big revenue card). Same order as the app. */
  kpis: [
    { id: "profit", label: "PROFIT", icon: "chart-square", value: "365,700", delta: "▲ 16.5%", tone: "good" },
    { id: "revenue", label: "REVENUE", icon: "wallet", value: 587400, delta: "▲ 16.1%", tone: "good" },
    { id: "subscribers", label: "ACTIVE SUBSCRIBERS", icon: "users-group-rounded", value: "214" },
    { id: "payouts", label: "COACH PAYOUTS", icon: "banknote", value: "221,700", delta: "▲ 15.3%", tone: "neutral" },
  ],
  chart: {
    title: "REVENUE VS COACH PAYOUTS",
    sub: "MAY – OCT 2026 · BY MONTH · EGP",
    months: ["MAY", "JUN", "JUL", "AUG", "SEP", "OCT"],
    revenue: [312400, 348900, 371200, 429800, 506100, 587400],
    payouts: [118600, 131200, 140800, 163900, 192300, 221700],
  },
  sources: { title: "WHERE THE MONEY CAME FROM", sub: "OCT 2026 · EGP", options: ["SERVICE", "TYPE"], active: "SERVICE" },
  nav: [
    { label: "Overview", icon: "home-smile" },
    { label: "Team", icon: "users-group-rounded" },
    { label: "Clients", icon: "clipboard-list" },
    { label: "Catalog", icon: "tag" },
    { label: "History", icon: "clock-circle" },
  ],
} as const;
