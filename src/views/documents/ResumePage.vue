<script setup lang="ts">
import DocumentLayout from "./DocumentLayout.vue";
import { PROFILE, DOWNLOAD_LINKS } from "@/utils/ferasatProfile";
import { FerasatExperience } from "@/utils/ferasatExperiences";
import { FerasatEducation } from "@/utils/ferasatJourney";
import { FerasatSkillCategories } from "@/utils/ferasatSkillCategories";
import { FerasatProjects } from "@/utils/ferasatProjects";

const publicProjects = FerasatProjects.filter((p) => !p.isPrivate);
const featuredProjects = FerasatProjects.filter((p) => p.isPrivate).slice(0, 4);
</script>

<template>
  <DocumentLayout
    :download-url="DOWNLOAD_LINKS.resume"
    download-label="Download Resume"
  >
    <article class="paper resume-paper">
      <header class="resume-header">
        <div class="resume-header-text">
          <h1 class="resume-name">{{ PROFILE.name }}</h1>
          <p class="resume-title">{{ PROFILE.title }}</p>
          <div class="resume-contact">
            <span>{{ PROFILE.location }}</span>
            <span class="dot">·</span>
            <a :href="`mailto:${PROFILE.email}`">{{ PROFILE.email }}</a>
            <span class="dot">·</span>
            <a :href="PROFILE.linkedin" target="_blank" rel="noopener">LinkedIn</a>
            <span class="dot">·</span>
            <a :href="PROFILE.github" target="_blank" rel="noopener">GitHub</a>
          </div>
        </div>
      </header>

      <section class="resume-section">
        <h2 class="section-heading">Professional Summary</h2>
        <p class="summary-text">{{ PROFILE.summary }}</p>
      </section>

      <section class="resume-section">
        <h2 class="section-heading">Experience</h2>
        <div
          v-for="(exp, index) in FerasatExperience"
          :key="index"
          class="experience-block"
        >
          <div class="exp-header">
            <div>
              <h3 class="exp-role">{{ exp.role }}</h3>
              <p class="exp-company">{{ exp.companyName }}</p>
            </div>
            <div class="exp-meta">
              <span class="exp-duration">{{ exp.duration }}</span>
              <span v-if="exp.location" class="exp-location">{{ exp.location }}</span>
            </div>
          </div>
          <ul class="exp-list">
            <li v-for="(item, i) in exp.content" :key="i">{{ item }}</li>
          </ul>
        </div>
      </section>

      <section class="resume-section">
        <h2 class="section-heading">Education</h2>
        <div
          v-for="(edu, index) in FerasatEducation"
          :key="index"
          class="education-block"
        >
          <div class="edu-header">
            <h3 class="edu-degree">{{ edu.degree }} — {{ edu.studyIn }}</h3>
            <span class="edu-duration">{{ edu.duration }}</span>
          </div>
          <p class="edu-school">
            {{ edu.institutionName }}<span v-if="edu.location"> · {{ edu.location }}</span>
          </p>
        </div>
      </section>

      <section class="resume-section">
        <h2 class="section-heading">Technical Skills</h2>
        <div
          v-for="(cat, index) in FerasatSkillCategories"
          :key="index"
          class="skill-row"
        >
          <span class="skill-label">{{ cat.name }}:</span>
          <span class="skill-values">{{ cat.skills.join(" · ") }}</span>
        </div>
      </section>

      <section class="resume-section">
        <h2 class="section-heading">Selected Projects</h2>
        <div
          v-for="(project, index) in featuredProjects"
          :key="`e-${index}`"
          class="project-block"
        >
          <div class="project-header">
            <h3 class="project-name">
              {{ project.title }}
              <span v-if="project.subtitle" class="project-sub"> — {{ project.subtitle }}</span>
            </h3>
            <span class="project-type">{{ project.projectType }}</span>
          </div>
          <p class="project-stack">{{ project.stack.join(" · ") }}</p>
          <p class="project-desc">{{ project.content[0] }}</p>
        </div>

        <div
          v-for="(project, index) in publicProjects"
          :key="`p-${index}`"
          class="project-block"
        >
          <div class="project-header">
            <h3 class="project-name">{{ project.title }}</h3>
            <a
              v-if="project.links[0]?.url"
              :href="project.links[0].url"
              target="_blank"
              rel="noopener"
              class="project-link"
            >
              GitHub ↗
            </a>
          </div>
          <p class="project-stack">{{ project.stack.join(" · ") }}</p>
          <p class="project-desc">{{ project.content[0] }}</p>
        </div>
      </section>
    </article>
  </DocumentLayout>
