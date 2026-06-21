<script setup lang="ts">
import { ref, onMounted, inject, type Ref } from "vue";
import gsap from "gsap";
import type { ISocialLinks } from "@/interfaces";
import MagneticButton from "../effects/MagneticButton.vue";
import StatsBar from "../layout/StatsBar.vue";
import { splitTextToWords } from "@/composables/useGsapReveal";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(TextPlugin);

const props = defineProps<{
  introduction: string;
  title: string;
  resumeUrl: string;
  location: string;
  socialLinks: ISocialLinks.SocialLinks[];
  projectCount: number;
}>();

const scrollTo = inject<(id: string) => void>("scrollTo")!;
const prefersReducedMotion = inject<Ref<boolean>>("prefersReducedMotion")!;

const greetingRef = ref<HTMLElement | null>(null);
const nameRef = ref<HTMLElement | null>(null);
const roleRef = ref<HTMLElement | null>(null);
const descRef = ref<HTMLElement | null>(null);
const imageRef = ref<HTMLElement | null>(null);

onMounted(() => {
  if (prefersReducedMotion.value) {
    if (descRef.value) descRef.value.textContent = props.introduction;
    return;
  }

  const visited = sessionStorage.getItem("mfa-visited");
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl.from(greetingRef.value, { opacity: 0, y: 20, duration: 0.5 })
    .from(roleRef.value, { opacity: 0, y: 20, duration: 0.5 }, "-=0.2");

  if (nameRef.value) {
    const words = splitTextToWords(nameRef.value);
    gsap.set(words, { y: "110%", opacity: 0 });
    tl.to(words, { y: 0, opacity: 1, duration: 0.7, stagger: 0.06 }, "-=0.3");
  }

  if (visited) {
    if (descRef.value) descRef.value.textContent = props.introduction;
    tl.from(descRef.value, { opacity: 0, y: 16, duration: 0.5 }, "-=0.2");
  } else {
    tl.from(descRef.value, { opacity: 0, duration: 0.5 }, "-=0.2");
    tl.to(
      descRef.value,
      { duration: 1.2, text: props.introduction, ease: "none" },
      "-=0.3"
    );
    sessionStorage.setItem("mfa-visited", "1");
  }

  tl.from(imageRef.value, { scale: 0.92, opacity: 0, duration: 0.8 }, "-=0.8");
});
</script>

<template>
  <section id="hero" class="hero-section">
    <div class="hero-mesh" aria-hidden="true" />
    <div class="hero-grain" aria-hidden="true" />

    <v-container class="hero-container">
      <v-row align="center" class="hero-row">
        <v-col cols="12" lg="6" class="hero-col-content">
          <div class="hero-content">
            <p class="greeting" ref="greetingRef">Hello, I'm</p>
            <h1 class="hero-name" ref="nameRef">Muhammad Ferasat Ali</h1>
            <p class="hero-role" ref="roleRef">{{ title }}</p>
            <p class="hero-desc" ref="descRef" />

            <div class="hero-actions">
              <MagneticButton>
                <v-btn class="modern-btn" size="large" @click="scrollTo('contact')">
                  Contact Me
                </v-btn>
              </MagneticButton>
              <MagneticButton>
                <v-btn
                  class="outline-btn"
                  size="large"
                  variant="outlined"
                  :href="resumeUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Resume
                </v-btn>
              </MagneticButton>
              <MagneticButton>
                <v-btn class="outline-btn" size="large" variant="outlined" @click="scrollTo('projects')">
                  View Projects
                </v-btn>
              </MagneticButton>
            </div>

            <StatsBar
              :projects="projectCount"
              years="3+"
              :location="location"
              class="hero-stats"
            />

            <div class="social-row">
              <a
                v-for="(link, index) in socialLinks"
                :key="index"
                :href="link.link"
                target="_blank"
                rel="noopener noreferrer"
                class="social-link"
                :aria-label="link.name"
              >
                <img v-if="link.icon" :src="link.icon" :alt="link.name" loading="lazy" />
                <v-icon v-else size="small">{{ link.name === 'Email' ? 'mdi-email' : 'mdi-link' }}</v-icon>
              </a>
            </div>
          </div>
        </v-col>

        <v-col cols="12" lg="6" class="hero-col-image">
          <div class="hero-image-wrap" ref="imageRef">
            <div class="image-ring" aria-hidden="true" />
            <img
              src="@/assets/my-profile.png"
              alt="Muhammad Ferasat Ali"
              class="hero-image"
              loading="eager"
            />
          </div>
        </v-col>
      </v-row>

      <button class="scroll-hint" aria-label="Scroll to about" @click="scrollTo('about')">
        <v-icon>mdi-chevron-down</v-icon>
      </button>
    </v-container>
  </section>
