import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { EASE_OUT } from "@/lib/motion";

/** "01 ——— The problem" — the chapter marker that threads the homepage story together. */
export function ChapterLabel({ number, label, dark = false, className }: { number: string; label: string; dark?: boolean; className?: string }) {
  return (
    <motion.div
      className={cn("eyebrow", dark ? "text-cream/70" : "text-forest/70", className)}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 1 }}
      transition={{ duration: 0.6 }}
    >
      <span className={dark ? "text-leaf" : "text-leaf-600"}>{number}</span>
      <motion.span
        className={cn("h-px w-12 origin-left", dark ? "bg-cream/30" : "bg-forest/30")}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 1 }}
        transition={{ duration: 1, ease: EASE_OUT, delay: 0.1 }}
      />
      <span>{label}</span>
    </motion.div>
  );
}
