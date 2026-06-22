export interface CorpusChunk {
  id: string;
  source: string;
  text: string;
  tags: string[];
}

export const PORTFOLIO_CORPUS: CorpusChunk[] = [
  {
    id: "profile",
    source: "Profile",
    tags: ["about", "summary", "who"],
    text: "Muhammad Ferasat Ali is a Senior Full-Stack Engineer specializing in Vue 3, React, Node.js, NestJS, and AI/LLM integration. 3+ years delivering enterprise platforms for Mubadala, G42, and UAE government clients through Inception - IBHC Abu Dhabi.",
  },
  {
    id: "takafo-overview",
    source: "Takafo+",
    tags: ["takafo", "hcm", "mubadala", "project"],
    text: "Takafo+ is an AI-powered Human Capital Management platform for Mubadala Investment Company with 11 modules and 30+ role-based personas: Recruiting, CRM, VIP Referral, Succession Planning, Onboarding, AI Interviews, Assessments, Emiratization, Talent Marketplace, Workforce (Remote Work & Dawamee), and Analytics.",
  },
  {
    id: "takafo-tech",
    source: "Takafo+ Architecture",
    tags: ["takafo", "vue", "azure", "openai", "stack"],
    text: "Takafo+ stack: Vue 3 + Pinia UI, REST/WebSocket APIs, PostgreSQL, Azure MSAL and B2C SSO, OpenAI for candidate matching and scoring, Heygen for live-avatar AI interviews, multi-level approval workflows, Kanban boards, and 9-box talent mapping.",
  },
  {
    id: "qudra",
    source: "Qudra Tech",
    tags: ["qudra", "assessment", "ai", "exam"],
    text: "Qudra is an AI assessment platform with timed tests, OpenAI-generated questions, automated scoring, session security, and live exam monitoring — built with Vue.js, Node.js, and PostgreSQL for UAE enterprise hiring.",
  },
  {
    id: "aslase",
    source: "Aslase",
    tags: ["aslase", "rag", "openai", "lead"],
    text: "At Aslase, Muhammad is Frontend Lead building Vue 3 and React apps, NestJS APIs, OpenAI document Q&A bots, RAG pipelines with Pinecone vector DB and LangChain, plus D3.js and GSAP dashboards.",
  },
  {
    id: "byte-sailors",
    source: "Byte Sailors",
    tags: ["byte sailors", "payments", "booking"],
    text: "At Byte Sailors (2022–2023): booking systems with Vue/React and Node/Express, Stripe/PayPal/Braintree payments, PostgreSQL optimization, Heroku CI/CD.",
  },
  {
    id: "skills",
    source: "Skills",
    tags: ["skills", "stack", "vue", "react", "node", "ai"],
    text: "Core skills: Vue.js 3, React, Angular, Nuxt, Next.js, Node.js, NestJS, Laravel, PostgreSQL, MongoDB, Redis, OpenAI API, RAG, Pinecone, LangChain, Azure SSO, WebSockets, GSAP, D3.js.",
  },
  {
    id: "contact",
    source: "Contact",
    tags: ["contact", "calendly", "hire", "email", "whatsapp"],
    text: "Contact Muhammad Ferasat Ali via Calendly for a 30-minute intro call, WhatsApp, email mferasatali14@gmail.com, LinkedIn, GitHub, or the portfolio contact form. Recruiter pack available at /recruiter.",
  },
  {
    id: "availability",
    source: "Availability",
    tags: ["availability", "notice", "hire", "remote"],
    text: "Open to full-time and contract roles. Notice period: 2 weeks (negotiable). Based in Lahore, Pakistan; remote for Abu Dhabi (Inception - IBHC). Open to UAE remote and contract.",
  },
  {
    id: "succession",
    source: "Succession Planning",
    tags: ["succession", "9-box", "takafo", "hcm"],
    text: "Takafo+ Succession Planning module: cycle-based critical role identification, AI successor matching with weighted scoring, 9-box mapping, multi-level approvals (Talent Partner to Chief), and executive dashboards.",
  },
  {
    id: "vip-crm",
    source: "VIP & CRM",
    tags: ["vip", "referral", "crm", "recruiting"],
    text: "Takafo+ VIP Referral pipeline: stakeholder referrals with AI CV carousel analysis. CRM module: talent pools, candidate 360° profiles, and outreach campaigns integrated with recruiting workflows.",
  },
];