</template>

<style scoped lang="scss">
.hero-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding-top: var(--header-height);
  overflow: hidden;
}

.hero-mesh {
  position: absolute;
  inset: 0;
  background: var(--gradient-mesh);
}

.hero-grain {
  position: absolute;
  inset: 0;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  pointer-events: none;
}

.hero-container {
  position: relative;
  z-index: 1;
  max-width: var(--container-max);
}

.hero-row {
  min-height: calc(100vh - var(--header-height) - 4rem);
}

.hero-content {
  padding: 2rem 0;
}

.greeting {
  font-size: 0.875rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-primary-light);
  margin-bottom: 0.75rem;
}

.hero-name {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 800;
  line-height: 1.05;
  margin-bottom: 0.75rem;
  color: var(--color-text);
}

.hero-role {
  font-family: var(--font-display);
  font-size: clamp(0.95rem, 2vw, 1.2rem);
  font-weight: 600;
  line-height: 1.5;
  color: var(--color-primary-light);
  margin-bottom: 1.25rem;
}

.hero-desc {
  font-size: 1rem;
  line-height: 1.75;
  color: var(--color-text-muted);
  max-width: 560px;
  margin-bottom: 2rem;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: flex-start;
  margin-bottom: 1.5rem;
}

.hero-stats {
  margin-bottom: 1.5rem;
  width: 100%;
  max-width: 520px;
}

.social-row {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.social-link {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.2s, transform 0.2s;
  color: var(--color-text-muted);

  img {
    width: 20px;
    height: 20px;
    object-fit: contain;
  }

  &:hover {
    border-color: var(--color-primary);
    transform: translateY(-2px);
    color: var(--color-primary-light);
  }
}

.hero-image-wrap {
  position: relative;
  max-width: 420px;
  margin: 0 auto;
}

.image-ring {
  position: absolute;
  inset: -12px;
  border-radius: var(--radius-xl);
  background: var(--gradient-primary);
  opacity: 0.35;
  filter: blur(24px);
  animation: pulse-glow 4s ease-in-out infinite;
}

.hero-image {
  position: relative;
  width: 100%;
  border-radius: var(--radius-xl);
  border: 1px solid var(--color-border);
  object-fit: cover;
  aspect-ratio: 4/5;
}

@keyframes pulse-glow {
  0%,
  100% {
    opacity: 0.25;
    transform: scale(1);
  }
  50% {
    opacity: 0.45;
    transform: scale(1.02);
  }
}

.scroll-hint {
  position: absolute;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  background: none;
  border: 1px solid var(--color-border);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  color: var(--color-text-muted);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: bounce 2s ease infinite;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateX(-50%) translateY(0);
  }
  50% {
    transform: translateX(-50%) translateY(6px);
  }
}

@media (max-width: 960px) {
  .hero-content {
    text-align: center;
  }

  .hero-desc {
    margin-left: auto;
    margin-right: auto;
  }

  .hero-actions {
    justify-content: center;
  }

  .hero-stats {
    margin-left: auto;
    margin-right: auto;
  }

  .social-row {
    justify-content: center;
  }
}

@media (prefers-reduced-motion: reduce) {
  .scroll-hint,
  .image-ring {
    animation: none;
  }
}
</style>
