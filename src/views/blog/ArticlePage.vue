<script setup lang="ts">
import { computed, watch, onMounted } from "vue";
import { useRoute, RouterLink } from "vue-router";
import BlogLayout from "./BlogLayout.vue";
import ArticleContent from "./ArticleContent.vue";
import {
  getArticleBySlug,
  formatArticleDate,
  CATEGORY_COLORS,
  FerasatArticles,
} from "@/utils/ferasatArticles";
import { applyPageSeo } from "@/utils/siteSeo";

const route = useRoute();

const article = computed(() => getArticleBySlug(route.params.slug as string));

const related = computed(() => {
  if (!article.value) return [];
  return FerasatArticles.filter(
    (a) =>
      a.slug !== article.value!.slug &&
      (a.category === article.value!.category ||
        a.tags.some((t) => article.value!.tags.includes(t)))
  ).slice(0, 2);
});

watch(
  article,
  (value) => {
    if (value) {
      applyPageSeo({
        path: `/blog/${value.slug}`,
        title: `${value.title} — Muhammad Ferasat Ali`,
        description: value.excerpt,
        type: "article",
      });
    }
  },
  { immediate: true }
);

onMounted(() => {
  window.scrollTo({ top: 0, behavior: "instant" });
});
</script>

<template>
  <BlogLayout>
    <article v-if="article" class="article-view">
      <header class="article-header">
        <RouterLink to="/blog" class="back-link">
          <v-icon size="small">mdi-arrow-left</v-icon>
          All articles
        </RouterLink>

        <span
          class="category-badge"
          :style="{ '--badge-color': CATEGORY_COLORS[article.category] }"
        >
          {{ article.category }}
        </span>

        <h1 class="article-title">{{ article.title }}</h1>

        <div class="article-meta">
          <time :datetime="article.date">{{ formatArticleDate(article.date) }}</time>
          <span class="meta-dot">·</span>
          <span>{{ article.readTime }} min read</span>
        </div>

        <div class="article-tags">
          <span v-for="tag in article.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>
      </header>

      <ArticleContent :blocks="article.blocks" />

      <footer v-if="related.length" class="related">
        <h2 class="related-title">Related</h2>
        <div class="related-grid">
          <RouterLink
            v-for="item in related"
            :key="item.slug"
            :to="`/blog/${item.slug}`"
            class="related-card"
          >
            <span class="related-cat">{{ item.category }}</span>
            <h3>{{ item.title }}</h3>
            <p>{{ item.excerpt }}</p>
          </RouterLink>
        </div>
      </footer>
    </article>

    <div v-else class="not-found">
      <h1>Article not found</h1>
      <p>The post you are looking for does not exist or was moved.</p>
      <RouterLink to="/blog" class="not-found-link">Back to articles</RouterLink>
    </div>
  </BlogLayout>
</template>

<style scoped lang="scss">
.article-view {
  max-width: 720px;
  margin: 0 auto;
}

.article-header {
  margin-bottom: 2.5rem;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--color-text-muted);
  text-decoration: none;
  margin-bottom: 1.25rem;
  transition: color 0.2s;

  &:hover {
    color: var(--color-primary-light);
  }
}

.category-badge {
  display: inline-block;
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 0.25rem 0.625rem;
  border-radius: 999px;
  background: color-mix(in srgb, var(--badge-color) 18%, transparent);
  color: var(--badge-color);
  border: 1px solid color-mix(in srgb, var(--badge-color) 35%, transparent);
  margin-bottom: 1rem;
}

.article-title {
  font-family: var(--font-display);
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 800;
  color: var(--color-text);
  line-height: 1.2;
  margin-bottom: 1rem;
}

.article-meta {
  font-size: 0.875rem;
  color: var(--color-text-dim);
  margin-bottom: 1rem;
}

.meta-dot {
  margin: 0 0.35rem;
}

.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.tag {
  font-size: 0.6875rem;
  padding: 0.2rem 0.5rem;
  border-radius: var(--radius-sm);
  background: var(--color-chip-bg);
  color: var(--color-text-dim);
  border: 1px solid var(--color-border);
}

.related {
  margin-top: 4rem;
  padding-top: 2.5rem;
  border-top: 1px solid var(--color-border);
}

.related-title {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 1.25rem;
}

.related-grid {
  display: grid;
  gap: 1rem;

  @media (min-width: 640px) {
    grid-template-columns: 1fr 1fr;
  }
}

.related-card {
  display: block;
  padding: 1.25rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  background: var(--color-surface-glass);
  text-decoration: none;
  color: inherit;
  transition: border-color 0.2s, transform 0.2s;

  &:hover {
    border-color: var(--color-border-hover);
    transform: translateY(-2px);
  }

  h3 {
    font-family: var(--font-display);
    font-size: 1rem;
    font-weight: 700;
    color: var(--color-text);
    margin: 0.5rem 0;
    line-height: 1.35;
  }

  p {
    font-size: 0.8125rem;
    color: var(--color-text-muted);
    line-height: 1.6;
    margin: 0;
  }
}

.related-cat {
  font-size: 0.6875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--color-primary);
}

.not-found {
  max-width: 480px;
  margin: 4rem auto;
  text-align: center;

  h1 {
    font-family: var(--font-display);
    font-size: 1.75rem;
    margin-bottom: 0.75rem;
  }

  p {
    color: var(--color-text-muted);
    margin-bottom: 1.5rem;
  }
}

.not-found-link {
  display: inline-flex;
  padding: 0.625rem 1.25rem;
  border-radius: var(--radius-sm);
  background: rgba(59, 130, 246, 0.15);
  color: var(--color-primary-light);
  text-decoration: none;
  font-weight: 600;

  &:hover {
    background: rgba(59, 130, 246, 0.25);
  }
}
</style>

<style lang="scss">
@import "@/assets/scss/tokens.scss";
</style>
