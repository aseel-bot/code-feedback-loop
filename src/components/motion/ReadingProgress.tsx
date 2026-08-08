import { motion, useScroll, useSpring } from "framer-motion";

/** شريط تقدّم القراءة أعلى الصفحة */
export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40, mass: 0.4 });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-right bg-accent"
    />
  );
}
