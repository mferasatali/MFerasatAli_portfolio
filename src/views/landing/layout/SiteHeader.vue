<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { RouterLink } from "vue-router";
import { useMediaQuery } from "@vueuse/core";
import { NAV_ITEMS } from "@/constants/navigation";
import MagneticButton from "../effects/MagneticButton.vue";
import ThemeToggle from "@/components/ThemeToggle.vue";

defineProps<{ activeSection: string }>();
const emit = defineEmits<{ navigate: [id: string] }>();

const isScrolled = ref(false);
const drawerOpen = ref(false);
const isMobile = useMediaQuery("(max-width: 960px)");

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
      <button class="logo" @click="navigate('hero')" aria-label="Go to top">
        <span class="logo-text">MFA</span>
      </button>

      <nav v-if="!isMobile" class="nav-desktop" aria-label="Main navigation">
        <button
          v-for="item in NAV_ITEMS.filter((n) => n.id !== 'hero')"
          :key="item.id"
          class="nav-link"
          :class="{ active: activeSection === item.id }"
          @click="navigate(item.id)"
        >
          {{ item.label }}
        </button>
      </nav>

      <div class="header-actions">
        <nav v-if="!isMobile" class="doc-links" aria-label="Documents">
          <RouterLink to="/resume" class="doc-link">Resume</RouterLink>
          <RouterLink to="/cover-letter" class="doc-link">Cover Letter</RouterLink>
        </nav>
        <ThemeToggle v-if="!isMobile" />
        <MagneticButton v-if="!isMobile" class="hire-wrap">
          <v-btn class="modern-btn hire-btn" size="small" @click="navigate('contact')">
            Hire Me
          </v-btn>
        </MagneticButton>

        <button
          v-if="isMobile"
          class="menu-toggle"
          :aria-expanded="drawerOpen"
          aria-label="Toggle menu"
          @click="drawerOpen = !drawerOpen"
        >
          <v-icon>{{ drawerOpen ? "mdi-close" : "mdi-menu" }}</v-icon>
        </button>
      </div>
    </div>

    <Transition name="drawer">
      <nav v-if="isMobile && drawerOpen" class="nav-drawer" aria-label="Mobile navigation">
        <button
          v-for="item in NAV_ITEMS"
          :key="item.id"
          class="drawer-link"
          :class="{ active: activeSection === item.id }"
          @click="navigate(item.id)"
        >
          <v-icon size="small">{{ item.icon }}</v-icon>
          {{ item.label }}
        </button>
        <v-btn class="modern-btn mt-4" block @click="navigate('contact')">Hire Me</v-btn>
        <div class="drawer-theme">
          <ThemeToggle />
          <span>Toggle theme</span>
        </div>
        <RouterLink to="/resume" class="drawer-doc-link" @click="drawerOpen = false">
          <v-icon size="small">mdi-file-document-outline</v-icon>
          Resume
        </RouterLink>
        <RouterLink to="/cover-letter" class="drawer-doc-link" @click="drawerOpen = false">
          <v-icon size="small">mdi-email-outline</v-icon>
          Cover Letter
        </RouterLink>
        <RouterLink to="/blog" class="drawer-doc-link" @click="drawerOpen = false">
          <v-icon size="small">mdi-post-outline</v-icon>
          Articles
        </RouterLink>
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
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 clamp(1rem, 4vw, 2rem);
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.logo {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
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
  gap: 0.15rem;
  flex-shrink: 1;
  min-width: 0;
}

@media (max-width: 1200px) {
  .nav-link {
    padding: 0.5rem 0.65rem;
    font-size: 0.8125rem;
  }

  .doc-link {
    padding: 0.4rem 0.55rem;
    font-size: 0.75rem;
  }
}

.nav-link {
  background: none;
  border: none;
  color: var(--color-text-muted);
  font-size: 0.875rem;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: color 0.2s, background 0.2s;

  &:hover,
  &.active {
    color: var(--color-text);
    background: rgba(99, 102, 241, 0.1);
  }

  &.active {
    color: var(--color-primary-light);
  }
}

.hire-btn {
  font-size: 0.8125rem !important;
  padding: 0 1.25rem !important;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
}

.doc-links {
  display: flex;
  align-items: center;
  gap: 0.15rem;
  flex-shrink: 0;
}

.hire-wrap {
  flex-shrink: 0;
}

.doc-link {
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--color-text-muted);
  text-decoration: none;
  padding: 0.4rem 0.75rem;
  border-radius: var(--radius-sm);
  transition: color 0.2s, background 0.2s;

  &:hover,
  &.router-link-active {
    color: var(--color-primary-light);
    background: rgba(59, 130, 246, 0.1);
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
  margin-top: 0.5rem;

  &:hover {
    color: var(--color-primary-light);
    border-color: rgba(59, 130, 246, 0.35);
  }
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
}

.nav-drawer {
  position: fixed;
  top: var(--header-height);
  left: 0;
  right: 0;
  background: var(--color-drawer-bg);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--color-border);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
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
