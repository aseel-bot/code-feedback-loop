import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  BadgeCheck,
  Building2,
  Landmark,
  ShieldCheck,
  Truck,
  User,
} from "lucide-react";
import heroCar from "@/assets/hero-car.jpg";
import purchaseImg from "@/assets/purchase.jpg";
import { CARS, OFFERS } from "@/data/site";
import { Button } from "@/components/ui/button";
import { CarCard } from "@/components/cars/CarCard";
import { QuickSearch } from "@/components/home/QuickSearch";
import { BrandStrip } from "@/components/home/BrandStrip";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { AnimatedNumber } from "@/components/motion/AnimatedNumber";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { T, containerStagger, fadeUp } from "@/lib/motion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "عادل للسيارات | موزع معتمد لأكثر من 40 علامة تجارية" },
      {
        name: "description",
        content:
          "تصفح سيارات الوكالات الجديدة، قارن الأسعار والأقساط، وقدّم طلب شراء كاش أو تمويل مع عادل للسيارات في السعودية.",
      },
      { property: "og:title", content: "عادل للسيارات | إختيارك الذهبي لإمتلاك سيارة أحلامك" },
      {
        property: "og:description",
        content: "اكتشف، قارن، امتلك وانطلق بسهولة — سيارات وكالات جديدة بخطط تمويل مرنة.",
      },
    ],
  }),
  component: Home,
});

const FEATURES = [
  { icon: BadgeCheck, title: "موزع معتمد", body: "أكثر من 40 علامة تجارية بضمان الوكيل." },
  { icon: ShieldCheck, title: "ضمان ممتد", body: "تغطية شاملة لأهم أجزاء السيارة." },
  { icon: Landmark, title: "تمويل معتمد", body: "أفضل عرض تمويلي من بنوك وشركات معتمدة." },
  { icon: Truck, title: "توصيل لمدينتك", body: "نوصل سيارتك أينما كنت داخل المملكة." },
];

