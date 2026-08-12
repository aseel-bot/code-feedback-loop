import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X, ChevronDown, Check, Sparkles, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { BRANDS, CARS } from "@/data/site";
import { Button } from "@/components/ui/button";
import { AnimatedNumber } from "@/components/motion/AnimatedNumber";

const CATEGORIES = ["الكل", "سيدان", "دفع رباعي", "كروس أوفر", "بيك أب"] as const;
const PRICES = [
  { label: "أي سعر", value: "" },
  { label: "حتى 90,000 ريال", value: "90000" },
  { label: "حتى 150,000 ريال", value: "150000" },
  { label: "حتى 250,000 ريال", value: "250000" },
  { label: "حتى 500,000 ريال", value: "500000" },
];

const fmt = (n: number) => new Intl.NumberFormat("ar-SA").format(n);

// Emil Kowalski Easing & Transitions
const CUBIC_OUT = [0.23, 1, 0.32, 1] as const;
const T_SPRING = { type: "spring" as const, stiffness: 350, damping: 25 };

export function QuickSearch() {
  const reduce = useReducedMotion();
  const [query, setQuery] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [category, setCategory] = useState("الكل");
  const [maxPrice, setMaxPrice] = useState("");
  const [showLivePreview, setShowLivePreview] = useState(false);

  // Dynamic models filter based on brand
  const availableModels = useMemo(
    () => [...new Set(CARS.filter((c) => !brand || c.brand === brand).map((c) => c.model))],
    [brand],
  );

  // Auto live search filtering
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return CARS.filter((c) => {
      const matchQuery =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.brand.toLowerCase().includes(q) ||
        c.model.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        String(c.year).includes(q);

      const matchBrand = !brand || c.brand === brand;
      const matchModel = !model || c.model === model;
      const matchCategory = category === "الكل" || !category || c.category === category;
      const matchPrice = !maxPrice || (c.price ?? Infinity) <= Number(maxPrice);

      return matchQuery && matchBrand && matchModel && matchCategory && matchPrice;
    });
  }, [query, brand, model, category, maxPrice]);

  const hasFilters = Boolean(query || brand || model || category !== "الكل" || maxPrice);

  const reset = () => {
    setQuery("");
    setBrand("");
    setModel("");
    setCategory("الكل");
    setMaxPrice("");
  };

  const selectCls =
    "h-11 w-full rounded-xl border border-border bg-background/80 px-3 text-sm text-foreground shadow-xs backdrop-blur transition-all duration-200 hover:border-accent/50 focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none disabled:opacity-40 active:scale-[0.985]";

  return (
    <motion.div
      initial={reduce ? { opacity: 1 } : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: CUBIC_OUT }}
      className="relative mt-6 rounded-2xl border border-border/80 bg-card/95 p-4 shadow-[var(--shadow-card)] backdrop-blur-md md:mt-0 md:p-6"
    >
      {/* Header Bar */}
      <div className="mb-4 flex items-center justify-between gap-3 border-b border-border/60 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="grid size-8 place-items-center rounded-lg bg-accent/15 text-accent">
            <SlidersHorizontal className="size-4" />
          </div>
          <div>
            <h2 className="font-display text-sm font-bold text-foreground">محرك البحث الذكي الفوري</h2>
            <p className="text-[11px] text-muted-foreground">البحث والتصفية التلقائية الفورية</p>
          </div>
        </div>

        {hasFilters && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileTap={{ scale: 0.95 }}
            onClick={reset}
            className="flex items-center gap-1.5 rounded-lg border border-border/80 bg-muted/50 px-2.5 py-1 text-xs font-bold text-muted-foreground transition hover:border-accent/40 hover:bg-accent/10 hover:text-accent"
          >
            <X className="size-3.5" /> إعادة ضبط الفلاتر
          </motion.button>
        )}
      </div>

      {/* Direct Live Text Search Input */}
      <div className="relative mb-4">
        <Search className="pointer-events-none absolute start-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowLivePreview(true);
          }}
          onFocus={() => setShowLivePreview(true)}
          placeholder="ابحث بالاسم، الماركة، أو الموديل (مثل: كامري، تويوتا، 2026)..."
          className="h-12 w-full rounded-xl border border-border bg-background pe-9 ps-10 text-sm text-foreground shadow-xs transition duration-200 hover:border-accent/50 focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none active:scale-[0.99]"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute end-3 top-1/2 grid size-6 -translate-y-1/2 place-items-center rounded-full bg-muted text-muted-foreground transition hover:bg-accent hover:text-accent-foreground active:scale-95"
            aria-label="مسح النص"
          >
            <X className="size-3.5" />
          </button>
        )}
      </div>

      {/* Filter Selects Grid */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <label htmlFor="qs-brand" className="mb-1 block text-[11px] font-bold text-muted-foreground">
            الماركة
          </label>
          <select
            id="qs-brand"
            aria-label="الماركة"
            value={brand}
            onChange={(e) => {
              setBrand(e.target.value);
              setModel("");
            }}
            className={selectCls}
          >
            <option value="">كل الماركات</option>
            {BRANDS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="qs-model" className="mb-1 block text-[11px] font-bold text-muted-foreground">
            الموديل
          </label>
          <select
            id="qs-model"
            aria-label="الموديل"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            disabled={!brand}
            className={selectCls}
          >
            <option value="">كل الموديلات</option>
            {availableModels.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="qs-category" className="mb-1 block text-[11px] font-bold text-muted-foreground">
            نوع الهيكل
          </label>
          <select
            id="qs-category"
            aria-label="نوع الهيكل"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={selectCls}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="qs-price" className="mb-1 block text-[11px] font-bold text-muted-foreground">
            السقف السعري
          </label>
          <select
            id="qs-price"
            aria-label="السقف السعري"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className={selectCls}
          >
            {PRICES.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="mt-4 flex flex-wrap items-center gap-2 pt-2">
        <span className="text-[11px] font-bold text-muted-foreground">الفئات السريعة:</span>
        {CATEGORIES.map((c) => {
          const active = category === c;
          return (
            <button
              key={c}
              onClick={() => setCategory(active && c !== "الكل" ? "الكل" : c)}
              className={`relative rounded-full border px-3 py-1 text-xs font-bold transition-all duration-150 active:scale-95 ${
                active
                  ? "border-accent bg-accent text-accent-foreground shadow-xs"
                  : "border-border/80 bg-background/50 text-muted-foreground hover:border-accent/40 hover:text-foreground"
              }`}
            >
              {c}
            </button>
          );
        })}
      </div>

      {/* Live Results Stats & Action Bar */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border/60 pt-4">
        <div className="flex items-center gap-2">
          <div className="grid size-2.5 place-items-center">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex size-2 rounded-full bg-accent"></span>
            </span>
          </div>
          <p className="text-sm font-medium text-muted-foreground">
            {results.length ? (
              <>
                تم العثور على{" "}
                <AnimatedNumber value={results.length} className="font-bold text-accent" />{" "}
                سيارة مطابقة
                {results[0]?.monthly ? (
                  <span className="ms-1 hidden text-xs sm:inline">
                    | أقساط تبدأ من <span className="font-bold text-foreground">{fmt(results[0].monthly)}</span> ريال/شهرياً
                  </span>
                ) : null}
              </>
            ) : (
              <span className="text-destructive font-bold">لا توجد نتائج مطابقة، حاول توسيع خيارات البحث</span>
            )}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {results.length > 0 && (
            <button
              onClick={() => setShowLivePreview(!showLivePreview)}
              className="hidden text-xs font-bold text-accent transition hover:underline sm:block active:scale-95"
            >
              {showLivePreview ? "إخفاء المعاينة" : "معاينة نتائج خفيفة"}
            </button>
          )}

          <Button asChild size="lg" className="h-11 px-6 shadow-md transition-transform duration-150 active:scale-95">
            <Link
              to="/cars"
              search={{
                brand: brand || undefined,
                model: model || undefined,
                category: category !== "الكل" ? category : undefined,
              }}
            >
              <Search className="size-4 me-1" /> عرض كافة النتائج التفصيلية ({results.length})
            </Link>
          </Button>
        </div>
      </div>

      {/* Live Results Preview Cards Drawer */}
      <AnimatePresence>
        {showLivePreview && results.length > 0 && (
          <motion.div
            initial={reduce ? { opacity: 1 } : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: CUBIC_OUT }}
            className="overflow-hidden border-t border-border/40 pt-4 mt-4"
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-bold text-muted-foreground flex items-center gap-1">
                <Sparkles className="size-3.5 text-accent" /> معاينة فورية لأول {Math.min(results.length, 3)} سيارات:
              </span>
              <button
                onClick={() => setShowLivePreview(false)}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                إغلاق
              </button>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {results.slice(0, 3).map((car) => (
                <Link
                  key={car.slug}
                  to="/cars/$slug"
                  params={{ slug: car.slug }}
                  className="group flex items-center gap-3 rounded-xl border border-border/80 bg-background/60 p-2.5 transition duration-200 hover:border-accent/60 hover:bg-background active:scale-[0.98]"
                >
                  <img
                    src={car.image}
                    alt={car.name}
                    className="size-14 rounded-lg object-cover transition duration-300 group-hover:scale-105"
                  />
                  <div className="min-w-0 flex-1">
                    <h4 className="truncate text-xs font-bold group-hover:text-accent">{car.name}</h4>
                    <p className="mt-0.5 text-[11px] text-accent font-bold">
                      {car.price ? `${fmt(car.price)} ريال` : "عند الطلب"}
                    </p>
                    {car.monthly && (
                      <p className="text-[10px] text-muted-foreground">
                        {fmt(car.monthly)} ريال / شهر
                      </p>
                    )}
                  </div>
                  <ArrowLeft className="size-4 shrink-0 opacity-0 transition group-hover:opacity-100 group-hover:-translate-x-1 text-accent" />
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
