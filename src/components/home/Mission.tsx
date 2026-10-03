import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useMemo, useRef } from "react";
import { BloomlyLogo } from "@/components/brand/BloomlyLogo";
import { ChapterLabel } from "@/components/site/ChapterLabel";
import { parseMarked } from "@/components/motion/SplitText";
import { mission } from "@/lib/content";

function Word({ parts, progress, range }: { parts: { text: string; accent: boolean }[]; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  const y = useTransform(progress, range, [6, 0]);
  return (
    <motion.span style={{ opacity, y }} className="inline-block">
      {parts.map((p, i) => (
        <span key={i} className={p.accent ? "accent-italic text-leaf" : undefined}>
          {p.text}
        </span>
      ))}
    </motion.span>
  );
}

/** The mission statement lights up word by word as you scroll through it. */
export default function Mission() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const words = useMemo(() => parseMarked(mission.statement).flat(), []);

  const start = 0.08;
  const end = 0.78;
  const step = (end - start) / words.length;

  return (
    <section
      id="mission"
      ref={ref}
      className="relative bg-forest-800 text-cream"
      style={{ height: reduce ? "auto" : "260vh" }}
    >
      <div className={reduce ? "relative py-32" : "sticky top-0 flex h-[100svh] items-center overflow-hidden"}>
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[80vh] w-[80vh] -translate-x-1/2 -translate-y-1/2 [background:radial-gradient(closest-side,rgba(139,181,94,0.13),transparent)]" aria-hidden />
        <div className="pointer-events-none absolute -right-[6%] top-1/2 hidden w-[34vw] max-w-[520px] -translate-y-1/2 opacity-[0.07] lg:block" aria-hidden>
          <BloomlyLogo mark />
        </div>

        <div className="container relative z-10">
          <ChapterLabel number="02" label="The mission" dark />
          <p className="accent-italic mt-8 text-xl text-leaf md:text-2xl">{mission.lead}</p>
          <p className="display-md mt-6 max-w-5xl text-balance md:text-[clamp(2rem,3.5vw,3.4rem)] md:leading-[1.12]" aria-label={mission.statement.replace(/\*/g, "")}>
            {words.map((w, i) => (
              <span key={i} aria-hidden>
                <Word parts={w.parts} progress={scrollYProgress} range={reduce ? [-1, 0] : [start + i * step, start + (i + 1) * step]} />{" "}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
