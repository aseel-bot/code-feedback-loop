import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Briefcase, MapPin } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const VACANCIES = [
  { title: "مستشار مبيعات سيارات", city: "الرياض", type: "دوام كامل" },
  { title: "أخصائي تمويل", city: "جدة", type: "دوام كامل" },
  { title: "موظف خدمة عملاء", city: "الدمام", type: "دوام كامل" },
];

export const Route = createFileRoute("/jobs")({
  head: () => ({
    meta: [
      { title: "الوظائف الشاغرة | انضم لفريق عادل للسيارات" },
      {
        name: "description",
        content: "تصفح الوظائف الشاغرة في عادل للسيارات وقدّم طلبك مباشرة عبر الموقع.",
      },
      { property: "og:title", content: "الوظائف | عادل للسيارات" },
      { property: "og:description", content: "فرص عمل في المبيعات والتمويل وخدمة العملاء." },
    ],
  }),
  component: Jobs,
});

function Jobs() {
  const [selected, setSelected] = useState(VACANCIES[0]!.title);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (String(data.get("name") || "").trim().length < 3 || !data.get("cv")) {
      toast.error("الرجاء إكمال البيانات وإرفاق السيرة الذاتية");
      return;
    }
    toast.success("تم استلام طلبك", { description: "سنتواصل معك في حال توافق مؤهلاتك مع الوظيفة." });
    e.currentTarget.reset();
  }

  return (
    <>
      <PageHero
        title="الوظائف"
        subtitle="انضم إلى فريق عادل للسيارات وابنِ مستقبلك المهني معنا."
        crumbs={[{ label: "الوظائف" }]}
      />
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 lg:grid-cols-2">
        <div className="space-y-4">
          <h2 className="font-display text-xl">الوظائف الشاغرة</h2>
          {VACANCIES.map((v) => (
            <button
              key={v.title}
              onClick={() => setSelected(v.title)}
              className={`w-full rounded-xl border p-5 text-start transition ${
                selected === v.title ? "border-accent bg-accent/5" : "border-border bg-card"
              }`}
            >
              <h3 className="text-base">{v.title}</h3>
              <p className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="size-3.5" /> {v.city}
                </span>
                <span className="flex items-center gap-1">
                  <Briefcase className="size-3.5" /> {v.type}
                </span>
              </p>
            </button>
          ))}
        </div>

        <form onSubmit={onSubmit} className="rounded-2xl border border-border bg-card p-6 md:p-8">
          <h2 className="font-display text-xl">التقديم على وظيفة</h2>
          <div className="mt-6 grid gap-5">
            <div>
              <Label htmlFor="job">الوظيفة</Label>
              <select
                id="job"
                name="job"
                value={selected}
                onChange={(e) => setSelected(e.target.value)}
                className="mt-2 h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
              >
                {VACANCIES.map((v) => (
                  <option key={v.title} value={v.title}>
                    {v.title}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="name">الاسم بالكامل *</Label>
              <Input id="name" name="name" className="mt-2" />
            </div>
            <div>
              <Label htmlFor="phone">رقم الجوال</Label>
              <Input id="phone" name="phone" inputMode="numeric" className="mt-2" dir="ltr" placeholder="05XXXXXXXX" />
            </div>
            <div>
              <Label htmlFor="cv">السيرة الذاتية (PDF) *</Label>
              <Input id="cv" name="cv" type="file" accept=".pdf,.doc,.docx" className="mt-2" />
            </div>
            <div>
              <Label htmlFor="note">نبذة عنك</Label>
              <Textarea id="note" name="note" rows={4} className="mt-2" />
            </div>
            <Button type="submit" size="lg">
              إرسال الطلب
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
