import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/** رقم يتحرك عدديًا من القيمة القديمة للجديدة */
export function AnimatedNumber({
  value,
  duration = 400,
  from,
  className,
}: {
  value: number;
  duration?: number;
  /** قيمة بداية اختيارية لعدّاد تصاعدي عند أول ظهور */
  from?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(from ?? value);
  const fromRef = useRef(from ?? value);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (reduce) {
      setDisplay(value);
      fromRef.current = value;
      return;
    }
    const from = fromRef.current;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(from + (value - from) * eased));
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
      else fromRef.current = value;
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      fromRef.current = value;
    };
  }, [value, duration, reduce]);

  return <span className={className}>{display.toLocaleString("en-US")}</span>;
}
