import { motion, type HTMLMotionProps } from "framer-motion";

/** One quiet fade-up the first time a block scrolls into view. The only scroll animation on the site. */
export function Reveal({ delay = 0, children, ...rest }: HTMLMotionProps<"div"> & { delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1], delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
