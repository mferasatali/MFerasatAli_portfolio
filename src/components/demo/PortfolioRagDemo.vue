<script setup lang="ts">
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import { askPortfolioRag } from "@/utils/clientRag";

const { t } = useI18n();

const query = ref("");
const loading = ref(false);
const answer = ref("");
const sources = ref<{ id: string; source: string }[]>([]);
const searched = ref(false);

const sampleQuestions = computed(() => [
  t("demo.rag.samples.takafo"),
  t("demo.rag.samples.stack"),
  t("demo.rag.samples.contact"),
]);

const runSearch = async (text?: string) => {
  const q = (text ?? query.value).trim();
  if (!q || loading.value) return;
  query.value = q;
  loading.value = true;
  searched.value = true;
  await new Promise((r) => setTimeout(r, 350 + Math.random() * 200));
  const result = askPortfolioRag(q);
  answer.value = result.answer || t("demo.rag.noMatch");
  sources.value = result.sources.map((s) => ({ id: s.id, source: s.source }));
  loading.value = false;
};
</script>

<template>
  <div class="rag-demo glass-card">
    <div class="card-glow" />
    <div class="rag-header">
      <v-icon size="small" color="primary">mdi-brain</v-icon>
      <div>
        <h3 class="rag-title">{{ t('demo.rag.title') }}</h3>
        <p class="rag-sub">{{ t('demo.rag.subtitle') }}</p>
      </div>
      <span class="rag-badge">{{ t('demo.rag.badge') }}</span>
    </div>

    <form class="rag-form" @submit.prevent="runSearch()">
      <input
        v-model="query"
        type="text"
        :placeholder="t('demo.rag.placeholder')"
        maxlength="200"
        autocomplete="off"
      />
      <button type="submit" class="rag-btn" :disabled="!query.trim() || loading">
        <v-icon size="small">{{ loading ? 'mdi-loading' : 'mdi-magnify' }}</v-icon>
        {{ loading ? t('demo.rag.searching') : t('demo.rag.search') }}
      </button>
    </form>

    <div class="sample-chips">
      <button
        v-for="sample in sampleQuestions"
        :key="sample"
        type="button"
        class="sample-chip"
        @click="runSearch(sample)"
      >
        {{ sample }}
      </button>
    </div>

    <div v-if="searched" class="rag-result">
      <p class="result-answer">{{ answer }}</p>
      <div v-if="sources.length" class="result-sources">
        <span class="sources-label">{{ t('demo.rag.sources') }}</span>
        <span v-for="src in sources" :key="src.id" class="source-chip">{{ src.source }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.rag-demo {
  padding: 1.5rem;
  margin-bottom: 1.25rem;
}

.rag-header {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.rag-title {
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--color-text);
  margin: 0;
}

.rag-sub {
  font-size: 0.8125rem;
  color: var(--color-text-dim);
  margin: 0.2rem 0 0;
}

.rag-badge {
  margin-left: auto;
  flex-shrink: 0;
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 0.25rem 0.5rem;
  border-radius: 999px;
  background: rgba(34, 197, 94, 0.12);
  color: var(--color-accent);
  border: 1px solid rgba(34, 197, 94, 0.35);
}

.rag-form {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.75rem;

  input {
    flex: 1;
    min-width: 0;
    padding: 0.6rem 0.85rem;
    border-radius: var(--radius-sm);
    border: 1px solid var(--color-border);
    background: var(--color-bg-elevated);
    color: var(--color-text);
    font-size: 0.875rem;
    outline: none;

    &:focus {
      border-color: rgba(59, 130, 246, 0.5);
    }
  }
}

.rag-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0 1rem;
  border-radius: var(--radius-sm);
  border: none;
  background: var(--color-primary);
  color: var(--color-on-primary);
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.sample-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-bottom: 1rem;
}

.sample-chip {
  font-size: 0.6875rem;
  padding: 0.35rem 0.65rem;
  border-radius: 999px;
  border: 1px solid var(--color-border);
  background: transparent;
  color: var(--color-text-muted);
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s;

  &:hover {
    border-color: rgba(59, 130, 246, 0.45);
    color: var(--color-primary-light);
  }
}

.rag-result {
  padding-top: 1rem;
  border-top: 1px solid var(--color-border);
}

.result-answer {
  font-size: 0.875rem;
  line-height: 1.65;
  color: var(--color-text-muted);
  margin: 0 0 0.75rem;
}

.result-sources {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.35rem;
}

.sources-label {
  font-size: 0.6875rem;
  font-weight: 700;
  color: var(--color-text-dim);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.source-chip {
  font-size: 0.6875rem;
  padding: 0.2rem 0.5rem;
  border-radius: 999px;
  background: var(--color-chip-bg);
  border: 1px solid var(--color-border);
  color: var(--color-primary-light);
}

html[dir="rtl"] .rag-badge {
  margin-left: 0;
  margin-right: auto;
}
</style>
