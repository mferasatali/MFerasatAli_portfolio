<template>
  <div class="landing-page">
    <!-- Animated Background Particles -->
    <div class="particles-background">
      <div v-for="i in 50" :key="i" class="particle" :style="getParticleStyle(i)"></div>
    </div>

    <!-- Hero Section -->
    <section id="hero" class="hero-section">
      <div class="hero-background">
        <div class="gradient-orb orb-1"></div>
        <div class="gradient-orb orb-2"></div>
        <div class="gradient-orb orb-3"></div>
      </div>
      <v-container class="hero-container">
        <v-row align="center" justify="center" class="min-height-screen">
          <v-col cols="12" md="6" class="d-flex align-center justify-center flex-column">
            <div class="hero-content">
              <div class="greeting-text" ref="greetingRef">Hello, I'm</div>
              <h1 class="hero-title" ref="nameRef">Muhammad Ferasat Ali</h1>
              <h2 class="hero-subtitle" ref="roleRef">Full Stack Software Engineer</h2>
              <p class="hero-description" ref="descriptionRef"></p>
              <div class="hero-buttons mt-8">
                <v-btn
                  class="modern-btn mr-4 mb-4"
                  size="large"
                  @click="scrollToSection('projects')"
                >
                  View My Work
                </v-btn>
                <v-btn
                  class="outline-btn mb-4"
                  size="large"
                  variant="outlined"
                  @click="scrollToSection('contact')"
                >
                  Get In Touch
                </v-btn>
              </div>
              <div class="social-links mt-8">
                <a
                  v-for="(link, index) in socialLinks"
                  :key="index"
                  :href="link.link"
                  target="_blank"
                  class="social-link"
                >
                  <img :src="link.icon" :alt="link.name" />
                </a>
              </div>
            </div>
          </v-col>
          <v-col cols="12" md="6" class="d-flex align-center justify-center">
            <div class="hero-image-wrapper" ref="imageRef">
              <div class="image-glow"></div>
              <img
                src="@/assets/mferasatali_picture.jpg"
                alt="Muhammad Ferasat Ali"
                class="hero-image"
              />
            </div>
          </v-col>
        </v-row>
        <div class="scroll-indicator" @click="scrollToSection('about')">
          <v-icon>mdi-chevron-down</v-icon>
        </div>
      </v-container>
    </section>

    <!-- Section Divider -->
    <div class="section-divider">
      <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,50 Q360,0 720,50 T1440,50 L1440,100 L0,100 Z" fill="url(#gradient1)"/>
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:#6366f1;stop-opacity:0.3" />
            <stop offset="50%" style="stop-color:#8b5cf6;stop-opacity:0.2" />
            <stop offset="100%" style="stop-color:#06b6d4;stop-opacity:0.3" />
          </linearGradient>
        </defs>
      </svg>
    </div>

    <!-- About Section -->
    <section id="about" class="section about-section">
      <div class="section-bg-decoration"></div>
      <v-container>
        <v-row>
          <v-col cols="12" class="text-center mb-12">
            <div class="section-title-wrapper">
              <span class="section-number">01</span>
              <h2 class="section-title" ref="aboutTitleRef">About Me</h2>
            </div>
            <p class="section-subtitle" ref="aboutSubtitleRef"></p>
          </v-col>
          <v-col cols="12" md="8" class="mx-auto">
            <div class="glass-card about-card pa-8">
              <div class="card-glow"></div>
              <p class="about-text" ref="aboutTextRef"></p>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Section Divider -->
    <div class="section-divider reverse">
      <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,50 Q360,100 720,50 T1440,50 L1440,0 L0,0 Z" fill="url(#gradient2)"/>
        <defs>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:#6366f1;stop-opacity:0.3" />
            <stop offset="50%" style="stop-color:#8b5cf6;stop-opacity:0.2" />
            <stop offset="100%" style="stop-color:#06b6d4;stop-opacity:0.3" />
          </linearGradient>
        </defs>
      </svg>
    </div>

    <!-- Experience Section -->
    <section id="experience" class="section experience-section">
      <div class="section-bg-decoration"></div>
      <v-container>
        <v-row>
          <v-col cols="12" class="text-center mb-12">
            <div class="section-title-wrapper">
              <span class="section-number">02</span>
              <h2 class="section-title">Professional Experience</h2>
            </div>
            <p class="section-subtitle">Navigating Challenges and Driving Success</p>
          </v-col>
          <v-col cols="12" md="10" class="mx-auto">
            <div class="timeline">
              <div
                v-for="(exp, index) in experiences"
                :key="index"
                class="timeline-item"
                :ref="el => setExperienceRef(el, index)"
              >
                <div class="timeline-marker">
                  <div class="marker-pulse"></div>
                </div>
                <div class="glass-card experience-card pa-6">
                  <div class="card-glow"></div>
                  <div class="experience-header">
                    <div class="company-badge">
                      <v-icon class="mr-2">mdi-briefcase</v-icon>
                      <h3 class="experience-company">{{ exp.companyName }}</h3>
                    </div>
                    <span class="experience-role">{{ exp.role }}</span>
                    <span class="experience-duration">{{ exp.duration }}</span>
                  </div>
                  <ul class="experience-list mt-4">
                    <li v-for="(item, idx) in exp.content" :key="idx">{{ item }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Section Divider -->
    <div class="section-divider">
      <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,50 Q360,0 720,50 T1440,50 L1440,100 L0,100 Z" fill="url(#gradient3)"/>
        <defs>
          <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:#6366f1;stop-opacity:0.3" />
            <stop offset="50%" style="stop-color:#8b5cf6;stop-opacity:0.2" />
            <stop offset="100%" style="stop-color:#06b6d4;stop-opacity:0.3" />
          </linearGradient>
        </defs>
      </svg>
    </div>

    <!-- Skills & Education Section -->
    <section id="skills" class="section skills-section">
      <div class="section-bg-decoration"></div>
      <v-container>
        <v-row>
          <v-col cols="12" class="text-center mb-12">
            <div class="section-title-wrapper">
              <span class="section-number">03</span>
              <h2 class="section-title">Education & Skills</h2>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <h3 class="subsection-title mb-8">
              <v-icon class="mr-2">mdi-school</v-icon>
              Education
            </h3>
            <div
              v-for="(edu, index) in education"
              :key="index"
              class="glass-card education-card pa-6 mb-4"
              :ref="el => setEducationRef(el, index)"
            >
              <div class="card-glow"></div>
              <div class="education-icon">
                <v-icon>mdi-certificate</v-icon>
              </div>
              <h3 class="education-degree">{{ edu.degree }} - {{ edu.studyIn }}</h3>
              <p class="education-institution">{{ edu.institutionName }}</p>
              <p class="education-duration">{{ edu.duration }}</p>
              <p v-if="edu.marks" class="education-marks">{{ edu.marks }}</p>
            </div>
          </v-col>
          <v-col cols="12" md="6">
            <h3 class="subsection-title mb-8">
              <v-icon class="mr-2">mdi-code-tags</v-icon>
              Skills & Technologies
            </h3>
            <div class="glass-card skills-card pa-6">
              <div class="card-glow"></div>
              <div class="skills-grid">
                <div
                  v-for="(skill, index) in skills"
                  :key="index"
                  class="skill-chip"
                  :ref="el => setSkillRef(el, index)"
                >
                  {{ skill }}
                </div>
              </div>
              <h3 class="mt-8 mb-4">Interests</h3>
              <div class="interests-grid">
                <div
                  v-for="(interest, index) in interests"
                  :key="index"
                  class="interest-chip"
                >
                  {{ interest }}
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Section Divider -->
    <div class="section-divider reverse">
      <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,50 Q360,100 720,50 T1440,50 L1440,0 L0,0 Z" fill="url(#gradient4)"/>
        <defs>
          <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:#6366f1;stop-opacity:0.3" />
            <stop offset="50%" style="stop-color:#8b5cf6;stop-opacity:0.2" />
            <stop offset="100%" style="stop-color:#06b6d4;stop-opacity:0.3" />
          </linearGradient>
        </defs>
      </svg>
    </div>

    <!-- Projects Section -->
    <section id="projects" class="section projects-section">
      <div class="section-bg-decoration"></div>
      <v-container>
        <v-row>
          <v-col cols="12" class="text-center mb-12">
            <div class="section-title-wrapper">
              <span class="section-number">04</span>
              <h2 class="section-title">Featured Projects</h2>
            </div>
            <p class="section-subtitle">Exploring diverse realms, showcasing creativity and technical proficiency</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            v-for="(project, index) in projects"
            :key="index"
            cols="12"
            md="6"
            lg="4"
          >
            <div
              class="project-card glass-card"
              :ref="el => setProjectRef(el, index)"
              @mouseenter="project.selected = true"
              @mouseleave="project.selected = false"
            >
              <div class="card-glow"></div>
              <div class="project-badge">Project</div>
              <div class="project-image-wrapper" v-if="project.projectImages && project.projectImages.length">
                <v-carousel
                  v-if="project.selected"
                  show-arrows="hover"
                  height="200"
                  hide-delimiters
                  class="project-carousel"
                >
                  <v-carousel-item
                    v-for="(img, i) in project.projectImages.slice(0, 3)"
                    :key="i"
                    :src="img"
                    cover
                  ></v-carousel-item>
                </v-carousel>
                <img
                  v-else
                  :src="project.projectImages[0]"
                  :alt="project.title"
                  class="project-image"
                />
              </div>
              <div class="project-content pa-4">
                <div class="project-header">
                  <h3 class="project-title">{{ project.title }}</h3>
                  <span v-if="project.subtitle" class="project-subtitle">{{ project.subtitle }}</span>
                </div>
                <p class="project-date">{{ project.date }}</p>
                <ul class="project-features">
                  <li v-for="(feature, idx) in project.content.slice(0, 3)" :key="idx">
                    {{ feature }}
                  </li>
                </ul>
                <div class="project-links mt-4">
                  <a
                    v-for="(link, idx) in project.links"
                    :key="idx"
                    :href="link.url"
                    target="_blank"
                    class="project-link"
                  >
                    <v-icon class="mr-2">mdi-open-in-new</v-icon>
                    {{ link.name }}
                  </a>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Section Divider -->
    <div class="section-divider">
      <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,50 Q360,0 720,50 T1440,50 L1440,100 L0,100 Z" fill="url(#gradient5)"/>
        <defs>
          <linearGradient id="gradient5" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:#6366f1;stop-opacity:0.3" />
            <stop offset="50%" style="stop-color:#8b5cf6;stop-opacity:0.2" />
            <stop offset="100%" style="stop-color:#06b6d4;stop-opacity:0.3" />
          </linearGradient>
        </defs>
      </svg>
    </div>

    <!-- Contact Section -->
    <section id="contact" class="section contact-section">
      <div class="section-bg-decoration"></div>
      <v-container>
        <v-row>
          <v-col cols="12" class="text-center mb-12">
            <div class="section-title-wrapper">
              <span class="section-number">05</span>
              <h2 class="section-title">Get In Touch</h2>
            </div>
            <p class="section-subtitle">I'd love to hear from you. Let's connect!</p>
          </v-col>
          <v-col cols="12" md="8" class="mx-auto">
            <div class="glass-card contact-card pa-8">
              <div class="card-glow"></div>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="firstName"
                    label="First Name"
                    variant="outlined"
                    class="modern-input"
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="lastName"
                    label="Last Name"
                    variant="outlined"
                    class="modern-input"
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="email"
                    label="Email"
                    type="email"
                    variant="outlined"
                    class="modern-input"
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="phoneNumber"
                    label="Phone Number"
                    type="tel"
                    variant="outlined"
                    class="modern-input"
                  />
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    v-model="message"
                    label="Message"
                    rows="6"
                    variant="outlined"
                    class="modern-input"
                  />
                </v-col>
                <v-col cols="12" class="text-center">
                  <v-btn
                    class="modern-btn"
                    size="large"
                    @click="contactFerasat"
                    :loading="loading"
                  >
                    Send Message
                  </v-btn>
                </v-col>
              </v-row>
            </div>
            <div class="contact-info mt-8 text-center">
              <div class="contact-item">
                <v-icon class="mr-2">mdi-email</v-icon>
                <a href="mailto:mferasatali@gmail.com">mferasatali@gmail.com</a>
              </div>
              <div class="contact-item">
                <v-icon class="mr-2">mdi-phone</v-icon>
                <a href="tel:03424658936">+92 342 4658936</a>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Footer -->
    <footer class="footer-section">
      <v-container>
        <div class="footer-content text-center">
          <p>&copy; {{ new Date().getFullYear() }} Muhammad Ferasat Ali. All rights reserved.</p>
          <div class="footer-links mt-4">
            <a
              v-for="(link, index) in socialLinks"
              :key="index"
              :href="link.link"
              target="_blank"
              class="footer-link"
            >
              {{ link.name }}
            </a>
          </div>
        </div>
      </v-container>
    </footer>

    <!-- Floating Navigation -->
    <div class="floating-nav">
      <v-btn
        v-for="nav in navigation"
        :key="nav.id"
        class="nav-dot"
        :class="{ active: activeSection === nav.id }"
        @click="scrollToSection(nav.id)"
        icon
        size="small"
        variant="text"
      >
        <v-icon>{{ nav.icon }}</v-icon>
      </v-btn>
    </div>

    <v-snackbar
      v-model="snackbar"
      :timeout="4000"
      :color="snackbarColor"
      location="top right"
    >
      {{ snackbarMessage }}
    </v-snackbar>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FerasatProjects } from "@/utils/ferasatProjects";
import { FerasatExperience } from "@/utils/ferasatExperiences";
import { FerasatEducation, FerasatSkills, FerasatInterests } from "@/utils/ferasatJourney";
import { FerasatSocialLinks } from "@/utils/ferasatSocialLinks";
import { getSheetData, getExperienceFromSheet, getSkillsFromSheet, getInterestsFromSheet, loadSheetsApi } from "@/utils/googleSpreadSheetAPI";
import { IProjects, IExperience } from "@/interfaces";

gsap.registerPlugin(TextPlugin);
gsap.registerPlugin(ScrollTrigger);

// Data
const socialLinks = ref(FerasatSocialLinks);
const projects = ref(FerasatProjects);
const experiences = ref<IExperience.ExperiencePayload[]>([]);
const education = ref(FerasatEducation);
const skills = ref<string[]>([]);
const interests = ref<string[]>([]);
const activeSection = ref("hero");

// Contact form
const firstName = ref("");
const lastName = ref("");
const email = ref("");
const phoneNumber = ref("");
const message = ref("");
const loading = ref(false);
const snackbar = ref(false);
const snackbarMessage = ref("");
const snackbarColor = ref("success");

// Navigation
const navigation = [
  { id: "hero", icon: "mdi-home" },
  { id: "about", icon: "mdi-account" },
  { id: "experience", icon: "mdi-briefcase" },
  { id: "skills", icon: "mdi-school" },
  { id: "projects", icon: "mdi-folder" },
  { id: "contact", icon: "mdi-email" },
];

// Refs
const greetingRef = ref(null);
const nameRef = ref(null);
const roleRef = ref(null);
const descriptionRef = ref(null);
const imageRef = ref(null);
const aboutTitleRef = ref(null);
const aboutSubtitleRef = ref(null);
const aboutTextRef = ref(null);
const experienceRefs = ref<any[]>([]);
const educationRefs = ref<any[]>([]);
const skillRefs = ref<any[]>([]);
const projectRefs = ref<any[]>([]);

// Particle animation styles
const getParticleStyle = (index: number) => {
  const size = Math.random() * 4 + 2;
  const left = Math.random() * 100;
  const animationDuration = Math.random() * 20 + 10;
  const animationDelay = Math.random() * 5;
  
  return {
    width: `${size}px`,
    height: `${size}px`,
    left: `${left}%`,
    animationDuration: `${animationDuration}s`,
    animationDelay: `${animationDelay}s`,
  };
};

// Set refs functions
const setExperienceRef = (el: any, index: number) => {
  if (el) experienceRefs.value[index] = el;
};

const setEducationRef = (el: any, index: number) => {
  if (el) educationRefs.value[index] = el;
};

const setSkillRef = (el: any, index: number) => {
  if (el) skillRefs.value[index] = el;
};

const setProjectRef = (el: any, index: number) => {
  if (el) projectRefs.value[index] = el;
};

// Text content
const introduction = ref(
  "Welcome to my portfolio! I'm MFerasat Ali, a Software Engineer and Web Developer based in Lahore, Pakistan. With a Bachelor's in Computer Science from the University of Central Punjab, I specialize in technologies like JavaScript, Node.js, Vue.js, and Express. I've worked on impactful projects such as The95Star, SmartLuxuryRide, HCMS Recruitment Portal, and QudratTech.AI, focusing on robust online systems and AI-driven functionalities."
);

const canDo = ref(
  "As an experienced Software Engineer and Web Developer, I bring a unique blend of technical skills and practical expertise. My background includes comprehensive understanding of both frontend and backend development, utilizing technologies such as JavaScript, Vue.js, Node.js, and Express. I excel at creating intuitive, user-friendly interfaces and robust backend systems that enhance the overall user experience."
);

// Scroll to section
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

// Handle scroll for active section
const handleScroll = () => {
  const sections = navigation.map(nav => document.getElementById(nav.id)).filter(Boolean);
  const scrollPosition = window.scrollY + 200;

  sections.forEach((section) => {
    if (section) {
      const offsetTop = section.offsetTop;
      const offsetHeight = section.offsetHeight;
      if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
        activeSection.value = section.id;
      }
    }
  });
};

// Contact form submit
const contactFerasat = async () => {
  if (!firstName.value || !lastName.value || !email.value || !message.value || !phoneNumber.value) {
    snackbarMessage.value = "Please fill all fields";
    snackbarColor.value = "error";
    snackbar.value = true;
    return;
  }

  loading.value = true;
  try {
    const value = {
      Name: `${firstName.value} ${lastName.value}`,
      Email: email.value,
      Message: message.value,
      Phone: phoneNumber.value,
    };
    await loadSheetsApi(value);
    snackbarMessage.value = "Message sent successfully!";
    snackbarColor.value = "success";
    snackbar.value = true;
    firstName.value = "";
    lastName.value = "";
    email.value = "";
    message.value = "";
    phoneNumber.value = "";
  } catch (error) {
    snackbarMessage.value = "Error sending message. Please try again.";
    snackbarColor.value = "error";
    snackbar.value = true;
  }
  loading.value = false;
};

// Animations
onMounted(async () => {
  // Load data from Google Sheets
  try {
    const intro = await getSheetData("Introduction");
    if (intro) introduction.value = intro;

    const whatido = await getSheetData("CanDo");
    if (whatido) canDo.value = whatido;

    const experience = await getExperienceFromSheet();
    if (experience && experience.length) {
      experiences.value = experience.reverse();
    } else {
      experiences.value = FerasatExperience.reverse();
    }

    const skillsData = await getSkillsFromSheet();
    if (skillsData && skillsData.length) {
      skills.value = skillsData;
    } else {
      skills.value = FerasatSkills;
    }

    const interestsData = await getInterestsFromSheet();
    if (interestsData && interestsData.length) {
      interests.value = interestsData;
    } else {
      interests.value = FerasatInterests;
    }
  } catch (error) {
    console.error("Error loading data:", error);
    experiences.value = FerasatExperience.reverse();
    skills.value = FerasatSkills;
    interests.value = FerasatInterests;
  }

  // Hero animations
  gsap.to(greetingRef.value, {
    duration: 1,
    opacity: 1,
    y: 0,
    ease: "power2.out",
  });

  gsap.to(nameRef.value, {
    duration: 1.5,
    text: "Muhammad Ferasat Ali",
    ease: "none",
    delay: 0.3,
  });

  gsap.to(roleRef.value, {
    duration: 1,
    text: "Full Stack Software Engineer",
    ease: "none",
    delay: 1.5,
  });

  gsap.to(descriptionRef.value, {
    duration: 2,
    text: introduction.value,
    ease: "none",
    delay: 2.5,
  });

  gsap.from(imageRef.value, {
    duration: 1.5,
    scale: 0.8,
    opacity: 0,
    ease: "power2.out",
    delay: 0.5,
  });

  // About section
  gsap.to(aboutTitleRef.value, {
    scrollTrigger: {
      trigger: aboutTitleRef.value,
      start: "top 80%",
    },
    duration: 0.8,
    opacity: 1,
    y: 0,
  });

  gsap.to(aboutSubtitleRef.value, {
    scrollTrigger: {
      trigger: aboutSubtitleRef.value,
      start: "top 80%",
    },
    duration: 1,
    text: "Passionate about creating innovative solutions",
    ease: "none",
  });

  gsap.to(aboutTextRef.value, {
    scrollTrigger: {
      trigger: aboutTextRef.value,
      start: "top 80%",
    },
    duration: 2,
    text: canDo.value,
    ease: "none",
  });

  // Experience animations
  experienceRefs.value.forEach((ref, index) => {
    if (ref) {
      gsap.from(ref, {
        scrollTrigger: {
          trigger: ref,
          start: "top 80%",
        },
        duration: 0.8,
        opacity: 0,
        x: -50,
        delay: index * 0.1,
      });
    }
  });

  // Education animations
  educationRefs.value.forEach((ref, index) => {
    if (ref) {
      gsap.from(ref, {
        scrollTrigger: {
          trigger: ref,
          start: "top 80%",
        },
        duration: 0.8,
        opacity: 0,
        y: 30,
        delay: index * 0.1,
      });
    }
  });

  // Skills animations
  skillRefs.value.forEach((ref, index) => {
    if (ref) {
      gsap.from(ref, {
        scrollTrigger: {
          trigger: ref,
          start: "top 80%",
        },
        duration: 0.5,
        opacity: 0,
        scale: 0,
        delay: index * 0.03,
      });
    }
  });

  // Project animations
  projectRefs.value.forEach((ref, index) => {
    if (ref) {
      gsap.from(ref, {
        scrollTrigger: {
          trigger: ref,
          start: "top 80%",
        },
        duration: 0.8,
        opacity: 0,
        y: 50,
        delay: index * 0.1,
      });
    }
  });

  // Scroll listener
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
});
</script>

<style scoped lang="scss">
@import "@/assets/scss/global.scss";

.landing-page {
  position: relative;
  overflow-x: hidden;
}

// Animated Particles Background
.particles-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;

  .particle {
    position: absolute;
    background: radial-gradient(circle, rgba(99, 102, 241, 0.8) 0%, transparent 70%);
    border-radius: 50%;
    animation: float infinite ease-in-out;
    opacity: 0.6;
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0) translateX(0) scale(1);
      opacity: 0.6;
    }
    25% {
      transform: translateY(-100px) translateX(50px) scale(1.2);
      opacity: 0.8;
    }
    50% {
      transform: translateY(-200px) translateX(-30px) scale(0.8);
      opacity: 0.4;
    }
    75% {
      transform: translateY(-100px) translateX(-50px) scale(1.1);
      opacity: 0.7;
    }
  }
}

// Section Dividers
.section-divider {
  width: 100%;
  height: 100px;
  position: relative;
  z-index: 1;
  margin: -50px 0;

  &.reverse {
    transform: rotate(180deg);
  }

  svg {
    width: 100%;
    height: 100%;
    display: block;
  }
}

// Section Background Decoration
.section-bg-decoration {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.05) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
}

