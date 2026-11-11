import { Icon } from "./Icon";

/**
 * The Replay pill that sits in the corner of every scripted demo panel. It carries `data-replay`;
 * the demo's motion module listens for it (see motion/primitives.ts replay()). Hidden for
 * visitors who prefer reduced motion, since nothing plays.
 */
export function ReplayButton({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      data-replay
      data-sq
      className={`inline-flex h-10 items-center gap-2 [--sq-r:14px] [--sq-fill:var(--color-surface)] [--sq-stroke:var(--color-line)] [--sq-sw:1px] [--sq-drop:var(--drop-card)] hover:[--sq-fill:var(--color-paper)] px-3.5 text-[15px] font-semibold text-ink transition-transform duration-(--dur-fast) ease-standard active:scale-95 motion-reduce:hidden ${className}`}
    >
      <Icon name="restart" size={18} />
      Replay
    </button>
  );
}
