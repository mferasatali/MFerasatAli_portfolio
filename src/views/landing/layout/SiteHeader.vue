<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useMediaQuery } from "@vueuse/core";
import { NAV_ITEMS } from "@/constants/navigation";
import MagneticButton from "../effects/MagneticButton.vue";

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
        <MagneticButton v-if="!isMobile">
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
    background: rgba(5, 5, 8, 0.85);
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
  gap: 0.25rem;
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
  background: rgba(5, 5, 8, 0.97);
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
