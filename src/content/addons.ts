import type { AddonGroup } from "./types";

/** No prices. No plan labels. No "coming soon". */
export const addonsIntro = {
  heading: "Add what you need.",
  lede: "Start with your plan. Add more whenever your gym needs it.",
} as const;

export const addonGroups: AddonGroup[] = [
  {
    label: "Client app",
    addons: [
      { name: "Branded native app on the app stores", line: "Your own app in the App Store and Google Play, under your name", icon: "smartphone" },
      { name: "Branded client app (PWA)", line: "Your own installable app for clients, for plans that don't include it", icon: "smartphone-update" },
    ],
  },
  {
    label: "AI",
    addons: [
      { name: "AI assistant", line: "Ask questions about your gym in plain language and get answers and analysis", icon: "stars" },
      { name: "AI agent", line: "An assistant that does tasks for you inside the app, not just answers", icon: "cpu-bolt" },
    ],
  },
  {
    label: "Team and sites",
    addons: [
      { name: "Extra department", line: "Add another department with its own prices, coaches and sessions", icon: "buildings" },
      { name: "Extra location", line: "Add another branch", icon: "map-point-add" },
      { name: "Extra staff member", line: "Add more team seats", icon: "user-plus" },
    ],
  },
  {
    label: "Messaging",
    addons: [{ name: "WhatsApp / SMS messages", line: "Send reminders, renewals and announcements to clients", icon: "chat-round-dots" }],
  },
];
