<script setup lang="ts">
import DocumentLayout from "./DocumentLayout.vue";
import { PROFILE, DOWNLOAD_LINKS } from "@/utils/ferasatProfile";
import { COVER_LETTER } from "@/utils/ferasatCoverLetter";
</script>

<template>
  <DocumentLayout
    :download-url="DOWNLOAD_LINKS.coverLetter"
    download-label="Download Cover Letter"
  >
    <article class="paper letter-paper">
      <header class="letter-header">
        <div class="sender-block">
          <h1 class="sender-name">{{ PROFILE.name }}</h1>
          <p class="sender-title">{{ PROFILE.title }}</p>
          <div class="sender-contact">
            <p>{{ PROFILE.location }}</p>
            <p>
              <a :href="`mailto:${PROFILE.email}`">{{ PROFILE.email }}</a>
            </p>
            <p>
              <a :href="PROFILE.linkedin" target="_blank" rel="noopener">linkedin.com/in/mferasatali</a>
            </p>
            <p>
              <a :href="PROFILE.github" target="_blank" rel="noopener">github.com/mferasatali</a>
            </p>
          </div>
        </div>
        <p class="letter-date">{{ COVER_LETTER.date }}</p>
      </header>

      <div class="letter-body">
        <p class="letter-salutation">{{ COVER_LETTER.salutation }}</p>

        <p
          v-for="(paragraph, index) in COVER_LETTER.paragraphs"
          :key="index"
          class="letter-paragraph"
        >
          {{ paragraph }}
        </p>

        <div class="letter-closing">
          <p>{{ COVER_LETTER.closing }}</p>
          <p class="letter-signature">{{ COVER_LETTER.signature }}</p>
        </div>
      </div>
    </article>
  </DocumentLayout>
</template>

<style scoped lang="scss">
.paper {
  max-width: 750px;
  margin: 0 auto;
  background: #ffffff;
  color: #1e293b;
  border-radius: var(--radius-lg);
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.35);
  padding: clamp(2.5rem, 6vw, 4rem);
  font-family: Georgia, "Times New Roman", serif;
  line-height: 1.75;
}

.letter-header {
  margin-bottom: 2rem;
}

.sender-name {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 0.25rem;
}

.sender-title {
  font-family: var(--font-body);
  font-size: 0.875rem;
  color: #3b82f6;
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.sender-contact {
  font-family: var(--font-body);
  font-size: 0.8125rem;
  color: #64748b;
  line-height: 1.6;

  p {
    margin: 0;
  }

  a {
    color: #3b82f6;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}

.letter-date {
  margin-top: 1.5rem;
  font-size: 0.875rem;
  color: #64748b;
  font-family: var(--font-body);
}

.letter-salutation {
  font-size: 1rem;
  color: #0f172a;
  margin-bottom: 1.25rem;
}

.letter-paragraph {
  font-size: 0.9375rem;
  color: #334155;
  margin-bottom: 1rem;
  text-align: justify;
  hyphens: auto;
}

.letter-closing {
  margin-top: 1.75rem;
  font-size: 0.9375rem;
  color: #0f172a;
}

.letter-signature {
  margin-top: 2.5rem;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.125rem;
  color: #0f172a;
}

@media print {
  .paper {
    box-shadow: none;
    border-radius: 0;
    max-width: 100%;
    padding: 0;
  }

  a {
    color: #334155 !important;
    text-decoration: none !important;
  }
}
</style>
