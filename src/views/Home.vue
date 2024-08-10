<template>
  <div class="d-flex align-center justify-center flex-column home">
    <!-- Tagline -->
    <div class="home-tagline d-flex align-center justify-start py-1 px-4 mt-4" v-if="false">
      <img width="30" src="@/assets/icons/stars.svg" alt="HCMS" />
      <p class="">profileIntroduction('MFA');</p>
      <img width="30" src="@/assets/icons/stars.svg" alt="HCMS" />
    </div>
    <!-- Main heading -->
    <div class="d-flex align-center flex-row flex-wrap mt-6">
      <div class="image">
        <div
          class="base-card mr-md-4 d-flex align-center flex-column mx-8"
          ref="image"
          style="min-height: 400px"
        >
          <img src="@/assets/mferasatali.png" alt="ferasat" height="500px" />
          <p class="header-simple mt-4 text-grey">
            {{ `${experienceYears - 1}.${experienceMonths}` }}+ Years of Professional Experience
          </p>
        </div>
      </div>
      <div class="mt-5 mt-md-12 text-center home-title">
        <p class="base-title" ref="title1"></p>
        <p class="mt-4 base-title unique-title mt-2" ref="title2"></p>
      </div>
    </div>
    <!-- Description -->
    <p
      ref="description"
      class="base-body-text mt-2 home-description text-center text-text"
    ></p>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import moment from "moment";
import { getIntroduction } from "@/utils/googleSpreadSheetAPI";

gsap.registerPlugin(TextPlugin);

const startDate = moment("2021-02-01");
const currentDate = moment();
const experienceYears = ref(0);
const experienceMonths = ref(0);

const title1 = ref(null);
const title2 = ref(null);
const description = ref(null);
const image = ref(null);
const introduction = ref(
  "Welcome();! <br> I'm a passionate Software Engineer and Web Developer based in Lahore, Pakistan. <br> With expertise in building scalable web applications and a commitment to innovation, <br> I bring a unique blend of technical skills and creativity to drive success in every project. <br> Explore my journey through code and creativity below. <br> Let's build something amazing together! <br> Unlock more about my journey by clicking the button on right side."
);

onMounted(async () => {
  const intro = await getIntroduction();
  if (intro) {
    introduction.value = intro;
  }
  calculateExperience();
  gsap.to(image.value, {
    duration: 1,
    display: "block",
    opacity: 1,
    x: 1,
    y: 1,
    delay: 3,
  });
  gsap.to(title1.value, {
    duration: 2,
    text: "Muhammad Ferasat Ali",
    ease: "none",
    delay: 0.5,
  });
  gsap.to(title2.value, {
    duration: 1,
    text: "Full Stack Software Engineer",
    ease: "none",
    delay: 0.1,
  });
  gsap.to(description.value, {
    duration: 3,
    text: introduction.value,
    ease: "none",
    delay: 1,
  });
});
const calculateExperience = () => {
  const years = currentDate.diff(startDate, "years");
  const startDateWithYears = startDate.clone().add(years, "years");
  const months = currentDate.diff(startDateWithYears, "months");

  experienceMonths.value = months;
  experienceYears.value = years;
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/variables.scss";
@import "../../node_modules/vuetify/lib/styles/settings/_variables.scss";

.home {
  @media (min-width: 1800px) {
    margin-top: 3rem;
  }

  &-tagline {
    gap: 0.5rem;
    border-radius: 5rem;
    color: #ffffff;
    line-height: 1rem;
  }

  &-title {
    @media (max-width: 1100px) {
      width: 100%;
    }

    .unique-title {
      background: linear-gradient(180deg, #ffffff 9.77%, #b4a383 108.98%);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      color: transparent;
      -moz-background-clip: text;
      -ms-background-clip: text;
    }
  }

  &-description {
    width: 70%;
    margin-top: 3rem !important;
    color: #ffffff  !important;
  }
}

.base-card {
  opacity: 0;
  display: none;
  transform: translateX(-200px) translateY(-50px);
}

.image {
  @media (max-width: 1100px) {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top: 1rem;
  }
}
img {
  box-shadow: 0 0 0 5px rgba(0, 0, 0, 0.5); /* A subtle black shadow */
}
</style>
