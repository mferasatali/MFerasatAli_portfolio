<script setup lang="ts">
import { ref, onMounted } from "vue";
import { RouterLink } from "vue-router";
import type { Article } from "@/interfaces/blog.interface";
import { formatArticleDate, CATEGORY_COLORS } from "@/utils/ferasatArticles";
import { useGsapReveal } from "@/composables/useGsapReveal";
import { useReducedMotion } from "@/composables/useReducedMotion";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

defineProps<{ articles: Article[] }>();

const { prefersReducedMotion } = useReducedMotion();
const { revealSplit, staggerChildren } = useGsapReveal(prefersReducedMotion);

const titleRef = ref<HTMLElement | null>(null);
const gridRef = ref<HTMLElement | null>(null);

onMounted(() => {
  revealSplit(titleRef.value);
  if (gridRef.value) staggerChildren(gridRef.value, ".blog-card");
});
</script>

<template>
  <section id="blog" class="section blog-section">
    <div class="section-bg-decoration" />

    <v-container>
      <div class="section-header">
        <div class="section-title-wrapper">
          <span class="section-number">07</span>
          <h2 ref="titleRef" class="section-title">{{ t('sections.blog.title') }}</h2>
        </div>
        <p class="section-subtitle">
          {{ t('sections.blog.subtitle') }}
        </p>
      </div>

      <div ref="gridRef" class="blog-grid">
        <RouterLink
          v-for="article in articles"
          :key="article.slug"
          :to="`/blog/${article.slug}`"
          class="blog-card glass-card"
        >
          <div class="blog-card-top">
            <span
              class="category-badge"
              :style="{ '--badge-color': CATEGORY_COLORS[article.category] }"
            >
              {{ article.category }}
            </span>
            <span class="read-time">{{ article.readTime }} min</span>
          </div>
          <h3 class="blog-card-title">{{ article.title }}</h3>
          <p class="blog-card-excerpt">{{ article.excerpt }}</p>
          <time class="blog-card-date" :datetime="article.date">
            {{ formatArticleDate(article.date) }}
          </time>
        </RouterLink>
      </div>

      <div class="blog-actions">
        <RouterLink to="/blog" class="view-all-btn">
          {{ t('sections.blog.viewAll') }}
          <v-icon size="small">mdi-arrow-right</v-icon>
        </RouterLink>
      </div>
    </v-container>
  </section>
</template>

<style scoped lang="scss">
.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.25rem;
  margin-bottom: 2.5rem;
}

.blog-card {
  display: flex;
  flex-direction: column;
  padding: 1.35rem;
  text-decoration: none;
  color: inherit;
  border-radius: var(--radius-lg);
  transition: transform 0.35s var(--ease-out-expo), border-color 0.35s;

  &:hover {
    transform: translateY(-4px);
    border-color: var(--color-border-hover);
  }
}

.blog-card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.875rem;
}

.category-badge {
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 0.2rem 0.5rem;
  border-radius: 999px;
  background: color-mix(in srgb, var(--badge-color) 18%, transparent);
  color: var(--badge-color);
  border: 1px solid color-mix(in srgb, var(--badge-color) 35%, transparent);
}

.read-time {
  font-size: 0.75rem;
  color: var(--color-text-dim);
}

.blog-card-title {
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--color-text);
  line-height: 1.35;
  margin-bottom: 0.625rem;
}

.blog-card-excerpt {
  font-size: 0.875rem;
  color: var(--color-text-muted);
  line-height: 1.6;
  flex: 1;
  margin-bottom: 1rem;
}

.blog-card-date {
  font-size: 0.75rem;
  color: var(--color-text-dim);
}

.blog-actions {
  text-align: center;
}

.view-all-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius-md);
  border: 1px solid rgba(59, 130, 246, 0.45);
  background: rgba(59, 130, 246, 0.1);
  color: var(--color-primary-light);
  font-size: 0.9375rem;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.2s, gap 0.2s;

  &:hover {
    background: rgba(59, 130, 246, 0.18);
    gap: 0.55rem;
  }
}
</style>
