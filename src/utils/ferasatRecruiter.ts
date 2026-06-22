import { PROFILE, DOWNLOAD_LINKS, AVAILABILITY } from "@/utils/ferasatProfile";

/** Set your Calendly link to enable “Book a call”. Leave empty to hide the button. */
export const CALENDLY_URL = "https://calendly.com/ferasatali14/30min";

/** Set when you create a Plausible account (e.g. mferasatali.github.io). Leave empty to disable. */
export const PLAUSIBLE_DOMAIN = "";

export const RESUME_LAST_UPDATED = "2026-06-22";

export type SkillMatchLevel = "expert" | "production" | "familiar";

export interface SkillMatchItem {
  skill: string;
  level: SkillMatchLevel;
  keywords: string[];
}

export interface RecruiterFaqItem {
  question: string;
  answer: string;
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
  url?: string;
}

export interface ClientHighlight {
  name: string;
  context: string;
}

export interface ExperienceTimelineItem {
  company: string;
  role: string;
  period: string;
  impact: string;
}

export interface TakafoModule {
  name: string;
  description: string;
  articleSlug?: string;
}

export const RECRUITER_SUMMARY = {
  role: "Senior Full-Stack Engineer",
  stack: "Vue 3 · React · Node.js · NestJS · AI/LLM",
  location: PROFILE.location,
  remote: "Remote-friendly · UAE enterprise experience",
  noticePeriod: "2 weeks (negotiable)",
  workAuthorization: "Based in Pakistan · open to UAE remote & contract",
  availability: AVAILABILITY.label,
  email: PROFILE.email,
  phone: PROFILE.phoneDisplay,
} as const;

export const RECRUITER_SHORT_BIO = `${PROFILE.name} — ${PROFILE.title}. 3+ years building enterprise HCM, AI assessment, and full-stack products for Mubadala, G42, and UAE government clients.`;

export const RECRUITER_PACK_LINKS = [
  { label: "Download Resume (PDF)", icon: "mdi-download", href: DOWNLOAD_LINKS.resume, external: true },
  { label: "Download Cover Letter", icon: "mdi-download", href: DOWNLOAD_LINKS.coverLetter, external: true },
  { label: "View Resume Online", icon: "mdi-file-document-outline", route: "/resume" },
  { label: "View Cover Letter", icon: "mdi-email-outline", route: "/cover-letter" },
  { label: "LinkedIn", icon: "mdi-linkedin", href: PROFILE.linkedin, external: true },
  { label: "GitHub", icon: "mdi-github", href: PROFILE.github, external: true },
  { label: "WhatsApp", icon: "mdi-whatsapp", href: PROFILE.whatsappUrl, external: true },
  { label: "Email", icon: "mdi-email", href: `mailto:${PROFILE.email}`, external: true },
] as const;

export const RECRUITER_FAQ: RecruiterFaqItem[] = [
  {
    question: "Are you open to new roles?",
    answer: `${AVAILABILITY.detail}. Best fit: Senior Full-Stack, Frontend Lead, or AI-integrated product engineering.`,
  },
  {
    question: "Remote, hybrid, or on-site?",
    answer:
      "Remote-first from Lahore. Experienced delivering for UAE clients (Abu Dhabi) fully remote. Open to hybrid/on-site for the right UAE/GCC opportunity.",
  },
  {
    question: "Notice period?",
    answer: "Typically 2 weeks — flexible for the right role. Concurrent Aslase + Inception engagement managed with clear delivery ownership.",
  },
  {
    question: "Full-time vs contract?",
    answer: "Both. Full-time preferred for long-term product teams; contract/consulting for defined enterprise modules or AI integration sprints.",
  },
  {
    question: "UAE / enterprise experience?",
    answer:
      "Yes — Takafo+ for Mubadala (11 HCM modules, 30+ roles), G42 ecosystem (Inception, Core42, Space42), Emirates Foundation, Dubai Municipality, Khalifa University.",
  },
  {
    question: "Core tech stack?",
    answer:
      "Frontend: Vue 3, React, Angular, Pinia, Vuetify. Backend: Node.js, NestJS, Laravel. Data: PostgreSQL, MongoDB, Redis. AI: OpenAI, RAG, LangChain, Pinecone. Cloud/Auth: Azure MSAL, B2C.",
  },
  {
    question: "Salary expectations?",
    answer: "Happy to discuss on a brief call based on role scope, location, and contract type. Use WhatsApp, email, or book a slot if Calendly is enabled.",
  },
  {
    question: "How fast can you start?",
    answer:
      "Depends on current sprint commitments. Message via contact form or WhatsApp with role details — I usually reply within 24 hours on weekdays.",
  },
];

