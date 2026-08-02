<script setup lang="ts">
import { ref, watch, nextTick, onMounted, inject, type Ref } from "vue";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { useGsapReveal } from "@/composables/useGsapReveal";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

gsap.registerPlugin(TextPlugin);

const props = defineProps<{ canDo: string; isDataLoaded: boolean }>();
const prefersReducedMotion = inject<Ref<boolean>>("prefersReducedMotion")!;

const titleRef = ref<HTMLElement | null>(null);
const numberRef = ref<HTMLElement | null>(null);
const subtitleRef = ref<HTMLElement | null>(null);
const bodyRef = ref<HTMLElement | null>(null);
const quoteRef = ref<HTMLElement | null>(null);

const { revealSplit, revealUp, parallax, refresh } = useGsapReveal(prefersReducedMotion);

const animateBody = () => {
  if (!bodyRef.value) return;
  if (prefersReducedMotion.value) {
    bodyRef.value.textContent = props.canDo;
    return;
  }
  gsap.to(bodyRef.value, {
    duration: 1.5,
    text: props.canDo,
    ease: "none",
  });
};

onMounted(() => {
  revealSplit(titleRef.value);
  revealUp(subtitleRef.value, { delay: 0.1 });
  revealUp(quoteRef.value, { delay: 0.2 });
  parallax(numberRef.value, 15);

  if (props.isDataLoaded) {
    animateBody();
  }
});

watch(
  () => props.canDo,
  () => {
    if (props.isDataLoaded) animateBody();
  }
);

watch(
  () => props.isDataLoaded,
  async (loaded) => {
    if (loaded) {
      await nextTick();
      animateBody();
      refresh();
    }
  }
);
</script>

<template>
  <section id="about" class="section about-section">
    <div class="section-bg-decoration" />
    <span ref="numberRef" class="section-watermark" aria-hidden="true">01</span>

    <v-container>
      <div class="about-grid">
        <div class="about-content">
          <div class="section-title-wrapper">
            <span class="section-number">01</span>
            <h2 ref="titleRef" class="section-title">{{ t('sections.about.title') }}</h2>
          </div>
          <p ref="subtitleRef" class="section-subtitle about-subtitle">
            {{ t('sections.about.subtitle') }}
          </p>
          <blockquote ref="quoteRef" class="pull-quote">
            "{{ t('sections.about.quote') }}"
          </blockquote>
          <p ref="bodyRef" class="about-body" />
        </div>
      </div>
    </v-container>
  </section>
</template>

<style scoped lang="scss">
.about-section {
  position: relative;
}

.section-watermark {
  position: absolute;
  top: 10%;
  right: 5%;
  font-family: var(--font-display);
  font-size: clamp(6rem, 15vw, 12rem);
  font-weight: 800;
  color: var(--color-watermark);
  line-height: 1;
  pointer-events: none;
  user-select: none;
}

.about-grid {
  max-width: 760px;
  margin: 0 auto;
}

.pull-quote {
  margin: 0 0 1.5rem;
  font-family: var(--font-display);
  font-size: 1.125rem;
  font-weight: 600;
  font-style: italic;
  color: var(--color-primary-light);
  border-left: 3px solid var(--color-primary);
  padding-left: 1rem;
}

.about-subtitle {
  text-align: left;
  margin: 0 0 1.25rem;
}

.about-body {
  font-size: 1.05rem;
  line-height: 1.85;
  color: var(--color-text-muted);
}

@media (max-width: 960px) {
  .about-subtitle {
    text-align: center;
  }

  .section-title-wrapper {
    justify-content: center;
  }

  .pull-quote {
    text-align: left;
  }
}
</style>
