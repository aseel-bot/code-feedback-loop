import { Link } from "@tanstack/react-router";
import { Fuel, Users, Cog, CircleDot } from "lucide-react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import type { PointerEvent } from "react";
import type { Car } from "@/data/site";
import { Button } from "@/components/ui/button";
import { T } from "@/lib/motion";

export function CarCard({ car }: { car: Car }) {
  const reduce = useReducedMotion();

  // تتبّع المؤشر لإمالة خفيفة ولمعة تتبع الحركة
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rx = useSpring(useTransform(py, [0, 1], [4, -4]), { stiffness: 220, damping: 24 });
  const ry = useSpring(useTransform(px, [0, 1], [-5, 5]), { stiffness: 220, damping: 24 });
  const glareX = useTransform(px, (v) => `${v * 100}%`);
  const glareY = useTransform(py, (v) => `${v * 100}%`);
  const glare = useMotionTemplate`radial-gradient(220px circle at ${glareX} ${glareY}, oklch(0.78 0.145 82 / 0.18), transparent 65%)`;

  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.article
      layout
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="group relative overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-card)] transition-[border-color,box-shadow] hover:border-accent/50 hover:shadow-[var(--shadow-elevated,0_18px_40px_-18px_rgba(0,0,0,0.45))]"
      {...(reduce
        ? {}
        : {
            style: { rotateX: rx, rotateY: ry, transformPerspective: 900 },
            whileHover: { y: -6, transition: T.base },
            whileTap: { scale: 0.985 },
            transition: T.base,
          })}
    >
      {!reduce && (
        <motion.div
          aria-hidden
          style={{ backgroundImage: glare }}
          className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
      )}
      <Link to="/cars/$slug" params={{ slug: car.slug }} className="relative block overflow-hidden">
        <img
          src={car.image}
          alt={car.name}
          loading="lazy"
          width={1200}
          height={800}
          className="h-48 w-full object-cover transition-transform duration-500 ease-out md:group-hover:scale-105"
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
          <h3 className="font-display text-base font-bold transition-colors group-hover:text-accent">
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
          <motion.div className="flex-1" {...(reduce ? {} : { whileTap: { scale: 0.96 } })}>
            <Button asChild size="sm" className="w-full">
              <Link to="/purchase/customers" search={{ car: car.name }}>
                {car.price ? "طلب شراء" : "احجز سيارتك الآن"}
              </Link>
            </Button>
          </motion.div>
          <Button asChild size="sm" variant="outline">
            <Link to="/cars/$slug" params={{ slug: car.slug }}>
              المزيد
            </Link>
          </Button>
        </div>
      </div>
    </motion.article>
  );
}
