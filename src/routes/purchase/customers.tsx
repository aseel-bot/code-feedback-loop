import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/layout/PageHero";
import { PurchaseForm } from "@/components/forms/PurchaseForm";

export const Route = createFileRoute("/purchase/customers")({
  validateSearch: (
    search: Record<string, unknown>,
  ): {
    car?: string | undefined;
    down?: number | undefined;
    term?: number | undefined;
    monthly?: number | undefined;
  } => ({
    car: typeof search["car"] === "string" ? search["car"] : undefined,
    down: typeof search["down"] === "number" ? search["down"] : undefined,
    term: typeof search["term"] === "number" ? search["term"] : undefined,
    monthly: typeof search["monthly"] === "number" ? search["monthly"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "طلب شراء أفراد | عادل للسيارات" },
      {
        name: "description",
        content: "عبّئ نموذج طلب الشراء للأفراد واختر التمويل أو الكاش، وسنتواصل معك سريعًا.",
      },
      { property: "og:title", content: "طلب شراء للأفراد | عادل للسيارات" },
      { property: "og:description", content: "نموذج طلب شراء سيارة للأفراد بخطوات بسيطة." },
    ],
  }),
  component: CustomersPurchase,
});

function CustomersPurchase() {
  const { car, down, term, monthly } = Route.useSearch();

  return (
    <>
      <PageHero
        title="طلب شراء للأفراد"
        subtitle="عبّئ البيانات وسيتواصل معك مستشار المبيعات لإتمام الطلب."
        crumbs={[{ label: "طلب شراء", to: "/purchase" }, { label: "للأفراد" }]}
      />
      <div className="mx-auto max-w-3xl px-4 py-12">
        <div className="mb-6 grid grid-cols-2 gap-2 rounded-xl border border-border bg-card p-1.5">
          <span className="rounded-lg bg-accent py-2.5 text-center text-sm font-bold text-accent-foreground">
            للأفراد
          </span>
          <Link
            to="/purchase/companies"
            className="rounded-lg py-2.5 text-center text-sm font-bold text-muted-foreground hover:text-foreground"
          >
            للشركات
          </Link>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
          <PurchaseForm
            variant="customers"
            defaultCar={car}
            downPayment={down}
            termMonths={term}
            estimatedMonthly={monthly}
          />
        </div>
      </div>
    </>
  );
}
