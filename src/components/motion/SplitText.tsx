import { motion, type Variants } from "framer-motion";
import { Fragment, useMemo } from "react";
import { cn } from "@/lib/utils";
import { EASE_OUT } from "@/lib/motion";

type Part = { text: string; accent: boolean };
type Token = { word: string; accent: boolean; parts: Part[] };

/**
 * "Grow *with* us,\nnow" → lines of words, with *…* marking accent words.
 * Text glued to an accent (e.g. the comma in "*reliably*,") stays in the same word.
 */
export function parseMarked(text: string): Token[][] {
  return text.split("\n").map((line) => {
    const tokens: Token[] = [];
    let glue = false; // previous segment ended without whitespace
    line.split(/(\*[^*]+\*)/g).forEach((segment) => {
      if (!segment) return;
      const accent = segment.startsWith("*") && segment.endsWith("*");
      const clean = accent ? segment.slice(1, -1) : segment;
      const pieces = clean.split(/(\s+)/);
      pieces.forEach((piece, i) => {
        if (!piece) return;
        if (/^\s+$/.test(piece)) {
          glue = false;
          return;
        }
        const last = tokens[tokens.length - 1];
        if (last && glue && i === 0) {
          last.parts.push({ text: piece, accent });
          last.word += piece;
        } else {
          tokens.push({ word: piece, accent, parts: [{ text: piece, accent }] });
        }
        glue = true;
      });
    });
    return tokens;
  });
}

export const plainText = (text: string) => text.replace(/\*/g, "").replace(/\n/g, " ");

/** Static rendering of *accent* markup (no animation). */
export function Marked({ text, accentClassName = "accent-italic text-leaf" }: { text: string; accentClassName?: string }) {
  return (
    <>
      {text.split(/(\*[^*]+\*)/g).map((seg, i) =>
        seg.startsWith("*") && seg.endsWith("*") ? (
          <span key={i} className={accentClassName}>
            {seg.slice(1, -1)}
          </span>
        ) : (
          <Fragment key={i}>{seg}</Fragment>
        ),
      )}
    </>
  );
}

const word: Variants = {
  hidden: { y: "115%", rotate: 4 },
  show: { y: "0%", rotate: 0, transition: { duration: 1.1, ease: EASE_OUT } },
};

type Props = {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  accentClassName?: string;
  delay?: number;
  stagger?: number;
  /** Controlled start (e.g. after the preloader). Omit to trigger on scroll into view. */
  play?: boolean;
};

/** Masked, word-by-word rise. Accent words (*like this*) render in italic serif. */
export function SplitText({
  text,
  as = "h2",
  className,
  accentClassName = "accent-italic text-leaf",
  delay = 0,
  stagger = 0.06,
  play,
}: Props) {
  const lines = useMemo(() => parseMarked(text), [text]);
  const Tag = motion[as];

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };

  const trigger =
    play === undefined
      ? { initial: "hidden", whileInView: "show", viewport: { once: true, amount: 0.4 } }
      : { initial: "hidden", animate: play ? "show" : "hidden" };

  return (
    <Tag className={cn("text-balance", className)} aria-label={plainText(text)} variants={container} {...trigger}>
      {lines.map((line, li) => (
        <span key={li} className="block" aria-hidden>
          {line.map((t, wi) => (
            <Fragment key={wi}>
              <span className="-mb-[0.18em] -mr-[0.1em] inline-block overflow-hidden pb-[0.18em] pr-[0.1em] align-bottom">
                <motion.span variants={word} className="inline-block origin-bottom-left">
                  {t.parts.map((p, pi) => (
                    <span key={pi} className={p.accent ? accentClassName : undefined}>
                      {p.text}
                    </span>
                  ))}
                </motion.span>
              </span>
              {wi < line.length - 1 && " "}
            </Fragment>
          ))}
        </span>
      ))}
    </Tag>
  );
}
