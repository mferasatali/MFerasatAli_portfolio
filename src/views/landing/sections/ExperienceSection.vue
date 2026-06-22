<script setup lang="ts">
import { ref, watch, nextTick, onMounted, inject, type Ref } from "vue";
import type { IExperience } from "@/interfaces";
import CareerTimeline from "@/components/career/CareerTimeline.vue";
import { useGsapReveal } from "@/composables/useGsapReveal";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const props = defineProps<{
  experiences: IExperience.ExperiencePayload[];
  isDataLoaded: boolean;
}>();

const prefersReducedMotion = inject<Ref<boolean>>("prefersReducedMotion")!;

const sectionRef = ref<HTMLElement | null>(null);
const trackRef = ref<HTMLElement | null>(null);
const titleRef = ref<HTMLElement | null>(null);

const { revealSplit, pinHorizontal, staggerChildren, refresh, killAll } =
  useGsapReveal(prefersReducedMotion);

const setupAnimations = async () => {
  await nextTick();
  killAll();
  revealSplit(titleRef.value);
  if (sectionRef.value && trackRef.value) {
    staggerChildren(trackRef.value, ".experience-card");
    pinHorizontal(sectionRef.value, trackRef.value);
  }
  refresh();
};

onMounted(() => {
  revealSplit(titleRef.value);
});

watch(
  () => props.isDataLoaded,
  () => setupAnimations(),
  { immediate: true }
);
</script>

<template>
  <section id="experience" ref="sectionRef" class="section experience-section">
    <div class="section-bg-decoration" />

    <v-container class="experience-header-wrap">
      <div class="section-header">
        <div class="section-title-wrapper">
          <span class="section-number">02</span>
          <h2 ref="titleRef" class="section-title">{{ t('sections.experience.title') }}</h2>
        </div>
        <p class="section-subtitle">{{ t('sections.experience.subtitle') }}</p>
      </div>
      <CareerTimeline />
    </v-container>

    <div class="experience-track-wrap">
      <div ref="trackRef" class="experience-track">
        <article
          v-for="(exp, index) in experiences"
          :key="index"
          class="experience-card glass-card"
        >
          <div class="card-glow" />
          <div class="exp-meta">
            <span class="exp-duration">{{ exp.duration }}</span>
            <v-icon size="small" color="primary">mdi-briefcase</v-icon>
          </div>
          <h3 class="exp-company">{{ exp.companyName }}</h3>
          <p class="exp-role">{{ exp.role }}</p>
          <p v-if="exp.location" class="exp-location">
            <v-icon size="x-small" class="mr-1">mdi-map-marker</v-icon>
            {{ exp.location }}
          </p>
          <ul class="exp-list">
            <li v-for="(item, idx) in exp.content" :key="idx">{{ item }}</li>
          </ul>
        </article>
      </div>
    </div>

    <div class="experience-mobile">
      <v-container>
        <article
          v-for="(exp, index) in experiences"
          :key="`m-${index}`"
          class="experience-card glass-card mb-4"
        >
          <div class="card-glow" />
          <div class="exp-meta">
            <span class="exp-duration">{{ exp.duration }}</span>
          </div>
          <h3 class="exp-company">{{ exp.companyName }}</h3>
          <p class="exp-role">{{ exp.role }}</p>
          <p v-if="exp.location" class="exp-location">
            <v-icon size="x-small" class="mr-1">mdi-map-marker</v-icon>
            {{ exp.location }}
          </p>
          <ul class="exp-list">
            <li v-for="(item, idx) in exp.content" :key="idx">{{ item }}</li>
          </ul>
        </article>
      </v-container>
    </div>
  </section>
</template>

<style scoped lang="scss">
.experience-section {
  padding-bottom: 0;
}

.experience-track-wrap {
  display: block;
  overflow: hidden;
  padding: 0 0 var(--section-padding);

  @media (max-width: 959px) {
    display: none;
  }
}

.experience-track {
  display: flex;
  gap: 1.5rem;
  padding: 0 clamp(1rem, 4vw, 2rem);
  width: max-content;
}

.experience-card {
  flex: 0 0 min(420px, 85vw);
  padding: 2rem;
}

.exp-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.exp-duration {
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-accent);
  padding: 0.25rem 0.75rem;
  border: 1px solid rgba(6, 182, 212, 0.3);
  border-radius: 999px;
}

.exp-company {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.exp-role {
  color: var(--color-primary-light);
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.exp-location {
  display: flex;
  align-items: center;
  font-size: 0.8125rem;
  color: var(--color-text-dim);
  margin-bottom: 1rem;
}

.exp-list {
  list-style: none;
  padding: 0;

  li {
    position: relative;
    padding-left: 1.25rem;
    margin-bottom: 0.5rem;
    font-size: 0.9375rem;
    color: var(--color-text-muted);
    line-height: 1.6;

    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0.6em;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--color-primary);
    }
  }
}

.experience-mobile {
  display: none;
  padding-bottom: var(--section-padding);

  @media (max-width: 959px) {
    display: block;
  }
}
</style>
