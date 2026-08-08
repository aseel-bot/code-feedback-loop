import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { AnimatedNumber } from "@/components/motion/AnimatedNumber";

const ANNUAL_RATE = 0.045;

export function FinanceCalculator({ price, carName }: { price: number; carName: string }) {
  const [downPct, setDownPct] = useState(10);
  const [term, setTerm] = useState(60);

  const down = Math.round((price * downPct) / 100);
  const financed = price - down;
  const total = financed * (1 + ANNUAL_RATE * (term / 12));
  const monthly = Math.round(total / term);

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <h2 className="text-lg">حاسبة التمويل</h2>

      <div className="mt-5">
        <div className="flex items-center justify-between text-sm">
          <label htmlFor="down">الدفعة الأولى</label>
          <span className="font-bold text-accent">
            {downPct}% — {down.toLocaleString("en-US")} ريال
          </span>
        </div>
        <input
          id="down"
          type="range"
          min={0}
          max={50}
          step={5}
          value={downPct}
          onChange={(e) => setDownPct(Number(e.target.value))}
          className="mt-3 w-full accent-[hsl(var(--accent))]"
        />
      </div>

      <div className="mt-5">
        <label htmlFor="term" className="text-sm">
          مدة التمويل
        </label>
        <select
          id="term"
          value={term}
          onChange={(e) => setTerm(Number(e.target.value))}
          className="mt-2 h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
        >
          {[12, 24, 36, 48, 60].map((m) => (
            <option key={m} value={m}>
              {m} شهر
            </option>
          ))}
        </select>
      </div>

      <div className="mt-6 rounded-xl bg-muted p-4 text-center">
        <p className="text-sm text-muted-foreground">القسط الشهري التقديري</p>
        <p className="mt-1 font-display text-3xl font-black">
          <AnimatedNumber value={monthly} />
          <span className="ms-2 text-sm font-medium text-muted-foreground">ريال</span>
        </p>
      </div>

      <p className="mt-3 text-xs leading-6 text-muted-foreground">
        القسط تقديري لأغراض التوضيح فقط ويخضع لموافقة جهة التمويل والشروط النهائية المعتمدة.
      </p>

      <Button asChild className="mt-4 w-full">
        <Link
          to="/purchase/customers"
          search={{ car: carName, down, term, monthly }}
        >
          أكمل الطلب بهذه الشروط
        </Link>
      </Button>
    </div>
  );
}
