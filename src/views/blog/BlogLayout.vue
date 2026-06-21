<script setup lang="ts">
import { computed } from "vue";
import { useRoute, RouterLink } from "vue-router";
import { PROFILE } from "@/utils/ferasatProfile";

const route = useRoute();

const isBlogIndex = computed(() => route.name === "Blog");
const isArticle = computed(() => route.name === "Article");
</script>

<template>
  <div class="blog-page">
    <header class="blog-toolbar">
      <div class="toolbar-inner">
        <RouterLink to="/" class="toolbar-back">
          <v-icon size="small">mdi-arrow-left</v-icon>
          Portfolio
        </RouterLink>

        <nav class="toolbar-tabs" aria-label="Blog navigation">
          <RouterLink to="/blog" class="toolbar-tab" :class="{ active: isBlogIndex }">
            <v-icon size="small">mdi-post-outline</v-icon>
            All Articles
          </RouterLink>
        </nav>

        <div class="toolbar-actions">
          <RouterLink to="/#contact" class="toolbar-cta">
            <v-icon size="small">mdi-email-outline</v-icon>
            Contact
          </RouterLink>
        </div>
      </div>
    </header>

    <main class="blog-main" :class="{ 'is-article': isArticle }">
      <slot />
    </main>

    <footer class="blog-footer">
      <p>{{ PROFILE.name }} · {{ PROFILE.email }}</p>
    </footer>
  </div>
</template>

<style scoped lang="scss">
.blog-page {
  min-height: 100vh;
  background: var(--color-bg);
  color: var(--color-text);
}

.blog-toolbar {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(8, 13, 26, 0.92);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--color-border);
}

.toolbar-inner {
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0.875rem clamp(1rem, 4vw, 2rem);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}

.toolbar-back {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  color: var(--color-text-muted);
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  transition: color 0.2s;

  &:hover {
    color: var(--color-primary-light);
  }
}

.toolbar-tabs {
  display: flex;
  gap: 0.35rem;
  background: var(--color-surface-glass);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 0.25rem;
}

.toolbar-tab {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.45rem 0.875rem;
  border-radius: var(--radius-sm);
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--color-text-muted);
  text-decoration: none;
  transition: background 0.2s, color 0.2s;

  &.active {
    background: rgba(59, 130, 246, 0.15);
    color: var(--color-primary-light);
  }

  &:hover:not(.active) {
    color: var(--color-text);
  }
}

.toolbar-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.45rem 0.875rem;
  border-radius: var(--radius-sm);
  border: 1px solid rgba(59, 130, 246, 0.45);
  background: rgba(59, 130, 246, 0.12);
  color: var(--color-primary-light);
  font-size: 0.8125rem;
  font-weight: 500;
  text-decoration: none;
  transition: background 0.2s, border-color 0.2s;

  &:hover {
    background: rgba(59, 130, 246, 0.2);
    border-color: var(--color-primary);
  }
}

.blog-main {
  padding: clamp(2rem, 5vw, 4rem) clamp(1rem, 4vw, 2rem) 5rem;

  &.is-article {
    padding-bottom: 6rem;
  }
}

.blog-footer {
  text-align: center;
  padding: 1.5rem;
  font-size: 0.8125rem;
  color: var(--color-text-dim);
  border-top: 1px solid var(--color-border);
}

@media (max-width: 640px) {
  .toolbar-inner {
    justify-content: center;
  }

  .toolbar-back {
    width: 100%;
  }
}
</style>

<style lang="scss">
@import "@/assets/scss/tokens.scss";
</style>
