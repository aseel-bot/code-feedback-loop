import type { Transition, Variants } from "framer-motion";

/** منحنيات الحركة الموحّدة */
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;
export const EASE_HERO = [0.22, 1, 0.36, 1] as const;

/** مدد الحركة الموحّدة (بالثواني) */
export const DUR = {
  instant: 0.1,
  fast: 0.2,
  base: 0.35,
  slow: 0.55,
  hero: 0.9,
} as const;

export const T = {
  instant: { duration: DUR.instant, ease: "linear" },
  fast: { duration: DUR.fast, ease: EASE_OUT },
  base: { duration: DUR.base, ease: EASE_IN_OUT },
  slow: { duration: DUR.slow, ease: EASE_OUT },
  hero: { duration: DUR.hero, ease: EASE_HERO },
  spring: { type: "spring", stiffness: 320, damping: 34, mass: 0.9 },
} satisfies Record<string, Transition>;

/** تتابع خفيف بين عناصر المجموعة */
export const STAGGER = 0.07;

export const containerStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: STAGGER } },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: T.base },
};

export const fadeUpSlow: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: T.slow },
};

export const fadeScale: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  show: { opacity: 1, scale: 1, transition: T.base },
  exit: { opacity: 0, scale: 0.96, transition: T.fast },
};

/** إعدادات useInView الافتراضية: مرة واحدة فقط */
export const VIEWPORT = { once: true, amount: 0.2 } as const;
