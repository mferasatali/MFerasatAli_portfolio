<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";
import type { ISocialLinks } from "@/interfaces";
import { loadSheetsApi } from "@/utils/googleSpreadSheetAPI";
import type { PROFILE } from "@/utils/ferasatProfile";
import { CALENDLY_URL } from "@/utils/ferasatRecruiter";
import { useRecruiterPack } from "@/composables/useRecruiterPack";
import MagneticButton from "../effects/MagneticButton.vue";

const { openPack } = useRecruiterPack();

defineProps<{
  socialLinks: ISocialLinks.SocialLinks[];
  profile: typeof PROFILE;
}>();

const firstName = ref("");
const lastName = ref("");
const email = ref("");
const phoneNumber = ref("");
const message = ref("");
const loading = ref(false);
const snackbar = ref(false);
const snackbarMessage = ref("");
const snackbarColor = ref("success");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const contactFerasat = async () => {
  if (!firstName.value || !lastName.value || !email.value || !message.value || !phoneNumber.value) {
    snackbarMessage.value = "Please fill all fields";
    snackbarColor.value = "error";
    snackbar.value = true;
    return;
  }

  if (!emailRegex.test(email.value)) {
    snackbarMessage.value = "Please enter a valid email address";
    snackbarColor.value = "error";
    snackbar.value = true;
    return;
  }

  loading.value = true;
  try {
    await loadSheetsApi({
      Name: `${firstName.value} ${lastName.value}`,
      Email: email.value,
      Message: message.value,
      Phone: phoneNumber.value,
    });
    snackbarMessage.value = "Message sent successfully!";
    snackbarColor.value = "success";
    snackbar.value = true;
    firstName.value = "";
    lastName.value = "";
    email.value = "";
    message.value = "";
    phoneNumber.value = "";
  } catch {
    snackbarMessage.value = "Error sending message. Please try again.";
    snackbarColor.value = "error";
    snackbar.value = true;
  }
  loading.value = false;
};
</script>

<template>
  <section id="contact" class="section contact-section">
    <div class="section-bg-decoration" />

    <v-container>
      <div class="contact-grid">
        <div class="contact-info">
          <div class="section-title-wrapper">
            <span class="section-number">08</span>
            <h2 class="section-title contact-title">Let's build something</h2>
          </div>
          <p class="contact-lead">
            I'd love to hear from you. Whether you have a project in mind or just want to connect — reach out.
          </p>

          <div class="contact-details">
            <a :href="`mailto:${profile.email}`" class="contact-detail">
              <v-icon>mdi-email</v-icon>
              {{ profile.email }}
            </a>
            <a :href="profile.linkedin" target="_blank" rel="noopener noreferrer" class="contact-detail">
              <v-icon>mdi-linkedin</v-icon>
              linkedin.com/in/mferasatali
            </a>
            <a :href="profile.github" target="_blank" rel="noopener noreferrer" class="contact-detail">
              <v-icon>mdi-github</v-icon>
              github.com/mferasatali
            </a>
            <a
              :href="profile.whatsappUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="contact-detail whatsapp-detail"
            >
              <v-icon>mdi-whatsapp</v-icon>
              {{ profile.phoneDisplay }}
            </a>
          </div>

          <div class="contact-social">
            <button type="button" class="social-chip recruiter-chip" @click="openPack">
              Recruiter pack
            </button>
            <a
              v-if="CALENDLY_URL"
              :href="CALENDLY_URL"
              target="_blank"
              rel="noopener noreferrer"
              class="social-chip"
            >
              Book 30 min
            </a>
            <RouterLink to="/recruiter" class="social-chip">Recruiter page</RouterLink>
            <RouterLink to="/resume" class="social-chip">Resume</RouterLink>
            <RouterLink to="/cover-letter" class="social-chip">Cover Letter</RouterLink>
            <a :href="profile.linkedin" target="_blank" rel="noopener noreferrer" class="social-chip">
              LinkedIn
            </a>
            <a :href="profile.github" target="_blank" rel="noopener noreferrer" class="social-chip">
              GitHub
            </a>
            <a :href="profile.whatsappUrl" target="_blank" rel="noopener noreferrer" class="social-chip">
              WhatsApp
            </a>
            <a :href="`mailto:${profile.email}`" class="social-chip">
              Email
            </a>
          </div>
        </div>

        <div class="contact-form-wrap glass-card">
          <div class="card-glow" />
          <v-row dense>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="firstName"
                label="First Name"
                variant="outlined"
                class="modern-input"
                hide-details="auto"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="lastName"
                label="Last Name"
                variant="outlined"
                class="modern-input"
                hide-details="auto"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="email"
                label="Email"
                type="email"
                variant="outlined"
                class="modern-input"
                hide-details="auto"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="phoneNumber"
                label="Phone Number"
                type="tel"
                variant="outlined"
                class="modern-input"
                hide-details="auto"
              />
            </v-col>
            <v-col cols="12">
              <v-textarea
                v-model="message"
                label="Message"
                rows="5"
                variant="outlined"
                class="modern-input"
                hide-details="auto"
              />
            </v-col>
            <v-col cols="12">
              <MagneticButton>
                <v-btn
                  class="modern-btn"
                  size="large"
                  block
                  :loading="loading"
                  @click="contactFerasat"
                >
                  Send Message
                </v-btn>
              </MagneticButton>
            </v-col>
          </v-row>
        </div>
      </div>
    </v-container>

    <v-snackbar v-model="snackbar" :timeout="4000" :color="snackbarColor" location="top right">
      {{ snackbarMessage }}
    </v-snackbar>
  </section>
</template>

<style scoped lang="scss">
.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: clamp(2rem, 5vw, 4rem);
  align-items: start;
}

.contact-title {
  text-align: left;
}

.contact-lead {
  font-size: 1.05rem;
  line-height: 1.75;
  color: var(--color-text-muted);
  margin: 1rem 0 2rem;
  max-width: 420px;
}

.contact-details {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.contact-detail {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--color-text);
  text-decoration: none;
  font-size: 0.9375rem;
  transition: color 0.2s;

  &:hover {
    color: var(--color-primary-light);
  }
}

.whatsapp-detail:hover {
  color: var(--color-whatsapp-hover);
}

.contact-social {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.social-chip {
  padding: 0.375rem 0.875rem;
  border-radius: 999px;
  border: 1px solid var(--color-border);
  font-size: 0.8125rem;
  color: var(--color-text-muted);
  text-decoration: none;
  transition: border-color 0.2s, color 0.2s;
  background: transparent;
  cursor: pointer;
  font-family: inherit;

  &:hover,
  &.router-link-active {
    border-color: var(--color-primary);
    color: var(--color-primary-light);
  }
}

.recruiter-chip {
  border-color: rgba(59, 130, 246, 0.35);
  color: var(--color-primary-light);
}

.contact-form-wrap {
  padding: clamp(1.5rem, 4vw, 2rem);
}

:deep(.modern-input) {
  .v-field {
    background: var(--color-chip-bg-hover);
    border-radius: var(--radius-md);
  }

  .v-field--focused {
    .v-field__outline {
      color: var(--color-primary) !important;
    }
  }
}

@media (max-width: 960px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }

  .contact-title {
    text-align: center;
  }

  .contact-lead {
    text-align: center;
    margin-left: auto;
    margin-right: auto;
  }

  .contact-details {
    align-items: center;
  }

  .contact-social {
    justify-content: center;
  }
}
</style>
