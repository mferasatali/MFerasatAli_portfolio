import type { ArticleOverrides } from "./types";

export const ARTICLE_OVERRIDES: ArticleOverrides = {
  "succession-planning-enterprise-hcm": {
    ar: {
      title: "بناء تخطيط التعاقب لـ HCM المؤسسي",
      excerpt: "كيف شحنّا تحديد الأدوار الحرجة ومطابقة الخلفاء بالذكاء الاصطناعي وخريطة 9-box وموافقات متعددة المستويات داخل Takafo+ لمبادلة.",
      blocks: [
        { type: "paragraph", content: "تخطيط التعاقب ليس جدولاً بيانات — بل إجابة صندوق سيادي قبل مغادرة قائد حرج: من جاهز، من يتطور، وأين الثغرات؟ في Takafo+ بنينا وحدة تعاقب كاملة ضمن منصة HCM من 11 وحدة." },
        { type: "heading", content: "لماذا يهم التعاقب", level: 2 },
        { type: "paragraph", content: "الأدوار ذات التأثير العالي أو المهارات النادرة تحتاج خلفاء مسماة ومسارات جاهزية — Ready Now، سنة، سنتين — مع حوكمة موافقات من شريك المواهب إلى الرئيس." },
        { type: "heading", content: "دورة العمل: الأدوار الحرجة إلى الخلفاء", level: 2 },
        { type: "list", ordered: true, items: ["تحديد الأدوار الحرجة", "مراجعة القائمة", "ربط الخلفاء مع تبرير", "مراجعة وإرسال للموافقة"] },
      ],
    },
    ur: {
      title: "Enterprise HCM کے لیے Succession Planning",
      excerpt: "Takafo+ میں critical roles، AI successor matching، 9-box mapping، اور multi-level approvals کیسے ship کیے۔",
      blocks: [
        { type: "paragraph", content: "Succession planning spreadsheet نہیں — یہ بتاتا ہے کہ critical leader کے جانے سے پہلے کون تیار ہے۔ Takafo+ میں 11-module HCM کے اندر مکمل succession module بنایا۔" },
        { type: "heading", content: "کیوں اہم ہے", level: 2 },
        { type: "paragraph", content: "High-impact roles کے لیے named successors، readiness levels، اور Talent Partner سے Chief تک approval governance۔" },
      ],
    },
    ru: {
      title: "Планирование преемственности в enterprise HCM",
      excerpt: "Критические роли, AI-подбор преемников, 9-box и многоуровневые согласования в Takafo+ для Mubadala.",
    },
    de: {
      title: "Nachfolgeplanung für Enterprise-HCM",
      excerpt: "Kritische Rollen, KI-Nachfolger-Matching, 9-Box und Mehrstufige Freigaben in Takafo+ für Mubadala.",
    },
  },
  "vip-referral-priority-hiring-pipeline": {
    ar: {
      title: "إحالة VIP ومسار التوظيف ذو الأولوية",
      excerpt: "سير عمل إحالات أصحاب المصلحة مع عرض سير ذاتية بالذكاء الاصطناعي ومسارات موافقة سريعة في Takafo+.",
      blocks: [
        { type: "paragraph", content: "إحالات VIP تتطلب سرعة وحوكمة — عرض CVs مع تحليل AI، تصنيف أولوية، وموافقات متعددة دون إبطاء التوظيف التنفيذي." },
      ],
    },
    ur: {
      title: "VIP Referral اور priority hiring pipeline",
      excerpt: "Stakeholder referrals، AI CV carousel، اور fast-track approvals Takafo+ میں۔",
    },
  },
  "crm-talent-pools-enterprise-recruiting": {
    ar: {
      title: "CRM ومجموعات المواهب في التوظيف المؤسسي",
      excerpt: "ملف مرشح 360°، مجموعات مواهب، وحملات تواصل داخل منصة Takafo+ الموحدة.",
      blocks: [
        { type: "paragraph", content: "CRM في HCM ليس جدول Excel — بل مصدر واحد للحقيقة عبر التوظيف والانضمام والتعاقب، مع مجموعات مواهب قابلة للتصفية وحملات outreach." },
      ],
    },
    ur: {
      title: "Enterprise recruiting میں CRM اور talent pools",
      excerpt: "Candidate 360°، talent pools، outreach — Takafo+ unified platform میں۔",
    },
  },
  "openai-in-production-vue3": {
    ar: { title: "OpenAI في الإنتاج مع Vue 3", excerpt: "دروس من دمج LLM في واجهات مؤسسية — prompts، أمان، وتجربة مستخدم." },
    ur: { title: "Vue 3 کے ساتھ production میں OpenAI", excerpt: "Enterprise UI میں LLM integration — prompts، security، UX." },
    ru: { title: "OpenAI в продакшене с Vue 3", excerpt: "Интеграция LLM в enterprise UI — промпты, безопасность, UX." },
    de: { title: "OpenAI in Produktion mit Vue 3", excerpt: "LLM in Enterprise-UI — Prompts, Sicherheit, UX." },
  },
  "azure-msal-sso-vue-enterprise": {
    ar: { title: "Azure MSAL SSO في Vue المؤسسي", excerpt: "مصادقة MSAL وB2C لآلاف المستخدمين في منصات الإمارات." },
    ur: { title: "Enterprise Vue میں Azure MSAL SSO", excerpt: "MSAL + B2C auth UAE enterprise platforms کے لیے۔" },
  },
  "nestjs-rest-api-at-scale": {
    ar: { title: "NestJS REST API على نطاق واسع", excerpt: "أنماط أداء وقابلية توسع من APIs الإنتاج." },
    ur: { title: "Scale پر NestJS REST API", excerpt: "Production API performance اور scaling patterns." },
  },
};
