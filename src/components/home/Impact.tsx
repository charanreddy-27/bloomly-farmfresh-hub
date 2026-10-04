import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { Handshake, Repeat2, Truck, type LucideIcon } from "lucide-react";
import { useRef } from "react";
import { ChapterLabel } from "@/components/site/ChapterLabel";
import { CountUp } from "@/components/motion/CountUp";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { impact } from "@/lib/content";
import { EASE_OUT } from "@/lib/motion";

const ICONS: LucideIcon[] = [Truck, Handshake, Repeat2];

function StatCard({ value, suffix, label, Icon, delay }: { value: number; suffix: string; label: string; Icon: LucideIcon; delay: number }) {
  return (
    <motion.div
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-7 transition-colors duration-500 hover:bg-white/[0.06] md:p-8"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.9, ease: EASE_OUT, delay }}
    >
      <span className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-leaf">
        <Icon className="h-4 w-4" strokeWidth={1.5} />
      </span>
      <p className="mt-6 font-display text-[clamp(2.5rem,3.6vw,3.25rem)] leading-none tracking-[-0.01em] text-cream">
        <CountUp value={value} />
        <span className="text-leaf">{suffix}</span>
      </p>
      <motion.span
        className="mt-5 block h-px w-10 origin-left bg-leaf/50"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: EASE_OUT, delay: delay + 0.25 }}
      />
      <p className="mt-5 max-w-[15rem] text-cream/65">{label}</p>
    </motion.div>
  );
}

export default function Impact() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const mx = useSpring(useMotionValue(50), { stiffness: 80, damping: 20 });
  const my = useSpring(useMotionValue(40), { stiffness: 80, damping: 20 });
  const spotlight = useMotionTemplate`radial-gradient(600px circle at ${mx}% ${my}%, rgba(139,181,94,0.16), transparent 60%)`;

  // The spotlight drifts a little slower than the page scrolls — the same quiet depth cue as the hero and the story section.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const spotlightY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 100);
    my.set(((e.clientY - r.top) / r.height) * 100);
  };

  return (
    <section ref={sectionRef} id="impact" className="relative overflow-hidden bg-forest-800 py-28 text-cream md:py-40" onPointerMove={onMove}>
      <motion.div className="pointer-events-none absolute inset-0" style={{ background: spotlight, y: reduce ? undefined : spotlightY }} aria-hidden />
      <div className="container relative">
        <ChapterLabel number="05" label="The proof" dark />
        <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SplitText text={impact.headline} className="display-lg text-cream" />
          <Reveal delay={0.2}>
            <p className="max-w-sm text-lg text-cream/60">{impact.sub}</p>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-4 border-t border-white/10 pt-10 sm:grid-cols-3 md:mt-14 md:pt-12">
          {impact.metrics.map((m, i) => (
            <StatCard key={m.label} value={m.value} suffix={m.suffix} label={m.label} Icon={ICONS[i]} delay={i * 0.12} />
          ))}
        </div>

        <Reveal className="mt-14 md:mt-20">
          <p className="accent-italic max-w-3xl text-balance text-2xl leading-snug text-cream/80 md:text-[2rem]">“{impact.closer}”</p>
        </Reveal>
      </div>
    </section>
  );
}
