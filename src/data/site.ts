import carSedan from "@/assets/car-sedan.jpg";
import carSuv from "@/assets/car-suv.jpg";
import galleryInterior from "@/assets/gallery-interior.jpg";
import galleryRear from "@/assets/gallery-rear.jpg";
import galleryWheel from "@/assets/gallery-wheel.jpg";
import galleryEngine from "@/assets/gallery-engine.jpg";
import carHyundai from "@/assets/Car-Hyindue.jpg";
import carBmw from "@/assets/Car-bmw.jpg";
import carFord from "@/assets/Car-ford.jpg";
import carGmc from "@/assets/Car-gmc.jpg";
import carLexus from "@/assets/Car-lexux.jpg";
import carRangeRover from "@/assets/Car-rangrover.jpg";
import carDefender from "@/assets/Car-rangroverDefinder.jpg";
import carRangeRoverSport from "@/assets/Car-rangroverr.jpg";
import carMercedes from "@/assets/Bus-Mersiddes.jpg";

export const GALLERY_EXTRA = [
  { src: galleryInterior, alt: "المقصورة الداخلية ولوحة القيادة" },
  { src: galleryRear, alt: "المنظر الخلفي للسيارة" },
  { src: galleryWheel, alt: "الجنوط والإطارات" },
  { src: galleryEngine, alt: "حجرة المحرك" },
];

export const CONTACT = {
  unifiedNumber: "733628944",
  whatsapp: "967733628944",
  email: "info@nagmalshareka.com",
  address: "تعز، الحوبان، جوار مصانع هائل سعيد",
  workHours: "الأحد - الخميس: 9:00 صباحًا - 9:00 مساءً",
  departments: [
    { name: "المبيعات", phone: "770055555", note: "الاستفسار عن السيارات والأسعار وطلبات الشراء" },
    { name: "خدمة العملاء", phone: "772222322", note: "متابعة الطلبات وتقديم الشكاوى" },
    { name: "الخدمات والصيانة", phone: "736223344", note: "الضمان ومواعيد الصيانة" },
    { name: "فرع الحوبان", phone: "736120120", note: "تعز، الحوبان، جوار مصانع هائل سعيد" },
    { name: "التواصل المباشر", phone: "733628944", note: "للاستفسارات العاجلة" },
  ],
  social: {
    tiktok: "https://www.tiktok.com/@nagmalshareka",
    instagram: "https://www.instagram.com/nagmalshareka",
    facebook: "https://www.facebook.com/nagmalshareka",
    x: "https://x.com/nagmalshareka",
    linkedin: "https://www.linkedin.com/company/nagm-alshareka",
  },
};


export const REGIONS = [
  "عدن",
  "صنعاء",
  "تعز",
  "إب",
  "حضرموت",
  "الحديدة",
  "مأرب",
  "شبوة",
  "ذمار",
  "أبين",
  "لحج",
  "عمران",
  "صعدة",
  "حجة",
  "البيضاء",
  "الجوف",
  "ريمة",
  "المهرة",
  "سقطرى",
];


export const BRANDS = [
  "تويوتا",
  "لكزس",
  "هيونداي",
  "كيا",
  "نيسان",
  "فورد",
  "شيفروليه",
  "جي إم سي",
  "مرسيدس",
  "بي إم دبليو",
  "أودي",
  "جيب",
  "مازدا",
  "جيلي",
  "إم جي",
  "هافال",
  "شيري",
  "بي واي دي",
  "لاند روفر",

  "هوندا",
  "ميتسوبيشي",
  "سوزوكي",
];

export type Car = {
  slug: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  category: "سيدان" | "دفع رباعي" | "كروس أوفر" | "بيك أب";
  price: number | null;
  monthly: number | null;
  image: string;
  badges: string[];
  basics: { gear: string; tire: string; fuel: string; seats: number };
  tech: {
    cylinders: string;
    engineSize: string;
    horsepower: string;
    torque: string;
    drive: string;
    engineType: string;
    turbo: string;
  };
  interior: string[];
  entertainment: string[];
  intro: string;
  info: { title: string; body: string }[];
};

const baseTech = {
  cylinders: "4 سلندر",
  engineSize: "2.5 لتر",
  horsepower: "203 حصان",
  torque: "250 نيوتن.متر",
  drive: "دفع أمامي",
  engineType: "بنزين",
  turbo: "بدون تيربو",
};

const interior = [
  "فرامل يد كهربائية",
  "مثبت سرعة",
  "عجلة قيادة جلد",
  "مقاعد كهربائية",
  "تكييف أوتوماتيكي",
  "بصمة تشغيل",
];

const entertainment = [
  "شاشة معلومات ملونة",
  "نظام ملاحي",
  "آبل كاربلاي",
  "أندرويد أوتو",
  "شاحن لاسلكي",
  "كاميرا خلفية",
];

