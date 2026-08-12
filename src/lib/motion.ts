import type { Transition, Variants } from "framer-motion";

/** منحنيات الحركة الموحّدة المعتمدة في النظام (Cubic Bezier Curves) */
export const EASE_OUT = [0.23, 1, 0.32, 1] as const;
export const EASE_IN_OUT = [0.77, 0, 0.175, 1] as const;
export const EASE_HERO = [0.22, 1, 0.36, 1] as const;

/** مدد الحركة الموحّدة للواجهات (Durations in Seconds) */
export const DUR = {
  instant: 0.08,
  fast: 0.18,
  base: 0.28,
  slow: 0.42,
  hero: 0.75,
} as const;

export const T = {
  instant: { duration: DUR.instant, ease: "linear" },
  fast: { duration: DUR.fast, ease: EASE_OUT },
  base: { duration: DUR.base, ease: EASE_OUT },
  slow: { duration: DUR.slow, ease: EASE_IN_OUT },
  hero: { duration: DUR.hero, ease: EASE_HERO },
  spring: { type: "spring", stiffness: 360, damping: 28, mass: 0.8 },
} satisfies Record<string, Transition>;

/** تتابع سريعة وسلسة بين العناصر (45ms Stagger) */
export const STAGGER = 0.045;

export const containerStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: STAGGER } },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: T.base },
};

export const fadeUpSlow: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: T.slow },
};

export const fadeScale: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1, transition: T.base },
  exit: { opacity: 0, scale: 0.97, transition: T.fast },
};

/** إعدادات useInView الافتراضية للظهور عند التمرير */
export const VIEWPORT = { once: true, amount: 0.15 } as const;