export const SKILL_MATCH_MATRIX: SkillMatchItem[] = [
  { skill: "Vue 3", level: "expert", keywords: ["vue", "vue3", "pinia", "vuetify", "nuxt"] },
  { skill: "React", level: "production", keywords: ["react", "next.js", "nextjs", "redux"] },
  { skill: "Angular", level: "production", keywords: ["angular", "rxjs"] },
  { skill: "Node.js", level: "expert", keywords: ["node", "nodejs", "express", "javascript", "typescript"] },
  { skill: "NestJS", level: "production", keywords: ["nest", "nestjs", "nestjs"] },
  { skill: "PostgreSQL", level: "production", keywords: ["postgres", "postgresql", "sql"] },
  { skill: "OpenAI / LLM", level: "production", keywords: ["openai", "llm", "gpt", "ai", "prompt", "rag", "langchain"] },
  { skill: "Azure SSO", level: "production", keywords: ["azure", "msal", "sso", "b2c", "entra"] },
  { skill: "WebSockets", level: "production", keywords: ["websocket", "real-time", "realtime", "socket"] },
  { skill: "TypeScript", level: "expert", keywords: ["typescript", "ts"] },
  { skill: "MongoDB", level: "familiar", keywords: ["mongo", "mongodb"] },
  { skill: "Redis", level: "familiar", keywords: ["redis", "cache"] },
];

export const SKILL_MATCH_PRESETS = [
  { label: "Vue + Node + AI", query: "vue node openai enterprise" },
  { label: "Full-Stack Lead", query: "vue react nestjs postgresql team lead" },
  { label: "UAE Enterprise", query: "azure sso vue enterprise hcm" },
  { label: "Frontend Heavy", query: "vue3 pinia vuetify gsap" },
];

export const CERTIFICATIONS: Certification[] = [
  { name: "B.Sc. Computer Science", issuer: "University of Central Punjab", year: "2023" },
  { name: "Vue.js — Production patterns", issuer: "Self-directed · enterprise delivery", year: "2024" },
  { name: "OpenAI API — production integration", issuer: "Takafo+ & Qudra (on-the-job)", year: "2024" },
  { name: "Azure MSAL / B2C SSO", issuer: "Enterprise HCM delivery", year: "2024" },
];

export const CLIENT_HIGHLIGHTS: ClientHighlight[] = [
  { name: "Mubadala Investment Company", context: "Takafo+ HCM platform" },
  { name: "G42 Ecosystem", context: "Inception · Core42 · Space42" },
  { name: "Emirates Foundation", context: "Enterprise platforms" },
  { name: "Dubai Municipality", context: "Government digital services" },
  { name: "Khalifa University", context: "Education & workforce tech" },
];

export const EXPERIENCE_TIMELINE: ExperienceTimelineItem[] = [
  {
    company: "Inception - IBHC",
    role: "Senior Software Engineer",
    period: "2024 – Present",
    impact: "Takafo+ HCM · 11 modules · AI hiring · Azure SSO",
  },
  {
    company: "Aslase",
    role: "Frontend Lead · Full-Stack",
    period: "2023 – Present",
    impact: "Team lead · OpenAI/RAG · NestJS APIs",
  },
  {
    company: "Byte Sailors",
    role: "Full-Stack Engineer",
    period: "2022 – 2023",
    impact: "Booking systems · payments · PostgreSQL perf",
  },
];

export const TAKAFO_MODULES: TakafoModule[] = [
  { name: "Recruiting", description: "Requisitions, sourcing, offers, approvals" },
  { name: "CRM", description: "Talent pools, candidate 360°, outreach", articleSlug: "crm-talent-pools-enterprise-recruiting" },
  { name: "VIP Referral", description: "Stakeholder referrals · AI CV carousel", articleSlug: "vip-referral-priority-hiring-pipeline" },
  { name: "Succession Planning", description: "Critical roles · 9-box · AI successors", articleSlug: "succession-planning-enterprise-hcm" },
  { name: "Onboarding", description: "Tasks, documents, workflows" },
  { name: "AI Interviews", description: "Heygen avatars · OpenAI screening" },
  { name: "Assessments", description: "Qudra-style timed AI evaluations" },
  { name: "Emiratization", description: "UAE national workforce tracking" },
  { name: "Talent Marketplace", description: "Internal mobility & opportunities" },
  { name: "Workforce", description: "Remote Work · Dawamee attendance" },
  { name: "Analytics", description: "Executive dashboards & reporting" },
];

export const CASE_STUDY_ARCHITECTURE: Record<string, string> = {
  "takafo-plus":
    "Vue 3 + Pinia UI → REST/WebSocket API → PostgreSQL · Azure MSAL/B2C auth · OpenAI + Heygen (server-side) · Role-based modules",
  "qudra-tech":
    "Vue assessment client → NestJS/Node API → PostgreSQL · OpenAI question gen · WebSocket proctoring",
  "ai-avatars":
    "Vue interview flows → Node orchestration → Heygen live API + OpenAI conversation layer",
  "invoice-generator":
    "Vue 3 + Pinia SPA → localStorage · client-side PDF export (no backend)",
};

export const LEVEL_LABELS: Record<SkillMatchLevel, string> = {
  expert: "Expert · daily driver",
  production: "Production · shipped to users",
  familiar: "Familiar · supporting use",
};
