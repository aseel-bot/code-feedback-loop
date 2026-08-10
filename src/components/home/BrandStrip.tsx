import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { BRANDS, BRAND_ICONS, BRAND_WORDMARKS, CARS } from "@/data/site";
import { containerStagger, fadeUp } from "@/lib/motion";

function BrandLogo({ brand }: { brand: string }) {
  const slug = BRAND_ICONS[brand];
  const [failed, setFailed] = useState(false);
  const wordmark = BRAND_WORDMARKS[brand] ?? brand;

  if (!slug || failed) {
    return (
      <span className="font-display text-[13px] tracking-[0.12em] text-foreground/80 transition group-hover:text-accent">
        {wordmark}
      </span>
    );
  }

  return (
    <img
      src={`https://cdn.simpleicons.org/${slug}/9aa3af`}
      alt={`شعار ${brand}`}
      loading="lazy"
      width={40}
      height={40}
      onError={() => setFailed(true)}
      className="size-9 object-contain opacity-80 transition duration-300 group-hover:scale-110 group-hover:opacity-100"
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
          <p className="text-xs font-bold tracking-widest text-accent">أكثر من 40 علامة تجارية</p>
          <h2 className="mt-1 font-display text-2xl md:text-3xl">تصفح حسب الماركة</h2>
        </div>
        <Link to="/cars" search={{}} className="text-sm font-bold text-accent">
          كل الماركات
        </Link>
      </div>

      <motion.div
        variants={containerStagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9"
      >
        {BRANDS.map((b) => (
          <motion.div key={b} variants={fadeUp}>
            <Link
              to="/cars"
              search={{ brand: b }}
              className="group flex h-24 flex-col items-center justify-center gap-2 rounded-xl border border-border bg-card px-2 text-center transition duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-[var(--shadow-card)]"
            >
              <BrandLogo brand={b} />
              <span className="text-[11px] text-muted-foreground">
                {b}
                {counts[b] ? ` · ${counts[b]}` : ""}
              </span>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