export const CARS: Car[] = [
  {
    slug: "toyota-camry-2026",
    name: "تويوتا كامري 2026",
    brand: "تويوتا",
    model: "كامري",
    year: 2026,
    category: "سيدان",
    price: 119500,
    monthly: 1690,
    image: carSedan,
    badges: ["تجربة قيادة", "ضريبتك علينا"],
    basics: { gear: "أوتوماتيك", tire: "18 إنش", fuel: "16 كم/لتر", seats: 5 },
    tech: baseTech,
    interior,
    entertainment,
    intro: "سيدان عائلية فاخرة تجمع بين الاقتصاد في الوقود والراحة داخل المقصورة.",
    info: [
      {
        title: "التصميم الخارجي",
        body: "خطوط انسيابية حادة مع شبك أمامي عريض وإضاءة LED كاملة تمنح السيارة حضورًا لافتًا على الطريق.",
      },
      {
        title: "المقصورة الداخلية",
        body: "مقصورة واسعة بخامات ناعمة، عزل صوتي ممتاز، ومساحة أرجل مريحة لركاب المقاعد الخلفية.",
      },
      {
        title: "أداء المحرك",
        body: "محرك سعة 2.5 لتر بأداء متوازن واستهلاك اقتصادي مناسب لطرق المملكة الطويلة.",
      },
    ],
  },
  {
    slug: "lexus-lx-600-2026",
    name: "لكزس LX 600 2026",
    brand: "لكزس",
    model: "LX 600",
    year: 2026,
    category: "دفع رباعي",
    price: 489000,
    monthly: 6450,
    image: carSuv,
    badges: ["ضريبتك علينا"],
    basics: { gear: "أوتوماتيك", tire: "22 إنش", fuel: "9 كم/لتر", seats: 7 },
    tech: {
      cylinders: "6 سلندر",
      engineSize: "3.5 لتر",
      horsepower: "409 حصان",
      torque: "650 نيوتن.متر",
      drive: "دفع رباعي",
      engineType: "بنزين تيربو",
      turbo: "تيربو مزدوج",
    },
    interior,
    entertainment,
    intro: "قمة الفخامة والقدرة على الطرق الوعرة مع تجهيزات لا تضاهى.",
    info: [
      {
        title: "التصميم الخارجي",
        body: "هيكل ضخم بشبك مغزلي مميز وإضاءة ثلاثية العدسات تعكس هوية لكزس الفاخرة.",
      },
      {
        title: "المقصورة الداخلية",
        body: "جلد فاخر، شاشتان أماميتان، ونظام صوتي محيطي عالي الوضوح.",
      },
      {
        title: "أداء المحرك",
        body: "محرك V6 تيربو مزدوج بعزم هائل مع نظام دفع رباعي متقدم لكل التضاريس.",
      },
    ],
  },
  {
    slug: "kia-sportage-2026",
    name: "كيا سبورتاج 2026",
    brand: "كيا",
    model: "سبورتاج",
    year: 2026,
    category: "كروس أوفر",
    price: 96900,
    monthly: 1390,
    image: carSuv,
    badges: ["تجربة قيادة"],
    basics: { gear: "أوتوماتيك", tire: "17 إنش", fuel: "14 كم/لتر", seats: 5 },
    tech: baseTech,
    interior,
    entertainment,
    intro: "كروس أوفر عصري بتجهيزات غنية وسعر تنافسي يناسب العائلة السعودية.",
    info: [
      { title: "التصميم الخارجي", body: "لغة تصميم جريئة بإضاءة نهارية مميزة وخطوط رياضية." },
      { title: "المقصورة الداخلية", body: "شاشة عرض منحنية وتجهيزات رقمية متكاملة." },
      { title: "أداء المحرك", body: "محرك اقتصادي بأداء سلس داخل المدينة وعلى الطرق السريعة." },
    ],
  },
  {
    slug: "nissan-patrol-2026",
    name: "نيسان باترول 2026",
    brand: "نيسان",
    model: "باترول",
    year: 2026,
    category: "دفع رباعي",
    price: 285000,
    monthly: 3990,
    image: carSuv,
    badges: ["ضريبتك علينا", "تجربة قيادة"],
    basics: { gear: "أوتوماتيك", tire: "20 إنش", fuel: "10 كم/لتر", seats: 8 },
    tech: {
      ...baseTech,
      cylinders: "8 سلندر",
      engineSize: "5.6 لتر",
      horsepower: "400 حصان",
      torque: "560 نيوتن.متر",
      drive: "دفع رباعي",
    },
    interior,
    entertainment,
    intro: "أسطورة الصحراء بقوة محرك V8 وقدرات طرق وعرة استثنائية.",
    info: [
      { title: "التصميم الخارجي", body: "حضور مهيب بخطوط عريضة وشبك أمامي ضخم." },
      { title: "المقصورة الداخلية", body: "ثمانية مقاعد فاخرة مع ترفيه للمقاعد الخلفية." },
      { title: "أداء المحرك", body: "محرك V8 قوي مع نظام تعليق هيدروليكي متطور." },
    ],
  },
  {
    slug: "range-rover-sv-2026",
    name: "رنج روفر SV 2026",
    brand: "لاند روفر",
    model: "رنج روفر SV",
    year: 2026,
    category: "دفع رباعي",
    price: null,
    monthly: null,
    image: carSuv,
    badges: ["حصري"],
    basics: { gear: "أوتوماتيك", tire: "23 إنش", fuel: "8 كم/لتر", seats: 5 },
    tech: {
      ...baseTech,
      cylinders: "8 سلندر",
      engineSize: "4.4 لتر",
      horsepower: "530 حصان",
      torque: "750 نيوتن.متر",
      drive: "دفع رباعي",
      engineType: "بنزين تيربو",
      turbo: "تيربو مزدوج",
    },
    interior,
    entertainment,
    intro: "نسخة SV الحصرية | تُطلب حسب الطلب بمواصفات خاصة.",
    info: [
      { title: "التصميم الخارجي", body: "تفاصيل SV الحصرية وجنوط 23 إنش مصممة خصيصًا." },
      { title: "المقصورة الداخلية", body: "خامات سيراميك وجلد سيمي أنيلين بتفصيل يدوي." },
      { title: "أداء المحرك", body: "محرك V8 تيربو مزدوج بأداء فوري وسلاسة تامة." },
    ],
  },
  {
    slug: "hyundai-sonata-2026",
    name: "هيونداي سوناتا 2026",
    brand: "هيونداي",
    model: "سوناتا",
    year: 2026,
    category: "سيدان",
    price: 89900,
    monthly: 1290,
    image: carSedan,
    badges: ["ضريبتك علينا"],
    basics: { gear: "أوتوماتيك", tire: "17 إنش", fuel: "17 كم/لتر", seats: 5 },
    tech: baseTech,
    interior,
    entertainment,
    intro: "سيدان أنيقة باقتصادية عالية وتجهيزات سخية.",
    info: [
      { title: "التصميم الخارجي", body: "تصميم كوبيه منساب بإضاءة متصلة أمامية." },
      { title: "المقصورة الداخلية", body: "لوحة عدادات رقمية وشاشة وسائط كبيرة." },
      { title: "أداء المحرك", body: "أداء هادئ واستهلاك وقود منخفض جدًا." },
    ],
  },
  // ── هيونداي توسان ──────────────────────────────────────────────
  {
    slug: "hyundai-tucson-2026",
    name: "هيونداي توسان 2026",
    brand: "هيونداي",
    model: "توسان",
    year: 2026,
    category: "كروس أوفر",
    price: 95000,
    monthly: 1350,
    image: carHyundai,
    badges: ["تجربة قيادة"],
    basics: { gear: "أوتوماتيك", tire: "17 إنش", fuel: "15 كم/لتر", seats: 5 },
    tech: baseTech,
    interior, entertainment,
    intro: "كروس أوفر عصري بتصميم جريء ومساحة داخلية وفيرة.",
    info: [
      { title: "التصميم الخارجي", body: "شبك أمامي بتصميم مستطيل وإضاءة LED مدمجة." },
      { title: "المقصورة الداخلية", body: "شاشة معلومات وشاشة تحكم مدمجتان." },
      { title: "أداء المحرك", body: "محرك 1.6 تيربو بأداء سلس واستهلاك منخفض." },
    ],
  },
  // ── بي إم دبليو X5 ──────────────────────────────────────────────
  {
    slug: "bmw-x5-2026",
    name: "بي إم دبليو X5 2026",
    brand: "بي إم دبليو",
    model: "X5",
    year: 2026,
    category: "دفع رباعي",
    price: 310000,
    monthly: 4300,
    image: carBmw,
    badges: ["حصري"],
    basics: { gear: "أوتوماتيك", tire: "21 إنش", fuel: "11 كم/لتر", seats: 5 },
    tech: { ...baseTech, cylinders: "6 سلندر", engineSize: "3.0 لتر", horsepower: "340 حصان", torque: "450 نيوتن.متر", drive: "دفع رباعي", engineType: "بنزين تيربو", turbo: "تيربو مزدوج" },
    interior, entertainment,
    intro: "رياضية فاخرة بأداء استثنائي وتجهيزات متقدمة.",
    info: [
      { title: "التصميم الخارجي", body: "خطوط رياضية بشبك كلوي مزدوج وجنوط توربين." },
      { title: "المقصورة الداخلية", body: "شاشتان متصلتان ونظام صوتي Harman Kardon." },
      { title: "أداء المحرك", body: "محرك خطي 6 تيربو مزدوج بمرونة قيادية فائقة." },
    ],
  },
  // ── فورد اكسبلورر ──────────────────────────────────────────────
  {
    slug: "ford-explorer-2026",
    name: "فورد اكسبلورر 2026",
    brand: "فورد",
    model: "اكسبلورر",
    year: 2026,
    category: "دفع رباعي",
    price: 185000,
    monthly: 2600,
    image: carFord,
    badges: ["تجربة قيادة"],
    basics: { gear: "أوتوماتيك", tire: "18 إنش", fuel: "12 كم/لتر", seats: 7 },
    tech: { ...baseTech, cylinders: "4 سلندر", engineSize: "2.3 لتر", horsepower: "300 حصان", torque: "420 نيوتن.متر", drive: "دفع رباعي", engineType: "بنزين تيربو", turbo: "تيربو" },
    interior, entertainment,
    intro: "دفع رباعي عائلي بمساحة 7 مقاعد وأداء قوي.",
    info: [
      { title: "التصميم الخارجي", body: "شبك أمامي جديد وخطوط LED حادة." },
      { title: "المقصورة الداخلية", body: "شاشة رأسية لمسية 13.2 إنش وتحكم داخلي." },
      { title: "أداء المحرك", body: "محرك EcoBoost بتوربين وكفاءة عالية." },
    ],
  },
  // ── جي إم سي يوكون ──────────────────────────────────────────────
  {
    slug: "gmc-yukon-2026",
    name: "جي إم سي يوكون 2026",
    brand: "جي إم سي",
    model: "يوكون",
    year: 2026,
    category: "دفع رباعي",
    price: 265000,
    monthly: 3700,
    image: carGmc,
    badges: ["ضريبتك علينا"],
    basics: { gear: "أوتوماتيك", tire: "22 إنش", fuel: "10 كم/لتر", seats: 8 },
    tech: { ...baseTech, cylinders: "8 سلندر", engineSize: "5.3 لتر", horsepower: "355 حصان", torque: "519 نيوتن.متر", drive: "دفع رباعي", engineType: "بنزين", turbo: "بدون تيربو" },
    interior, entertainment,
    intro: "ضخم وفاخر بثمانية مقاعد ومحرك V8 قوي.",
    info: [
      { title: "التصميم الخارجي", body: "خطوط ضخمة بشبك مجسم GMC." },
      { title: "المقصورة الداخلية", body: "ثلاثة صفوف بمقاعد جلدية فاخرة." },
      { title: "أداء المحرك", body: "محرك V8 بقدرة سحب تصل إلى 4 طن." },
    ],
  },
  // ── لكزس ES 350 ──────────────────────────────────────────────
  {
    slug: "lexus-es-350-2026",
    name: "لكزس ES 350 2026",
    brand: "لكزس",
    model: "ES 350",
    year: 2026,
    category: "سيدان",
    price: 189000,
    monthly: 2650,
    image: carLexus,
    badges: ["ضريبتك علينا"],
    basics: { gear: "أوتوماتيك", tire: "18 إنش", fuel: "13 كم/لتر", seats: 5 },
    tech: { ...baseTech, cylinders: "6 سلندر", engineSize: "3.5 لتر", horsepower: "302 حصان", torque: "380 نيوتن.متر", drive: "دفع أمامي", engineType: "بنزين", turbo: "بدون تيربو" },
    interior, entertainment,
    intro: "سيدان فاخرة بمقصورة هادئة وتجهيزات فخمة لا مثيل.",
    info: [
      { title: "التصميم الخارجي", body: "شبك ساعة لكزس المميزة." },
      { title: "المقصورة الداخلية", body: "جلد سيمي أنيلين وخشب حقيقي بتفصيل فاخر." },
      { title: "أداء المحرك", body: "محرك V6 سلس بعزل صوتي ممتاز." },
    ],
  },
  // ── رنج روفر HSE ──────────────────────────────────────────────
  {
    slug: "range-rover-hse-2026",
    name: "رنج روفر HSE 2026",
    brand: "لاند روفر",
    model: "رنج روفر HSE",
    year: 2026,
    category: "دفع رباعي",
    price: 560000,
    monthly: 7800,
    image: carRangeRover,
    badges: ["حصري"],
    basics: { gear: "أوتوماتيك", tire: "22 إنش", fuel: "9 كم/لتر", seats: 5 },
    tech: { ...baseTech, cylinders: "6 سلندر", engineSize: "3.0 لتر", horsepower: "395 حصان", torque: "550 نيوتن.متر", drive: "دفع رباعي", engineType: "بنزين تيربو", turbo: "تيربو خطي" },
    interior, entertainment,
    intro: "فخامة بريطانية بمحرك هجين قوي ودفع رباعي متكامل.",
    info: [
      { title: "التصميم الخارجي", body: "تصميم أنيق بطابور ضيق وجنوط 22 إنش." },
      { title: "المقصورة الداخلية", body: "جلد وخشب فاخر بإضاءة محيطة." },
      { title: "أداء المحرك", body: "هجين مع كهرباء لاسلكي وكفاءة عالية." },
    ],
  },
  // ── ديفندر 110 ──────────────────────────────────────────────
  {
    slug: "defender-110-2026",
    name: "ديفندر 110 2026",
    brand: "لاند روفر",
    model: "ديفندر 110",
    year: 2026,
    category: "دفع رباعي",
    price: 285000,
    monthly: 3950,
    image: carDefender,
    badges: ["تجربة قيادة"],
    basics: { gear: "أوتوماتيك", tire: "20 إنش", fuel: "11 كم/لتر", seats: 5 },
    tech: { ...baseTech, cylinders: "4 سلندر", engineSize: "2.0 لتر", horsepower: "296 حصان", torque: "400 نيوتن.متر", drive: "دفع رباعي", engineType: "بنزين تيربو", turbo: "تيربو" },
    interior, entertainment,
    intro: "بطل الطرق الوعرة بتصميم عصري وتجهيزات تكنولوجية متقدمة.",
    info: [
      { title: "التصميم الخارجي", body: "خطوط مربعة صلبة بنوافذ مستديرة مميزة." },
      { title: "المقصورة الداخلية", body: "لمسة صناعية مع تقنية Pivi Pro للتحكم." },
      { title: "أداء المحرك", body: "قدرات طرق وعرة فائقة مع إدارة خفض العتاد." },
    ],
  },
  // ── رنج روفر سبورت ──────────────────────────────────────────────
  {
    slug: "range-rover-sport-2026",
    name: "رنج روفر سبورت 2026",
    brand: "لاند روفر",
    model: "رنج روفر سبورت",
    year: 2026,
    category: "دفع رباعي",
    price: 395000,
    monthly: 5500,
    image: carRangeRoverSport,
    badges: ["حصري", "ضريبتك علينا"],
    basics: { gear: "أوتوماتيك", tire: "22 إنش", fuel: "10 كم/لتر", seats: 5 },
    tech: { ...baseTech, cylinders: "6 سلندر", engineSize: "3.0 لتر", horsepower: "395 حصان", torque: "550 نيوتن.متر", drive: "دفع رباعي", engineType: "بنزين تيربو", turbo: "تيربو خطي" },
    interior, entertainment,
    intro: "رياضي فاخر يجمع قدرات طرق وعرة بتجهيزات فاخرة.",
    info: [
      { title: "التصميم الخارجي", body: "خطوط رياضية بشبك منخفض وهيكل صلب." },
      { title: "المقصورة الداخلية", body: "شاشتان OLED عموديتان بتصميم مستقبلي." },
      { title: "أداء المحرك", body: "فيلق مع أداء Dynamic Mode للطرق السريعة." },
    ],
  },
  // ── مرسيدس سبرينتر ──────────────────────────────────────────────
  {
    slug: "mercedes-sprinter-2026",
    name: "مرسيدس سبرينتر 2026",
    brand: "مرسيدس",
    model: "سبرينتر",
    year: 2026,
    category: "دفع رباعي",
    price: null,
    monthly: null,
    image: carMercedes,
    badges: ["حصري"],
    basics: { gear: "أوتوماتيك", tire: "16 إنش", fuel: "12 كم/لتر", seats: 16 },
    tech: { ...baseTech, cylinders: "4 سلندر", engineSize: "2.1 لتر", horsepower: "190 حصان", torque: "440 نيوتن.متر", drive: "دفع خلفي", engineType: "ديزل", turbo: "تيربو" },
    interior, entertainment,
    intro: "حافلة تجارية فاخرة بطاقة 16 راكبًا وأعلى معايير السلامة.",
    info: [
      { title: "التصميم الخارجي", body: "هيكل Mercedes المميز بمداخل طويلة ووداد." },
      { title: "مقصورة الركاب", body: "مقاعد فاخرة بسقف عالٍ وتكييف متطور." },
      { title: "أداء المحرك", body: "محرك ديزل موفور بكفاءة استهلاك عالية." },
    ],
  },
  // ── شيفروليه سوبربان ──────────────────────────────────────────────
  {
    slug: "chevrolet-suburban-2026",
    name: "شيفروليه سوبربان 2026",
    brand: "شيفروليه",
    model: "سوبربان",
    year: 2026,
    category: "دفع رباعي",
    price: 235000,
    monthly: 3290,
    image: carSuv,
    badges: ["تجربة قيادة"],
    basics: { gear: "أوتوماتيك", tire: "20 إنش", fuel: "11 كم/لتر", seats: 8 },
    tech: { ...baseTech, cylinders: "8 سلندر", engineSize: "5.3 لتر", horsepower: "355 حصان", torque: "519 نيوتن.متر", drive: "دفع رباعي", engineType: "بنزين", turbo: "بدون تيربو" },
    interior, entertainment,
    intro: "ضخم أمريكي بثمانية مقاعد وV8 تقليدي.",
    info: [
      { title: "التصميم الخارجي", body: "خطوط عريضة بشبك جربوني Chevy." },
      { title: "المقصورة الداخلية", body: "ثلاثة صفوف بمقاعد تحتاط سهلة." },
      { title: "أداء المحرك", body: "تقنية رفع وخفض السيلندر لتوفير الوقود." },
    ],
  },
  // ── أودي Q7 ──────────────────────────────────────────────
  {
    slug: "audi-q7-2026",
    name: "أودي Q7 2026",
    brand: "أودي",
    model: "Q7",
    year: 2026,
    category: "دفع رباعي",
    price: 340000,
    monthly: 4750,
    image: carSuv,
    badges: ["حصري"],
    basics: { gear: "أوتوماتيك", tire: "21 إنش", fuel: "12 كم/لتر", seats: 7 },
    tech: { ...baseTech, cylinders: "6 سلندر", engineSize: "3.0 لتر", horsepower: "340 حصان", torque: "500 نيوتن.متر", drive: "دفع رباعي", engineType: "بنزين تيربو", turbo: "تيربو" },
    interior, entertainment,
    intro: "فاخرة ألمانية بسبعة مقاعد ومنظومة Quattro الشهيرة.",
    info: [
      { title: "التصميم الخارجي", body: "شبك بيضاوي octagon وخطوط أنيقة." },
      { title: "المقصورة الداخلية", body: "شاشة وسائط 10.1 إنش ولوحة تحكم 8.6 إنش." },
      { title: "أداء المحرك", body: "محرك Quattro توزيع ديناميكي للقدرة." },
    ],
  },
  // ── جيب جراند شيروكي ──────────────────────────────────────────────
  {
    slug: "jeep-grand-cherokee-2026",
    name: "جيب جراند شيروكي 2026",
    brand: "جيب",
    model: "جراند شيروكي",
    year: 2026,
    category: "دفع رباعي",
    price: 195000,
    monthly: 2750,
    image: carSuv,
    badges: ["تجربة قيادة"],
    basics: { gear: "أوتوماتيك", tire: "20 إنش", fuel: "12 كم/لتر", seats: 5 },
    tech: { ...baseTech, cylinders: "6 سلندر", engineSize: "3.6 لتر", horsepower: "293 حصان", torque: "353 نيوتن.متر", drive: "دفع رباعي", engineType: "بنزين", turbo: "بدون تيربو" },
    interior, entertainment,
    intro: "رمز الطرق الوعرة بقدرات Trail Rated فائقة.",
    info: [
      { title: "التصميم الخارجي", body: "هيكل قوي بخطوط متقنة." },
      { title: "المقصورة الداخلية", body: "فاخرة بخامات جلد وخشب." },
      { title: "أداء المحرك", body: "محرك Pentastar V6 بأداء ثابت." },
    ],
  },
  // ── مازدا CX-5 ──────────────────────────────────────────────
  {
    slug: "mazda-cx5-2026",
    name: "مازدا CX-5 2026",
    brand: "مازدا",
    model: "CX-5",
    year: 2026,
    category: "كروس أوفر",
    price: 115000,
    monthly: 1600,
    image: carSuv,
    badges: ["تجربة قيادة"],
    basics: { gear: "أوتوماتيك", tire: "19 إنش", fuel: "15 كم/لتر", seats: 5 },
    tech: baseTech,
    interior, entertainment,
    intro: "تصميم KODO يجمع بين الأناقة والمتعة بالقيادة.",
    info: [
      { title: "التصميم الخارجي", body: "جماليات يابانية بخطوط انسيابية." },
      { title: "المقصورة الداخلية", body: "خامات فاخرة ونظام BOSE للصوت." },
      { title: "أداء المحرك", body: "تقنية Skyactiv بكفاءة وقود فائقة." },
    ],
  },
  // ── جيلي كولراي ──────────────────────────────────────────────
  {
    slug: "geely-coolray-2026",
    name: "جيلي كولراي 2026",
    brand: "جيلي",
    model: "كولراي",
    year: 2026,
    category: "كروس أوفر",
    price: 68000,
    monthly: 980,
    image: carSuv,
    badges: ["تجربة قيادة"],
    basics: { gear: "أوتوماتيك", tire: "17 إنش", fuel: "16 كم/لتر", seats: 5 },
    tech: baseTech,
    interior, entertainment,
    intro: "كروس أوفر اقتصادي بتقنية صينية متطورة وتجهيزات عصرية.",
    info: [
      { title: "التصميم الخارجي", body: "مصابيح LED دائرية وشبك أمامي عصري." },
      { title: "المقصورة الداخلية", body: "شاشة لمسية 10.25 إنش وكاميرا 360." },
      { title: "أداء المحرك", body: "تيربو 1.5 لتر بأداء سلس." },
    ],
  },
  // ── إم جي RX5 ──────────────────────────────────────────────
  {
    slug: "mg-rx5-2026",
    name: "إم جي RX5 2026",
    brand: "إم جي",
    model: "RX5",
    year: 2026,
    category: "كروس أوفر",
    price: 75000,
    monthly: 1080,
    image: carSuv,
    badges: ["تجربة قيادة"],
    basics: { gear: "أوتوماتيك", tire: "18 إنش", fuel: "15 كم/لتر", seats: 5 },
    tech: baseTech,
    interior, entertainment,
    intro: "كروس أوفر بسعر منافس وتجهيزات تتجاوز فئته السعرية.",
    info: [
      { title: "التصميم الخارجي", body: "تصميم إنجليزي بصباغة عصرية." },
      { title: "المقصورة الداخلية", body: "شاشة 15.6 إنش عمودية وAndroid Auto." },
      { title: "أداء المحرك", body: "محرك 1.5 تيربو بكفاءة عالية." },
    ],
  },
  // ── هافال H6 ──────────────────────────────────────────────
  {
    slug: "haval-h6-2026",
    name: "هافال H6 2026",
    brand: "هافال",
    model: "H6",
    year: 2026,
    category: "كروس أوفر",
    price: 82000,
    monthly: 1190,
    image: carSuv,
    badges: ["تجربة قيادة"],
    basics: { gear: "أوتوماتيك", tire: "18 إنش", fuel: "14 كم/لتر", seats: 5 },
    tech: baseTech,
    interior, entertainment,
    intro: "الأكثر مبيعًا عالميًا في فئة الكروس أوفر من هافال.",
    info: [
      { title: "التصميم الخارجي", body: "خطوط متوازنة بإضاءة LED متصلة." },
      { title: "المقصورة الداخلية", body: "شاشة 12.3 إنش مع HUD وصوت MERIDIAN." },
      { title: "أداء المحرك", body: "هجين بتقنية DHT لتوفير الوقود." },
    ],
  },
  // ── شيري تيغو 8 برو ──────────────────────────────────────────────
  {
    slug: "chery-tiggo8-pro-2026",
    name: "شيري تيغو 8 برو 2026",
    brand: "شيري",
    model: "تيغو 8 برو",
    year: 2026,
    category: "دفع رباعي",
    price: 89000,
    monthly: 1290,
    image: carSuv,
    badges: ["تجربة قيادة"],
    basics: { gear: "أوتوماتيك", tire: "18 إنش", fuel: "13 كم/لتر", seats: 7 },
    tech: baseTech,
    interior, entertainment,
    intro: "دفع رباعي 7 مقاعد بسعر منافس وتجهيزات سخية.",
    info: [
      { title: "التصميم الخارجي", body: "خطوط LED متصلة وهيكل ضخم." },
      { title: "المقصورة الداخلية", body: "شاشة 10.25 إنش وبانوراما زجاجي." },
      { title: "أداء المحرك", body: "تيربو 1.6 بأداء سلس ووفير." },
    ],
  },
  // ── بي واي دي سيل ──────────────────────────────────────────────
  {
    slug: "byd-seal-2026",
    name: "بي واي دي سيل 2026",
    brand: "بي واي دي",
    model: "سيل",
    year: 2026,
    category: "سيدان",
    price: 130000,
    monthly: 1850,
    image: carSedan,
    badges: ["كهربائي"],
    basics: { gear: "أوتوماتيك", tire: "18 إنش", fuel: "كهربائي 100%", seats: 5 },
    tech: { ...baseTech, cylinders: "كهربائي", engineSize: "-", horsepower: "313 حصان", torque: "360 نيوتن.متر", drive: "دفع خلفي", engineType: "كهربائي", turbo: "-" },
    interior, entertainment,
    intro: "سيدان كهربائي بتقنية Blade Battery وأداء فائق.",
    info: [
      { title: "التصميم الخارجي", body: "تصميم كوبيه منساب بخطوط حادة." },
      { title: "المقصورة الداخلية", body: "شاشة دوارة 15.6 إنش." },
      { title: "الطاقة والشحن", body: "بطارية 82.5 kWh وشحن سريع 150 kW." },
    ],
  },
  // ── هوندا أكورد ──────────────────────────────────────────────
  {
    slug: "honda-accord-2026",
    name: "هوندا أكورد 2026",
    brand: "هوندا",
    model: "أكورد",
    year: 2026,
    category: "سيدان",
    price: 109000,
    monthly: 1540,
    image: carSedan,
    badges: ["تجربة قيادة"],
    basics: { gear: "أوتوماتيك", tire: "17 إنش", fuel: "15 كم/لتر", seats: 5 },
    tech: { ...baseTech, cylinders: "4 سلندر", engineSize: "1.5 لتر", horsepower: "192 حصان", torque: "260 نيوتن.متر", drive: "دفع أمامي", engineType: "بنزين تيربو", turbo: "تيربو" },
    interior, entertainment,
    intro: "سيدان محورية بأداء هجين وتجهيزات سخية.",
    info: [
      { title: "التصميم الخارجي", body: "لغة تصميم عصرية بمصابيح متصلة." },
      { title: "المقصورة الداخلية", body: "شاشة Google 12.3 إنش مع Honda Sensing." },
      { title: "أداء المحرك", body: "هجين بكفاءة عالية ورشاقة فائقة." },
    ],
  },
  // ── ميتسوبيشي إكليبس كروس ──────────────────────────────────────────────
  {
    slug: "mitsubishi-eclipse-cross-2026",
    name: "ميتسوبيشي إكليبس كروس 2026",
    brand: "ميتسوبيشي",
    model: "إكليبس كروس",
    year: 2026,
    category: "كروس أوفر",
    price: 98000,
    monthly: 1390,
    image: carSuv,
    badges: ["تجربة قيادة"],
    basics: { gear: "أوتوماتيك", tire: "18 إنش", fuel: "14 كم/لتر", seats: 5 },
    tech: baseTech,
    interior, entertainment,
    intro: "كروس أوفر عصري بخطوط رياضية ونظام S-AWC للتحكم.",
    info: [
      { title: "التصميم الخارجي", body: "تصميم كوبيه بذيل منخفض." },
      { title: "المقصورة الداخلية", body: "شاشتان ونظام صوت Bose." },
      { title: "أداء المحرك", body: "محرك 1.5 تيربو S-AWC لجميع الطرق." },
    ],
  },
  // ── سوزوكي فيتارا ──────────────────────────────────────────────
  {
    slug: "suzuki-vitara-2026",
    name: "سوزوكي فيتارا 2026",
    brand: "سوزوكي",
    model: "فيتارا",
    year: 2026,
    category: "كروس أوفر",
    price: 72000,
    monthly: 1040,
    image: carSuv,
    badges: ["تجربة قيادة"],
    basics: { gear: "أوتوماتيك", tire: "17 إنش", fuel: "18 كم/لتر", seats: 5 },
    tech: baseTech,
    interior, entertainment,
    intro: "كروس أوفر صغير اقتصادي مع هجين وكفاءة استثنائية.",
    info: [
      { title: "التصميم الخارجي", body: "حجم مدني بخطوط مميزة." },
      { title: "المقصورة الداخلية", body: "شاشة 9 إنش مع Apple CarPlay." },
      { title: "أداء المحرك", body: "هجين 1.5 لتر باستهلاك ممتاز." },
    ],
  },
];


