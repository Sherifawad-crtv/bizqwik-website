import type { Feature } from "./types";

/** The feature tabs in the Ecosystem section. Copy is taken from the brief's app blocks; each feature has one live demo card. */
export const features: Feature[] = [
  {
    id: "revenue",
    label: "Revenue & Reports",
    icon: "chart-square",
    title: "Revenue & Reports",
    headline: "See the whole business. Run it from one place.",
    bullets: [
      "See revenue, profit, coach payouts and active subscribers in one dashboard.",
      "Set prices, memberships, bundles and class schedules.",
      "Review and approve sessions and InstaPay receipts.",
    ],
  },
  {
    id: "payouts",
    label: "Coach Payouts",
    icon: "calculator",
    title: "Coach Payouts",
    headline: "From coach earnings to paid, with a clear record.",
    bullets: [
      "See revenue and each coach's earnings for the month.",
      "Run the monthly payout: settle, pay, mark paid.",
      "Keep a clear record of what was paid and when.",
    ],
  },
  {
    id: "checkin",
    label: "Check-in & Sales",
    icon: "qr-code",
    title: "Check-in & Sales",
    headline: "Check-in, sales and bookings, all at the desk.",
    bullets: [
      "Check clients in by QR code.",
      "Sell memberships, bundles and drop-in passes.",
      "Take payments: cash, card, wallet or InstaPay.",
    ],
  },
  {
    id: "sessions",
    label: "Sessions & Earnings",
    icon: "users-group-two-rounded",
    title: "Sessions & Earnings",
    headline: "Sessions, schedules and earnings, in one app.",
    bullets: [
      "Log sessions by scanning a QR in the coaches' room.",
      "See what you've earned this month at your tier's rate.",
      "A coach can't log a session outside their assigned slot.",
    ],
  },
  {
    id: "booking",
    label: "Booking & Client App",
    icon: "calendar",
    title: "Booking & Client App",
    headline: "Your gym in your clients' pockets, under your brand.",
    bullets: [
      "Book classes and say \"I'm coming\".",
      "Buy memberships and bundles.",
      "Your gym's own name, logo, colours and web address.",
    ],
  },
];
