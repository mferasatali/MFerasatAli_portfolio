<script setup lang="ts">
import { computed, watch, onMounted } from "vue";
import { useRoute, RouterLink } from "vue-router";
import { getCaseStudyBySlug } from "@/utils/ferasatCaseStudies";
import { CASE_STUDY_ARCHITECTURE, CALENDLY_URL } from "@/utils/ferasatRecruiter";
import TakafoArchitectureDiagram from "@/components/takafo/TakafoArchitectureDiagram.vue";
import TakafoArchitectureExplorer from "@/components/takafo/TakafoArchitectureExplorer.vue";
import { applyPageSeo } from "@/utils/siteSeo";
import { useLocalizedContent } from "@/composables/useLocalizedContent";

const route = useRoute();
const { localizeCaseStudyByLocale } = useLocalizedContent();

const study = computed(() => {
  const base = getCaseStudyBySlug(route.params.slug as string);
  return base ? localizeCaseStudyByLocale(base) : undefined;
});

const architecture = computed(() =>
  study.value ? CASE_STUDY_ARCHITECTURE[study.value.slug] : undefined
);

const isTakafo = computed(() => study.value?.slug === "takafo-plus");

watch(
  study,
  (value) => {
    if (value) {
      applyPageSeo({
        path: `/projects/${value.slug}`,
        title: `${value.title} — Case Study · Muhammad Ferasat Ali`,
        description: value.overview,
        type: "article",
      });
    }
  },
  { immediate: true }
);

onMounted(() => {
  window.scrollTo({ top: 0, behavior: "instant" });
});
</script>

<template>
  <div class="case-study-page">
    <header class="case-toolbar">
      <div class="toolbar-inner">
        <RouterLink to="/" class="toolbar-back">
          <v-icon size="small">mdi-arrow-left</v-icon>
          Portfolio
        </RouterLink>
        <div class="toolbar-actions">
          <RouterLink to="/#selected-work" class="toolbar-link">Selected work</RouterLink>
          <RouterLink to="/#projects" class="toolbar-link">
            <v-icon size="small">mdi-folder-outline</v-icon>
            All projects
          </RouterLink>
        </div>
      </div>
    </header>

    <article v-if="study" class="case-content" :class="{ 'is-flagship': isTakafo }">
      <span class="case-badge" :class="study.isPrivate ? 'private' : 'public'">
        {{ study.projectType }}
      </span>

      <h1 class="case-title">{{ study.title }}</h1>
      <p class="case-subtitle">{{ study.subtitle }}</p>

      <div class="case-meta">
        <span>{{ study.date }}</span>
        <span class="dot">·</span>
        <span>{{ study.client }}</span>
      </div>

      <div class="stack-row">
        <span v-for="tech in study.stack" :key="tech" class="stack-chip">{{ tech }}</span>
      </div>

      <p v-if="study.privateNote" class="private-note">
        <v-icon size="small">mdi-shield-lock-outline</v-icon>
        {{ study.privateNote }}
      </p>

      <div v-if="study.metrics?.length" class="metrics-grid">
        <div v-for="metric in study.metrics" :key="metric.label" class="metric-card">
          <span class="metric-value">{{ metric.value }}</span>
          <span class="metric-label">{{ metric.label }}</span>
        </div>
      </div>

      <section class="case-block">
        <h2>Overview</h2>
        <p>{{ study.overview }}</p>
      </section>

      <section class="case-block">
        <h2>My role</h2>
        <p>{{ study.role }}</p>
      </section>

      <div class="proof-grid">
        <section class="case-block proof-card">
          <h2>Challenge</h2>
          <p>{{ study.challenge }}</p>
        </section>
        <section class="case-block proof-card">
          <h2>Solution</h2>
          <p>{{ study.solution }}</p>
        </section>
      </div>

      <section v-if="isTakafo" class="case-block">
        <h2>Architecture diagram</h2>
        <p class="block-lead">
          Layered view of identity, Vue workflows, APIs, data, and AI — safe to share publicly.
        </p>
        <TakafoArchitectureDiagram />
      </section>

      <section v-else-if="architecture" class="case-block architecture-block">
        <h2>Architecture</h2>
        <p class="architecture-text">{{ architecture }}</p>
      </section>

      <section v-if="isTakafo" class="case-block">
        <h2>Explore the module map</h2>
        <p class="block-lead">
          Click modules to understand scope. Related articles unpack a few production surfaces.
        </p>
        <TakafoArchitectureExplorer />
      </section>

      <section v-if="study.decisions?.length" class="case-block">
        <h2>Key decisions</h2>
        <div class="decisions-grid">
          <article v-for="item in study.decisions" :key="item.title" class="decision-card">
            <h3>{{ item.title }}</h3>
            <p>{{ item.detail }}</p>
          </article>
        </div>
      </section>

      <section v-if="study.tradeoffs?.length" class="case-block">
        <h2>Tradeoffs</h2>
        <ul>
          <li v-for="(item, i) in study.tradeoffs" :key="i">{{ item }}</li>
        </ul>
      </section>

      <section class="case-block">
        <h2>Impact</h2>
        <ul class="impact-list">
          <li v-for="(item, i) in study.impact" :key="i">{{ item }}</li>
        </ul>
      </section>

      <section class="case-block">
        <h2>Key highlights</h2>
        <ul>
          <li v-for="(item, i) in study.highlights" :key="i">{{ item }}</li>
        </ul>
      </section>

      <div v-if="study.links.length" class="case-links">
        <a
          v-for="link in study.links"
          :key="link.url"
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer"
          class="case-link-btn"
        >
          <v-icon size="small">mdi-github</v-icon>
          {{ link.name }}
        </a>
      </div>

      <aside class="case-cta">
        <h2>Want the walkthrough?</h2>
        <p>
          I can walk through architecture, AI validation, and delivery tradeoffs in a 30-minute call —
          without exposing client UI.
        </p>
        <div class="cta-row">
          <a
            v-if="CALENDLY_URL"
            :href="CALENDLY_URL"
            target="_blank"
            rel="noopener noreferrer"
            class="case-link-btn"
          >
            <v-icon size="small">mdi-calendar</v-icon>
            Book 30 min
          </a>
          <RouterLink to="/#recruiters" class="case-link-btn secondary">
            Recruiter resources
          </RouterLink>
        </div>
      </aside>
    </article>

    <div v-else class="case-not-found">
      <h1>Case study not found</h1>
      <RouterLink to="/#projects">Back to projects</RouterLink>
    </div>
  </div>
