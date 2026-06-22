<script setup lang="ts">
import { RouterLink } from "vue-router";
import { PROFILE } from "@/utils/ferasatProfile";
</script>

<template>
  <div class="not-found-page">
    <div class="not-found-bg" aria-hidden="true" />

    <main class="not-found-content">
      <p class="error-code">404</p>
      <h1>Page not found</h1>
      <p class="error-lead">
        The page you're looking for doesn't exist or was moved. Let's get you back on track.
      </p>

      <div class="not-found-actions">
        <RouterLink to="/" class="btn-primary">Back to portfolio</RouterLink>
        <RouterLink to="/blog" class="btn-outline">Articles</RouterLink>
        <RouterLink to="/resume" class="btn-outline">Resume</RouterLink>
      </div>

      <RouterLink to="/#contact" class="contact-link">
        <v-icon size="small">mdi-email-outline</v-icon>
        Contact {{ PROFILE.name.split(" ").slice(-2).join(" ") }}
      </RouterLink>
    </main>
  </div>
</template>

<style scoped lang="scss">
.not-found-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg);
  color: var(--color-text);
  position: relative;
  overflow: hidden;
  padding: 2rem;
}

.not-found-bg {
  position: absolute;
  inset: 0;
  background: var(--gradient-mesh);
  opacity: 0.7;
  pointer-events: none;
}

.not-found-content {
  position: relative;
  text-align: center;
  max-width: 480px;
}

.error-code {
  font-family: var(--font-display);
  font-size: clamp(5rem, 15vw, 8rem);
  font-weight: 800;
  line-height: 1;
  margin: 0 0 0.5rem;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  opacity: 0.85;
}

h1 {
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 4vw, 2rem);
  font-weight: 700;
  margin: 0 0 0.75rem;
}

.error-lead {
  color: var(--color-text-muted);
  line-height: 1.7;
  margin: 0 0 2rem;
}

.not-found-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.btn-primary,
.btn-outline {
  display: inline-flex;
  align-items: center;
  padding: 0.75rem 1.35rem;
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  font-weight: 600;
  text-decoration: none;
  transition: transform 0.2s, background 0.2s, border-color 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
}

.btn-primary {
  background: var(--color-primary);
  color: var(--color-on-primary);
  border: 1px solid var(--color-primary);

  &:hover {
    background: var(--color-primary-light);
  }
}

.btn-outline {
  background: transparent;
  color: var(--color-text-muted);
  border: 1px solid var(--color-border);

  &:hover {
    border-color: var(--color-border-hover);
    color: var(--color-primary-light);
  }
}

.contact-link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.8125rem;
  color: var(--color-text-dim);
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: var(--color-primary-light);
  }
}
</style>

<style lang="scss">
@import "@/assets/scss/tokens.scss";
</style>
