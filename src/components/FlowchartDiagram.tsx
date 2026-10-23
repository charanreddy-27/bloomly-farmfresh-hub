import { motion, useInView } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";
import { BloomlyLogo } from "@/components/brand/BloomlyLogo";
import { Reveal } from "./Reveal";

const EASE = [0.16, 1, 0.3, 1] as const;

type Node = { title: string; note: string; share?: string };

const middle: Node[] = [
  { title: "Farm-gate", note: "aggregator" },
  { title: "Production Mandi", note: "(APMC)" },
];
const hubPoints = ["Open weighing", "A / B / C grading", "Spot payment"];
const channels: Node[] = [
  { title: "General Trade / Retailers", note: "Neighbourhood stores" },
  { title: "Wholesalers", note: "Bulk buyers" },
  { title: "Modern trade", note: "Large Retail Chains" },
  { title: "Quick Commerce", note: "Instant-delivery apps" },
];

const steps = [
  { name: "Enter", detail: "A farmer or aggregator calls ahead with the tonnage and arrives at the Bloomly mandi." },
  { name: "Weigh & grade", detail: "Open weighing and transparent A / B / C grades." },
  { name: "Slip", detail: "An instant receipt: the grade attaches to the price, on paper." },
  { name: "Pay", detail: "Spot payment by RTGS or UPI, with zero commission." },
  { name: "Clear", detail: "Every grade is routed to a channel. Nothing is left behind." },
];

// s scales the strokes and arrowheads down with the diagram on small screens.
type Geometry = { w: number; h: number; s: number; paths: { d: string; out: boolean }[] };

const IN_COLOR = "#2F5E43";
const OUT_COLOR = "#D9694F";

/* Layout position of an element inside the diagram box (offsets ignore entrance/hover transforms). */
const box = (el: HTMLElement) => ({
  l: el.offsetLeft,
  r: el.offsetLeft + el.offsetWidth,
  t: el.offsetTop,
  b: el.offsetTop + el.offsetHeight,
  cx: el.offsetLeft + el.offsetWidth / 2,
  cy: el.offsetTop + el.offsetHeight / 2,
});
type Box = ReturnType<typeof box>;
const across = (a: Box, b: Box) => {
  const x1 = a.r, y1 = a.cy, x2 = b.l, y2 = b.cy;
  return `M${x1} ${y1} C${(x1 + x2) / 2} ${y1}, ${(x1 + x2) / 2} ${y2}, ${x2} ${y2}`;
};
const down = (a: Box, b: Box) => {
  const x1 = a.cx, y1 = a.b, x2 = b.cx, y2 = b.t;
  return `M${x1} ${y1} C${x1} ${(y1 + y2) / 2}, ${x2} ${(y1 + y2) / 2}, ${x2} ${y2}`;
};

const ColumnLabel = ({ column, children }: { column: string; children: string }) => (
  <p className={`row-start-1 text-center text-[0.5rem] font-bold uppercase tracking-[0.14em] text-ink-muted lg:text-xs ${column}`}>{children}</p>
);

type Ref = (el: HTMLDivElement | null) => void;

