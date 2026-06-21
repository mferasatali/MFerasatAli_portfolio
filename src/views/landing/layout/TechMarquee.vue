<script setup lang="ts">
defineProps<{ skills: string[]; speed?: number }>();
</script>

<template>
  <div class="tech-marquee" aria-hidden="true">
    <div class="marquee-track" :style="{ '--speed': `${speed ?? 40}s` }">
      <div class="marquee-content">
        <span v-for="(skill, i) in skills" :key="`a-${i}`" class="marquee-item">{{ skill }}</span>
      </div>
      <div class="marquee-content" aria-hidden="true">
        <span v-for="(skill, i) in skills" :key="`b-${i}`" class="marquee-item">{{ skill }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.tech-marquee {
  overflow: hidden;
  mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent);
  margin: 2rem 0;
}

.marquee-track {
  display: flex;
  width: max-content;
  animation: scroll var(--speed, 40s) linear infinite;
}

.marquee-content {
  display: flex;
  gap: 1rem;
  padding-right: 1rem;
}

.marquee-item {
  flex-shrink: 0;
  padding: 0.5rem 1.25rem;
  border: 1px solid var(--color-border);
  border-radius: 999px;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text-muted);
  background: rgba(99, 102, 241, 0.06);
  white-space: nowrap;
}

@keyframes scroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .marquee-track {
    animation: none;
  }
}
</style>
