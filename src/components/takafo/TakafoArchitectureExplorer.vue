<script setup lang="ts">
import { ref, computed } from "vue";
import { RouterLink } from "vue-router";
import { useI18n } from "vue-i18n";
import { useLocalizedContent } from "@/composables/useLocalizedContent";
import { TAKAFO_MODULE_ARTICLE_SLUGS } from "@/i18n/content/takafoModules";

const { t } = useI18n();
const { localizedTakafoModules } = useLocalizedContent();

const selectedIndex = ref<number | null>(0);

const modules = computed(() =>
  localizedTakafoModules.value.map((mod, index) => ({
    ...mod,
    articleSlug: TAKAFO_MODULE_ARTICLE_SLUGS[index],
    index,
  }))
);

const selected = computed(() =>
  selectedIndex.value !== null ? modules.value[selectedIndex.value] : null
);

const selectModule = (index: number) => {
  selectedIndex.value = selectedIndex.value === index ? null : index;
};
</script>

<template>
  <div class="arch-explorer" :aria-label="t('demo.arch.title')">
    <div class="arch-header">
      <h3 class="arch-title">{{ t('demo.arch.title') }}</h3>
      <p class="arch-desc">{{ t('demo.arch.subtitle') }}</p>
    </div>

    <div class="arch-layout">
      <div class="arch-grid" role="list">
        <button
          v-for="mod in modules"
          :key="mod.index"
          type="button"
          class="arch-node"
          :class="{ active: selectedIndex === mod.index }"
          role="listitem"
          @click="selectModule(mod.index)"
        >
          <span class="node-index">{{ String(mod.index + 1).padStart(2, '0') }}</span>
          <span class="node-name">{{ mod.name }}</span>
        </button>
      </div>

      <aside v-if="selected" class="arch-detail glass-card">
        <div class="card-glow" />
        <span class="detail-index">{{ String(selected.index + 1).padStart(2, '0') }}</span>
        <h4 class="detail-name">{{ selected.name }}</h4>
        <p class="detail-desc">{{ selected.description }}</p>
        <RouterLink
          v-if="selected.articleSlug"
          :to="`/blog/${selected.articleSlug}`"
          class="detail-link"
        >
          {{ t('demo.arch.readArticle') }}
          <v-icon size="x-small">mdi-arrow-right</v-icon>
        </RouterLink>
      </aside>
    </div>

    <div class="arch-flow" aria-hidden="true">
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
.arch-explorer {
  margin-bottom: 1.25rem;
  padding: 1.5rem;
  background: var(--color-chip-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
}

.arch-title {
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0 0 0.35rem;
}

.arch-desc {
  font-size: 0.8125rem;
  color: var(--color-text-dim);
  margin: 0 0 1.25rem;
}

.arch-layout {
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: 1rem;
  margin-bottom: 1.25rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.arch-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  gap: 0.5rem;
}

.arch-node {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;
  padding: 0.65rem 0.75rem;
  text-align: start;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s, transform 0.2s;
  font-family: inherit;

  &:hover {
    border-color: var(--color-border-hover);
    transform: translateY(-1px);
  }

  &.active {
    border-color: var(--color-primary);
    background: rgba(99, 102, 241, 0.12);
  }
}

.node-index {
  font-size: 0.625rem;
  font-weight: 700;
  color: var(--color-text-dim);
}

.node-name {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--color-primary-light);
  line-height: 1.3;
}

.arch-detail {
  padding: 1.25rem;
  align-self: start;
  position: sticky;
  top: 1rem;
}

.detail-index {
  font-size: 0.6875rem;
  font-weight: 700;
  color: var(--color-text-dim);
}

.detail-name {
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-text);
  margin: 0.35rem 0 0.5rem;
}

.detail-desc {
  font-size: 0.8125rem;
  line-height: 1.55;
  color: var(--color-text-muted);
  margin: 0 0 0.75rem;
}

.detail-link {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-accent);
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}

.arch-flow {
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

html[dir="rtl"] .arch-flow .v-icon {
  transform: scaleX(-1);
}

html[dir="rtl"] .detail-link .v-icon {
  transform: scaleX(-1);
}
</style>
