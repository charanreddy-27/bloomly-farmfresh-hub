import { VelocityMarquee } from "@/components/motion/VelocityMarquee";
import { ticker } from "@/lib/content";

/** A quiet band of the model's keywords, continuing the hero's dark surface. */
export default function Ticker() {
  const items = [...ticker, ...ticker];
  return (
    <div className="border-y border-white/10 bg-forest-800 py-5" aria-label={ticker.join(", ")}>
      <VelocityMarquee baseVelocity={-0.9}>
        {items.map((t, i) => (
          <span key={i} className="flex items-center whitespace-nowrap text-[0.75rem] font-medium uppercase tracking-[0.24em] text-cream/55" aria-hidden>
            {t}
            <span className="mx-8 h-1 w-1 rounded-full bg-leaf/70 md:mx-12" />
          </span>
        ))}
      </VelocityMarquee>
    </div>
  );
}
