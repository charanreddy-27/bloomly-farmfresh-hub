import { animate, motion, useInView, useMotionValue, useMotionValueEvent, useReducedMotion, useTransform, type MotionValue } from "framer-motion";
import { Boxes, Building2, Store, Tractor, Truck, type LucideIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ChapterLabel } from "@/components/site/ChapterLabel";
import { SplitText } from "@/components/motion/SplitText";
import { model } from "@/lib/content";
import { cn } from "@/lib/utils";

/* Diagram geometry (viewBox 600 × 560). HTML nodes are placed at the same coordinates in %. */
const W = 600;
const H = 560;
const pct = (x: number, y: number) => ({ left: `${(x / W) * 100}%`, top: `${(y / H) * 100}%` });

const SOURCES = [
  { x: 150, y: 62, icon: Tractor },
  { x: 450, y: 62, icon: Truck },
];
const HUB = { x: 300, y: 290 };
const CHANNELS = [
  { x: 92, y: 500, icon: Building2 },
  { x: 300, y: 512, icon: Boxes },
  { x: 508, y: 500, icon: Store },
];

const PATHS_IN = ["M150 96 C150 190, 300 160, 300 224", "M450 96 C450 190, 300 160, 300 224"];
const PATHS_OUT = ["M300 356 C300 430, 92 410, 92 478", "M300 356 L300 490", "M300 356 C300 430, 508 410, 508 478"];
const FRUIT_COLOURS = ["#E8A23A", "#8BB55E", "#C9544B", "#EFC94C"];

const STEP_BREAKS = [0, 0.36, 0.66, 1];

function Particles({ paths, opacity, seed }: { paths: string[]; opacity: MotionValue<number>; seed: number }) {
  return (
    <motion.g style={{ opacity }}>
      {paths.flatMap((d, i) =>
        [0, 1, 2].map((k) => (
          <circle key={`${i}-${k}`} r={5.5} fill={FRUIT_COLOURS[(i + k + seed) % FRUIT_COLOURS.length]}>
            <animateMotion dur="2.7s" repeatCount="indefinite" begin={`-${k * 0.9 + i * 0.35}s`} path={d} />
          </circle>
        )),
      )}
    </motion.g>
  );
}

function Node({ at, on, icon: Icon, label, sub }: { at: { x: number; y: number }; on: MotionValue<number>; icon: LucideIcon; label: string; sub?: string }) {
  const scale = useTransform(on, [0, 1], [0.7, 1]);
  const opacity = useTransform(on, [0, 1], [0.25, 1]);
  return (
    <div className="absolute w-[30%] -translate-x-1/2 -translate-y-1/2" style={pct(at.x, at.y)}>
      <motion.div
        style={{ scale, opacity }}
        className="flex flex-col items-center gap-1.5 rounded-2xl border border-forest/10 bg-white px-2 py-2.5 text-center shadow-[0_12px_30px_-16px_rgba(7,38,26,0.45)] md:gap-2 md:px-3 md:py-3.5"
      >
        <span className="grid h-7 w-7 place-items-center rounded-full bg-leaf-100 text-forest md:h-9 md:w-9">
          <Icon className="h-3.5 w-3.5 md:h-[18px] md:w-[18px]" strokeWidth={1.8} />
        </span>
        <span className="text-balance text-[10px] font-semibold leading-tight text-ink sm:text-xs md:text-sm">{label}</span>
        {sub && <span className="hidden text-[10px] uppercase tracking-[0.16em] text-ink-muted md:block">{sub}</span>}
      </motion.div>
    </div>
  );
}

