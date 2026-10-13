import Image from "next/image";

/*
 * Living style guide for the design foundation. Not part of the product page:
 * it exists so every token can be seen, reviewed and handed off in a browser.
 */

const SURFACES = [
  ["paper", "#F3F2EE", "Page background"],
  ["surface", "#FBFAF7", "Cards (never pure white)"],
  ["sunken", "#ECEBE5", "Wells, tags, selector"],
  ["line", "#E3E1DA", "Hairlines"],
  ["ink", "#1A1726", "Main text"],
  ["ink-muted", "#6C687A", "Secondary text"],
  ["ink-faint", "#9A96A6", "Decorative only"],
] as const;

const VIOLET = [
  ["primary", "#5A41FF", "Key numbers, actions, Grow"],
  ["primary-pressed", "#4832D6", "Hover, small violet text"],
  ["primary-light", "#A193FF", "Accent, aesthetics only"],
  ["primary-dark", "#2E1F99", "Text on light accent"],
] as const;

const SWATCH_BG: Record<string, string> = {
  paper: "bg-paper",
  surface: "bg-surface",
  sunken: "bg-sunken",
  line: "bg-line",
  ink: "bg-ink",
  "ink-muted": "bg-ink-muted",
  "ink-faint": "bg-ink-faint",
  primary: "bg-primary",
  "primary-pressed": "bg-primary-pressed",
  "primary-light": "bg-primary-light",
  "primary-dark": "bg-primary-dark",
};

const CONTRAST = [
  ["Ink on Paper", "15.7", "Body"],
  ["Violet on Paper", "5.2", "Text 18px+ and UI"],
  ["Pressed on Paper", "6.9", "Small violet text, links"],
  ["Muted on Paper", "4.8", "Body-size secondary text"],
  ["White on Violet", "5.8", "Primary button, Grow card"],
  ["Faint on Paper", "2.6", "Decoration only — never readable text"],
] as const;

const RADII = [
  ["tile", "rounded-tile", "16"],
  ["input", "rounded-input", "20"],
  ["button", "rounded-button", "24"],
  ["card", "rounded-card", "28"],
  ["card-lg", "rounded-card-lg", "32"],
] as const;

