<script setup lang="ts">
import { ref } from "vue";
import { useAppLocale } from "@/composables/useAppLocale";

const { locale, setLocale, localeOptions, t } = useAppLocale();
const menuOpen = ref(false);

const selectLocale = (code: (typeof localeOptions.value)[number]["code"]) => {
  setLocale(code);
  menuOpen.value = false;
};
</script>

<template>
  <v-menu v-model="menuOpen" location="bottom end" :close-on-content-click="true">
    <template #activator="{ props }">
      <button
        v-bind="props"
        class="lang-toggle"
        :aria-label="`${t('lang.label')}: ${locale}`"
        :title="`${t('lang.label')}: ${locale}`"
      >
        <v-icon size="small">mdi-translate</v-icon>
        <span class="lang-code">{{ locale.toUpperCase() }}</span>
      </button>
    </template>
    <v-list class="lang-menu" density="compact" nav>
      <v-list-item
        v-for="opt in localeOptions"
        :key="opt.code"
        :active="locale === opt.code"
        @click="selectLocale(opt.code)"
      >
        <v-list-item-title>{{ opt.label }}</v-list-item-title>
        <template #append>
          <span class="lang-code-sm">{{ opt.code.toUpperCase() }}</span>
        </template>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<style scoped lang="scss">
.lang-toggle {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  height: 40px;
  padding: 0 0.65rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border);
  background: var(--color-surface-glass);
  color: var(--color-text-muted);
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s;

  &:hover {
    border-color: var(--color-border-hover);
    color: var(--color-primary-light);
  }
}

.lang-code {
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.04em;
}

.lang-menu {
  min-width: 160px;
  background: var(--color-surface) !important;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md) !important;
}

.lang-code-sm {
  font-size: 0.625rem;
  font-weight: 700;
  color: var(--color-text-dim);
}
</style>