function Hub({ on }: { on: MotionValue<number> }) {
  const scale = useTransform(on, [0, 1], [0.6, 1]);
  const glow = useTransform(on, [0, 1], [0, 1]);
  return (
    <div className="absolute w-[24%] -translate-x-1/2 -translate-y-1/2" style={pct(HUB.x, HUB.y)}>
      <motion.div style={{ scale }} className="relative aspect-square">
        <motion.div style={{ opacity: glow }} className="absolute inset-0">
          <span className="absolute -inset-3 [background:radial-gradient(closest-side,rgba(139,181,94,0.35),transparent)]" />
        </motion.div>
        <div className="relative grid h-full w-full place-items-center rounded-full bg-forest text-center text-cream shadow-[0_20px_50px_-15px_rgba(15,76,50,0.8)] ring-4 ring-cream">
          <div className="flex flex-col items-center gap-0.5 px-2">
            <svg viewBox="0 0 24 24" className="h-4 w-4 md:h-6 md:w-6" aria-hidden>
              <path d="M5 13C6 7 11 4 19 4c-1 6-6 9-14 9Z" fill="#7FC141" />
              <path d="M2 21c1-5 5-7 11-7-1 4-5 7-11 7Z" fill="#7FC141" />
            </svg>
            <span className="font-display text-[11px] leading-tight md:text-lg">Bloomly</span>
            <span className="text-[8px] font-semibold uppercase leading-tight tracking-[0.12em] text-cream/70 md:text-[10px]">Dispatch Center</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function FlowDiagram({ progress }: { progress: MotionValue<number> }) {
  const reduce = useReducedMotion();
  const sourcesOn = useTransform(progress, [0, 0.06], [0, 1]);
  const inDraw = useTransform(progress, [0.06, 0.3], [0, 1]);
  const hubOn = useTransform(progress, [0.28, 0.42], [0, 1]);
  const inFlow = useTransform(progress, [0.34, 0.44], [0, 1]);
  const outDraw = useTransform(progress, [0.48, 0.72], [0, 1]);
  const channelsOn = useTransform(progress, [0.64, 0.78], [0, 1]);
  const outFlow = useTransform(progress, [0.76, 0.88], [0, 1]);
  // a zero-length path with round caps still paints a dot — hide until it has length
  const inVisible = useTransform(inDraw, [0, 0.01], [0, 1]);
  const outVisible = useTransform(outDraw, [0, 0.01], [0, 1]);

  return (
    <div className="relative mx-auto aspect-[600/560] w-full max-w-[600px]">
      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
        {[...PATHS_IN, ...PATHS_OUT].map((d) => (
          <path key={`guide-${d}`} d={d} fill="none" stroke="#0F4C32" strokeOpacity="0.14" strokeWidth="2" strokeDasharray="4 7" />
        ))}
        {PATHS_IN.map((d) => (
          <motion.path key={d} d={d} fill="none" stroke="#0F4C32" strokeWidth="2.5" strokeLinecap="round" style={{ pathLength: inDraw, opacity: inVisible }} />
        ))}
        {PATHS_OUT.map((d) => (
          <motion.path key={d} d={d} fill="none" stroke="#8BB55E" strokeWidth="2.5" strokeLinecap="round" style={{ pathLength: outDraw, opacity: outVisible }} />
        ))}
        {!reduce && <Particles paths={PATHS_IN} opacity={inFlow} seed={0} />}
        {!reduce && <Particles paths={PATHS_OUT} opacity={outFlow} seed={1} />}
      </svg>

      {SOURCES.map((s, i) => (
        <Node key={i} at={s} on={sourcesOn} icon={s.icon} label={model.sources[i]} sub={`Way in ${i + 1}`} />
      ))}
      <Hub on={hubOn} />
      {CHANNELS.map((c, i) => (
        <Node key={i} at={c} on={channelsOn} icon={c.icon} label={model.channels[i]} />
      ))}
    </div>
  );
}

function StepRow({ index, active, progress }: { index: number; active: boolean; progress: MotionValue<number> }) {
  const step = model.steps[index];
  const fill = useTransform(progress, [STEP_BREAKS[index], STEP_BREAKS[index + 1]], [0, 1]);
  return (
    <li className="relative flex gap-5 pb-8 last:pb-0">
      <div className="relative w-px shrink-0 bg-forest/15">
        <motion.div className="absolute inset-x-0 top-0 h-full origin-top bg-leaf" style={{ scaleY: fill }} />
      </div>
      <div className={cn("transition-opacity duration-700", active ? "opacity-100" : "opacity-35")}>
        <p className="text-xs font-semibold tracking-[0.2em] text-leaf-600">{step.number}</p>
        <h3 className="mt-1 font-display text-2xl text-forest xl:text-3xl">{step.title}</h3>
        <p className="mt-2 max-w-md text-ink-soft">{step.body}</p>
      </div>
    </li>
  );
}

/** The diagram draws itself once when it comes into view — no pinning, no scroll-scrubbing. */
export default function HybridModel() {
  const diagramRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(diagramRef, { once: true, amount: 0.4 });
  const progress = useMotionValue(reduce ? 1 : 0);
  const [activeStep, setActiveStep] = useState(reduce ? 2 : -1);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(progress, 1, { duration: 4.2, ease: "linear" });
    return () => controls.stop();
  }, [inView, reduce, progress]);

  useMotionValueEvent(progress, "change", (p) => {
    setActiveStep(p <= 0 ? -1 : p < STEP_BREAKS[1] ? 0 : p < STEP_BREAKS[2] ? 1 : 2);
  });

  return (
    <section id="model" className="relative bg-cream-50 py-28 md:py-40">
      <div
        className="pointer-events-none absolute inset-0 opacity-60 [background-image:radial-gradient(#0F4C3214_1px,transparent_1px)] [background-size:22px_22px]"
        aria-hidden
      />
      <div className="container relative grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:grid-rows-[auto_1fr] lg:gap-x-16 lg:gap-y-10">
        <div className="lg:col-start-1 lg:row-start-1">
          <ChapterLabel number="03" label="The model" />
          <SplitText text={model.headline} className="display-lg mt-6 text-forest" accentClassName="accent-italic text-leaf-600" />
          <p className="mt-5 max-w-md text-lg text-ink-soft">{model.sub}</p>
        </div>

        <div ref={diagramRef} className="flex items-center justify-center lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <FlowDiagram progress={progress} />
        </div>

        <ol className="lg:col-start-1 lg:row-start-2">
          {model.steps.map((_, i) => (
            <StepRow key={i} index={i} active={i <= activeStep} progress={progress} />
          ))}
        </ol>
      </div>
    </section>
  );
}
