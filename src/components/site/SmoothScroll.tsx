import Lenis from "lenis";
import Snap from "lenis/snap";
import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { scrollToId, scrollToTop, setLenis, type SectionNavState } from "@/lib/scroll";

/**
 * Inertial smooth scrolling (skipped for reduced-motion users), plus a gentle
 * snap on the full-bleed story sections (marked with `data-snap-section`).
 * Snapping goes through Lenis's own Snap add-on rather than native CSS
 * `scroll-snap` — the two fight over who owns the scroll position when a
 * JS-driven smooth-scroll library is also running, which tears the page
 * mid-transition. "Proximity" keeps it from ever trapping an ordinary scroll.
 */
export function SmoothScroll() {
  const { pathname } = useLocation();
  const snapRef = useRef<Snap | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), autoRaf: true });
    setLenis(lenis);
    const snap = new Snap(lenis, { type: "proximity", duration: 0.9, distanceThreshold: "30%" });
    snapRef.current = snap;
    return () => {
      snap.destroy();
      snapRef.current = null;
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  useEffect(() => {
    const snap = snapRef.current;
    if (!snap) return;
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-snap-section]"));
    const unregister = sections.map((el) => snap.addElement(el, { align: "start" }));
    return () => unregister.forEach((remove) => remove());
  }, [pathname]);

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
