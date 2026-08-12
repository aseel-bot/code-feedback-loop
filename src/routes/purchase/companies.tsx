import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/layout/PageHero";
import { PurchaseForm } from "@/components/forms/PurchaseForm";

export const Route = createFileRoute("/purchase/companies")({
  validateSearch: (search: Record<string, unknown>): { car?: string | undefined } => ({
    car: typeof search["car"] === "string" ? search["car"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "طلب شراء شركات | عادل للسيارات" },
      {
        name: "description",
        content: "طلب شراء سيارة أو أسطول سيارات للمنشآت مع عروض وتسعير خاص للشركات.",
      },
      { property: "og:title", content: "طلب شراء للشركات | عادل للسيارات" },
      { property: "og:description", content: "حلول أساطيل وعروض تمويل مخصصة للمنشآت." },
    ],
  }),
  component: CompaniesPurchase,
});

function CompaniesPurchase() {
  const { car } = Route.useSearch();

  return (
    <>
      <PageHero
        title="طلب شراء للشركات"
        subtitle="حلول شراء وأساطيل للمنشآت بعروض وتسعير خاص."
        crumbs={[{ label: "طلب شراء", to: "/purchase" }, { label: "للشركات" }]}
      />
      <div className="mx-auto max-w-3xl px-4 py-12">
        <div className="mb-6 grid grid-cols-2 gap-2 rounded-xl border border-border bg-card p-1.5">
          <Link
            to="/purchase/customers"
            className="rounded-lg py-2.5 text-center text-sm font-bold text-muted-foreground hover:text-foreground"
          >
            للأفراد
          </Link>
          <span className="rounded-lg bg-accent py-2.5 text-center text-sm font-bold text-accent-foreground">
            للشركات
          </span>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
          <PurchaseForm variant="companies" defaultCar={car} />
        </div>
      </div>
    </>
  );
}
