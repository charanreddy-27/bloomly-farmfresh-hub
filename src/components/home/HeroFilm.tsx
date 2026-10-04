import { AnimatePresence, motion, useMotionValue, useReducedMotion, type MotionValue } from "framer-motion";
import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { BloomlyLogo } from "@/components/brand/BloomlyLogo";
import { hero } from "@/lib/content";
import { EASE_PREMIUM } from "@/lib/motion";

/* ------------------------------------------------------------------
   "What Bloomly solves", as a 20-second looping film drawn on canvas.

   Everything is laid out in a normalised space — `a` runs from the farms (0)
   to the businesses (1), `b` runs across (-0.5…0.5) — and mapped into whatever
   rectangle the hero gives us, landscape or portrait. That is what lets the same
   film sit in the wide hero window, go full-bleed on scroll, and stand upright on a phone.
------------------------------------------------------------------- */

const DURATION = 20;
const SCENE_ENDS = [3.0, 5.6, 10.2, 14.4, DURATION];
const SPEED = 1.6; // plays the whole loop faster — this now runs once per view, not as a long ambient background
const STILL_AT = 16.5; // the frame shown to reduced-motion users

const CREAM = [246, 243, 234] as const;
const SAGE = [176, 208, 150] as const;
const FRUIT = ["#E9A53F", "#A9CB8E", "#F0C766"];

type Pt = { a: number; b: number };

