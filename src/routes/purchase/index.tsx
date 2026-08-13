import { createFileRoute, Link } from "@tanstack/react-router";
import { Building2, User } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";

export const Route = createFileRoute("/purchase/")({
  head: () => ({
    meta: [
      { title: "طلب شراء سيارة | أفراد أو شركات — نجم الشارقة للسيارات" },
      {
        name: "description",
        content: "قدّم طلب شراء سيارة كاش أو تمويل، كفرد أو كشركة، وسيتواصل معك فريق المبيعات.",
      },
      { property: "og:title", content: "طلب شراء سيارة | نجم الشارقة للسيارات" },
      { property: "og:description", content: "اختر نوع الطلب: أفراد أو شركات، وابدأ إجراءات الشراء." },
    ],
  }),
  component: PurchaseGate,
});

function PurchaseGate() {
  return (
    <>
      <PageHero
        title="طلب شراء"
        subtitle="اختر نوع الطلب المناسب لك لنبدأ إجراءات الشراء أو التمويل."
        crumbs={[{ label: "طلب شراء" }]}
      />
      <div className="mx-auto grid max-w-4xl gap-6 px-4 py-14 md:grid-cols-2">
        <Link
          to="/purchase/customers"
          className="rounded-2xl border border-border bg-card p-8 text-center transition hover:-translate-y-1 hover:border-accent"
        >
          <User className="mx-auto size-10 text-accent" />
          <h2 className="mt-4 text-lg">للأفراد</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            طلب شراء سيارة شخصية كاش أو عبر تمويل معتمد.
          </p>
        </Link>
        <Link
          to="/purchase/companies"
          className="rounded-2xl border border-border bg-card p-8 text-center transition hover:-translate-y-1 hover:border-accent"
        >
          <Building2 className="mx-auto size-10 text-accent" />
          <h2 className="mt-4 text-lg">للشركات</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            طلب شراء سيارة أو أسطول سيارات لمنشأتك بعروض خاصة.
          </p>
        </Link>
      </div>
    </>
  );
}
