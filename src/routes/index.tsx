import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft,
  BadgeCheck,
  Building2,
  Landmark,
  Search,
  ShieldCheck,
  Truck,
  User,
} from "lucide-react";
import heroCar from "@/assets/hero-car.jpg";
import purchaseImg from "@/assets/purchase.jpg";
import { BRANDS, CARS, OFFERS } from "@/data/site";
import { Button } from "@/components/ui/button";
import { CarCard } from "@/components/cars/CarCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "عادل للسيارات | موزع معتمد لأكثر من 40 علامة تجارية" },
      {
        name: "description",
        content:
          "تصفح سيارات الوكالات الجديدة، قارن الأسعار والأقساط، وقدّم طلب شراء كاش أو تمويل مع عادل للسيارات في السعودية.",
      },
      { property: "og:title", content: "عادل للسيارات | إختيارك الذهبي لإمتلاك سيارة أحلامك" },
      {
        property: "og:description",
        content: "اكتشف، قارن، امتلك وانطلق بسهولة — سيارات وكالات جديدة بخطط تمويل مرنة.",
      },
    ],
  }),
  component: Home,
});

const FEATURES = [
  { icon: BadgeCheck, title: "موزع معتمد", body: "أكثر من 40 علامة تجارية بضمان الوكيل." },
  { icon: ShieldCheck, title: "ضمان ممتد", body: "تغطية شاملة لأهم أجزاء السيارة." },
  { icon: Landmark, title: "تمويل معتمد", body: "أفضل عرض تمويلي من بنوك وشركات معتمدة." },
  { icon: Truck, title: "توصيل لمدينتك", body: "نوصل سيارتك أينما كنت داخل المملكة." },
];

function Home() {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [category, setCategory] = useState("");

  const models = CARS.filter((c) => !brand || c.brand === brand).map((c) => c.model);

  return (
    <>
      <section className="surface-ink relative isolate overflow-hidden">
        <img
          src={heroCar}
          alt="سيارة دفع رباعي فاخرة على طريق صحراوي وقت الغروب"
          width={1600}
          height={1008}
          className="absolute inset-0 size-full object-cover"
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 md:py-32">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-xs font-bold text-accent">
            <BadgeCheck className="size-4" /> موزع معتمد — شركة عادل للسيارات
          </span>
          <h1 className="mt-6 max-w-3xl font-display text-4xl leading-tight md:text-6xl">
            إختيارك <span className="text-gradient-gold">الذهبي</span> لإمتلاك سيارة أحلامك في
            السعودية
          </h1>
          <p className="mt-4 max-w-xl text-base opacity-80 md:text-lg">
            اكتشف، قارن، امتلك وانطلق بسهولة!
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/cars">تصفح السيارات</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/30 bg-white/5">
              <Link to="/purchase">طلب شراء</Link>
            </Button>
          </div>
        </div>

        <div className="relative mx-auto -mb-12 max-w-7xl px-4">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
            <h2 className="mb-4 font-display text-sm text-muted-foreground">بحث سريع</h2>
            <div className="grid gap-3 md:grid-cols-4">
              <select
                aria-label="الماركة"
                value={brand}
                onChange={(e) => {
                  setBrand(e.target.value);
                  setModel("");
                }}
                className="h-11 rounded-md border border-input bg-background px-3 text-sm text-foreground"
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
                className="h-11 rounded-md border border-input bg-background px-3 text-sm text-foreground disabled:opacity-50"
              >
                <option value="">الموديل</option>
                {[...new Set(models)].map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
              <select
                aria-label="الفئة"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="h-11 rounded-md border border-input bg-background px-3 text-sm text-foreground"
              >
                <option value="">الفئة</option>
                {["سيدان", "دفع رباعي", "كروس أوفر", "بيك أب"].map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <Button asChild size="lg" className="h-11">
                <Link
                  to="/cars"
                  search={{
                    brand: brand || undefined,
                    model: model || undefined,
                    category: category || undefined,
                  }}
                >
                  <Search className="size-4" /> ابحث في سيارات الوكالات
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-7xl px-4">
        <div className="grid gap-4 md:grid-cols-4">
          {FEATURES.map((f) => (
            <div key={f.title} className="rounded-xl border border-border bg-card p-5">
              <f.icon className="size-7 text-accent" />
              <h3 className="mt-3 text-base">{f.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-7xl px-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold tracking-widest text-accent">أحدث الموديلات</p>
            <h2 className="mt-1 font-display text-2xl md:text-3xl">سيارات مختارة لك</h2>
          </div>
          <Link to="/cars" className="flex items-center gap-1 text-sm font-bold text-accent">
            كل السيارات <ArrowLeft className="size-4" />
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CARS.slice(0, 3).map((car) => (
            <CarCard key={car.slug} car={car} />
          ))}
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-7xl px-4">
        <div className="grid items-center gap-10 rounded-2xl border border-border bg-card p-6 md:grid-cols-2 md:p-10">
          <div>
            <p className="text-xs font-bold tracking-widest text-accent">إختر سيارتك</p>
            <h2 className="mt-2 font-display text-2xl md:text-3xl">
              نساعدك شخصيًا للحصول على أفضل عرض تمويلي
            </h2>
            <p className="mt-4 text-sm text-muted-foreground md:text-base">
              قدّم طلب الشراء خلال دقيقة، ويتولى مستشار المبيعات لدينا مقارنة عروض البنوك وشركات
              التمويل المعتمدة لاختيار الأنسب لك، سواء كنت فردًا أو شركة.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild>
                <Link to="/purchase/customers">
                  <User className="size-4" /> للأفراد
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/purchase/companies">
                  <Building2 className="size-4" /> للشركات
                </Link>
              </Button>
            </div>
          </div>
          <img
            src={purchaseImg}
            alt="مندوب مبيعات يسلّم مفاتيح السيارة للعميل"
            loading="lazy"
            width={1200}
            height={900}
            className="rounded-xl object-cover"
          />
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-7xl px-4">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-display text-2xl md:text-3xl">أحدث العروض</h2>
          <Link to="/offers" className="flex items-center gap-1 text-sm font-bold text-accent">
            كل العروض <ArrowLeft className="size-4" />
          </Link>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {OFFERS.map((o) => (
            <Link
              key={o.slug}
              to="/offers/$slug"
              params={{ slug: o.slug }}
              className="group overflow-hidden rounded-xl border border-border bg-card"
            >
              <img
                src={o.image}
                alt={o.title}
                loading="lazy"
                width={1200}
                height={800}
                className="h-40 w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="p-4">
                <h3 className="text-base group-hover:text-accent">{o.title}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{o.subtitle}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-7xl px-4">
        <h2 className="text-center font-display text-2xl">البنوك والشركات المعتمدة</h2>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {["الراجحي", "الأهلي", "الرياض", "البلاد", "الإنماء", "اليسر"].map((b) => (
            <div
              key={b}
              className="grid h-20 place-items-center rounded-xl border border-border bg-card text-sm font-bold text-muted-foreground"
            >
              {b}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
