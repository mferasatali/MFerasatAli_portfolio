<script setup lang="ts">
import { EXPERIENCE_TIMELINE } from "@/utils/ferasatRecruiter";
</script>

<template>
  <div class="experience-timeline" aria-label="Career at a glance">
    <div
      v-for="(item, index) in EXPERIENCE_TIMELINE"
      :key="item.company"
      class="timeline-item"
    >
      <div class="timeline-marker">
        <span class="timeline-dot" />
        <span v-if="index < EXPERIENCE_TIMELINE.length - 1" class="timeline-line" aria-hidden="true" />
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
.experience-timeline {
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
  transition: border-color 0.2s;

  &:hover {
    border-color: var(--color-border-hover);
  }
}

.timeline-marker {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 0.25rem;
}

.timeline-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--gradient-primary);
  flex-shrink: 0;
}

.timeline-line {
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
