import { motion, type Variants } from "framer-motion";
import { Fragment, useMemo } from "react";
import { BloomlyLogo } from "@/components/brand/BloomlyLogo";
import { ChapterLabel } from "@/components/site/ChapterLabel";
import { Reveal } from "@/components/motion/Reveal";
import { parseMarked } from "@/components/motion/SplitText";
import { mission } from "@/lib/content";
import { EASE_OUT } from "@/lib/motion";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.035, delayChildren: 0.1 } },
};
const word: Variants = {
  hidden: { opacity: 0.16, y: 4 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

/** The mission statement lights up word by word as it scrolls into view — once, not scroll-scrubbed. */
export default function Mission() {
  const lines = useMemo(() => parseMarked(mission.statement), []);

  return (
    <section id="mission" className="relative overflow-hidden bg-forest-800 py-28 text-cream md:py-40">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[80vh] w-[80vh] -translate-x-1/2 -translate-y-1/2 [background:radial-gradient(closest-side,rgba(139,181,94,0.13),transparent)]" aria-hidden />
      <div className="pointer-events-none absolute -right-[6%] top-1/2 hidden w-[34vw] max-w-[520px] -translate-y-1/2 opacity-[0.07] lg:block" aria-hidden>
        <BloomlyLogo mark />
      </div>

      <div className="container relative z-10">
        <ChapterLabel number="02" label="The mission" dark />
        <Reveal>
          <p className="accent-italic mt-8 text-xl text-leaf md:text-2xl">{mission.lead}</p>
        </Reveal>

        <motion.p
          className="display-md mt-6 max-w-5xl text-balance md:text-[clamp(2rem,3.5vw,3.4rem)] md:leading-[1.12]"
          aria-label={mission.statement.replace(/\*/g, "")}
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
        >
          {lines.map((line, li) => (
            <span key={li} className="block" aria-hidden>
              {line.map((t, wi) => (
                <Fragment key={wi}>
                  <motion.span variants={word} className="inline-block">
                    {t.parts.map((p, pi) => (
                      <span key={pi} className={p.accent ? "accent-italic text-leaf" : undefined}>
                        {p.text}
                      </span>
                    ))}
                  </motion.span>
                  {wi < line.length - 1 && " "}
                </Fragment>
              ))}
            </span>
          ))}
        </motion.p>
      </div>
    </section>
  );
}
