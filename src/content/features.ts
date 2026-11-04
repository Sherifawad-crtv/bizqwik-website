import type { Feature } from "./types";

/** The feature tabs in the Ecosystem section. Copy is taken from the brief's app blocks; each feature has one live demo built from the product's real components. */
export const features: Feature[] = [
  {
    id: "revenue",
    label: "Revenue & Reports",
    icon: "chart-square",
    title: "Revenue & Reports",
    headline: "See the whole business. Run it from one place.",
    bullets: [
      "See revenue, profit, coach payouts and active subscribers in one dashboard.",
      "Compare any month at a glance.",
      "Review and approve sessions and InstaPay receipts.",
    ],
  },
  {
    id: "scheduling",
    label: "Scheduling",
    icon: "calendar-mark",
    title: "Scheduling",
    headline: "Plan the whole month in one calendar.",
    bullets: [
      "Set the whole month up front, with dates and start times.",
      "Assign each class to a coach.",
      "Coaches can hand over a session, at least 2 hours before, if the other coach accepts.",
    ],
  },
  {
    id: "bookings",
    label: "Bookings",
    icon: "clipboard-list",
    title: "Bookings",
    headline: "Know who is coming before they arrive.",
    bullets: [
      "Clients book classes and say \"I'm coming\".",
      "See who is coming to each class at the desk.",
      "Mark arrivals and collect payment from the class roster.",
    ],
  },
  {
    id: "checkin",
    label: "Check-in",
    icon: "qr-code",
    title: "Check-in",
    headline: "Check-in, sales and bookings, all at the desk.",
    bullets: [
      "Check clients in by QR code.",
      "See their plan and visits left the moment they scan.",
      "Book clients into classes and see who is coming.",
    ],
  },
  {
    id: "payments",
    label: "Payments & Sales",
    icon: "wallet",
    title: "Payments & Sales",
    headline: "Take payment however they pay.",
    bullets: [
      "Take payments: cash, card, wallet or InstaPay.",
      "Sell memberships, bundles and drop-in passes.",
      "Every sale is recorded with how it was paid.",
    ],
  },
  {
    id: "memberships",
    label: "Memberships",
    icon: "ticket",
    title: "Memberships",
    headline: "Plans your clients can see, renew and freeze.",
    bullets: [
      "Set prices, memberships and bundles.",
      "Renew a plan in one tap.",
      "Freeze a client's membership.",
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
    id: "client",
    label: "Client App",
    icon: "smartphone",
    title: "Client App",
    headline: "Your gym in your clients' pockets, under your brand.",
    bullets: [
      "Your gym's own name, logo, colours and web address.",
      "Book classes, buy memberships and top up a wallet.",
      "Check in with a QR code.",
    ],
  },
];
