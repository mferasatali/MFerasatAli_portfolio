<template>
  <section id="serving-best">
    <v-row align="center" justify="center">
      <v-col
        cols="12"
        class="d-flex align-center justify-center flex-column mt-9"
      >
        <p class="main-heading" ref="title1"></p>
        <p class="sub-heading" ref="title2"></p>
      </v-col>
      <!-- Education -->
      <v-col
        cols="12"
        sm="6"
        class="d-flex align-center justify-center mt-7 flex-wrap"
        style="gap: 1rem"
      >
        <div
          v-for="(education, index) in FerasatEducation"
          :key="index"
          class="base-card"
          :class="`${education.animation}`"
          :ref="animationEducation[index]"
        >
          <div class="d-flex flex-column" style="gap: 0.6rem">
            <p class="header-simple">
              {{ education.degree }}
              <span class="main-sub-heading text">
                - {{ education.studyIn }}
              </span>
            </p>
            <p class="main-sub-heading">{{ education.institutionName }}</p>
            <div class="d-flex justify-end">
              <p class="sub-heading text-whitew">{{ education.duration }}</p>
            </div>
            <p class="main-sub-heading" v-show="education.marks">
              {{ education.marks }}
            </p>
          </div>
        </div>
      </v-col>
      <!-- Skills & Interests -->
      <v-col cols="12" sm="6">
        <div
          class="base-card d-flex align-center flex-column animation animation-skills-interest ma-4"
          ref="skillsAndInterestAnimation"
        >
          <div class="d-flex flex-column" style="gap: 0.6rem">
            <p class="header-simple">Skills</p>
          </div>
          <div v-if="!loadingSkills">
            <v-chip
              v-for="(item, index) in skills"
              :key="index"
              :class="`ma-2 text-${getColorName()}`"
            >
              {{ item }}
            </v-chip>
          </div>
          <div v-else class="d-flex align-center flex-wrap">
            <v-skeleton-loader
              v-for="index in 10"
              :key="index"
              :class="`ma-1 text-${getColorName()}`"
              type="chip"
              width="100px"
              style="background-color: transparent"
            ></v-skeleton-loader>
          </div>
          <div class="d-flex flex-column" style="gap: 0.6rem">
            <p class="header-simple">Interests</p>
          </div>
          <divd v-if="!interestLoading">
            <v-chip
              v-for="(item, index) in interests"
              :key="index"
              :class="`ma-2 text-${getColorName()}`"
            >
              {{ item }}
            </v-chip>
          </divd>
          <div v-else class="d-flex align-center flex-wrap">
            <v-skeleton-loader
              v-for="index in 10"
              :key="index"
              :class="`ma-1 text-${getColorName()}`"
              type="chip"
              width="100px"
              style="background-color: transparent"
            ></v-skeleton-loader>
          </div>
        </div>
      </v-col>
    </v-row>
  </section>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import {
  FerasatInterests,
  FerasatSkills,
  FerasatEducation,
} from "@/utils/ferasatJourney";
gsap.registerPlugin(TextPlugin);

import {
  getSkillsFromSheet,
  getInterestsFromSheet,
} from "@/utils/googleSpreadSheetAPI";

const title1 = ref(null);
const title2 = ref(null);
const skillsAndInterestAnimation = ref(null);

const animationEducation = Array.from(
  { length: FerasatEducation.length },
  (_, i) => ref(null)
);
const skills = ref<string[]>([]);
const interests = ref<string[]>([]);
const loadingSkills = ref(false);
const interestLoading = ref(false);
const colorKeys = [
  "active-green",
  "leadership-management",
  "soft-skill",
  "it-and-software",
  "hard-skills",
  "green-skills",
  "link",
];

const getColorName = () => {
  return colorKeys[Math.floor(Math.random() * colorKeys.length)];
};

onMounted(async () => {
  gsap.to(skillsAndInterestAnimation.value, {
    duration: 1,
    opacity: 1,
    display: "block",
    x: 1,
    y: 1,
    delay: 0.7,
  });
  gsap.to(title1.value, {
    duration: 0.6,
    text: "Academic Journey",
    ease: "slow(0.7,0.7,false)",
    y: 3,
  });
  gsap.to(title2.value, {
    duration: 1,
    text: "Nurturing Knowledge, Empowering Futures",
    ease: "none",
    delay: 0.2,
  });
  loadingSkills.value = true;
  interestLoading.value = true;
  const result: any = await getSkillsFromSheet();
  if (result && result.length > 0) {
    skills.value = result;
  } else skills.value = FerasatSkills;

  const interestsFromSheet: any = await getInterestsFromSheet();

  if (interestsFromSheet && interestsFromSheet.length > 0) {
    interests.value = interestsFromSheet;
  } else interests.value = FerasatInterests;

  animationEducation.forEach((anim, index) => {
    gsap.to(anim.value, {
      duration: 1,
      opacity: 1,
      display: "block",
      x: 1,
      y: 1,
      delay: 0.3 + index * 0.1,
    });
  });
  loadingSkills.value = false;
  interestLoading.value = false;
});
</script>
<style scoped lang="scss">
@import "@/assets/scss/variables.scss";

#serving-best {
  .base-card {
    padding: 1.75rem 1.5rem !important;
    background: #263238 !important;
    // box-shadow: 0 6px 32px rgba(44, 50, 169, 0.04) !important;
    border-radius: 20px !important;
  }

  .animation {
    &-1 {
      transform: translateX(-500px) translateY(-800px);
      opacity: 0;
      display: none;
    }

    &-2 {
      transform: translateX(500px) translateY(-800px);
      opacity: 0;
      display: none;
    }

    &-3 {
      transform: translateX(-600px) translateY(100px);
      opacity: 0;
      display: none;
    }

    &-4 {
      transform: translateX(-800px) translateY(120px);
      opacity: 0;
      display: none;
    }

    &-skills-interest {
      transform: translateX(-1100px) translateY(300px);
      opacity: 0;
      display: "none";
    }
  }

  .text {
    color: #90a4dd;

    &-white {
      color: #fff;
    }
  }
}
</style>
