import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

const format = (n: number) => Math.round(n).toLocaleString("en-IN");

/** Counts from zero to `to` once, the first time it scrolls into view. */
export function CountUp({ to, duration = 1.8, className }: { to: number; duration?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView) return;
    if (reduce) {
      el.textContent = format(to);
      return;
    }
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        el.textContent = format(v);
      },
    });
    return () => controls.stop();
  }, [inView, reduce, to, duration]);

  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
      {reduce ? format(to) : "0"}
    </span>
  );
}
