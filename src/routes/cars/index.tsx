import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { CARS, BRAND_ICONS, BRAND_WORDMARKS, BRAND_LOCAL_LOGOS } from "@/data/site";
import { CarCard } from "@/components/cars/CarCard";
import { PageHero } from "@/components/layout/PageHero";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { STAGGER, T, fadeScale } from "@/lib/motion";
import { AnimatedNumber } from "@/components/motion/AnimatedNumber";
import { Sparkles, SlidersHorizontal, RotateCcw } from "lucide-react";

type CarsSearch = {
  brand?: string | undefined;
  model?: string | undefined;
  category?: string | undefined;
  sort?: "newest" | "price-asc" | "price-desc" | undefined;
};

export const Route = createFileRoute("/cars/")({
  validateSearch: (search: Record<string, unknown>): CarsSearch => ({
    brand: typeof search["brand"] === "string" ? search["brand"] : undefined,
    model: typeof search["model"] === "string" ? search["model"] : undefined,
    category: typeof search["category"] === "string" ? search["category"] : undefined,
    sort:
      search["sort"] === "price-asc" || search["sort"] === "price-desc" || search["sort"] === "newest"
        ? search["sort"]
        : undefined,
  }),
  head: () => ({
    meta: [
      { title: "جميع السيارات | نجم الشارقة للسيارات" },
      {
        name: "description",
        content: "تصفح جميع سيارات الوكالات الجديدة وفلترها حسب الماركة والموديل والفئة والسعر.",
      },
      { property: "og:title", content: "جميع السيارات | نجم الشارقة للسيارات" },
      { property: "og:description", content: "قائمة سيارات الوكالات المتاحة مع الأسعار والأقساط الشهرية." },
    ],
  }),
  component: CarsPage,
});

function BrandBadgeLogo({ brand }: { brand: string }) {
  const slug = BRAND_ICONS[brand];
  const localSrc = BRAND_LOCAL_LOGOS[brand];
  const [localFailed, setLocalFailed] = useState(false);
  const [iconFailed, setIconFailed] = useState(false);
  const wordmark = BRAND_WORDMARKS[brand] ?? brand;

  // Priority: local logo first → SimpleIcons (amber) fallback → text
  const useLocal = localSrc && !localFailed;
  const useIcon = !useLocal && slug && !iconFailed;
  const imgSrc = useLocal
    ? localSrc
    : useIcon
      ? `https://cdn.simpleicons.org/${slug}/d97706`
      : null;

  const handleError = () => {
    if (useLocal) setLocalFailed(true);
    else if (useIcon) setIconFailed(true);
  };

  if (!imgSrc) {
    return <span className="font-bold text-[11px] text-accent">{wordmark}</span>;
  }

  return (
    <img
      src={imgSrc}
      alt={brand}
      style={useLocal ? { filter: "brightness(0) saturate(100%) invert(57%) sepia(87%) saturate(618%) hue-rotate(358deg) brightness(95%)" } : undefined}
      className="size-4.5 object-contain shrink-0 opacity-90 transition duration-200 group-hover:scale-110"
      loading="lazy"
      onError={handleError}
    />
  );
}

