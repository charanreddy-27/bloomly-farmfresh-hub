import { motion, type HTMLMotionProps } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";

type Props = HTMLMotionProps<"div"> & {
  delay?: number;
  y?: number;
  amount?: number;
};

/** Fade-and-rise when scrolled into view. */
export function Reveal({ delay = 0, y = 32, amount = 0.3, children, ...rest }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 1, ease: EASE_OUT, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
