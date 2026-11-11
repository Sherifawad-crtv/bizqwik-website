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
      className={`inline-flex h-10 items-center gap-2 rounded-[14px] border border-line bg-surface px-3.5 text-[15px] font-semibold text-ink shadow-card transition-[transform,background-color] hover:bg-paper duration-(--dur-fast) ease-standard active:scale-95 motion-reduce:hidden ${className}`}
    >
      <Icon name="restart" size={18} />
      Replay
    </button>
  );
}
