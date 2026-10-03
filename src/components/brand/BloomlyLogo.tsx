import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { EASE_PREMIUM } from "@/lib/motion";
import { LOGO_SHAPES, LOGO_VIEWBOX, type LogoShape } from "./logoPaths";

const LEAF = "#7FC141";
const MARK_VIEWBOX = "110 50 2030 1940"; // just the two leaves

/* Each shape animates from where it would naturally grow:
   the leaves unfurl from the diagonal seam they share, letters rise, the green "o" swells like a bud. */
const origin = (s: LogoShape) => {
  if (s.id === "leafUpper") return { originX: 0, originY: 1 };
  if (s.id === "leafLower") return { originX: 1, originY: 0 };
  return { originX: 0.5, originY: 0.5 };
};

const leaf: Variants = {
  hidden: { scale: 0, rotate: -24, opacity: 0 },
  show: (i: number) => ({
    scale: 1,
    rotate: 0,
    opacity: 1,
    transition: { duration: 1.25, ease: EASE_PREMIUM, delay: i * 0.14 },
  }),
};
const letter: Variants = {
  hidden: { y: 420, opacity: 0 },
  show: (i: number) => ({ y: 0, opacity: 1, transition: { duration: 0.95, ease: EASE_PREMIUM, delay: 0.42 + i * 0.055 } }),
};
const dot: Variants = {
  hidden: { scale: 0, opacity: 0 },
  show: (i: number) => ({ scale: 1, opacity: 1, transition: { duration: 0.9, ease: EASE_PREMIUM, delay: 0.5 + i * 0.055 } }),
};

type Props = {
  className?: string;
  /** "dark" = forest letters (for light backgrounds); "light" = cream letters (for dark backgrounds). */
  tone?: "dark" | "light";
  /** Only the two leaves. */
  mark?: boolean;
  /** true/false plays or resets the build-in animation; leave undefined for a static logo. */
  play?: boolean;
  /** Leaves sway gently on hover. */
  interactive?: boolean;
  title?: string;
};

export function BloomlyLogo({ className, tone = "dark", mark = false, play, interactive = false, title = "Bloomly" }: Props) {
  const shapes = mark ? LOGO_SHAPES.filter((s) => s.kind === "leaf") : LOGO_SHAPES;
  const animated = play !== undefined;
  let letterIndex = 0;

  return (
    <motion.svg
      viewBox={mark ? MARK_VIEWBOX : `0 0 ${LOGO_VIEWBOX.w} ${LOGO_VIEWBOX.h}`}
      className={cn("block overflow-visible", className)}
      role="img"
      aria-label={title}
      initial={animated ? "hidden" : false}
      animate={animated ? (play ? "show" : "hidden") : undefined}
      whileHover={interactive ? "sway" : undefined}
    >
      {shapes.map((s) => {
        const isLeaf = s.kind === "leaf";
        const index = isLeaf ? (s.id === "leafUpper" ? 0 : 1) : letterIndex++;
        return (
          <g key={s.id} transform={`translate(${s.x},${s.y})`}>
            <motion.path
              d={s.d}
              custom={index}
              variants={
                isLeaf
                  ? {
                      ...leaf,
                      sway: { rotate: s.id === "leafUpper" ? [0, -7, 3, 0] : [0, 6, -2, 0], transition: { duration: 1.4, ease: "easeInOut" } },
                    }
                  : s.kind === "dot"
                    ? dot
                    : letter
              }
              style={{ ...origin(s), fill: isLeaf || s.kind === "dot" ? LEAF : undefined }}
              className={cn(
                !isLeaf && s.kind !== "dot" && "transition-[fill] duration-500",
                !isLeaf && s.kind !== "dot" && (tone === "light" ? "fill-cream" : "fill-forest"),
              )}
            />
          </g>
        );
      })}
    </motion.svg>
  );
}
