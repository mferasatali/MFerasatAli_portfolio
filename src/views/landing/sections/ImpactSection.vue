<script setup lang="ts">
import { onMounted, ref, inject, type Ref } from "vue";
import { RouterLink } from "vue-router";
import { useGsapReveal } from "@/composables/useGsapReveal";
import { useI18n } from "vue-i18n";
import { NINETY_DAY_PLAN, SELECTED_WORK } from "@/utils/ferasatRecruiter";

const { t } = useI18n();
const prefersReducedMotion = inject<Ref<boolean>>("prefersReducedMotion")!;
const { revealSplit, staggerChildren } = useGsapReveal(prefersReducedMotion);

const titleRef = ref<HTMLElement | null>(null);
const cardsRef = ref<HTMLElement | null>(null);

onMounted(() => {
  revealSplit(titleRef.value);
  if (cardsRef.value) staggerChildren(cardsRef.value, ".impact-item");
});
</script>

<template>
  <section id="selected-work" class="section impact-section">
    <div class="section-bg-decoration" />

    <v-container>
      <div class="section-header">
        <div class="section-title-wrapper">
          <span class="section-number">02</span>
          <h2 ref="titleRef" class="section-title">{{ t("sections.impact.title") }}</h2>
        </div>
        <p class="section-subtitle">{{ t("sections.impact.subtitle") }}</p>
      </div>

      <article class="selected-card glass-card">
        <div class="card-glow" />
        <div class="selected-top">
          <span class="selected-badge">{{ t("sections.impact.badge") }}</span>
          <span class="selected-meta">{{ t("sections.impact.meta") }}</span>
        </div>
        <h3 class="selected-title">{{ SELECTED_WORK.title }}</h3>
        <p class="selected-client">{{ SELECTED_WORK.client }}</p>
        <p class="selected-problem">
          <strong>{{ t("sections.impact.problemLabel") }}</strong>
          {{ SELECTED_WORK.problem }}
        </p>
        <p class="selected-built">
          <strong>{{ t("sections.impact.builtLabel") }}</strong>
          {{ SELECTED_WORK.built }}
        </p>

        <ul class="impact-list">
          <li v-for="(item, i) in SELECTED_WORK.results" :key="i">{{ item }}</li>
        </ul>

        <p class="selected-note">{{ t("sections.impact.privateNote") }}</p>

        <div class="selected-actions">
          <RouterLink
            :to="`/projects/${SELECTED_WORK.slug}`"
            class="modern-btn selected-btn"
          >
            <v-icon start size="small">mdi-text-box-search-outline</v-icon>
            {{ t("sections.impact.readCase") }}
          </RouterLink>
          <a href="#projects" class="outline-btn selected-btn-outline">
            {{ t("sections.impact.moreWork") }}
          </a>
        </div>
      </article>

      <div class="ninety-block">
        <h3 class="ninety-title">{{ t("sections.impact.ninetyTitle") }}</h3>
        <p class="ninety-lead">{{ t("sections.impact.ninetyLead") }}</p>
        <div ref="cardsRef" class="ninety-grid">
          <div
            v-for="item in NINETY_DAY_PLAN"
            :key="item.phase"
            class="impact-item glass-card"
          >
            <div class="card-glow" />
            <span class="phase">{{ item.phase }}</span>
            <h4>{{ item.title }}</h4>
            <p>{{ item.detail }}</p>
          </div>
        </div>
      </div>
    </v-container>
  </section>
</template>

<style scoped lang="scss">
.selected-card {
  padding: 1.75rem 1.75rem 1.5rem;
  margin-bottom: 2.5rem;
  position: relative;
  overflow: hidden;
}

.selected-top {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
  margin-bottom: 1rem;
}

.selected-badge {
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 0.3rem 0.7rem;
  border-radius: 999px;
  background: rgba(59, 130, 246, 0.15);
  border: 1px solid rgba(59, 130, 246, 0.35);
  color: var(--color-primary-light);
}

.selected-meta {
  font-size: 0.8125rem;
  color: var(--color-text-dim);
}

.selected-title {
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 800;
  margin-bottom: 0.25rem;
}

.selected-client {
  color: var(--color-primary-light);
  font-weight: 600;
  margin-bottom: 1.25rem;
}

.selected-problem,
.selected-built {
  color: var(--color-text-muted);
  line-height: 1.7;
  margin-bottom: 0.75rem;
  font-size: 0.95rem;

  strong {
    color: var(--color-text);
    margin-right: 0.35rem;
  }
}

.impact-list {
  margin: 1rem 0 1.25rem;
  padding-left: 1.2rem;
  display: grid;
  gap: 0.4rem;

  li {
    color: var(--color-text-muted);
    font-size: 0.9rem;
    line-height: 1.5;
  }
}

.selected-note {
  font-size: 0.8125rem;
  color: var(--color-text-dim);
  font-style: italic;
  margin-bottom: 1.25rem;
}

.selected-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.selected-btn,
.selected-btn-outline {
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  border-radius: var(--radius-md);
  padding: 0.7rem 1.1rem;
  font-size: 0.875rem;
  font-weight: 600;
}

.selected-btn-outline {
  border: 1px solid var(--color-border);
  color: var(--color-text-muted);

  &:hover {
    border-color: var(--color-primary);
    color: var(--color-primary-light);
  }
}

.ninety-title {
  font-family: var(--font-display);
  font-size: 1.35rem;
  font-weight: 700;
  margin-bottom: 0.35rem;
}

.ninety-lead {
  color: var(--color-text-muted);
  margin-bottom: 1.25rem;
  max-width: 640px;
}

.ninety-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.impact-item {
  padding: 1.25rem;
  position: relative;
  overflow: hidden;

  h4 {
    font-family: var(--font-display);
    font-size: 1.05rem;
    font-weight: 700;
    margin: 0.35rem 0 0.5rem;
  }

  p {
    font-size: 0.875rem;
    color: var(--color-text-muted);
    line-height: 1.55;
  }
}

.phase {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-primary-light);
}

@media (max-width: 960px) {
  .ninety-grid {
    grid-template-columns: 1fr;
  }
}
</style>
