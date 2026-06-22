import type { Article } from "@/interfaces/blog.interface";

export const FerasatArticles: Article[] = [
  {
    slug: "succession-planning-enterprise-hcm",
    title: "Building Succession Planning for Enterprise HCM",
    excerpt:
      "How we shipped cycle-based critical-role identification, AI successor matching, 9-box mapping, and multi-level approvals inside Takafo+ for Mubadala-scale talent continuity.",
    date: "2026-06-22",
    readTime: 10,
    tags: ["Vue 3", "Enterprise", "Succession Planning", "Takafo+"],
    category: "Architecture",
    featured: true,
    blocks: [
      {
        type: "paragraph",
        content:
          "Succession planning is not a spreadsheet exercise — it is how a sovereign wealth fund answers a simple question before a critical leader leaves: who is ready, who is developing, and where are we exposed? On Takafo+, we built a full succession module inside an 11-module HCM platform, serving Talent Managers, Talent Partners, and Chiefs across Mubadala's ecosystem.",
      },
      {
        type: "heading",
        content: "Why succession planning matters",
        level: 2,
      },
      {
        type: "paragraph",
        content:
          "When a role carries high business impact, scarce skills, or a retiring incumbent, ad-hoc replacements are expensive and risky. Structured succession planning reduces leadership gaps, protects institutional knowledge, and gives boards visibility into bench strength — broken down by platform, unit, grade, flight risk, and readiness.",
      },
      {
        type: "list",
        items: [
          "Continuity — critical roles always have named successors or documented justification when they do not.",
          "Readiness — successors are tagged Ready Now, Ready in 1 Year, or Ready in 2 Years so development spend matches reality.",
          "Risk visibility — flight risk of incumbents and successors surfaces on dashboards before attrition happens.",
          "Governance — multi-level approval chains (Talent Partner → Chief) with audit trails for regulated environments.",
        ],
      },
      {
        type: "heading",
        content: "What we built: the cycle workflow",
        level: 2,
      },
      {
        type: "paragraph",
        content:
          "Everything runs inside a succession cycle — a time-boxed period with configurable grades, start/end dates, and status (Active or Concluded). Talent Managers launch cycles from the dashboard; once active, the organization moves through a four-step pipeline we implemented in Vue 3 with Pinia state.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Critical Roles Identification — review all positions, mark roles as critical with justification, and score criticality from business impact, skill uniqueness, and talent scarcity.",
          "Review Critical Roles — validate the critical-role list with filters across platform, unit, grade, 9-box assignment, flight risk, and mapping status.",
          "Map Successors — nominate successors per role with readiness level, interim/emergency flag, and written justification; compare incumbent vs successor vs job description.",
          "Review & Submit — Talent Partners and Chiefs approve, reject, or return plans for correction with threaded comments.",
        ],
      },
      {
        type: "heading",
        content: "9-box mapping and AI-proposed successors",
        level: 2,
      },
      {
        type: "paragraph",
        content:
          "Performance and potential live in a configurable 9-box template — each box has title, focus area, and percentage bands. When mapping successors, we do not rely on gut feel alone. A weighted matching algorithm scores candidates on box placement, alpha competencies, grade fit, JD/CV alignment, performance history, MIC experience, sector experience, and Fusion functional skills.",
      },
      {
        type: "paragraph",
        content:
          "Talent Managers tune parameter weights in Succession Configuration (must total 100%) and can trigger a full AI re-mapping run across every critical role in the cycle. Each proposed successor gets a breakdown — matched skills, gaps, additional skills, and an overall matching score — so humans nominate with evidence, not guesses.",
      },
      {
        type: "heading",
        content: "Dashboards that executives actually use",
        level: 2,
      },
      {
        type: "paragraph",
        content:
          "The succession dashboard tracks identified critical roles, mapped successors, Ready Now count, and development plans. Drill-down analytics cover critical roles without successors, emergency successor coverage, incumbents near retirement, successor demographics, grade gaps, and distribution by platform and unit — all exportable to Excel or PDF for board packs.",
      },
      {
        type: "heading",
        content: "Frontend architecture choices",
        level: 2,
      },
      {
        type: "list",
        items: [
          "Pinia store centralizes cycle context, selected critical role, and filter payloads shared across pipeline steps.",
          "Role-based nav (Talent Manager, Talent Partner, Chief) gates configuration vs approval screens.",
          "Heavy filter sidebar serializes to typed API payloads — eq, range, in, contains — for server-side pagination.",
          "Successor comparison views render JD, incumbent, and successor side-by-side with competency gap highlighting.",
          "Concluded cycles become read-only; audit logs capture every action with user, page, and category.",
        ],
      },
      {
        type: "paragraph",
        content:
          "Succession planning in enterprise HCM is a workflow product as much as a data product. The win is not a prettier org chart — it is giving talent leaders a repeatable cycle, defensible AI-assisted matching, and approval governance that survives scrutiny when a C-suite seat opens unexpectedly.",
      },
    ],
  },
  {
    slug: "vip-referral-priority-hiring-pipeline",
    title: "VIP Referral: Priority Hiring for Stakeholder Candidates",
    excerpt:
      "The concept behind VIP Referral in Takafo+, how stakeholder referrals get a dedicated Kanban pipeline, and how we wired AI job matching into the CV carousel.",
    date: "2026-06-20",
    readTime: 9,
    tags: ["Vue 3", "VIP Referral", "AI Matching", "Recruiting"],
    category: "AI",
    featured: true,
    blocks: [
      {
        type: "paragraph",
        content:
          "Not every candidate enters through a public job board. In large UAE enterprises, senior leaders and stakeholders regularly refer high-calibre profiles — often with an expectation of white-glove handling. VIP Referral is the dedicated module we built in Takafo+ to treat those candidates differently from standard applicants without breaking compliance or audit requirements.",
      },
      {
        type: "heading",
        content: "The concept: why VIP Referral exists",
        level: 2,
      },
      {
        type: "paragraph",
        content:
          "A VIP referral is a candidate introduced through a trusted channel — board member, executive sponsor, government partner, or internal stakeholder — with explicit priority and provenance. The business goal is speed and visibility: recruiters must screen fast, keep referrers informed, and route the candidate to the right opportunities without losing them in a generic ATS queue.",
      },
      {
        type: "list",
        items: [
          "Provenance — every referral records source, priority, and referrer context for reporting.",
          "Priority handling — High/Medium/Low priority drives recruiter attention and SLA expectations.",
          "Separate pipeline — Kanban stages tuned to VIP lifecycle, not standard job-application statuses.",
          "AI-assisted placement — CV carousel surfaces AI-matched internal job opportunities with scoring.",
          "Closed-loop feedback — exploratory interviews, documentation, offers, and close-out tracked end-to-end.",
        ],
      },
      {
        type: "heading",
        content: "What we implemented",
        level: 2,
      },
      {
        type: "heading",
        content: "Referral intake",
        level: 3,
      },
      {
        type: "paragraph",
        content:
          "Stakeholders and recruiters create referrals via a structured form: name, email, phone, referral source, priority, optional CV upload, and comments. Duplicate detection prompts confirmation before re-referring an existing profile. CVs parse into the candidate record so recruiters start with structured data, not a raw attachment.",
      },
      {
        type: "heading",
        content: "Kanban by stage and by source",
        level: 3,
      },
      {
        type: "paragraph",
        content:
          "The workspace supports two views. View by Stage shows columns aligned to the VIP lifecycle — All Active, Pending Screen, Pending Feedback, Pending Offer, 60 Days+, Started, Pending Close Out, and Closed Out — with live status counts from the API. View by Source groups referrals by referral channel so talent teams see which stakeholder pipelines are hottest.",
      },
      {
        type: "heading",
        content: "Qualify Referral workflow",
        level: 3,
      },
      {
        type: "paragraph",
        content:
          "Once a referral is active, recruiters enter a Qualify Referral hub — a checklist of actions: prescreen form, exploratory interview (including HM exploratory for hiring-manager-led intros), documentation collection, interview scheduling (single or multiple rounds), online assessment, and recruiter summary. Each action shows confirmation status, reschedule reasons, and timestamps so nothing stalls silently.",
      },
      {
        type: "heading",
        content: "CV carousel and AI-matched opportunities",
        level: 3,
      },
      {
        type: "paragraph",
        content:
          "This is where VIP Referral connects to AI. The CV carousel lets recruiters browse open roles against the candidate profile. AI-matched opportunities rank jobs by fit; selecting a role opens a matching analysis breakdown — skills matched, gaps, and role-specific scoring — before the recruiter shortlists or progresses the candidate. Feedback from interviewers rolls into a structured summary card with overall averages and per-interviewer notes.",
      },
      {
        type: "heading",
        content: "Integration with core recruiting",
        level: 2,
      },
      {
        type: "paragraph",
        content:
          "VIP referrals are not an island. They link into standard sourcing views — recruiters can open a referral from job requisitions, view candidate details against a job, and pull communication history in one place. Hiring managers see exploratory interview entry points from their workspace. The static VIP row on open JR lists gives HMs a one-click path into exploratory flows.",
      },
      {
        type: "heading",
        content: "Technical notes from the Vue 3 build",
        level: 2,
      },
      {
        type: "list",
        items: [
          "Dedicated Pinia store and actions module for referral CRUD, status counts, and candidate details.",
          "Tab → API status key mapping keeps Kanban columns in sync with backend state machines.",
          "Enums drive column definitions for active vs closed-out stages — single source of truth for workspace rendering.",
          "Reusable VIP card components with comments drawer, role dropdown, and three-dot actions per stage.",
          "Qualify Referral uses action lists driven by API state — UI only renders steps relevant to current status.",
        ],
      },
      {
        type: "paragraph",
        content:
          "VIP Referral is ultimately about respect for the referral channel. Stakeholders trust the organization with a name; the product must return visibility, speed, and evidence that the candidate was handled properly — from first screen through offer, 60-day check-in, and close-out.",
      },
    ],
  },
  {
    slug: "crm-talent-pools-enterprise-recruiting",
    title: "CRM in Enterprise Recruiting: Talent Pools and Candidate Relationships",
    excerpt:
      "How we implemented Candidate Relationship Management inside Takafo+ — talent pools, applicant vs alumni modes, bulk outreach, and a 360° candidate profile for recruiters.",
    date: "2026-06-18",
    readTime: 8,
    tags: ["Vue 3", "CRM", "Recruiting", "Talent Pools"],
    category: "Vue",
    featured: true,
    blocks: [
      {
        type: "paragraph",
        content:
          "Recruiting CRM is not sales CRM with a different skin. In Takafo+, CRM means owning the long-term relationship with candidates and alumni — before, during, and after a hire — so talent teams can search, segment, nurture, and redeploy people without starting from zero every time a requisition opens.",
      },
      {
        type: "heading",
        content: "Core CRM concepts we applied",
        level: 2,
      },
      {
        type: "list",
        items: [
          "Single candidate record — one profile aggregating CV, documents, communication history, and recruiter actions.",
          "Talent pools — curated lists (by skill, campaign, event, or business unit) that recruiters own and share.",
          "Segmentation — filters on nationality, UAE national status, career level, function, location, experience, tags, and keywords.",
          "Engagement history — every email, invite, and touchpoint logged against the candidate for compliance and continuity.",
          "Alumni track — former employees treated as a separate entity type with the same CRM tooling as active applicants.",
        ],
      },
      {
        type: "heading",
        content: "The CRM workspace",
        level: 2,
      },
      {
        type: "paragraph",
        content:
          "Recruiters land on a split layout: a filter panel on the left and a paginated candidate listing on the right. A toggle switches between Candidate (applicant) and Alumni mode — same UX, different API entity type. When candidates are selected, bulk actions appear: add to talent pool, send email, invite to apply, assign recruiters, or remove from pool.",
      },
      {
        type: "heading",
        content: "Talent pools",
        level: 2,
      },
      {
        type: "paragraph",
        content:
          "Pools are the organizing unit. Recruiters create pools with name, tags, status (open/private), assigned recruiters, and type (applicant or alumni). From sourcing or CRM, they add individuals or bulk-select candidates into a pool. View All Pools shows every pool with filters; drilling in loads pool members with the same search/filter engine as the main workspace.",
      },
      {
        type: "heading",
        content: "Candidate 360° profile",
        level: 2,
      },
      {
        type: "paragraph",
        content:
          "Clicking a candidate opens a detail view with tabbed sections: overview (contact, nationality, career level, flags), embedded CV viewer, document collections, communication history, and CRM action history tied to jobs they were considered for. Recruiters can send email from the profile, add the person to a pool, or jump to their status on an active requisition — all without leaving CRM.",
      },
      {
        type: "heading",
        content: "How CRM connects to recruiting",
        level: 2,
      },
      {
        type: "list",
        items: [
          "Sourcing screens embed Add to Talent Pool — recruiters tag strong runners-up during live shortlisting.",
          "Offer-pending views link back to CRM candidate details for full history during negotiation.",
          "Broadcast messaging sends templated outreach to multiple applicants at once with audit metadata.",
          "Dynamic filter config drives the sidebar — fields change between applicant and alumni without duplicate components.",
        ],
      },
      {
        type: "heading",
        content: "Implementation patterns",
        level: 2,
      },
      {
        type: "paragraph",
        content:
          "We kept CRM modular: a Pinia candidate-pools store, typed interfaces for pool creation and filter payloads, and a crm.actions layer wrapping API calls. The listing component is entity-agnostic — getCrmItems() maps applicant vs alumni API shapes into one card format. Dialogs (create pool, custom talent pool, email) are shared between workspace and candidate detail routes.",
      },
      {
        type: "code",
        language: "typescript",
        content: `// Filter payload shape recruiters build in the sidebar
interface GetCandidate {
  offset: number;
  limit: number;
  searchQuery?: string;
  selectedTags?: string[];
  selection?: {
    function?: string;
    location?: string;
    careerLevel?: string;
    uae_national?: boolean;
    nationality?: string[];
  };
  yearsOfExperience?: { minYearsOfExperience?: number; maxYearsOfExperience?: number };
  type?: 'applicant' | 'alumni';
}`,
      },
      {
        type: "paragraph",
        content:
          "Good recruiting CRM reduces duplicate work. When a senior role reopens six months later, the team should already know who was silver-medalist last time, who responded to outreach, and who is UAE national with the right career level — searchable in seconds, not rediscovered through LinkedIn scrolling.",
      },
    ],
  },
  {
    slug: "openai-in-production-vue3",
    title: "Integrating OpenAI in Production Vue 3 Apps",
    excerpt:
      "Patterns I use for AI scoring, candidate matching, and safe prompt handling in enterprise Vue 3 frontends — lessons from Takafo+ and Qudra.",
    date: "2026-03-12",
    readTime: 7,
    tags: ["Vue 3", "OpenAI", "Enterprise", "AI"],
    category: "AI",
    featured: true,
    blocks: [
      {
        type: "paragraph",
        content:
          "Shipping LLM features in a Vue 3 enterprise app is less about calling an API and more about designing boundaries: where prompts live, how responses are validated, and what happens when the model hallucinates under load.",
      },
      {
        type: "heading",
        content: "Keep AI logic on the server",
        level: 2,
      },
      {
        type: "paragraph",
        content:
          "Never expose API keys in the browser. In production systems like Takafo+ and Qudra, Vue components only send structured input (candidate ID, assessment session, user role). NestJS services own prompt templates, token limits, retries, and logging.",
      },
      {
        type: "list",
        items: [
          "Composable `useAiScore()` fetches normalized scores — not raw model text.",
          "Server validates JSON shape before the UI renders anything.",
          "Rate limiting and role checks run before any OpenAI call.",
        ],
      },
      {
        type: "heading",
        content: "Composable pattern in Vue 3",
        level: 2,
      },
      {
        type: "code",
        language: "typescript",
        content: `// composables/useAiEvaluation.ts
export function useAiEvaluation() {
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function evaluate(sessionId: string) {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await api.post('/ai/evaluate', { sessionId });
      return data; // { score, summary, flags }
    } catch (e) {
      error.value = 'Evaluation unavailable. Try again.';
      return null;
    } finally {
      loading.value = false;
    }
  }

  return { loading, error, evaluate };
}`,
      },
      {
        type: "heading",
        content: "UX when AI is slow or wrong",
        level: 2,
      },
      {
        type: "paragraph",
        content:
          "Users in HR and assessment flows need clarity, not magic. Show skeleton states, partial results, and a human fallback path. Cache stable summaries per entity so repeat views do not re-hit the model. Log prompt version + model name for audit trails in regulated environments.",
      },
      {
        type: "paragraph",
        content:
          "The goal is not “AI everywhere” — it is reliable augmentation. Start with one high-value workflow, measure latency and accuracy, then expand.",
      },
    ],
  },
  {
    slug: "azure-msal-sso-vue-enterprise",
    title: "Enterprise SSO with Azure MSAL in Vue",
    excerpt:
      "How I wire Azure AD / B2C authentication into large Vue apps with route guards, token refresh, and multi-tenant role mapping.",
    date: "2026-02-04",
    readTime: 6,
    tags: ["Vue", "Azure", "SSO", "Security"],
    category: "Architecture",
    featured: true,
    blocks: [
      {
        type: "paragraph",
        content:
          "Enterprise clients expect SSO — not another password form. For platforms serving Mubadala, G42, and government entities, Azure MSAL + B2C is the standard. The hard part is fitting that into Vue Router without leaking tokens or breaking deep links.",
      },
      {
        type: "heading",
        content: "Auth as a Pinia store + router guard",
        level: 2,
      },
      {
        type: "paragraph",
        content:
          "I centralize MSAL in a dedicated auth store: login redirect, silent token acquisition, logout, and account selection. Router `beforeEach` checks authentication and role claims before any lazy-loaded chunk runs.",
      },
      {
        type: "list",
        items: [
          "Public routes: login callback, password reset, legal pages.",
          "Protected routes: require valid access token + app role.",
          "Admin routes: extra claim check (e.g. `TalentAdmin`).",
        ],
      },
      {
        type: "heading",
        content: "Token refresh without tearing down the UI",
        level: 2,
      },
      {
        type: "paragraph",
        content:
          "Use MSAL’s `acquireTokenSilent` in an Axios interceptor. On 401, attempt one silent refresh; if it fails, redirect to login with `returnUrl` preserved. Avoid storing tokens in localStorage when possible — sessionStorage or memory + refresh is safer for shared machines.",
      },
      {
        type: "heading",
        content: "Mapping Azure groups to app roles",
        level: 2,
      },
      {
        type: "paragraph",
        content:
          "Azure groups rarely not match your Vue permission names. Backend should map claims to a flat role list the frontend consumes. Frontend only checks roles — never parses raw JWT payloads in components. Keeps RBAC consistent across 30+ user types in HCM platforms.",
      },
    ],
  },
  {
    slug: "nestjs-rest-api-at-scale",
    title: "NestJS REST APIs That Stay Fast Under Load",
    excerpt:
      "Indexing, DTO validation, and caching patterns I applied while cutting API latency on PostgreSQL-backed enterprise services.",
    date: "2026-01-18",
    readTime: 8,
    tags: ["NestJS", "PostgreSQL", "Performance", "Node.js"],
    category: "Backend",
    featured: true,
    blocks: [
      {
        type: "paragraph",
        content:
          "When a dashboard aggregates hires, assessments, and referrals, slow endpoints show up as angry Slack messages — not Grafana alerts. These are the backend habits that actually moved the needle on response times.",
      },
      {
        type: "heading",
        content: "Validate at the edge with DTOs",
        level: 2,
      },
      {
        type: "paragraph",
        content:
          "class-validator + ValidationPipe on every controller. Fail fast with 400 and structured errors. Prevents bad queries from reaching the database and makes frontend forms easier to wire.",
      },
      {
        type: "heading",
        content: "PostgreSQL: index for how you filter",
        level: 2,
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Log slow queries in staging with `log_min_duration_statement`.",
          "Add composite indexes matching `WHERE` + `ORDER BY` (not single-column guesses).",
          "Replace N+1 loops with joins or DataLoader-style batching.",
          "Paginate everything list-shaped — default page size 25, hard cap 100.",
        ],
      },
      {
        type: "heading",
        content: "Cache the boring reads",
        level: 2,
      },
      {
        type: "paragraph",
        content:
          "Redis for reference data, user permission snapshots, and dashboard tiles with TTL. Invalidate on write — not on a cron prayer. For read-heavy reporting endpoints, materialized views or nightly aggregates beat live joins across millions of rows.",
      },
      {
        type: "code",
        language: "typescript",
        content: `@Get('candidates')
@UseInterceptors(CacheInterceptor)
@CacheKey('candidates:list:#{query.page}')
@CacheTTL(60)
async list(@Query() query: ListCandidatesDto) {
  return this.service.findPaginated(query);
}`,
      },
      {
        type: "paragraph",
        content:
          "Measure before and after every change. p95 latency and error rate matter more than average response time — especially when HR teams run bulk actions at month end.",
      },
    ],
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return FerasatArticles.find((a) => a.slug === slug);
}

export function getFeaturedArticles(limit = 3): Article[] {
  return [...FerasatArticles]
    .filter((a) => a.featured)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, limit);
}

export function formatArticleDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export const CATEGORY_COLORS: Record<Article["category"], string> = {
  Vue: "var(--color-badge-frontend)",
  AI: "var(--color-badge-ai)",
  Backend: "var(--color-badge-backend)",
  Architecture: "var(--color-badge-cloud)",
};