export type Offer = {
  slug: string;
  title: string;
  subtitle: string;
  terms: string[];
  image: string;
  seasonal?: boolean;
};

export const OFFERS: Offer[] = [
  {
    slug: "sportage-one-riyal",
    title: "كيا سبورتاج بريال واحد دفعة أولى",
    subtitle: "امتلك سبورتاج 2026 بدفعة أولى رمزية وقسط شهري يبدأ من 1,390 ريال",
    terms: [
      "العرض ساري حتى نفاد الكمية",
      "يخضع لموافقة جهة التمويل",
      "الأسعار شاملة ضريبة القيمة المضافة",
    ],
    image: carSuv,
  },
  {
    slug: "tax-on-us",
    title: "ضريبتك علينا",
    subtitle: "نتحمل عنك ضريبة القيمة المضافة على مجموعة مختارة من السيارات",
    terms: ["يشمل السيارات المحددة بشارة ضريبتك علينا", "لا يجمع مع عروض أخرى"],
    image: carSedan,
  },
  {
    slug: "range-rover-hse",
    title: "رنج روفر HSE | خطة سداد مرنة",
    subtitle: "خطط تمويل تصل إلى 60 شهرًا بدون دفعة أولى",
    terms: ["يخضع لشروط البنك", "الحد الأدنى للراتب 12,000 ريال"],
    image: carSuv,
  },
];

