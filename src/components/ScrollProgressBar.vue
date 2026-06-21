<script setup lang="ts">
import { useScrollProgress } from "@/composables/useScrollProgress";

const { progress } = useScrollProgress();
</script>

<template>
  <div
    class="scroll-progress"
    role="progressbar"
    :aria-valuenow="Math.round(progress)"
    aria-valuemin="0"
    aria-valuemax="100"
    aria-label="Page scroll progress"
  >
    <div class="scroll-progress-bar" :style="{ width: `${progress}%` }" />
  </div>
</template>

<style scoped lang="scss">
.scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  z-index: 200;
  pointer-events: none;
  background: transparent;
}

.scroll-progress-bar {
  height: 100%;
  background: linear-gradient(90deg, var(--color-primary), var(--color-secondary), var(--color-accent));
  box-shadow: 0 0 12px rgba(59, 130, 246, 0.5);
  transition: width 0.08s linear;
  border-radius: 0 2px 2px 0;
}
</style>

<style lang="scss">
@import "@/assets/scss/tokens.scss";
</style>
