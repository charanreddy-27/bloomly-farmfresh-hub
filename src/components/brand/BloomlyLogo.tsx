import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { LOGO_SHAPES, LOGO_VIEWBOX, type LogoShape } from "./logoPaths";

const LEAF = "#7FC141";
const EASE = [0.32, 0.72, 0, 1] as const;
const MARK_VIEWBOX = "110 50 2030 1940"; // just the two leaves

/* Each shape moves the way it would naturally grow: the two leaves unfurl from
   the diagonal seam they share, the letters rise into place, and the green "o" swells. */
const origin = (s: LogoShape) => {
  if (s.id === "leafUpper") return { originX: 0, originY: 1 };
  if (s.id === "leafLower") return { originX: 1, originY: 0 };
  return { originX: 0.5, originY: 0.5 };
};

const leaf: Variants = {
  hidden: { scale: 0, rotate: -22, opacity: 0 },
  show: (i: number) => ({ scale: 1, rotate: 0, opacity: 1, transition: { duration: 1.05, ease: EASE, delay: i * 0.13 } }),
};
const letter: Variants = {
  hidden: { y: 380, opacity: 0 },
  show: (i: number) => ({ y: 0, opacity: 1, transition: { duration: 0.8, ease: EASE, delay: 0.38 + i * 0.05 } }),
};
const dot: Variants = {
  hidden: { scale: 0, opacity: 0 },
  show: (i: number) => ({ scale: 1, opacity: 1, transition: { duration: 0.8, ease: EASE, delay: 0.44 + i * 0.05 } }),
};

type Props = {
  className?: string;
  /** "dark" = green letters for light backgrounds; "light" = white letters for dark backgrounds. */
  tone?: "dark" | "light";
  /** Only the two leaves. */
  mark?: boolean;
  /** Overrides the leaf colour (used for the faint watermark). */
  leafColor?: string;
  /** true plays the build-in, false resets it; leave undefined for a static logo. */
  play?: boolean;
  title?: string;
};

/** The Bloomly logo drawn from its real artwork, shape by shape, so it can build itself. */
export function BloomlyLogo({ className, tone = "dark", mark = false, leafColor = LEAF, play, title = "Bloomly" }: Props) {
  const shapes = mark ? LOGO_SHAPES.filter((s) => s.kind === "leaf") : LOGO_SHAPES;
  const animated = play !== undefined;
  let letterIndex = 0;

  return (
    <motion.svg
      viewBox={mark ? MARK_VIEWBOX : `0 0 ${LOGO_VIEWBOX.w} ${LOGO_VIEWBOX.h}`}
      className={cn("block overflow-visible", className)}
      role={title ? "img" : undefined}
      aria-label={title || undefined}
      aria-hidden={title ? undefined : true}
      initial={animated ? "hidden" : false}
      animate={animated ? (play ? "show" : "hidden") : undefined}
    >
      {shapes.map((s) => {
        const green = s.kind !== "letter";
        const index = s.kind === "leaf" ? (s.id === "leafUpper" ? 0 : 1) : letterIndex++;
        return (
          <g key={s.id} transform={`translate(${s.x},${s.y})`}>
            <motion.path
              d={s.d}
              custom={index}
              variants={s.kind === "leaf" ? leaf : s.kind === "dot" ? dot : letter}
              style={{ ...origin(s), fill: green ? (s.kind === "leaf" ? leafColor : LEAF) : undefined }}
              className={cn(!green && "transition-[fill] duration-700", !green && (tone === "light" ? "fill-white" : "fill-forest"))}
            />
          </g>
        );
      })}
    </motion.svg>
  );
}
