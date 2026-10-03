import { animate, motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import HeroFilm from "@/components/home/HeroFilm";
import { Magnetic } from "@/components/motion/Magnetic";
import { SplitText } from "@/components/motion/SplitText";
import { useIntroReady } from "@/components/site/Intro";
import { hero } from "@/lib/content";
import { EASE_PREMIUM } from "@/lib/motion";
import { useGoToSection } from "@/lib/scroll";

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const RADIUS = 20;

/**
 * Headline on deep green, with the Bloomly film framed below it.
 * On scroll the frame opens to full-bleed and the opening line of the story appears.
 */
export default function Hero() {
  const ready = useIntroReady();
  const reduce = useReducedMotion();
  const goTo = useGoToSection();

  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  // Where the frame sits at rest, measured from the layout (px, relative to the pinned viewport)
  const rest = useRef({ x: 0, y: 0, w: 0, h: 0, vw: 0, vh: 0 });

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const entrance = useMotionValue(reduce ? 1 : 0);

  // The film's live rectangle: drives the clip, the canvas layout and the frame chrome together.
  const fx = useMotionValue(0);
  const fy = useMotionValue(0);
  const fw = useMotionValue(0);
  const fh = useMotionValue(0);
  const radius = useMotionValue(RADIUS);
  const clipPath = useMotionValue("inset(100% 0% 0% 0%)");
  // the film composes itself in a slightly shorter box once full-bleed, leaving room for the headline below it
  const filmH = useMotionValue(0);

  const update = useCallback(() => {
    const r = rest.current;
    if (!r.vw) return;
    const e = reduce ? 0 : easeInOut(clamp01(scrollYProgress.get() / 0.5));
    const open = entrance.get();
    const x = lerp(r.x, 0, e);
    const w = lerp(r.w, r.vw, e);
    const bottom = lerp(r.y + r.h, r.vh, e);
    const top = lerp(lerp(r.y + r.h, r.y, open), 0, e); // rises open on load, then expands on scroll
    const rad = lerp(RADIUS, 0, e);
    fx.set(x);
    fy.set(top);
    fw.set(w);
    fh.set(Math.max(0, bottom - top));
    filmH.set(Math.max(0, bottom - top) * lerp(1, 0.74, e));
    radius.set(rad);
    clipPath.set(`inset(${top}px ${r.vw - x - w}px ${r.vh - bottom}px ${x}px round ${rad}px)`);
  }, [clipPath, entrance, filmH, fh, fw, fx, fy, radius, reduce, scrollYProgress]);

  useLayoutEffect(() => {
    const measure = () => {
      const st = stickyRef.current?.getBoundingClientRect();
      const fr = frameRef.current?.getBoundingClientRect();
      if (!st || !fr || !st.height) return;
      rest.current = { x: fr.left - st.left, y: fr.top - st.top, w: fr.width, h: fr.height, vw: st.width, vh: st.height };
      update();
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (stickyRef.current) ro.observe(stickyRef.current);
    if (frameRef.current) ro.observe(frameRef.current);
    return () => ro.disconnect();
  }, [update]);

  useMotionValueEvent(scrollYProgress, "change", update);
  useMotionValueEvent(entrance, "change", update);

  useEffect(() => {
    if (!ready || reduce) return;
    const controls = animate(entrance, 1, { duration: 1.5, ease: EASE_PREMIUM, delay: 0.5 });
    return () => controls.stop();
  }, [ready, reduce, entrance]);

  const contentY = useTransform(scrollYProgress, [0, 0.4], ["0%", "-30%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.26], [1, 0]);
  const filmUi = useTransform(scrollYProgress, [0.12, 0.3], [1, 0]);
  const shade = useTransform(scrollYProgress, [0.32, 0.6], [0, 1]);
  const settle = useTransform(scrollYProgress, [0.06, 0.34], [0, 1]);
  const always = useMotionValue(1); // reduced motion: the hero has no scroll range, so keep the caption visible

  const [showCaption, setShowCaption] = useState(false);
  useMotionValueEvent(scrollYProgress, "change", (p) => setShowCaption(p > 0.48));

  const rise = (delay: number) => ({
    initial: { opacity: 0, y: 18, filter: "blur(8px)" },
    animate: ready ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined,
    transition: { duration: 1.1, ease: EASE_PREMIUM, delay },
  });

  return (
    <section ref={sectionRef} className="relative bg-forest-800" style={{ height: reduce ? "100svh" : "250vh" }} aria-label="Introduction">
      <div ref={stickyRef} className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
        {/* Headline block */}
        <motion.div
          className="container relative z-10 pt-[calc(var(--header-h)+1.25rem)] [@media(min-height:780px)]:pt-[calc(var(--header-h)+3rem)]"
          style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
        >
          <motion.p {...rise(0)} className="eyebrow text-cream/55">
            <span className="h-1 w-1 rounded-full bg-leaf" />
            {hero.eyebrow}
          </motion.p>

          <SplitText as="h1" text={hero.headline} play={ready} delay={0.1} stagger={0.045} className="display-xl mt-5 max-w-5xl text-cream md:mt-6" />

          <motion.div {...rise(0.55)} className="mt-6 flex flex-col gap-6 md:mt-7 lg:flex-row lg:items-end lg:justify-between">
            <p className="max-w-[34rem] text-[1.0625rem] leading-relaxed text-cream/65">{hero.sub}</p>
            <div className="flex flex-wrap gap-3">
              <Magnetic>
                <button type="button" onClick={() => goTo("contact", "retailer")} className="btn-leaf group">
                  Source fruit with us
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-premium group-hover:rotate-45" strokeWidth={1.75} />
                </button>
              </Magnetic>
              <button type="button" onClick={() => goTo("contact", "farmer")} className="btn-ghost-light">
                I'm a farmer
              </button>
            </div>
          </motion.div>
        </motion.div>

        {/* Where the film frame sits before it opens */}
        <div className="container relative flex min-h-[24vh] flex-1 pb-4 pt-7 md:pb-6 md:pt-9">
          <div ref={frameRef} className="h-full w-full" />
        </div>

        {/* Film layer — clipped to the frame, opening to full-bleed */}
        <motion.div className="absolute inset-0 z-20" style={{ clipPath }}>
          <HeroFilm rect={{ x: fx, y: fy, w: fw, h: filmH, radius }} uiOpacity={reduce ? always : filmUi} settle={settle} ready={ready} />

          {!reduce && (
            <motion.div className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-forest-900 via-forest-900/40 to-transparent" style={{ opacity: shade }}>
              <div className="container pb-[9vh]">
                <SplitText as="p" text={hero.reveal} play={showCaption} stagger={0.07} className="display-xl max-w-4xl text-cream" />
                <motion.p
                  className="mt-4 max-w-md text-lg text-cream/70"
                  initial={false}
                  animate={showCaption ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                  transition={{ duration: 0.9, ease: EASE_PREMIUM, delay: showCaption ? 0.35 : 0 }}
                >
                  {hero.revealSub}
                </motion.p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
