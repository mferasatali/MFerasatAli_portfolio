<script setup lang="ts">
import { ref, onMounted, inject, watch, type Ref } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useI18n } from "vue-i18n";
import { useLocalizedContent } from "@/composables/useLocalizedContent";

gsap.registerPlugin(ScrollTrigger);

const { t } = useI18n();
const { localizedTimeline } = useLocalizedContent();
const prefersReducedMotion = inject<Ref<boolean>>("prefersReducedMotion")!;

const rootRef = ref<HTMLElement | null>(null);

const setupAnimation = () => {
  if (!rootRef.value || prefersReducedMotion.value) return;

  const items = rootRef.value.querySelectorAll(".timeline-item");
  gsap.fromTo(
    items,
    { opacity: 0, y: 24 },
    {
      opacity: 1,
      y: 0,
      duration: 0.55,
      stagger: 0.15,
      ease: "power2.out",
      scrollTrigger: {
        trigger: rootRef.value,
        start: "top 80%",
        once: true,
      },
    }
  );
};

onMounted(() => setupAnimation());

watch(localizedTimeline, () => {
  ScrollTrigger.getAll().forEach((st) => {
    if (st.trigger === rootRef.value) st.kill();
  });
  setupAnimation();
});
</script>

<template>
  <div ref="rootRef" class="career-timeline" :aria-label="t('sections.experience.timelineLabel')">
    <div
      v-for="(item, index) in localizedTimeline"
      :key="`${item.company}-${index}`"
      class="timeline-item"
      :class="{ current: index === 0 }"
    >
      <div class="timeline-marker">
        <span class="timeline-dot" />
        <span v-if="index < localizedTimeline.length - 1" class="timeline-connector" />
      </div>
      <div class="timeline-content">
        <span class="timeline-period">{{ item.period }}</span>
        <h3 class="timeline-company">{{ item.company }}</h3>
        <p class="timeline-role">{{ item.role }}</p>
        <p class="timeline-impact">{{ item.impact }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.career-timeline {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: clamp(2rem, 4vw, 3rem);

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.timeline-item {
  display: flex;
  gap: 0.75rem;
  padding: 1.25rem;
  background: var(--color-chip-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  transition: border-color 0.2s, box-shadow 0.2s;

  &:hover {
    border-color: var(--color-border-hover);
  }

  &.current {
    border-color: rgba(99, 102, 241, 0.45);
    box-shadow: 0 0 24px rgba(99, 102, 241, 0.12);
  }
}

.timeline-marker {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 0.25rem;
}

.timeline-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--gradient-primary);
  flex-shrink: 0;
  box-shadow: 0 0 10px rgba(99, 102, 241, 0.45);
}

.timeline-connector {
  display: none;
}

.timeline-period {
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-primary-light);
}

.timeline-company {
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-text);
  margin: 0.25rem 0 0.15rem;
}

.timeline-role {
  font-size: 0.8125rem;
  color: var(--color-text-muted);
  margin-bottom: 0.5rem;
}

.timeline-impact {
  font-size: 0.8125rem;
  line-height: 1.5;
  color: var(--color-text-dim);
}
</style>
