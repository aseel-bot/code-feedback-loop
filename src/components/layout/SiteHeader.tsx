import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, Phone, ChevronDown, X, Search } from "lucide-react";
import { CONTACT } from "@/data/site";
import { Button } from "@/components/ui/button";
import { CommandPalette } from "@/components/ui/CommandPalette";

const NAV = [
  { to: "/", label: "الرئيسية" },
  { to: "/cars", label: "السيارات" },
  { to: "/offers", label: "العروض" },
  { to: "/promotional-offers", label: "العروض الترويجية" },
  { to: "/services", label: "الخدمات" },
  { to: "/about-us", label: "من نحن" },
  { to: "/blog", label: "المدونة" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      <div className="surface-ink hidden md:block">
        <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-4 text-xs">
          <div className="flex items-center gap-5">
            <Link to="/faq" className="opacity-80 transition hover:opacity-100">
              الأسئلة الشائعة
            </Link>
            <Link to="/jobs" className="opacity-80 transition hover:opacity-100">
              الوظائف
            </Link>
            <Link to="/contact-us" className="opacity-80 transition hover:opacity-100">
              تواصل معنا
            </Link>
          </div>
          <a
            href={`tel:${CONTACT.unifiedNumber}`}
            className="flex items-center gap-2 text-accent transition hover:opacity-80"
          >
            <Phone className="size-3.5" />
            <span className="font-bold tracking-wide">{CONTACT.unifiedNumber}</span>
          </a>
        </div>
      </div>

      <div className="border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid size-9 place-items-center rounded-md bg-accent font-display text-lg font-black text-accent-foreground">
              ع
            </span>
            <span className="font-display text-lg leading-tight font-black">
              عادل للسيارات
              <span className="block text-[10px] font-medium tracking-widest text-muted-foreground">
                ADELCARS
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                activeProps={{ className: "text-accent" }}
                className="rounded-md px-3 py-2 text-sm font-medium transition hover:text-accent"
              >
                {item.label}
              </Link>
            ))}
            <div className="group relative">
              <button className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition hover:text-accent">
                طلب شراء <ChevronDown className="size-4" />
              </button>
              <div className="invisible absolute end-0 top-full w-44 rounded-lg border border-border bg-popover p-1 opacity-0 shadow-lg transition group-hover:visible group-hover:opacity-100">
                <Link
                  to="/purchase/customers"
                  className="block rounded-md px-3 py-2 text-sm hover:bg-muted"
                >
                  للأفراد
                </Link>
                <Link
                  to="/purchase/companies"
                  className="block rounded-md px-3 py-2 text-sm hover:bg-muted"
                >
                  للشركات
                </Link>
              </div>
            </div>
          </nav>

          <div className="flex items-center gap-2">
            {/* Command Palette Trigger Button */}
            <button
              onClick={() => setCmdOpen(true)}
              className="flex items-center gap-2 rounded-xl border border-border/80 bg-muted/60 px-3 py-1.5 text-xs text-muted-foreground transition hover:border-accent/50 hover:bg-background hover:text-foreground active:scale-95"
            >
              <Search className="size-3.5 text-accent" />
              <span className="hidden sm:inline">بحث سريـع...</span>
              <kbd className="hidden sm:inline-flex items-center rounded border border-border bg-background px-1.5 font-mono text-[10px]">
                ⌘K
              </kbd>
            </button>

            <Button asChild size="sm" className="hidden sm:inline-flex active:scale-95 transition-transform">
              <Link to="/purchase">طلب شراء</Link>
            </Button>
            <button
              aria-label="القائمة"
              onClick={() => setOpen((v) => !v)}
              className="grid size-10 place-items-center rounded-md border border-border lg:hidden active:scale-95"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {open && (
          <nav className="border-t border-border bg-background px-4 py-3 lg:hidden">
            {[
              ...NAV,
              { to: "/purchase/customers", label: "طلب شراء أفراد" },
              { to: "/purchase/companies", label: "طلب شراء شركات" },
            ].map((item) => (
              <Link
                key={item.to + item.label}
                to={item.to}
                onClick={() => setOpen(false)}
                className="block rounded-md py-2 text-sm font-medium text-foreground transition hover:text-accent"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>

      <CommandPalette open={cmdOpen} onOpenChange={setCmdOpen} />
    </header>
  );
}
