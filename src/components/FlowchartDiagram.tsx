import { motion, useInView, useReducedMotion } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";
import { BloomlyLogo } from "@/components/brand/BloomlyLogo";
import { Reveal } from "./Reveal";

const EASE = [0.16, 1, 0.3, 1] as const;

type Node = { title: string; note: string };

const sources: Node[] = [
  { title: "Bloomly purchases at farm gate", note: "We buy directly at the farm" },
  { title: "Farmer harvests & brings to DC", note: "Weighed and graded on arrival" },
];
const hubPoints = ["Open weighing", "A / B / C grading", "Spot payment"];
const channels: Node[] = [
  { title: "Modern Trade", note: "Supermarket chains" },
  { title: "Wholesale", note: "Bulk buyers" },
  { title: "General Trade & Retailers", note: "Neighbourhood stores" },
  { title: "Quick Commerce", note: "Instant-delivery apps" },
];

const steps = [
  { name: "Enter", detail: "A farmer or aggregator arrives at our distribution centre." },
  { name: "Weigh & grade", detail: "Open weighing and transparent A / B / C grades." },
  { name: "Slip", detail: "An instant receipt: the grade attaches to the price, on paper." },
  { name: "Pay", detail: "Spot payment by RTGS or UPI, with zero commission." },
  { name: "Clear", detail: "Every grade is routed to a channel. Nothing is left behind." },
];

type Geometry = { w: number; h: number; inPaths: string[]; outPaths: string[] };

/* Layout position of an element inside the diagram box (offsets ignore entrance/hover transforms). */
const box = (el: HTMLElement) => ({
  l: el.offsetLeft,
  r: el.offsetLeft + el.offsetWidth,
  t: el.offsetTop,
  b: el.offsetTop + el.offsetHeight,
  cx: el.offsetLeft + el.offsetWidth / 2,
  cy: el.offsetTop + el.offsetHeight / 2,
});
const across = (x1: number, y1: number, x2: number, y2: number) => `M${x1} ${y1} C${(x1 + x2) / 2} ${y1}, ${(x1 + x2) / 2} ${y2}, ${x2} ${y2}`;
const down = (x1: number, y1: number, x2: number, y2: number) => `M${x1} ${y1} C${x1} ${(y1 + y2) / 2}, ${x2} ${(y1 + y2) / 2}, ${x2} ${y2}`;

const ColumnLabel = ({ column, children }: { column: string; children: string }) => (
  <p className={`hidden text-center text-xs font-bold uppercase tracking-[0.14em] text-ink-muted lg:row-start-1 lg:block ${column}`}>{children}</p>
);

