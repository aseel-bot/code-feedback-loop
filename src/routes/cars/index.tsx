import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { CARS } from "@/data/site";
import { CarCard } from "@/components/cars/CarCard";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { T, containerStagger, fadeUp, fadeScale } from "@/lib/motion";
import { AnimatedNumber } from "@/components/motion/AnimatedNumber";

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
      { title: "جميع السيارات | عادل للسيارات" },
      {
        name: "description",
        content: "تصفح جميع سيارات الوكالات الجديدة وفلترها حسب الماركة والموديل والفئة والسعر.",
      },
      { property: "og:title", content: "جميع السيارات | عادل للسيارات" },
      { property: "og:description", content: "قائمة سيارات الوكالات المتاحة مع الأسعار والأقساط الشهرية." },
    ],
  }),
  component: CarsPage,
});

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
        <div className="flex gap-2 overflow-x-auto pb-4">
          <button
            onClick={() => set({ brand: undefined, model: undefined })}
            className={`shrink-0 rounded-full border px-4 py-2 text-sm transition ${
              !search.brand ? "border-accent bg-accent text-accent-foreground" : "border-border"
            }`}
          >
            كل الماركات
          </button>
          {brands.map((b) => (
            <button
              key={b}
              onClick={() => set({ brand: b, model: undefined })}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm transition ${
                search.brand === b ? "border-accent bg-accent text-accent-foreground" : "border-border"
              }`}
            >
              {b}
            </button>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3 rounded-xl border border-border bg-card p-4">
          <select
            aria-label="ترتيب حسب"
            value={search.sort ?? ""}
            onChange={(e) => set({ sort: (e.target.value || undefined) as CarsSearch["sort"] })}
            className="h-10 rounded-md border border-input bg-background px-3 text-sm"
          >
            <option value="">ترتيب حسب</option>
            <option value="newest">الأحدث</option>
            <option value="price-asc">الأقل سعرًا</option>
            <option value="price-desc">الأعلى سعرًا</option>
          </select>
          <select
            aria-label="الموديل"
            value={search.model ?? ""}
            onChange={(e) => set({ model: e.target.value || undefined })}
            className="h-10 rounded-md border border-input bg-background px-3 text-sm"
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
            value={search.category ?? ""}
            onChange={(e) => set({ category: e.target.value || undefined })}
            className="h-10 rounded-md border border-input bg-background px-3 text-sm"
          >
            <option value="">الفئة</option>
            {["سيدان", "دفع رباعي", "كروس أوفر", "بيك أب"].map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <Button
            variant="outline"
            onClick={() =>
              navigate({ search: { brand: undefined, model: undefined, category: undefined, sort: undefined } })
            }
          >
            إعادة تعيين
          </Button>
          <span className="ms-auto text-sm text-muted-foreground">
            النتائج: <AnimatedNumber value={list.length} className="font-bold text-foreground" /> سيارة
          </span>
        </div>

        <LayoutGroup>
          <motion.div layout className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout" initial={false}>
              {list.map((car, i) => (
                <motion.div
                  key={car.slug}
                  layout
                  initial={{ opacity: 0, y: 20, scale: 0.97 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { ...T.base, delay: Math.min(i, 8) * (STAGGER * 0.7) },
                  }}
                  exit={{ opacity: 0, y: -10, scale: 0.97, transition: T.fast }}
                >
                  <CarCard car={car} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          <AnimatePresence initial={false}>
            {!list.length && (
              <motion.div
                key="empty"
                layout
                variants={fadeScale}
                initial="hidden"
                animate="show"
                exit="exit"
                className="mt-12 rounded-xl border border-dashed border-border p-12 text-center"
              >
                <p className="text-muted-foreground">لا توجد سيارات مطابقة للفلاتر المختارة.</p>
                <Link to="/cars" search={{}} className="mt-3 inline-block text-sm font-bold text-accent">
                  عرض كل السيارات
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </LayoutGroup>

      </div>
    </>
  );
}
