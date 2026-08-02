<script setup lang="ts">
import type { ISocialLinks } from "@/interfaces";
import { RouterLink } from "vue-router";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

defineProps<{ socialLinks: ISocialLinks.SocialLinks[] }>();
const emit = defineEmits<{ scrollTop: [] }>();
</script>

<template>
  <footer class="site-footer">
    <div class="footer-inner">
      <p class="copyright">
        &copy; {{ new Date().getFullYear() }} Muhammad Ferasat Ali. {{ t('footer.rights') }}
      </p>
      <div class="footer-links">
        <RouterLink to="/labs" class="footer-link" target="_blank" rel="noopener">{{ t('header.labs') }}</RouterLink>
        <RouterLink to="/resume" class="footer-link">{{ t('header.resume') }}</RouterLink>
        <RouterLink to="/cover-letter" class="footer-link">{{ t('header.coverLetter') }}</RouterLink>
        <RouterLink to="/blog" class="footer-link">{{ t('header.articles') }}</RouterLink>
        <a
          v-for="(link, index) in socialLinks"
          :key="index"
          :href="link.link"
          target="_blank"
          rel="noopener noreferrer"
          class="footer-link"
        >
          {{ link.name }}
        </a>
      </div>
      <button class="back-top" :aria-label="t('footer.backTop')" @click="emit('scrollTop')">
        <v-icon size="small">mdi-arrow-up</v-icon>
      </button>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.site-footer {
  padding: 3rem 0 2rem;
  border-top: 1px solid var(--color-border);
  background: var(--color-bg-elevated);
}

.footer-inner {
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 clamp(1rem, 4vw, 2rem);
  text-align: center;
  position: relative;
}

.copyright {
  font-size: 0.875rem;
  color: var(--color-text-muted);
  margin-bottom: 1rem;
}

.footer-links {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem 1.5rem;
}

.footer-link {
  font-size: 0.8125rem;
  color: var(--color-text-dim);
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: var(--color-primary-light);
  }
}

.back-top {
  position: absolute;
  right: clamp(1rem, 4vw, 2rem);
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid var(--color-border);
  background: var(--color-surface-glass);
  color: var(--color-text);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.2s, background 0.2s;

  &:hover {
    border-color: var(--color-primary);
    background: rgba(99, 102, 241, 0.1);
  }

  @media (max-width: 768px) {
    position: static;
    transform: none;
    margin: 1.5rem auto 0;
  }
}
</style>