function Label({ children }: { children: React.ReactNode }) {
  return <p className="font-mono text-label font-bold uppercase text-primary-pressed">{children}</p>;
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="py-[72px] lg:py-[120px]" aria-labelledby={title}>
      <h2 id={title} className="mb-10 font-mono text-label font-bold uppercase text-ink-muted">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Swatch({ name, hex, use }: { name: string; hex: string; use: string }) {
  return (
    <div className="rounded-card bg-surface p-3 shadow-card">
      <div className={`h-24 rounded-tile border border-line ${SWATCH_BG[name]}`} />
      <p className="mt-3 text-[17px] font-bold">{name}</p>
      <p className="font-mono text-label uppercase text-ink-muted">{hex}</p>
      <p className="text-[15px] text-ink-muted">{use}</p>
    </div>
  );
}

export default function Foundation() {
  return (
    <main className="mx-auto max-w-page px-5 lg:px-8">
      <header className="pt-16 lg:pt-24">
        <Label>Bizqwik · Design foundation · v0.1</Label>
        <h1 className="mt-4 text-h1 font-extrabold">Tokens, type and shape.</h1>
        <p className="mt-6 max-w-2xl text-body text-ink-muted">
          Ported from the app repo and the landing brief. Reviewed here, defined in{" "}
          <code className="font-mono text-[0.8em]">src/styles/tokens.css</code>. Layout, imagery and motion
          wait for design direction.
        </p>
      </header>

      <Section title="Colour">
        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
          {[...SURFACES, ...VIOLET].map(([n, h, u]) => (
            <Swatch key={n} name={n} hex={h} use={u} />
          ))}
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-3">
          <div className="rounded-card bg-surface p-6 shadow-card">
            <Label>Tags</Label>
            <div className="mt-4 flex flex-wrap gap-3 font-mono text-label font-bold uppercase">
              <span className="rounded-full bg-amber-bg px-4 py-2 text-amber-fg">Scale plan only</span>
              <span className="rounded-full bg-green-bg px-4 py-2 text-green-fg">Included</span>
              <span className="rounded-full bg-danger-bg px-4 py-2 text-danger-fg">Danger</span>
              <span className="rounded-full bg-primary-tint px-4 py-2 text-primary-pressed">Tint</span>
              <span className="rounded-full bg-sunken px-4 py-2 text-ink-muted">Sunken</span>
            </div>
          </div>
          <div className="rounded-card bg-surface p-6 shadow-card lg:col-span-2">
            <Label>Contrast (computed)</Label>
            <table className="mt-4 w-full text-left text-[16px]">
              <caption className="sr-only">Contrast ratios for text pairs</caption>
              <thead className="sr-only">
                <tr>
                  <th scope="col">Pair</th>
                  <th scope="col">Ratio</th>
                  <th scope="col">Rule</th>
                </tr>
              </thead>
              <tbody>
                {CONTRAST.map(([pair, ratio, rule]) => (
                  <tr key={pair} className="border-t border-line">
                    <th scope="row" className="py-2 pr-4 font-semibold">{pair}</th>
                    <td className="tabular py-2 pr-4 font-extrabold text-primary-pressed">{ratio}</td>
                    <td className="py-2 text-ink-muted">{rule}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-3">
          <div className="h-28 rounded-card" style={{ background: "var(--gradient-mark)" }} />
          <div className="h-28 rounded-card shadow-glow" style={{ background: "var(--gradient-grow)" }} />
          <div className="h-28 rounded-card bg-paper" style={{ backgroundImage: "var(--wash-violet)" }} />
        </div>
        <p className="mt-3 font-mono text-label uppercase text-ink-muted">
          Mark gradient (emblem only) · Grow card gradient + glow · Violet wash 7%
        </p>
      </Section>

      <Section title="Typography">
        <div className="space-y-10">
          <div>
            <Label>Urbanist 800 · H1 · −3.5%</Label>
            <p className="mt-2 text-h1 font-extrabold">One ecosystem.</p>
          </div>
          <div>
            <Label>Urbanist 800 · H2 · −3%</Label>
            <p className="mt-2 text-h2 font-extrabold">Five apps. One system.</p>
          </div>
          <div>
            <Label>Urbanist 700 · H3</Label>
            <p className="mt-2 text-h3 font-bold">See the whole business. Run it from one place.</p>
          </div>
          <div>
            <Label>Urbanist 500 · Body</Label>
            <p className="mt-2 max-w-3xl text-body">
              Everyone who touches your gym gets their own app, and every app stays in sync.
            </p>
          </div>
          <div className="flex flex-wrap items-end gap-10">
            <div>
              <Label>Numbers · 800 tabular</Label>
              <p className="tabular mt-2 text-h2 font-extrabold text-primary">1,290</p>
              <p className="font-mono text-label uppercase text-ink-muted">EGP / month</p>
            </div>
            <div>
              <Label>Space Mono · labels only</Label>
              <p className="mt-2 font-mono text-label font-bold uppercase">For gyms, studios and clubs</p>
            </div>
          </div>
        </div>
      </Section>

      <Section title="Shape and elevation">
        <div className="grid grid-cols-2 gap-5 lg:grid-cols-5">
          {RADII.map(([name, cls, px]) => (
            <div key={name} className={`${cls} flex h-40 flex-col justify-end bg-surface p-4 shadow-card`}>
              <p className="font-bold">{name}</p>
              <p className="font-mono text-label uppercase text-ink-muted">{px}px</p>
            </div>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-5">
          <span className="inline-flex h-14 items-center rounded-button bg-primary px-8 font-bold text-white">
            Talk to us
          </span>
          <span className="inline-flex h-14 items-center rounded-button bg-surface px-8 font-bold shadow-card">
            See plans
          </span>
          <span className="inline-flex h-14 items-center rounded-full bg-surface px-8 font-semibold shadow-float">
            Floating pill
          </span>
        </div>
        <p className="mt-3 font-mono text-label uppercase text-ink-muted">
          Primary · Secondary · Float shadow (sticky nav, call button)
        </p>
      </Section>

      <Section title="Brand assets">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="flex items-center justify-center rounded-card bg-surface p-10 shadow-card">
            <Image src="/brand/wordmark.png" alt="Bizqwik wordmark" width={1712} height={396} className="h-auto w-72" />
          </div>
          <div className="flex items-center justify-center rounded-card bg-surface p-10 shadow-card">
            <Image src="/brand/mark.png" alt="Bizqwik B emblem" width={386} height={403} className="h-auto w-32" />
          </div>
        </div>
        <p className="mt-3 font-mono text-label uppercase text-ink-muted">
          Light backgrounds only · use as supplied · clear space = height of the b mark
        </p>
      </Section>
    </main>
  );
}
