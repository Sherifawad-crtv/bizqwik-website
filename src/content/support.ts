import type { IconName } from "@/components/ui/Icon";

/**
 * Support centre and policy pages. Written from what Bizqwik actually does (the brief) and what the product
 * collects (checked against the product repo). Not legal advice: have a lawyer read it before launch.
 */

export const policiesUpdated = "November 11, 2026";

export type Block = { p: string } | { ul: string[] } | { h3: string };
export interface Section {
  heading: string;
  blocks: Block[];
}
export interface Article {
  slug: "about" | "contact" | "privacy" | "refund-policy" | "delivery";
  path: string;
  title: string;
  /** Short line under the title and in the topic tile. */
  summary: string;
  intro: string;
  icon: IconName;
  /** Policies show a "last updated" date. */
  dated: boolean;
  sections: Section[];
}

const SUPPORT = "Call us on 01000401407 or email info@bizqwik.com.";

export const supportHub = {
  eyebrow: "Hi there,",
  heading: "How can Bizqwik Support help?",
  chips: ["Contact us", "Refund & Cancellation", "Privacy Policy", "Delivery"] as const,
  listHeading: "Read support articles",
  notSure: { title: "Not sure where to start?", text: "Call or write to us and we will help you directly." },
};

export const articles: Article[] = [
  {
    slug: "about",
    path: "/about",
    title: "About Bizqwik",
    summary: "Who we are, what Bizqwik is, and who it is for.",
    intro: "Bizqwik is software that helps gyms, studios and clubs in Egypt run their whole community from one place.",
    icon: "home-smile",
    dated: false,
    sections: [
      {
        heading: "Who we are",
        blocks: [
          { p: "Bizqwik is a software company based in Heliopolis, Cairo, Egypt. We build the apps that gyms, studios and clubs use every day, and we work with each business directly to set it up." },
          { p: "Our tagline says it: one ecosystem, your whole community." },
        ],
      },
      {
        heading: "What Bizqwik is",
        blocks: [
          { p: "Bizqwik is a set of five connected apps. Everything stays in sync, so nobody re-enters the same information twice." },
          {
            ul: [
              "Founder app: revenue, profit, payouts and subscribers on one screen, for the owner and department heads.",
              "Accountant dashboard: monthly settlement and payouts, with a clear record of what was paid and when.",
              "Front-desk app: register clients, sell plans, check people in and take payments at the desk.",
              "Coaches app: coaches log sessions by scanning a QR code and see their earnings.",
              "Branded client app: your gym's own name, logo and colours, where clients book, pay and check in.",
            ],
          },
        ],
      },
      {
        heading: "Who it is for",
        blocks: [
          { p: "Bizqwik is a business-to-business service. Our customers are independent coaches, studios, gyms and clubs. The people who train at those businesses use the client app, but their relationship is with their gym, and ours is with the gym." },
        ],
      },
      {
        heading: "How we work with you",
        blocks: [
          { p: "We do not just hand over a login. Our team sets up your business with you, and for larger sites we work on the ground with you and your team. That is also why pricing, refunds and changes to a plan are handled by talking to us (see our Refund & Cancellation Policy)." },
          { p: "Prices are in Egyptian pounds (EGP) per month, excluding 14% VAT. You can see the plans on our home page." },
        ],
      },
    ],
  },
  {
    slug: "contact",
    path: "/contact",
    title: "Contact us",
    summary: "Phone, email and our office in Cairo.",
    intro: "Talk to a person. We answer questions about plans, set-up, billing, refunds and your data.",
    icon: "chat-round-dots",
    dated: false,
    sections: [
      {
        heading: "How to reach us",
        blocks: [
          { ul: ["Phone: 01000401407", "Email: info@bizqwik.com"] },
          { p: "When you write, include your business name and the email you use with Bizqwik so we can find your account quickly." },
        ],
      },
      {
        heading: "Our office",
        blocks: [{ p: "Bizqwik, 16 Hassna Mazhar, Heliopolis, Cairo, Egypt." }],
      },
      {
        heading: "What to contact us about",
        blocks: [
          {
            ul: [
              "Choosing a plan or setting up your business.",
              "Billing, invoices and VAT.",
              "Refunds, cancellations or changing your plan.",
              "Access to, correction of, or deletion of personal data.",
              "Anything that is not working as it should.",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "privacy",
    path: "/privacy",
    title: "Privacy Policy",
    summary: "What we collect, why, who sees it and how to ask us about it.",
    intro: "This policy explains what personal data Bizqwik handles, why, who can see it, and what choices you have.",
    icon: "database",
    dated: true,
    sections: [
      {
        heading: "Who this policy covers",
        blocks: [
          { p: "Bizqwik provides software to gyms, studios and clubs (“businesses”). Three groups of people have data in our systems or on our website:" },
          {
            ul: [
              "Visitors to bizqwik.com.",
              "Business users: owners, department heads, accountants, front-desk staff and coaches who sign in to Bizqwik.",
              "Clients of those businesses, who are registered by the business and may use its branded client app.",
            ],
          },
          { p: "For a business's own staff and clients, the business decides what data it puts into Bizqwik and why. We store and process it on the business's behalf and only to provide the service. For visitors to our website and for our own business contacts, Bizqwik decides, and this policy applies directly." },
        ],
      },
      {
        heading: "What we collect",
        blocks: [
          { h3: "Business users" },
          { ul: ["Name and email address, used to sign in.", "Role (for example coach, accountant, front desk) and coach tier.", "A profile photo, if one is added.", "Session records: which sessions a coach ran and when, including the time of a QR scan.", "Payout and settlement records."] },
          { h3: "Clients of a business" },
          {
            ul: [
              "Name, and optionally age, phone number and email address.",
              "An optional “conditions” note about a client, only visible to their coach and department heads. Businesses should keep it to what a coach needs to train someone safely.",
              "Memberships, class bundles and plans, including freezes and renewals.",
              "Class bookings and attendance, including QR check-ins.",
              "Wallet balance, wallet top-ups and loyalty points.",
              "Payment records: the amount, the date, and the method used (cash, card, wallet or InstaPay). We record that a payment happened. We do not collect or store card numbers.",
              "An image of the receipt, when a client uploads proof of an InstaPay payment for the business to approve.",
              "Notifications sent to the client and, if allowed on their device, the browser's push-notification address.",
            ],
          },
          { h3: "Business settings" },
          { ul: ["The business's name, logo, icon, colours and web address for its branded client app.", "Class images, locations, prices and expenses the business enters."] },
          { h3: "Visitors to our website" },
          { p: "Our public website does not use advertising cookies and does not track you across other sites. If you call or email us, we keep that correspondence so we can help you." },
        ],
      },
      {
        heading: "How we use it",
        blocks: [
          {
            ul: [
              "To run Bizqwik: sign-ins, bookings, check-ins, payments, payouts, notifications and reports for the business.",
              "To support you when you contact us, and to keep the service secure and working.",
              "To understand how the apps are used and fix errors (see Analytics and error reports below).",
              "To meet legal and accounting obligations.",
            ],
          },
          { p: "We do not sell personal data, and we do not use clients' data for advertising." },
        ],
      },
      {
        heading: "Analytics and error reports",
        blocks: [
          { p: "The Bizqwik apps can use product analytics and error reporting to find problems and improve the product. They are switched off unless we configure them. When on, they are set up to protect people:" },
          {
            ul: [
              "People are identified by an internal ID, plus role and business, never by name, email, phone number or notes.",
              "Automatic capture of clicks and text is off, because button text can contain a client's name.",
              "Session recordings, if used, mask all text and all inputs.",
            ],
          },
        ],
      },
      {
        heading: "Who can see it",
        blocks: [
          { p: "Inside a business, what each person sees depends on their role. A coach sees their own sessions and their assigned clients. The front desk sees clients and payments at the desk. Owners and department heads see the whole business. One business's data is kept separate from every other business's data." },
          { p: "We share data only with the service providers we need to run Bizqwik, such as cloud hosting, file storage and message delivery, and only for that purpose. We may disclose data when the law requires it." },
        ],
      },
      {
        heading: "How we protect it",
        blocks: [
          { p: "Accounts require sign-in. Access is limited by role and by business. Uploaded files such as payment receipts are stored privately and shown only through short-lived links. Data is encrypted in transit. No system is perfectly secure, and if we learn of a breach that affects you, we will tell you as the law requires." },
        ],
      },
      {
        heading: "How long we keep it",
        blocks: [
          { p: "We keep data while a business uses Bizqwik, and for as long afterwards as is needed for accounting, legal and dispute purposes. A business can ask us to delete its data when it leaves, and we will delete or anonymise what we are not required to keep." },
        ],
      },
      {
        heading: "Your choices and rights",
        blocks: [
          { p: "Under Egypt's Personal Data Protection Law (Law No. 151 of 2020) and similar rules, you can ask to see your personal data, correct it, or have it deleted, and you can object to certain uses." },
          { p: "If you are a client of a gym or studio, start with that business, because it controls your record. You can also write to us and we will point your request to the right place or act on it ourselves. " + SUPPORT },
        ],
      },
      {
        heading: "Changes to this policy",
        blocks: [{ p: "When we change this policy we will update the date at the top. If a change matters, we will tell business customers directly." }],
      },
      {
        heading: "Contact",
        blocks: [{ p: "Bizqwik, 16 Hassna Mazhar, Heliopolis, Cairo, Egypt. Phone 01000401407. Email info@bizqwik.com." }],
      },
    ],
  },
  {
    slug: "refund-policy",
    path: "/refund-policy",
    title: "Refund & Cancellation Policy",
    summary: "How refunds, cancellations and plan changes are handled.",
    intro: "Bizqwik is a business-to-business service set up with each customer, so refunds and cancellations are handled by talking to us, not automatically.",
    icon: "refresh-circle",
    dated: true,
    sections: [
      {
        heading: "How it works",
        blocks: [
          { p: "Every Bizqwik customer is a business that we set up and work with directly, often with on-the-ground activity with your team and your clients. Because of that, we do not offer automatic or self-service refunds or cancellations. Each request is reviewed and settled with you individually." },
          { p: "To cancel, change your plan or ask for a refund, talk to us first. " + SUPPORT },
        ],
      },
      {
        heading: "What to include in your request",
        blocks: [{ ul: ["Your business name and the email you use with Bizqwik.", "Whether you want to cancel, change plan or request a refund.", "The invoice or payment it relates to, and the reason."] }],
      },
      {
        heading: "What happens next",
        blocks: [
          {
            ul: [
              "We review your request with you, taking into account the plan, the work already done to set up your business and any on-site activity.",
              "We agree the outcome with you in writing: for example, ending your plan at the end of a billing period, changing to another plan, an adjustment to a future invoice, or a refund where we agree one.",
              "If a refund is agreed, we confirm the amount and the timing in writing. It is paid back through the method used for the original payment where possible.",
            ],
          },
        ],
      },
      {
        heading: "Prices and taxes",
        blocks: [{ p: "All prices are in Egyptian pounds (EGP) per month and exclude 14% VAT, which is added on the invoice. Refunds, where agreed, follow the same currency and include any VAT that was charged on the refunded amount." }],
      },
      {
        heading: "Payments between a gym and its clients",
        blocks: [
          { p: "Memberships, class bundles, wallet top-ups and classes that a gym's clients buy are sales by that gym, not by Bizqwik. The gym sets its own refund and cancellation rules. Bizqwik gives the gym the tools to apply them, for example freezing a membership or refunding an amount to a client's wallet. Clients should ask their gym about those payments." },
        ],
      },
    ],
  },
  {
    slug: "delivery",
    path: "/delivery",
    title: "Delivery & Shipping Policy",
    summary: "How Bizqwik is delivered. No physical goods are shipped.",
    intro: "Bizqwik is a digital service delivered online. We do not ship physical products.",
    icon: "cloud-check",
    dated: true,
    sections: [
      {
        heading: "What you receive",
        blocks: [
          { p: "When you subscribe to a plan, you receive access to the Bizqwik apps included in that plan, and your business is set up with our team. Access is delivered online, through the web and on your devices. Nothing is posted or couriered." },
        ],
      },
      {
        heading: "Set-up",
        blocks: [
          {
            ul: [
              "After your plan is agreed, we set up your business with you: your team, your plans and prices, and your branding.",
              "We will confirm with you what is included and when it will be ready, in writing, because it depends on your plan and the size of your business.",
              "A branded client app is delivered as a web app (PWA) on the Grow plan, and as a native app on the app stores on the Scale plan and as an add-on. App store publishing follows the stores' own review times, which we do not control.",
            ],
          },
        ],
      },
      {
        heading: "On-site work",
        blocks: [{ p: "Some plans include physical integrations, such as gate access, and some businesses ask for on-the-ground help. Where this applies, we agree the date and scope with you in advance and carry it out at your location." }],
      },
      {
        heading: "Shipping",
        blocks: [{ p: "There are no shipping charges, delivery fees or customs because no physical goods are sent. If we ever supply a physical item, we will agree the delivery with you in writing first." }],
      },
      {
        heading: "If something is wrong",
        blocks: [{ p: "If you cannot access Bizqwik or part of your set-up is not as agreed, tell us. " + SUPPORT }],
      },
    ],
  },
];

export const articleBySlug = (slug: Article["slug"]) => articles.find((a) => a.slug === slug)!;
