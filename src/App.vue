<template>
  <v-app>
    <ScrollProgressBar />
    <RouterView />
    <CommandPalette />
    <PortfolioAssistant />
  </v-app>
</template>

<script setup lang="ts">
import ScrollProgressBar from "@/components/ScrollProgressBar.vue";
import CommandPalette from "@/components/CommandPalette.vue";
import PortfolioAssistant from "@/components/PortfolioAssistant.vue";
</script>

<style scoped lang="scss">
// Global styles are in global.scss
</style>
