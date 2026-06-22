<script setup lang="ts">
import { onMounted } from "vue";
import { RouterLink } from "vue-router";
import {
  RECRUITER_SUMMARY,
  RECRUITER_FAQ,
  RECRUITER_PACK_LINKS,
  RECRUITER_SHORT_BIO,
  SKILL_MATCH_MATRIX,
  LEVEL_LABELS,
  CERTIFICATIONS,
  CLIENT_HIGHLIGHTS,
  EXPERIENCE_TIMELINE,
  CALENDLY_URL,
  RESUME_LAST_UPDATED,
} from "@/utils/ferasatRecruiter";
import { applyPageSeo } from "@/utils/siteSeo";
import ExperienceTimeline from "@/components/recruiter/ExperienceTimeline.vue";
import RecruiterPackDialog from "@/components/recruiter/RecruiterPackDialog.vue";
import { ref } from "vue";

const packOpen = ref(false);

onMounted(() => {
  applyPageSeo({
    path: "/recruiter",
    title: "Recruiter Brief · Muhammad Ferasat Ali",
    description: RECRUITER_SHORT_BIO,
  });
  window.scrollTo({ top: 0, behavior: "instant" });
});
</script>

<template>
  <div class="recruiter-page">
    <header class="page-toolbar">
      <div class="toolbar-inner">
        <RouterLink to="/" class="toolbar-back">
          <v-icon size="small">mdi-arrow-left</v-icon>
          Portfolio
        </RouterLink>
        <span class="toolbar-title">Recruiter brief</span>
      </div>
    </header>

    <main class="page-content">
      <h1 class="page-title">Muhammad Ferasat Ali</h1>
      <p class="page-subtitle">{{ RECRUITER_SUMMARY.role }} · {{ RECRUITER_SUMMARY.stack }}</p>
      <p class="page-bio">{{ RECRUITER_SHORT_BIO }}</p>
      <p class="last-updated">Resume updated {{ RESUME_LAST_UPDATED }}</p>

      <div class="summary-grid">
        <div v-for="(value, key) in RECRUITER_SUMMARY" :key="key" class="summary-cell">
          <span class="cell-key">{{ String(key).replace(/([A-Z])/g, " $1") }}</span>
          <span class="cell-value">{{ value }}</span>
        </div>
      </div>

      <ExperienceTimeline />

      <section class="block">
        <h2>Quick links</h2>
        <div class="link-grid">
          <template v-for="link in RECRUITER_PACK_LINKS" :key="link.label">
            <a
              v-if="'href' in link && link.href"
              :href="link.href"
              target="_blank"
              rel="noopener noreferrer"
              class="link-card"
            >
              <v-icon>{{ link.icon }}</v-icon>
              {{ link.label }}
            </a>
            <RouterLink v-else-if="'route' in link" :to="link.route" class="link-card">
              <v-icon>{{ link.icon }}</v-icon>
              {{ link.label }}
            </RouterLink>
          </template>
        </div>
      </section>

      <section class="block">
        <h2>Skills at a glance</h2>
        <div class="skills-grid">
          <div v-for="skill in SKILL_MATCH_MATRIX" :key="skill.skill" class="skill-pill" :class="`level-${skill.level}`">
            {{ skill.skill }}
            <span>{{ LEVEL_LABELS[skill.level] }}</span>
          </div>
        </div>
      </section>

      <section class="block">
        <h2>FAQ</h2>
        <div v-for="faq in RECRUITER_FAQ" :key="faq.question" class="faq-block">
          <h3>{{ faq.question }}</h3>
          <p>{{ faq.answer }}</p>
        </div>
      </section>

      <section class="block">
        <h2>Enterprise clients</h2>
        <ul class="client-grid">
          <li v-for="c in CLIENT_HIGHLIGHTS" :key="c.name">
            <strong>{{ c.name }}</strong> — {{ c.context }}
          </li>
        </ul>
      </section>

      <section class="block">
        <h2>Education &amp; certifications</h2>
        <ul>
          <li v-for="cert in CERTIFICATIONS" :key="cert.name">
            <strong>{{ cert.name }}</strong> ({{ cert.year }}) — {{ cert.issuer }}
          </li>
        </ul>
      </section>

      <div class="cta-row">
        <a
          v-if="CALENDLY_URL"
          :href="CALENDLY_URL"
          target="_blank"
          rel="noopener noreferrer"
          class="cta-btn primary"
        >
          Book a call
        </a>
        <RouterLink to="/#contact" class="cta-btn outline">Contact form</RouterLink>
        <button type="button" class="cta-btn outline" @click="packOpen = true">Open recruiter pack</button>
      </div>
    </main>

    <RecruiterPackDialog v-model="packOpen" />
  </div>
