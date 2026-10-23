import type { AppBlock, AppSummary } from "./types";

export const appSummaries: AppSummary[] = [
  { id: "founder", number: "01", title: "Founder / C-suite app", role: "Sets prices, schedules and the team", usedBy: "Gym owner, department head", icon: "chart-square", portrait: "/demo/founder-photo.webp" },
  { id: "accountant", number: "02", title: "Accountant dashboard", role: "Runs the monthly payout", usedBy: "Accountant", icon: "calculator", portrait: "/demo/role-accountant.webp" },
  { id: "frontDesk", number: "03", title: "Front-desk / reception app", role: "Checks clients in and takes payments", usedBy: "Front desk", icon: "qr-code", portrait: "/demo/role-front-desk.webp" },
  { id: "coaches", number: "04", title: "Coaches app", role: "Logs sessions and tracks earnings", usedBy: "Coaches", icon: "users-group-two-rounded", portrait: "/demo/role-coach.webp" },
  { id: "client", number: "05", title: "Branded client app", role: "Books, buys and checks in", usedBy: "The gym's clients", icon: "smartphone", portrait: "/demo/role-client.webp" },
];

export const appBlocks: AppBlock[] = [
  {
    id: "founder",
    eyebrow: "App 1 · Founder / C-suite app",
    usedBy: "Gym owner, department head",
    headline: "See the whole business. Run it from one place.",
    bullets: [
      { text: "See revenue, profit, coach payouts and active subscribers in one dashboard." },
      { text: "Set prices, memberships, bundles and class schedules." },
      { lead: "Manage the team:", text: "invite staff, give each a role, assign coach tiers and rates." },
      { text: "Set personal training packages and each tier's cut." },
      { text: "Review and approve sessions and InstaPay receipts." },
      { lead: "Staff attendance:", text: "see who attended and exactly when, with timestamps, and who was late or on time against the assigned session time." },
      { text: "Brand your client app in minutes." },
      { text: "Run several departments and locations, each with its own prices, coaches and sessions.", tag: "Scale plan only" },
    ],
    caption: "Founder dashboard · Overview",
  },
  {
    id: "accountant",
    eyebrow: "App 2 · Accountant dashboard",
    usedBy: "Accountant",
    headline: "From coach earnings to paid, with a clear record.",
    bullets: [
      { text: "See revenue and each coach's earnings for the month." },
      { lead: "Run the monthly payout:", text: "settle, pay, mark paid." },
      { text: "Keep a clear record of what was paid and when." },
    ],
    caption: "Accountant dashboard · To pay",
  },
  {
    id: "frontDesk",
    eyebrow: "App 3 · Front-desk / reception app",
    usedBy: "Front desk",
    headline: "Check-in, sales and bookings, all at the desk.",
    bullets: [
      { text: "Check clients in by QR code." },
      { text: "Sell memberships, bundles and drop-in passes." },
      { lead: "Take payments:", text: "cash, card, wallet or InstaPay." },
      { text: "Book clients into classes and see who is coming." },
      { text: "Freeze a client's membership." },
    ],
    caption: "Class calendar (week view) · Home",
  },
  {
    id: "coaches",
    eyebrow: "App 4 · Coaches app",
    usedBy: "Coaches",
    headline: "Sessions, schedules and earnings, in one app.",
    tierPills: [{ label: "Junior coach" }, { label: "Senior coach" }, { label: "Head coach", filled: true }],
    bullets: [
      { text: "Log sessions by scanning a QR in the coaches' room." },
      { text: "See what you've earned this month at your tier's rate." },
      { text: "Deliver personal training sessions by scanning the client's PT code." },
      { lead: "Monthly scheduling:", text: "the head coach sets the whole month up front, with dates and start times, and assigns classes to coaches.", highlight: true },
      { lead: "Attendance on your assigned date only:", text: "a coach can't log a session outside their assigned slot." },
      { lead: "Hand over a session:", text: "a coach can assign or request a swap with another coach, at least 2 hours before the session, and only if the other coach accepts.", highlight: true },
      { lead: "Head coach:", text: "review and edit sessions and handle settlements." },
    ],
    caption: "Coaches app · My month",
  },
  {
    id: "client",
    eyebrow: "App 5 · Branded client app",
    usedBy: "The gym's clients",
    headline: "Your gym in your clients' pockets, under your brand.",
    bullets: [
      { text: "Your gym's own name, logo, colours and web address." },
      { text: "Check in with a QR code." },
      { text: "Book classes and say \"I'm coming\"." },
      { text: "Buy memberships and bundles." },
      { text: "Top up a wallet and earn loyalty points." },
      { text: "Freeze your own plan." },
    ],
    callout: "This is the app that carries your gym's own brand.",
    caption: "Same app, three illustrative gym brands",
  },
];

/** Illustrative brands shown in the client-app section. Never real customers. */
export const clientBrands = [
  { name: "Forge Athletics", look: "black" },
  { name: "Grove Pilates", look: "olive on beige" },
  { name: "Pulse Studio", look: "Bizqwik violet" },
] as const;
