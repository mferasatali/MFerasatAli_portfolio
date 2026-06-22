<script setup lang="ts">
import { computed, watch, onMounted } from "vue";
import { useRoute, RouterLink } from "vue-router";
import { getCaseStudyBySlug } from "@/utils/ferasatCaseStudies";
import { CASE_STUDY_ARCHITECTURE } from "@/utils/ferasatRecruiter";
import TakafoModuleMap from "@/components/recruiter/TakafoModuleMap.vue";
import { applyPageSeo } from "@/utils/siteSeo";

const route = useRoute();
const study = computed(() => getCaseStudyBySlug(route.params.slug as string));
const architecture = computed(() =>
  study.value ? CASE_STUDY_ARCHITECTURE[study.value.slug] : undefined
);

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
        <RouterLink to="/#projects" class="toolbar-link">
          <v-icon size="small">mdi-folder-outline</v-icon>
          All projects
        </RouterLink>
      </div>
    </header>

    <article v-if="study" class="case-content">
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

      <section class="case-block">
        <h2>Overview</h2>
        <p>{{ study.overview }}</p>
      </section>

      <section class="case-block">
        <h2>My role</h2>
        <p>{{ study.role }}</p>
      </section>

      <section v-if="architecture" class="case-block architecture-block">
        <h2>Architecture</h2>
        <p class="architecture-text">{{ architecture }}</p>
      </section>

      <TakafoModuleMap v-if="study.slug === 'takafo-plus'" />

      <section class="case-block">
        <h2>Challenge</h2>
        <p>{{ study.challenge }}</p>
      </section>

      <section class="case-block">
        <h2>Solution</h2>
        <p>{{ study.solution }}</p>
      </section>

      <section class="case-block">
        <h2>Impact</h2>
        <ul>
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
  max-width: 800px;
  margin: 0 auto;
  padding: 0.875rem clamp(1rem, 4vw, 2rem);
  display: flex;
  align-items: center;
  justify-content: space-between;
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
  max-width: 800px;
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
  margin-bottom: 2.5rem;
}

.stack-chip {
  font-size: 0.6875rem;
  padding: 0.25rem 0.55rem;
  border-radius: 4px;
  background: var(--color-chip-bg);
  border: 1px solid var(--color-border);
  color: var(--color-text-muted);
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

.case-links {
  display: flex;
  gap: 0.75rem;
  margin-top: 2rem;
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
}

.case-not-found {
  max-width: 480px;
  margin: 6rem auto;
  text-align: center;

  a {
    color: var(--color-primary-light);
  }
}
</style>

<style lang="scss">
@import "@/assets/scss/tokens.scss";
</style>
