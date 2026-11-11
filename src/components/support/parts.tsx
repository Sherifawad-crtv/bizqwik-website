import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { articles, business, contact, policiesUpdated, type Article, type Block } from "@/content";

/** Breadcrumb in the accent colour, as in the reference ("Link support › Data privacy"). */
export function Crumbs({ here }: { here?: string }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[13px] font-medium text-primary-pressed">
      <Link href="/support" className="hover:underline">
        Bizqwik support
      </Link>
      {here && (
        <>
          <span aria-hidden className="text-ink-faint">
            ›
          </span>
          <span>{here}</span>
        </>
      )}
    </nav>
  );
}

function BlockView({ b }: { b: Block }) {
  if ("h3" in b) return <h3 className="mt-6 text-[18px] font-bold">{b.h3}</h3>;
  if ("ul" in b)
    return (
      <ul className="mt-4 grid gap-3">
        {b.ul.map((t) => (
          <li key={t} className="flex gap-4 text-[17px] leading-relaxed">
            <span aria-hidden className="mt-[11px] size-1.5 shrink-0 rounded-full bg-ink-faint" />
            {t}
          </li>
        ))}
      </ul>
    );
  return <p className="mt-4 text-[17px] leading-relaxed">{b.p}</p>;
}

/** A tile: icon, title, two-line summary. */
export function Tile({ a }: { a: Article }) {
  return (
    <Link href={a.path} className="group block rounded-[20px] p-3 transition-colors duration-(--dur-fast) ease-standard hover:bg-sunken/70">
      <Icon name={a.icon} size={24} />
      <p className="mt-3 text-[18px] font-semibold">{a.title}</p>
      <p className="mt-1 line-clamp-2 text-[15px] leading-snug text-ink-muted">{a.summary}</p>
    </Link>
  );
}

export function Tiles({ except }: { except?: Article["slug"] }) {
  return (
    <section aria-labelledby="more-title" className="mt-24">
      <h2 id="more-title" className="text-[22px] font-semibold">
        Read support articles
      </h2>
      <div className="mt-8 grid gap-x-4 gap-y-2 sm:grid-cols-2">
        {articles
          .filter((a) => a.slug !== except)
          .map((a) => (
            <Tile key={a.slug} a={a} />
          ))}
      </div>
    </section>
  );
}

/** Phone, email and office, used at the end of every page. */
export function Reach() {
  return (
    <section aria-labelledby="reach-title" className="mt-16 border-t border-line pt-10">
      <h2 id="reach-title" className="text-[22px] font-semibold">
        Not sure where to start?
      </h2>
      <p className="mt-2 text-[17px] text-ink-muted">Call or write to us and we will help you directly.</p>
      <ul className="mt-6 grid gap-3 text-[17px]">
        <li>
          <a href={contact.phoneHref} className="inline-flex min-h-11 items-center gap-3 font-semibold hover:underline">
            <Icon name="phone-calling-rounded" size={22} />
            {contact.phoneDisplay}
          </a>
        </li>
        <li>
          <a href={contact.emailHref} className="inline-flex min-h-11 items-center gap-3 font-semibold hover:underline">
            <Icon name="letter" size={22} />
            {contact.email}
          </a>
        </li>
        <li>
          <a href={business.mapHref} className="inline-flex min-h-11 items-start gap-3 font-semibold hover:underline" target="_blank" rel="noreferrer">
            <Icon name="map-point" size={22} className="mt-0.5 shrink-0" />
            {business.oneLine}
          </a>
        </li>
      </ul>
    </section>
  );
}

/** One policy or info page. */
export function ArticlePage({ a }: { a: Article }) {
  return (
    <div className="mx-auto w-full max-w-[680px] px-5 pb-20 pt-[72px] sm:px-0">
      <Crumbs here={a.title} />
      <h1 className="mt-3 text-[clamp(2rem,1.4rem+1.8vw,2.5rem)] font-bold leading-[1.2] tracking-[-.02em]">{a.title}</h1>
      {a.dated && <p className="mt-3 text-[15px] font-semibold text-ink-muted">Last updated: {policiesUpdated}</p>}
      <p className="mt-4 text-[18px] leading-relaxed">{a.intro}</p>

      {a.sections.map((s) => (
        <section key={s.heading} className="mt-12 border-t border-line pt-8">
          <h2 className="text-[24px] font-bold tracking-[-.01em]">{s.heading}</h2>
          {s.blocks.map((b, i) => (
            <BlockView key={i} b={b} />
          ))}
        </section>
      ))}

      <Reach />
      <Tiles except={a.slug} />
    </div>
  );
}
