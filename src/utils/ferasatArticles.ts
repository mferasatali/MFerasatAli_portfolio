import type { Article } from "@/interfaces/blog.interface";

export const FerasatArticles: Article[] = [
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
