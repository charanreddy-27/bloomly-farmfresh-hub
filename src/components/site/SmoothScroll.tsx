import Lenis from "lenis";
import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { scrollToId, scrollToTop, setLenis, type SectionNavState } from "@/lib/scroll";

/** Inertial smooth scrolling (skipped for reduced-motion users). */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), autoRaf: true });
    setLenis(lenis);
    return () => {
      lenis.destroy();
      setLenis(null);
    };
  }, []);
  return null;
}

/** Resets scroll on route change, or scrolls to a section passed via router state. */
export function RouteScroll() {
  const { pathname, state } = useLocation();
  const target = (state as SectionNavState | null)?.scrollTo;

  useEffect(() => {
    if (!target) {
      scrollToTop(true);
      return;
    }
    const t = window.setTimeout(() => scrollToId(target), 120);
    return () => window.clearTimeout(t);
  }, [pathname, target]);

  return null;
}

/** Thin leaf-green reading progress bar. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  return <motion.div className="fixed inset-x-0 top-0 z-[55] h-[3px] origin-left bg-leaf" style={{ scaleX }} aria-hidden />;
}
