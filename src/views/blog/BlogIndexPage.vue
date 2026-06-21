<script setup lang="ts">
import { ref, onMounted } from "vue";
import { RouterLink } from "vue-router";
import BlogLayout from "./BlogLayout.vue";
import {
  FerasatArticles,
  formatArticleDate,
  CATEGORY_COLORS,
} from "@/utils/ferasatArticles";

const titleRef = ref<HTMLElement | null>(null);

const sortedArticles = [...FerasatArticles].sort((a, b) =>
  b.date.localeCompare(a.date)
);

onMounted(() => {
  titleRef.value?.scrollIntoView({ behavior: "instant", block: "start" });
});
</script>

<template>
  <BlogLayout>
    <div class="blog-index">
      <header class="blog-header">
        <span class="blog-eyebrow">Writing</span>
        <h1 ref="titleRef" class="blog-title">Articles & Notes</h1>
        <p class="blog-lead">
          Thoughts on Vue, AI integration, and building enterprise software — from real production work.
        </p>
      </header>

      <div class="articles-grid">
        <RouterLink
          v-for="article in sortedArticles"
          :key="article.slug"
          :to="`/blog/${article.slug}`"
          class="article-card glass-card"
        >
          <div class="card-top">
            <span
              class="category-badge"
              :style="{ '--badge-color': CATEGORY_COLORS[article.category] }"
            >
              {{ article.category }}
            </span>
            <span class="read-time">{{ article.readTime }} min read</span>
          </div>

          <h2 class="card-title">{{ article.title }}</h2>
          <p class="card-excerpt">{{ article.excerpt }}</p>

          <div class="card-footer">
            <time :datetime="article.date">{{ formatArticleDate(article.date) }}</time>
            <span class="read-more">
              Read
              <v-icon size="small">mdi-arrow-right</v-icon>
            </span>
          </div>

          <div class="card-tags">
            <span v-for="tag in article.tags.slice(0, 3)" :key="tag" class="tag">
              {{ tag }}
            </span>
          </div>
        </RouterLink>
      </div>
    </div>
  </BlogLayout>
</template>

<style scoped lang="scss">
.blog-index {
  max-width: 960px;
  margin: 0 auto;
}

.blog-header {
  text-align: center;
  margin-bottom: clamp(2.5rem, 5vw, 4rem);
}

.blog-eyebrow {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-primary);
  margin-bottom: 0.75rem;
}

.blog-title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 800;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
}

.blog-lead {
  font-size: 1.05rem;
  color: var(--color-text-muted);
  max-width: 520px;
  margin: 0 auto;
  line-height: 1.7;
}

.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.article-card {
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  text-decoration: none;
  color: inherit;
  border-radius: var(--radius-lg);
  transition: transform 0.35s var(--ease-out-expo),
    border-color 0.35s,
    box-shadow 0.35s;

  &:hover {
    transform: translateY(-4px);
    border-color: var(--color-border-hover);
    box-shadow: var(--shadow-glow);

    .read-more {
      color: var(--color-primary-light);
      gap: 0.5rem;
    }
  }
}

.card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.category-badge {
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 0.25rem 0.625rem;
  border-radius: 999px;
  background: color-mix(in srgb, var(--badge-color) 18%, transparent);
  color: var(--badge-color);
  border: 1px solid color-mix(in srgb, var(--badge-color) 35%, transparent);
}

.read-time {
  font-size: 0.75rem;
  color: var(--color-text-dim);
}

.card-title {
  font-family: var(--font-display);
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--color-text);
  line-height: 1.35;
  margin-bottom: 0.75rem;
}

.card-excerpt {
  font-size: 0.9375rem;
  color: var(--color-text-muted);
  line-height: 1.65;
  flex: 1;
  margin-bottom: 1.25rem;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  font-size: 0.8125rem;
  color: var(--color-text-dim);
  margin-bottom: 1rem;
}

.read-more {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-weight: 600;
  color: var(--color-text-muted);
  transition: color 0.2s, gap 0.2s;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.tag {
  font-size: 0.6875rem;
  padding: 0.2rem 0.5rem;
  border-radius: var(--radius-sm);
  background: rgba(255, 255, 255, 0.04);
  color: var(--color-text-dim);
  border: 1px solid var(--color-border);
}
</style>

<style lang="scss">
@import "@/assets/scss/tokens.scss";

.glass-card {
  background: var(--color-surface-glass);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
}
</style>
