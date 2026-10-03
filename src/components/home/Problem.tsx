import { motion } from "framer-motion";
import { Sprout, Store, type LucideIcon } from "lucide-react";
import { ChapterLabel } from "@/components/site/ChapterLabel";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { problem } from "@/lib/content";
import { EASE_PREMIUM } from "@/lib/motion";

function EndNode({ icon: Icon, label, delay }: { icon: LucideIcon; label: string; delay: number }) {
  return (
    <motion.div
      className="relative z-10 flex shrink-0 flex-col items-center gap-3"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.9, ease: EASE_PREMIUM, delay }}
    >
      <span className="grid h-12 w-12 place-items-center rounded-full border border-forest/20 bg-cream-50 text-forest md:h-14 md:w-14">
        <Icon className="h-5 w-5" strokeWidth={1.25} />
      </span>
      <span className="eyebrow text-forest/80">{label}</span>
    </motion.div>
  );
}

/** Two hairlines set out from farm and shelf, and stop short of each other. */
function BrokenChain() {
  const segment = (side: "left" | "right") => (
    <motion.div
      className="absolute top-6 h-px w-[calc(50%-3rem)] bg-forest/45 md:top-7 md:w-[calc(50%-6rem)]"
      style={{ [side]: 0, originX: side === "left" ? 0 : 1 }}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 1.6, ease: EASE_PREMIUM, delay: 0.25 }}
    >
      <span className="absolute top-[-2.5px] h-1.5 w-1.5 rounded-full bg-forest" style={{ [side === "left" ? "right" : "left"]: -3 }} />
    </motion.div>
  );

  return (
    <div className="relative mt-16 md:mt-24">
      <div className="relative flex items-start justify-between">
        <EndNode icon={Sprout} label={problem.farmers.title} delay={0.05} />
        <div className="pointer-events-none absolute inset-x-12 top-0 md:inset-x-14">
          {segment("left")}
          {segment("right")}
          <motion.div
            className="absolute inset-x-[calc(50%-3rem)] top-6 border-t border-dashed border-forest/20 md:inset-x-[calc(50%-6rem)] md:top-7"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 1, delay: 1.5 }}
          />
          <div className="absolute left-1/2 top-9 -translate-x-1/2 md:top-10">
            <motion.p
              className="whitespace-nowrap font-display text-base italic text-ink-muted md:text-xl"
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 0.9, ease: EASE_PREMIUM, delay: 1.6 }}
            >
              the broken middle
            </motion.p>
          </div>
        </div>
        <EndNode icon={Store} label={problem.businesses.title} delay={0.15} />
      </div>
    </div>
  );
}

function PainList({ title, pains }: { title: string; pains: { title: string; body: string }[] }) {
  return (
    <div>
      <Reveal>
        <p className="eyebrow text-ink-muted">What {title.toLowerCase()} face</p>
      </Reveal>
      <ul className="mt-6 border-b border-forest/10">
        {pains.map((p, i) => (
          <motion.li
            key={p.title}
            className="grid grid-cols-[2.25rem_1fr] gap-x-4 border-t border-forest/10 py-6 md:grid-cols-[3rem_1fr]"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.9, ease: EASE_PREMIUM, delay: i * 0.08 }}
          >
            <span className="pt-1.5 text-xs font-medium tabular-nums tracking-[0.12em] text-leaf-600">0{i + 1}</span>
            <div>
              <h3 className="font-display text-[1.6rem] leading-tight text-forest">{p.title}</h3>
              <p className="mt-1.5 max-w-md text-ink-soft">{p.body}</p>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

export default function Problem() {
  return (
    <section id="problem" className="relative bg-cream py-28 md:py-40">
      <div className="container">
        <ChapterLabel number="01" label="The problem" />
        <div className="mt-6 grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
          <SplitText text={problem.headline} className="display-lg text-forest lg:col-span-7" accentClassName="accent-italic text-leaf-600" stagger={0.035} />
          <Reveal delay={0.2} className="lg:col-span-5">
            <p className="text-[1.0625rem] leading-relaxed text-ink-soft md:text-lg">{problem.intro}</p>
          </Reveal>
        </div>

        <BrokenChain />

        <div className="mt-20 grid gap-14 md:mt-24 md:grid-cols-2 md:gap-16 lg:gap-24">
          <PainList title={problem.farmers.title} pains={problem.farmers.pains} />
          <PainList title={problem.businesses.title} pains={problem.businesses.pains} />
        </div>
      </div>
    </section>
  );
}