</template>

<style scoped lang="scss">
.case-study-page {
  min-height: 100vh;
  background: var(--color-bg);
  color: var(--color-text);
}

.case-toolbar {
  position: sticky;
  top: 0;
  z-index: 50;
  background: var(--color-toolbar-bg);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--color-border);
}

.toolbar-inner {
  max-width: 920px;
  margin: 0 auto;
  padding: 0.875rem clamp(1rem, 4vw, 2rem);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.toolbar-actions {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.toolbar-back,
.toolbar-link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text-muted);
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: var(--color-primary-light);
  }
}

.case-content {
  max-width: 920px;
  margin: 0 auto;
  padding: clamp(2rem, 5vw, 4rem) clamp(1rem, 4vw, 2rem) 5rem;
}

.case-badge {
  display: inline-block;
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 0.25rem 0.625rem;
  border-radius: 999px;
  margin-bottom: 1rem;

  &.private {
    background: rgba(59, 130, 246, 0.15);
    border: 1px solid rgba(59, 130, 246, 0.35);
    color: var(--color-primary-light);
  }

  &.public {
    background: rgba(34, 197, 94, 0.15);
    border: 1px solid rgba(34, 197, 94, 0.35);
    color: var(--color-badge-public-text);
  }
}

.case-title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 5vw, 2.75rem);
  font-weight: 800;
  line-height: 1.15;
  margin-bottom: 0.5rem;
}

.case-subtitle {
  font-size: 1.125rem;
  color: var(--color-primary-light);
  margin-bottom: 0.75rem;
}

.case-meta {
  font-size: 0.875rem;
  color: var(--color-text-dim);
  margin-bottom: 1.25rem;

  .dot {
    margin: 0 0.35rem;
  }
}

.stack-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-bottom: 1.25rem;
}

