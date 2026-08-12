import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { BRANDS, BRAND_ICONS, BRAND_WORDMARKS, BRAND_LOCAL_LOGOS, CARS } from "@/data/site";
import { Sparkles, Grid } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

function BrandLogo({ brand, className }: { brand: string; className?: string }) {
  const slug = BRAND_ICONS[brand];
  const localSrc = BRAND_LOCAL_LOGOS[brand];
  const [failed, setFailed] = useState(false);
  const wordmark = BRAND_WORDMARKS[brand] ?? brand;

  const imgSrc = !failed && slug ? `https://cdn.simpleicons.org/${slug}/d97706` : localSrc ?? null;

  if (!imgSrc || (failed && !slug)) {
    return (
      <span className="font-display text-[12px] font-bold tracking-wide text-foreground/80 transition group-hover:text-accent">
        {wordmark}
      </span>
    );
  }

  return (
    <img
      src={imgSrc}
      alt={`شعار ${brand}`}
      loading="lazy"
      width={40}
      height={40}
      onError={() => setFailed(true)}
      className={className ?? "size-9 object-contain opacity-90 transition-all duration-300 group-hover:scale-110 group-hover:opacity-100"}
    />
  );
}

export function BrandStrip() {
  const [modalOpen, setModalOpen] = useState(false);

  const counts = CARS.reduce<Record<string, number>>((acc, c) => {
    acc[c.brand] = (acc[c.brand] ?? 0) + 1;
    return acc;
  }, {});

  // Show top featured brands in a single clean section
  const displayBrands = BRANDS.slice(0, 12);

  return (
    <section className="mx-auto mt-16 max-w-7xl px-4 md:mt-24">
      {/* Section Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-accent">
            <Sparkles className="size-3.5" />
            <span>موزع معتمد لأكثر من 40 علامة تجارية</span>
          </div>
          <h2 className="mt-1 font-display text-2xl font-black md:text-3xl">
            تصفح الوكالات والماركات المتاحة
          </h2>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 rounded-xl border border-border/80 bg-card px-4 py-2 text-xs font-bold text-accent shadow-2xs transition hover:border-accent hover:bg-accent/10 active:scale-95"
        >
          <Grid className="size-4" />
          <span>استعراض كافة الماركات ({BRANDS.length})</span>
        </button>
      </div>

      {/* Single Unified Brand Grid */}
      <div className="mt-8 grid grid-cols-2 gap-3.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {displayBrands.map((b) => (
          <Link
            key={b}
            to="/cars"
            search={{ brand: b }}
            className="group flex h-24 flex-col items-center justify-center gap-2 rounded-2xl border border-border/80 bg-card p-3 text-center shadow-2xs transition duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-[var(--shadow-card)] active:scale-95"
          >
            <BrandLogo brand={b} className="size-9 object-contain" />
            <span className="truncate text-xs font-bold text-foreground/90 group-hover:text-accent">
              {b}
              {counts[b] ? ` (${counts[b]})` : ""}
            </span>
          </Link>
        ))}
      </div>

      {/* All Brands Modal Dialog */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto p-6">
          <DialogHeader>
            <DialogTitle className="font-display text-xl font-black text-foreground">
              كافة الماركات والوكالات المتاحة ({BRANDS.length})
            </DialogTitle>
          </DialogHeader>

          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {BRANDS.map((b) => (
              <Link
                key={b}
                to="/cars"
                search={{ brand: b }}
                onClick={() => setModalOpen(false)}
                className="group flex items-center gap-3 rounded-xl border border-border bg-card p-3 transition hover:border-accent hover:bg-accent/10 active:scale-95"
              >
                <BrandLogo brand={b} className="size-8 object-contain" />
                <div>
                  <span className="block text-xs font-bold text-foreground group-hover:text-accent">
                    {b}
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    {counts[b] ? `${counts[b]} سيارات` : "سيارات جديدة"}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