// Section Title Wrapper
.section-title-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-bottom: 16px;

  .section-number {
    font-size: 72px;
    font-weight: 900;
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    opacity: 0.3;
    font-family: "Poppins", sans-serif;
    line-height: 1;

    @media (max-width: 768px) {
      font-size: 48px;
    }
  }
}

.subsection-title {
  font-size: 32px;
  font-weight: 700;
  font-family: "Poppins", sans-serif;
  background: linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    font-size: 24px;
  }
}

// Hero Section
.hero-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 80px 0;
  overflow: hidden;

    .hero-background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.15) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.15) 0%, transparent 50%);
    z-index: 1;
    overflow: hidden;

    .gradient-orb {
      position: absolute;
      border-radius: 50%;
      filter: blur(80px);
      opacity: 0.5;
      animation: orbFloat 20s infinite ease-in-out;

      &.orb-1 {
        width: 500px;
        height: 500px;
        background: radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, transparent 70%);
        top: -200px;
        left: -200px;
        animation-delay: 0s;
      }

      &.orb-2 {
        width: 400px;
        height: 400px;
        background: radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%);
        bottom: -150px;
        right: -150px;
        animation-delay: 7s;
      }

      &.orb-3 {
        width: 300px;
        height: 300px;
        background: radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, transparent 70%);
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        animation-delay: 14s;
      }
    }

    @keyframes orbFloat {
      0%, 100% {
        transform: translate(0, 0) scale(1);
      }
      33% {
        transform: translate(50px, -50px) scale(1.1);
      }
      66% {
        transform: translate(-30px, 30px) scale(0.9);
      }
    }
  }

  .hero-container {
    position: relative;
    z-index: 2;
  }

  .min-height-screen {
    min-height: calc(100vh - 160px);
  }

  .greeting-text {
    font-size: 18px;
    color: #8b5cf6;
    font-weight: 500;
    margin-bottom: 10px;
    opacity: 0;
    transform: translateY(-20px);
  }

  .hero-title {
    font-size: 64px;
    font-weight: 800;
    background: linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 16px;
    line-height: 1.2;

    @media (max-width: 768px) {
      font-size: 42px;
    }
  }

  .hero-subtitle {
    font-size: 32px;
    font-weight: 600;
    color: #8b5cf6;
    margin-bottom: 24px;

    @media (max-width: 768px) {
      font-size: 24px;
    }
  }

  .hero-description {
    font-size: 18px;
    line-height: 1.8;
    color: #cbd5e1;
    max-width: 600px;
  }

  .hero-image-wrapper {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    .image-glow {
      position: absolute;
      width: 120%;
      height: 120%;
      background: radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, rgba(139, 92, 246, 0.2) 50%, transparent 70%);
      border-radius: 50%;
      filter: blur(60px);
      z-index: -1;
      animation: pulseGlow 3s infinite ease-in-out;
    }

    @keyframes pulseGlow {
      0%, 100% {
        transform: scale(1);
        opacity: 0.6;
      }
      50% {
        transform: scale(1.1);
        opacity: 0.8;
      }
    }

    .hero-image {
      width: 100%;
      max-width: 500px;
      height: auto;
      border-radius: 24px;
      border: 3px solid rgba(99, 102, 241, 0.4);
      box-shadow: 0 20px 60px rgba(99, 102, 241, 0.4),
                  0 0 100px rgba(139, 92, 246, 0.2);
      transition: all 0.3s ease;
      position: relative;
      z-index: 1;

      &:hover {
        transform: scale(1.02);
        box-shadow: 0 30px 80px rgba(99, 102, 241, 0.5),
                    0 0 120px rgba(139, 92, 246, 0.3);
      }
    }
  }

  .social-links {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;

    .social-link {
      width: 50px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(99, 102, 241, 0.1);
      border-radius: 12px;
      border: 1px solid rgba(99, 102, 241, 0.3);
      transition: all 0.3s ease;

      img {
        width: 24px;
        height: 24px;
        filter: brightness(0) invert(1);
      }

      &:hover {
        background: rgba(99, 102, 241, 0.2);
        transform: translateY(-3px);
        box-shadow: 0 10px 20px rgba(99, 102, 241, 0.3);
      }
    }
  }

  .scroll-indicator {
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    cursor: pointer;
    animation: bounce 2s infinite;

    @keyframes bounce {
      0%, 100% { transform: translateX(-50%) translateY(0); }
      50% { transform: translateX(-50%) translateY(-10px); }
    }

    .v-icon {
      font-size: 32px;
      color: #8b5cf6;
    }
  }
}

