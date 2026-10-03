import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { ChapterLabel } from "@/components/site/ChapterLabel";
import { CountUp } from "@/components/motion/CountUp";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { impact } from "@/lib/content";
import { EASE_OUT } from "@/lib/motion";

export default function Impact() {
  const mx = useSpring(useMotionValue(50), { stiffness: 80, damping: 20 });
  const my = useSpring(useMotionValue(40), { stiffness: 80, damping: 20 });
  const spotlight = useMotionTemplate`radial-gradient(600px circle at ${mx}% ${my}%, rgba(139,181,94,0.16), transparent 60%)`;

  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 100);
    my.set(((e.clientY - r.top) / r.height) * 100);
  };

  return (
    <section id="impact" className="relative overflow-hidden bg-forest-800 py-28 text-cream md:py-40" onPointerMove={onMove}>
      <motion.div className="pointer-events-none absolute inset-0" style={{ background: spotlight }} aria-hidden />
      <div className="container relative">
        <ChapterLabel number="05" label="The proof" dark />
        <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SplitText text={impact.headline} className="display-lg text-cream" />
          <Reveal delay={0.2}>
            <p className="max-w-sm text-lg text-cream/60">{impact.sub}</p>
          </Reveal>
        </div>

        <div className="mt-16 grid border-t border-white/10 md:mt-24 md:grid-cols-3">
          {impact.metrics.map((m, i) => (
            <motion.div
              key={m.label}
              className="group relative border-b border-white/10 py-10 md:border-b-0 md:border-r md:px-8 md:py-14 md:first:pl-0 md:last:border-r-0"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1, ease: EASE_OUT, delay: i * 0.12 }}
            >
              <p className="font-display text-[clamp(3.25rem,5.6vw,5.25rem)] leading-none tracking-[-0.01em]">
                <CountUp value={m.value} />
                <span className="text-leaf">{m.suffix}</span>
              </p>
              <motion.div
                className="mt-6 h-px w-12 origin-left bg-leaf"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: EASE_OUT, delay: 0.4 + i * 0.12 }}
              />
              <p className="mt-4 max-w-[15rem] text-cream/65">{m.label}</p>
            </motion.div>
          ))}
        </div>

        <Reveal className="mt-20 md:mt-28">
          <p className="accent-italic max-w-3xl text-balance text-2xl leading-snug text-cream/80 md:text-[2rem]">“{impact.closer}”</p>
        </Reveal>
      </div>
    </section>
  );
}
