<template>
  <v-app>
    <ScrollProgressBar />
    <RouterView />
    <CommandPalette />
    <PortfolioAssistant />
    <KeyboardShortcutsHint />
  </v-app>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useTheme, useRtl } from "vuetify";
import { LOCALE_STORAGE_KEY, RTL_LOCALES, type AppLocale } from "@/i18n";
import ScrollProgressBar from "@/components/ScrollProgressBar.vue";
import CommandPalette from "@/components/CommandPalette.vue";
import PortfolioAssistant from "@/components/PortfolioAssistant.vue";
import KeyboardShortcutsHint from "@/components/KeyboardShortcutsHint.vue";

const route = useRoute();

onMounted(() => {
  // LandingPage owns splash handoff; /labs and other routes never mount it → clear stuck loader
  if (route.path !== "/") {
    const boot = document.getElementById("boot-loader");
    if (boot) {
      boot.classList.add("is-done");
      window.setTimeout(() => boot.remove(), 350);
    }
  }

  const saved = localStorage.getItem("mfa-theme");
  useTheme().global.name.value = saved === "light" ? "light" : "dark";

  const loc = localStorage.getItem(LOCALE_STORAGE_KEY) as AppLocale | null;
  if (loc && RTL_LOCALES.includes(loc)) {
    useRtl().isRtl.value = true;
  }
});
</script>

<style scoped lang="scss">
// Global styles are in global.scss
</style>