function Home() {
  const reduce = useReducedMotion();
  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.06, 1.16]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <>
      <section ref={heroRef} className="surface-ink relative isolate overflow-hidden">
        <motion.img
          src={heroCar}
          alt="سيارة دفع رباعي فاخرة على طريق صحراوي وقت الغروب"
          width={1600}
          height={1008}
          style={reduce ? {} : { y: imgY, scale: imgScale }}
          className="absolute inset-0 size-full object-cover"
        />
        <div className="hero-overlay absolute inset-0" />

        <motion.div
          className="relative mx-auto max-w-7xl px-4 py-24 md:py-32"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.15 } } }}
          initial="hidden"
          animate="show"
          style={reduce ? {} : { y: contentY, opacity: contentOpacity }}
        >
          <motion.span
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: T.hero } }} className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-xs font-bold text-accent">
            <BadgeCheck className="size-4" /> موزع معتمد — شركة عادل للسيارات
          </motion.span>
          <motion.h1
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: T.hero } }}
            className="mt-6 max-w-3xl font-display text-4xl leading-tight md:text-6xl">
            إختيارك <span className="text-gradient-gold">الذهبي</span> لإمتلاك سيارة أحلامك في
            السعودية
          </motion.h1>
          <motion.p
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: T.hero } }}
            className="mt-4 max-w-xl text-base opacity-80 md:text-lg">
            اكتشف، قارن، امتلك وانطلق بسهولة!
          </motion.p>
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: T.hero } }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Button asChild size="lg">
              <Link to="/cars">تصفح السيارات</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/30 bg-white/5">
              <Link to="/purchase">طلب شراء</Link>
            </Button>
          </motion.div>

          <motion.dl
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: T.hero } }}
            className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-white/15 pt-6"
          >
            {[
              { n: 40, prefix: "+", v: "علامة تجارية" },
              { n: 12, prefix: "+", v: "بنك وشركة تمويل" },
              { n: 13, prefix: "", v: "منطقة توصيل" },
            ].map((s) => (
              <div key={s.v}>
                <dt className="font-display text-2xl text-accent md:text-3xl">
                  {s.prefix}
                  <AnimatedNumber value={s.n} duration={1100} />
                </dt>
                <dd className="mt-1 text-xs opacity-70 md:text-sm">{s.v}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

      </section>

      <div className="relative z-10 mx-auto max-w-7xl px-4 md:-mt-12">
        <QuickSearch />
      </div>

      <BrandStrip />


      <section className="mx-auto mt-16 max-w-7xl px-4 md:mt-24">

        <RevealGroup className="grid gap-4 md:grid-cols-4">
          {FEATURES.map((f) => (
            <RevealItem key={f.title} className="rounded-xl border border-border bg-card p-5">
              <f.icon className="size-7 text-accent" />
              <h3 className="mt-3 text-base">{f.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      <section className="mx-auto mt-20 max-w-7xl px-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold tracking-widest text-accent">أحدث الموديلات</p>
            <h2 className="mt-1 font-display text-2xl md:text-3xl">سيارات مختارة لك</h2>
          </div>
          <Link to="/cars" className="flex items-center gap-1 text-sm font-bold text-accent">
            كل السيارات <ArrowLeft className="size-4" />
          </Link>
        </div>
        <RevealGroup className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CARS.slice(0, 3).map((car) => (
            <RevealItem key={car.slug}>
              <CarCard car={car} />
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      <section className="mx-auto mt-20 max-w-7xl px-4">
        <Reveal variant="slow" className="grid items-center gap-10 rounded-2xl border border-border bg-card p-6 md:grid-cols-2 md:p-10">
          <div>
            <p className="text-xs font-bold tracking-widest text-accent">إختر سيارتك</p>
            <h2 className="mt-2 font-display text-2xl md:text-3xl">
              نساعدك شخصيًا للحصول على أفضل عرض تمويلي
            </h2>
            <p className="mt-4 text-sm text-muted-foreground md:text-base">
              قدّم طلب الشراء خلال دقيقة، ويتولى مستشار المبيعات لدينا مقارنة عروض البنوك وشركات
              التمويل المعتمدة لاختيار الأنسب لك، سواء كنت فردًا أو شركة.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild>
                <Link to="/purchase/customers">
                  <User className="size-4" /> للأفراد
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/purchase/companies">
                  <Building2 className="size-4" /> للشركات
                </Link>
              </Button>
            </div>
          </div>
          <img
            src={purchaseImg}
            alt="مندوب مبيعات يسلّم مفاتيح السيارة للعميل"
            loading="lazy"
            width={1200}
            height={900}
            className="rounded-xl object-cover"
          />
        </Reveal>
      </section>

      <section className="mx-auto mt-20 max-w-7xl px-4">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-display text-2xl md:text-3xl">أحدث العروض</h2>
          <Link to="/offers" className="flex items-center gap-1 text-sm font-bold text-accent">
            كل العروض <ArrowLeft className="size-4" />
          </Link>
        </div>
        <motion.div
          className="mt-8 grid gap-6 md:grid-cols-3"
          variants={containerStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {OFFERS.map((o) => (
            <motion.div key={o.slug} variants={fadeUp} className="offer-glow rounded-xl">
            <Link
              to="/offers/$slug"
              params={{ slug: o.slug }}
              className="group relative block overflow-hidden rounded-xl border border-border bg-card"
            >
              <span className="absolute end-3 top-3 z-10 rounded-full bg-accent px-2.5 py-1 text-[11px] font-bold text-accent-foreground">
                عرض
              </span>
              <img
                src={o.image}
                alt={o.title}
                loading="lazy"
                width={1200}
                height={800}
                className="h-40 w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="p-4">
                <h3 className="text-base group-hover:text-accent">{o.title}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{o.subtitle}</p>
              </div>
            </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="mx-auto mt-20 max-w-7xl px-4">
        <h2 className="text-center font-display text-2xl">البنوك والشركات المعتمدة</h2>
        <div className="marquee mt-8">
          <div className="marquee-track">
            {[0, 1].map((dup) => (
              <div key={dup} className="marquee-group" aria-hidden={dup === 1}>
                {["الراجحي", "الأهلي", "الرياض", "البلاد", "الإنماء", "اليسر"].map((b) => (
                  <div
                    key={b}
                    className="grid h-20 w-40 shrink-0 place-items-center rounded-xl border border-border bg-card text-sm font-bold text-muted-foreground"
                  >
                    {b}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
