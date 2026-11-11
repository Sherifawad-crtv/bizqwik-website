import { Icon } from "@/components/ui/Icon";
import { Card, Grow, IconTile, Initial, Label, MiniButton, Row, SearchGlyph, Stage, Status, Swap, Table, Tick } from "./ui";

/*
 * The four demos, one per bundle. Illustrative names and figures (brief GAP 7). Each demo's default markup is
 * its FINISHED state; features-motion.ts plays it from the start and reduced motion shows it as it is.
 */

/* ---------- Run the business: revenue and analytics, the team, the schedule, the payout ---------- */
const BARS = [44, 58, 52, 66, 61, 78, 100];

export function BusinessDemo() {
  return (
    <Stage>
      <Card>
        <div>
          <div className="flex items-center justify-between">
            <p className="text-[14px] text-ink-muted">Revenue · last 7 months</p>
            <span className="inline-flex items-center gap-1 text-[13px] font-semibold text-green-fg">
              <Icon name="arrow-up" size={13} />
              22.8%
            </span>
          </div>
          <p className="tabular mt-1 text-[36px] font-bold leading-none tracking-[-.03em]">
            <span data-count>118,400</span> <span className="text-[14px] font-medium tracking-normal text-ink-muted">EGP</span>
          </p>
          <div className="mt-3 flex h-12 items-end gap-1.5">
            {BARS.map((h, i) => (
              <span key={i} data-bar className={`flex-1 origin-bottom rounded-[6px] ${i === BARS.length - 1 ? "bg-primary" : "bg-primary/20"}`} style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>

        <Grow>
          <Label>Team today</Label>
          <div className="space-y-2">
            <Row data-row tile={<Initial letter="N" />} title="Coach Nour" sub="Strength · arrived 5:52 PM" right={<span data-pop><Status>On time</Status></span>} />
            <Row data-row tile={<Initial letter="O" />} title="Coach Omar" sub="Yoga · arrived 5:09 PM" right={<span data-pop><Status tone="amber">9 min late</Status></span>} />
          </div>
        </Grow>

        <Grow>
          <Label>Schedule</Label>
          <Row data-new tile={<IconTile name="calendar-add" />} title="Strength class" sub="Fri 17 · 6:00 PM · Coach Nour" right={<Status>Added</Status>} />
        </Grow>

        <Grow>
          <Label>Payouts</Label>
          <Row
            tile={<IconTile name="banknote" />}
            title="Coach Nour"
            sub={<Swap name="sub" a="14 sessions · 4,200.00 EGP" b="Paid · 4,200.00 EGP" />}
            right={
              <span data-tap="pay">
                <Swap
                  name="pay"
                  a={<span className="inline-flex h-9 items-center rounded-[10px] bg-ink px-4 text-[14px] font-semibold text-white">Pay</span>}
                  b={
                    <span className="inline-flex h-9 items-center gap-1.5 rounded-[10px] bg-green-fg px-3.5 text-[14px] font-semibold text-white">
                      <Tick />
                      Paid
                    </span>
                  }
                />
              </span>
            }
          />
        </Grow>
      </Card>
    </Stage>
  );
}

/* ---------- Front desk and CRM: find a client, open the record, act on it ---------- */
export function FrontDeskDemo() {
  return (
    <Stage>
      <Card>
        <div className="grid">
          <div data-layer="list" className="col-start-1 row-start-1">
            <p className="text-[18px] font-bold tracking-[-.01em]">Clients</p>
            <div className="mt-3 flex h-11 items-center gap-2.5 rounded-[12px] bg-paper px-3.5 text-[15px]">
              <SearchGlyph />
              <span data-type="search">Mona</span>
            </div>
            <div className="mt-3 space-y-2">
              <Row data-tap="row" tile={<Initial letter="M" />} title="Mona Khaled" sub="Monthly plan" right={<Status>Active</Status>} />
              <div data-res className="overflow-hidden">
                <Row tile={<Initial letter="M" />} title="Moustafa Ali" sub="10-class pack" right={<Status tone="red">Expired</Status>} />
              </div>
              <div data-res className="overflow-hidden">
                <Row tile={<Initial letter="S" />} title="Sara Mostafa" sub="Drop-in pass" right={<Status tone="muted">Frozen</Status>} />
              </div>
            </div>
          </div>

          <div data-layer="record" className="col-start-1 row-start-1 opacity-0">
            <div className="flex items-center gap-3">
              <span className="grid size-14 shrink-0 place-items-center rounded-[16px] bg-primary-tint-strong text-[22px] font-bold text-primary-pressed">M</span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[18px] font-bold leading-tight tracking-[-.01em]">Mona Khaled</p>
                <p className="mt-1 text-[14px] text-ink-muted">01012345678</p>
              </div>
              <span className="text-[14px]">
                <Status>Active</Status>
              </span>
            </div>
            <div className="mt-4">
              <Table
                rows={[
                  ["Plan", "Monthly plan"],
                  ["Renews", <Swap key="r" name="renews" a="Nov 16" b="Dec 16" className="justify-items-end" />],
                  ["Wallet", "250.00 EGP"],
                  ["Last check-in", <Swap key="c" name="seen" a="Yesterday" b="Today, 6:02 PM" className="justify-items-end" />],
                ]}
              />
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              <MiniButton data-tap="checkin">
                <Swap name="checkin" a="Check in" b={<span className="inline-flex items-center gap-1 text-green-fg"><Tick size={14} />Checked in</span>} />
              </MiniButton>
              <MiniButton data-tap="renew">
                <Swap name="renew" a="Renew" b={<span className="inline-flex items-center gap-1 text-green-fg"><Tick size={14} />Renewed</span>} />
              </MiniButton>
              <MiniButton>
                <Icon name="snowflake" size={16} />
                <span className="ml-1.5">Freeze</span>
              </MiniButton>
            </div>
          </div>
        </div>
      </Card>
    </Stage>
  );
}

/* ---------- Coaches: a wallet of this month's earnings ---------- */
export function CoachDemo() {
  return (
    <Stage>
      <Card>
        <div className="relative pt-3">
          <span aria-hidden className="absolute inset-x-5 top-0 h-24 rounded-[20px] bg-primary-pressed/35" />
          <div className="relative overflow-hidden rounded-[20px] p-5 text-white" style={{ background: "linear-gradient(135deg,#7a63ff 0%,#5a41ff 48%,#3d28c4 100%)" }}>
            <span aria-hidden className="absolute -right-12 -top-14 size-48 rounded-full bg-white/10" />
            <span aria-hidden className="absolute -bottom-20 right-10 size-44 rounded-full bg-white/[.07]" />
            <div className="relative flex items-center justify-between text-[14px]">
              <span className="text-white/75">Earned this month</span>
              <span className="rounded-full bg-white/15 px-2.5 py-1 text-[12px] font-semibold">October</span>
            </div>
            <p className="tabular relative mt-3 text-[42px] font-bold leading-none tracking-[-.03em]">
              <span data-count>4,500.00</span> <span className="text-[15px] font-medium tracking-normal text-white/75">EGP</span>
            </p>
            <div className="relative mt-5 flex items-center justify-between gap-3 text-[13px] text-white/80">
              <span>Senior tier · 300 EGP each</span>
              <Swap
                name="paid"
                className="justify-items-end whitespace-nowrap"
                a="Payout Nov 2"
                b={
                  <span className="inline-flex items-center gap-1 font-semibold text-white">
                    <Tick size={14} />
                    Paid Nov 2
                  </span>
                }
              />
            </div>
          </div>
        </div>

        <Label className="mt-5">Sessions</Label>
        <div className="space-y-2">
          <div data-grow data-new className="overflow-hidden">
            <Row tile={<IconTile name="qr-code" />} title="Strength class" sub="Fri 17 · scanned 6:02 PM" right={<span className="text-[14px] font-semibold text-green-fg">+300</span>} />
            <div className="h-2" />
          </div>
          <Row tile={<IconTile name="qr-code" />} title="Strength class" sub="Thu 16 · scanned 5:58 PM" right={<span className="text-[14px] font-semibold text-green-fg">+300</span>} />
          <Row tile={<IconTile name="qr-code" />} title="Yoga" sub="Wed 15 · scanned 5:01 PM" right={<span className="text-[14px] font-semibold text-green-fg">+300</span>} />
        </div>
      </Card>
    </Stage>
  );
}

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

