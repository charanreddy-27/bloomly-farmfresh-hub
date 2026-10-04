import { useInView, useMotionValue, useMotionValueEvent, useReducedMotion, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

const format = (n: number) => Math.round(n).toLocaleString("en-IN");

/** Counts from 0 to `value` with a spring once it scrolls into view. */
export function CountUp({ value, className }: { value: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const target = useMotionValue(0);
  const spring = useSpring(target, { stiffness: 38, damping: 22, mass: 1.2 });

  useEffect(() => {
    if (inView) target.set(value);
  }, [inView, target, value]);

  useMotionValueEvent(spring, "change", (v) => {
    if (ref.current) ref.current.textContent = format(v);
  });

  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
      {reduce ? format(value) : "0"}
    </span>
  );
}
