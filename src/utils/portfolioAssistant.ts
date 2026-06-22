import { PROFILE, AVAILABILITY, DOWNLOAD_LINKS } from "@/utils/ferasatProfile";
import { FerasatExperience } from "@/utils/ferasatExperiences";
import { FerasatProjects } from "@/utils/ferasatProjects";
import { FerasatSkillsFlat } from "@/utils/ferasatSkillCategories";

export interface AssistantAction {
  label: string;
  icon: string;
  href?: string;
  route?: string;
  external?: boolean;
}

export interface AssistantReply {
  answer: string;
  suggestions: string[];
  actions?: AssistantAction[];
}

export interface FaqEntry {
  keywords: string[];
  answer: string;
  actions?: AssistantAction[];
}

const RESUME_ACTIONS: AssistantAction[] = [
  {
    label: "Download Resume",
    icon: "mdi-download",
    href: DOWNLOAD_LINKS.resume,
    external: true,
  },
  {
    label: "View Resume",
    icon: "mdi-file-document-outline",
    route: "/resume",
  },
];

const COVER_LETTER_ACTIONS: AssistantAction[] = [
  {
    label: "Download Cover Letter",
    icon: "mdi-download",
    href: DOWNLOAD_LINKS.coverLetter,
    external: true,
  },
  {
    label: "View Cover Letter",
    icon: "mdi-email-outline",
    route: "/cover-letter",
  },
];

const DEFAULT_SUGGESTIONS = [
  "What's your experience?",
  "Download resume",
  "Cover letter",
  "How can I hire you?",
];

const FALLBACK_ANSWER = `I'm MFA's portfolio assistant. I can share info about experience, projects, skills, and how to get in touch. Try one of the suggestions below, or ask about Vue, AI, enterprise work, or contact details.`;

