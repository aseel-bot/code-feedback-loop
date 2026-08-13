import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, Phone, ChevronDown, X, Search } from "lucide-react";
import { CONTACT } from "@/data/site";
import { Button } from "@/components/ui/button";
import { CommandPalette } from "@/components/ui/CommandPalette";

import { CarLogo } from "@/components/ui/CarLogo";

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
      {/* Top Utility Bar */}
      <div className="surface-ink hidden md:block">
        <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-4 text-xs">
          <div className="flex items-center gap-5">
            <Link to="/faq" className="opacity-80 transition hover:opacity-100">
              الأسئلة الشائعة
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

      {/* Main Header Bar */}
      <div className="border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 px-4 md:gap-4">
          {/* Logo */}
          <Link to="/" className="group flex shrink-0 items-center gap-2.5">
            <CarLogo className="size-9" />
            <span className="font-display text-lg leading-tight font-black">
              نجم الشارقة للسيارات
              <span className="block text-[10px] font-medium tracking-widest text-muted-foreground">
                NAGM AL-SHREEKA
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden shrink min-w-0 items-center gap-0.5 lg:flex xl:gap-1">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                activeProps={{ className: "text-accent font-bold" }}
                className="rounded-lg px-2.5 py-1.5 text-xs font-medium transition hover:bg-muted/60 hover:text-accent xl:px-3 xl:text-sm"
              >
                {item.label}
              </Link>
            ))}
            <div className="group relative">
              <button className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium transition hover:bg-muted/60 hover:text-accent xl:px-3 xl:text-sm">
                طلب شراء <ChevronDown className="size-3.5" />
              </button>
              <div className="invisible absolute end-0 top-full w-44 rounded-xl border border-border bg-popover p-1.5 opacity-0 shadow-lg transition duration-200 group-hover:visible group-hover:opacity-100">
                <Link
                  to="/purchase/customers"
                  className="block rounded-lg px-3 py-2 text-xs font-medium hover:bg-muted hover:text-accent"
                >
                  للأفراد
                </Link>
                <Link
                  to="/purchase/companies"
                  className="block rounded-lg px-3 py-2 text-xs font-medium hover:bg-muted hover:text-accent"
                >
                  للشركات
                </Link>
              </div>
            </div>
          </nav>

          {/* Header Action Buttons */}
          <div className="flex shrink-0 items-center gap-2">
            {/* Command Palette Search Button */}
            <button
              onClick={() => setCmdOpen(true)}
              className="flex h-9 items-center justify-between gap-2.5 rounded-xl border border-border/80 bg-muted/50 px-3 text-xs text-muted-foreground shadow-2xs transition-all duration-200 hover:border-accent/60 hover:bg-background hover:text-foreground active:scale-95"
              aria-label="البحث السريع"
            >
              <div className="flex items-center gap-1.5">
                <Search className="size-3.5 text-accent" />
                <span className="hidden sm:inline font-medium">بحث سريع...</span>
              </div>
              <kbd className="hidden font-mono text-[10px] font-bold text-muted-foreground/80 md:inline-block">
                ⌘K
              </kbd>
            </button>

            <Button asChild size="sm" className="hidden sm:inline-flex h-9 px-4 active:scale-95 transition-transform">
              <Link to="/purchase">طلب شراء</Link>
            </Button>

            {/* Mobile Menu Button */}
            <button
              aria-label="القائمة"
              onClick={() => setOpen((v) => !v)}
              className="grid size-9 place-items-center rounded-xl border border-border bg-background lg:hidden active:scale-95"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Nav */}
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
                className="block rounded-lg py-2.5 px-3 text-sm font-medium text-foreground transition hover:bg-muted hover:text-accent"
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
