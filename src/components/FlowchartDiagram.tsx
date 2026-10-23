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
  { title: "General Trade / Retailers", note: "Neighbourhood stores" },
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
/* Stacked layout: drop from the hub, turn onto a bus at x, then branch right into channel c. */
const branch = (hub: Box, turn: number, x: number, c: Box) => {
  const r = 12;
  return `M${hub.cx} ${hub.b} V${turn - r} Q${hub.cx} ${turn}, ${hub.cx - r} ${turn} H${x + r} Q${x} ${turn}, ${x} ${turn + r} V${c.cy - r} Q${x} ${c.cy}, ${x + r} ${c.cy} H${c.l}`;
};

// Stacked layout: the channels sit to the right of the bus their arrows branch off.
const STACK = "mx-auto w-full max-w-[20rem] pl-11 lg:max-w-none lg:pl-0";

// Stacked layout: tuck the block under a column label up to it (the grid gap is sized for arrows).
const UNDER_LABEL = "-mt-9 lg:mt-0";

const ColumnLabel = ({ column, children }: { column: string; children: string }) => (
  <p className={`text-xs font-bold uppercase tracking-[0.14em] text-ink-muted lg:row-start-1 lg:text-center ${column}`}>{children}</p>
);

type Ref = (el: HTMLDivElement | null) => void;

function NodeCard({ node, show, delay, compact = false, center = false, innerRef }: { node: Node; show: boolean; delay: number; compact?: boolean; center?: boolean; innerRef: Ref }) {
  return (
    <motion.div
      ref={innerRef}
      className={`card relative z-10 ${center ? "flex flex-col justify-center text-center" : ""} ${compact ? "px-4 py-3.5 lg:px-6 lg:py-4" : "px-2 py-4 min-[360px]:px-4 lg:px-5 lg:py-5"}`}
      initial={{ opacity: 0, y: 14 }}
      animate={show ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      <p className="font-bold leading-snug text-ink">
        {node.title}
        {node.share && <span className="ml-2 text-sm font-semibold text-[#D9694F]">{node.share}</span>}
      </p>
      <p className="mt-1 text-sm leading-snug text-ink-muted">{node.note}</p>
    </motion.div>
  );
}

const FlowchartDiagram = () => {
  const boxRef = useRef<HTMLDivElement>(null);
  const producerRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const channelGroupRef = useRef<HTMLDivElement>(null);
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
      const groupEl = channelGroupRef.current;
      if (!root || !prodEl || !hubEl || !groupEl) return;
      const prod = box(prodEl);
      const hub = box(hubEl);
      const group = box(groupEl);
      const mid = middleRefs.current.filter((el): el is HTMLDivElement => !!el).map(box);
      const out = channelRefs.current.filter((el): el is HTMLDivElement => !!el).map(box);
      if (!mid.length || !out.length) return;

      const wide = prod.r <= mid[0].l; // desktop: producers, middle stack, hub, channels in a row
      // stacked layout (the desktop flow turned on its side): middle pair side by side, channels branch off a bus
      const turn = hub.b + parseFloat(getComputedStyle(root).rowGap) / 2;
      const bus = group.l + 12;
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
            ...out.map((c) => ({ d: branch(hub, turn, bus, c), out: true })),
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

        <div className="card mt-12 p-5 sm:p-7 md:mt-16 md:p-10">
        <div
          ref={boxRef}
          className="relative mx-auto grid max-w-xl gap-y-14 lg:max-w-none lg:grid-cols-[minmax(0,0.75fr)_minmax(0,0.95fr)_minmax(0,0.9fr)_minmax(0,1.05fr)_auto] lg:grid-rows-[auto_1fr] lg:gap-x-14 lg:gap-y-5 xl:gap-x-20"
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
            className={`relative z-10 mx-auto w-full max-w-[16rem] rounded-2xl bg-forest-900 px-6 py-8 text-center text-white shadow-[0_24px_50px_-28px_rgba(6,36,24,0.85)] lg:col-start-1 lg:row-start-2 lg:max-w-none lg:self-center ${UNDER_LABEL}`}
            initial={{ opacity: 0, y: 14 }}
            animate={seen ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <p className="text-lg font-extrabold">Producers</p>
            <p className="mt-1 font-semibold text-white/70">Farmers</p>
          </motion.div>

          {/* 2. farm-gate aggregator and production mandi (side by side when stacked, squeezed on the narrowest phones) */}
          <div className="mx-auto grid w-full max-w-[24rem] grid-cols-2 gap-6 min-[360px]:gap-8 lg:col-start-2 lg:row-start-2 lg:max-w-none lg:grid-cols-1 lg:gap-12 lg:self-center">
            {middle.map((m, i) => (
              <NodeCard key={m.title} node={m} show={seen} delay={0.15 + i * 0.1} center innerRef={(el) => (middleRefs.current[i] = el)} />
            ))}
          </div>

          {/* 3. the hub */}
          <motion.div
            ref={hubRef}
            className="relative z-10 mx-auto w-full max-w-[19rem] rounded-3xl bg-forest-900 px-6 py-8 text-center text-white shadow-[0_30px_60px_-30px_rgba(6,36,24,0.85)] lg:col-start-3 lg:row-start-2 lg:max-w-none lg:self-center"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={seen ? { opacity: 1, scale: 1 } : undefined}
            transition={{ duration: 0.8, ease: EASE, delay: 0.7 }}
          >
            <BloomlyLogo mark play={seen} className="mx-auto w-11" />
            <p className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-leaf-300">Bloomly's</p>
            <p className="mt-1 text-[1.6rem] font-extrabold leading-tight tracking-[-0.02em]">Private Mandi</p>
            <ul className="mt-6 divide-y divide-white/10 border-t border-white/10 text-[0.9375rem] text-white/85">
              {hubPoints.map((point) => (
                <li key={point} className="py-2.5 last:pb-0">
                  {point}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* 4. every channel out */}
          <ColumnLabel column={`${STACK} lg:col-start-4`}>Consumption regions</ColumnLabel>
          <div ref={channelGroupRef} className={`grid gap-3 lg:col-start-4 lg:row-start-2 lg:gap-4 lg:self-center ${STACK} ${UNDER_LABEL}`}>
            {channels.map((c, i) => (
              <NodeCard key={c.title} node={c} show={seen} delay={1.2 + i * 0.08} compact innerRef={(el) => (channelRefs.current[i] = el)} />
            ))}
          </div>

          {/* 5. consumers */}
          <p className={`text-center text-lg font-extrabold text-ink lg:col-start-5 lg:row-start-2 lg:self-center lg:text-left ${STACK}`}>
            <span aria-hidden className="lg:hidden">↓ </span>
            <span aria-hidden className="hidden lg:inline">→ </span>
            Consumers
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

        <Reveal className="card mt-12 p-7 md:mt-16 md:p-10">
          <ol className="relative grid gap-7 lg:grid-cols-5 lg:gap-6">
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