function mulberry32(seed: number) {
  let t = seed;
  return () => {
    t = (t + 0x6d2b79f5) | 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

const rnd = mulberry32(11);
const FARMS: Pt[] = Array.from({ length: 12 }, (_, i) => {
  const col = i % 3;
  const row = Math.floor(i / 3);
  return { a: 0.065 + col * 0.058 + (rnd() - 0.5) * 0.02, b: (row / 3 - 0.5) * 0.66 + (col === 1 ? 0.07 : -0.02) + (rnd() - 0.5) * 0.05 };
});
const STORES: Pt[] = Array.from({ length: 8 }, (_, i) => {
  const col = i % 2;
  const row = Math.floor(i / 2);
  return { a: 0.865 + col * 0.068, b: (row / 3 - 0.5) * 0.62 + (col ? 0.07 : -0.04) };
});
const HUB: Pt = { a: 0.5, b: 0 };
const ROUTES = FARMS.map((_, i) => ({
  farm: i,
  store: (i * 3 + 1) % STORES.length,
  wander1: (rnd() - 0.5) * 1.15,
  wander2: (rnd() - 0.5) * 1.15,
  phase1: rnd() * Math.PI * 2,
  phase2: rnd() * Math.PI * 2,
  cut: 0.34 + rnd() * 0.42, // where a broken route gives up
  broken: rnd() < 0.64,
  speed: 0.07 + rnd() * 0.17, // erratic pace before Bloomly
}));

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const smooth = (v: number) => v * v * (3 - 2 * v);
const ramp = (t: number, from: number, to: number) => smooth(clamp01((t - from) / (to - from)));
const lerp = (x: number, y: number, t: number) => x + (y - x) * t;
const cubic = (p0: number, p1: number, p2: number, p3: number, t: number) => {
  const u = 1 - t;
  return u * u * u * p0 + 3 * u * u * t * p1 + 3 * u * t * t * p2 + t * t * t * p3;
};
const rgba = (c: readonly number[], alpha: number) => `rgba(${c[0]},${c[1]},${c[2]},${alpha})`;

/** Position along a route at `s` (0 farm → 1 store): tangled before Bloomly, via the hub after. */
function routePoint(r: (typeof ROUTES)[number], s: number, time: number, order: number): Pt {
  const f = FARMS[r.farm];
  const g = STORES[r.store];

  // before: one long wandering curve that sways as if nobody is steering it
  const w1 = r.wander1 * Math.sin(time * 0.55 + r.phase1);
  const w2 = r.wander2 * Math.sin(time * 0.43 + r.phase2);
  const ca = cubic(f.a, lerp(f.a, g.a, 0.3), lerp(f.a, g.a, 0.7), g.a, s);
  const cb = cubic(f.b, f.b + w1, g.b + w2, g.b, s);

  // after: two clean S-curves meeting at the hub
  let oa: number;
  let ob: number;
  if (s < 0.5) {
    const u = s * 2;
    const mid = (f.a + HUB.a) / 2;
    oa = cubic(f.a, mid, mid, HUB.a, u);
    ob = cubic(f.b, f.b, HUB.b, HUB.b, u);
  } else {
    const u = (s - 0.5) * 2;
    const mid = (HUB.a + g.a) / 2;
    oa = cubic(HUB.a, mid, mid, g.a, u);
    ob = cubic(HUB.b, HUB.b, g.b, g.b, u);
  }
  return { a: lerp(ca, oa, order), b: lerp(cb, ob, order) };
}

type Props = {
  /** The film's visible rectangle inside the canvas, in CSS px. */
  rect: { x: MotionValue<number>; y: MotionValue<number>; w: MotionValue<number>; h: MotionValue<number>; radius: MotionValue<number> };
  /** Fades the caption / controls (used when the hero takes over with its own headline). */
  uiOpacity: MotionValue<number>;
  /** 0…1: pulls the film into its connected, flowing state whatever beat the loop is on (used as the frame opens). */
  settle: MotionValue<number>;
  /** Keeps the film from starting before the page intro has lifted. */
  ready: boolean;
};

export default function HeroFilm({ rect, uiOpacity, settle, ready }: Props) {
  const reduce = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const [scene, setScene] = useState(reduce ? 4 : 0);
  const [hubOn, setHubOn] = useState(!!reduce);
  const [paused, setPaused] = useState(false);
  const progress = useMotionValue(0);
  const pausedRef = useRef(false);
  pausedRef.current = paused;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || !ready) return;

    let raf = 0;
    let visible = true;
    let last = performance.now();
    let time = reduce ? STILL_AT : 0;
    let cssW = 0;
    let cssH = 0;
    const particles = ROUTES.flatMap((_, r) => [0, 1].map((k) => ({ r, s: (k * 0.5 + r * 0.137) % 1, colour: FRUIT[(r + k) % FRUIT.length] })));
    const stock = STORES.map(() => 0); // how "stocked" each store looks

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cssW = canvas.clientWidth;
      cssH = canvas.clientHeight;
      canvas.width = Math.round(cssW * dpr);
      canvas.height = Math.round(cssH * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting), { threshold: 0 });
    io.observe(canvas);

    const draw = (dt: number) => {
      const x = rect.x.get();
      const y = rect.y.get();
      const w = rect.w.get();
      const h = rect.h.get();
      if (w < 10 || h < 10) return;

      const portrait = ramp(h / w, 0.85, 1.25);
      const spread = h < 230 ? 0.74 : 0.92;
      const map = (p: Pt) => ({
        x: lerp(x + p.a * w, x + w * (0.5 + p.b * 0.86), portrait),
        y: lerp(y + h * (0.5 + p.b * spread), y + h * (0.1 + p.a * 0.78), portrait),
      });
      const unit = Math.min(Math.max(Math.min(w, h) / 420, 0.62), 1.25);

      const t = time;
      const force = settle.get();
      const linesOn = Math.max(ramp(t, 5.6, 6.9), force);
      const order = Math.max(ramp(t, 10.4, 12.8), force);
      const hubIn = Math.max(ramp(t, 10.0, 11.3), force);
      const fade = Math.max(1 - ramp(t, 18.9, 19.8), force);

      // ---- stage
      ctx.clearRect(0, 0, cssW, cssH);
      const bg = ctx.createLinearGradient(x, y, x + w, y + h);
      bg.addColorStop(0, "#04160F");
      bg.addColorStop(1, "#0A2E20");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, cssW, cssH); // the hero's clip decides what is visible

      const hub = map(HUB);
      const hubR = Math.max(17, 34 * unit);
      if (hubIn > 0) {
        const glow = ctx.createRadialGradient(hub.x, hub.y, 0, hub.x, hub.y, hubR * 7);
        glow.addColorStop(0, rgba(SAGE, 0.16 * hubIn * fade));
        glow.addColorStop(1, rgba(SAGE, 0));
        ctx.fillStyle = glow;
        ctx.fillRect(x, y, w, h);
      }

      // ---- routes
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ROUTES.forEach((r) => {
        const end = r.broken ? lerp(r.cut, 1, order) : 1;
        const steps = 30;
        const tint = [lerp(CREAM[0], SAGE[0], order), lerp(CREAM[1], SAGE[1], order), lerp(CREAM[2], SAGE[2], order)];
        const flicker = r.broken ? 0.75 + 0.25 * Math.sin(t * 3.1 + r.phase1) * (1 - order) : 1;
        ctx.lineWidth = lerp(0.9, 1.15, order) * Math.max(unit, 0.8);
        for (let i = 0; i < steps; i++) {
          const s0 = (i / steps) * end;
          const s1 = ((i + 1) / steps) * end;
          const p0 = map(routePoint(r, s0, t, order));
          const p1 = map(routePoint(r, s1, t, order));
          // broken routes thin out toward the point where they give up
          const tail = r.broken ? lerp(1 - i / steps, 1, order) : 1;
          ctx.strokeStyle = rgba(tint, lerp(0.24, 0.36, order) * linesOn * fade * flicker * tail);
          ctx.beginPath();
          ctx.moveTo(p0.x, p0.y);
          ctx.lineTo(p1.x, p1.y);
          ctx.stroke();
        }
      });

      // ---- fruit travelling the routes
      stock.forEach((v, i) => (stock[i] = Math.max(0, v - dt * lerp(0.42, 0.1, order))));
      particles.forEach((p) => {
        const r = ROUTES[p.r];
        const before = p.s;
        p.s += dt * lerp(r.speed, 0.15, order) * (linesOn > 0.05 ? 1 : 0);
        const end = r.broken ? lerp(r.cut, 1, order) : 1;
        if (p.s >= 1) {
          p.s -= 1;
          if (before < 1 && end >= 0.999) stock[r.store] = Math.min(1, stock[r.store] + lerp(0.55, 0.4, order));
        }
        if (p.s > end) return; // lost on the way
        const pos = map(routePoint(r, p.s, t, order));
        const lifeIn = clamp01(p.s / 0.07);
        const lifeOut = clamp01((end - p.s) / (r.broken && order < 0.99 ? 0.16 : 0.06));
        const alpha = lifeIn * lifeOut * linesOn * fade;
        if (alpha <= 0.01) return;
        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.colour;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 3 * unit * (0.6 + 0.4 * lifeOut), 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      // ---- farms: a ring with a seed inside
      FARMS.forEach((f, i) => {
        const on = Math.max(ramp(t, 0.3 + i * 0.15, 1.05 + i * 0.15), force) * fade;
        if (on <= 0) return;
        const p = map(f);
        ctx.strokeStyle = rgba(CREAM, 0.55 * on);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 6.2 * unit * (0.6 + 0.4 * on), 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = rgba(SAGE, 0.95 * on);
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.2 * unit, 0, Math.PI * 2);
        ctx.fill();
      });

      // ---- businesses: a shelf that is either stocked or not
      STORES.forEach((g, j) => {
        const on = Math.max(ramp(t, 3.0 + j * 0.2, 3.8 + j * 0.2), force) * fade;
        if (on <= 0) return;
        const p = map(g);
        const size = 13 * unit;
        const rr = 2.5 * unit;
        ctx.beginPath();
        ctx.roundRect(p.x - size / 2, p.y - size / 2, size, size, rr);
        ctx.fillStyle = rgba(CREAM, stock[j] * 0.92 * on);
        ctx.fill();
        ctx.strokeStyle = rgba(CREAM, 0.6 * on);
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // ---- the hub ring (the leaf mark itself is real DOM, placed on top)
      if (hubIn > 0) {
        ctx.beginPath();
        ctx.arc(hub.x, hub.y, hubR * (0.7 + 0.3 * hubIn), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(7,38,26,${0.96 * hubIn * fade})`;
        ctx.fill();
        ctx.strokeStyle = rgba(SAGE, 0.55 * hubIn * fade);
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // ---- labels
      const labelAlpha = 0.5 * fade;
      ctx.font = `500 ${Math.round(Math.max(9, 10.5 * unit))}px Geist, system-ui, sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const label = (text: string, at: Pt, alpha: number, dy: number) => {
        if (alpha <= 0.01) return;
        const land = map(at);
        (ctx as CanvasRenderingContext2D & { letterSpacing?: string }).letterSpacing = "0.18em";
        const half = ctx.measureText(text.toUpperCase()).width / 2 + 10;
        // keep the label inside the frame on narrow screens
        const lx = Math.min(Math.max(lerp(land.x, x + w / 2, portrait), x + half), x + w - half);
        const ly = lerp(y + Math.max(16, h * 0.07), land.y + dy, portrait);
        ctx.fillStyle = rgba(CREAM, alpha);
        ctx.fillText(text.toUpperCase(), lx, ly);
      };
      label(hero.film.farmers, { a: 0.123, b: 0 }, labelAlpha * Math.max(ramp(t, 0.8, 2.0), force), -h * 0.085);
      label(hero.film.businesses, { a: 0.9, b: 0 }, labelAlpha * Math.max(ramp(t, 3.6, 4.8), force), h * 0.085);

      // keep the DOM leaf mark locked to the hub
      if (hubRef.current) {
        hubRef.current.style.transform = `translate(${hub.x - hubR * 0.62}px, ${hub.y - hubR * 0.6}px)`;
        hubRef.current.style.width = `${hubR * 1.24}px`;
        hubRef.current.style.opacity = String(fade);
      }
    };

    let lastScene = -1;
    let lastHub: boolean | null = null;
    const sync = () => {
      const s = SCENE_ENDS.findIndex((end) => time < end);
      if (s !== lastScene) setScene((lastScene = s === -1 ? 4 : s));
      const on = (time > 10.3 && time < 19.2) || settle.get() > 0.4;
      if (on !== lastHub) setHubOn((lastHub = on));
      progress.set(time / DURATION);
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!visible || document.hidden) return;
      const step = dt * SPEED;
      if (!reduce && !pausedRef.current) time = (time + step) % DURATION;
      draw(reduce || pausedRef.current ? 0 : step);
      sync();
    };

    // warm the particle field so the reduced-motion still frame shows fruit mid-flow
    if (reduce) for (let i = 0; i < 240; i++) draw(1 / 30);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [ready, reduce, rect, progress, settle]);

  return (
    <>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />

      {/* Bloomly's real leaf mark, blooming at the hub */}
      <div ref={hubRef} className="pointer-events-none absolute left-0 top-0 will-change-transform" aria-hidden>
        <BloomlyLogo mark play={hubOn} />
      </div>

      {/* Frame chrome: hairline, subtitle-style caption, progress, pause */}
      <motion.div
        className="pointer-events-none absolute"
        style={{ left: rect.x, top: rect.y, width: rect.w, height: rect.h, borderRadius: rect.radius, opacity: uiOpacity }}
      >
        <div className="absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/10" />

        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center px-4 pb-4 md:pb-6" role="status" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.p
              key={scene}
              className="max-w-[34rem] text-balance text-center font-display text-[1.05rem] leading-snug text-cream md:text-[1.6rem]"
              initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -6, filter: "blur(6px)" }}
              transition={{ duration: 0.7, ease: EASE_PREMIUM }}
            >
              {hero.film.captions[scene]}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-px overflow-hidden rounded-b-[inherit] bg-white/10">
          <motion.div className="h-full origin-left bg-leaf" style={{ scaleX: progress }} />
        </div>

        {!reduce && (
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? "Play the animation" : "Pause the animation"}
            className="pointer-events-auto absolute bottom-3 right-3 grid h-8 w-8 place-items-center rounded-full border border-white/15 bg-forest-900/50 text-cream/80 backdrop-blur transition-colors duration-300 hover:border-white/40 hover:text-cream md:bottom-5 md:right-5"
          >
            {paused ? <Play className="h-3 w-3 translate-x-px" strokeWidth={1.75} /> : <Pause className="h-3 w-3" strokeWidth={1.75} />}
          </button>
        )}
      </motion.div>
    </>
  );
}
