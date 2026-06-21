<script setup lang="ts">
import type { ArticleBlock } from "@/interfaces/blog.interface";

defineProps<{ blocks: ArticleBlock[] }>();
</script>

<template>
  <div class="article-content">
    <template v-for="(block, index) in blocks" :key="index">
      <p v-if="block.type === 'paragraph'" class="article-p">
        {{ block.content }}
      </p>

      <component
        :is="block.level === 3 ? 'h3' : 'h2'"
        v-else-if="block.type === 'heading'"
        class="article-heading"
        :class="{ 'is-h3': block.level === 3 }"
      >
        {{ block.content }}
      </component>

      <component
        :is="block.ordered ? 'ol' : 'ul'"
        v-else-if="block.type === 'list'"
        class="article-list"
      >
        <li v-for="(item, i) in block.items" :key="i">{{ item }}</li>
      </component>

      <pre
        v-else-if="block.type === 'code'"
        class="article-code"
      ><code>{{ block.content }}</code></pre>
    </template>
  </div>
</template>

<style scoped lang="scss">
.article-content {
  font-size: 1.0625rem;
  line-height: 1.85;
  color: var(--color-text-muted);
}

.article-p {
  margin: 0 0 1.25rem;
}

.article-heading {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text);
  margin: 2.25rem 0 1rem;
  line-height: 1.3;

  &.is-h3 {
    font-size: 1.2rem;
    margin-top: 1.75rem;
  }
}

.article-list {
  margin: 0 0 1.5rem;
  padding-left: 1.35rem;

  li {
    margin-bottom: 0.5rem;
  }

  li::marker {
    color: var(--color-primary);
  }
}

.article-code {
  margin: 1.25rem 0 1.75rem;
  padding: 1.25rem 1.5rem;
  border-radius: var(--radius-md);
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  overflow-x: auto;
  font-size: 0.8125rem;
  line-height: 1.65;
  color: #e2e8f0;

  code {
    font-family: "Consolas", "Monaco", "Courier New", monospace;
    white-space: pre;
  }
}
</style>
