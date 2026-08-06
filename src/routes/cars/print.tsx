import { createFileRoute, Link } from "@tanstack/react-router";
import { CARS } from "@/data/site";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/cars/print")({
  validateSearch: (search: Record<string, unknown>) => ({
    car: typeof search["car"] === "string" ? search["car"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "معاينة مواصفات السيارة للطباعة | عادل للسيارات" },
      { name: "description", content: "نسخة قابلة للطباعة من مواصفات السيارة وأسعارها." },
      { property: "og:title", content: "معاينة مواصفات السيارة | عادل للسيارات" },
      { property: "og:description", content: "نسخة مطبوعة لمواصفات السيارة لمندوبي المبيعات والعملاء." },
    ],
  }),
  component: PrintPage,
});

function PrintPage() {
  const { car: slug } = Route.useSearch();
  const car = CARS.find((c) => c.slug === slug);

  if (!car) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="font-display text-2xl">اختر سيارة للمعاينة</h1>
        <Link to="/cars" className="mt-4 inline-block text-sm font-bold text-accent">
          تصفح السيارات
        </Link>
      </div>
    );
  }

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
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="mb-6 flex items-center justify-between print:hidden">
        <h1 className="font-display text-2xl">معاينة مواصفات السيارة</h1>
        <Button onClick={() => window.print()}>طباعة</Button>
      </div>
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="font-display text-xl">{car.name}</h2>
        <img
          src={car.image}
          alt={car.name}
          loading="lazy"
          width={1200}
          height={800}
          className="mt-4 w-full rounded-lg object-cover"
        />
        <table className="mt-6 w-full text-sm">
          <tbody>
            {rows.map(([k, v]) => (
              <tr key={k} className="border-b border-border last:border-0">
                <th className="py-2 text-start font-medium text-muted-foreground">{k}</th>
                <td className="py-2 text-start font-bold">{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
