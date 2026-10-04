import { animate, motion, useMotionValue, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useEffect, useLayoutEffect, useRef } from "react";
import HeroFilm from "@/components/home/HeroFilm";
import { Magnetic } from "@/components/motion/Magnetic";
import { SplitText } from "@/components/motion/SplitText";
import { useIntroReady } from "@/components/site/Intro";
import { hero, partners } from "@/lib/content";
import { EASE_PREMIUM } from "@/lib/motion";
import { useGoToSection } from "@/lib/scroll";

/**
 * The opening statement, paired with a live, framed preview of the network
 * it describes — not just a headline on a blurred gradient. The hero uses
 * Lenis snap plus a restrained depth shift to make the first scroll feel intentional.
 */
export default function Hero() {
  const ready = useIntroReady();
  const reduce = useReducedMotion();
  const goTo = useGoToSection();
  const sectionRef = useRef<HTMLElement>(null);

  // The foreground moves faster than the ambient field, creating a gentle
  // depth shift while Lenis handles the section snap.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-24%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.25]);
  const contentScale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);
  const glowY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  const rise = (delay: number) => ({
    initial: { opacity: 0, y: 18, filter: "blur(8px)" },
    animate: ready ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined,
    transition: { duration: 1.1, ease: EASE_PREMIUM, delay },
  });

  return (
    <section
      ref={sectionRef}
      data-snap-section
      data-parallax-section
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-forest-800 px-5 pb-12 md:pb-0"
      aria-label="Introduction"
    >
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(55% 50% at 20% 25%, rgba(139,181,94,0.16), transparent 70%)",
          y: reduce ? undefined : glowY,
        }}
        aria-hidden
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : undefined}
        transition={{ duration: 2.4, ease: EASE_PREMIUM, delay: 0.3 }}
        style={{ y: reduce ? undefined : glowY }}
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden
      >
        <motion.span
          className="absolute -left-[14%] top-[10%] h-[42vh] w-[42vh] rounded-full bg-leaf/[0.1] blur-[110px]"
          animate={{ x: [0, 24, 0], y: [0, -16, 0] }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.span
          className="absolute -right-[10%] bottom-[8%] h-[46vh] w-[46vh] rounded-full bg-citrus/[0.08] blur-[120px]"
          animate={{ x: [0, -20, 0], y: [0, 18, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </motion.div>

      <motion.div
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity, scale: contentScale }}
        className="container relative -top-6 grid items-center gap-8 pt-[var(--header-h)] lg:grid-cols-[1.05fr_1fr] lg:gap-14 xl:gap-20"
      >
        <div className="text-center lg:text-left">
          <SplitText
            as="h1"
            text={hero.headline}
            play={ready}
            delay={0.1}
            stagger={0.045}
            className="display-xl mx-auto mt-6 max-w-xl text-cream md:mt-7 lg:mx-0"
          />

          <motion.p {...rise(0.5)} className="mx-auto mt-6 max-w-[32rem] text-lg leading-relaxed text-cream/65 md:mt-7 lg:mx-0">
            {hero.sub}
          </motion.p>

          <motion.div {...rise(0.62)} className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 md:mt-10 lg:justify-start">
            <Magnetic>
              <button type="button" onClick={() => goTo("contact", "retailer")} className="btn-leaf group">
                Source fruit with us
                <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-premium group-hover:rotate-45" strokeWidth={1.75} />
              </button>
            </Magnetic>
            <button
              type="button"
              onClick={() => goTo("contact", "farmer")}
              className="group inline-flex items-center gap-1.5 text-[0.9375rem] font-medium text-cream/70 transition-colors duration-300 hover:text-cream"
            >
              I'm a farmer
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 ease-premium group-hover:rotate-45" strokeWidth={1.75} />
            </button>
          </motion.div>

          <motion.p {...rise(0.78)} className="mx-auto mt-10 text-sm text-cream/40 lg:mx-0">
            Trusted by {partners.logos.slice(0, 4).map((p) => p.name).join(", ")} and more.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={ready ? { opacity: 1, y: 0, scale: 1 } : undefined}
          transition={{ duration: 1.2, ease: EASE_PREMIUM, delay: 0.5 }}
          className="hidden lg:block"
        >
          <LiveDiagram ready={ready} />
        </motion.div>
      </motion.div>

      <motion.div
        style={reduce ? undefined : { opacity: cueOpacity }}
        className="absolute inset-x-0 bottom-7 md:bottom-9"
        aria-hidden
      >
        <motion.div {...rise(1.1)} className="flex flex-col items-center gap-2 text-cream/40">
          <span className="text-[0.625rem] font-medium uppercase tracking-[0.3em]">Scroll</span>
          <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
            <ArrowDown className="h-4 w-4" strokeWidth={1.5} />
          </motion.span>
        </motion.div>
      </motion.div>
    </section>
  );
}

/** A framed, looping glimpse of the same network the headline describes — the full-bleed telling comes later. */
function LiveDiagram({ ready }: { ready: boolean }) {
  const reduce = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const w = useMotionValue(0);
  const h = useMotionValue(0);
  const radius = useMotionValue(28);
  const uiOpacity = useMotionValue(0);
  const settle = useMotionValue(reduce ? 1 : 0);

  useLayoutEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    const measure = () => {
      const r = el.getBoundingClientRect();
      w.set(r.width);
      h.set(r.height);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [h, w]);

  useEffect(() => {
    if (!ready || reduce) return;
    const controls = animate(settle, 1, { duration: 1, delay: 0.6, ease: EASE_PREMIUM });
    return () => controls.stop();
  }, [ready, reduce, settle]);

  return (
    <div
      ref={panelRef}
      className="pointer-events-none relative aspect-[6/5] w-full overflow-hidden rounded-[1.75rem] border border-white/10 shadow-[0_50px_90px_-35px_rgba(2,12,8,0.7)]"
    >
      <HeroFilm rect={{ x, y, w, h, radius }} uiOpacity={uiOpacity} settle={settle} ready={ready} />
      <div className="absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/10" />
    </div>
  );
}
