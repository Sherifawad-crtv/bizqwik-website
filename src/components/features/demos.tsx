import { Icon } from "@/components/ui/Icon";
import { Card, Stage, Swap } from "./ui";

/*
 * The four demos, one per bundle. Illustrative names and figures (brief GAP 7). Each demo's default markup is
 * its FINISHED state; features-motion.ts plays it from the start and reduced motion shows it as it is.
 */

/* ---------- Your gym, your brand: set a name, logo, colour and address, and the client app follows ---------- */
export function ClientDemo() {
  return (
    <Stage className="@container">
      <div className="flex items-center justify-center gap-4">
        <Card className="hidden w-[220px] shrink-0 !p-4 @[500px]:block">
          <p className="text-[15px] font-bold">Brand your app</p>
          <div className="mt-3 space-y-3">
            <div>
              <p className="mb-1.5 text-[12px] text-ink-muted">Logo</p>
              <Swap
                name="logo"
                className="size-12"
                a={<span className="grid size-12 place-items-center rounded-[12px] border border-dashed border-primary/60 bg-primary-tint text-primary"><Icon name="upload-minimalistic" size={20} /></span>}
                b={<span data-logo-ed className="grid size-12 place-items-center rounded-[12px] text-[20px] font-bold" style={{ background: "#5a41ff", color: "#fff" }}>P</span>}
              />
            </div>
            <div>
              <p className="mb-1.5 text-[12px] text-ink-muted">Gym name</p>
              <p className="flex h-9 items-center rounded-[10px] bg-paper px-3 text-[13px]"><span data-type="name">Pulse Studio</span></p>
            </div>
            <div>
              <p className="mb-1.5 text-[12px] text-ink-muted">Brand colour</p>
              <p className="flex h-9 items-center gap-2 rounded-[10px] bg-paper px-3 text-[13px]">
                <span data-swatch className="size-4 rounded-[5px]" style={{ background: "#5a41ff" }} />
                <span data-hex>#5A41FF</span>
              </p>
            </div>
            <div>
              <p className="mb-1.5 text-[12px] text-ink-muted">Web address</p>
              <p className="flex h-9 items-center rounded-[10px] bg-paper px-3 text-[13px]"><span data-type="url" className="truncate">pulsestudio.fit</span></p>
            </div>
          </div>
        </Card>

        <div
          data-app
          className="w-[280px] max-w-full shrink-0 overflow-hidden rounded-[28px] shadow-[0_28px_56px_rgba(26,23,38,.12)]"
          style={{ background: "var(--app-bg)", color: "var(--app-ink)", ["--app-bg" as string]: "#fbfaf7", ["--app-soft" as string]: "#f3f2ee", ["--app-brand" as string]: "#5a41ff", ["--app-on" as string]: "#ffffff", ["--app-ink" as string]: "#1a1726" }}
        >
          <div className="p-4">
            <div className="flex items-center gap-2.5">
              <span data-app-logo className="grid size-9 shrink-0 place-items-center rounded-[10px] text-[16px] font-bold" style={{ background: "var(--app-brand)", color: "var(--app-on)" }}>P</span>
              <p className="min-w-0 flex-1 truncate text-[16px] font-bold tracking-[-.01em]"><span data-type="appname">Pulse Studio</span></p>
              <span className="size-8 rounded-full" style={{ background: "var(--app-soft)" }} />
            </div>
            <div className="mt-4 flex justify-between">
              {[["Sun", "01"], ["Mon", "02"], ["Tue", "03"], ["Wed", "04"], ["Thu", "05"]].map(([d, n]) => (
                <div key={n} className="grid w-[44px] justify-items-center gap-1 text-[11px] opacity-60 first:opacity-60 [&:nth-child(2)]:opacity-100">
                  <span>{d}</span>
                  <span
                    className="grid size-8 place-items-center rounded-full text-[14px] font-semibold"
                    style={n === "02" ? { background: "var(--app-brand)", color: "var(--app-on)" } : undefined}
                  >
                    {n}
                  </span>
                </div>
              ))}
            </div>
            <p className="mb-2 mt-4 text-[13px] opacity-60">Today</p>
            <div className="space-y-2">
              {[["Full body workout", "1 hr · Coach Nour · Studio"], ["Core strength", "45 min · Coach Omar · Studio"]].map(([t, s]) => (
                <div key={t} className="flex items-center gap-3 rounded-[16px] p-3" style={{ background: "var(--app-soft)" }}>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[14px] font-semibold leading-tight">{t}</p>
                    <p className="mt-1 truncate text-[12px] leading-tight opacity-60">{s}</p>
                  </div>
                  <span className="inline-flex h-8 shrink-0 items-center rounded-[10px] px-3.5 text-[13px] font-semibold" style={{ background: "var(--app-brand)", color: "var(--app-on)" }}>Book</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div data-swatches className="mt-4 flex justify-center gap-2 @[500px]:hidden" aria-hidden>
        {["#151515", "#6b7a3a", "#5a41ff"].map((c) => (
          <span key={c} data-dot className="size-4 rounded-full ring-2 ring-transparent ring-offset-2 ring-offset-sunken" style={{ background: c }} />
        ))}
      </div>
    </Stage>
  );
}

