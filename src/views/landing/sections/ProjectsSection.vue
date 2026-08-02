<script setup lang="ts">
import { ref, watch, nextTick, onMounted, inject, computed, type Ref } from "vue";
import { RouterLink } from "vue-router";
import type { IProjects } from "@/interfaces";
import TiltCard from "../effects/TiltCard.vue";
import { useGsapReveal } from "@/composables/useGsapReveal";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const props = defineProps<{ projects: IProjects.PersonalProjectsPayload[] }>();

const prefersReducedMotion = inject<Ref<boolean>>("prefersReducedMotion")!;

const titleRef = ref<HTMLElement | null>(null);
const gridRef = ref<HTMLElement | null>(null);
const hoveredProjectId = ref<number | null>(null);
const modalOpen = ref(false);
const selectedProject = ref<IProjects.PersonalProjectsPayload | null>(null);
const showAll = ref(false);

const { revealSplit, staggerChildren, refresh } = useGsapReveal(prefersReducedMotion);

const featuredProjects = computed(() =>
  props.projects.filter((p) => p.featured)
);

const visibleProjects = computed(() =>
  showAll.value || featuredProjects.value.length === 0
    ? props.projects
    : featuredProjects.value
);

const hasMore = computed(
  () =>
    featuredProjects.value.length > 0 &&
    props.projects.length > featuredProjects.value.length
);

const featured = computed(() => selectedProject.value);

const badgeClass = (project: IProjects.PersonalProjectsPayload) =>
  project.isPrivate ? "badge-private" : "badge-public";

const openProject = (project: IProjects.PersonalProjectsPayload, index: number) => {
  selectedProject.value = project;
  hoveredProjectId.value = index;
  modalOpen.value = true;
};

const closeModal = () => {
  modalOpen.value = false;
  hoveredProjectId.value = null;
};

onMounted(() => {
  revealSplit(titleRef.value);
  if (gridRef.value) staggerChildren(gridRef.value, ".project-card");
});

watch(
  () => [gridRef.value, visibleProjects.value.length, showAll.value],
  async () => {
    await nextTick();
    if (gridRef.value) {
      staggerChildren(gridRef.value, ".project-card");
      refresh();
    }
  }
);
</script>