</template>

<style scoped lang="scss">
.paper {
  max-width: 850px;
  margin: 0 auto;
  background: #ffffff;
  color: #1e293b;
  border-radius: var(--radius-lg);
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.35);
  padding: clamp(2rem, 5vw, 3rem);
  font-family: var(--font-body);
  line-height: 1.55;
}

.resume-header {
  border-bottom: 2px solid #3b82f6;
  padding-bottom: 1.25rem;
  margin-bottom: 1.5rem;
}

.resume-name {
  font-family: var(--font-display);
  font-size: clamp(1.75rem, 4vw, 2.25rem);
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 0.35rem;
  line-height: 1.15;
}

.resume-title {
  font-size: 0.9375rem;
  font-weight: 600;
  color: #3b82f6;
  margin-bottom: 0.75rem;
  line-height: 1.45;
}

.resume-contact {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem 0.5rem;
  font-size: 0.8125rem;
  color: #64748b;

  a {
    color: #3b82f6;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  .dot {
    color: #cbd5e1;
  }
}

.resume-section {
  margin-bottom: 1.5rem;
}

.section-heading {
  font-family: var(--font-display);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #3b82f6;
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 0.35rem;
  margin-bottom: 0.875rem;
}

.summary-text {
  font-size: 0.875rem;
  color: #475569;
  line-height: 1.65;
}

.experience-block {
  margin-bottom: 1.125rem;

  &:last-child {
    margin-bottom: 0;
  }
}

.exp-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 0.35rem;
}

.exp-role {
  font-size: 0.9375rem;
  font-weight: 700;
  color: #0f172a;
}

.exp-company {
  font-size: 0.875rem;
  font-weight: 600;
  color: #475569;
}

.exp-meta {
  text-align: right;
  flex-shrink: 0;
}

.exp-duration {
  display: block;
  font-size: 0.75rem;
  font-weight: 600;
  color: #64748b;
}

.exp-location {
  display: block;
  font-size: 0.6875rem;
  color: #94a3b8;
  margin-top: 0.15rem;
}

.exp-list {
  margin: 0;
  padding-left: 1.125rem;

  li {
    font-size: 0.8125rem;
    color: #475569;
    margin-bottom: 0.25rem;
    line-height: 1.55;
  }
}

.education-block {
  margin-bottom: 0.75rem;
}

.edu-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 1rem;
}

.edu-degree {
  font-size: 0.9375rem;
  font-weight: 700;
  color: #0f172a;
}

.edu-duration {
  font-size: 0.75rem;
  color: #64748b;
  font-weight: 600;
}

.edu-school {
  font-size: 0.8125rem;
  color: #64748b;
}

.skill-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem 0.5rem;
  margin-bottom: 0.5rem;
  font-size: 0.8125rem;
}

.skill-label {
  font-weight: 700;
  color: #0f172a;
  min-width: 5.5rem;
}

.skill-values {
  color: #475569;
  flex: 1;
}

.project-block {
  margin-bottom: 0.875rem;
  padding-bottom: 0.875rem;
  border-bottom: 1px solid #f1f5f9;

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 0.75rem;
  margin-bottom: 0.2rem;
}

.project-name {
  font-size: 0.875rem;
  font-weight: 700;
  color: #0f172a;
}

.project-sub {
  font-weight: 500;
  color: #64748b;
}

.project-type {
  font-size: 0.625rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #64748b;
  white-space: nowrap;
}

.project-link {
  font-size: 0.75rem;
  color: #3b82f6;
  text-decoration: none;
  white-space: nowrap;

  &:hover {
    text-decoration: underline;
  }
}

.project-stack {
  font-size: 0.6875rem;
  color: #3b82f6;
  margin-bottom: 0.25rem;
}

.project-desc {
  font-size: 0.8125rem;
  color: #475569;
  line-height: 1.5;
}

@media print {
  .paper {
    box-shadow: none;
    border-radius: 0;
    max-width: 100%;
    padding: 0;
  }

  a {
    color: #1e293b !important;
    text-decoration: none !important;
  }
}

@media (max-width: 640px) {
  .exp-header,
  .edu-header,
  .project-header {
    flex-direction: column;
    gap: 0.25rem;
  }

  .exp-meta {
    text-align: left;
  }
}
</style>
