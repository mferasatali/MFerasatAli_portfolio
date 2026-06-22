import type { AppLocale } from "@/i18n";
import type { AssistantContent } from "./types";
import { PROFILE, AVAILABILITY, DOWNLOAD_LINKS } from "@/utils/ferasatProfile";
import { RECRUITER_SUMMARY, CALENDLY_URL } from "@/utils/ferasatRecruiter";
import { getExperiences } from "./index";

function buildActions(locale: AppLocale) {
  const labels = ACTION_LABELS[locale];
  const contact = [
    ...(CALENDLY_URL
      ? [{ label: labels.bookCalendly, icon: "mdi-calendar", href: CALENDLY_URL, external: true }]
      : []),
    { label: labels.whatsapp, icon: "mdi-whatsapp", href: PROFILE.whatsappUrl, external: true },
    { label: labels.email, icon: "mdi-email", href: `mailto:${PROFILE.email}`, external: true },
    { label: labels.linkedin, icon: "mdi-linkedin", href: PROFILE.linkedin, external: true },
    { label: labels.github, icon: "mdi-github", href: PROFILE.github, external: true },
    { label: labels.contactForm, icon: "mdi-form-select", route: "/#contact" },
    { label: labels.recruiterPage, icon: "mdi-account-tie", route: "/recruiter" },
  ];
  const resume = [
    { label: labels.downloadResume, icon: "mdi-download", href: DOWNLOAD_LINKS.resume, external: true },
    { label: labels.viewResume, icon: "mdi-file-document-outline", route: "/resume" },
  ];
  return { contact, resume };
}

const ACTION_LABELS: Record<AppLocale, Record<string, string>> = {
  en: {
    bookCalendly: "Book 30 min (Calendly)",
    whatsapp: "Chat on WhatsApp",
    email: "Send email",
    linkedin: "LinkedIn",
    github: "GitHub",
    contactForm: "Contact form",
    recruiterPage: "Recruiter page",
    downloadResume: "Download Resume",
    viewResume: "View Resume",
  },
  ar: {
    bookCalendly: "حجز 30 دقيقة (Calendly)",
    whatsapp: "واتساب",
    email: "إرسال بريد",
    linkedin: "LinkedIn",
    github: "GitHub",
    contactForm: "نموذج التواصل",
    recruiterPage: "صفحة المجندين",
    downloadResume: "تحميل السيرة",
    viewResume: "عرض السيرة",
  },
  ur: {
    bookCalendly: "30 منٹ بُک کریں (Calendly)",
    whatsapp: "WhatsApp",
    email: "ای میل",
    linkedin: "LinkedIn",
    github: "GitHub",
    contactForm: "رابطہ فارم",
    recruiterPage: "Recruiter page",
    downloadResume: "Resume ڈاؤن لوڈ",
    viewResume: "Resume دیکھیں",
  },
  ru: {
    bookCalendly: "Запись 30 мин (Calendly)",
    whatsapp: "WhatsApp",
    email: "Email",
    linkedin: "LinkedIn",
    github: "GitHub",
    contactForm: "Форма связи",
    recruiterPage: "Страница рекрутера",
    downloadResume: "Скачать резюме",
    viewResume: "Резюме онлайн",
  },
  de: {
    bookCalendly: "30 Min buchen (Calendly)",
    whatsapp: "WhatsApp",
    email: "E-Mail",
    linkedin: "LinkedIn",
    github: "GitHub",
    contactForm: "Kontaktformular",
    recruiterPage: "Recruiter-Seite",
    downloadResume: "Lebenslauf PDF",
    viewResume: "Lebenslauf ansehen",
  },
};

