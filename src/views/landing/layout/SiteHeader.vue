<script setup lang="ts">
import { ref, inject, watch, onMounted, onUnmounted, nextTick } from "vue";
import { RouterLink } from "vue-router";
import { useMediaQuery, useEventListener } from "@vueuse/core";
import { DESKTOP_NAV_ITEMS, NAV_ITEMS } from "@/constants/navigation";
import MagneticButton from "../effects/MagneticButton.vue";
import ThemeToggle from "@/components/ThemeToggle.vue";
import LanguageToggle from "@/components/LanguageToggle.vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

defineProps<{ activeSection: string }>();
const emit = defineEmits<{ navigate: [id: string] }>();

const stopScroll = inject<() => void>("stopScroll", () => undefined);
const startScroll = inject<() => void>("startScroll", () => undefined);

const isScrolled = ref(false);
const drawerOpen = ref(false);

/** Desktop links from ~1024px; below that use the improved drawer. */
const showDesktopNav = useMediaQuery("(min-width: 1024px)");

const onScroll = () => {
  isScrolled.value = window.scrollY > 40;
};

const navigate = async (id: string) => {
  const wasOpen = drawerOpen.value;
  drawerOpen.value = false;
  startScroll();
  if (wasOpen) {
    await nextTick();
    // Let drawer unlock Lenis / body overflow before scrolling
    window.setTimeout(() => emit("navigate", id), 80);
  } else {
    emit("navigate", id);
  }
};

const toggleDrawer = () => {
  drawerOpen.value = !drawerOpen.value;
};

watch(drawerOpen, (open) => {
  if (open) stopScroll();
  else startScroll();
});

useEventListener(document, "keydown", (e: KeyboardEvent) => {
  if (e.key === "Escape" && drawerOpen.value) drawerOpen.value = false;
});

onMounted(() => {
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
});

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
  startScroll();
});
</script>

<template>
  <header class="site-header" :class="{ scrolled: isScrolled, 'menu-open': drawerOpen }">
    <div class="header-inner">
      <button class="logo" type="button" @click="navigate('hero')" :aria-label="t('header.goTop')">
        <span class="logo-text">MFA</span>
      </button>

      <nav v-if="showDesktopNav" class="nav-desktop" aria-label="Main navigation">
        <button
          v-for="item in DESKTOP_NAV_ITEMS"
          :key="item.id"
          type="button"
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

        <RouterLink v-if="showDesktopNav" to="/resume" class="doc-link">
          {{ t("header.resume") }}
        </RouterLink>

        <LanguageToggle v-if="showDesktopNav" />
        <ThemeToggle v-if="showDesktopNav" />

        <MagneticButton v-if="showDesktopNav" class="hire-wrap">
          <v-btn class="modern-btn hire-btn" size="small" @click="navigate('contact')">
            {{ t("header.hireMe") }}
          </v-btn>
        </MagneticButton>

        <button
          class="menu-toggle"
          type="button"
          :aria-expanded="drawerOpen"
          :aria-controls="drawerOpen ? 'site-nav-drawer' : undefined"
          :aria-label="t('header.toggleMenu')"
          @click="toggleDrawer"
        >
          <span class="burger" :class="{ open: drawerOpen }" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>
    </div>

    <Teleport to="body">
      <Transition name="drawer-fade">
        <div
          v-if="drawerOpen"
          class="nav-backdrop"
          data-lenis-prevent
          @click="drawerOpen = false"
        />
      </Transition>

      <Transition name="drawer-slide">
        <aside
          v-if="drawerOpen"
          id="site-nav-drawer"
          class="nav-drawer"
          data-lenis-prevent
          role="dialog"
          aria-modal="true"
          :aria-label="t('header.toggleMenu')"
        >
          <div class="drawer-head">
            <div>
              <p class="drawer-kicker">Menu</p>
              <p class="drawer-title">Navigate</p>
            </div>
            <button type="button" class="drawer-close" :aria-label="t('header.toggleMenu')" @click="drawerOpen = false">
              <v-icon>mdi-close</v-icon>
            </button>
          </div>

          <div class="drawer-scroll" data-lenis-prevent>
            <p class="drawer-label">{{ t("header.menuSections") }}</p>
            <button
              v-for="item in NAV_ITEMS"
              :key="item.id"
              type="button"
              class="drawer-link"
              :class="{ active: activeSection === item.id }"
              @click="navigate(item.id)"
            >
              <v-icon size="small">{{ item.icon }}</v-icon>
              <span>{{ t(`nav.${item.id}`) }}</span>
              <v-icon v-if="activeSection === item.id" size="small" class="check">mdi-check</v-icon>
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
            <RouterLink to="/recruiter" class="drawer-doc-link" @click="drawerOpen = false">
              <v-icon size="small">mdi-account-tie</v-icon>
              {{ t("nav.recruiters") }}
            </RouterLink>
          </div>

          <div class="drawer-footer">
            <v-btn class="modern-btn" block @click="navigate('contact')">{{ t("header.hireMe") }}</v-btn>
            <div class="drawer-theme">
              <LanguageToggle />
              <ThemeToggle />
              <span>{{ t("header.toggleTheme") }}</span>
            </div>
          </div>
        </aside>
      </Transition>
    </Teleport>
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
  transition: background 0.35s var(--ease-out-expo),
    backdrop-filter 0.35s,
    border-color 0.35s;

  &.scrolled,
  &.menu-open {
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
  gap: 0.1rem;
  flex: 1 1 auto;
  min-width: 0;
}