.outline-btn {
  border: 2px solid #6366f1;
  color: #6366f1;
  border-radius: 12px;
  padding: 12px 32px;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(99, 102, 241, 0.1);
    transform: translateY(-2px);
  }
}

// Section Styles
.section {
  padding: 100px 0;
  position: relative;
  z-index: 1;

  .section-title {
    font-size: 48px;
    font-weight: 700;
    font-family: "Poppins", sans-serif;
    background: linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 16px;

    @media (max-width: 768px) {
      font-size: 36px;
    }
  }

  .section-subtitle {
    font-size: 20px;
    color: #94a3b8;
    max-width: 600px;
    margin: 0 auto;
  }
}

// About Section
.about-section {
  .about-card {
    border-radius: 24px;
  }

  .about-text {
    font-size: 18px;
    line-height: 1.8;
    color: #cbd5e1;
  }
}

// Experience Section
.experience-section {
  .timeline {
    position: relative;
    padding-left: 40px;

    &::before {
      content: "";
      position: absolute;
      left: 15px;
      top: 0;
      bottom: 0;
      width: 2px;
      background: linear-gradient(180deg, #6366f1 0%, #8b5cf6 100%);
    }

    .timeline-item {
      position: relative;
      margin-bottom: 40px;

      .timeline-marker {
        position: absolute;
        left: -32px;
        top: 0;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
        border: 3px solid #0f172a;
        box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.3),
                    0 0 20px rgba(99, 102, 241, 0.5);
        z-index: 2;

        .marker-pulse {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: rgba(99, 102, 241, 0.6);
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(2);
            opacity: 0;
          }
        }
      }

      .experience-card {
        border-radius: 20px;
        transition: all 0.3s ease;

        &:hover {
          transform: translateX(10px);
          box-shadow: 0 10px 40px rgba(99, 102, 241, 0.2);
        }

        .experience-header {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          align-items: center;
          margin-bottom: 16px;

          .company-badge {
            display: flex;
            align-items: center;
            padding: 8px 16px;
            background: rgba(99, 102, 241, 0.1);
            border: 1px solid rgba(99, 102, 241, 0.3);
            border-radius: 12px;
            margin-right: auto;
          }

          .experience-company {
            font-size: 24px;
            font-weight: 700;
            color: #e2e8f0;
            margin: 0;
          }

          .experience-role {
            font-size: 18px;
            color: #8b5cf6;
            font-weight: 500;
          }

          .experience-duration {
            font-size: 14px;
            color: #94a3b8;
            margin-left: auto;
          }
        }

        .experience-list {
          list-style: none;
          padding: 0;

          li {
            padding: 8px 0;
            padding-left: 24px;
            position: relative;
            color: #cbd5e1;

            &::before {
              content: "▹";
              position: absolute;
              left: 0;
              color: #6366f1;
            }
          }
        }
      }
    }
  }
}

