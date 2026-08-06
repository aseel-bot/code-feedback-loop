import { createFileRoute } from "@tanstack/react-router";
import { BadgeCheck, Handshake, Target } from "lucide-react";
import purchaseImg from "@/assets/purchase.jpg";
import { PageHero } from "@/components/layout/PageHero";

export const Route = createFileRoute("/about-us")({
  head: () => ({
    meta: [
      { title: "من نحن | شركة عادل للسيارات" },
      {
        name: "description",
        content: "عادل للسيارات موزع معتمد لأكثر من 40 علامة تجارية في السعودية، نبني الثقة منذ سنوات.",
      },
      { property: "og:title", content: "من نحن | شركة عادل للسيارات" },
      { property: "og:description", content: "قصتنا، رؤيتنا، وقيمنا في خدمة عملاء السيارات في المملكة." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <PageHero
        title="من نحن"
        subtitle="موزع معتمد لأكثر من 40 علامة تجارية للسيارات في المملكة العربية السعودية."
        crumbs={[{ label: "من نحن" }]}
      />
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl">قصتنا</h2>
            <p className="mt-4 text-sm leading-8 text-muted-foreground">
              انطلقت شركة عادل للسيارات لتكون الوجهة الأولى لمن يبحث عن سيارة وكالة جديدة بسعر عادل
              وخدمة صادقة. نعمل مع أكثر من 40 علامة تجارية، ونربط عملاءنا بأفضل عروض التمويل من بنوك
              وشركات معتمدة، مع باقة خدمات ما بعد البيع تشمل الضمان الممتد والعناية بالسيارة
              والمساعدة على الطريق.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                { n: "+40", l: "علامة تجارية" },
                { n: "+15", l: "بنك وشركة تمويل" },
                { n: "24 ساعة", l: "زمن الرد على الطلبات" },
              ].map((s) => (
                <div key={s.l} className="rounded-xl border border-border bg-card p-4 text-center">
                  <p className="font-display text-xl text-accent">{s.n}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
          <img
            src={purchaseImg}
            alt="فريق المبيعات مع أحد العملاء في المعرض"
            loading="lazy"
            width={1200}
            height={900}
            className="rounded-2xl object-cover"
          />
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {[
            { icon: Target, t: "رؤيتنا", b: "أن نكون الخيار الأول لامتلاك السيارات في المملكة." },
            { icon: Handshake, t: "رسالتنا", b: "تجربة شراء شفافة وسريعة بأفضل عرض تمويلي ممكن." },
            { icon: BadgeCheck, t: "قيمنا", b: "المصداقية، جودة الخدمة، والالتزام بما نعد به." },
          ].map((c) => (
            <div key={c.t} className="rounded-xl border border-border bg-card p-6">
              <c.icon className="size-8 text-accent" />
              <h3 className="mt-3 text-base">{c.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{c.b}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
