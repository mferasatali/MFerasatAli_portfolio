export interface CaseStudy {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  projectType: string;
  isPrivate: boolean;
  stack: string[];
  role: string;
  client: string;
  overview: string;
  challenge: string;
  solution: string;
  impact: string[];
  highlights: string[];
  links: { name: string; url: string }[];
}

export const FerasatCaseStudies: CaseStudy[] = [
  {
    slug: "takafo-plus",
    title: "Takafo+",
    subtitle: "Mubadala Investment Company",
    date: "2024 – Present",
    projectType: "Enterprise · Private",
    isPrivate: true,
    client: "Mubadala Investment Company",
    role: "Senior Software Engineer — Full-Stack (Vue 3, Node.js)",
    stack: [
      "Vue 3",
      "Pinia",
      "Node.js",
      "PostgreSQL",
      "OpenAI API",
      "Azure MSAL",
      "WebSockets",
      "Heygen AI",
    ],
    overview:
      "Takafo+ is an AI-powered Human Capital Management platform serving Mubadala — spanning recruiting, CRM, onboarding, succession planning, talent marketplace, and Emiratization tracking across 11 modules and 30+ role-based personas.",
    challenge:
      "Deliver a multi-module HCM suite with complex approval chains, real-time notifications, enterprise SSO, and AI-assisted hiring — all while meeting strict security and UX standards for a sovereign wealth fund.",
    solution:
      "Architected Vue 3 frontends with Pinia state, composable-driven workflows, and Kanban-style task boards. Integrated Azure MSAL + B2C authentication, WebSocket live updates, OpenAI candidate scoring, and Heygen AI avatar interviews with server-side prompt validation.",
    impact: [
      "11 HCM modules live across 30+ user roles",
      "AI candidate matching and VIP CV analysis in production",
      "Real-time WebSocket notifications at enterprise scale",
      "Azure SSO for thousands of UAE government & corporate users",
    ],
    highlights: [
      "Multi-level approval workflows & 9-box talent mapping",
      "Heygen live-avatar AI interview integration",
      "OpenAI-powered candidate scoring pipelines",
      "Emiratization tracking & succession planning modules",
    ],
    links: [],
  },
  {
    slug: "qudra-tech",
    title: "Qudra Tech",
    subtitle: "AI Assessment Platform",
    date: "2023 – Present",
    projectType: "Enterprise · Private",
    isPrivate: true,
    client: "UAE Enterprise · G42 Ecosystem",
    role: "Full-Stack Engineer — Vue.js, Node.js, OpenAI",
    stack: ["Vue.js", "Node.js", "OpenAI API", "PostgreSQL", "WebSockets"],
    overview:
      "AI-powered candidate assessment platform with timed test environments, automated question generation, and live exam monitoring for high-stakes enterprise hiring.",
    challenge:
      "Build a secure, timed assessment environment where questions are AI-generated, sessions are tamper-resistant, and proctors can resolve live issues during exams without compromising integrity.",
    solution:
      "Vue.js assessment UI with strict session timers and lock-down flows. Node.js backend with OpenAI question generation, automated scoring pipelines, and real-time monitoring dashboards for live issue resolution.",
    impact: [
      "Automated AI question generation at scale",
      "AI-driven scoring reducing manual evaluation time",
      "Session security for high-stakes enterprise exams",
      "Live monitoring with real-time incident response",
    ],
    highlights: [
      "Timed test environments with session integrity",
      "OpenAI API integration for Q&A generation",
      "Automated evaluation & scoring engine",
      "Proctor dashboard for live exam oversight",
    ],
    links: [],
  },
  {
    slug: "ai-avatars",
    title: "AI Avatars",
    subtitle: "Recruitment Workflows",
    date: "2023 – Present",
    projectType: "Enterprise · Private",
    isPrivate: true,
    client: "Inception - IBHC · UAE Clients",
    role: "Full-Stack Engineer — Vue.js, Heygen, OpenAI",
    stack: ["Vue.js", "Heygen API", "OpenAI", "Node.js"],
    overview:
      "Interactive AI avatar interview experience embedded in enterprise recruitment workflows — enabling human-like candidate screening at scale without scheduling bottlenecks.",
    challenge:
      "Integrate real-time AI avatars into existing hiring pipelines while maintaining conversational quality, low latency, and structured evaluation outputs for recruiters.",
    solution:
      "Built Vue.js interview flows wired to Heygen live-avatar API and OpenAI conversational intelligence. Structured prompt engineering on the server ensures consistent, auditable screening sessions.",
    impact: [
      "Automated first-round screening at scale",
      "Reduced recruiter scheduling overhead",
      "Structured AI interview outputs for hiring teams",
      "Production-grade avatar experience in enterprise HCM",
    ],
    highlights: [
      "Heygen API live-avatar integration",
      "OpenAI-driven conversational intelligence",
      "Embedded in end-to-end recruitment workflows",
      "Server-side prompt validation & session logging",
    ],
    links: [],
  },
  {
    slug: "invoice-generator",
    title: "Invoice Generator",
    subtitle: "Open Source",
    date: "2023",
    projectType: "Open Source · Public",
    isPrivate: false,
    client: "Personal · Open Source",
    role: "Creator — Vue 3, Pinia, Tailwind CSS",
    stack: ["Vue 3", "Pinia", "Tailwind CSS", "jsPDF"],
    overview:
      "Browser-based invoice builder with real-time preview, multi-currency support, and PDF export — built as a lightweight open-source tool for freelancers and small businesses.",
    challenge:
      "Create a zero-backend invoice tool that feels professional, works offline-friendly via local storage, and exports clean PDFs without server dependencies.",
    solution:
      "Vue 3 + Pinia SPA with reactive form state, live invoice preview, currency switching, and client-side PDF generation. Data persists in localStorage for returning users.",
    impact: [
      "Fully client-side — no backend required",
      "Real-time preview with PDF export",
      "Multi-currency invoice support",
      "Open-source on GitHub for community use",
    ],
    highlights: [
      "Pinia state management for invoice data",
      "Tailwind CSS polished UI",
      "Local-storage persistence",
      "One-click PDF download",
    ],
    links: [
      {
        name: "GitHub",
        url: "https://github.com/mferasatali/invoice_generated",
      },
    ],
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return FerasatCaseStudies.find((c) => c.slug === slug);
}

export function getCaseStudySlugs(): string[] {
  return FerasatCaseStudies.map((c) => c.slug);
}
