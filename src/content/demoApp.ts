/**
 * ILLUSTRATIVE demo data for the founder-home mockup in the hero.
 * Not real customers or revenue. Open item (brief GAP 7): replace with
 * approved demo content before launch. Figures are internally consistent:
 * profit = revenue - payouts, deltas are vs the previous month.
 */
export const founderDemo = {
  greeting: "Hi, Karim",
  avatar: "/demo/founder-avatar.webp", // 256px WebP, shown at 64pt
  ranges: ["Month", "3M", "6M", "12M"],
  activeRange: "Month",
  caption: "Oct 2026",
  revenue: { label: "Revenue · EGP", value: 587400, delta: "▲ 16.1%", sub: "vs 506,100 last month" },
  kpis: [
    { id: "profit", label: "Profit", icon: "chart-square", value: "365,700", sub: "Revenue − payouts", delta: "▲ 16.5%", tone: "good" },
    { id: "payouts", label: "Coach payouts", icon: "banknote", value: "221,700", sub: "Owed to coaches", delta: "▲ 15.3%", tone: "neutral" },
    { id: "subscribers", label: "Subscribers", icon: "users-group-rounded", value: "214", sub: "168 group · 46 PT" },
    { id: "wallet", label: "Wallet credit", icon: "wallet", value: "38,250", sub: "Unspent credit" },
  ],
  chart: {
    title: "Revenue vs coach payouts",
    sub: "May – Oct 2026 · By month · EGP",
    months: ["May", "Jun", "Jul", "Aug", "Sep", "Oct"],
    revenue: [312400, 348900, 371200, 429800, 506100, 587400],
    payouts: [118600, 131200, 140800, 163900, 192300, 221700],
  },
  nav: [
    { label: "Overview", icon: "home-smile" },
    { label: "Team", icon: "users-group-rounded" },
    { label: "Clients", icon: "clipboard-list" },
    { label: "Catalog", icon: "tag" },
    { label: "History", icon: "clock-circle" },
  ],
} as const;
