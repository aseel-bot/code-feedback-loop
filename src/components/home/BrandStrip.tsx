import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { BRANDS, BRAND_ICONS, BRAND_WORDMARKS, BRAND_LOCAL_LOGOS, CARS } from "@/data/site";
import { containerStagger, fadeUp } from "@/lib/motion";

function BrandLogo({ brand }: { brand: string }) {
  const localSrc = BRAND_LOCAL_LOGOS[brand];
  const slug = BRAND_ICONS[brand];
  const [failed, setFailed] = useState(false);
  const wordmark = BRAND_WORDMARKS[brand] ?? brand;

  // Primary source: Local WebP image downloaded from Adel Cars
  // Secondary source: CDN simple-icons fallback
  const imgSrc = !failed && localSrc ? localSrc : slug ? `https://cdn.simpleicons.org/${slug}/9aa3af` : null;

  if (!imgSrc || (failed && !localSrc)) {
    return (
      <span className="font-display text-[13px] font-bold tracking-[0.08em] text-foreground/80 transition group-hover:text-accent">
        {wordmark}
      </span>
    );
  }

  return (
    <img
      src={imgSrc}
      alt={`شعار ${brand}`}
      loading="lazy"
      width={48}
      height={48}
      onError={() => setFailed(true)}
      className="size-10 object-contain brightness-95 opacity-85 transition-all duration-300 group-hover:scale-110 group-hover:opacity-100 group-hover:brightness-105"
    />
  );
}

export function BrandStrip() {
  const counts = CARS.reduce<Record<string, number>>((acc, c) => {
    acc[c.brand] = (acc[c.brand] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <section className="mx-auto mt-14 max-w-7xl px-4 md:mt-20">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold tracking-widest text-accent">أكثر من 40 علامة تجارية وكالة</p>
          <h2 className="mt-1 font-display text-2xl md:text-3xl">تصفح السيارات حسب الماركة</h2>
        </div>
        <Link to="/cars" search={{}} className="text-sm font-bold text-accent transition hover:underline">
          عرض كل الماركات ({BRANDS.length})
        </Link>
      </div>

      <motion.div
        variants={containerStagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-10"
      >
        {BRANDS.map((b) => (
          <motion.div key={b} variants={fadeUp}>
            <Link
              to="/cars"
              search={{ brand: b }}
              className="group flex h-24 flex-col items-center justify-center gap-1.5 rounded-xl border border-border/80 bg-card p-2 text-center shadow-xs transition duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-[var(--shadow-card)] active:scale-95"
            >
              <BrandLogo brand={b} />
              <span className="truncate text-[11px] font-medium text-muted-foreground group-hover:text-foreground">
                {b}
                {counts[b] ? ` (${counts[b]})` : ""}
              </span>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
