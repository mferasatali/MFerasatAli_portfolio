<script setup lang="ts">
import { RouterLink } from "vue-router";
import { useI18n } from "vue-i18n";
import ThemeToggle from "@/components/ThemeToggle.vue";
import LanguageToggle from "@/components/LanguageToggle.vue";
import { FerasatLabs } from "@/utils/ferasatLabs";

const { t } = useI18n();

const openLab = (href: string) => {
  window.open(href, "_blank", "noopener,noreferrer");
};
</script>

<template>
  <div class="labs-page">
    <header class="labs-top">
      <div class="labs-top-inner">
        <RouterLink to="/" class="back-link">
          <v-icon size="small">mdi-arrow-left</v-icon>
          {{ t("labs.back") }}
        </RouterLink>
        <div class="top-actions">
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </div>
    </header>

    <main class="labs-main">
      <p class="eyebrow">{{ t("labs.eyebrow") }}</p>
      <h1 class="title">{{ t("labs.title") }}</h1>
      <p class="lead">{{ t("labs.lead") }}</p>

      <div class="lab-grid">
        <article
          v-for="lab in FerasatLabs"
          :key="lab.id"
          class="lab-card"
          :style="{ '--lab-accent': lab.accent }"
        >
          <div class="lab-icon-wrap">
            <v-icon size="28" :color="lab.accent">{{ lab.icon }}</v-icon>
          </div>
          <div class="lab-meta">
            <span class="status" :class="lab.status">
              {{
                lab.status === "live"
                  ? t("labs.live")
                  : lab.status === "live-local"
                    ? t("labs.localDemo")
                    : t("labs.comingSoon")
              }}
            </span>
            <h2>{{ lab.title }}</h2>
            <p class="tagline">{{ lab.tagline }}</p>
            <p class="desc">{{ lab.description }}</p>
            <div class="stack">
              <span v-for="tech in lab.stack" :key="tech" class="chip">{{ tech }}</span>
            </div>
          </div>
          <div class="lab-actions">
            <v-btn
              class="modern-btn open-btn"
              :style="{ background: lab.accent }"
              @click="openLab(lab.href)"
            >
              {{ t("labs.openNewTab") }}
              <v-icon end size="small">mdi-open-in-new</v-icon>
            </v-btn>
            <a
              v-if="lab.repoUrl"
              class="repo-link"
              :href="lab.repoUrl"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <p class="href-hint">{{ lab.href }}</p>
          </div>
        </article>
      </div>

      <p class="footnote">{{ t("labs.footnote") }}</p>
    </main>
  </div>
</template>

<style scoped lang="scss">
.labs-page {
  min-height: 100vh;
  background: var(--color-bg);
  color: var(--color-text);
}

.labs-top {
  border-bottom: 1px solid var(--color-border);
  background: var(--color-header-bg);
  backdrop-filter: blur(12px);
  position: sticky;
  top: 0;
  z-index: 10;
}

.labs-top-inner {
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0.9rem clamp(1rem, 4vw, 2rem);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--color-text-muted);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;

  &:hover {
    color: var(--color-primary-light);
  }
}

.top-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.labs-main {
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 2.5rem clamp(1rem, 4vw, 2rem) 4rem;
}

.eyebrow {
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 0.75rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-primary-light);
  margin: 0;
}

.title {
  margin: 0.6rem 0 0;
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, 2.75rem);
  font-weight: 800;
  letter-spacing: -0.03em;
}

.lead {
  margin: 0.85rem 0 0;
  max-width: 38rem;
  color: var(--color-text-muted);
  line-height: 1.6;
}

.lab-grid {
  margin-top: 2rem;
  display: grid;
  gap: 1.25rem;
}

.lab-card {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 1.25rem;
  align-items: start;
  padding: 1.35rem 1.4rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg, 1rem);
  background: var(--color-surface-glass, rgba(255, 255, 255, 0.03));
  border-left: 3px solid var(--lab-accent);
  transition: transform 0.2s ease, border-color 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: color-mix(in srgb, var(--lab-accent) 45%, var(--color-border));
  }
}

@media (max-width: 800px) {
  .lab-card {
    grid-template-columns: 1fr;
  }
}

.lab-icon-wrap {
  width: 52px;
  height: 52px;
  border-radius: 0.85rem;
  display: grid;
  place-items: center;
  background: color-mix(in srgb, var(--lab-accent) 14%, transparent);
}

.lab-meta h2 {
  margin: 0.35rem 0 0;
  font-size: 1.25rem;
  font-weight: 700;
}

.tagline {
  margin: 0.25rem 0 0;
  color: var(--lab-accent);
  font-weight: 600;
  font-size: 0.9rem;
}

.desc {
  margin: 0.65rem 0 0;
  color: var(--color-text-muted);
  line-height: 1.55;
  font-size: 0.95rem;
  max-width: 48rem;
}

.status {
  display: inline-flex;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 0.2rem 0.5rem;
  border-radius: 999px;

  &.live {
    background: rgba(37, 99, 235, 0.14);
    color: #2563eb;
  }

  &.live-local {
    background: rgba(15, 118, 110, 0.14);
    color: #0f766e;
  }

  &.coming-soon {
    background: rgba(148, 163, 184, 0.2);
    color: var(--color-text-muted);
  }
}

.stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 0.85rem;
}

.chip {
  font-size: 0.75rem;
  padding: 0.2rem 0.55rem;
  border-radius: 999px;
  border: 1px solid var(--color-border);
  color: var(--color-text-muted);
}

.lab-actions {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0.45rem;
  min-width: 10.5rem;
}

.open-btn {
  color: #fff !important;
}

.repo-link {
  text-align: center;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-primary-light);
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}

.href-hint {
  margin: 0;
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 0.68rem;
  color: var(--color-text-muted);
  word-break: break-all;
}

.footnote {
  margin: 2rem 0 0;
  font-size: 0.85rem;
  color: var(--color-text-muted);
  max-width: 40rem;
  line-height: 1.55;
}
</style>
