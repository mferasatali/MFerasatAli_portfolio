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
  /** Proof strip under the title */
  metrics?: { value: string; label: string }[];
  /** Engineering decisions that show judgment */
  decisions?: { title: string; detail: string }[];
  /** Explicit tradeoffs / what was deferred */
  tradeoffs?: string[];
  /** Privacy / walkthrough note for restricted work */
  privateNote?: string;
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
    role: "Software Engineer — Full-Stack (Vue 3, Node.js)",
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
      "Deliver a multi-module HCM suite with complex approval chains, real-time notifications, enterprise SSO, and AI-assisted hiring — all while meeting strict security and UX standards for a sovereign wealth fund. The product had to feel coherent across 30+ personas without turning into 11 disconnected apps.",
    solution:
      "Shipped Vue 3 + Pinia frontends with composable-driven workflows and Kanban-style task boards. Wired Azure MSAL + B2C SSO, WebSocket live updates, OpenAI candidate scoring, and Heygen AI avatar interviews — with prompt validation and auditability on the server so AI features stayed production-safe.",
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
    metrics: [
      { value: "11", label: "HCM modules in production" },
      { value: "30+", label: "Role-based personas" },
      { value: "SSO", label: "Azure MSAL / B2C enterprise auth" },
      { value: "AI", label: "Scoring · VIP CV · avatar interviews" },
    ],
    decisions: [
      {
        title: "Composable workflow engine over one-off screens",
        detail:
          "Approval chains and Kanban boards share the same building blocks so new modules don’t invent parallel UX patterns.",
      },
      {
        title: "Server-side AI validation",
        detail:
          "OpenAI / Heygen prompts and outputs are validated on the API layer — keeps screening auditable and reduces client-side prompt leakage.",
      },
      {
        title: "Realtime as a first-class path",
        detail:
          "WebSockets carry notifications and live hiring signals so recruiters don’t refresh dashboards during active pipelines.",
      },
      {
        title: "Persona-first navigation",
        detail:
          "Shell and permissions are driven by role — critical when the same platform must serve VIP stakeholders and ops admins cleanly.",
      },
    ],
    tradeoffs: [
      "Public demos and screenshots are restricted — architecture + metrics published instead of product UI.",
      "Deep module breadth over early mobile parity — enterprise desktop workflows came first.",
      "AI features gated behind structured prompts rather than free-form chat everywhere — safer for hiring decisions.",
    ],
    privateNote:
      "UI and proprietary data stay private. This page documents problem framing, architecture, decisions, and outcomes. Happy to do a redacted walkthrough on a call.",
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
      "High-stakes enterprise exams needed secure timers, AI-authored questions, and live proctoring — without letting candidates tamper with sessions or forcing humans to score every answer manually.",
    solution:
      "Vue assessment client with strict session timers and lock-down flows. Node backend generates questions via OpenAI, scores responses, and streams proctor events over WebSockets so issues can be resolved live.",
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
    metrics: [
      { value: "AI", label: "Question generation pipeline" },
      { value: "Live", label: "Proctor + incident WebSockets" },
      { value: "Timed", label: "Tamper-resistant sessions" },
      { value: "Auto", label: "Scoring for evaluator speed" },
    ],
    decisions: [
      {
        title: "Server-owned question generation",
        detail:
          "OpenAI prompts stay on the API — clients only receive the active item set, which reduces prompt leakage and keeps generation auditable.",
      },
      {
        title: "Hard session timers in the client + server clocks",
        detail:
          "UI timers are UX; authoritative expiry lives server-side so refreshing doesn’t reset a high-stakes exam.",
      },
      {
        title: "Realtime proctor channel",
        detail:
          "WebSockets carry incidents and status so proctors don’t poll — critical when dozens of candidates sit at once.",
      },
      {
        title: "Structured scoring outputs",
        detail:
          "Model answers are normalized into scoring fields recruiters can review, not free-form chat logs.",
      },
    ],
    tradeoffs: [
      "UI and exam content stay private — architecture and outcomes are documented here instead of a public demo.",
      "Strict lock-down UX over a freer exam experience — integrity mattered more than flexibility.",
      "AI generation assists bank creation; humans still own final answer keys for sensitive roles.",
    ],
    privateNote:
      "Assessment UI and question banks are confidential. This page covers problem framing, decisions, and production impact. Walkthrough available on request.",
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
      "First-round screening didn’t scale: scheduling blocked throughput, while recruiters still needed structured, comparable outputs — not random chatbot transcripts.",
    solution:
      "Vue interview flows wired to Heygen live avatars and OpenAI conversation logic. Server-side prompt validation and session logging keep screening consistent and reviewable inside the hiring pipeline.",
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
    metrics: [
      { value: "Live", label: "Heygen avatar interviews" },
      { value: "LLM", label: "Structured screening dialogue" },
      { value: "HCM", label: "Embedded in hiring workflows" },
      { value: "Audit", label: "Server prompt validation" },
    ],
    decisions: [
      {
        title: "Avatar as a pipeline step, not a toy demo",
        detail:
          "Sessions start/end inside recruiting workflows so outputs land where recruiters already work.",
      },
      {
        title: "Server-side prompt contracts",
        detail:
          "Conversation goals and evaluation rubrics are enforced on the API — keeps sessions consistent across candidates.",
      },
      {
        title: "Structured outputs over free chat",
        detail:
          "Recruiters get signal they can compare (scores / summaries), not walls of dialogue.",
      },
      {
        title: "Latency-aware UX",
        detail:
          "UI states expect avatar/network lag — clearer waits beat a brittle “always instant” illusion.",
      },
    ],
    tradeoffs: [
      "Private client integrations — no public demo of the avatar session UI.",
      "First-round automation only — final interviews stay human.",
      "Higher integration complexity than a standalone chatbot, in exchange for pipeline fit.",
    ],
    privateNote:
      "Avatar session UI and vendor configs are private. Architecture, decisions, and outcomes are documented for hiring conversations.",
    links: [],
  },
  {
    slug: "dialect-ai",
    title: "Dialect AI",
    subtitle: "Universal Multi-Database Studio & Schema RAG",
    date: "2026",
    projectType: "Personal Product · In Progress",
    isPrivate: false,
    client: "Personal product",
    role: "Creator — Full-Stack (Vue 3, Fastify, RAG)",
    stack: [
      "Vue 3",
      "Pinia",
      "Monaco",
      "Fastify",
      "PostgreSQL",
      "pgvector",
      "Groq",
      "Supabase Auth",
      "DuckDB WASM",
      "sqlglot",
    ],
    overview:
      "Dialect AI is a universal multi-database SQL studio and schema RAG engine — connect Postgres, MySQL, or SQLite (plus local CSV via DuckDB WASM), explore schemas, run guarded queries, and ask natural language that becomes dialect-aware SQL. Public demo is not live yet; this case study documents the product vision, architecture, and what is already built.",
    challenge:
      "Engineers bounce between database GUIs, chatbots that dump entire schemas into prompts (and hit token limits), and fragile copy-paste across dialects. Large real schemas break naive NL2SQL; production connections need read-only safety; and teams often only have an exported Prisma/DDL file with no live DB from their laptop.",
    solution:
      "Built a monorepo studio + Fastify API around a shared SchemaGraph contract and DialectBackendAdapter. Vue 3 workbench (Monaco, results grid, ERD, AI copilot) talks to multi-dialect adapters. RAG uses local MiniLM embeddings + pgvector to prune relevant tables (with FK-neighbor expansion and token-budget clamps) before Groq NL2SQL. Offline schema mode, dialect transpile via sqlglot, golden queries, Supabase Auth with per-user scoping, and production safety guards are first-class.",
    impact: [
      "End-to-end studio verified against real Supabase data — connections, schema tree, guarded queries, AI generate/explain/fix",
      "RAG pruning survives large/hub-and-spoke schemas without Groq 413 token overruns",
      "Postgres + SQLite (+ DuckDB CSV) paths browser-verified; MySQL adapter built",
      "Offline schema workflow: import Prisma/DDL/JSON → AI-write SQL → copy out when the real DB is unreachable",
    ],
    highlights: [
      "SchemaGraph + multi-dialect backend router (Postgres / MySQL / SQLite)",
      "pgvector semantic table pruning + golden-query few-shot retrieval",
      "Production Safety Guard for read-only / write blocking",
      "Offline schema mode, ERD, saved queries, sqlglot dialect transpile",
      "Supabase Auth JWT verification + per-user connection ownership",
    ],
    metrics: [
      { value: "RAG", label: "Schema embeddings + prune + golden queries" },
      { value: "3+", label: "Live SQL dialects (+ DuckDB CSV)" },
      { value: "NL2SQL", label: "Generate · Explain · Fix via Groq" },
      { value: "Soon", label: "Public demo URL not published yet" },
    ],
    decisions: [
      {
        title: "SchemaGraph as the single contract",
        detail:
          "Adapters (live Postgres/MySQL/SQLite, Prisma, SQL DDL, JSON) all normalize to one graph so the studio, ERD, completions, and AI prompts never special-case engines.",
      },
      {
        title: "RAG prune before prompt — never dump the whole schema",
        detail:
          "Local MiniLM embeddings + pgvector rank tables, expand one FK hop, then clamp to a token budget. Unindexed connections fall back to in-process pruning instead of sending everything.",
      },
      {
        title: "Two AI providers for two jobs",
        detail:
          "Groq for chat NL2SQL; @xenova/transformers locally for embeddings (Groq has no embedding model) — no extra paid embedding API.",
      },
      {
        title: "Offline schema as a first-class mode",
        detail:
          "Import Prisma/DDL/JSON, generate SQL against the shape with no live DB, copy the query out — matches how people actually work behind VPNs.",
      },
      {
        title: "Safety before cleverness",
        detail:
          "Read-only connections and write-statement guards share one Production Safety Guard across dialects; AI rate limits and per-user ownership protect the API.",
      },
    ],
    tradeoffs: [
      "No public live URL yet — product is actively built; portfolio links to this case study + GitHub.",
      "MySQL adapter is implemented but not yet verified against a live MySQL instance.",
      "AI ghost-text on every keystroke deliberately skipped — explicit Generate/Explain/Fix keeps cost and control clearer.",
      "Adapter SDK packaging (Phase 7) and schema-diff → migration generator are still pending.",
    ],
    privateNote:
      "Public hosted demo is coming soon. Until then, this page is the source of truth for vision, stack, and shipped phases. Happy to walk through a local build on a call.",
    links: [
      {
        name: "GitHub",
        url: "https://github.com/mferasatali/dialect-ai",
      },
    ],
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