</template>

<style scoped lang="scss">
.recruiter-page {
  min-height: 100vh;
  background: var(--color-bg);
  color: var(--color-text);
}

.page-toolbar {
  position: sticky;
  top: 0;
  z-index: 50;
  background: var(--color-toolbar-bg);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--color-border);
}

.toolbar-inner {
  max-width: 800px;
  margin: 0 auto;
  padding: 0.875rem clamp(1rem, 4vw, 2rem);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.toolbar-back {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.875rem;
  color: var(--color-text-muted);
  text-decoration: none;
}

.toolbar-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-text-dim);
}

.page-content {
  max-width: 800px;
  margin: 0 auto;
  padding: clamp(2rem, 5vw, 4rem) clamp(1rem, 4vw, 2rem) 5rem;
}

.page-title {
  font-family: var(--font-display);
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 800;
}

.page-subtitle {
  color: var(--color-primary-light);
  font-weight: 600;
  margin: 0.5rem 0 1rem;
}

.page-bio {
  line-height: 1.7;
  color: var(--color-text-muted);
}

.last-updated {
  font-size: 0.75rem;
  color: var(--color-text-dim);
  margin: 0.75rem 0 2rem;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
  margin-bottom: 2rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
}

.summary-cell {
  padding: 0.75rem 1rem;
  background: var(--color-chip-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
}

.cell-key {
  display: block;
  font-size: 0.6875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--color-text-dim);
  margin-bottom: 0.25rem;
}

.cell-value {
  font-size: 0.875rem;
  color: var(--color-text);
}

.block {
  margin-bottom: 2.5rem;

  h2 {
    font-family: var(--font-display);
    font-size: 1.25rem;
    margin-bottom: 1rem;
  }

  ul {
    padding-left: 1.25rem;
    color: var(--color-text-muted);
    line-height: 1.7;
  }
}

.link-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
}

.link-card {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text);
  text-decoration: none;
  background: var(--color-chip-bg);

  &:hover {
    border-color: var(--color-border-hover);
    color: var(--color-primary-light);
  }
}

.skills-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.skill-pill {
  padding: 0.4rem 0.75rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border);
  font-size: 0.8125rem;
  font-weight: 600;
  background: var(--color-chip-bg);

  span {
    display: block;
    font-size: 0.625rem;
    font-weight: 400;
    color: var(--color-text-dim);
  }

  &.level-expert {
    border-color: rgba(34, 197, 94, 0.35);
  }
}

.faq-block {
  margin-bottom: 1.25rem;

  h3 {
    font-size: 0.9375rem;
    font-weight: 700;
    margin-bottom: 0.35rem;
  }

  p {
    font-size: 0.875rem;
    line-height: 1.6;
    color: var(--color-text-muted);
  }
}

.client-grid {
  list-style: none;
  padding: 0 !important;

  li {
    padding: 0.5rem 0;
    border-bottom: 1px solid var(--color-border);
    font-size: 0.875rem;
    color: var(--color-text-muted);
  }
}

.cta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 2rem;
}

.cta-btn {
  padding: 0.75rem 1.25rem;
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  border: none;

  &.primary {
    background: var(--color-primary);
    color: var(--color-on-primary);
  }

  &.outline {
    background: transparent;
    border: 1px solid var(--color-border);
    color: var(--color-text-muted);
  }
}
</style>