// Skills Section
.skills-section {
  .education-card {
    border-radius: 20px;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 40px rgba(99, 102, 241, 0.2);
    }

    .education-icon {
      width: 60px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%);
      border-radius: 16px;
      margin-bottom: 16px;
      border: 1px solid rgba(99, 102, 241, 0.3);

      .v-icon {
        font-size: 32px;
        color: #8b5cf6;
      }
    }

    .education-degree {
      font-size: 22px;
      font-weight: 600;
      color: #e2e8f0;
      margin-bottom: 8px;
    }

    .education-institution {
      font-size: 18px;
      color: #8b5cf6;
      margin-bottom: 4px;
    }

    .education-duration {
      font-size: 14px;
      color: #94a3b8;
      margin-bottom: 4px;
    }

    .education-marks {
      font-size: 16px;
      color: #cbd5e1;
      font-weight: 500;
    }
  }

  .skills-card {
    border-radius: 20px;
    min-height: 400px;

    .skills-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;

      .skill-chip {
        padding: 12px 24px;
        background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%);
        border: 1px solid rgba(99, 102, 241, 0.3);
        border-radius: 24px;
        color: #cbd5e1;
        font-weight: 500;
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;

        &::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
          transition: left 0.5s ease;
        }

        &:hover {
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%);
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 8px 20px rgba(99, 102, 241, 0.4);
          border-color: rgba(99, 102, 241, 0.5);

          &::before {
            left: 100%;
          }
        }
      }
    }

    .interests-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;

      .interest-chip {
        padding: 8px 16px;
        background: rgba(139, 92, 246, 0.1);
        border: 1px solid rgba(139, 92, 246, 0.3);
        border-radius: 16px;
        color: #cbd5e1;
        font-size: 14px;
      }
    }
  }
}