export const PROMOTIONAL_OFFERS: Offer[] = [
  {
    slug: "national-day-2026",
    title: "عروض اليوم الوطني",
    subtitle: "خصومات موسمية على مجموعة مختارة خلال شهر سبتمبر",
    terms: ["العرض موسمي ولفترة محدودة"],
    image: carSedan,
    seasonal: true,
  },
];

export const SERVICES = [
  {
    title: "الضمان الممتد",
    icon: "shield",
    items: [
      "المكينة",
      "القير",
      "الدفرنس",
      "كمبروسر المكيف",
      "ثلاجة المحرك",
      "علبة الفرامل",
      "علبة الدركسون",
    ],
  },
  {
    title: "العناية بالسيارة",
    icon: "sparkles",
    items: [
      "أفلام العزل الحراري الأمريكي",
      "نانو سيراميك داخلي وخارجي",
      "تلميع داخلي وخارجي",
      "أفلام الحماية",
      "تنجيد المقاعد",
      "خصم 40٪ لعملائنا",
    ],
  },
  {
    title: "المساعدة على الطريق",
    icon: "life-buoy",
    items: [
      "الأعطال الميكانيكية",
      "تزويد الوقود",
      "استبدال الإطارات",
      "شحن البطارية",
      "فتح السيارة عند نسيان المفتاح بالداخل",
      "تغطية جميع مدن المملكة",
    ],
  },
  {
    title: "التظليل المجاني",
    icon: "sun",
    items: ["عازل حراري مجاني للزجاج الجانبي والخلفي", "ضمان 10 سنوات على العزل"],
  },
  {
    title: "التوصيل",
    icon: "truck",
    items: ["توصيل السيارة إلى مدينة العميل داخل المملكة"],
  },
];

