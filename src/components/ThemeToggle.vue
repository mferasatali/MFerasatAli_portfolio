<script setup lang="ts">
import { useAppTheme } from "@/composables/useAppTheme";

const { theme, toggleTheme } = useAppTheme();
</script>

<template>
  <button
    class="theme-toggle"
    :aria-label="theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
    @click="toggleTheme"
  >
    <v-icon size="small">{{ theme === "dark" ? "mdi-weather-sunny" : "mdi-weather-night" }}</v-icon>
  </button>
</template>

<style scoped lang="scss">
.theme-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border);
  background: var(--color-surface-glass);
  color: var(--color-text-muted);
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s, background 0.2s;

  &:hover {
    border-color: var(--color-border-hover);
    color: var(--color-primary-light);
    background: rgba(59, 130, 246, 0.08);
  }
}
</style>