// The diagram keeps its desktop shape on every screen, so the cards shrink to fit a phone.
function NodeCard({ node, show, delay, compact = false, center = false, innerRef }: { node: Node; show: boolean; delay: number; compact?: boolean; center?: boolean; innerRef: Ref }) {
  return (
    <motion.div
      ref={innerRef}
      className={`card relative z-10 break-words ${center ? "text-center" : ""} ${compact ? "rounded-lg px-1.5 py-1.5 lg:rounded-2xl lg:px-6 lg:py-4" : "rounded-lg px-1 py-2.5 lg:rounded-2xl lg:px-5 lg:py-5"}`}
      initial={{ opacity: 0, y: 14 }}
      animate={show ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      <p className="text-[0.6875rem] font-bold leading-snug text-ink lg:text-[1rem]">
        {node.title}
        {node.share && <span className="ml-2 text-sm font-semibold text-[#D9694F]">{node.share}</span>}
      </p>
      <p className="mt-0.5 text-[0.625rem] leading-snug text-ink-muted lg:mt-1 lg:text-[0.875rem]">{node.note}</p>
    </motion.div>
  );
}

const FlowchartDiagram = () => {
  const boxRef = useRef<HTMLDivElement>(null);
  const producerRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const middleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const channelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [geo, setGeo] = useState<Geometry | null>(null);
  const seen = useInView(boxRef, { once: true, amount: 0.25 });

  // Draw the connectors from the cards' real positions, so they line up at every screen size.
  useLayoutEffect(() => {
    const measure = () => {
      const root = boxRef.current;
      const prodEl = producerRef.current;
      const hubEl = hubRef.current;
      if (!root || !prodEl || !hubEl) return;
      const prod = box(prodEl);
      const hub = box(hubEl);
      const mid = middleRefs.current.filter((el): el is HTMLDivElement => !!el).map(box);
      const out = channelRefs.current.filter((el): el is HTMLDivElement => !!el).map(box);
      if (!mid.length || !out.length) return;

      const paths: Geometry["paths"] = [
        ...mid.map((m) => ({ d: across(prod, m), out: false })),
        ...(mid.length > 1 ? [{ d: down(mid[0], mid[1]), out: false }] : []),
        ...mid.map((m) => ({ d: across(m, hub), out: false })),
        ...out.map((c) => ({ d: across(hub, c), out: true })),
      ];
      const s = Math.min(1, Math.max(0.6, root.offsetWidth / 700));
      setGeo({ w: root.offsetWidth, h: root.offsetHeight, s, paths });
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (boxRef.current) observer.observe(boxRef.current);
    document.fonts?.ready.then(measure);
    return () => observer.disconnect();
  }, []);

  const lines = geo ? geo.paths.map((p, i) => ({ id: `line-${i}`, d: p.d, out: p.out })) : [];

  return (
    <section id="how-it-works" className="section border-y border-line bg-surface">
      <div className="container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="h-section">
            How the private <span className="hl">mandi</span> works
          </h2>
          <p className="lead mt-4">Farmers and aggregators bring fruit in. Every grade goes out to a buyer.</p>
        </Reveal>

        <div className="card mt-12 p-2.5 sm:p-7 md:mt-16 md:p-10">
        <div
          ref={boxRef}
          className="relative grid grid-cols-[minmax(0,0.75fr)_minmax(0,0.95fr)_minmax(0,0.9fr)_minmax(0,1.05fr)_auto] grid-rows-[auto_1fr] gap-x-3 gap-y-2.5 md:gap-x-6 lg:gap-x-14 lg:gap-y-5 xl:gap-x-20"
        >
          {/* connectors */}
          {geo && (
            <svg className="pointer-events-none absolute inset-0" width={geo.w} height={geo.h} viewBox={`0 0 ${geo.w} ${geo.h}`} fill="none" aria-hidden>
              <defs>
                {[
                  { id: "arrow-in", color: IN_COLOR },
                  { id: "arrow-out", color: OUT_COLOR },
                ].map((m) => (
                  <marker key={m.id} id={m.id} viewBox="0 0 10 10" refX="9" refY="5" markerWidth={10 * geo.s} markerHeight={10 * geo.s} markerUnits="userSpaceOnUse" orient="auto">
                    <path d="M0 0.5 L10 5 L0 9.5 Z" fill={m.color} />
                  </marker>
                ))}
              </defs>
              {lines.map((line, i) => (
                <motion.path
                  key={line.id}
                  d={line.d}
                  stroke={line.out ? OUT_COLOR : IN_COLOR}
                  strokeWidth={2 * geo.s}
                  strokeLinecap="round"
                  markerEnd={`url(#${line.out ? "arrow-out" : "arrow-in"})`}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={seen ? { pathLength: 1, opacity: 0.9 } : undefined}
                  transition={{ duration: 1.1, ease: EASE, delay: line.out ? 1.45 : 0.35 + (i % 2) * 0.15 }}
                />
              ))}
            </svg>
          )}

          <ColumnLabel column="col-span-2 col-start-1">Production regions</ColumnLabel>
          <ColumnLabel column="col-start-4">Consumption regions</ColumnLabel>

          {/* 1. producers */}
          <motion.div
            ref={producerRef}
            className="relative z-10 col-start-1 row-start-2 self-center rounded-lg bg-forest-900 px-1 py-4 text-center text-white shadow-[0_24px_50px_-28px_rgba(6,36,24,0.85)] lg:rounded-2xl lg:px-6 lg:py-8"
            initial={{ opacity: 0, y: 14 }}
            animate={seen ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <p className="text-[0.625rem] font-extrabold lg:text-lg">Producers</p>
            <p className="mt-0.5 text-[0.5625rem] font-semibold text-white/70 lg:mt-1 lg:text-[1rem]">Farmers</p>
          </motion.div>

          {/* 2. farm-gate aggregator and production mandi */}
          <div className="col-start-2 row-start-2 grid gap-5 self-center lg:gap-12">
            {middle.map((m, i) => (
              <NodeCard key={m.title} node={m} show={seen} delay={0.15 + i * 0.1} center innerRef={(el) => (middleRefs.current[i] = el)} />
            ))}
          </div>

          {/* 3. the hub */}
          <motion.div
            ref={hubRef}
            className="relative z-10 col-start-3 row-start-2 self-center rounded-xl bg-forest-900 px-1.5 py-3 text-center text-white shadow-[0_30px_60px_-30px_rgba(6,36,24,0.85)] lg:rounded-3xl lg:px-6 lg:py-8"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={seen ? { opacity: 1, scale: 1 } : undefined}
            transition={{ duration: 0.8, ease: EASE, delay: 0.7 }}
          >
            <BloomlyLogo mark play={seen} className="mx-auto w-5 lg:w-11" />
            <p className="mt-1.5 text-[0.5rem] font-bold uppercase tracking-[0.14em] text-leaf-300 lg:mt-4 lg:text-xs">Bloomly's</p>
            <p className="mt-0.5 text-[0.875rem] font-extrabold leading-tight tracking-[-0.02em] lg:mt-1 lg:text-[1.6rem]">Private Mandi</p>
            <ul className="mt-2.5 divide-y divide-white/10 border-t border-white/10 text-[0.625rem] text-white/85 lg:mt-6 lg:text-[0.9375rem]">
              {hubPoints.map((point) => (
                <li key={point} className="py-1 last:pb-0 lg:py-2.5">
                  {point}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* 4. every channel out */}
          <div className="col-start-4 row-start-2 grid gap-1.5 self-center lg:gap-4">
            {channels.map((c, i) => (
              <NodeCard key={c.title} node={c} show={seen} delay={1.2 + i * 0.08} compact innerRef={(el) => (channelRefs.current[i] = el)} />
            ))}
          </div>

          {/* 5. consumers */}
          <p className="col-start-5 row-start-2 self-center text-[0.6875rem] font-extrabold text-ink lg:text-lg">
            <span aria-hidden>→ </span>Consumers
          </p>
        </div>

        </div>

        {/* Inside the Private Mandi */}
        <Reveal className="mx-auto mt-20 max-w-2xl text-center md:mt-28">
          <h2 className="h-section">
            The farmer's <span className="hl">journey</span> at the private mandi
          </h2>
          <p className="lead mt-4">Five steps from the farm gate to money in the bank.</p>
        </Reveal>

        <Reveal className="card mt-12 p-3 sm:p-7 md:mt-16 md:p-10">
          <ol className="relative grid grid-cols-5 gap-2 sm:gap-6">
            {/* the line the steps sit on, from the first circle's centre to the last one's */}
            <span className="absolute left-[0.875rem] top-[0.875rem] h-0.5 w-[calc(80%+0.4rem)] bg-forest-100 sm:left-5 sm:top-5 sm:w-[calc(80%+1.2rem)]" aria-hidden />
            <motion.span
              className="absolute left-[0.875rem] top-[0.875rem] h-0.5 w-[calc(80%+0.4rem)] origin-left bg-leaf sm:left-5 sm:top-5 sm:w-[calc(80%+1.2rem)]"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 1.8, ease: EASE, delay: 0.2 }}
              aria-hidden
            />
            {steps.map((s, i) => (
              <li key={s.name} className="relative">
                <span className="relative z-10 grid h-7 w-7 place-items-center rounded-full bg-forest text-[0.6875rem] font-extrabold text-white ring-2 ring-white sm:h-10 sm:w-10 sm:text-sm sm:ring-4">
                  {i + 1}
                </span>
                <div className="mt-2.5 sm:mt-5">
                  <p className="text-[0.8125rem] font-bold leading-snug text-ink sm:text-lg sm:leading-7">{s.name}</p>
                  <p className="mt-1 text-[0.6875rem] leading-snug text-ink-soft sm:text-[0.9375rem] sm:leading-relaxed">{s.detail}</p>
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