export const FAQS: { category: string; items: { q: string; a: string }[] }[] = [
  {
    category: "أسئلة الشراء والتمويل",
    items: [
      {
        q: "كيف أقدّم طلب شراء؟",
        a: "اختر السيارة من صفحة السيارات ثم اضغط «طلب شراء» وعبّئ النموذج، وسيتواصل معك فريق المبيعات لإتمام الإجراءات.",
      },
      {
        q: "هل يمكنني الشراء كاش؟",
        a: "نعم، اختر «كاش» في حقل طريقة الدفع داخل نموذج طلب الشراء.",
      },
      {
        q: "هل التمويل عبر بنوك معتمدة؟",
        a: "نعم، نتعامل مع بنوك وشركات تمويل معتمدة ونساعدك في اختيار أفضل عرض تمويلي.",
      },
    ],
  },
  {
    category: "أسئلة الخدمات",
    items: [
      { q: "ما مدة الضمان الممتد؟", a: "تختلف حسب الموديل والفئة، ويوضحها مندوب المبيعات عند الشراء." },
      { q: "هل التظليل مجاني؟", a: "نعم، عازل حراري مجاني للزجاج الجانبي والخلفي بضمان 10 سنوات." },
    ],
  },
  {
    category: "أسئلة الشكاوى",
    items: [{ q: "كم مدة الرد على الشكاوى؟", a: "يتم الرد على الشكاوى خلال 24 ساعة عمل." }],
  },
];

