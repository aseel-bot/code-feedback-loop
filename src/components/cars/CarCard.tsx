import { Link } from "@tanstack/react-router";
import { Fuel, Users, Cog, CircleDot } from "lucide-react";
import type { Car } from "@/data/site";
import { Button } from "@/components/ui/button";

export function CarCard({ car }: { car: Car }) {
  return (
    <article className="group overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-card)] transition hover:-translate-y-1 hover:border-accent/50">
      <Link to="/cars/$slug" params={{ slug: car.slug }} className="relative block">
        <img
          src={car.image}
          alt={car.name}
          loading="lazy"
          width={1200}
          height={800}
          className="h-48 w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute start-3 top-3 flex flex-wrap gap-1.5">
          {car.badges.map((b) => (
            <span
              key={b}
              className="rounded-full bg-accent px-2.5 py-1 text-[11px] font-bold text-accent-foreground"
            >
              {b}
            </span>
          ))}
        </div>
      </Link>

      <div className="p-4">
        <Link to="/cars/$slug" params={{ slug: car.slug }}>
          <h3 className="font-display text-base font-bold transition group-hover:text-accent">
            {car.name}
          </h3>
        </Link>
        <p className="mt-1 text-xs text-muted-foreground">
          {car.brand} · {car.category}
        </p>

        <ul className="mt-4 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
          <li className="flex items-center gap-1.5">
            <Cog className="size-3.5 text-accent" /> {car.basics.gear}
          </li>
          <li className="flex items-center gap-1.5">
            <CircleDot className="size-3.5 text-accent" /> {car.basics.tire}
          </li>
          <li className="flex items-center gap-1.5">
            <Fuel className="size-3.5 text-accent" /> {car.basics.fuel}
          </li>
          <li className="flex items-center gap-1.5">
            <Users className="size-3.5 text-accent" /> {car.basics.seats} ركاب
          </li>
        </ul>

        <div className="mt-4 border-t border-border pt-4">
          {car.price ? (
            <>
              <p className="font-display text-lg font-black">
                {car.price.toLocaleString("en-US")}{" "}
                <span className="text-xs font-medium text-muted-foreground">ريال شامل الضريبة</span>
              </p>
              {car.monthly && (
                <p className="text-xs text-muted-foreground">
                  قسط شهري يبدأ من {car.monthly.toLocaleString("en-US")} ريال
                </p>
              )}
            </>
          ) : (
            <p className="font-display text-base font-bold text-accent">السعر عند الطلب</p>
          )}
        </div>

        <div className="mt-4 flex items-center gap-2">
          <Button asChild size="sm" className="flex-1">
            <Link to="/purchase/customers" search={{ car: car.name }}>
              {car.price ? "طلب شراء" : "احجز سيارتك الآن"}
            </Link>
          </Button>
          <Button asChild size="sm" variant="outline">
            <Link to="/cars/$slug" params={{ slug: car.slug }}>
              المزيد
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
