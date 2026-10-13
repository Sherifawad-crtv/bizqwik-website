import type { FaqItem } from "./types";

/** Answers use only facts in the brief. No FAQs on trials, demos, contracts, security, uptime, migration, cancellation or support hours. */
export const faqHeading = "Questions owners ask.";

export const faq: FaqItem[] = [
  {
    question: "How does pricing work?",
    answer: "Each plan has one monthly price in EGP, excluding 14% VAT. VAT is added on the invoice. Enterprise is priced on request.",
  },
  {
    question: "What if I have more clients than my plan includes?",
    answer:
      "Every extra active client is charged at your plan's rate: 25 EGP on Solopreneur, 20 EGP on Grow, 12 EGP on Scale. Extra clients never cost more than the next plan. If the extra-client charges would pass the next plan's price, you simply move up.",
  },
  {
    question: "Which plan is right for me?",
    answer:
      "Solopreneur is for independent coaches and solo studios. Grow is for studios and gyms with a team, and is our best fit for studios. Scale is for clubs with several departments. Enterprise is for large or multi-site communities.",
    cta: { label: "See plans", href: "#plans" },
  },
  {
    question: "What do my clients get?",
    answer:
      "A client experience under your brand: your gym's own name, logo, colours and web address. On Solopreneur it is a branded booking page. On Grow it is a branded client app (PWA). On Scale it is a native app on the app stores. Clients check in with a QR code, book classes, buy memberships and bundles, top up a wallet, earn loyalty points and freeze their own plan.",
  },
  {
    question: "How do clients pay?",
    answer:
      "Bizqwik tracks cash, card, wallet and InstaPay payments. InstaPay receipts are reviewed and approved by you. The front desk can take payments at the desk.",
  },
  {
    question: "How are coaches paid?",
    answer:
      "You set coach tiers and rates. Coaches log their sessions by scanning a QR in the coaches' room. At month end your accountant settles the month, pays each coach and marks it paid, with a clear record of what was paid and when.",
  },
  {
    question: "Can I run more than one department or location?",
    answer:
      "Yes, on Scale: up to 5 departments and 2–3 locations, each department with its own prices, coaches and sessions. You can also add an extra department or location to a plan as an add-on. Enterprise is custom.",
  },
  {
    question: "Can I add things later?",
    answer:
      "Yes. Add-ons include a native app on the app stores, a branded client app (PWA), an AI assistant, an AI agent, extra departments, extra locations, extra staff and WhatsApp / SMS messages.",
    cta: { label: "See add-ons", href: "#add-ons" },
  },
  {
    question: "Who uses each app?",
    answer:
      "The founder app is for the gym owner and department heads. The accountant dashboard is for your accountant. The front-desk app is for reception. The coaches app is for junior, senior and head coaches. The branded client app is for your clients.",
  },
  {
    question: "How do I get started?",
    answer: "Call us on 01000401407 or email info@bizqwik.com and we'll set up your gym.",
    cta: { label: "Talk to us", href: "#contact" },
  },
];
