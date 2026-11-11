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
    <div className="mx-auto flex h-dvh max-w-page flex-col overflow-hidden px-(--gutter) pb-(--gutter) text-ink [&_a]:text-inherit">
      <header className="flex h-[60px] shrink-0 items-center justify-between">
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

      {/* The page scrolls inside this rounded card, as in the reference. `data-lenis-prevent` keeps the page-level smooth scroll out of it. */}
      <main id="main" data-lenis-prevent tabIndex={-1} className="min-h-0 flex-1 overflow-y-auto overscroll-contain rounded-[28px] border border-line bg-surface">
        {children}
        <footer className="flex flex-col gap-4 border-t border-line px-5 py-6 text-[14px] text-ink-muted sm:px-8 md:flex-row md:items-center md:justify-between">
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
      </main>
    </div>
  );
}
