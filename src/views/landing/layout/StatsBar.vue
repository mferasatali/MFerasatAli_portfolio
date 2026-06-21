<script setup lang="ts">
defineProps<{
  projects: number;
  years: string;
  location: string;
}>();
</script>

<template>
  <div class="stats-bar">
    <div class="stat">
      <span class="stat-value">{{ projects }}+</span>
      <span class="stat-label">Projects</span>
    </div>
    <span class="stat-divider" aria-hidden="true" />
    <div class="stat">
      <span class="stat-value">{{ years }}</span>
      <span class="stat-label">Experience</span>
    </div>
    <span class="stat-divider" aria-hidden="true" />
    <div class="stat">
      <span class="stat-value">{{ location }}</span>
      <span class="stat-label">Based in</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.stats-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1.5rem 2rem;
  padding: 1.25rem 2rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-surface-glass);
  backdrop-filter: blur(12px);
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.stat-value {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-text);
}

.stat-label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--color-text-muted);
}

.stat-divider {
  width: 1px;
  height: 32px;
  background: var(--color-border);

  @media (max-width: 480px) {
    display: none;
  }
}
</style>
