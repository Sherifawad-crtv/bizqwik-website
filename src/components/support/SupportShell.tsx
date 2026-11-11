import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { articles, business } from "@/content";

const YEAR = new Date().getFullYear();
const link = "transition-colors duration-(--dur-instant) ease-standard hover:text-ink";

/**
 * The help-centre frame, after support.link.com: a slim top bar with the logo and "Support", a large rounded
 * card that holds the page, and a small footer of policy links. Used by the support hub and every policy page.
 */
export function SupportShell({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex min-h-svh max-w-page flex-col px-(--gutter) text-ink [&_a]:text-inherit">
      <header className="flex h-[60px] items-center justify-between">
        <Link href="/support" className="flex items-center gap-3" aria-label="Bizqwik support">
          <Image src="/brand/mark.png" alt="" width={386} height={403} className="h-7 w-auto" />
          <span className="text-[20px] font-bold tracking-[-.01em]">Support</span>
        </Link>
        <Link
          href="/contact"
          className="inline-flex h-9 items-center rounded-full border border-line bg-surface px-4 text-[14px] font-semibold transition-colors duration-(--dur-fast) ease-standard hover:bg-sunken"
        >
          Contact us
        </Link>
      </header>

      <main id="main" className="flex-1 rounded-[28px] border border-line bg-surface">
        {children}
      </main>

      <footer className="flex flex-col gap-4 py-6 text-[14px] text-ink-muted md:flex-row md:items-center md:justify-between">
        <nav aria-label="Support" className="flex flex-wrap gap-x-5 gap-y-2">
          <Link href="/" className={link}>
            Bizqwik
          </Link>
          {articles.map((a) => (
            <Link key={a.slug} href={a.path} className={link}>
              {a.title.replace(" Policy", "")}
            </Link>
          ))}
        </nav>
        <p>
          © {YEAR} {business.name} · {business.oneLine}
        </p>
      </footer>
    </div>
  );
}
