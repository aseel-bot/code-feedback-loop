import { Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";

export function PageHero({
  title,
  subtitle,
  crumbs = [],
}: {
  title: string;
  subtitle?: string;
  crumbs?: { label: string; to?: string }[];
}) {
  return (
    <section className="surface-ink relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_-20%,oklch(0.78_0.145_82/0.25),transparent_60%)]" />
      <div className="relative mx-auto max-w-7xl px-4 py-14 md:py-20">
        <nav className="mb-4 flex items-center gap-1 text-xs opacity-70">
          <Link to="/">الرئيسية</Link>
          {crumbs.map((c) => (
            <span key={c.label} className="flex items-center gap-1">
              <ChevronLeft className="size-3.5" />
              {c.to ? <Link to={c.to}>{c.label}</Link> : <span>{c.label}</span>}
            </span>
          ))}
        </nav>
        <h1 className="font-display text-3xl md:text-4xl">{title}</h1>
        {subtitle && <p className="mt-3 max-w-2xl text-sm opacity-75 md:text-base">{subtitle}</p>}
      </div>
    </section>
  );
}
