import type { Metadata, Viewport } from "next";
import { Motion } from "@/motion/Motion";
import { SmoothScroll } from "@/motion/SmoothScroll";
import { caveat, spaceMono, urbanist } from "./fonts";
import { brand, business, contact, seo } from "@/content";
import "../styles/globals.css";

export const metadata: Metadata = {
  // Absolute base for the share image URLs. Swap for the real domain when it is set (brief GAP: domain).
  metadataBase: new URL(process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000"),
  title: seo.title,
  description: seo.description,
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: { title: seo.title, description: seo.description, siteName: brand.name, type: "website", locale: "en_EG" },
  twitter: { card: "summary_large_image", title: seo.title, description: seo.description },
  // Foundation stage only — remove when the real page ships.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#F3F2EE",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${urbanist.variable} ${spaceMono.variable} ${caveat.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: brand.name,
              description: seo.description,
              email: contact.email,
              telephone: "+201000401407",
              areaServed: "EG",
              address: { "@type": "PostalAddress", streetAddress: business.street, addressLocality: `${business.area}, ${business.city}`, addressCountry: "EG" },
            }),
          }}
        />
        <SmoothScroll />
        <Motion />
        {children}
      </body>
    </html>
  );
}
