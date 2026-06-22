<script setup lang="ts">
import { computed } from "vue";
import { useRoute, RouterLink } from "vue-router";
import { PROFILE } from "@/utils/ferasatProfile";

defineProps<{
  downloadUrl?: string;
  downloadLabel?: string;
}>();

const route = useRoute();

const isResume = computed(() => route.name === "Resume");
const isCoverLetter = computed(() => route.name === "CoverLetter");

const printPage = () => window.print();
</script>

<template>
  <div class="document-page">
    <header class="document-toolbar no-print">
      <div class="toolbar-inner">
        <RouterLink to="/" class="toolbar-back">
          <v-icon size="small">mdi-arrow-left</v-icon>
          Portfolio
        </RouterLink>

        <nav class="toolbar-tabs" aria-label="Documents">
          <RouterLink
            to="/resume"
            class="toolbar-tab"
            :class="{ active: isResume }"
          >
            <v-icon size="small">mdi-file-document-outline</v-icon>
            Resume
          </RouterLink>
          <RouterLink
            to="/cover-letter"
            class="toolbar-tab"
            :class="{ active: isCoverLetter }"
          >
            <v-icon size="small">mdi-email-outline</v-icon>
            Cover Letter
          </RouterLink>
        </nav>

        <div class="toolbar-actions">
          <a
            v-if="downloadUrl"
            :href="downloadUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="toolbar-download"
          >
            <v-icon size="small">mdi-download</v-icon>
            {{ downloadLabel ?? "Download" }}
          </a>
          <button class="toolbar-print" @click="printPage">
            <v-icon size="small">mdi-printer</v-icon>
            Print
          </button>
        </div>
      </div>
    </header>

    <main class="document-main">
      <slot />
    </main>

    <footer class="document-footer no-print">
      <p>{{ PROFILE.name }} · {{ PROFILE.email }}</p>
    </footer>
  </div>
</template>

<style scoped lang="scss">
.document-page {
  min-height: 100vh;
  background: var(--color-bg);
  color: var(--color-text);
}

.document-toolbar {
  position: sticky;
  top: 0;
  z-index: 50;
  background: var(--color-toolbar-bg);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--color-border);
}

.toolbar-inner {
  max-width: 960px;
  margin: 0 auto;
  padding: 0.875rem clamp(1rem, 4vw, 1.5rem);
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

.toolbar-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.toolbar-download {
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

.toolbar-print {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.45rem 0.875rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border);
  background: transparent;
  color: var(--color-text-muted);
  font-size: 0.8125rem;
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s;

  &:hover {
    border-color: var(--color-primary);
    color: var(--color-primary-light);
  }
}

.document-main {
  padding: clamp(1.5rem, 4vw, 3rem) clamp(1rem, 4vw, 1.5rem) 4rem;
}

.document-footer {
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

@media print {
  .no-print {
    display: none !important;
  }

  .document-page {
    background: #fff;
  }

  .document-main {
    padding: 0;
  }
}
</style>

<style lang="scss">
@import "@/assets/scss/tokens.scss";

@media print {
  body {
    background: #fff !important;
  }

  .v-application {
    background: #fff !important;
  }
}
</style>
