<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";
import {
  RECRUITER_PACK_LINKS,
  RECRUITER_SHORT_BIO,
  CALENDLY_URL,
} from "@/utils/ferasatRecruiter";
import { trackEvent } from "@/composables/useAnalytics";

const open = defineModel<boolean>({ default: false });

const copied = ref(false);

const copyBio = async () => {
  try {
    await navigator.clipboard.writeText(RECRUITER_SHORT_BIO);
    copied.value = true;
    trackEvent("recruiter_pack_copy_bio");
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch {
    /* clipboard unavailable */
  }
};

const onLinkClick = (label: string) => {
  trackEvent("recruiter_pack_click", { item: label });
};
</script>

<template>
  <v-dialog v-model="open" max-width="520" class="pack-dialog">
    <div class="pack-card glass-card">
      <header class="pack-header">
        <h2 class="pack-title">Recruiter pack</h2>
        <p class="pack-sub">Resume, links, and bio — everything in one place.</p>
        <button class="pack-close" aria-label="Close" @click="open = false">
          <v-icon>mdi-close</v-icon>
        </button>
      </header>

      <div class="pack-bio">
        <p>{{ RECRUITER_SHORT_BIO }}</p>
        <v-btn size="small" variant="outlined" class="copy-btn" @click="copyBio">
          <v-icon start size="small">{{ copied ? "mdi-check" : "mdi-content-copy" }}</v-icon>
          {{ copied ? "Copied!" : "Copy bio" }}
        </v-btn>
      </div>

      <nav class="pack-links" aria-label="Recruiter resources">
        <template v-for="link in RECRUITER_PACK_LINKS" :key="link.label">
          <a
            v-if="'href' in link && link.href"
            :href="link.href"
            class="pack-link"
            target="_blank"
            rel="noopener noreferrer"
            @click="onLinkClick(link.label)"
          >
            <v-icon size="small">{{ link.icon }}</v-icon>
            {{ link.label }}
            <v-icon size="x-small" class="ml-auto">mdi-open-in-new</v-icon>
          </a>
          <RouterLink
            v-else-if="'route' in link"
            :to="link.route"
            class="pack-link"
            @click="onLinkClick(link.label); open = false"
          >
            <v-icon size="small">{{ link.icon }}</v-icon>
            {{ link.label }}
            <v-icon size="x-small" class="ml-auto">mdi-chevron-right</v-icon>
          </RouterLink>
        </template>
      </nav>

      <div class="pack-footer">
        <RouterLink to="/resume?print=1" class="print-link" @click="open = false">
          <v-icon size="small">mdi-printer</v-icon>
          Print-friendly resume
        </RouterLink>
        <a
          v-if="CALENDLY_URL"
          :href="CALENDLY_URL"
          target="_blank"
          rel="noopener noreferrer"
          class="calendly-link"
          @click="onLinkClick('Calendly')"
        >
          <v-icon size="small">mdi-calendar</v-icon>
          Book 30 min call
        </a>
      </div>
    </div>
  </v-dialog>
</template>

<style scoped lang="scss">
.pack-card {
  padding: 1.5rem;
  background: var(--color-surface) !important;
  position: relative;
}

.pack-header {
  margin-bottom: 1rem;
  padding-right: 2rem;
}

.pack-title {
  font-family: var(--font-display);
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--color-text);
}

.pack-sub {
  font-size: 0.875rem;
  color: var(--color-text-muted);
  margin-top: 0.25rem;
}

.pack-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: var(--color-text-muted);
  cursor: pointer;
  padding: 0.25rem;
}

.pack-bio {
  padding: 1rem;
  background: var(--color-chip-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  margin-bottom: 1rem;

  p {
    font-size: 0.875rem;
    line-height: 1.6;
    color: var(--color-text-muted);
    margin-bottom: 0.75rem;
  }
}

.copy-btn {
  text-transform: none !important;
  border-color: var(--color-border) !important;
  color: var(--color-text-muted) !important;
}

.pack-links {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.pack-link {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.75rem 1rem;
  border-radius: var(--radius-sm);
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text);
  text-decoration: none;
  border: 1px solid var(--color-border);
  background: var(--color-chip-bg);
  transition: border-color 0.2s, background 0.2s;

  &:hover {
    border-color: var(--color-border-hover);
    background: var(--color-chip-bg-hover);
    color: var(--color-primary-light);
  }
}

.pack-footer {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.25rem;
  padding-top: 1rem;
  border-top: 1px solid var(--color-border);
}

.print-link,
.calendly-link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--color-primary-light);
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}
</style>
