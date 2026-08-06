import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/layout/PageHero";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "سياسة الخصوصية | عادل للسيارات" },
      {
        name: "description",
        content: "كيف نجمع بيانات عملائنا ونستخدمها ونحميها في موقع عادل للسيارات.",
      },
      { property: "og:title", content: "سياسة الخصوصية | عادل للسيارات" },
      { property: "og:description", content: "التزامنا بحماية بياناتك الشخصية." },
    ],
  }),
  component: Privacy,
});

const SECTIONS = [
  {
    t: "البيانات التي نجمعها",
    b: "نجمع الاسم ورقم الجوال والبريد الإلكتروني والمنطقة وبيانات طلب الشراء التي تزودنا بها طوعًا عبر النماذج في الموقع.",
  },
  {
    t: "كيف نستخدم البيانات",
    b: "تُستخدم بياناتك للتواصل معك بخصوص طلبك، ومقارنة عروض التمويل، وتحسين خدماتنا، ولا تُستخدم لأي غرض آخر دون إذنك.",
  },
  {
    t: "مشاركة البيانات",
    b: "قد تتم مشاركة بياناتك مع جهات التمويل المعتمدة فقط عند طلبك الحصول على تمويل، ووفق أنظمة المملكة العربية السعودية.",
  },
  {
    t: "حماية البيانات",
    b: "نطبق إجراءات تقنية وتنظيمية مناسبة لحماية بياناتك من الوصول أو الاستخدام غير المصرح به.",
  },
  {
    t: "حقوقك",
    b: "يحق لك طلب الاطلاع على بياناتك أو تصحيحها أو حذفها عبر التواصل معنا على الرقم الموحد 920006652.",
  },
];

function Privacy() {
  return (
    <>
      <PageHero title="سياسة الخصوصية" crumbs={[{ label: "سياسة الخصوصية" }]} />
      <div className="mx-auto max-w-3xl space-y-6 px-4 py-12">
        {SECTIONS.map((s) => (
          <section key={s.t} className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-base">{s.t}</h2>
            <p className="mt-2 text-sm leading-8 text-muted-foreground">{s.b}</p>
          </section>
        ))}
      </div>
    </>
  );
}
