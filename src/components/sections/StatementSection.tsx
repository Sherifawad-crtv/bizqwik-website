import { Icon, type IconName } from "@/components/ui/Icon";
import { features, statement } from "@/content";
import Image from "next/image";

/** Opacity of the five pills by distance from the middle one (the orbit is animated in phase 4). */
const FADE = [0.3, 0.6, 1, 0.6, 0.3] as const;

/**
 * Section 3 of the outline: the dark statement. It is the sheet that rises over the pinned hero
 * (`-mt-[100svh]`, see hero-motion.ts COVER_VH). Skeleton: the pills are static; phase 4 makes them orbit.
 */
export function StatementSection() {
  const pills = [0, 1, 2, 3, 4].map((i) => features[(i + 2) % features.length]);
  return (
    <section id="ecosystem" aria-labelledby="statement-title" className="relative z-20 -mt-[100svh] px-3 lg:px-4">
      <div data-sq className="relative grid min-h-svh items-center gap-12 overflow-hidden [--sq-r:40px] [--sq-fill:var(--color-ink)] px-6 py-24 text-white lg:grid-cols-2 lg:px-16">
        <h2 id="statement-title" className="text-[clamp(2.5rem,1rem+4.6vw,5.25rem)] font-extrabold leading-[.98] tracking-[-.035em]">
          <span className="block lg:whitespace-nowrap">{statement.line1}</span>
          <span className="block">
            {statement.line2Before}
            <span className="text-primary-light">{statement.highlight}</span>
          </span>
        </h2>

        <div aria-hidden className="relative mx-auto flex w-full max-w-[520px] items-center gap-6">
          <span data-sq className="grid size-24 shrink-0 place-items-center [--sq-r:28px] [--sq-fill:var(--color-surface)] [--sq-drop:drop-shadow(0_20px_36px_rgb(90_65_255/0.5))]">
            <Image src="/brand/mark.png" alt="" width={386} height={403} className="h-11 w-auto" />
          </span>
          <ul className="flex flex-1 flex-col gap-3">
            {pills.map((f, i) => (
              <li key={f.id} className="self-start" style={{ opacity: FADE[i] }}>
                <span data-reveal className="flex items-center gap-3 rounded-full bg-white/[.09] py-2.5 pl-3 pr-5 text-[17px] font-semibold">
                  <span className="grid size-9 place-items-center rounded-full bg-white/10">
                    <Icon name={f.icon as IconName} size={18} />
                  </span>
                  {f.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
