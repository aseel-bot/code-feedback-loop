import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { VIEWPORT, containerStagger, fadeUp, fadeUpSlow } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** slow للأقسام الكبيرة، base للعناصر العادية */
  variant?: "base" | "slow";
  delay?: number;
  as?: "div" | "section" | "article" | "li";
};

/** ظهور عنصر عند دخوله نطاق الرؤية — مرة واحدة فقط */
export function Reveal({ children, className, variant = "base", delay = 0, as = "div" }: RevealProps) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  const v: Variants = variant === "slow" ? fadeUpSlow : fadeUp;

  if (reduce) return <Comp className={className}>{children}</Comp>;

  return (
    <Comp
      className={className}
      variants={v}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      transition={{ delay }}
    >
      {children}
    </Comp>
  );
}

/** حاوية تُظهر أبناءها بتتابع خفيف عند التمرير */
export function RevealGroup({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      variants={containerStagger}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      {children}
    </motion.div>
  );
}

/** عنصر داخل RevealGroup */
export function RevealItem({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div className={className} variants={fadeUp}>
      {children}
    </motion.div>
  );
}
