import { createFileRoute, Link } from "@tanstack/react-router";
import { PROMOTIONAL_OFFERS } from "@/data/site";
import { PageHero } from "@/components/layout/PageHero";

export const Route = createFileRoute("/promotional-offers")({
  head: () => ({
    meta: [
      { title: "العروض الترويجية الموسمية | نجم الشارقة للسيارات" },
      {
        name: "description",
        content: "عروض ترويجية موسمية ومناسباتية على سيارات الوكالات لفترة محدودة.",
      },
      { property: "og:title", content: "العروض الترويجية | نجم الشارقة للسيارات" },
      { property: "og:description", content: "خصومات موسمية ومناسباتية لفترة محدودة." },
    ],
  }),
  component: Promotional,
});

function Promotional() {
  return (
    <>
      <PageHero
        title="العروض الترويجية"
        subtitle="عروض موسمية ومناسباتية لفترة محدودة، منفصلة عن العروض الدائمة."
        crumbs={[{ label: "العروض الترويجية" }]}
      />
      <div className="mx-auto max-w-7xl px-4 py-12">
        {PROMOTIONAL_OFFERS.length ? (
          <div className="grid gap-6 md:grid-cols-3">
            {PROMOTIONAL_OFFERS.map((o) => (
              <article key={o.slug} className="overflow-hidden rounded-xl border border-border bg-card">
                <img
                  src={o.image}
                  alt={o.title}
                  loading="lazy"
                  width={1200}
                  height={800}
                  className="h-44 w-full object-cover"
                />
                <div className="p-5">
                  <h2 className="text-base">{o.title}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{o.subtitle}</p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-border p-16 text-center">
            <p className="text-muted-foreground">لا توجد عروض ترويجية حاليًا. تابعنا لمعرفة الجديد.</p>
            <Link to="/offers" className="mt-3 inline-block text-sm font-bold text-accent">
              تصفح العروض الحالية
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
