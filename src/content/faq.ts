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
      "Every extra active client is charged at your plan's rate: 25 EGP on Solopreneur and 20 EGP on Grow. Extra clients never cost more than the next plan. If the extra-client charges would pass the next plan's price, you simply move up.",
  },
  {
    question: "Which plan is right for me?",
    answer:
      "Solopreneur is for independent coaches and solo studios. Grow is for studios and gyms with a team, and is our best fit for studios. Enterprise is for large or multi-site communities.",
    cta: { label: "See plans", href: "#plans" },
  },
  {
    question: "What do my clients get?",
    answer:
      "A client experience under your brand: your gym's own name, logo, colours and web address. On Solopreneur it is a branded booking page. On Grow it is a branded client app (PWA). On Enterprise it is custom. Clients check in with a QR code, book classes, buy memberships and bundles, top up a wallet, earn loyalty points and freeze their own plan.",
  },
  {
    question: "How do I get started?",
    answer: "Call us on 01000401407 or email info@bizqwik.com and we'll set up your gym.",
    cta: { label: "Talk to us", href: "#contact" },
  },
];
