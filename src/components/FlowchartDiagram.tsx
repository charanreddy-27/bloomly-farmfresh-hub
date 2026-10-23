import { motion, useInView } from "framer-motion";
import { type RefObject, useLayoutEffect, useRef, useState } from "react";
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
  { title: "General Trade\u00a0/ Retailers", note: "Neighbourhood stores" },
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

type Geometry = { w: number; h: number; paths: { d: string; out: boolean }[] };

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
/* Stacked layout: run down the spine between the two channel columns (breaking around the label), then out into channel c. */
const spine = (hub: Box, label: Box, c: Box) => {
  const r = 6, side = c.cx < hub.cx ? -1 : 1;
  return `M${hub.cx} ${hub.b} V${label.t - 6} M${hub.cx} ${label.b + 6} V${c.cy - r} Q${hub.cx} ${c.cy}, ${hub.cx + side * r} ${c.cy} H${side < 0 ? c.r : c.l}`;
};

// Stacked layout: tuck the block under a column label up to it (the grid gap is sized for arrows).
const UNDER_LABEL = "-mt-4 lg:mt-0";

const ColumnLabel = ({ column, children, innerRef }: { column: string; children: string; innerRef?: RefObject<HTMLParagraphElement> }) => (
  <p ref={innerRef} className={`text-xs font-bold uppercase tracking-[0.14em] text-ink-muted lg:row-start-1 lg:text-center ${column}`}>{children}</p>
);

type Ref = (el: HTMLDivElement | null) => void;

