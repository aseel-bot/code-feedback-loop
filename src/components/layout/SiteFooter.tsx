import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { CONTACT } from "@/data/site";
import { CarLogo } from "@/components/ui/CarLogo";

const LINKS = [
  { to: "/cars", label: "السيارات" },
  { to: "/offers", label: "العروض" },
  { to: "/services", label: "الخدمات" },
  { to: "/about-us", label: "من نحن" },
  { to: "/contact-us", label: "تواصل معنا" },
  { to: "/faq", label: "الأسئلة الشائعة" },
  { to: "/jobs", label: "الوظائف" },
  { to: "/privacy-policy", label: "سياسة الخصوصية" },
];

export function SiteFooter() {
  return (
    <footer className="surface-ink mt-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-4">
        <div>
          <div className="group flex items-center gap-2.5">
            <CarLogo className="size-9" />
            <span className="font-display text-lg font-black">نجم الشارقة للسيارات</span>
          </div>
          <p className="mt-4 text-sm opacity-75">
            موزع معتمد لأكثر من 20 علامة تجارية للسيارات في اليمن.
          </p>
          <div className="mt-5 flex gap-3">
            <a href={CONTACT.social.linkedin} aria-label="LinkedIn" className="opacity-70 hover:opacity-100">
              <Linkedin className="size-5" />
            </a>
            <a href={CONTACT.social.facebook} aria-label="Facebook" className="opacity-70 hover:opacity-100">
              <Facebook className="size-5" />
            </a>
            <a href={CONTACT.social.instagram} aria-label="Instagram" className="opacity-70 hover:opacity-100">
              <Instagram className="size-5" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-display text-base text-accent">روابط سريعة</h4>
          <ul className="mt-4 space-y-2 text-sm">
            {LINKS.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="opacity-80 transition hover:opacity-100">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-base text-accent">طلبات الشراء</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link to="/purchase/customers" className="opacity-80 transition hover:opacity-100">
                تمويل أفراد
              </Link>
            </li>
            <li>
              <Link to="/purchase/companies" className="opacity-80 transition hover:opacity-100">
                تمويل شركات
              </Link>
            </li>
            <li>
              <Link to="/cars/compare" className="opacity-80 transition hover:opacity-100">
                مقارنة المواصفات
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-base text-accent">معلومات التواصل</h4>
          <ul className="mt-4 space-y-3 text-sm opacity-80">
            <li className="flex items-center gap-2">
              <Phone className="size-4 shrink-0 text-accent" />
              <span dir="ltr">{CONTACT.unifiedNumber}</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="size-4 shrink-0 text-accent" />
              <span>{CONTACT.email}</span>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="size-4 shrink-0 text-accent" />
              <span>{CONTACT.address}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 text-center text-xs opacity-60 py-4">
        © {new Date().getFullYear()} شركة نجم الشارقة للسيارات. جميع الحقوق محفوظة.
      </div>
    </footer>
  );
}
