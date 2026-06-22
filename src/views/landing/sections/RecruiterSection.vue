<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { RouterLink } from "vue-router";
import {
  RECRUITER_FAQ,
  SKILL_MATCH_MATRIX,
  SKILL_MATCH_PRESETS,
  LEVEL_LABELS,
  CERTIFICATIONS,
  CLIENT_HIGHLIGHTS,
  CALENDLY_URL,
  type SkillMatchLevel,
} from "@/utils/ferasatRecruiter";
import { useRecruiterPack } from "@/composables/useRecruiterPack";
import { useGsapReveal } from "@/composables/useGsapReveal";
import { useReducedMotion } from "@/composables/useReducedMotion";
import { trackEvent } from "@/composables/useAnalytics";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const { prefersReducedMotion } = useReducedMotion();
const { revealSplit, staggerChildren } = useGsapReveal(prefersReducedMotion);
const { openPack } = useRecruiterPack();

const titleRef = ref<HTMLElement | null>(null);
const gridRef = ref<HTMLElement | null>(null);
const searchQuery = ref("");
const expandedFaq = ref<number | null>(0);

const levelClass = (level: SkillMatchLevel) => `level-${level}`;

const matchedSkills = computed(() => {
  const q = searchQuery.value.toLowerCase().trim();
  if (!q) return SKILL_MATCH_MATRIX;

  const tokens = q.split(/\s+/).filter(Boolean);
  return SKILL_MATCH_MATRIX.map((item) => {
    const haystack = [item.skill, ...item.keywords].join(" ").toLowerCase();
    const hits = tokens.filter((t) => haystack.includes(t)).length;
    return { ...item, hits };
  })
    .filter((item) => (item as { hits?: number }).hits! > 0)
    .sort((a, b) => (b as { hits: number }).hits - (a as { hits: number }).hits);
});

const matchSummary = computed(() => {
  const q = searchQuery.value.trim();
  if (!q) return null;
  const count = matchedSkills.value.length;
  const expert = matchedSkills.value.filter((s) => s.level === "expert").length;
  return { count, expert, total: SKILL_MATCH_MATRIX.length };
});

const applyPreset = (query: string) => {
  searchQuery.value = query;
  trackEvent("skills_match_preset", { query });
};

const openPackDialog = () => {
  openPack();
  trackEvent("recruiter_pack_open");
};

onMounted(() => {
  revealSplit(titleRef.value);
  if (gridRef.value) staggerChildren(gridRef.value, ".recruiter-card");
});
</script>

<template>
  <section id="recruiters" class="section recruiter-section">
    <div class="section-bg-decoration" />

    <v-container>
      <div class="section-header">
        <div class="section-title-wrapper">
          <span class="section-number">04</span>
          <h2 ref="titleRef" class="section-title">{{ t('sections.recruiters.title') }}</h2>
        </div>
        <p class="section-subtitle">
          {{ t('sections.recruiters.subtitle') }}
        </p>
      </div>

      <div class="recruiter-actions">
        <v-btn class="modern-btn" @click="openPackDialog">
          <v-icon start>mdi-briefcase-download</v-icon>
          {{ t('sections.recruiters.pack') }}
        </v-btn>
        <v-btn
          v-if="CALENDLY_URL"
          class="outline-btn"
          variant="outlined"
          :href="CALENDLY_URL"
          target="_blank"
          rel="noopener noreferrer"
          tag="a"
        >
          <v-icon start>mdi-calendar</v-icon>
          {{ t('sections.recruiters.bookCall') }}
        </v-btn>
        <RouterLink to="/recruiter" class="recruiter-page-link">
          {{ t('sections.recruiters.fullPage') }}
        </RouterLink>
      </div>

      <div ref="gridRef" class="recruiter-grid">
        <!-- Skills matcher -->
        <div class="recruiter-card glass-card skills-card">
          <div class="card-glow" />
          <h3 class="card-title">
            <v-icon size="small" color="primary">mdi-magnify-scan</v-icon>
            {{ t('sections.recruiters.skillsMatch') }}
          </h3>
          <p class="card-desc">{{ t('sections.recruiters.skillsDesc') }}</p>

          <v-text-field
            v-model="searchQuery"
            :placeholder="t('sections.recruiters.skillsPlaceholder')"
            variant="outlined"
            density="compact"
            hide-details
            clearable
            class="skills-input"
          />

          <div class="preset-chips">
            <button
              v-for="preset in SKILL_MATCH_PRESETS"
              :key="preset.label"
              type="button"
              class="preset-chip"
              @click="applyPreset(preset.query)"
            >
              {{ preset.label }}
            </button>
          </div>

          <p v-if="matchSummary" class="match-summary">
            {{ t('sections.recruiters.matchOf', { count: matchSummary.count, total: matchSummary.total }) }}
            <span v-if="matchSummary.expert">{{ t('sections.recruiters.expertLevel', { count: matchSummary.expert }) }}</span>
          </p>

          <ul class="skills-list">
            <li
              v-for="item in matchedSkills"
              :key="item.skill"
              class="skill-row"
              :class="levelClass(item.level)"
            >
              <span class="skill-name">{{ item.skill }}</span>
              <span class="skill-level">{{ LEVEL_LABELS[item.level] }}</span>
            </li>
          </ul>
        </div>

        <!-- FAQ -->
        <div class="recruiter-card glass-card faq-card">
          <div class="card-glow" />
          <h3 class="card-title">
            <v-icon size="small" color="primary">mdi-frequently-asked-questions</v-icon>
            {{ t('sections.recruiters.recruiterFaq') }}
          </h3>
          <div class="faq-list">
            <div
              v-for="(faq, index) in RECRUITER_FAQ"
              :key="faq.question"
              class="faq-item"
              :class="{ expanded: expandedFaq === index }"
            >
              <button
                type="button"
                class="faq-question"
                :aria-expanded="expandedFaq === index"
                @click="expandedFaq = expandedFaq === index ? null : index"
              >
                {{ faq.question }}
                <v-icon size="small">{{ expandedFaq === index ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
              </button>
              <p v-show="expandedFaq === index" class="faq-answer">{{ faq.answer }}</p>
            </div>
          </div>
        </div>

        <!-- Certifications -->
        <div class="recruiter-card glass-card certs-card">
          <div class="card-glow" />
          <h3 class="card-title">
            <v-icon size="small" color="primary">mdi-certificate</v-icon>
            {{ t('sections.recruiters.educationCerts') }}
          </h3>
          <ul class="cert-list">
            <li v-for="cert in CERTIFICATIONS" :key="cert.name" class="cert-item">
              <span class="cert-year">{{ cert.year }}</span>
              <div>
                <strong>{{ cert.name }}</strong>
                <span class="cert-issuer">{{ cert.issuer }}</span>
              </div>
            </li>
          </ul>
        </div>

        <!-- Clients -->
        <div class="recruiter-card glass-card clients-card">
          <div class="card-glow" />
          <h3 class="card-title">
            <v-icon size="small" color="primary">mdi-domain</v-icon>
            {{ t('sections.recruiters.enterpriseExp') }}
          </h3>
          <ul class="client-list">
            <li v-for="client in CLIENT_HIGHLIGHTS" :key="client.name" class="client-item">
              <span class="client-name">{{ client.name }}</span>
              <span class="client-context">{{ client.context }}</span>
            </li>
          </ul>
        </div>
      </div>
    </v-container>
  </section>
</template>

<style scoped lang="scss">
.recruiter-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 2rem;
}

.outline-btn {
  border-color: var(--color-border) !important;
  color: var(--color-text-muted) !important;
  text-transform: none !important;
}

.recruiter-page-link {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-primary-light);
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}