const FAQ_ENTRIES: FaqEntry[] = [
  {
    keywords: [
      "who",
      "about",
      "mfa",
      "muhammad",
      "ferasat",
      "intro",
      "background",
      "summary",
    ],
    answer: `${PROFILE.name} is a ${PROFILE.title}. ${PROFILE.summary.slice(0, 220)}…`,
  },
  {
    keywords: [
      "experience",
      "work",
      "job",
      "career",
      "years",
      "company",
      "companies",
      "employer",
    ],
    answer: `${PROFILE.name} has 3+ years of full-stack experience. Current: ${FerasatExperience[0].role} at ${FerasatExperience[0].companyName} (${FerasatExperience[0].duration}). Also ${FerasatExperience[1].role} at ${FerasatExperience[1].companyName}, and previously at ${FerasatExperience[2].companyName}.`,
  },
  {
    keywords: [
      "inception",
      "ibhc",
      "mubadala",
      "g42",
      "uae",
      "enterprise",
      "government",
      "emirates",
      "dubai municipality",
    ],
    answer: `At Inception - IBHC (Abu Dhabi), Muhammad Ferasat Ali delivers enterprise platforms for Mubadala, G42 (Inception · Core42 · Space42), Emirates Foundation, Dubai Municipality, and Khalifa University — including Takafo+ HCM and AI assessment systems.`,
  },
  {
    keywords: ["takafo", "takafo+", "hcm", "human capital", "recruit", "recruiting"],
    answer: `Takafo+ is an AI-powered Human Capital Management platform for Mubadala Investment Company — 11 modules, 30+ role-based personas, Vue 3 frontend, Azure SSO, WebSockets, and OpenAI-powered candidate matching & Heygen AI interviews.`,
  },
  {
    keywords: ["qudra", "assessment", "exam", "test platform"],
    answer: `Qudra is an AI assessment platform with timed tests, OpenAI-generated questions, automated scoring, session security, and live exam monitoring — built with Vue.js, Node.js, and PostgreSQL.`,
  },
  {
    keywords: ["project", "projects", "portfolio", "built", "work sample"],
    answer: `Featured work includes ${FerasatProjects.slice(0, 4).map((p) => p.title).join(", ")}, and more. ${FerasatProjects.filter((p) => !p.isPrivate).length} open-source projects are listed on the portfolio. Scroll to Projects or visit /blog for technical articles.`,
  },
  {
    keywords: [
      "skill",
      "skills",
      "stack",
      "tech",
      "technology",
      "technologies",
      "framework",
    ],
    answer: `Core stack: ${FerasatSkillsFlat.slice(0, 14).join(", ")}, and more. Strongest areas are Vue.js, React, Angular, Node.js/NestJS, PostgreSQL, and AI/LLM integration (OpenAI, RAG, vector DBs).`,
  },
  {
    keywords: ["vue", "vuejs", "vue.js", "nuxt", "pinia"],
    answer: `${PROFILE.name} builds production Vue 3 apps with Pinia, composables, complex workflows, and GSAP animations — including enterprise HCM and assessment platforms serving UAE clients.`,
  },
  {
    keywords: ["react", "next", "nextjs", "angular"],
    answer: `Experienced across React.js, Next.js, and Angular for enterprise dashboards and multi-module platforms — often alongside Vue in client-facing delivery teams.`,
  },
  {
    keywords: ["node", "nestjs", "backend", "api", "laravel", "express"],
    answer: `Backend work spans Node.js, NestJS, Express, and Laravel — REST APIs, WebSockets, PostgreSQL/MongoDB/Redis, Azure SSO integration, and performance tuning in production.`,
  },
  {
    keywords: [
      "ai",
      "llm",
      "openai",
      "gpt",
      "rag",
      "vector",
      "pinecone",
      "langchain",
      "heygen",
      "avatar",
      "machine learning",
    ],
    answer: `AI integration in production: OpenAI API for scoring & Q&A, RAG pipelines with Pinecone/LangChain at Aslase, Heygen AI avatar interviews in recruitment flows, and structured prompt engineering with server-side validation.`,
  },
  {
    keywords: [
      "hire",
      "contact",
      "email",
      "reach",
      "connect",
      "message",
      "interview",
      "opportunity",
      "freelance",
      "contract",
      "full-time",
      "full time",
    ],
    answer: `${AVAILABILITY.label}. Reach out via WhatsApp (${PROFILE.phoneDisplay}), contact form, email ${PROFILE.email}, or LinkedIn.`,
  },
  {
    keywords: ["whatsapp", "whats app", "phone", "call", "number", "mobile", "text me"],
    answer: `Chat with ${PROFILE.name} on WhatsApp at ${PROFILE.phoneDisplay} — tap the button below to open a conversation.`,
    actions: [
      {
        label: "Chat on WhatsApp",
        icon: "mdi-whatsapp",
        href: PROFILE.whatsappUrl,
        external: true,
      },
    ],
  },
  {
    keywords: [
      "available",
      "availability",
      "open",
      "looking",
      "opportunities",
      "notice",
      "start",
    ],
    answer: `Status: ${AVAILABILITY.label}. ${AVAILABILITY.detail}. Best way to connect: contact form or ${PROFILE.email}.`,
  },
  {
    keywords: ["location", "remote", "lahore", "pakistan", "timezone", "relocate"],
    answer: `Based in ${PROFILE.location}. Currently working remote for Abu Dhabi (Inception - IBHC) while also leading frontend at Aslase locally. Open to remote and hybrid opportunities.`,
  },
  {
    keywords: ["resume", "cv", "biodata", "curriculum"],
    answer: `Here's ${PROFILE.name}'s resume — view it on the portfolio or download the PDF directly.`,
    actions: RESUME_ACTIONS,
  },
  {
    keywords: ["cover letter", "coverletter", "cover-letter", "motivation letter"],
    answer: `Here's the cover letter — read it in the portfolio or download the PDF.`,
    actions: COVER_LETTER_ACTIONS,
  },
  {
    keywords: ["download", "pdf", "document", "documents"],
    answer: `Resume and cover letter are available to view in-app or download as PDF from Google Drive.`,
    actions: [...RESUME_ACTIONS, ...COVER_LETTER_ACTIONS],
  },
  {
    keywords: ["aslase", "lead", "mentor", "frontend lead"],
    answer: `At Aslase, Muhammad Ferasat Ali is Full Stack Engineer & Frontend Lead — mentoring the team, Vue/React/NestJS delivery, OpenAI/RAG integrations, and D3.js + GSAP dashboards.`,
  },
  {
    keywords: ["byte sailors", "byte", "payment", "stripe"],
    answer: `Earlier at Byte Sailors (Feb 2022 – Jul 2023): booking systems with Vue/React, Node/Express, Stripe/PayPal/Braintree payments, and PostgreSQL performance optimization.`,
  },
  {
    keywords: ["blog", "article", "articles", "write", "writing"],
    answer: `Technical articles on Vue, AI, and enterprise engineering are at /blog — including OpenAI in production, Azure SSO, and NestJS performance notes.`,
  },
  {
    keywords: ["github", "open source", "opensource", "public repo"],
    answer: `GitHub: ${PROFILE.github.replace("https://", "")}. Open-source projects are marked "Open Source · Public" in the Projects section — enterprise work is private/NDA-bound.`,
  },
  {
    keywords: ["hello", "hi", "hey", "salam", "assalam"],
    answer: `Hello! I can help you learn about ${PROFILE.name}' experience, projects, skills, and how to get in touch. What would you like to know?`,
  },
  {
    keywords: ["thanks", "thank", "shukriya"],
    answer: `You're welcome! Feel free to use the contact form if you'd like to speak with ${PROFILE.name} directly.`,
  },
  {
    keywords: [
      "testimonial",
      "testimonials",
      "review",
      "reviews",
      "recommend",
      "recommendation",
      "feedback",
      "colleague",
    ],
    answer: `Colleagues and clients highlight strong Vue 3 delivery, AI/LLM integration, mentoring, and reliable production support — see the Testimonials section on the homepage for quotes from enterprise HCM, Aslase, and prior teams.`,
  },
];

