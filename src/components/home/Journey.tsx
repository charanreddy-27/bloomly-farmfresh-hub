import { animate, motion, useInView, useMotionValue, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useLayoutEffect, useRef } from "react";
import HeroFilm from "@/components/home/HeroFilm";
import { SplitText } from "@/components/motion/SplitText";
import { hero } from "@/lib/content";
import { EASE_PREMIUM } from "@/lib/motion";

/**
 * The film, on its own: plays the moment it scrolls into view, full-bleed,
 * in one normal viewport — no pinning, no scroll-scrubbing. Triggers while
 * the section is still entering (not once it's already mostly on screen),
 * and resolves to its connected state within about a second — this isn't
 * meant to make anyone wait.
 */
export default function Journey() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.1, once: true, margin: "0px 0px 20% 0px" });

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const w = useMotionValue(0);
  const h = useMotionValue(0);
  const radius = useMotionValue(0);
  const filmOpacity = useMotionValue(reduce ? 1 : 0);
  const uiOpacity = useMotionValue(1);
  const shade = useMotionValue(reduce ? 1 : 0);
  const settle = useMotionValue(reduce ? 1 : 0);

  // A quiet depth cue: the ambient glow drifts slower than the page scrolls past it.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const glowY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  useLayoutEffect(() => {
    const el = sectionRef.current;
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
    if (!inView || reduce) return;
    const fadeIn = animate(filmOpacity, 1, { duration: 0.6, ease: EASE_PREMIUM });
    const fadeUi = animate(uiOpacity, 0, { duration: 0.5, delay: 0.4, ease: EASE_PREMIUM });
    const fadeShade = animate(shade, 1, { duration: 0.7, delay: 0.55, ease: EASE_PREMIUM });
    const resolve = animate(settle, 1, { duration: 0.75, delay: 0.15, ease: EASE_PREMIUM });
    return () => {
      fadeIn.stop();
      fadeUi.stop();
      fadeShade.stop();
      resolve.stop();
    };
  }, [inView, reduce, filmOpacity, uiOpacity, shade, settle]);

  return (
    <section
      ref={sectionRef}
      data-snap-section
      className="relative h-[100svh] min-h-[560px] overflow-hidden bg-forest-800"
      aria-label="The Bloomly story"
    >
      {/* Ambient backdrop — visible the instant this section mounts, so there's never a blank beat before the canvas draws */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(70% 60% at 50% 40%, rgba(139,181,94,0.16), transparent 72%)", y: reduce ? undefined : glowY }}
        aria-hidden
      />

      <motion.div style={{ opacity: filmOpacity }} className="absolute inset-0">
        <HeroFilm rect={{ x, y, w, h, radius }} uiOpacity={uiOpacity} settle={settle} ready={inView} />
      </motion.div>

      <motion.div
        className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-forest-900 via-forest-900/45 to-transparent"
        style={{ opacity: shade }}
      >
        <div className="container pb-[9vh]">
          <SplitText as="p" text={hero.reveal} play={reduce ? true : inView} delay={reduce ? 0 : 1.4} stagger={0.06} className="display-xl max-w-4xl text-cream" />
          <motion.p
            className="mt-4 max-w-md text-lg text-cream/70"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.8, ease: EASE_PREMIUM, delay: reduce ? 0 : 1.8 }}
          >
            {hero.revealSub}
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}
