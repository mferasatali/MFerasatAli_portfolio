<script setup lang="ts">
import { ref, onMounted, inject, type Ref } from "vue";
import { useGsapReveal } from "@/composables/useGsapReveal";
import { useI18n } from "vue-i18n";
import {
  fetchGitHubData,
  GITHUB_FALLBACK,
  GITHUB_USERNAME,
  getLanguageColor,
  type GitHubProfile,
  type GitHubRepo,
} from "@/utils/ferasatGitHub";

const { t } = useI18n();

const prefersReducedMotion = inject<Ref<boolean>>("prefersReducedMotion")!;

const titleRef = ref<HTMLElement | null>(null);
const gridRef = ref<HTMLElement | null>(null);
const loading = ref(true);
const profile = ref<GitHubProfile>(GITHUB_FALLBACK.profile);
const repos = ref<GitHubRepo[]>([]);
const isLive = ref(false);

const { revealSplit, staggerChildren } = useGsapReveal(prefersReducedMotion);

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", year: "numeric" });

onMounted(async () => {
  revealSplit(titleRef.value);

  try {
    const data = await fetchGitHubData();
    profile.value = data.profile;
    repos.value = data.repos;
    isLive.value = true;
  } catch {
    profile.value = GITHUB_FALLBACK.profile;
    repos.value = GITHUB_FALLBACK.repos;
    isLive.value = false;
  }

  loading.value = false;

  if (gridRef.value && repos.value.length) {
    staggerChildren(gridRef.value, ".repo-card");
  }
});
</script>

<template>
  <section id="github" class="section github-section">
    <div class="section-bg-decoration" />

    <v-container>
      <div class="section-header">
        <div class="section-title-wrapper">
          <span class="section-number">—</span>
          <h2 ref="titleRef" class="section-title">{{ t('sections.github.title') }}</h2>
        </div>
        <p class="section-subtitle">
          {{ t('sections.github.subtitle') }}
          <span v-if="isLive" class="live-badge">Live</span>
        </p>
      </div>

      <div class="github-layout">
        <aside class="profile-card glass-card">
          <img
            :src="profile.avatarUrl"
            :alt="profile.login"
            class="profile-avatar"
            loading="lazy"
          />
          <h3 class="profile-name">{{ profile.name ?? profile.login }}</h3>
          <a
            :href="profile.htmlUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="profile-handle"
          >
            @{{ profile.login }}
          </a>
          <p v-if="profile.bio" class="profile-bio">{{ profile.bio }}</p>

          <div class="profile-stats">
            <div class="stat">
              <strong>{{ profile.publicRepos }}</strong>
              <span>Repos</span>
            </div>
            <div class="stat">
              <strong>{{ profile.followers }}</strong>
              <span>Followers</span>
            </div>
          </div>

          <a
            :href="profile.htmlUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="github-btn"
          >
            <v-icon size="small">mdi-github</v-icon>
            {{ t('sections.github.viewProfile') }}
          </a>
        </aside>

        <div v-if="loading" class="repos-loading">
          <v-progress-circular indeterminate color="primary" size="32" />
        </div>

        <div v-else-if="repos.length" ref="gridRef" class="repos-grid">
          <a
            v-for="repo in repos"
            :key="repo.id"
            :href="repo.htmlUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="repo-card glass-card"
          >
            <div class="repo-header">
              <span class="repo-name">{{ repo.name }}</span>
              <v-icon size="small" class="repo-ext">mdi-open-in-new</v-icon>
            </div>
            <p v-if="repo.description" class="repo-desc">{{ repo.description }}</p>
            <div class="repo-meta">
              <span v-if="repo.language" class="repo-lang">
                <span
                  class="lang-dot"
                  :style="{ background: getLanguageColor(repo.language) }"
                />
                {{ repo.language }}
              </span>
              <span v-if="repo.stargazersCount" class="repo-stat">
                <v-icon size="x-small">mdi-star</v-icon>
                {{ repo.stargazersCount }}
              </span>
              <span v-if="repo.forksCount" class="repo-stat">
                <v-icon size="x-small">mdi-source-fork</v-icon>
                {{ repo.forksCount }}
              </span>
              <span class="repo-updated">Updated {{ formatDate(repo.updatedAt) }}</span>
            </div>
          </a>
        </div>

        <div v-else class="repos-empty glass-card">
          <v-icon size="large" color="primary">mdi-github</v-icon>
          <p>{{ t('sections.github.empty') }}</p>
          <a
            :href="`https://github.com/${GITHUB_USERNAME}`"
            target="_blank"
            rel="noopener noreferrer"
            class="github-btn inline"
          >
            github.com/{{ GITHUB_USERNAME }}
          </a>
        </div>
      </div>
    </v-container>
  </section>