const CONTENT: Record<AppLocale, Omit<AssistantContent, "faq"> & { faq: AssistantContent["faq"] }> = {
  en: {
    greeting: `Hi! I'm MFA's portfolio assistant. Ask about experience, projects, skills — or how to contact Muhammad (Calendly, WhatsApp, email, LinkedIn).`,
    fallback: `I'm MFA's portfolio assistant. Ask about experience, projects, skills, or how to reach Muhammad — Calendly, WhatsApp, email, LinkedIn, or the contact form.`,
    suggestions: ["How can I contact you?", "Book a call", "Recruiter pack", "Notice period?"],
    actionLabels: ACTION_LABELS.en,
    faq: [],
  },
  ar: {
    greeting: `مرحباً! أنا مساعد محفظة MFA. اسأل عن الخبرة، المشاريع، المهارات، أو كيفية التواصل مع محمد (Calendly، واتساب، بريد، LinkedIn).`,
    fallback: `أنا مساعد المحفظة. اسأل عن الخبرة أو المشاريع أو طرق التواصل — Calendly، واتساب، البريد، أو نموذج التواصل.`,
    suggestions: ["كيف أتواصل معك؟", "حجز مكالمة", "حزمة المجندين", "فترة الإشعار؟"],
    actionLabels: ACTION_LABELS.ar,
    faq: [],
  },
  ur: {
    greeting: `السلام! میں MFA portfolio assistant ہوں۔ تجربہ، projects، skills، یا رابطے کے طریقے پوچھیں۔`,
    fallback: `Portfolio assistant — experience، projects، یا Calendly/WhatsApp/email کے بارے میں پوچھیں۔`,
    suggestions: ["رابطہ کیسے کریں؟", "کال بُک کریں", "Recruiter pack", "Notice period؟"],
    actionLabels: ACTION_LABELS.ur,
    faq: [],
  },
  ru: {
    greeting: `Привет! Я ассистент портфолио MFA. Спросите об опыте, проектах, навыках или как связаться с Мухаммадом.`,
    fallback: `Ассистент портфолио. Спросите об опыте, проектах или свяжитесь через Calendly, WhatsApp, email.`,
    suggestions: ["Как связаться?", "Записаться на звонок", "Пакет рекрутера", "Срок уведомления?"],
    actionLabels: ACTION_LABELS.ru,
    faq: [],
  },
  de: {
    greeting: `Hallo! Ich bin MFAs Portfolio-Assistent. Fragen Sie nach Erfahrung, Projekten, Skills oder Kontakt zu Muhammad.`,
    fallback: `Portfolio-Assistent. Fragen Sie nach Erfahrung, Projekten oder Kontakt via Calendly, WhatsApp, E-Mail.`,
    suggestions: ["Wie kontaktieren?", "Termin buchen", "Recruiter-Pack", "Kündigungsfrist?"],
    actionLabels: ACTION_LABELS.de,
    faq: [],
  },
};

function buildFaq(locale: AppLocale): AssistantContent["faq"] {
  const { contact, resume } = buildActions(locale);
  const exp = getExperiences(locale)[0];
  const texts = FAQ_TEXT[locale];

  return [
    { keywords: [...texts.contactKw], answer: texts.contactAnswer, actions: contact },
    { keywords: [...texts.experienceKw], answer: texts.experienceAnswer(exp) },
    { keywords: [...texts.takafoKw], answer: texts.takafoAnswer },
    { keywords: [...texts.skillsKw], answer: texts.skillsAnswer },
    { keywords: [...texts.calendlyKw], answer: texts.calendlyAnswer, actions: CALENDLY_URL ? contact.slice(0, 1) : contact.slice(0, 2) },
    { keywords: [...texts.noticeKw], answer: texts.noticeAnswer },
    { keywords: [...texts.recruiterKw], answer: texts.recruiterAnswer, actions: [{ label: ACTION_LABELS[locale].recruiterPage, icon: "mdi-account-tie", route: "/recruiter" }, ...resume] },
    { keywords: [...texts.resumeKw], answer: texts.resumeAnswer, actions: resume },
    { keywords: [...texts.helloKw], answer: texts.helloAnswer, actions: contact.slice(0, CALENDLY_URL ? 3 : 2) },
  ];
}

