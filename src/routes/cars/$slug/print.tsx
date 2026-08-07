import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CARS } from "@/data/site";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/cars/$slug/print")({
  loader: ({ params }) => {
    const car = CARS.find((c) => c.slug === params.slug);
    if (!car) throw notFound();
    return car;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `طباعة مواصفات ${loaderData?.name ?? "السيارة"} | عادل للسيارات` },
      {
        name: "description",
        content: "نسخة قابلة للطباعة من مواصفات السيارة وأسعارها وأقساطها.",
      },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "نسخة الطباعة | عادل للسيارات" },
      { property: "og:description", content: "مواصفات السيارة في نسخة مهيّأة للطباعة." },
    ],
  }),
  component: PrintPage,
});

function PrintPage() {
  const car = Route.useLoaderData();

  const rows: [string, string][] = [
    ["الماركة", car.brand],
    ["الموديل", `${car.model} ${car.year}`],
    ["الفئة", car.category],
    ["الجير", car.basics.gear],
    ["حجم الإطار", car.basics.tire],
    ["الاستهلاك", car.basics.fuel],
    ["عدد الركاب", String(car.basics.seats)],
    ["عدد السلندر", car.tech.cylinders],
    ["سعة المحرك", car.tech.engineSize],
    ["القوة", car.tech.horsepower],
    ["العزم", car.tech.torque],
    ["نوع الدفع", car.tech.drive],
    ["السعر", car.price ? `${car.price.toLocaleString("en-US")} ريال شامل الضريبة` : "عند الطلب"],
    ["القسط الشهري", car.monthly ? `${car.monthly.toLocaleString("en-US")} ريال` : "حسب التمويل"],
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="mb-6 flex items-center justify-between print:hidden">
        <h1 className="font-display text-2xl">معاينة مواصفات السيارة</h1>
        <div className="flex gap-2">
          <Button onClick={() => window.print()}>طباعة</Button>
          <Button asChild variant="outline">
            <Link to="/cars/$slug" params={{ slug: car.slug }}>
              رجوع
            </Link>
          </Button>
        </div>
      </div>
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="font-display text-xl">{car.name}</h2>
        <img
          src={car.image}
          alt={`صورة ${car.name}`}
          loading="lazy"
          width={1200}
          height={800}
          className="mt-4 w-full rounded-lg object-cover"
        />
        <table className="mt-6 w-full text-sm">
          <caption className="sr-only">مواصفات {car.name}</caption>
          <tbody>
            {rows.map(([k, v]) => (
              <tr key={k} className="border-b border-border last:border-0">
                <th scope="row" className="py-2 text-start font-medium text-muted-foreground">
                  {k}
                </th>
                <td className="py-2 text-start font-bold">{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
