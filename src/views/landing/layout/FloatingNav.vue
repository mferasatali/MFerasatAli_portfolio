<script setup lang="ts">
import { useMediaQuery } from "@vueuse/core";
import { FLOATING_NAV_ITEMS } from "@/constants/navigation";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

defineProps<{ activeSection: string }>();
const emit = defineEmits<{ navigate: [id: string] }>();

const isDesktop = useMediaQuery("(min-width: 1100px)");
</script>

<template>
  <div v-if="isDesktop" class="floating-nav" aria-label="Section navigation">
    <button
      v-for="nav in FLOATING_NAV_ITEMS"
      :key="nav.id"
      type="button"
      class="nav-dot"
      :class="{ active: activeSection === nav.id }"
      :aria-label="t(`nav.${nav.id}`)"
      :aria-current="activeSection === nav.id ? 'true' : undefined"
      :title="t(`nav.${nav.id}`)"
      @click="emit('navigate', nav.id)"
    >
      <v-icon size="18">{{ nav.icon }}</v-icon>
    </button>
  </div>
</template>

<style scoped lang="scss">
.floating-nav {
  position: fixed;
  right: 1.1rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 90;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding: 0.55rem;
  background: var(--color-surface-glass);
  backdrop-filter: blur(12px);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
}

.nav-dot {
  width: 36px;
  height: 36px;
  border-radius: 999px;
  border: none;
  background: transparent;
  color: var(--color-text-muted);
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: color 0.2s, background 0.2s;

  &.active {
    color: var(--color-primary-light);
    background: rgba(59, 130, 246, 0.16);
  }

  &:hover {
    color: var(--color-text);
    background: rgba(59, 130, 246, 0.1);
  }
}
</style>
