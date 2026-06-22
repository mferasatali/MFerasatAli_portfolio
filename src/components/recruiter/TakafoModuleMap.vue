<script setup lang="ts">
import { TAKAFO_MODULES } from "@/utils/ferasatRecruiter";
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="module-map" aria-label="Takafo+ HCM module map">
    <h3 class="map-title">Takafo+ module map</h3>
    <p class="map-desc">11 interconnected HCM modules — private enterprise; diagram is conceptual.</p>
    <div class="map-grid">
      <div
        v-for="mod in TAKAFO_MODULES"
        :key="mod.name"
        class="map-node"
      >
        <span class="node-name">{{ mod.name }}</span>
        <span class="node-desc">{{ mod.description }}</span>
        <RouterLink
          v-if="mod.articleSlug"
          :to="`/blog/${mod.articleSlug}`"
          class="node-link"
        >
          Read article →
        </RouterLink>
      </div>
    </div>
    <div class="map-flow" aria-hidden="true">
      <span>Vue 3 UI</span>
      <v-icon size="small">mdi-arrow-right</v-icon>
      <span>API + Auth</span>
      <v-icon size="small">mdi-arrow-right</v-icon>
      <span>PostgreSQL</span>
      <v-icon size="small">mdi-arrow-right</v-icon>
      <span>AI Services</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.module-map {
  margin: 2rem 0;
  padding: 1.5rem;
  background: var(--color-chip-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
}

.map-title {
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 0.35rem;
}

.map-desc {
  font-size: 0.8125rem;
  color: var(--color-text-dim);
  margin-bottom: 1.25rem;
}

.map-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 0.65rem;
  margin-bottom: 1.25rem;
}

.map-node {
  padding: 0.75rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  transition: border-color 0.2s;

  &:hover {
    border-color: var(--color-border-hover);
  }
}

.node-name {
  display: block;
  font-size: 0.8125rem;
  font-weight: 700;
  color: var(--color-primary-light);
  margin-bottom: 0.25rem;
}

.node-desc {
  display: block;
  font-size: 0.6875rem;
  line-height: 1.4;
  color: var(--color-text-dim);
}

.node-link {
  display: inline-block;
  margin-top: 0.35rem;
  font-size: 0.6875rem;
  font-weight: 600;
  color: var(--color-accent);
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}

.map-flow {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-text-muted);
  border-top: 1px dashed var(--color-border);

  span {
    padding: 0.25rem 0.5rem;
    background: var(--color-chip-bg);
    border-radius: var(--radius-sm);
  }
}
</style>
