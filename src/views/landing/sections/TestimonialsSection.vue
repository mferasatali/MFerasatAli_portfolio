<script setup lang="ts">
import { ref, onMounted, inject, type Ref } from "vue";
import type { Testimonial } from "@/interfaces/testimonial.interface";
import { useGsapReveal } from "@/composables/useGsapReveal";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

defineProps<{ testimonials: Testimonial[] }>();

const prefersReducedMotion = inject<Ref<boolean>>("prefersReducedMotion")!;

const titleRef = ref<HTMLElement | null>(null);
const gridRef = ref<HTMLElement | null>(null);
const activeIndex = ref(0);

const { revealSplit, staggerChildren, refresh } = useGsapReveal(prefersReducedMotion);

const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

onMounted(() => {
  revealSplit(titleRef.value);
  if (gridRef.value) staggerChildren(gridRef.value, ".testimonial-card");
});

const setActive = (index: number) => {
  activeIndex.value = index;
};
</script>

<template>
  <section id="testimonials" class="section testimonials-section">
    <div class="section-bg-decoration" />

    <v-container>
      <div class="section-header">
        <div class="section-title-wrapper">
          <span class="section-number">08</span>
          <h2 ref="titleRef" class="section-title">{{ t('sections.testimonials.title') }}</h2>
        </div>
        <p class="section-subtitle">
          {{ t('sections.testimonials.subtitle') }}
        </p>
      </div>

      <div ref="gridRef" class="testimonials-grid">
        <article
          v-for="(item, index) in testimonials"
          :key="item.id"
          class="testimonial-card glass-card"
          :class="{ featured: index === activeIndex }"
          @mouseenter="setActive(index)"
        >
          <div class="card-glow" aria-hidden="true" />

          <div class="quote-icon" aria-hidden="true">
            <v-icon size="small">mdi-format-quote-open</v-icon>
          </div>

          <div class="stars" :aria-label="`${item.rating} out of 5 stars`">
            <v-icon
              v-for="n in item.rating"
              :key="n"
              size="small"
              class="star"
            >
              mdi-star
            </v-icon>
          </div>

          <blockquote class="testimonial-quote">
            "{{ item.quote }}"
          </blockquote>

          <footer class="testimonial-author">
            <div class="author-avatar" aria-hidden="true">
              {{ initials(item.name) }}
            </div>
            <div class="author-meta">
              <cite class="author-name">{{ item.name }}</cite>
              <p class="author-role">{{ item.role }}</p>
              <p class="author-company">{{ item.company }}</p>
            </div>
          </footer>
        </article>
      </div>
    </v-container>
  </section>
</template>

<style scoped lang="scss">
.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.25rem;
}

.testimonial-card {
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  min-height: 100%;
  transition: transform 0.4s var(--ease-out-expo), border-color 0.4s,
    box-shadow 0.4s;

  &:hover,
  &.featured {
    transform: translateY(-4px);
    border-color: var(--color-border-hover);
    box-shadow: var(--shadow-glow);
  }
}

.quote-icon {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
  background: rgba(59, 130, 246, 0.12);
  color: var(--color-primary-light);
  margin-bottom: 0.875rem;
}

.stars {
  display: flex;
  gap: 0.1rem;
  margin-bottom: 0.875rem;
}

.star {
  color: #fbbf24 !important;
}

.testimonial-quote {
  flex: 1;
  margin: 0 0 1.25rem;
  font-size: 0.9375rem;
  line-height: 1.7;
  color: var(--color-text-muted);
  font-style: normal;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 0.875rem;
  padding-top: 1rem;
  border-top: 1px solid var(--color-border);
}

.author-avatar {
  width: 44px;
  height: 44px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 0.8125rem;
  font-weight: 700;
  color: var(--color-primary-light);
  background: linear-gradient(
    135deg,
    rgba(59, 130, 246, 0.25),
    rgba(99, 102, 241, 0.15)
  );
  border: 1px solid rgba(59, 130, 246, 0.35);
}

.author-name {
  display: block;
  font-style: normal;
  font-size: 0.9375rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 0.15rem;
}

.author-role {
  margin: 0;
  font-size: 0.8125rem;
  color: var(--color-text-muted);
  line-height: 1.4;
}

.author-company {
  margin: 0.1rem 0 0;
  font-size: 0.75rem;
  color: var(--color-text-dim);
}

@media (min-width: 1024px) {
  .testimonials-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .testimonial-card.featured {
    grid-column: span 1;
  }
}
</style>