.recruiter-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.recruiter-card {
  padding: 1.5rem;
}

.card-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 0.5rem;
}

.card-desc {
  font-size: 0.875rem;
  color: var(--color-text-muted);
  margin-bottom: 1rem;
}

.skills-input {
  margin-bottom: 0.75rem;
}

.preset-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.preset-chip {
  padding: 0.35rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 999px;
  border: 1px solid var(--color-border);
  background: var(--color-chip-bg);
  color: var(--color-text-muted);
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s;

  &:hover {
    border-color: var(--color-border-hover);
    color: var(--color-primary-light);
  }
}

.match-summary {
  font-size: 0.8125rem;
  color: var(--color-text-muted);
  margin-bottom: 0.75rem;

  strong {
    color: var(--color-accent);
  }
}

.skills-list {
  list-style: none;
  max-height: 280px;
  overflow-y: auto;
}

.skill-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--color-border);
  font-size: 0.8125rem;

  &:last-child {
    border-bottom: none;
  }
}

.skill-name {
  font-weight: 600;
  color: var(--color-text);
}

.skill-level {
  font-size: 0.6875rem;
  color: var(--color-text-dim);
  text-align: right;
}

.level-expert .skill-name {
  color: var(--color-accent);
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.faq-item {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  overflow: hidden;
}

.faq-question {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: var(--color-chip-bg);
  border: none;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-text);
  text-align: left;
  cursor: pointer;
}

.faq-answer {
  padding: 0 1rem 1rem;
  font-size: 0.8125rem;
  line-height: 1.6;
  color: var(--color-text-muted);
}

.cert-list,
.client-list {
  list-style: none;
}

.cert-item {
  display: flex;
  gap: 0.75rem;
  padding: 0.65rem 0;
  border-bottom: 1px solid var(--color-border);
  font-size: 0.875rem;

  strong {
    display: block;
    color: var(--color-text);
  }
}

.cert-year {
  flex-shrink: 0;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--color-primary-light);
  min-width: 2.5rem;
}

.cert-issuer {
  display: block;
  font-size: 0.75rem;
  color: var(--color-text-dim);
}

.client-item {
  padding: 0.65rem 0;
  border-bottom: 1px solid var(--color-border);

  &:last-child {
    border-bottom: none;
  }
}

.client-name {
  display: block;
  font-weight: 700;
  font-size: 0.875rem;
  color: var(--color-text);
}

.client-context {
  font-size: 0.75rem;
  color: var(--color-text-dim);
}

.skills-card {
  grid-row: span 2;

  @media (max-width: 900px) {
    grid-row: span 1;
  }
}
</style>
