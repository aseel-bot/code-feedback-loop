import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check, Printer } from "lucide-react";
import { CARS } from "@/data/site";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/button";
import { CarCard } from "@/components/cars/CarCard";

export const Route = createFileRoute("/cars/$slug")({
  loader: ({ params }) => {
    const car = CARS.find((c) => c.slug === params.slug);
    if (!car) throw notFound();
    return car;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.name ?? "تفاصيل السيارة"} | عادل للسيارات` },
      { name: "description", content: loaderData?.intro ?? "تفاصيل ومواصفات السيارة." },
      { property: "og:title", content: `${loaderData?.name ?? "سيارة"} | عادل للسيارات` },
      { property: "og:description", content: loaderData?.intro ?? "مواصفات وأسعار وأقساط السيارة." },
    ],
  }),
  component: CarDetails,
});

function SpecList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h3 className="mb-4 text-base text-accent">{title}</h3>
      <ul className="grid gap-2 sm:grid-cols-2">
        {items.map((i) => (
          <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
            <Check className="size-4 shrink-0 text-accent" /> {i}
          </li>
        ))}
      </ul>
    </div>
  );
}

function CarDetails() {
  const car = Route.useLoaderData();
  const related = CARS.filter((c) => c.slug !== car.slug).slice(0, 3);

  return (
    <>
      <PageHero
        title={car.name}
        crumbs={[{ label: "السيارات", to: "/cars" }, { label: car.name }]}
      />

      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <img
              src={car.image}
              alt={car.name}
              width={1200}
              height={800}
              className="w-full rounded-2xl object-cover"
            />

            <div className="mt-8 rounded-xl border border-border bg-card p-5">
              <h2 className="text-lg">تفاصيل السيارة</h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{car.intro}</p>
            </div>

            <div className="mt-6 space-y-4">
              <h2 className="text-lg">معلومات السيارة</h2>
              {car.info.map((s) => (
                <div key={s.title} className="rounded-xl border border-border bg-card p-5">
                  <h3 className="text-base">{s.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{s.body}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 space-y-4">
              <h2 className="text-lg">مميزات السيارة</h2>
              <SpecList
                title="أساسية"
                items={[
                  `الجير: ${car.basics.gear}`,
                  `حجم الإطار: ${car.basics.tire}`,
                  `الاستهلاك: ${car.basics.fuel}`,
                  `عدد الركاب: ${car.basics.seats}`,
                ]}
              />
              <SpecList
                title="المزايا التقنية"
                items={[
                  `عدد السلندر: ${car.tech.cylinders}`,
                  `سعة المحرك: ${car.tech.engineSize}`,
                  `القوة: ${car.tech.horsepower}`,
                  `العزم: ${car.tech.torque}`,
                  `نوع الدفع: ${car.tech.drive}`,
                  `نوع المحرك: ${car.tech.engineType}`,
                  `التيربو: ${car.tech.turbo}`,
                ]}
              />
              <SpecList title="المزايا الداخلية" items={car.interior} />
              <SpecList title="النظام الصوتي والترفيهي" items={car.entertainment} />
            </div>
          </div>

          <aside className="lg:sticky lg:top-28 lg:h-fit">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
              <div className="flex flex-wrap gap-2">
                {car.badges.map((b) => (
                  <span
                    key={b}
                    className="rounded-full bg-accent px-3 py-1 text-[11px] font-bold text-accent-foreground"
                  >
                    {b}
                  </span>
                ))}
              </div>
              {car.price ? (
                <>
                  <p className="mt-4 font-display text-3xl font-black">
                    {car.price.toLocaleString("en-US")}
                    <span className="ms-2 text-sm font-medium text-muted-foreground">ريال</span>
                  </p>
                  <p className="text-xs text-muted-foreground">شامل ضريبة القيمة المضافة</p>
                  {car.monthly && (
                    <p className="mt-3 rounded-lg bg-muted p-3 text-sm">
                      قسط شهري {car.monthly.toLocaleString("en-US")} ريال — بدون دفعة أولى
                    </p>
                  )}
                </>
              ) : (
                <p className="mt-4 font-display text-xl text-accent">السعر عند الطلب</p>
              )}

              <Button asChild size="lg" className="mt-5 w-full">
                <Link to="/purchase/customers" search={{ car: car.name }}>
                  طلب شراء
                </Link>
              </Button>
              <Button asChild variant="outline" className="mt-3 w-full">
                <Link to="/cars/print" search={{ car: car.slug }}>
                  <Printer className="size-4" /> معاينة / طباعة
                </Link>
              </Button>
            </div>
          </aside>
        </div>

        <section className="mt-16">
          <h2 className="font-display text-2xl">سيارات مشابهة</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((c) => (
              <CarCard key={c.slug} car={c} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
