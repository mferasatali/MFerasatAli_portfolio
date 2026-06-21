<script setup lang="ts">
import { useMediaQuery } from "@vueuse/core";
import { NAV_ITEMS } from "@/constants/navigation";

defineProps<{ activeSection: string }>();
const emit = defineEmits<{ navigate: [id: string] }>();

const isDesktop = useMediaQuery("(min-width: 961px)");
</script>

<template>
  <div v-if="isDesktop" class="floating-nav" aria-label="Section navigation">
    <v-btn
      v-for="nav in NAV_ITEMS"
      :key="nav.id"
      class="nav-dot"
      :class="{ active: activeSection === nav.id }"
      :aria-label="nav.label"
      :aria-current="activeSection === nav.id ? 'true' : undefined"
      icon
      size="small"
      variant="text"
      @click="emit('navigate', nav.id)"
    >
      <v-icon size="small">{{ nav.icon }}</v-icon>
    </v-btn>
  </div>
</template>

<style scoped lang="scss">
.floating-nav {
  position: fixed;
  right: 1.5rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 90;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.75rem;
  background: var(--color-surface-glass);
  backdrop-filter: blur(12px);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
}

.nav-dot {
  color: var(--color-text-muted) !important;
  transition: color 0.2s, background 0.2s !important;

  &.active {
    color: var(--color-primary-light) !important;
    background: rgba(99, 102, 241, 0.15) !important;
  }

  &:hover {
    color: var(--color-text) !important;
  }
}
</style>
