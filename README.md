# 🏎️ منصة شركة عادل للسيارات | Adel Cars Platform

<p align="center">
  <img src="public/logo.jpg" alt="شعار شركة عادل للسيارات" width="220" style="border-radius: 12px; margin: 16px 0;" />
</p>

<p align="center">
  <b>الموزع المعتمد لأكثر من 40 علامة تجارية للسيارات في المملكة العربية السعودية</b><br />
  منصة إلكترونية حديثة لبيع وتمويل السيارات الجديدة بأفضل خيارات السداد وتجربة مستخدم فاخرة.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/TanStack_Router-1.17-FF4154?style=for-the-badge&logo=tanstack&logoColor=white" alt="TanStack Router" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS v4" />
  <img src="https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-8.2-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite 8" />
  <img src="https://img.shields.io/badge/Nitro-Cloudflare-F38020?style=for-the-badge&logo=cloudflare&logoColor=white" alt="Cloudflare Nitro" />
</p>

---

## 🌟 أبرز المميزات والتطويرات الفنية (Key Features)

- 🔍 **محرك البحث الفوري المباشر (Real-Time Live Auto Search)**:
  - فلترة وتصفية تلقائية فورية أثناء الكتابة حسب الماركة، الموديل، الفئة والسقف السعري دون الحاجة لضغط زر البحث.
  - عداد مرن متناسق للأرقام (`AnimatedNumber`) مع بطاقات معاينة سريعة خفيفة (`Live Preview Cards`).

- 🏎️ **شعارات الماركات المحمية (37+ Car Brand Logos)**:
  - دمج كافة شعارات وكالات السيارات المستخرجة محلياً بصيغة `WebP` عالية الجودة مع حركات تفاعلية ملموسة عند التصفح.

- ⌨️ **قائمة الأوامر السريعة (Command Palette `⌘K`)**:
  - لوحة بحث ذكية معتمدة على مكتبة `cmdk` تتيح للمستخدمين البحث الفوري عبر الاختصار `⌘K` أو `Ctrl+K`.

- 💳 **نماذج التمويل والشراء الذكية (Finance Request Forms)**:
  - مسارات طلب شراء مخصصة للأفراد والشركات مع حاسبة أقساط تقديرية وتجاوب فوري مع الأخطاء والملاحظات التفاعلية (`Sonner Toasts`).

- ⚖️ **أداة مقارنة السيارات (Vehicle Compare Tool)**:
  - إمكانية اختيار ومقارنة مواصفات سيارتين جنباً إلى جنب بشكل هرمي دقيق.

- 🎨 **هندسة الحركة والتصميم الملتزم (Design Engineering & Motion Architecture)**:
  - تطبيق فلسفة *Emil Kowalski* و *Apple Design* بأسلوب ألوان OKLCH Gold & Ink المريحة مع دعم كامل لإمكانية الوصول (`prefers-reduced-motion` و WCAG 2.1 AA).

---

## 🛠️ التقنيات والمكتبات المستخدمة (Tech Stack)

| المجال | المكتبة / التقنية | الوصف والوظيفة |
| :--- | :--- | :--- |
| **إطار العمل (Framework)** | **React 19 + TanStack Start / Router** | إدارة الصفحات والمسارات والـ SSR بسرعة وكفاءة عالية |
| **التنسيق والمظهر (Styling)** | **Tailwind CSS v4 + OKLCH Tokens** | نظام ألوان متسق بدعم المظهر الداكن والفاتح (`dark/light mode`) |
| **الحركة والانتقالات (Motion)** | **Framer Motion (`motion/react`)** | فيزياء الحركة وتأثيرات الانزلاق والـ Stagger |
| **قائمة الأوامر (Command Menu)** | **`cmdk`** | نافذة البحث الفوري بزر `⌘K` |
| **التنبيهات (Notifications)** | **`Sonner`** | إشعارات الاستلام والعمليات بنمط عصري |
| **مكونات الواجهة (Primitives)** | **Radix UI Primitives + Lucide Icons** | مكونات إتاحة الوصول والقوائم والرموز |
| **أدوات البناء والسيرفر (Build & SSR)**| **Vite 8 + Nitro (Cloudflare Module)** | تجميع ومعالجة الملفات والرفع السحابي على Cloudflare Workers |

---

## 🚀 دليل التشغيل المحلي (Getting Started)

### المتطلبات الأساسية (Prerequisites)
- **Node.js**: الإصدار `v20.0.0` أو أعلى (موصى بـ Node `v24`).
- **npm**: الإصدار `v10.0.0` أو أعلى.

### خطوات التشغيل

1. **استكشاف المشروع والتردد على المجلد**:
   ```bash
   git clone https://github.com/CLEANCodeE20/code-feedback-loop.git
   cd code-feedback-loop
   ```

2. **تثبيت حزم المكتبات (Install Dependencies)**:
   ```bash
   npm install
   ```

3. **تشغيل بيئة التطوير المحلية (Run Dev Server)**:
   ```bash
   npm run dev
   ```
   افتح المتصفح على العنوان: `http://localhost:3000`

4. **بناء نسخة الإنتاج والتأكد من الصلاحية (Production Build)**:
   ```bash
   npm run build
   ```

5. **معاينة بناء الإنتاج محلياً (Preview Build)**:
   ```bash
   npm run preview
   ```

---

## 📁 هيكلية المشروع (Project Structure)

```text
code-feedback-loop/
├── public/                  # الملفات الثابتة وشعارات الماركات (37 WebP logos + logo.jpg)
│   └── brands/              # مجلد شعارات ماركات السيارات الرسمية
├── src/
│   ├── components/          # المكونات البرمجية الذكية والواجهات
│   │   ├── cars/            # بطاقات وحاسبة ومعرض السيارات
│   │   ├── forms/           # نماذج التمويل وطلب الشراء للأفراد والشركات
│   │   ├── home/            # محرك البحث الفوري وشريط الماركات والميزات
│   │   ├── layout/          # الهيدر والفوتر ودليل التصفح
│   │   ├── motion/          # مكونات الحركة المتدرجة والعدادات والمرئيات
│   │   └── ui/              # مكونات Radix UI وقائمة الأوامر cmdk والشعار
│   ├── data/                # قاعدة بيانات السيارات والماركات المعتمدة (site.ts)
│   ├── hooks/               # خطاطيف المساعدة وخيارات المقارنة (useCompare)
│   ├── lib/                 # قيم ومنحنيات الحركة الموحدة (motion.ts)
│   ├── routes/              # صفحات ومسارات التطبيق (TanStack Router)
│   └── styles.css           # متغيرة نظام الألوان OKLCH وقواعد Tailwind v4
├── .agents/                 # المهارات والقواعد الصارمة المفعّلة للمشروع
├── SKILLS_GUIDE.md          # دليل استخدام المهارات الـ 35 المجهزة في النظام
├── package.json             # حزم ومكتبات المشروع
└── README.md                # وثيقة المشروع الحالية
```

---

## 📜 معايير الجودة والالتزام (Quality Standards)

تم بناء وتطوير المنصة وفق 35 مهارة هندسية مفعلة في `.agents/skills/`:
- **خلو كامل من أخطاء الأنواع (Strict TypeScript)**.
- **التوافق التام مع إمكانيات الوصول (WCAG 2.1 AA)**.
- **صفر أخطاء بناء (0 Build Errors)**.

---

<p align="center">
  تمت البرمجة والتطوير بواسطة فريق <b>عادل للسيارات | ADELCARS</b> © 2026
</p>
