import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { OFFERS } from "@/data/site";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/offers/$slug")({
  loader: ({ params }) => {
    const offer = OFFERS.find((o) => o.slug === params.slug);
    if (!offer) throw notFound();
    return offer;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title ?? "تفاصيل العرض"} | نجم الشارقة للسيارات` },
      { name: "description", content: loaderData?.subtitle ?? "تفاصيل العرض وشروطه." },
      { property: "og:title", content: `${loaderData?.title ?? "عرض"} | نجم الشارقة للسيارات` },
      { property: "og:description", content: loaderData?.subtitle ?? "عرض حصري من نجم الشارقة للسيارات." },
    ],
  }),
  component: OfferDetails,
});

function OfferDetails() {
  const offer = Route.useLoaderData();

  return (
    <>
      <PageHero
        title={offer.title}
        subtitle={offer.subtitle}
        crumbs={[{ label: "العروض", to: "/offers" }, { label: offer.title }]}
      />
      <div className="mx-auto max-w-4xl px-4 py-12">
        <img
          src={offer.image}
          alt={offer.title}
          width={1200}
          height={800}
          className="w-full rounded-2xl object-cover"
        />
        <div className="mt-8 rounded-xl border border-border bg-card p-6">
          <h2 className="text-lg">شروط العرض</h2>
          <ul className="mt-4 space-y-2">
            {offer.terms.map((t: string) => (
              <li key={t} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Check className="size-4 text-accent" /> {t}
              </li>
            ))}
          </ul>
          <Button asChild size="lg" className="mt-6">
            <Link to="/purchase/customers">استفد من العرض الآن</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