// Projects Section
.projects-section {
  .project-card {
    border-radius: 24px;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;

    .project-badge {
      position: absolute;
      top: 20px;
      right: 20px;
      padding: 6px 16px;
      background: linear-gradient(135deg, rgba(99, 102, 241, 0.9) 0%, rgba(139, 92, 246, 0.9) 100%);
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      color: white;
      z-index: 10;
      box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
    }

    &:hover {
      transform: translateY(-15px) scale(1.02);
      box-shadow: 0 25px 70px rgba(99, 102, 241, 0.4),
                  0 0 100px rgba(139, 92, 246, 0.2);
    }

    .project-image-wrapper {
      width: 100%;
      height: 200px;
      overflow: hidden;
      background: rgba(99, 102, 241, 0.1);

      .project-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
      }

      .project-carousel {
        border-radius: 0;
      }
    }

    .project-content {
      flex: 1;
      display: flex;
      flex-direction: column;

      .project-header {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        align-items: center;
        margin-bottom: 8px;

        .project-title {
          font-size: 22px;
          font-weight: 700;
          color: #e2e8f0;
          margin: 0;
        }

        .project-subtitle {
          font-size: 14px;
          color: #8b5cf6;
          padding: 4px 12px;
          background: rgba(139, 92, 246, 0.1);
          border-radius: 12px;
        }
      }

      .project-date {
        font-size: 14px;
        color: #94a3b8;
        margin-bottom: 12px;
      }

      .project-features {
        list-style: none;
        padding: 0;
        flex: 1;
        margin-bottom: 16px;

        li {
          padding: 6px 0;
          padding-left: 20px;
          position: relative;
          color: #cbd5e1;
          font-size: 14px;

          &::before {
            content: "▹";
            position: absolute;
            left: 0;
            color: #6366f1;
          }
        }
      }

      .project-links {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;

        .project-link {
          display: flex;
          align-items: center;
          padding: 8px 16px;
          background: rgba(99, 102, 241, 0.1);
          border: 1px solid rgba(99, 102, 241, 0.3);
          border-radius: 12px;
          color: #cbd5e1;
          text-decoration: none;
          font-size: 14px;
          transition: all 0.3s ease;

          &:hover {
            background: rgba(99, 102, 241, 0.2);
            transform: translateY(-2px);
          }
        }
      }
    }
  }
}

