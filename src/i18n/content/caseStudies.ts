import type { CaseStudyOverrides } from "./types";

export const CASE_STUDY_OVERRIDES: CaseStudyOverrides = {
  "takafo-plus": {
    ar: {
      overview: "Takafo+ منصة إدارة رأس المال البشري مدعومة بالذكاء الاصطناعي لصالح مبادلة — تشمل التوظيف وCRM والانضمام وتخطيط التعاقب وسوق المواهب والتوطين عبر 11 وحدة و30+ شخصية.",
      challenge: "تسليم مجموعة HCM متعددة الوحدات مع سلاسل موافقات معقدة وإشعارات فورية وSSO مؤسسي وتوظيف مدعوم بالذكاء الاصطناعي — بمعايير أمن وUX صارمة لصندوق سيادي.",
      solution: "واجهات Vue 3 مع Pinia وسير عمل قائم على composables ولوحات Kanban. Azure MSAL + B2C وWebSocket وOpenAI وHeygen مع التحقق من prompts على الخادم.",
      impact: ["11 وحدة HCM حية عبر 30+ دوراً", "مطابقة مرشحين بالذكاء الاصطناعي في الإنتاج", "إشعارات WebSocket على نطاق مؤسسي", "Azure SSO لآلاف مستخدمي الإمارات"],
      highlights: ["موافقات متعددة المستويات و9-box", "مقابلات Heygen بالأفاتار", "مسارات تقييم OpenAI", "التوطين وتخطيط التعاقب"],
    },
    ur: {
      overview: "Takafo+ — Mubadala کے لیے AI-powered HCM: recruiting، CRM، onboarding، succession، talent marketplace، Emiratization — 11 modules، 30+ roles.",
      challenge: "Multi-module HCM، complex approvals، real-time notifications، enterprise SSO، AI hiring — sovereign wealth fund security standards.",
      solution: "Vue 3 + Pinia، composable workflows، Kanban boards، Azure MSAL/B2C، WebSockets، OpenAI scoring، Heygen interviews.",
      impact: ["11 live HCM modules", "AI matching production میں", "Enterprise-scale WebSockets", "Azure SSO thousands of users"],
      highlights: ["Multi-level approvals & 9-box", "Heygen AI interviews", "OpenAI scoring pipelines", "Emiratization & succession"],
    },
    ru: {
      overview: "Takafo+ — AI-платформа HCM для Mubadala: рекрутинг, CRM, онбординг, преемственность, 11 модулей, 30+ ролей.",
      challenge: "Мультимодульный HCM с согласованиями, real-time, SSO и AI-наймом для sovereign wealth fund.",
      solution: "Vue 3 + Pinia, Kanban, Azure MSAL/B2C, WebSocket, OpenAI, Heygen с server-side validation.",
      impact: ["11 модулей в продакшене", "AI-матчинг кандидатов", "WebSocket на enterprise-масштабе", "Azure SSO для тысяч пользователей"],
    },
    de: {
      overview: "Takafo+ — KI-HCM für Mubadala: Recruiting, CRM, Onboarding, Nachfolge, 11 Module, 30+ Rollen.",
      challenge: "Multi-Modul-HCM mit Freigaben, Echtzeit, SSO und KI-Hiring für einen Sovereign Wealth Fund.",
      solution: "Vue 3 + Pinia, Kanban, Azure MSAL/B2C, WebSockets, OpenAI, Heygen mit Server-Validierung.",
      impact: ["11 live HCM-Module", "KI-Matching in Produktion", "Enterprise-WebSockets", "Azure SSO für Tausende"],
    },
  },
  "qudra-tech": {
    ar: {
      overview: "منصة تقييم مرشحين بالذكاء الاصطناعي مع بيئات اختبار مؤقتة وتوليد أسئلة تلقائي ومراقبة حية للامتحانات المؤسسية.",
      challenge: "بيئة اختبار آمنة ومؤقتة مع أسئلة مولّدة بالذكاء الاصطناعي ومقاومة للعبث وحل حي للمشاكل أثناء الامتحان.",
      solution: "واجهة Vue مع مؤقتات صارمة، Node.js مع OpenAI، مسارات تقييم آلية ولوحات مراقبة فورية.",
      impact: ["توليد أسئلة AI على نطاق واسع", "تقييم آلي يقلل الوقت اليدوي", "أمان الجلسات للامتحانات الحساسة", "مراقبة حية وحل فوري"],
    },
    ur: {
      overview: "AI assessment platform — timed tests، automated questions، live exam monitoring.",
      challenge: "Secure timed environment، AI questions، tamper resistance، live proctor support.",
      solution: "Vue UI with lock-down flows، Node.js + OpenAI، automated scoring، real-time dashboards.",
      impact: ["AI question generation at scale", "Automated scoring", "Session security", "Live incident response"],
    },
  },
};