export const POSTS = [
  {
    slug: "afdal-sayarat-aailia-2026",
    title: "أفضل السيارات العائلية في السعودية 2026",
    excerpt: "مقارنة عملية بين أبرز الخيارات العائلية من حيث المساحة والاستهلاك والسعر.",
    date: "2026-07-28",
    image: carSuv,
    body: "تتنوع خيارات السيارات العائلية في السوق السعودي بين الكروس أوفر والدفع الرباعي وسيارات السيدان الكبيرة. عند الاختيار ركّز على ثلاثة عوامل أساسية: مساحة المقصورة وعدد المقاعد، معدل استهلاك الوقود على الطرق الطويلة، وتكلفة الصيانة الدورية وتوفر قطع الغيار. ننصح كذلك بتجربة القيادة قبل الشراء والاطلاع على تفاصيل الضمان الممتد.",
  },
  {
    slug: "tamweel-sayara-dalil",
    title: "دليلك لتمويل السيارة: الشروط والمستندات",
    excerpt: "كل ما تحتاج معرفته قبل التقديم على تمويل سيارة من بنك أو شركة تمويل.",
    date: "2026-07-10",
    image: carSedan,
    body: "قبل التقديم على تمويل سيارة، تأكد من استقرار الدخل الشهري ونسبة الاستقطاع الحالية، وجهّز الهوية الوطنية وتعريف الراتب وكشف الحساب لآخر ثلاثة أشهر. قارن بين نسب الربح ومدة السداد وقيمة الدفعة الأخيرة، واسأل عن رسوم السداد المبكر. فريقنا يساعدك في المقارنة بين عروض الجهات المعتمدة.",
  },
  {
    slug: "sianat-alsayara-fi-alsaif",
    title: "صيانة سيارتك في صيف المملكة",
    excerpt: "نصائح عملية لحماية سيارتك من الحرارة العالية.",
    date: "2026-06-15",
    image: carSedan,
    body: "الحرارة المرتفعة تؤثر على البطارية والإطارات وسائل التبريد. افحص مستوى الماء والمبرد أسبوعيًا، وتأكد من ضغط الإطارات صباحًا، وتجنب ركن السيارة تحت الشمس لفترات طويلة. العزل الحراري للزجاج يقلل حرارة المقصورة بشكل ملحوظ ويحمي الفرش الداخلي.",
  },
];