// Contact Section
.contact-section {
  .contact-card {
    border-radius: 24px;

    .modern-input {
      :deep(.v-field) {
        background: rgba(30, 41, 59, 0.5);
        border-color: rgba(99, 102, 241, 0.3);
      }
    }
  }

  .contact-info {
    display: flex;
    justify-content: center;
    gap: 40px;
    flex-wrap: wrap;

    .contact-item {
      display: flex;
      align-items: center;
      color: #cbd5e1;

      a {
        color: #cbd5e1;
        text-decoration: none;
        transition: color 0.3s ease;

        &:hover {
          color: #8b5cf6;
        }
      }
    }
  }
}

// Footer
.footer-section {
  padding: 40px 0;
  border-top: 1px solid rgba(99, 102, 241, 0.2);
  background: rgba(15, 23, 42, 0.5);

  .footer-content {
    p {
      color: #94a3b8;
      margin-bottom: 16px;
    }

    .footer-links {
      display: flex;
      justify-content: center;
      gap: 24px;
      flex-wrap: wrap;

      .footer-link {
        color: #cbd5e1;
        text-decoration: none;
        transition: color 0.3s ease;

        &:hover {
          color: #8b5cf6;
        }
      }
    }
  }
}

// Floating Navigation
.floating-nav {
  position: fixed;
  right: 30px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (max-width: 768px) {
    display: none;
  }

  .nav-dot {
    width: 56px;
    height: 56px;
    background: rgba(30, 41, 59, 0.9);
    backdrop-filter: blur(15px);
    border: 2px solid rgba(99, 102, 241, 0.3);
    border-radius: 16px;
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    position: relative;
    overflow: hidden;

    &::before {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0);
      width: 100%;
      height: 100%;
      background: radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, transparent 70%);
      border-radius: 50%;
      transition: transform 0.3s ease;
    }

    .v-icon {
      color: #cbd5e1;
      position: relative;
      z-index: 1;
      transition: all 0.3s ease;
    }

    &:hover {
      background: rgba(99, 102, 241, 0.2);
      transform: scale(1.15);
      border-color: rgba(99, 102, 241, 0.5);

      &::before {
        transform: translate(-50%, -50%) scale(1);
      }

      .v-icon {
        color: #8b5cf6;
        transform: scale(1.2);
      }
    }

    &.active {
      background: linear-gradient(135deg, rgba(99, 102, 241, 0.4) 0%, rgba(139, 92, 246, 0.4) 100%);
      border-color: #6366f1;
      box-shadow: 0 0 25px rgba(99, 102, 241, 0.6),
                  0 0 50px rgba(139, 92, 246, 0.3);
      transform: scale(1.1);

      &::before {
        transform: translate(-50%, -50%) scale(1);
      }

      .v-icon {
        color: #ffffff;
        transform: scale(1.1);
      }
    }
  }
}
</style>

