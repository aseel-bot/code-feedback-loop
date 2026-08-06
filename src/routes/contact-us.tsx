import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { CONTACT } from "@/data/site";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/contact-us")({
  head: () => ({
    meta: [
      { title: "تواصل معنا | عادل للسيارات" },
      {
        name: "description",
        content: "تواصل مع فريق عادل للسيارات عبر الرقم الموحد 920006652 أو نموذج التواصل، والرد خلال 24 ساعة عمل.",
      },
      { property: "og:title", content: "تواصل معنا | عادل للسيارات" },
      { property: "og:description", content: "استفسارات، شكاوى، ومقترحات — نرد خلال 24 ساعة عمل." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const next: Record<string, string> = {};
    if (String(data.get("name") || "").trim().length < 3) next["name"] = "الرجاء إدخال الاسم";
    if (!/^5\d{8}$/.test(String(data.get("phone") || "").trim()))
      next["phone"] = "رقم جوال غير صحيح (يبدأ بـ 5 و9 أرقام)";
    if (String(data.get("message") || "").trim().length < 10)
      next["message"] = "الرسالة قصيرة جدًا";
    setErrors(next);
    if (Object.keys(next).length) return;
    toast.success("تم إرسال رسالتك", { description: "سيتم الرد عليك خلال 24 ساعة عمل." });
    e.currentTarget.reset();
  }

  return (
    <>
      <PageHero
        title="تواصل معنا"
        subtitle="نسعد بخدمتك — أرسل استفسارك وسنرد خلال 24 ساعة عمل."
        crumbs={[{ label: "تواصل معنا" }]}
      />
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 lg:grid-cols-3">
        <div className="space-y-4">
          {[
            { icon: Phone, t: "الرقم الموحد", v: CONTACT.unifiedNumber, href: `tel:${CONTACT.unifiedNumber}` },
            { icon: Mail, t: "البريد الإلكتروني", v: CONTACT.email, href: `mailto:${CONTACT.email}` },
            { icon: MapPin, t: "العنوان", v: CONTACT.address },
            { icon: Clock, t: "أوقات العمل", v: CONTACT.workHours },
          ].map((c) => (
            <div key={c.t} className="rounded-xl border border-border bg-card p-5">
              <c.icon className="size-6 text-accent" />
              <p className="mt-3 text-sm font-bold">{c.t}</p>
              {c.href ? (
                <a href={c.href} className="mt-1 block text-sm text-muted-foreground" dir="ltr">
                  {c.v}
                </a>
              ) : (
                <p className="mt-1 text-sm text-muted-foreground">{c.v}</p>
              )}
            </div>
          ))}
        </div>

        <form
          onSubmit={onSubmit}
          noValidate
          className="rounded-2xl border border-border bg-card p-6 lg:col-span-2 md:p-8"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <Label htmlFor="name">الاسم *</Label>
              <Input id="name" name="name" className="mt-2" />
              {errors["name"] && <p className="mt-1 text-xs text-destructive">{errors["name"]}</p>}
            </div>
            <div>
              <Label htmlFor="phone">رقم الجوال *</Label>
              <div className="mt-2 flex" dir="ltr">
                <span className="grid place-items-center rounded-s-md border border-e-0 border-input bg-muted px-3 text-sm">
                  +966
                </span>
                <Input id="phone" name="phone" inputMode="numeric" className="rounded-s-none" placeholder="5XXXXXXXX" />
              </div>
              {errors["phone"] && <p className="mt-1 text-xs text-destructive">{errors["phone"]}</p>}
            </div>
            <div>
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <Input id="email" name="email" type="email" className="mt-2" dir="ltr" />
            </div>
            <div>
              <Label htmlFor="subject">الموضوع</Label>
              <Input id="subject" name="subject" className="mt-2" />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="message">الرسالة *</Label>
              <Textarea id="message" name="message" rows={6} maxLength={1000} className="mt-2" />
              {errors["message"] && (
                <p className="mt-1 text-xs text-destructive">{errors["message"]}</p>
              )}
            </div>
          </div>
          <Button type="submit" size="lg" className="mt-6 w-full md:w-auto">
            إرسال الرسالة
          </Button>
        </form>
      </div>
    </>
  );
}