function detectDocumentActions(query: string): AssistantAction[] | undefined {
  const wantsResume = /\bresume\b|\bcv\b|\bbiodata\b|\bcurriculum\b/.test(query);
  const wantsCover = /cover\s*letter|coverletter|cover-letter|motivation\s*letter/.test(query);

  if (wantsResume && wantsCover) {
    return [...RESUME_ACTIONS, ...COVER_LETTER_ACTIONS];
  }
  if (wantsResume) return RESUME_ACTIONS;
  if (wantsCover) return COVER_LETTER_ACTIONS;
  return undefined;
}

function scoreMatch(query: string, entry: FaqEntry): number {
  let score = 0;
  for (const keyword of entry.keywords) {
    if (query.includes(keyword)) {
      score += keyword.length >= 5 ? 3 : keyword.length >= 3 ? 2 : 1;
    }
  }
  return score;
}

export function askPortfolioAssistant(question: string): AssistantReply {
  const query = question.toLowerCase().trim().replace(/[^\w\s+.-]/g, " ");

  if (!query) {
    return { answer: FALLBACK_ANSWER, suggestions: DEFAULT_SUGGESTIONS };
  }

  let bestScore = 0;
  let bestEntry: FaqEntry | null = null;

  for (const entry of FAQ_ENTRIES) {
    const score = scoreMatch(query, entry);
    if (score > bestScore) {
      bestScore = score;
      bestEntry = entry;
    }
  }

  if (!bestEntry || bestScore === 0) {
    const docActions = detectDocumentActions(query);
    if (docActions) {
      const answer = docActions.length > 2
        ? `Here's the resume and cover letter — download the PDF or view in the portfolio.`
        : docActions[0].label.includes("Resume")
          ? `Here's ${PROFILE.name}'s resume — download the PDF or view in the portfolio.`
          : `Here's the cover letter — download the PDF or view in the portfolio.`;
      return { answer, suggestions: DEFAULT_SUGGESTIONS.slice(0, 3), actions: docActions };
    }
    return { answer: FALLBACK_ANSWER, suggestions: DEFAULT_SUGGESTIONS };
  }

  const suggestions = DEFAULT_SUGGESTIONS.filter(
    (s) => s.toLowerCase() !== question.toLowerCase().trim()
  ).slice(0, 3);

  const docActions = detectDocumentActions(query);
  const actions = bestEntry.actions ?? docActions;

  return { answer: bestEntry.answer, suggestions, actions };
}

export const ASSISTANT_GREETING = `Hi! I'm MFA's portfolio assistant — ask about experience, projects, skills, AI work, or how to hire Muhammad Ferasat Ali.`;

export const ASSISTANT_SUGGESTIONS = DEFAULT_SUGGESTIONS;
