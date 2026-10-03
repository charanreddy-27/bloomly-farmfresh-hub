import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, CalendarCheck, Handshake, Scale, ShieldCheck, Sparkles, Store, Tractor, Wallet, type LucideIcon } from "lucide-react";
import { useState } from "react";
import { ChapterLabel } from "@/components/site/ChapterLabel";
import { Magnetic } from "@/components/motion/Magnetic";
import { Marked, SplitText } from "@/components/motion/SplitText";
import { audiences, type AudienceKey } from "@/lib/content";
import { EASE_OUT } from "@/lib/motion";
import { useGoToSection } from "@/lib/scroll";
import { cn } from "@/lib/utils";

const ICONS: Record<string, LucideIcon> = {
  tractor: Tractor,
  scale: Scale,
  wallet: Wallet,
  handshake: Handshake,
  calendar: CalendarCheck,
  shield: ShieldCheck,
  store: Store,
  sparkles: Sparkles,
};

const KEYS: AudienceKey[] = ["farmers", "businesses"];

export default function TwoSides() {
  const [key, setKey] = useState<AudienceKey>("farmers");
  const goTo = useGoToSection();
  const a = audiences[key];

  return (
    <section id="value" className="relative bg-cream py-28 md:py-40">
      <div className="container">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <ChapterLabel number="04" label="The value" />
            <SplitText text="Built for *both ends* of the chain." className="display-lg mt-6 max-w-3xl text-forest" accentClassName="accent-italic text-leaf-600" />
          </div>

          <div role="tablist" aria-label="Choose your side" className="inline-flex self-start rounded-full border border-forest/15 bg-white p-1.5 shadow-sm lg:self-auto">
            {KEYS.map((k) => (
              <button
                key={k}
                type="button"
                role="tab"
                aria-selected={key === k}
                aria-controls="audience-panel"
                onClick={() => setKey(k)}
                className="relative rounded-full px-5 py-2.5 text-sm font-semibold md:px-7 md:py-3 md:text-base"
              >
                {key === k && (
                  <motion.span layoutId="audience-pill" className="absolute inset-0 rounded-full bg-forest" transition={{ type: "spring", stiffness: 420, damping: 34 }} />
                )}
                <span className={cn("relative z-10 transition-colors duration-300", key === k ? "text-cream" : "text-forest/70 hover:text-forest")}>
                  {audiences[k].tab}
                </span>
              </button>
            ))}
          </div>
        </div>

        <motion.div
          id="audience-panel"
          role="tabpanel"
          className="mt-12 grid overflow-hidden rounded-[1.5rem] bg-white shadow-[0_30px_80px_-50px_rgba(7,38,26,0.3)] ring-1 ring-forest/[0.06] md:mt-16 md:rounded-[1.75rem] lg:grid-cols-[1fr_1.15fr]"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, ease: EASE_OUT }}
        >
          {/* Story panel */}
          <div className="relative flex min-h-[26rem] flex-col overflow-hidden bg-forest p-8 text-cream md:p-12">
            <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 [background:radial-gradient(closest-side,rgba(139,181,94,0.28),transparent)]" aria-hidden />
            <AnimatePresence mode="wait">
              <motion.div
                key={key}
                className="relative z-10 flex flex-1 flex-col"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.5, ease: EASE_OUT }}
              >
                <p className="eyebrow text-leaf">{a.tab}</p>
                <h3 className="display-md mt-5 max-w-md">
                  <Marked text={a.headline} />
                </h3>
                <p className="mt-5 max-w-md leading-relaxed text-cream/70 md:text-lg">{a.body}</p>
                <div className="mt-auto pt-10">
                  <Magnetic>
                    <button type="button" onClick={() => goTo("contact", a.role)} className="btn-leaf group">
                      {a.cta}
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-out-expo group-hover:rotate-45" />
                    </button>
                  </Magnetic>
                </div>
              </motion.div>
            </AnimatePresence>

          </div>

          {/* Benefits */}
          <div className="grid gap-px bg-forest/10 sm:grid-cols-2">
            {a.benefits.map((b, i) => {
              const Icon = ICONS[b.icon];
              return (
                <div key={i} className="group relative overflow-hidden bg-white p-7 md:p-10">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${key}-${i}`}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.45, ease: EASE_OUT, delay: 0.08 * i }}
                    >
                      <Icon className="h-6 w-6 text-leaf-600" strokeWidth={1.25} />
                      <h4 className="mt-7 font-display text-[1.6rem] leading-tight text-forest">{b.title}</h4>
                      <p className="mt-2 text-ink-soft">{b.body}</p>
                    </motion.div>
                  </AnimatePresence>
                  <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-forest transition-transform duration-700 ease-premium group-hover:scale-x-100" />
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
