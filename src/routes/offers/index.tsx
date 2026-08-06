import { createFileRoute, Link } from "@tanstack/react-router";
import { OFFERS } from "@/data/site";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/offers/")({
  head: () => ({
    meta: [
      { title: "العروض | عروض سيارات حصرية وخطط سداد مرنة" },
      {
        name: "description",
        content: "اطلع على عروض عادل للسيارات: خصم الضريبة، دفعات أولى رمزية وخطط تمويل مرنة.",
      },
      { property: "og:title", content: "عروض سيارات حصرية | عادل للسيارات" },
      { property: "og:description", content: "خطط سداد مرنة وعروض موسمية على سيارات الوكالات." },
    ],
  }),
  component: OffersPage,
});

function OffersPage() {
  return (
    <>
      <PageHero
        title="عروض سيارات حصرية - خطط سداد مرنة للسيارات تناسبك"
        subtitle="عروض محدودة على مجموعة مختارة من سيارات الوكالات."
        crumbs={[{ label: "العروض" }]}
      />
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-12 md:grid-cols-3">
        {OFFERS.map((o) => (
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
              <Button asChild size="sm" className="mt-4">
                <Link to="/offers/$slug" params={{ slug: o.slug }}>
                  تفاصيل
                </Link>
              </Button>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