.stack-chip {
  font-size: 0.6875rem;
  padding: 0.25rem 0.55rem;
  border-radius: 4px;
  background: var(--color-chip-bg);
  border: 1px solid var(--color-border);
  color: var(--color-text-muted);
}

.private-note {
  display: flex;
  gap: 0.5rem;
  align-items: flex-start;
  font-size: 0.875rem;
  line-height: 1.6;
  color: var(--color-text-muted);
  padding: 0.9rem 1rem;
  border-radius: var(--radius-md);
  border: 1px dashed rgba(59, 130, 246, 0.35);
  background: rgba(59, 130, 246, 0.06);
  margin-bottom: 1.75rem;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.75rem;
  margin-bottom: 2.5rem;
}

.metric-card {
  padding: 1rem 0.9rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  background: var(--color-chip-bg);
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.metric-value {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--color-primary-light);
  line-height: 1;
}

.metric-label {
  font-size: 0.75rem;
  color: var(--color-text-muted);
  line-height: 1.4;
}

.proof-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.proof-card {
  padding: 1.25rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  background: var(--color-chip-bg);
  margin-bottom: 1rem !important;
}

.block-lead {
  font-size: 0.9375rem;
  color: var(--color-text-dim);
  margin: -0.25rem 0 1rem !important;
}

.architecture-text {
  font-family: ui-monospace, monospace;
  font-size: 0.875rem;
  padding: 1rem;
  background: var(--color-chip-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  line-height: 1.6;
}

.decisions-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.85rem;
}

.decision-card {
  padding: 1.1rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  background: var(--color-surface);

  h3 {
    font-family: var(--font-display);
    font-size: 0.95rem;
    font-weight: 700;
    margin: 0 0 0.45rem;
    color: var(--color-text);
  }

  p {
    margin: 0;
    font-size: 0.875rem;
    line-height: 1.6;
    color: var(--color-text-muted);
  }
}

.case-block {
  margin-bottom: 2rem;

  h2 {
    font-family: var(--font-display);
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--color-text);
    margin-bottom: 0.75rem;
  }

  p {
    font-size: 1rem;
    line-height: 1.8;
    color: var(--color-text-muted);
    margin: 0;
  }

  ul {
    margin: 0;
    padding-left: 1.25rem;

    li {
      font-size: 0.9375rem;
      line-height: 1.75;
      color: var(--color-text-muted);
      margin-bottom: 0.4rem;

      &::marker {
        color: var(--color-primary);
      }
    }
  }
}

.impact-list li {
  font-weight: 500;
}

.case-links,
.cta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1rem;
}

.case-link-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.625rem 1.25rem;
  border-radius: var(--radius-md);
  background: rgba(59, 130, 246, 0.12);
  border: 1px solid rgba(59, 130, 246, 0.35);
  color: var(--color-primary-light);
  font-size: 0.875rem;
  font-weight: 600;
  text-decoration: none;

  &:hover {
    background: rgba(59, 130, 246, 0.2);
  }

  &.secondary {
    background: transparent;
    border-color: var(--color-border);
    color: var(--color-text-muted);

    &:hover {
      border-color: var(--color-primary);
      color: var(--color-primary-light);
    }
  }
}

.case-cta {
  margin-top: 2.5rem;
  padding: 1.5rem;
  border-radius: var(--radius-lg);
  border: 1px solid rgba(59, 130, 246, 0.3);
  background:
    radial-gradient(circle at top right, rgba(59, 130, 246, 0.14), transparent 50%),
    var(--color-chip-bg);

  h2 {
    font-family: var(--font-display);
    font-size: 1.2rem;
    font-weight: 700;
    margin: 0 0 0.5rem;
  }

  p {
    margin: 0;
    color: var(--color-text-muted);
    line-height: 1.65;
    font-size: 0.95rem;
  }
}

.case-not-found {
  max-width: 480px;
  margin: 6rem auto;
  text-align: center;

  a {
    color: var(--color-primary-light);
  }
}

@media (max-width: 800px) {
  .metrics-grid,
  .proof-grid,
  .decisions-grid {
    grid-template-columns: 1fr;
  }

  .toolbar-actions .toolbar-link:first-child {
    display: none;
  }
}
</style>

<style lang="scss">
@import "@/assets/scss/tokens.scss";
</style>