<template>
  <section id="projects" class="section projects-section">
    <div class="section-bg-decoration" />

    <v-container>
      <div class="section-header">
        <div class="section-title-wrapper">
          <span class="section-number">06</span>
          <h2 ref="titleRef" class="section-title">{{ t('sections.projects.title') }}</h2>
        </div>
        <p class="section-subtitle">
          {{ t('sections.projects.subtitle') }}
        </p>
      </div>

      <div ref="gridRef" class="projects-grid">
        <TiltCard
          v-for="(project, index) in visibleProjects"
          :key="project.slug || project.title"
          :class="['project-card-wrap', { featured: index === 0 }]"
        >
          <article
            class="project-card glass-card"
            :class="{ 'is-hovered': hoveredProjectId === index }"
            @mouseenter="hoveredProjectId = index"
            @mouseleave="hoveredProjectId = null"
            @click="openProject(project, index)"
            role="button"
            tabindex="0"
            @keydown.enter="openProject(project, index)"
          >
            <div class="card-glow" />
            <span class="project-type-badge" :class="badgeClass(project)">
              {{ project.projectType }}
            </span>

            <div
              v-if="project.projectImages?.length"
              class="project-image-wrap"
            >
              <img
                :src="project.projectImages[0]"
                :alt="project.title"
                class="project-image"
                loading="lazy"
              />
            </div>
            <div v-else class="project-placeholder">
              <v-icon size="48" color="primary">{{ project.isPrivate ? 'mdi-shield-lock' : 'mdi-open-source-initiative' }}</v-icon>
              <span>{{ project.isPrivate ? 'Enterprise Project' : 'Open Source' }}</span>
            </div>

            <div class="project-body">
              <h3 class="project-title">{{ project.title }}</h3>
              <p v-if="project.subtitle" class="project-sub">{{ project.subtitle }}</p>
              <p class="project-date">{{ project.date }}</p>

              <div class="stack-badges">
                <span v-for="(tech, i) in project.stack" :key="i" class="stack-badge">
                  {{ tech }}
                </span>
              </div>

              <p class="project-desc">{{ project.content[0] }}</p>
              <p v-if="project.content[2]" class="project-result">{{ project.content[2] }}</p>

              <div v-if="!project.isPrivate && (project.links.length || project.liveDemo)" class="project-links">
                <a
                  v-if="project.liveDemo"
                  :href="project.liveDemo"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="project-link demo-link"
                  @click.stop
                >
                  <v-icon size="small">mdi-play-circle-outline</v-icon>
                  {{ t('sections.projects.liveDemo') }}
                </a>
                <a
                  v-for="(link, idx) in project.links.filter((l) => l.url && l.name !== 'Live')"
                  :key="idx"
                  :href="link.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="project-link"
                  @click.stop
                >
                  <v-icon size="small">mdi-github</v-icon>
                  {{ link.name }}
                </a>
              </div>

              <RouterLink
                v-if="project.slug"
                :to="`/projects/${project.slug}`"
                class="card-case-link"
                @click.stop
              >
                {{ t('sections.projects.caseStudy') }}
              </RouterLink>
            </div>
          </article>
        </TiltCard>
      </div>

      <div class="projects-footer">
        <button
          v-if="hasMore"
          type="button"
          class="outline-btn toggle-more"
          @click="showAll = !showAll"
        >
          {{ showAll ? t('sections.projects.showLess') : t('sections.projects.showMore') }}
        </button>
        <RouterLink to="/labs" class="labs-link">
          {{ t('sections.projects.viewLabs') }}
        </RouterLink>
      </div>
    </v-container>

    <v-dialog v-model="modalOpen" max-width="720" scrollable @click:outside="closeModal">
      <div v-if="featured" class="modal-content glass-card">
        <div class="card-glow" />
        <button class="modal-close" aria-label="Close" @click="closeModal">
          <v-icon>mdi-close</v-icon>
        </button>

        <span class="project-type-badge modal-badge" :class="badgeClass(featured)">
          {{ featured.projectType }}
        </span>

        <h3 class="modal-title">{{ featured.title }}</h3>
        <p v-if="featured.subtitle" class="modal-sub">{{ featured.subtitle }}</p>
        <p class="modal-date">{{ featured.date }}</p>

        <div class="stack-badges mb-4">
          <span v-for="(tech, i) in featured.stack" :key="i" class="stack-badge">
            {{ tech }}
          </span>
        </div>

        <v-carousel
          v-if="featured.projectImages?.length"
          hide-delimiters
          show-arrows="hover"
          height="280"
          class="modal-carousel"
        >
          <v-carousel-item
            v-for="(img, i) in featured.projectImages.slice(0, 6)"
            :key="i"
            :src="img"
            cover
          />
        </v-carousel>

        <ul class="modal-features">
          <li v-for="(f, i) in featured.content" :key="i">{{ f }}</li>
        </ul>

        <div v-if="!featured.isPrivate && (featured.links.length || featured.liveDemo)" class="project-links">
          <a
            v-if="featured.liveDemo"
            :href="featured.liveDemo"
            target="_blank"
            rel="noopener noreferrer"
            class="project-link demo-link"
          >
            <v-icon size="small">mdi-play-circle-outline</v-icon>
            {{ t('sections.projects.liveDemo') }}
          </a>
          <a
            v-for="(link, idx) in featured.links.filter((l) => l.url && l.name !== 'Live')"
            :key="idx"
            :href="link.url"
            target="_blank"
            rel="noopener noreferrer"
            class="project-link"
          >
            <v-icon size="small">mdi-github</v-icon>
            {{ link.name }}
          </a>
        </div>

        <RouterLink
          v-if="featured.slug"
          :to="`/projects/${featured.slug}`"
          class="case-study-btn"
          @click="closeModal"
        >
          <v-icon size="small">mdi-text-box-search-outline</v-icon>
          {{ t('sections.projects.caseStudy') }}
        </RouterLink>
      </div>
    </v-dialog>
  </section>
</template>

<style scoped lang="scss">
.projects-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}

