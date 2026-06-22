<script setup lang="ts">
import { ref, provide, onMounted, watch, nextTick } from "vue";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/composables/useReducedMotion";
import { usePortfolioData } from "@/composables/usePortfolioData";
import { useLenisScroll } from "@/composables/useLenisScroll";
import { useScrollSpy } from "@/composables/useScrollSpy";

import Preloader from "./layout/Preloader.vue";
import SiteHeader from "./layout/SiteHeader.vue";
import FloatingNav from "./layout/FloatingNav.vue";
import SiteFooter from "./layout/SiteFooter.vue";
import SectionDivider from "./layout/SectionDivider.vue";
import ParticleField from "./effects/ParticleField.vue";
import CustomCursor from "./effects/CustomCursor.vue";

import HeroSection from "./sections/HeroSection.vue";
import AboutSection from "./sections/AboutSection.vue";
import ExperienceSection from "./sections/ExperienceSection.vue";
import SkillsSection from "./sections/SkillsSection.vue";
import ProjectsSection from "./sections/ProjectsSection.vue";
import GitHubSection from "./sections/GitHubSection.vue";
import BlogSection from "./sections/BlogSection.vue";
import TestimonialsSection from "./sections/TestimonialsSection.vue";
import RecruiterSection from "./sections/RecruiterSection.vue";
import ContactSection from "./sections/ContactSection.vue";
import RecruiterSummaryBar from "@/components/recruiter/RecruiterSummaryBar.vue";
import RecruiterPackDialog from "@/components/recruiter/RecruiterPackDialog.vue";
import { useRecruiterPack } from "@/composables/useRecruiterPack";

const { packOpen } = useRecruiterPack();

const { prefersReducedMotion } = useReducedMotion();
const {
  socialLinks,
  projects,
  experiences,
  education,
  skillCategories,
  skills,
  profile,
  profileTitle,
  introduction,
  canDo,
  isDataLoaded,
  articles,
  testimonials,
} = usePortfolioData();

const { lenis, initLenis, scrollTo, scrollToTop } = useLenisScroll(prefersReducedMotion);
const { activeSection } = useScrollSpy(lenis);

const isReady = ref(false);
const showPreloader = ref(true);

provide("scrollTo", scrollTo);
provide("prefersReducedMotion", prefersReducedMotion);

const onPreloaderDone = () => {
  showPreloader.value = false;
  isReady.value = true;
  initLenis();
};

watch(isDataLoaded, async () => {
  await nextTick();
  ScrollTrigger.refresh();
});

onMounted(() => {
  if (prefersReducedMotion.value) {
    showPreloader.value = false;
    isReady.value = true;
    initLenis();
  }

  if (window.location.hash) {
    const id = window.location.hash.replace("#", "");
    setTimeout(() => scrollTo(id), 600);
  }
});
</script>

<template>
  <Preloader v-if="showPreloader && !prefersReducedMotion" @done="onPreloaderDone" />

  <div class="landing-page" :class="{ 'is-ready': isReady || prefersReducedMotion }">
    <ParticleField :enabled="isReady && !prefersReducedMotion" />
    <CustomCursor />

    <SiteHeader :active-section="activeSection" @navigate="scrollTo" />
    <RecruiterSummaryBar />
    <FloatingNav :active-section="activeSection" @navigate="scrollTo" />

    <main>
      <HeroSection
        :introduction="introduction"
        :title="profileTitle"
        :location="profile.location"
        :social-links="socialLinks"
        :project-count="projects.length"
      />

      <SectionDivider id="d1" />
      <AboutSection :can-do="canDo" :is-data-loaded="isDataLoaded" />

      <SectionDivider id="d2" reverse />
      <ExperienceSection :experiences="experiences" :is-data-loaded="isDataLoaded" />

      <SectionDivider id="d3" />
      <SkillsSection
        :education="education"
        :skill-categories="skillCategories"
        :skills="skills"
        :is-data-loaded="isDataLoaded"
      />

      <SectionDivider id="d3b" reverse />
      <RecruiterSection />

      <SectionDivider id="d4" />
      <ProjectsSection :projects="projects" />

      <SectionDivider id="d4b" />
      <GitHubSection />

      <SectionDivider id="d5" />
      <BlogSection :articles="articles" />

      <SectionDivider id="d6" reverse />
      <TestimonialsSection :testimonials="testimonials" />

      <SectionDivider id="d7" />
      <ContactSection :social-links="socialLinks" :profile="profile" />
    </main>

    <SiteFooter :social-links="socialLinks" @scroll-top="scrollToTop" />
    <RecruiterPackDialog v-model="packOpen" />
  </div>
</template>

<style scoped lang="scss">
@import "./landing.scss";
</style>
