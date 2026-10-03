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
import { useTheme, useRtl } from "vuetify";
import { LOCALE_STORAGE_KEY, RTL_LOCALES, type AppLocale } from "@/i18n";
import ScrollProgressBar from "@/components/ScrollProgressBar.vue";
import CommandPalette from "@/components/CommandPalette.vue";
import PortfolioAssistant from "@/components/PortfolioAssistant.vue";
import KeyboardShortcutsHint from "@/components/KeyboardShortcutsHint.vue";

function dismissBootLoader() {
  const boot = document.getElementById("boot-loader");
  if (!boot) return;
  boot.classList.add("is-done");
  window.setTimeout(() => boot.remove(), 350);
}

onMounted(() => {
  // HTML #boot-loader sits outside Vue. LandingPage does a fancy handoff on "/",
  // but deep links (/projects/..., /labs, …) never mount it — always clear here
  // so the MFA splash never sticks forever.
  dismissBootLoader();
  window.setTimeout(dismissBootLoader, 2000);

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
