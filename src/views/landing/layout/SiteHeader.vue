<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { RouterLink } from "vue-router";
import { useMediaQuery } from "@vueuse/core";
import { NAV_ITEMS } from "@/constants/navigation";
import MagneticButton from "../effects/MagneticButton.vue";
import ThemeToggle from "@/components/ThemeToggle.vue";
import LanguageToggle from "@/components/LanguageToggle.vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

defineProps<{ activeSection: string }>();
const emit = defineEmits<{ navigate: [id: string] }>();

const isScrolled = ref(false);
const drawerOpen = ref(false);

/** Use drawer earlier so Labs/Resume/Contact never get clipped. */
const useDrawerNav = useMediaQuery("(max-width: 1280px)");

/** Wide screens: only key sections in the top bar; rest via right dots / menu. */
const desktopNavItems = computed(() =>
  NAV_ITEMS.filter((n) => ["about", "projects", "contact"].includes(n.id))
);

const onScroll = () => {
  isScrolled.value = window.scrollY > 60;
};

const navigate = (id: string) => {
  drawerOpen.value = false;
  emit("navigate", id);
};

onMounted(() => {
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
});

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
});
</script>

<template>
  <header class="site-header" :class="{ scrolled: isScrolled }">
    <div class="header-inner">
      <button class="logo" @click="navigate('hero')" :aria-label="t('header.goTop')">
        <span class="logo-text">MFA</span>
      </button>

      <nav v-if="!useDrawerNav" class="nav-desktop" aria-label="Main navigation">
        <button
          v-for="item in desktopNavItems"
          :key="item.id"
          class="nav-link"
          :class="{ active: activeSection === item.id }"
          @click="navigate(item.id)"
        >
          {{ t(`nav.${item.id}`) }}
        </button>
      </nav>

      <div class="header-actions">
        <RouterLink
          to="/labs"
          class="doc-link labs-link"
          target="_blank"
          rel="noopener"
          :aria-label="t('header.labs')"
        >
          <v-icon size="16">mdi-flask-outline</v-icon>
          <span class="link-text">{{ t("header.labs") }}</span>
        </RouterLink>

        <RouterLink v-if="!useDrawerNav" to="/resume" class="doc-link">
          {{ t("header.resume") }}
        </RouterLink>

        <LanguageToggle v-if="!useDrawerNav" />
        <ThemeToggle v-if="!useDrawerNav" />

        <MagneticButton v-if="!useDrawerNav" class="hire-wrap">
          <v-btn class="modern-btn hire-btn" size="small" @click="navigate('contact')">
            {{ t("header.hireMe") }}
          </v-btn>
        </MagneticButton>

        <button
          class="menu-toggle"
          :aria-expanded="drawerOpen"
          :aria-label="t('header.toggleMenu')"
          @click="drawerOpen = !drawerOpen"
        >
          <v-icon>{{ drawerOpen ? "mdi-close" : "mdi-menu" }}</v-icon>
        </button>
      </div>
    </div>

    <Transition name="drawer">
      <nav v-if="drawerOpen" class="nav-drawer" aria-label="Site navigation">
        <p class="drawer-label">{{ t("header.menuSections") }}</p>
        <button
          v-for="item in NAV_ITEMS"
          :key="item.id"
          class="drawer-link"
          :class="{ active: activeSection === item.id }"
          @click="navigate(item.id)"
        >
          <v-icon size="small">{{ item.icon }}</v-icon>
          {{ t(`nav.${item.id}`) }}
        </button>

        <p class="drawer-label">{{ t("header.menuPages") }}</p>
        <RouterLink to="/labs" class="drawer-doc-link" target="_blank" rel="noopener" @click="drawerOpen = false">
          <v-icon size="small">mdi-flask-outline</v-icon>
          {{ t("header.labs") }}
        </RouterLink>
        <RouterLink to="/resume" class="drawer-doc-link" @click="drawerOpen = false">
          <v-icon size="small">mdi-file-document-outline</v-icon>
          {{ t("header.resume") }}
        </RouterLink>
        <RouterLink to="/cover-letter" class="drawer-doc-link" @click="drawerOpen = false">
          <v-icon size="small">mdi-email-outline</v-icon>
          {{ t("header.coverLetter") }}
        </RouterLink>
        <RouterLink to="/blog" class="drawer-doc-link" @click="drawerOpen = false">
          <v-icon size="small">mdi-post-outline</v-icon>
          {{ t("header.articles") }}
        </RouterLink>

        <v-btn class="modern-btn mt-4" block @click="navigate('contact')">{{ t("header.hireMe") }}</v-btn>
        <div class="drawer-theme">
          <LanguageToggle />
          <ThemeToggle />
          <span>{{ t("header.toggleTheme") }}</span>
        </div>
      </nav>
    </Transition>
  </header>
