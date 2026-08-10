import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { motion } from "framer-motion";
import { BRANDS, CARS } from "@/data/site";
import { Button } from "@/components/ui/button";
import { T } from "@/lib/motion";

const CATEGORIES = ["سيدان", "دفع رباعي", "كروس أوفر", "بيك أب"] as const;
const PRICES = [80000, 120000, 200000, 300000, 500000];

const fmt = (n: number) => new Intl.NumberFormat("ar-SA").format(n);

export function QuickSearch() {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [category, setCategory] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const models = useMemo(
    () => [...new Set(CARS.filter((c) => !brand || c.brand === brand).map((c) => c.model))],
    [brand],
  );

  const results = useMemo(
    () =>
      CARS.filter(
        (c) =>
          (!brand || c.brand === brand) &&
          (!model || c.model === model) &&
          (!category || c.category === category) &&
          (!maxPrice || (c.price ?? Infinity) <= Number(maxPrice)),
      ),
    [brand, model, category, maxPrice],
  );

  const hasFilters = Boolean(brand || model || category || maxPrice);
  const reset = () => {
    setBrand("");
    setModel("");
    setCategory("");
    setMaxPrice("");
  };

  const selectCls =
    "h-11 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground transition focus:border-accent focus:outline-none disabled:opacity-50";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0, transition: { ...T.hero, delay: 0.3 } }}
      className="mt-6 rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card)] md:mt-0 md:p-5"
    >
      <div className="mb-4 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <SlidersHorizontal className="size-4 shrink-0 text-accent" />
          <h2 className="truncate font-display text-sm text-muted-foreground">بحث سريع</h2>
        </div>
        {hasFilters && (
          <button
            onClick={reset}
            className="flex shrink-0 items-center gap-1 text-xs font-bold text-muted-foreground transition hover:text-accent"
          >
            <X className="size-3.5" /> مسح
          </button>
        )}
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <select
          aria-label="الماركة"
          value={brand}
          onChange={(e) => {
            setBrand(e.target.value);
            setModel("");
          }}
          className={selectCls}
        >
          <option value="">الماركة</option>
          {BRANDS.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
        <select
          aria-label="الموديل"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          disabled={!brand}
          className={selectCls}
        >
          <option value="">الموديل</option>
          {models.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
        <select
          aria-label="الفئة"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={selectCls}
        >
          <option value="">الفئة</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select
          aria-label="أعلى سعر"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className={selectCls}
        >
          <option value="">أعلى سعر</option>
          {PRICES.map((p) => (
            <option key={p} value={p}>
              حتى {fmt(p)} ريال
            </option>
          ))}
        </select>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(category === c ? "" : c)}
            className={`rounded-full border px-3 py-1.5 text-xs transition ${
              category === c
                ? "border-accent bg-accent text-accent-foreground"
                : "border-border hover:border-accent/60"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
        <p className="min-w-0 truncate text-sm text-muted-foreground">
          {results.length ? (
            <>
              <span className="font-bold text-accent">{results.length}</span> سيارة مطابقة
              {results[0]?.monthly ? ` — تبدأ من ${fmt(results[0].monthly)} ريال/شهريًا` : ""}
            </>
          ) : (
            "لا توجد نتائج مطابقة — جرّب توسيع الفلاتر"
          )}
        </p>
        <Button asChild size="lg" className="h-11 shrink-0">
          <Link
            to="/cars"
            search={{
              brand: brand || undefined,
              model: model || undefined,
              category: category || undefined,
            }}
          >
            <Search className="size-4" /> ابحث
          </Link>
        </Button>
      </div>
    </motion.div>
  );
}