const FAQ_TEXT = {
  en: {
    contactKw: ["contact", "reach", "email", "whatsapp", "linkedin", "hire", "message", "how to contact", "get in touch"],
    contactAnswer: `Reach ${PROFILE.name}: ${CALENDLY_URL ? "Calendly 30 min, " : ""}WhatsApp (${PROFILE.phoneDisplay}), ${PROFILE.email}, LinkedIn, or the contact form.`,
    experienceKw: ["experience", "work", "career", "job", "company", "years"],
    experienceAnswer: (exp: { role: string; companyName: string; duration: string }) =>
      `${PROFILE.name} has 3+ years full-stack experience. Current: ${exp.role} at ${exp.companyName} (${exp.duration}). Also at Aslase and Byte Sailors.`,
    takafoKw: ["takafo", "takafo+", "hcm", "mubadala"],
    takafoAnswer: `Takafo+ is an AI-powered HCM platform for Mubadala — 11 modules, 30+ roles, Vue 3, Azure SSO, WebSockets, OpenAI matching & Heygen interviews.`,
    skillsKw: ["skill", "skills", "stack", "tech", "vue", "openai", "ai"],
    skillsAnswer: `Core stack: Vue 3, React, Angular, Node.js, NestJS, PostgreSQL, OpenAI, RAG, Azure SSO — enterprise UAE platforms.`,
    calendlyKw: ["calendly", "book", "schedule", "meeting", "30 min", "appointment"],
    calendlyAnswer: CALENDLY_URL
      ? `Book a free 30-minute call on Calendly. ${PROFILE.name} is ${AVAILABILITY.label.toLowerCase()}.`
      : `Contact via WhatsApp ${PROFILE.phoneDisplay} or ${PROFILE.email}.`,
    noticeKw: ["notice", "notice period", "start date", "availability", "available"],
    noticeAnswer: `Notice: ${RECRUITER_SUMMARY.noticePeriod}. ${AVAILABILITY.detail}.`,
    recruiterKw: ["recruiter", "pack", "brief", "hiring"],
    recruiterAnswer: `Recruiter pack: resume PDF, cover letter, LinkedIn, GitHub, WhatsApp, bio. Visit /recruiter or "For Recruiters" on the homepage.`,
    resumeKw: ["resume", "cv", "download"],
    resumeAnswer: `View or download ${PROFILE.name}'s resume PDF from the portfolio.`,
    helloKw: ["hello", "hi", "hey", "salam", "assalam"],
    helloAnswer: `Hello! Ask about experience, projects, skills, or contact options — Calendly, WhatsApp, email.`,
  },
  ar: {
    contactKw: ["تواصل", "اتصل", "راسل", "بريد", "واتساب", "توظيف", "رسالة", "كيف أتواصل", "contact", "email", "whatsapp"],
    contactAnswer: `تواصل مع ${PROFILE.name}: ${CALENDLY_URL ? "Calendly 30 دقيقة، " : ""}واتساب (${PROFILE.phoneDisplay})، ${PROFILE.email}، LinkedIn، أو نموذج التواصل.`,
    experienceKw: ["خبرة", "عمل", "مسيرة", "وظيفة", "شركة", "سنوات", "experience", "career"],
    experienceAnswer: (exp: { role: string; companyName: string; duration: string }) =>
      `${PROFILE.name} — أكثر من 3 سنوات full-stack. الحالي: ${exp.role} في ${exp.companyName} (${exp.duration}). أيضاً Aslase وByte Sailors.`,
    takafoKw: ["تكافو", "takafo", "مبادلة", "hcm"],
    takafoAnswer: `Takafo+ منصة HCM مدعومة بالذكاء الاصطناعي لمبادلة — 11 وحدة، 30+ دور، Vue 3، Azure SSO، WebSocket، OpenAI وHeygen.`,
    skillsKw: ["مهارات", "تقنيات", "stack", "vue", "openai", "ذكاء"],
    skillsAnswer: `المجموعة الأساسية: Vue 3، React، Node.js، NestJS، PostgreSQL، OpenAI، RAG، Azure SSO — منصات مؤسسية في الإمارات.`,
    calendlyKw: ["calendly", "حجز", "موعد", "مكالمة", "schedule", "book"],
    calendlyAnswer: CALENDLY_URL
      ? `احجز مكالمة 30 دقيقة مجانية على Calendly. ${AVAILABILITY.label}.`
      : `تواصل عبر واتساب ${PROFILE.phoneDisplay} أو ${PROFILE.email}.`,
    noticeKw: ["إشعار", "notice", "متاح", "availability", "فترة"],
    noticeAnswer: `فترة الإشعار: ${RECRUITER_SUMMARY.noticePeriod}. ${AVAILABILITY.detail}.`,
    recruiterKw: ["مجند", "recruiter", "حزمة", "pack"],
    recruiterAnswer: `حزمة المجندين: سيرة PDF، خطاب تغطية، LinkedIn، GitHub، واتساب. زر /recruiter أو قسم "للمجندين".`,
    resumeKw: ["سيرة", "resume", "cv", "تحميل"],
    resumeAnswer: `عرض أو تحميل سيرة ${PROFILE.name} من المحفظة.`,
    helloKw: ["مرحبا", "السلام", "hello", "hi", "salam"],
    helloAnswer: `مرحباً! اسأل عن الخبرة، المشاريع، المهارات، أو طرق التواصل.`,
  },
  ur: {
    contactKw: ["رابطہ", "contact", "email", "whatsapp", "hire", "message", "کیسے رابطہ"],
    contactAnswer: `${PROFILE.name} سے رابطہ: ${CALENDLY_URL ? "Calendly 30 min، " : ""}WhatsApp (${PROFILE.phoneDisplay})، ${PROFILE.email}، LinkedIn، contact form.`,
    experienceKw: ["تجربہ", "experience", "career", "job", "company"],
    experienceAnswer: (exp: { role: string; companyName: string; duration: string }) =>
      `${PROFILE.name} — 3+ years full-stack. Current: ${exp.role} at ${exp.companyName} (${exp.duration}).`,
    takafoKw: ["takafo", "mubadala", "hcm"],
    takafoAnswer: `Takafo+ — Mubadala کے لیے AI HCM: 11 modules، 30+ roles، Vue 3، Azure SSO، OpenAI، Heygen.`,
    skillsKw: ["skills", "stack", "vue", "openai", "ai", "مہارت"],
    skillsAnswer: `Core: Vue 3، React، Node.js، NestJS، PostgreSQL، OpenAI، RAG، Azure SSO.`,
    calendlyKw: ["calendly", "book", "schedule", "کال", "بُک"],
    calendlyAnswer: CALENDLY_URL ? `Calendly پر 30 min call بُک کریں۔` : `WhatsApp ${PROFILE.phoneDisplay}`,
    noticeKw: ["notice", "availability", "دستیاب"],
    noticeAnswer: `Notice: ${RECRUITER_SUMMARY.noticePeriod}.`,
    recruiterKw: ["recruiter", "pack"],
    recruiterAnswer: `Recruiter pack: resume، cover letter، links — /recruiter`,
    resumeKw: ["resume", "cv"],
    resumeAnswer: `Resume PDF دیکھیں یا ڈاؤن لوڈ کریں۔`,
    helloKw: ["hello", "hi", "salam", "السلام"],
    helloAnswer: `السلام! experience، projects، یا contact کے بارے میں پوچھیں۔`,
  },
  ru: {
    contactKw: ["контакт", "связаться", "email", "whatsapp", "contact", "hire"],
    contactAnswer: `Связаться с ${PROFILE.name}: ${CALENDLY_URL ? "Calendly, " : ""}WhatsApp, email, LinkedIn, форма.`,
    experienceKw: ["опыт", "experience", "карьера", "работа"],
    experienceAnswer: (exp: { role: string; companyName: string; duration: string }) =>
      `3+ года full-stack. Сейчас: ${exp.role} в ${exp.companyName}.`,
    takafoKw: ["takafo", "mubadala", "hcm"],
    takafoAnswer: `Takafo+ — AI HCM для Mubadala: 11 модулей, Vue 3, Azure SSO, OpenAI.`,
    skillsKw: ["навыки", "skills", "stack", "vue", "openai"],
    skillsAnswer: `Vue 3, React, Node.js, NestJS, PostgreSQL, OpenAI, RAG, Azure SSO.`,
    calendlyKw: ["calendly", "запись", "book", "schedule"],
    calendlyAnswer: CALENDLY_URL ? `Запишитесь на 30 мин в Calendly.` : `WhatsApp или email.`,
    noticeKw: ["notice", "доступен", "availability"],
    noticeAnswer: `Срок: ${RECRUITER_SUMMARY.noticePeriod}.`,
    recruiterKw: ["recruiter", "рекрутер", "pack"],
    recruiterAnswer: `Пакет рекрутера на /recruiter.`,
    resumeKw: ["resume", "резюме", "cv"],
    resumeAnswer: `Резюме PDF на портфолио.`,
    helloKw: ["hello", "hi", "привет"],
    helloAnswer: `Привет! Спросите об опыте, проектах или контакте.`,
  },
  de: {
    contactKw: ["kontakt", "contact", "email", "whatsapp", "hire", "erreichen"],
    contactAnswer: `${PROFILE.name}: ${CALENDLY_URL ? "Calendly, " : ""}WhatsApp, E-Mail, LinkedIn, Formular.`,
    experienceKw: ["erfahrung", "experience", "karriere", "arbeit"],
    experienceAnswer: (exp: { role: string; companyName: string; duration: string }) =>
      `3+ Jahre Full-Stack. Aktuell: ${exp.role} bei ${exp.companyName}.`,
    takafoKw: ["takafo", "mubadala", "hcm"],
    takafoAnswer: `Takafo+ — KI-HCM für Mubadala: 11 Module, Vue 3, Azure SSO, OpenAI.`,
    skillsKw: ["skills", "stack", "vue", "openai", "fähigkeiten"],
    skillsAnswer: `Vue 3, React, Node.js, NestJS, PostgreSQL, OpenAI, RAG, Azure SSO.`,
    calendlyKw: ["calendly", "buchen", "book", "termin"],
    calendlyAnswer: CALENDLY_URL ? `30 Min in Calendly buchen.` : `WhatsApp oder E-Mail.`,
    noticeKw: ["notice", "verfügbar", "availability", "kündigung"],
    noticeAnswer: `Kündigungsfrist: ${RECRUITER_SUMMARY.noticePeriod}.`,
    recruiterKw: ["recruiter", "pack"],
    recruiterAnswer: `Recruiter-Pack unter /recruiter.`,
    resumeKw: ["resume", "lebenslauf", "cv"],
    resumeAnswer: `Lebenslauf PDF im Portfolio.`,
    helloKw: ["hello", "hi", "hallo"],
    helloAnswer: `Hallo! Fragen zu Erfahrung, Projekten oder Kontakt.`,
  },
} as const;

export function getAssistantContent(locale: AppLocale): AssistantContent {
  const base = CONTENT[locale] ?? CONTENT.en;
  return { ...base, faq: buildFaq(locale) };
}