</template>

<style scoped lang="scss">
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: var(--header-height);
  transition: background 0.4s var(--ease-out-expo),
    backdrop-filter 0.4s,
    border-color 0.4s;

  &.scrolled {
    background: var(--color-header-bg);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid var(--color-border);
  }
}

.header-inner {
  width: 100%;
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 clamp(0.85rem, 3vw, 2rem);
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  overflow: hidden;
}

.logo {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  flex-shrink: 0;
  z-index: 2;
}

.logo-text {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 800;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.nav-desktop {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.15rem;
  flex: 1 1 auto;
  min-width: 0;
}

.nav-link {
  background: none;
  border: none;
  color: var(--color-text-muted);
  font-size: 0.875rem;
  font-weight: 500;
  padding: 0.5rem 0.9rem;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: color 0.2s, background 0.2s;
  white-space: nowrap;

  &:hover,
  &.active {
    color: var(--color-text);
    background: rgba(99, 102, 241, 0.1);
  }

  &.active {
    color: var(--color-primary-light);
  }
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  flex-shrink: 0;
  z-index: 2;
}

.doc-link {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--color-text-muted);
  text-decoration: none;
  padding: 0.4rem 0.7rem;
  border-radius: var(--radius-sm);
  transition: color 0.2s, background 0.2s;
  white-space: nowrap;

  &:hover,
  &.router-link-active {
    color: var(--color-primary-light);
    background: rgba(59, 130, 246, 0.1);
  }
}

.labs-link {
  color: var(--color-primary-light);
  background: rgba(59, 130, 246, 0.12);
  font-weight: 600;

  &:hover {
    background: rgba(59, 130, 246, 0.2);
  }
}

.link-text {
  @media (max-width: 420px) {
    display: none;
  }
}

.hire-btn {
  font-size: 0.8125rem !important;
  padding: 0 1.1rem !important;
}

.hire-wrap {
  flex-shrink: 0;
}

.menu-toggle {
  background: none;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  color: var(--color-text);
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
}

.nav-drawer {
  position: fixed;
  top: var(--header-height);
  left: 0;
  right: 0;
  max-height: calc(100vh - var(--header-height));
  overflow-y: auto;
  background: var(--color-drawer-bg);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--color-border);
  padding: 1.25rem 1.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.drawer-label {
  margin: 0.75rem 0 0.15rem;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text-muted);

  &:first-child {
    margin-top: 0;
  }
}

.drawer-theme {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0;
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: var(--color-text-muted);
}

.drawer-doc-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1rem;
  border-radius: var(--radius-md);
  color: var(--color-text-muted);
  text-decoration: none;
  font-size: 1rem;
  border: 1px solid var(--color-border);

  &:hover {
    color: var(--color-primary-light);
    border-color: rgba(59, 130, 246, 0.35);
  }
}

.drawer-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: none;
  border: none;
  color: var(--color-text-muted);
  font-size: 1rem;
  padding: 0.875rem 1rem;
  border-radius: var(--radius-md);
  cursor: pointer;
  text-align: left;

  &.active {
    color: var(--color-primary-light);
    background: rgba(99, 102, 241, 0.1);
  }
}

.drawer-enter-active,
.drawer-leave-active {
  transition: opacity 0.3s, transform 0.3s var(--ease-out-expo);
}

.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
