import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reach, Tiles } from "@/components/support/parts";
import { articles, supportHub } from "@/content";

export const metadata: Metadata = {
  title: "Support | Bizqwik",
  description: "Help and policies for Bizqwik: contact us, refunds and cancellation, privacy and delivery.",
  alternates: { canonical: "/support" },
};

/** The help-centre front page: a two-tone greeting, quick links as pills, and the article tiles. */
export default function SupportHome() {
  const quick = articles.filter((a) => a.slug !== "about");
  return (
    <div className="mx-auto w-full max-w-[1040px] px-5 pb-24 pt-12 sm:px-8 lg:pt-20">
      <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr]">
        <div>
          <h1 className="text-[clamp(1.75rem,1.3rem+1.4vw,2.25rem)] font-semibold leading-tight tracking-[-.02em]">
            {supportHub.eyebrow}
            <span className="block text-ink-muted">{supportHub.heading}</span>
          </h1>
          <ul className="mt-8 flex flex-wrap gap-2">
            {quick.map((a, i) => (
              <li key={a.slug}>
                <Link
                  href={a.path}
                  className={`inline-flex h-11 items-center rounded-full border px-5 text-[16px] font-medium transition-colors duration-(--dur-fast) ease-standard ${
                    i === 0 ? "border-ink bg-ink !text-white hover:bg-ink/90" : "border-line bg-surface hover:bg-sunken"
                  }`}
                >
                  {a.title.replace(" Policy", "")}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <Image
          src="/illustrations/checkin.webp"
          alt=""
          width={1400}
          height={1050}
          unoptimized
          priority
          className="mx-auto h-auto w-full max-w-[440px] mix-blend-multiply"
        />
      </div>

      <Tiles />
      <Reach />
    </div>
  );
}