// Cards sit two to a row when stacked, so they centre their text and squeeze on the narrowest phones.
function NodeCard({ node, show, delay, compact = false, innerRef }: { node: Node; show: boolean; delay: number; compact?: boolean; innerRef: Ref }) {
  return (
    <motion.div
      ref={innerRef}
      className={`card relative z-10 flex flex-col justify-center text-center break-words ${compact ? "px-1 py-3 min-[360px]:px-1.5 lg:px-6 lg:py-4 lg:text-left" : "px-2 py-3.5 min-[360px]:px-3 lg:px-5 lg:py-5"}`}
      initial={{ opacity: 0, y: 14 }}
      animate={show ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      <p className="text-[0.9375rem] font-bold leading-snug text-ink lg:text-[1rem]">
        {node.title}
        {node.share && <span className="ml-2 text-sm font-semibold text-[#D9694F]">{node.share}</span>}
      </p>
      <p className={`mt-0.5 leading-snug text-ink-muted lg:mt-1 lg:text-[0.875rem] ${compact ? "text-[0.8125rem] tracking-[-0.01em] lg:tracking-normal" : "text-[0.875rem]"}`}>{node.note}</p>
    </motion.div>
  );
}

const FlowchartDiagram = () => {
  const boxRef = useRef<HTMLDivElement>(null);
  const producerRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const consumptionRef = useRef<HTMLParagraphElement>(null);
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
      const labelEl = consumptionRef.current;
      if (!root || !prodEl || !hubEl || !labelEl) return;
      const prod = box(prodEl);
      const hub = box(hubEl);
      const label = box(labelEl);
      const mid = middleRefs.current.filter((el): el is HTMLDivElement => !!el).map(box);
      const out = channelRefs.current.filter((el): el is HTMLDivElement => !!el).map(box);
      if (!mid.length || !out.length) return;

      const wide = prod.r <= mid[0].l; // desktop: producers, middle stack, hub, channels in a row
      // stacked layout (the desktop flow turned on its side): middle pair side by side, channels two by two
      const paths: Geometry["paths"] = wide
        ? [
            ...mid.map((m) => ({ d: across(prod, m), out: false })),
            ...(mid.length > 1 ? [{ d: down(mid[0], mid[1]), out: false }] : []),
            ...mid.map((m) => ({ d: across(m, hub), out: false })),
            ...out.map((c) => ({ d: across(hub, c), out: true })),
          ]
        : [
            ...mid.map((m) => ({ d: down(prod, m), out: false })),
            ...(mid.length > 1 ? [{ d: across(mid[0], mid[1]), out: false }] : []),
            ...mid.map((m) => ({ d: down(m, hub), out: false })),
            ...out.map((c) => ({ d: spine(hub, label, c), out: true })),
          ];
      setGeo({ w: root.offsetWidth, h: root.offsetHeight, paths });
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

        <div className="card mt-8 p-4 sm:mt-12 sm:p-7 md:mt-16 md:p-10">
        <div
          ref={boxRef}
          className="relative mx-auto grid max-w-[24rem] gap-y-8 lg:max-w-none lg:grid-cols-[minmax(0,0.75fr)_minmax(0,0.95fr)_minmax(0,0.9fr)_minmax(0,1.05fr)_auto] lg:grid-rows-[auto_1fr] lg:gap-x-14 lg:gap-y-5 xl:gap-x-20"
        >
          {/* connectors */}
          {geo && (
            <svg className="pointer-events-none absolute inset-0" width={geo.w} height={geo.h} viewBox={`0 0 ${geo.w} ${geo.h}`} fill="none" aria-hidden>
              <defs>
                {[
                  { id: "arrow-in", color: IN_COLOR },
                  { id: "arrow-out", color: OUT_COLOR },
                ].map((m) => (
                  <marker key={m.id} id={m.id} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="10" markerHeight="10" markerUnits="userSpaceOnUse" orient="auto">
                    <path d="M0 0.5 L10 5 L0 9.5 Z" fill={m.color} />
                  </marker>
                ))}
              </defs>
              {lines.map((line, i) => (
                <motion.path
                  key={line.id}
                  d={line.d}
                  stroke={line.out ? OUT_COLOR : IN_COLOR}
                  strokeWidth="2"
                  strokeLinecap="round"
                  markerEnd={`url(#${line.out ? "arrow-out" : "arrow-in"})`}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={seen ? { pathLength: 1, opacity: 0.9 } : undefined}
                  transition={{ duration: 1.1, ease: EASE, delay: line.out ? 1.45 : 0.35 + (i % 2) * 0.15 }}
                />
              ))}
            </svg>
          )}

          <ColumnLabel column="text-center lg:col-span-2 lg:col-start-1">Production regions</ColumnLabel>

          {/* 1. producers */}
          <motion.div
            ref={producerRef}
            className={`relative z-10 flex items-baseline justify-center gap-2 rounded-2xl bg-forest-900 px-6 py-4 text-center text-white shadow-[0_24px_50px_-28px_rgba(6,36,24,0.85)] lg:col-start-1 lg:row-start-2 lg:block lg:self-center lg:py-8 ${UNDER_LABEL}`}
            initial={{ opacity: 0, y: 14 }}
            animate={seen ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.7, ease: EASE }}
          >
            {/* one line on phones, two on desktop */}
            <p className="text-lg font-extrabold">Producers</p>
            <span aria-hidden className="text-white/40 lg:hidden">·</span>
            <p className="font-semibold text-white/70 lg:mt-1">Farmers</p>
          </motion.div>

          {/* 2. farm-gate aggregator and production mandi */}
          <div className="grid grid-cols-2 gap-6 lg:col-start-2 lg:row-start-2 lg:grid-cols-1 lg:gap-12 lg:self-center">
            {middle.map((m, i) => (
              <NodeCard key={m.title} node={m} show={seen} delay={0.15 + i * 0.1} innerRef={(el) => (middleRefs.current[i] = el)} />
            ))}
          </div>

          {/* 3. the hub */}
          <motion.div
            ref={hubRef}
            className="relative z-10 flex items-center justify-between gap-3 rounded-3xl bg-forest-900 px-4 py-5 text-left text-white shadow-[0_30px_60px_-30px_rgba(6,36,24,0.85)] lg:col-start-3 lg:row-start-2 lg:block lg:self-center lg:px-6 lg:py-8 lg:text-center"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={seen ? { opacity: 1, scale: 1 } : undefined}
            transition={{ duration: 0.8, ease: EASE, delay: 0.7 }}
          >
            <div>
              <BloomlyLogo mark play={seen} className="w-8 lg:mx-auto lg:w-11" />
              <p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-leaf-300 lg:mt-4">Bloomly's</p>
              <p className="mt-0.5 whitespace-nowrap text-[1.375rem] font-extrabold leading-tight tracking-[-0.02em] lg:mt-1 lg:whitespace-normal lg:text-[1.6rem]">Private Mandi</p>
            </div>
            {/* beside the name on phones, a ruled list under it on desktop */}
            <ul className="shrink-0 space-y-2 border-l border-white/15 pl-3 text-[0.875rem] text-white/85 lg:mt-6 lg:space-y-0 lg:divide-y lg:divide-white/10 lg:border-l-0 lg:border-t lg:border-white/10 lg:pl-0 lg:text-[0.9375rem]">
              {hubPoints.map((point) => (
                <li key={point} className="whitespace-nowrap lg:whitespace-normal lg:py-2.5 lg:last:pb-0">
                  {point}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* 4. every channel out */}
          <ColumnLabel column="-mt-2 text-center lg:col-start-4 lg:mt-0" innerRef={consumptionRef}>
            Consumption regions
          </ColumnLabel>
          <div className={`grid grid-cols-2 gap-x-7 gap-y-2.5 lg:col-start-4 lg:row-start-2 lg:grid-cols-1 lg:gap-4 lg:self-center ${UNDER_LABEL}`}>
            {channels.map((c, i) => (
              <NodeCard key={c.title} node={c} show={seen} delay={1.2 + i * 0.08} compact innerRef={(el) => (channelRefs.current[i] = el)} />
            ))}
          </div>

          {/* 5. consumers */}
          <p className="-mt-2 text-center text-lg font-extrabold text-ink lg:col-start-5 lg:mt-0 lg:row-start-2 lg:self-center lg:text-left">
            <span aria-hidden className="lg:hidden">↓ </span>
            <span aria-hidden className="hidden lg:inline">→ </span>
            Consumers
          </p>
        </div>

        </div>

        {/* Inside the Private Mandi */}
        <Reveal className="mx-auto mt-14 max-w-2xl text-center sm:mt-20 md:mt-28">
          <h2 className="h-section">
            The farmer's <span className="hl">journey</span> at the private mandi
          </h2>
          <p className="lead mt-4">Five steps from the farm gate to money in the bank.</p>
        </Reveal>

        <Reveal className="card mt-8 p-5 sm:mt-12 sm:p-7 md:mt-16 md:p-10">
          <ol className="relative grid gap-6 sm:gap-7 lg:grid-cols-5 lg:gap-6">
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
                {i < steps.length - 1 && <span className="absolute -bottom-6 left-[1.1875rem] top-10 w-0.5 bg-forest-100 sm:-bottom-7 lg:hidden" aria-hidden />}
                <span className="relative z-10 grid h-10 w-10 place-items-center rounded-full bg-forest text-sm font-extrabold text-white ring-4 ring-white">
                  {i + 1}
                </span>
                {/* on phones the step name lines up with the middle of its number */}
                <div className="pt-2 lg:mt-5 lg:pt-0">
                  <p className="text-[1.0625rem] font-bold leading-snug text-ink sm:text-lg sm:leading-7">{s.name}</p>
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
