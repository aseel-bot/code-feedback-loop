import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { X } from "lucide-react";
import { CARS } from "@/data/site";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/button";
import { useCompare } from "@/hooks/useCompare";

export const Route = createFileRoute("/cars/compare")({
  validateSearch: (search: Record<string, unknown>): { ids?: string | undefined } => ({
    ids: typeof search["ids"] === "string" ? search["ids"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "مقارنة السيارات | عادل للسيارات" },
      {
        name: "description",
        content: "قارن حتى ثلاث سيارات جنبًا إلى جنب في السعر والقسط والمواصفات التقنية والداخلية.",
      },
      { property: "og:title", content: "مقارنة السيارات | عادل للسيارات" },
      { property: "og:description", content: "أداة مقارنة سريعة بين سيارات الوكالات." },
    ],
  }),
  component: ComparePage,
});

function ComparePage() {
  const { ids } = Route.useSearch();
  const navigate = useNavigate({ from: "/cars/compare" });
  const { remove } = useCompare();

  const slugs = (ids ?? "").split(",").filter(Boolean).slice(0, 3);
  const cars = slugs.map((s: string) => CARS.find((c) => c.slug === s)).filter(Boolean) as typeof CARS;

  const setSlugs = (next: string[]) =>
    navigate({ search: { ids: next.length ? next.join(",") : undefined } });

  const rows: { label: string; get: (c: (typeof CARS)[number]) => string }[] = [
    { label: "الماركة", get: (c) => c.brand },
    { label: "الموديل", get: (c) => `${c.model} ${c.year}` },
    { label: "الفئة", get: (c) => c.category },
    { label: "السعر", get: (c) => (c.price ? `${c.price.toLocaleString("en-US")} ريال` : "عند الطلب") },
    { label: "القسط الشهري", get: (c) => (c.monthly ? `${c.monthly.toLocaleString("en-US")} ريال` : "—") },
    { label: "الجير", get: (c) => c.basics.gear },
    { label: "حجم الإطار", get: (c) => c.basics.tire },
    { label: "الاستهلاك", get: (c) => c.basics.fuel },
    { label: "عدد الركاب", get: (c) => String(c.basics.seats) },
    { label: "عدد السلندر", get: (c) => c.tech.cylinders },
    { label: "سعة المحرك", get: (c) => c.tech.engineSize },
    { label: "القوة", get: (c) => c.tech.horsepower },
    { label: "العزم", get: (c) => c.tech.torque },
    { label: "نوع الدفع", get: (c) => c.tech.drive },
    { label: "نوع المحرك", get: (c) => c.tech.engineType },
    { label: "التيربو", get: (c) => c.tech.turbo },
    { label: "المزايا الداخلية", get: (c) => c.interior.join("، ") },
    { label: "الصوتيات والترفيه", get: (c) => c.entertainment.join("، ") },
  ];

  const available = CARS.filter((c) => !slugs.includes(c.slug));

  return (
    <>
      <PageHero
        title="مقارنة السيارات"
        subtitle="قارن حتى ثلاث سيارات جنبًا إلى جنب قبل اتخاذ القرار."
        crumbs={[{ label: "السيارات", to: "/cars" }, { label: "المقارنة" }]}
      />

      <div className="mx-auto max-w-7xl px-4 py-10">
        {cars.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border p-12 text-center">
            <p className="text-muted-foreground">لم تختر أي سيارة للمقارنة بعد.</p>
            <Link to="/cars" className="mt-3 inline-block text-sm font-bold text-accent">
              تصفح السيارات وأضفها للمقارنة
            </Link>
          </div>
        ) : (
          <>
            {cars.length < 3 && (
              <div className="mb-6 flex flex-wrap items-center gap-3 rounded-xl border border-border bg-card p-4">
                <label htmlFor="add-car" className="text-sm">
                  أضف سيارة للمقارنة
                </label>
                <select
                  id="add-car"
                  value=""
                  onChange={(e) => e.target.value && setSlugs([...slugs, e.target.value])}
                  className="h-10 rounded-md border border-input bg-background px-3 text-sm"
                >
                  <option value="">اختر سيارة</option>
                  {available.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full min-w-[640px] text-sm">
                <caption className="sr-only">جدول مقارنة السيارات</caption>
                <thead>
                  <tr className="bg-card">
                    <th scope="col" className="p-4 text-start">
                      المواصفة
                    </th>
                    {cars.map((c) => (
                      <th key={c.slug} scope="col" className="p-4 text-start align-top">
                        <img
                          src={c.image}
                          alt={c.name}
                          loading="lazy"
                          width={320}
                          height={214}
                          className="mb-3 aspect-[3/2] w-full rounded-lg object-cover"
                        />
                        <Link
                          to="/cars/$slug"
                          params={{ slug: c.slug }}
                          className="font-bold hover:text-accent"
                        >
                          {c.name}
                        </Link>
                        <button
                          type="button"
                          onClick={() => {
                            remove(c.slug);
                            setSlugs(slugs.filter((s: string) => s !== c.slug));
                          }}
                          className="mt-2 flex items-center gap-1 text-xs text-destructive"
                          aria-label={`إزالة ${c.name} من المقارنة`}
                        >
                          <X className="size-3" /> إزالة
                        </button>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r, i) => (
                    <tr key={r.label} className={i % 2 ? "bg-card" : ""}>
                      <th scope="row" className="p-4 text-start font-medium text-muted-foreground">
                        {r.label}
                      </th>
                      {cars.map((c) => (
                        <td key={c.slug} className="p-4 align-top">
                          {r.get(c)}
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr>
                    <td />
                    {cars.map((c) => (
                      <td key={c.slug} className="p-4">
                        <Button asChild size="sm" className="w-full">
                          <Link to="/purchase/customers" search={{ car: c.name }}>
                            طلب شراء
                          </Link>
                        </Button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </>
  );
}