function CarsPage() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/cars/" });

  const brands = [...new Set(CARS.map((c) => c.brand))];
  const models = [...new Set(CARS.filter((c) => !search.brand || c.brand === search.brand).map((c) => c.model))];

  let list = CARS.filter(
    (c) =>
      (!search.brand || c.brand === search.brand) &&
      (!search.model || c.model === search.model) &&
      (!search.category || c.category === search.category),
  );

  if (search.sort === "price-asc") list = [...list].sort((a, b) => (a.price ?? 1e9) - (b.price ?? 1e9));
  if (search.sort === "price-desc") list = [...list].sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
  if (search.sort === "newest") list = [...list].sort((a, b) => b.year - a.year);

  const set = (patch: Partial<CarsSearch>) =>
    navigate({ search: (prev: CarsSearch) => ({ ...prev, ...patch }) });

  return (
    <>
      <PageHero
        title="جميع السيارات"
        subtitle="اختر من بين سيارات الوكالات الجديدة بأفضل الأسعار وخطط السداد."
        crumbs={[{ label: "السيارات" }]}
      />

      <div className="mx-auto max-w-7xl px-4 py-10">
        {/* Brand Filter Pills Bar with Smooth Gliding Active Pill (emil-design-eng) */}
        <div className="no-scrollbar flex gap-2.5 overflow-x-auto pb-4 pt-1">
          <button
            onClick={() => set({ brand: undefined, model: undefined })}
            className={`group relative flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold transition duration-200 active:scale-[0.97] ${
              !search.brand
                ? "border-accent bg-accent text-accent-foreground shadow-xs"
                : "border-border/80 bg-card text-muted-foreground hover:border-accent/50 hover:text-foreground"
            }`}
          >
            <Sparkles className="size-4 text-accent group-hover:scale-110 transition-transform" />
            <span>كل الماركات</span>
            <span className="rounded-full bg-background/30 px-1.5 py-0.5 text-[10px]">
              {CARS.length}
            </span>
          </button>

          {brands.map((b) => {
            const count = CARS.filter((c) => c.brand === b).length;
            const isSelected = search.brand === b;

            return (
              <button
                key={b}
                onClick={() => set({ brand: isSelected ? undefined : b, model: undefined })}
                className={`group relative flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-bold transition duration-200 active:scale-[0.97] ${
                  isSelected
                    ? "border-accent bg-accent text-accent-foreground shadow-xs"
                    : "border-border/80 bg-card text-foreground hover:border-accent/50 hover:bg-muted/50"
                }`}
              >
                <BrandBadgeLogo brand={b} />
                <span>{b}</span>
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[10px] ${
                    isSelected ? "bg-background/30 text-accent-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Filter Controls Bar */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border/80 bg-card p-4 shadow-2xs">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-sm font-bold text-accent">
              <SlidersHorizontal className="size-4" />
              <span>التصفية والترتيب:</span>
            </div>

            {search.brand && (
              <select
                aria-label="الموديل"
                value={search.model ?? ""}
                onChange={(e) => set({ model: e.target.value || undefined })}
                className="h-9.5 rounded-xl border border-input bg-background px-3 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-accent"
              >
                <option value="">جميع موديلات {search.brand}</option>
                {models.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            )}

            <select
              aria-label="ترتيب حسب"
              value={search.sort ?? ""}
              onChange={(e) => set({ sort: (e.target.value || undefined) as CarsSearch["sort"] })}
              className="h-9.5 rounded-xl border border-input bg-background px-3 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-accent"
            >
              <option value="">ترتيب حسب: الافتراضي</option>
              <option value="price-asc">السعر: من الأقل للأعلى</option>
              <option value="price-desc">السعر: من الأعلى للأقل</option>
              <option value="newest">الأحدث صنعاً</option>
            </select>

            {(search.brand || search.model || search.category || search.sort) && (
              <button
                onClick={() => navigate({ search: {} })}
                className="flex items-center gap-1.5 rounded-xl border border-border bg-muted/60 px-3 py-2 text-xs font-medium text-muted-foreground transition hover:bg-background hover:text-foreground active:scale-95"
              >
                <RotateCcw className="size-3.5" />
                <span>إعادة ضبط</span>
              </button>
            )}
          </div>

          <div className="text-xs font-bold text-muted-foreground">
            عرض <AnimatedNumber value={list.length} /> سيارات من أصل {CARS.length}
          </div>
        </div>

        {/* Cars Grid */}
        {list.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-dashed border-border p-12 text-center">
            <p className="text-base font-bold text-foreground">لا توجد سيارات مطابقة لخيارات الفلترة الحالية.</p>
            <p className="mt-1 text-xs text-muted-foreground">جرب اختيار ماركة أخرى أو إعادة ضبط خيارات البحث.</p>
            <button
              onClick={() => navigate({ search: {} })}
              className="mt-4 rounded-xl bg-accent px-4 py-2 text-xs font-bold text-accent-foreground shadow-xs transition hover:opacity-90 active:scale-95"
            >
              إعادة ضبط الفلاتر
            </button>
          </div>
        ) : (
          <LayoutGroup>
            <motion.div
              layout
              className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              <AnimatePresence mode="popLayout">
                {list.map((car, index) => (
                  <motion.div
                    key={car.slug}
                    layout
                    variants={fadeScale}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ ...T, delay: Math.min(index * STAGGER, 0.25) }}
                  >
                    <CarCard car={car} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </LayoutGroup>
        )}
      </div>
    </>
  );
}