.project-card-wrap.featured {
  grid-column: span 2;

  .project-placeholder {
    height: 200px;
  }
}

.project-card {
  height: 100%;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: border-color 0.3s;

  &.is-hovered {
    border-color: rgba(59, 130, 246, 0.4);
  }
}

.project-type-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 2;
  font-size: 0.625rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 0.3rem 0.65rem;
  border-radius: 999px;
  font-weight: 600;
}

.badge-private {
  background: rgba(59, 130, 246, 0.15);
  border: 1px solid rgba(59, 130, 246, 0.35);
  color: var(--color-badge-private-text);
}

.badge-public {
  background: rgba(34, 197, 94, 0.15);
  border: 1px solid rgba(34, 197, 94, 0.35);
  color: var(--color-badge-public-text);
}

.project-image-wrap {
  height: 160px;
  overflow: hidden;
}

.project-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s var(--ease-out-expo);
}

.project-placeholder {
  height: 140px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(6, 182, 212, 0.05));
  color: var(--color-text-muted);
  font-size: 0.8125rem;
  font-weight: 500;
}

.project-card:hover .project-image {
  transform: scale(1.05);
}

.project-body {
  padding: 1.25rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.project-title {
  font-family: var(--font-display);
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
  padding-right: 5rem;
}

.project-sub {
  font-size: 0.875rem;
  color: var(--color-primary-light);
  margin-bottom: 0.25rem;
}

.project-date {
  font-size: 0.75rem;
  color: var(--color-text-dim);
  margin-bottom: 0.75rem;
}

.stack-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-bottom: 0.75rem;
}

.stack-badge {
  font-size: 0.6875rem;
  padding: 0.2rem 0.55rem;
  border-radius: 4px;
  background: var(--color-chip-bg);
  border: 1px solid var(--color-border);
  color: var(--color-text-muted);
}

.project-desc {
  font-size: 0.8125rem;
  color: var(--color-text-muted);
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.project-result {
  margin-top: 0.5rem;
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--color-primary-light);
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.project-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1rem;
}

.project-link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.8125rem;
  color: var(--color-primary-light);
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}

.card-case-link {
  margin-top: 0.85rem;
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--color-text);
  text-decoration: none;

  &:hover {
    color: var(--color-primary-light);
  }
}

.projects-footer {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
}

.toggle-more {
  border: 1px solid var(--color-border);
  background: transparent;
  color: var(--color-text-muted);
  border-radius: var(--radius-md);
  padding: 0.7rem 1.2rem;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    border-color: var(--color-primary);
    color: var(--color-primary-light);
  }
}

.labs-link {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-primary-light);
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}

.modal-content {
  padding: 2rem;
  position: relative;
  background: var(--color-surface) !important;
}

.modal-badge {
  position: static;
  display: inline-block;
  margin-bottom: 1rem;
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: var(--color-text-muted);
  cursor: pointer;
}

.modal-title {
  font-family: var(--font-display);
  font-size: 1.75rem;
  font-weight: 700;
  padding-right: 2rem;
}

.modal-sub {
  color: var(--color-primary-light);
  margin-top: 0.25rem;
}

.modal-date {
  font-size: 0.8125rem;
  color: var(--color-text-dim);
  margin: 0.5rem 0 1rem;
}

.modal-features {
  margin: 1rem 0;
  padding-left: 1.25rem;

  li {
    color: var(--color-text-muted);
    margin-bottom: 0.35rem;
    font-size: 0.9375rem;
  }
}

.case-study-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  margin-top: 1.25rem;
  padding: 0.75rem 1.25rem;
  border-radius: var(--radius-md);
  background: rgba(59, 130, 246, 0.12);
  border: 1px solid rgba(59, 130, 246, 0.35);
  color: var(--color-primary-light);
  font-size: 0.875rem;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.2s;

  &:hover {
    background: rgba(59, 130, 246, 0.22);
  }
}

@media (max-width: 960px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }

  .project-card-wrap.featured {
    grid-column: span 1;
  }
}

@media (max-width: 768px) {
  .project-card:hover .project-image {
    transform: none;
  }
}
</style>
