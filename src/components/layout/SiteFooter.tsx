import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { CONTACT } from "@/data/site";

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
          <div className="flex items-center gap-2">
            <span className="grid size-9 place-items-center rounded-md bg-accent font-display text-lg font-black text-accent-foreground">
              ع
            </span>
            <span className="font-display text-lg font-black">عادل للسيارات</span>
          </div>
          <p className="mt-4 text-sm opacity-75">
            موزع معتمد لأكثر من 40 علامة تجارية للسيارات في المملكة العربية السعودية.
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
          <h4 className="mb-4 text-sm font-bold text-accent">روابط سريعة</h4>
          <ul className="space-y-2 text-sm">
            {LINKS.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="opacity-75 transition hover:opacity-100">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-bold text-accent">طلب الشراء</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/purchase/customers" className="opacity-75 hover:opacity-100">
                طلب شراء أفراد
              </Link>
            </li>
            <li>
              <Link to="/purchase/companies" className="opacity-75 hover:opacity-100">
                طلب شراء شركات
              </Link>
            </li>
            <li>
              <Link to="/promotional-offers" className="opacity-75 hover:opacity-100">
                العروض الترويجية
              </Link>
            </li>
            <li>
              <Link to="/blog" className="opacity-75 hover:opacity-100">
                المدونة
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-bold text-accent">تواصل معنا</h4>
          <ul className="space-y-3 text-sm opacity-80">
            <li className="flex items-center gap-2">
              <Phone className="size-4 text-accent" />
              <a href={`tel:${CONTACT.unifiedNumber}`}>{CONTACT.unifiedNumber}</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="size-4 text-accent" />
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-accent" />
              <span>{CONTACT.address}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <p className="mx-auto max-w-7xl px-4 py-5 text-center text-xs opacity-60">
          © {new Date().getFullYear()} شركة عادل للسيارات. جميع الحقوق محفوظة.
        </p>
      </div>
    </footer>
  );
}