/** الاسم اللاتيني لكل ماركة لعرضه في شريط العلامات التجارية */
export const BRAND_WORDMARKS: Record<string, string> = {
  "تويوتا": "TOYOTA",
  "لكزس": "LEXUS",
  "نيسان": "NISSAN",
  "هوندا": "HONDA",
  "كيا": "KIA",
  "هيونداي": "HYUNDAI",
  "شيفروليه": "CHEVROLET",
  "فورد": "FORD",
  "جي إم سي": "GMC",
  "مرسيدس": "MERCEDES",
  "بي إم دبليو": "BMW",
  "أودي": "AUDI",
  "لاند روفر": "LAND ROVER",
  "جيب": "JEEP",
  "مازدا": "MAZDA",
  "جيلي": "GEELY",
  "إم جي": "MG",
};

export const BRAND_ICONS: Record<string, string> = {
  "تويوتا": "toyota",
  "لكزس": "lexus",
  "هيونداي": "hyundai",
  "كيا": "kia",
  "نيسان": "nissan",
  "فورد": "ford",
  "شيفروليه": "chevrolet",
  "جي إم سي": "gmc",
  "مرسيدس": "mercedes",
  "بي إم دبليو": "bmw",
  "أودي": "audi",
  "جيب": "jeep",
  "مازدا": "mazda",
  "إم جي": "mg",
  "شيري": "chery",
  "بي واي دي": "byd",
  "لاند روفر": "landrover",

  "هوندا": "honda",
  "ميتسوبيشي": "mitsubishi",
  "سوزوكي": "suzuki",
  "بورشه": "porsche",
  "دودج": "dodge",
  "رام": "ram",
  "إنفينيتي": "infiniti",
  "سوبارو": "subaru",
  "جيلي": "geely",
};

