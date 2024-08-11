<template>
  <section>
    <v-row class="mt-12" align="center">
      <v-col
        cols="12"
        md="7"
        class="d-flex align-center justify-center flex-column"
      >
        <div class="text-center desc desc-div ma-2">
          <p class="main-heading1">Introduction</p>
          <p ref="description" class="base-body-text text-text1 mt-3"></p>
        </div>
      </v-col>
      <v-col
        cols="12"
        md="3"
        class="d-flex align-start flex-column"
        style="gap: 3rem"
      >
        <div class="image">
          <img
            src="@/assets/mferasatali_picture.jpg"
            alt="ferasat"
            height="500px"
          />
          <div class="desc desc-name pa-3">
            <div class="text-center home-title">
              <p class="main-heading1" ref="title1"></p>
              <p class="mt-1 main-heading1 unique-title mt-2" ref="title2"></p>
              <p class="main-heading1 mt-4 text-grey text-center" v-if="false">
                {{ `` }}+ 
              </p>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="d-flex align-center justify-center flex-column">
        <div class="text-center desc desc-do ma-2">
          <p class="main-heading1">What Can i do</p>
          <p ref="whaticando" class="base-body-text text-text mt-3"></p>
        </div>
      </v-col>
    </v-row>
  </section>
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
const whaticando = ref(null);
const image = ref(null);
const introduction = ref(
  "</br></br>Welcome to my portfolio! I'm MFerasat Ali, </br></br> a Software Engineer and Web Developer based in Lahore, Pakistan. With a Bachelor's in Computer Science from the University of Central Punjab, I specialize in technologies like JavaScript, Node.js, Vue.js, and Express.</br></br> I've worked on impactful projects such as The95Star, SmartLuxuryRide, HCMS Recruitment Portal, and QudratTech.AI, focusing on robust online systems and AI-driven functionalities. At Aslase, I integrate advanced features and manage system performance, drawing from my experience at Byte Sailors and HCMS.</br></br> Proficient in both frontend and backend development, I excel in creating seamless user experiences and scalable web applications. <br>"
);

const canDo = ref(
  "As an experienced Software Engineer and Web Developer, I bring a unique blend of technical skills and practical expertise to the table. <br> My background includes a comprehensive understanding of both frontend and backend development, utilizing technologies such as JavaScript, Vue.js, Node.js, and Express.<br> I excel at creating intuitive, user-friendly interfaces and robust backend systems that enhance the overall user experience. <br> My work often involves integrating cutting-edge functionalities, improving system efficiency, and ensuring the scalability of web applications. <br> Whether it's optimizing financial transactions or developing innovative features, my goal is to deliver high-quality, scalable solutions. Take a look at my portfolio to discover how my skills and experience can help bring your vision to life."
);

onMounted(async () => {
  const intro = await getIntroduction();
  if (intro) {
    introduction.value = intro;
  }
  calculateExperience();
  gsap.to(image.value, {
    display: "block",
    opacity: 1,
    x: 1,
    y: 1,
    duration: 2.5,
    ease: "bounce.in",
  });
  gsap.to(title1.value, {
    duration: 1,
    text: "Muhammad Ferasat Ali",
    ease: "none",
    delay: 0.5,
  });
  gsap.to(title2.value, {
    duration: 2,
    text: `FS - Software Engineer ( ${experienceYears.value - 1}.${experienceMonths.value}+ years)`,
    ease: "ease-out",
    delay: 2.1,
  });
  gsap.to(description.value, {
    text: introduction.value,
    duration: 1,
    scale: 1,
    ease: "expoScale(1, 2)",
  });
  gsap.to(whaticando.value, {
    text: canDo.value,
    duration: 1,
    scale: 1,
    ease: "expoScale(1, 2)",
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
    color: #ffffff !important;
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
  border-radius: 120px;
  width: 430px;
  @media (max-width: 450px) {
    width: 280px;
  }
}
.desc {
  border: 2px solid #1c0e0e;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1);
  background: #251414;
  padding: 30px;
  border-radius: 16px;
  &-div {
    min-width: 300px;
    max-width: 550px;
    @media (max-width: 450px) {
      min-width: 280px;
      max-width: 300;
    }
  }

  &-do {
    width: 80%;
  }
}
.text-text1 {
  color: rgb(203 216 247) !important
}
</style>
