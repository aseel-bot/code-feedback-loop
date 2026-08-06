import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, LifeBuoy, Shield, Sparkles, Sun, Truck } from "lucide-react";
import { SERVICES } from "@/data/site";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/button";

const ICONS = {
  shield: Shield,
  sparkles: Sparkles,
  "life-buoy": LifeBuoy,
  sun: Sun,
  truck: Truck,
} as const;

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "خدمات ما بعد البيع | عادل للسيارات" },
      {
        name: "description",
        content:
          "الضمان الممتد، العناية بالسيارة، المساعدة على الطريق، التظليل المجاني، والتوصيل إلى مدينتك.",
      },
      { property: "og:title", content: "خدمات ما بعد البيع | عادل للسيارات" },
      { property: "og:description", content: "خدمات متكاملة تحمي سيارتك بعد الشراء." },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <PageHero
        title="الخدمات"
        subtitle="خدمات ما بعد البيع التي نقدمها لعملائنا في جميع مدن المملكة."
        crumbs={[{ label: "الخدمات" }]}
      />
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-6 md:grid-cols-2">
          {SERVICES.map((s) => {
            const Icon = ICONS[s.icon as keyof typeof ICONS];
            return (
              <section key={s.title} className="rounded-xl border border-border bg-card p-6">
                <Icon className="size-8 text-accent" />
                <h2 className="mt-4 text-lg">{s.title}</h2>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {s.items.map((i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="size-4 shrink-0 text-accent" /> {i}
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>

        <div className="surface-ink mt-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl p-8">
          <div>
            <h2 className="text-xl">تحتاج مساعدة أو حجز خدمة؟</h2>
            <p className="mt-1 text-sm opacity-75">فريق خدمة العملاء جاهز للرد على استفسارك.</p>
          </div>
          <Button asChild size="lg">
            <Link to="/contact-us">تواصل معنا</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