/** مسارات شعارات الماركات المحلية المستخرجة من نجم الشارقة للسيارات */
export const BRAND_LOCAL_LOGOS: Record<string, string> = {
  "تويوتا": "/brands/toyota.webp",
  "لكزس": "/brands/lexus.png",
  "هيونداي": "/brands/hyundai.webp",
  "كيا": "/brands/kia.webp",
  "نيسان": "/brands/nissan.webp",
  "فورد": "/brands/ford.webp",
  "شيفروليه": "/brands/chevrolet.webp",
  "جي إم سي": "/brands/gmc.webp",
  "جيب": "/brands/jeep.webp",
  "دودج": "/brands/dodge.webp",
  "رام": "/brands/ram.webp",
  "بي إم دبليو": "/brands/bmw.webp",
  "مرسيدس": "/brands/mercedes.webp",
  "أودي": "/brands/audi.webp",
  "لاند روفر": "/brands/landrover.webp",
  "إم جي": "/brands/mg.webp",
  "جيلي": "/brands/geely.webp",
  "هافال": "/brands/haval.webp",
  "شيري": "/brands/chery.webp",
  "بي واي دي": "/brands/byd.webp",
  "لوسيد": "/brands/lucid.webp",
  "جاك": "/brands/jac.webp",
  "إنفينيتي": "/brands/infiniti.webp",
  "مازدا": "/brands/mazda.webp",
  "ميتسوبيشي": "/brands/mitsubishi.webp",
  "سوبارو": "/brands/subaru.webp",
};

