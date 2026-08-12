import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { Link, useNavigate } from "@tanstack/react-router";
import { Search, Car, Tag, Sparkles, Building2, PhoneCall, HelpCircle, ArrowLeft } from "lucide-react";
import { BRANDS, CARS, OFFERS } from "@/data/site";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export function CommandPalette({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, onOpenChange]);

  const selectAction = (callback: () => void) => {
    onOpenChange(false);
    callback();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden p-0 max-w-xl border-border bg-card shadow-2xl">
        <Command className="w-full bg-card text-foreground">
          <div className="flex items-center border-b border-border px-3">
            <Search className="size-4 me-2 text-accent shrink-0" />
            <Command.Input
              placeholder="ابحث عن سيارة، ماركة، أو عرض (مثال: كامري، تويوتا، تقسيط)..."
              className="h-12 w-full bg-transparent text-sm text-foreground focus:outline-none placeholder:text-muted-foreground"
            />
            <kbd className="hidden sm:inline-flex items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] text-muted-foreground">
              ESC
            </kbd>
          </div>

          <Command.List className="max-h-[340px] overflow-y-auto p-2">
            <Command.Empty className="py-6 text-center text-sm text-muted-foreground">
              لا توجد نتائج مطابقة لبحثك.
            </Command.Empty>

            <Command.Group heading="السيارات المتاحة" className="px-2 py-1.5 text-xs font-bold text-accent">
              {CARS.map((car) => (
                <Command.Item
                  key={car.slug}
                  onSelect={() => selectAction(() => navigate({ to: "/cars/$slug", params: { slug: car.slug } }))}
                  className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm transition hover:bg-muted data-[selected=true]:bg-accent/15 data-[selected=true]:text-accent"
                >
                  <div className="flex items-center gap-2.5">
                    <Car className="size-4 text-muted-foreground" />
                    <span>{car.name}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {car.price ? `${car.price.toLocaleString("en-US")} ريال` : "طلب خاص"}
                  </span>
                </Command.Item>
              ))}
            </Command.Group>

            <Command.Group heading="تصفح حسب الماركة" className="mt-2 px-2 py-1.5 text-xs font-bold text-accent">
              {BRANDS.slice(0, 8).map((brand) => (
                <Command.Item
                  key={brand}
                  onSelect={() => selectAction(() => navigate({ to: "/cars", search: { brand } }))}
                  className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm transition hover:bg-muted data-[selected=true]:bg-accent/15 data-[selected=true]:text-accent"
                >
                  <div className="flex items-center gap-2.5">
                    <Tag className="size-4 text-muted-foreground" />
                    <span>سيارات {brand}</span>
                  </div>
                  <ArrowLeft className="size-3.5 opacity-60" />
                </Command.Item>
              ))}
            </Command.Group>

            <Command.Group heading="روابط سريعة" className="mt-2 px-2 py-1.5 text-xs font-bold text-accent">
              <Command.Item
                onSelect={() => selectAction(() => navigate({ to: "/purchase/customers" }))}
                className="flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition hover:bg-muted data-[selected=true]:bg-accent/15 data-[selected=true]:text-accent"
              >
                <Sparkles className="size-4 text-accent" />
                <span>تقديم طلب تمويل للأفراد</span>
              </Command.Item>
              <Command.Item
                onSelect={() => selectAction(() => navigate({ to: "/purchase/companies" }))}
                className="flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition hover:bg-muted data-[selected=true]:bg-accent/15 data-[selected=true]:text-accent"
              >
                <Building2 className="size-4 text-accent" />
                <span>تقديم طلب تمويل للشركات</span>
              </Command.Item>
              <Command.Item
                onSelect={() => selectAction(() => navigate({ to: "/cars/compare" }))}
                className="flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition hover:bg-muted data-[selected=true]:bg-accent/15 data-[selected=true]:text-accent"
              >
                <HelpCircle className="size-4 text-accent" />
                <span>أداة مقارنة المواصفات</span>
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
