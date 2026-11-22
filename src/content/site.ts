import type { Link, SectionId } from "./types";

/**
 * Site-wide facts, nav, SEO and microcopy.
 * Source: BIZQWIK_LANDING_PAGE_BRIEF.md (content only). Marked FINAL there: do not reword.
 */

export const brand = {
  name: "Bizqwik",
  tagline: "One system. Your whole studio.",
} as const;

export const contact = {
  phoneDisplay: "01000401407",
  // TODO(owner): confirm tel: format and whether the number is on WhatsApp.
  phoneHref: "tel:+201000401407",
  email: "info@bizqwik.com",
  emailHref: "mailto:info@bizqwik.com?subject=Set%20up%20my%20studio",
} as const;

/** Business location (shown on Contact, About and the footer). */
export const business = {
  name: "Bizqwik",
  street: "16 Hassan Mazhar",
  area: "Heliopolis",
  city: "Cairo",
  country: "Egypt",
  /** One line for footers and policies. */
  oneLine: "16 Hassan Mazhar, Heliopolis, Cairo, Egypt",
  mapHref: "https://www.google.com/maps/search/?api=1&query=16+Hassan+Mazhar+Heliopolis+Cairo+Egypt",
} as const;

export const nav: { label: string; href: `#${SectionId}` }[] = [
  { label: "Features", href: "#apps" },
  { label: "Plans", href: "#plans" },
  { label: "FAQ", href: "#faq" },
];

export const cta = {
  primary: { label: "Contact sales", href: "#contact" },
  secondary: { label: "See plans", href: "#plans" },
  /** The navbar's single button (desktop bar and mobile menu). */
  nav: { label: "Contact sales", href: "#contact" },
} satisfies Record<string, Link>;

export const seo = {
  title: "Bizqwik | One system. Your whole studio.",
  description:
    "Run classes, members, coach payouts and payments from one system built for fitness studios. Five connected apps. Plans from 1,290 EGP a month.",
} as const;

export const microcopy = {
  planLink: "See what's included",
  enterpriseLink: "Contact sales",
  addonsLink: "Need more? Contact sales.",
  callAria: "Call Bizqwik",
  menuAria: "Open menu",
  copied: "Copied",
  bestFit: "Best fit for studios",
  included: "Included",
  notIncluded: "Not included",
  skipLink: "Skip to content",
  notFound: "This page isn't here. Back to Bizqwik.",
} as const;

export const vatNote = "All prices are EGP per month, excluding 14% VAT. VAT is added on the invoice.";
export const vatNoteShort = "All prices are EGP per month, excluding 14% VAT.";