.nav-link {
  background: none;
  border: none;
  color: var(--color-text-muted);
  font-size: 0.8125rem;
  font-weight: 600;
  padding: 0.45rem 0.7rem;
  border-radius: 999px;
  cursor: pointer;
  transition: color 0.2s, background 0.2s;
  white-space: nowrap;

  &:hover,
  &.active {
    color: var(--color-text);
    background: rgba(59, 130, 246, 0.1);
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
  background: rgba(59, 130, 246, 0.08);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  color: var(--color-text);
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
}

.burger {
  width: 18px;
  height: 14px;
  position: relative;
  display: block;

  span {
    position: absolute;
    left: 0;
    width: 100%;
    height: 2px;
    border-radius: 2px;
    background: currentColor;
    transition: transform 0.25s ease, opacity 0.2s ease, top 0.25s ease;

    &:nth-child(1) {
      top: 0;
    }
    &:nth-child(2) {
      top: 6px;
    }
    &:nth-child(3) {
      top: 12px;
    }
  }

  &.open span {
    &:nth-child(1) {
      top: 6px;
      transform: rotate(45deg);
    }
    &:nth-child(2) {
      opacity: 0;
    }
    &:nth-child(3) {
      top: 6px;
      transform: rotate(-45deg);
    }
  }
}
</style>

<!-- Drawer is teleported to body — unscoped panel styles -->
<style lang="scss">
.nav-backdrop {
  position: fixed;
  inset: 0;
  z-index: 140;
  background: rgba(3, 8, 20, 0.55);
  backdrop-filter: blur(4px);
}

.nav-drawer {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 150;
  width: min(400px, 92vw);
  height: 100dvh;
  display: flex;
  flex-direction: column;
  background: var(--color-drawer-bg, rgba(10, 16, 32, 0.97));
  border-left: 1px solid var(--color-border);
  box-shadow: -18px 0 50px rgba(0, 0, 0, 0.35);
}

.drawer-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.25rem 1.25rem 0.75rem;
  border-bottom: 1px solid var(--color-border);
}

.drawer-kicker {
  margin: 0;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-primary-light);
}

.drawer-title {
  margin: 0.2rem 0 0;
  font-family: var(--font-display);
  font-size: 1.35rem;
  font-weight: 800;
  color: var(--color-text);
}

.drawer-close {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border);
  background: transparent;
  color: var(--color-text-muted);
  display: grid;
  place-items: center;
  cursor: pointer;

  &:hover {
    color: var(--color-text);
    border-color: rgba(59, 130, 246, 0.4);
  }
}

.drawer-scroll {
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
  touch-action: pan-y;
  padding: 0.75rem 1rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.drawer-label {
  margin: 0.85rem 0 0.2rem;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text-muted);

  &:first-child {
    margin-top: 0.25rem;
  }
}

.drawer-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: transparent;
  border: 1px solid transparent;
  color: var(--color-text-muted);
  font-size: 0.975rem;
  font-weight: 500;
  padding: 0.8rem 0.9rem;
  border-radius: var(--radius-md);
  cursor: pointer;
  text-align: left;

  span {
    flex: 1;
  }

  .check {
    color: var(--color-primary-light);
  }

  &:hover {
    color: var(--color-text);
    background: rgba(59, 130, 246, 0.06);
  }

  &.active {
    color: var(--color-primary-light);
    background: rgba(59, 130, 246, 0.12);
    border-color: rgba(59, 130, 246, 0.3);
  }
}

.drawer-doc-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.8rem 0.9rem;
  border-radius: var(--radius-md);
  color: var(--color-text-muted);
  text-decoration: none;
  font-size: 0.95rem;
  border: 1px solid var(--color-border);

  &:hover {
    color: var(--color-primary-light);
    border-color: rgba(59, 130, 246, 0.35);
  }
}

.drawer-footer {
  padding: 1rem 1.15rem 1.25rem;
  border-top: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.drawer-theme {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.8125rem;
  color: var(--color-text-muted);
}

.drawer-fade-enter-active,
.drawer-fade-leave-active {
  transition: opacity 0.25s ease;
}

.drawer-fade-enter-from,
.drawer-fade-leave-to {
  opacity: 0;
}

.drawer-slide-enter-active,
.drawer-slide-leave-active {
  transition: transform 0.3s var(--ease-out-expo, cubic-bezier(0.16, 1, 0.3, 1));
}

.drawer-slide-enter-from,
.drawer-slide-leave-to {
  transform: translateX(100%);
}

html.nav-scroll-lock,
html.nav-scroll-lock body {
  overflow: hidden !important;
}
</style>
