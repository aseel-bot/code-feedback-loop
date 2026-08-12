import { useState } from "react";
import { toast } from "sonner";
import { CARS, REGIONS, CONTACT } from "@/data/site";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import { T } from "@/lib/motion";

type Props = {
  variant: "customers" | "companies";
  defaultCar?: string | undefined;
  downPayment?: number | undefined;
  termMonths?: number | undefined;
  estimatedMonthly?: number | undefined;
  offerSlug?: string | undefined;
};

export function PurchaseForm({
  variant,
  defaultCar,
  downPayment,
  termMonths,
  estimatedMonthly,
  offerSlug,
}: Props) {
  const isCompany = variant === "companies";
  const [payment, setPayment] = useState<"finance" | "cash">("finance");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [reference, setReference] = useState<string | null>(null);
  const [shake, setShake] = useState(0);
  const [justSucceeded, setJustSucceeded] = useState(false);
  const reduce = useReducedMotion();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const next: Record<string, string> = {};
    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const car = String(data.get("car") || "");
    const region = String(data.get("region") || "");
    const email = String(data.get("email") || "").trim();
    const company = String(data.get("company") || "").trim();
    const cr = String(data.get("cr") || "").trim();
    const salaryRaw = String(data.get("salary") || "").trim();
    const employer = String(data.get("employer") || "").trim();

    if (name.length < 3) next["name"] = "الرجاء إدخال الاسم بالكامل";
    if (!/^5\d{8}$/.test(phone)) next["phone"] = "رقم الجوال يجب أن يبدأ بـ 5 ويتكون من 9 أرقام";
    if (!car) next["car"] = "اختر السيارة والموديل";
    if (!region) next["region"] = "اختر المنطقة";
    if (isCompany) {
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) next["email"] = "بريد إلكتروني غير صحيح";
      if (company.length < 2) next["company"] = "أدخل اسم الشركة";
      if (!/^\d{10}$/.test(cr)) next["cr"] = "رقم السجل التجاري يتكون من 10 أرقام";
    }
    if (payment === "finance" && salaryRaw && Number(salaryRaw) < 3000) {
      next["salary"] = "الراتب الشهري يجب أن يكون 3000 ريال فأكثر";
    }

    setErrors(next);
    if (Object.keys(next).length) {
      setShake((n) => n + 1);
      return;
    }

    setSending(true);
    const { data: row, error } = await supabase
      .from("leads")
      .insert({
        lead_type: isCompany ? "company" : "customer",
        full_name: name,
        phone: `+966${phone}`,
        email: email || null,
        company_name: isCompany ? company : null,
        cr_number: isCompany ? cr : null,
        car_name: car,
        payment_type: payment,
        region,
        monthly_salary: payment === "finance" && salaryRaw ? Number(salaryRaw) : null,
        employer: payment === "finance" && employer ? employer : null,
        down_payment: downPayment ?? null,
        term_months: termMonths ?? null,
        estimated_monthly: estimatedMonthly ?? null,
        notes: offerSlug ? `مرتبط بالعرض: ${offerSlug}` : null,
      })
      .select("reference")
      .single();
    setSending(false);

    if (error || !row) {
      setShake((n) => n + 1);
      toast.error("تعذّر إرسال الطلب", {
        description: `يرجى المحاولة مرة أخرى أو الاتصال بنا مباشرة على ${CONTACT.unifiedNumber}.`,
      });
      return;
    }

    setJustSucceeded(true);
    setTimeout(() => setJustSucceeded(false), 900);
    setReference(row.reference);
    toast.success("تم استلام طلبك بنجاح", {
      description: `رقمك المرجعي ${row.reference} — سيتواصل معك فريق المبيعات خلال 24 ساعة عمل.`,
    });
    form.reset();
    setPayment("finance");
  }

  const err = (k: string) =>
    errors[k] ? (
      <motion.p
        className="mt-1 overflow-hidden text-xs text-destructive"
        role="alert"
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto", transition: T.base }}
      >
        {errors[k]}
      </motion.p>
    ) : null;

  if (reference) {
    return (
      <motion.div
        className="text-center"
        role="status"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1, transition: T.base }}
      >
        <h2 className="text-xl font-bold">تم استلام طلبك</h2>
        <p className="mt-3 text-sm text-muted-foreground">رقمك المرجعي</p>
        <p className="mt-1 font-display text-3xl font-black text-accent" dir="ltr">
          {reference}
        </p>
        <p className="mt-4 text-sm leading-7 text-muted-foreground">
          سيتواصل معك فريق المبيعات خلال 24 ساعة عمل على رقم الجوال المسجّل. للاستفسار العاجل اتصل على{" "}
          <a href={`tel:${CONTACT.unifiedNumber}`} className="font-bold text-accent" dir="ltr">
            {CONTACT.unifiedNumber}
          </a>
          .
        </p>
        <Button variant="outline" className="mt-6" onClick={() => setReference(null)}>
          إرسال طلب آخر
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5 md:grid-cols-2">
      <div className="md:col-span-2">
        <Label htmlFor="name">الاسم بالكامل *</Label>
        <Input id="name" name="name" className="mt-2" placeholder="مثال: عبدالله محمد" />
        {err("name")}
      </div>

      {isCompany && (
        <>
          <div>
            <Label htmlFor="company">اسم الشركة *</Label>
            <Input id="company" name="company" className="mt-2" placeholder="اسم المنشأة" />
            {err("company")}
          </div>
          <div>
            <Label htmlFor="cr">رقم السجل التجاري *</Label>
            <Input
              id="cr"
              name="cr"
              inputMode="numeric"
              maxLength={10}
              className="mt-2"
              placeholder="10 أرقام"
              dir="ltr"
            />
            {err("cr")}
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="email">البريد الإلكتروني *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              className="mt-2"
              placeholder="name@company.com"
              dir="ltr"
            />
            {err("email")}
          </div>
        </>
      )}

      <div>
        <Label htmlFor="phone">رقم الجوال *</Label>
        <div className="mt-2 flex" dir="ltr">
          <span className="grid place-items-center rounded-s-md border border-e-0 border-input bg-muted px-3 text-sm">
            +966
          </span>
          <Input
            id="phone"
            name="phone"
            inputMode="numeric"
            className="rounded-s-none"
            placeholder="5XXXXXXXX"
          />
        </div>
        {err("phone")}
      </div>

      <div>
        <Label htmlFor="car">اسم السيارة والموديل *</Label>
        <input
          id="car"
          name="car"
          list="car-options"
          defaultValue={defaultCar ?? ""}
          placeholder="ابحث عن السيارة"
          className="mt-2 h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
        />
        <datalist id="car-options">
          {CARS.map((c) => (
            <option key={c.slug} value={c.name} />
          ))}
        </datalist>
        {err("car")}
      </div>

      <div className="md:col-span-2">
        <Label>طريقة الدفع *</Label>
        <div className="mt-2 grid grid-cols-2 gap-3">
          {(
            [
              { v: "finance", l: "تمويل" },
              { v: "cash", l: "كاش" },
            ] as const
          ).map((o) => (
            <button
              key={o.v}
              type="button"
              aria-pressed={payment === o.v}
              onClick={() => setPayment(o.v)}
              className={`relative rounded-lg border px-4 py-3 text-sm font-bold transition-colors ${
                payment === o.v ? "border-accent" : "border-border hover:border-accent/60"
              }`}
            >
              {payment === o.v && (
                <motion.span
                  layoutId="payment-pill"
                  transition={T.base}
                  className="absolute inset-0 rounded-lg bg-accent"
                />
              )}
              <span
                className={`relative ${payment === o.v ? "text-accent-foreground" : ""}`}
              >
                {o.l}
              </span>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence initial={false}>
      {payment === "finance" && (
        <motion.div
          key="finance-fields"
          className="grid gap-5 overflow-hidden md:col-span-2 md:grid-cols-2"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1, transition: T.base }}
          exit={{ height: 0, opacity: 0, transition: T.base }}
        >
          <div>
            <Label htmlFor="salary">الراتب الشهري (ريال) — اختياري</Label>
            <Input
              id="salary"
              name="salary"
              inputMode="numeric"
              className="mt-2"
              placeholder="مثال: 12000"
            />
            {err("salary")}
          </div>
          <div>
            <Label htmlFor="employer">جهة العمل — اختياري</Label>
            <Input
              id="employer"
              name="employer"
              className="mt-2"
              placeholder="القطاع الحكومي / الخاص"
            />
          </div>
        </motion.div>
      )}
      </AnimatePresence>

      {(downPayment != null || termMonths != null) && (
        <p className="md:col-span-2 rounded-lg bg-muted p-3 text-sm">
          شروط التمويل المختارة: دفعة أولى {Number(downPayment ?? 0).toLocaleString("en-US")} ريال |
          مدة {termMonths} شهر
          {estimatedMonthly
            ? ` | قسط تقديري ${Math.round(estimatedMonthly).toLocaleString("en-US")} ريال`
            : ""}
        </p>
      )}

      <div className="md:col-span-2">
        <Label htmlFor="region">المنطقة *</Label>
        <select
          id="region"
          name="region"
          className="mt-2 h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
        >
          <option value="">اختر المنطقة</option>
          {REGIONS.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
        {err("region")}
      </div>

      <div className="md:col-span-2">
        <motion.div
          animate={
            reduce || !shake
              ? {}
              : { x: [0, -6, 6, -4, 4, 0], transition: { duration: 0.4 } }
          }
          key={`shake-${shake}`}
        >
          <Button type="submit" size="lg" className="w-full" disabled={sending}>
            <motion.span
              className="flex items-center justify-center gap-2"
              animate={justSucceeded && !reduce ? { scale: [1, 1.1, 1] } : { scale: 1 }}
              transition={{ duration: 0.35 }}
            >
              {sending ? (
                <Loader2 className="size-5 animate-spin" aria-label="جارٍ الإرسال" />
              ) : justSucceeded ? (
                <Check className="size-5" aria-label="تم الإرسال" />
              ) : (
                "إرسال الطلب"
              )}
            </motion.span>
          </Button>
        </motion.div>
        <p className="mt-3 text-center text-xs text-muted-foreground">
          بالضغط على إرسال أنت توافق على أن يتواصل معك فريق المبيعات هاتفيًا.
        </p>
      </div>
    </form>
  );
}
