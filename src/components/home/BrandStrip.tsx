import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { BRANDS, BRAND_WORDMARKS, CARS } from "@/data/site";
import { containerStagger, fadeUp } from "@/lib/motion";

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
              className="group grid h-20 place-items-center rounded-xl border border-border bg-card px-2 text-center transition duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-[var(--shadow-card)]"
            >
              <span className="font-display text-[13px] tracking-[0.12em] text-foreground/80 transition group-hover:text-accent">
                {BRAND_WORDMARKS[b] ?? b}
              </span>
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
