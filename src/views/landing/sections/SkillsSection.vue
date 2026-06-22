<script setup lang="ts">
import { ref, watch, nextTick, onMounted, inject, type Ref } from "vue";
import type { IJourney } from "@/interfaces";
import TechMarquee from "../layout/TechMarquee.vue";
import { useGsapReveal } from "@/composables/useGsapReveal";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const props = defineProps<{
  education: IJourney.Education[];
  skillCategories: IJourney.SkillCategory[];
  skills: string[];
  isDataLoaded: boolean;
}>();

const prefersReducedMotion = inject<Ref<boolean>>("prefersReducedMotion")!;
const titleRef = ref<HTMLElement | null>(null);
const gridRef = ref<HTMLElement | null>(null);

const { revealSplit, staggerChildren, refresh } = useGsapReveal(prefersReducedMotion);

const variantClass = (variant: IJourney.SkillCategoryVariant) =>
  `badge-${variant}`;

onMounted(() => {
  revealSplit(titleRef.value);
});

watch(
  () => props.isDataLoaded,
  async () => {
    await nextTick();
    if (gridRef.value) {
      staggerChildren(gridRef.value, ".skill-category-card");
      refresh();
    }
  },
  { immediate: true }
);
</script>

<template>
  <section id="skills" class="section skills-section">
    <div class="section-bg-decoration" />

    <v-container>
      <div class="section-header">
        <div class="section-title-wrapper">
          <span class="section-number">03</span>
          <h2 ref="titleRef" class="section-title">{{ t('sections.skills.title') }}</h2>
        </div>
      </div>

      <TechMarquee :skills="skills" />

      <div
        v-for="(edu, index) in education"
        :key="`edu-${index}`"
        class="education-card glass-card"
      >
        <div class="card-glow" />
        <v-icon class="edu-icon">mdi-school</v-icon>
        <h3 class="edu-degree">{{ edu.degree }} — {{ edu.studyIn }}</h3>
        <p class="edu-institution">{{ edu.institutionName }}</p>
        <p v-if="edu.location" class="edu-location">{{ edu.location }}</p>
        <p class="edu-duration">{{ edu.duration }}</p>
      </div>

      <div ref="gridRef" class="skills-grid">
        <div
          v-for="(category, index) in skillCategories"
          :key="index"
          class="skill-category-card glass-card"
        >
          <div class="card-glow" />
          <h3 class="category-name">{{ category.name }}</h3>
          <div class="badges-wrap">
            <span
              v-for="(skill, i) in category.skills"
              :key="i"
              class="skill-badge"
              :class="variantClass(category.variant)"
            >
              {{ skill }}
            </span>
          </div>
        </div>
      </div>
    </v-container>
  </section>
</template>

<style scoped lang="scss">
.education-card {
  padding: 1.75rem;
  margin-bottom: 2rem;
  max-width: 640px;
}

.edu-icon {
  color: var(--color-primary-light);
  margin-bottom: 0.75rem;
}

.edu-degree {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.edu-institution {
  color: var(--color-text-muted);
  font-size: 0.9375rem;
  margin-bottom: 0.25rem;
}

.edu-location,
.edu-duration {
  font-size: 0.8125rem;
  color: var(--color-text-dim);
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.skill-category-card {
  padding: 1.5rem;
}

.category-name {
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--color-text);
}

.badges-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.skill-badge {
  padding: 0.35rem 0.8rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 500;
  border: 1px solid transparent;
}

.badge-frontend {
  background: rgba(59, 130, 246, 0.12);
  border-color: rgba(59, 130, 246, 0.35);
  color: var(--color-badge-frontend-text);
}

.badge-backend {
  background: rgba(139, 92, 246, 0.12);
  border-color: rgba(139, 92, 246, 0.35);
  color: var(--color-badge-backend-text);
}

.badge-ai {
  background: rgba(34, 197, 94, 0.12);
  border-color: rgba(34, 197, 94, 0.35);
  color: var(--color-badge-ai-text);
}

.badge-cloud {
  background: rgba(245, 158, 11, 0.12);
  border-color: rgba(245, 158, 11, 0.35);
  color: var(--color-badge-cloud-text);
}

.badge-languages {
  background: rgba(100, 116, 139, 0.15);
  border-color: rgba(100, 116, 139, 0.35);
  color: var(--color-badge-languages-text);
}

.badge-databases {
  background: rgba(20, 184, 166, 0.12);
  border-color: rgba(20, 184, 166, 0.35);
  color: var(--color-badge-databases-text);
}

@media (max-width: 768px) {
  .skills-grid {
    grid-template-columns: 1fr;
  }
}
</style>
