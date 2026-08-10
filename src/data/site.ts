import carSedan from "@/assets/car-sedan.jpg";
import carSuv from "@/assets/car-suv.jpg";
import galleryInterior from "@/assets/gallery-interior.jpg";
import galleryRear from "@/assets/gallery-rear.jpg";
import galleryWheel from "@/assets/gallery-wheel.jpg";
import galleryEngine from "@/assets/gallery-engine.jpg";

export const GALLERY_EXTRA = [
  { src: galleryInterior, alt: "المقصورة الداخلية ولوحة القيادة" },
  { src: galleryRear, alt: "المنظر الخلفي للسيارة" },
  { src: galleryWheel, alt: "الجنوط والإطارات" },
  { src: galleryEngine, alt: "حجرة المحرك" },
];

export const CONTACT = {
  unifiedNumber: "920006652",
  whatsapp: "966920006652",
  email: "info@adelcars.sa",
  address: "المملكة العربية السعودية — الرياض، طريق الملك عبدالعزيز",
  workHours: "السبت - الخميس: 9:00 صباحًا - 9:00 مساءً",
  departments: [
    { name: "المبيعات", phone: "920006652", note: "الاستفسار عن السيارات والأسعار وطلبات الشراء" },
    { name: "خدمة العملاء والشكاوى", phone: "920006653", note: "متابعة الطلبات وتقديم الشكاوى" },
    { name: "الضمان والصيانة", phone: "920006654", note: "الضمان الممتد ومواعيد الصيانة" },
    { name: "فرع الرياض", phone: "0112345678", note: "طريق الملك عبدالعزيز — الرياض" },
  ],
  social: {
    tiktok: "https://www.tiktok.com/@adel.cars",
    instagram: "https://www.instagram.com/adel.cars",
    facebook: "https://www.facebook.com/adelcars",
    x: "https://x.com/adelcars",
    linkedin: "https://www.linkedin.com/company/adel-cars",
  },
};


export const REGIONS = [
  "الرياض",
  "مكة المكرمة",
  "المدينة المنورة",
  "المنطقة الشرقية",
  "القصيم",
  "عسير",
  "تبوك",
  "حائل",
  "جازان",
  "نجران",
  "الباحة",
  "الجوف",
  "الحدود الشمالية",
];

export const BRANDS = [
  "تويوتا",
  "لكزس",
  "نيسان",
  "هوندا",
  "كيا",
  "هيونداي",
  "شيفروليه",
  "فورد",
  "جي إم سي",
  "مرسيدس",
  "بي إم دبليو",
  "أودي",
  "لاند روفر",
  "جيب",
  "مازda".replace("da", "دا"),
  "شانجان",
  "جيلي",
  "إم جي",
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
    intro: "نسخة SV الحصرية — تُطلب حسب الطلب بمواصفات خاصة.",
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
    title: "رنج روفر HSE — خطة سداد مرنة",
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
  "شانجان": "CHANGAN",
  "جيلي": "GEELY",
  "إم جي": "MG",
};