</template>

<style scoped lang="scss">
.live-badge {
  display: inline-block;
  margin-left: 0.5rem;
  padding: 0.15rem 0.5rem;
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  border-radius: 999px;
  background: rgba(34, 197, 94, 0.15);
  color: var(--color-live-badge);
  border: 1px solid rgba(34, 197, 94, 0.35);
  vertical-align: middle;
}

.github-layout {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 1.5rem;
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.profile-card {
  padding: 1.5rem;
  text-align: center;
}

.profile-avatar {
  width: 88px;
  height: 88px;
  border-radius: 50%;
  border: 2px solid var(--color-border);
  margin-bottom: 1rem;
}

.profile-name {
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-text);
  margin: 0 0 0.25rem;
}

.profile-handle {
  display: block;
  font-size: 0.875rem;
  color: var(--color-primary-light);
  text-decoration: none;
  margin-bottom: 0.75rem;

  &:hover {
    text-decoration: underline;
  }
}

.profile-bio {
  font-size: 0.8125rem;
  color: var(--color-text-muted);
  line-height: 1.6;
  margin: 0 0 1rem;
}

.profile-stats {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 1.25rem;
}

.stat {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;

  strong {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--color-text);
  }

  span {
    font-size: 0.6875rem;
    color: var(--color-text-dim);
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }
}

.github-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  width: 100%;
  padding: 0.625rem 1rem;
  border-radius: var(--radius-md);
  background: rgba(59, 130, 246, 0.12);
  border: 1px solid rgba(59, 130, 246, 0.35);
  color: var(--color-primary-light);
  font-size: 0.8125rem;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.2s;

  &.inline {
    width: auto;
    margin-top: 0.75rem;
  }

  &:hover {
    background: rgba(59, 130, 246, 0.2);
  }
}

.repos-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
}

.repos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1rem;
}

.repo-card {
  display: block;
  padding: 1.25rem;
  text-decoration: none;
  color: inherit;
  transition: transform 0.35s var(--ease-out-expo), border-color 0.35s;

  &:hover {
    transform: translateY(-3px);
    border-color: var(--color-border-hover);

    .repo-ext {
      opacity: 1;
    }
  }
}

.repo-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.repo-name {
  font-family: var(--font-display);
  font-size: 0.9375rem;
  font-weight: 700;
  color: var(--color-primary-light);
}

.repo-ext {
  opacity: 0.4;
  color: var(--color-text-muted) !important;
}

.repo-desc {
  font-size: 0.8125rem;
  color: var(--color-text-muted);
  line-height: 1.55;
  margin: 0 0 0.875rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.repo-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.6875rem;
  color: var(--color-text-dim);
}

.repo-lang {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}

.lang-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.repo-stat {
  display: inline-flex;
  align-items: center;
  gap: 0.2rem;
}

.repo-updated {
  margin-left: auto;
}

.repos-empty {
  padding: 3rem 2rem;
  text-align: center;
  color: var(--color-text-muted);
  font-size: 0.9375rem;

  p {
    margin: 0.75rem 0 0;
  }
}
</style>
