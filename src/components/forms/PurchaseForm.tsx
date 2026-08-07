import { useState } from "react";
import { toast } from "sonner";
import { CARS, REGIONS } from "@/data/site";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = { variant: "customers" | "companies"; defaultCar?: string | undefined };

export function PurchaseForm({ variant, defaultCar }: Props) {
  const isCompany = variant === "companies";
  const [payment, setPayment] = useState<"finance" | "cash">("finance");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const next: Record<string, string> = {};
    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const car = String(data.get("car") || "");
    const region = String(data.get("region") || "");
    const email = String(data.get("email") || "").trim();
    const company = String(data.get("company") || "").trim();

    if (name.length < 3) next["name"] = "الرجاء إدخال الاسم بالكامل";
    if (!/^5\d{8}$/.test(phone)) next["phone"] = "رقم الجوال يجب أن يبدأ بـ 5 ويتكون من 9 أرقام";
    if (!car) next["car"] = "اختر السيارة والموديل";
    if (!region) next["region"] = "اختر المنطقة";
    if (isCompany) {
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) next["email"] = "بريد إلكتروني غير صحيح";
      if (company.length < 2) next["company"] = "أدخل اسم الشركة";
    }
    if (payment === "finance") {
      const salary = Number(data.get("salary") || 0);
      if (!salary || salary < 3000) next["salary"] = "أدخل الراتب الشهري (3000 ريال فأكثر)";
    }

    setErrors(next);
    if (Object.keys(next).length) return;

    toast.success("تم استلام طلبك بنجاح", {
      description: "سيتواصل معك فريق المبيعات خلال وقت قصير على رقم الجوال المسجّل.",
    });
    e.currentTarget.reset();
    setPayment("finance");
  }

  const err = (k: string) =>
    errors[k] ? <p className="mt-1 text-xs text-destructive">{errors[k]}</p> : null;

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
            <Label htmlFor="email">البريد الإلكتروني *</Label>
            <Input id="email" name="email" type="email" className="mt-2" placeholder="name@company.com" dir="ltr" />
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
          <Input id="phone" name="phone" inputMode="numeric" className="rounded-s-none" placeholder="5XXXXXXXX" />
        </div>
        {err("phone")}
      </div>

      <div>
        <Label htmlFor="car">اسم السيارة والموديل *</Label>
        <select
          id="car"
          name="car"
          defaultValue={defaultCar ?? ""}
          className="mt-2 h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
        >
          <option value="">اختر السيارة</option>
          {CARS.map((c) => (
            <option key={c.slug} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
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
              onClick={() => setPayment(o.v)}
              className={`rounded-lg border px-4 py-3 text-sm font-bold transition ${
                payment === o.v
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border hover:border-accent/60"
              }`}
            >
              {o.l}
            </button>
          ))}
        </div>
      </div>

      {payment === "finance" && (
        <>
          <div>
            <Label htmlFor="salary">الراتب الشهري (ريال) *</Label>
            <Input id="salary" name="salary" inputMode="numeric" className="mt-2" placeholder="مثال: 12000" />
            {err("salary")}
          </div>
          <div>
            <Label htmlFor="employer">جهة العمل</Label>
            <Input id="employer" name="employer" className="mt-2" placeholder="القطاع الحكومي / الخاص" />
          </div>
        </>
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
        <Button type="submit" size="lg" className="w-full">
          إرسال الطلب
        </Button>
        <p className="mt-3 text-center text-xs text-muted-foreground">
          بالضغط على إرسال أنت توافق على أن يتواصل معك فريق المبيعات هاتفيًا.
        </p>
      </div>
    </form>
  );
}