function NodeCard({ node, show, delay, compact = false, innerRef }: { node: Node; show: boolean; delay: number; compact?: boolean; innerRef: (el: HTMLDivElement | null) => void }) {
  return (
    <motion.div
      ref={innerRef}
      className={`card relative z-10 ${compact ? "px-4 py-3.5 lg:px-6 lg:py-4" : "p-4 lg:px-6 lg:py-5"}`}
      initial={{ opacity: 0, y: 14 }}
      animate={show ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      <p className="font-bold leading-snug text-ink">{node.title}</p>
      <p className="mt-1 text-sm leading-snug text-ink-muted">{node.note}</p>
    </motion.div>
  );
}

const FlowchartDiagram = () => {
  const reduce = useReducedMotion();
  const boxRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const channelGroupRef = useRef<HTMLDivElement>(null);
  const sourceRefs = useRef<(HTMLDivElement | null)[]>([]);
  const channelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [geo, setGeo] = useState<Geometry | null>(null);
  const seen = useInView(boxRef, { once: true, amount: 0.25 });

  // Draw the connectors from the cards' real positions, so they line up at every screen size.
  useLayoutEffect(() => {
    const measure = () => {
      const root = boxRef.current;
      const hubEl = hubRef.current;
      const groupEl = channelGroupRef.current;
      if (!root || !hubEl || !groupEl) return;
      const hub = box(hubEl);
      const src = sourceRefs.current.filter((el): el is HTMLDivElement => !!el).map(box);
      const out = channelRefs.current.filter((el): el is HTMLDivElement => !!el).map(box);
      if (!src.length || !out.length) return;

      const sideBySide = src[0].r <= hub.l; // desktop: three columns
      const group = box(groupEl);
      setGeo({
        w: root.offsetWidth,
        h: root.offsetHeight,
        inPaths: sideBySide ? src.map((s) => across(s.r, s.cy, hub.l, hub.cy)) : src.map((s) => down(s.cx, s.b, hub.cx, hub.t)),
        // stacked layout: one trunk from the hub into the group of channels
        outPaths: sideBySide ? out.map((c) => across(hub.r, hub.cy, c.l, c.cy)) : [down(hub.cx, hub.b, group.cx, group.t)],
      });
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (boxRef.current) observer.observe(boxRef.current);
    document.fonts?.ready.then(measure);
    return () => observer.disconnect();
  }, []);

  const lines = geo
    ? [...geo.inPaths.map((d, i) => ({ id: `in-${i}`, d, out: false })), ...geo.outPaths.map((d, i) => ({ id: `out-${i}`, d, out: true }))]
    : [];

  return (
    <section id="how-it-works" className="section border-y border-line bg-surface">
      <div className="container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="h-section">
            Hybrid Purchase Model for <span className="hl">Fruits</span>
          </h2>
          <p className="lead mt-4">Two ways in, one Dispatch Center, and every channel out.</p>
        </Reveal>

        <div
          ref={boxRef}
          className="relative mx-auto mt-12 grid max-w-xl gap-y-14 md:mt-16 lg:max-w-none lg:grid-cols-[minmax(0,1fr)_minmax(0,0.82fr)_minmax(0,1fr)] lg:grid-rows-[auto_1fr] lg:gap-x-24 lg:gap-y-5 xl:gap-x-28"
        >
          {/* connectors + fruit moving along them */}
          {geo && (
            <svg className="pointer-events-none absolute inset-0" width={geo.w} height={geo.h} viewBox={`0 0 ${geo.w} ${geo.h}`} fill="none" aria-hidden>
              {lines.map((line) => (
                <motion.path
                  key={line.id}
                  d={line.d}
                  stroke={line.out ? "#7FC141" : "#1B7A50"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={seen ? { pathLength: 1, opacity: 0.55 } : undefined}
                  transition={{ duration: 1.1, ease: EASE, delay: line.out ? 1.05 : 0.35 }}
                />
              ))}
              {!reduce && seen && (
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 2 }}>
                  {lines.map((line, i) =>
                    [0, 1].map((k) => (
                      <circle key={`${line.id}-${k}`} r="4.5" fill={line.out ? "#7FC141" : "#1B7A50"}>
                        <animateMotion dur="2.6s" repeatCount="indefinite" begin={`-${k * 1.3 + i * 0.37}s`} path={line.d} />
                      </circle>
                    )),
                  )}
                </motion.g>
              )}
            </svg>
          )}

          {/* 1. two ways in */}
          <div className="lg:contents">
            <ColumnLabel column="lg:col-start-1">Sourcing</ColumnLabel>
            <div className="grid grid-cols-2 gap-3 lg:col-start-1 lg:row-start-2 lg:grid-cols-1 lg:gap-6 lg:self-center">
              {sources.map((s, i) => (
                <NodeCard key={s.title} node={s} show={seen} delay={i * 0.08} innerRef={(el) => (sourceRefs.current[i] = el)} />
              ))}
            </div>
          </div>

          {/* 2. the hub */}
          <div className="lg:contents">
            <ColumnLabel column="lg:col-start-2">Bloomly</ColumnLabel>
            <motion.div
              ref={hubRef}
              className="relative z-10 mx-auto w-full max-w-[19rem] lg:col-start-2 lg:row-start-2 lg:self-center rounded-3xl bg-forest-900 px-6 py-8 text-center text-white shadow-[0_30px_60px_-30px_rgba(6,36,24,0.85)] lg:max-w-none"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={seen ? { opacity: 1, scale: 1 } : undefined}
              transition={{ duration: 0.8, ease: EASE, delay: 0.55 }}
            >
              <BloomlyLogo mark play={seen} className="mx-auto w-11" />
              <p className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-leaf-300">Bloomly's</p>
              <p className="mt-1 text-[1.6rem] font-extrabold leading-tight tracking-[-0.02em]">Dispatch Center</p>
              <ul className="mt-6 divide-y divide-white/10 border-t border-white/10 text-[0.9375rem] text-white/85">
                {hubPoints.map((point) => (
                  <li key={point} className="py-2.5 last:pb-0">
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* 3. every channel out */}
          <div className="lg:contents">
            <ColumnLabel column="lg:col-start-3">Distribution</ColumnLabel>
            <div ref={channelGroupRef} className="grid grid-cols-2 gap-3 lg:col-start-3 lg:row-start-2 lg:grid-cols-1 lg:gap-4 lg:self-center">
              {channels.map((c, i) => (
                <NodeCard key={c.title} node={c} show={seen} delay={0.9 + i * 0.08} compact innerRef={(el) => (channelRefs.current[i] = el)} />
              ))}
            </div>
          </div>
        </div>

        <Reveal className="mx-auto mt-10 max-w-2xl text-center text-[0.9375rem] leading-relaxed text-ink-soft md:mt-12">
          B-grade fruit and misfits go to <span className="font-bold text-forest">Value+</span>, as cut fruit, juices and pulp, so the
          whole harvest clears at fair value.
        </Reveal>

        {/* Inside the Dispatch Center */}
        <Reveal className="card mt-14 p-7 md:mt-20 md:p-10">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
            <h3 className="text-xl font-extrabold text-ink md:text-2xl">The Bloomly difference</h3>
            <p className="text-sm font-semibold text-ink-muted">What happens inside the Dispatch Center</p>
          </div>

          <ol className="relative mt-8 grid gap-7 md:mt-10 lg:grid-cols-5 lg:gap-6">
            {/* the line the steps sit on */}
            <span className="absolute left-5 top-5 hidden h-0.5 w-[calc(80%+1.2rem)] bg-forest-100 lg:block" aria-hidden />
            <motion.span
              className="absolute left-5 top-5 hidden h-0.5 w-[calc(80%+1.2rem)] origin-left bg-leaf lg:block"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 1.8, ease: EASE, delay: 0.2 }}
              aria-hidden
            />
            {steps.map((s, i) => (
              <li key={s.name} className="relative grid grid-cols-[2.5rem_1fr] gap-x-4 lg:block">
                {i < steps.length - 1 && <span className="absolute -bottom-7 left-[1.1875rem] top-10 w-0.5 bg-forest-100 lg:hidden" aria-hidden />}
                <span className="relative z-10 grid h-10 w-10 place-items-center rounded-full bg-forest text-sm font-extrabold text-white ring-4 ring-white">
                  {i + 1}
                </span>
                <div className="lg:mt-5">
                  <p className="text-lg font-bold text-ink">{s.name}</p>
                  <p className="mt-1 text-[0.9375rem] leading-relaxed text-ink-soft">{s.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
};

export default FlowchartDiagram;
