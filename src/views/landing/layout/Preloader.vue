<script setup lang="ts">
import { ref, onMounted } from "vue";

const emit = defineEmits<{ done: [] }>();

const progress = ref(0);
const visible = ref(true);

onMounted(() => {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) {
    emit("done");
    visible.value = false;
    return;
  }

  const duration = 2200;
  const start = performance.now();

  const tick = (now: number) => {
    const elapsed = now - start;
    progress.value = Math.min(100, (elapsed / duration) * 100);
    if (elapsed < duration) {
      requestAnimationFrame(tick);
    } else {
      visible.value = false;
      emit("done");
    }
  };

  requestAnimationFrame(tick);
});
</script>

<template>
  <Transition name="preloader">
    <div v-if="visible" class="preloader" role="status" aria-label="Loading portfolio">
      <div class="preloader-inner">
        <div class="preloader-logo">MFA</div>
        <p class="preloader-name">Muhammad Ferasat Ali</p>
        <div class="preloader-bar">
          <div class="preloader-fill" :style="{ width: `${progress}%` }" />
        </div>
        <span class="preloader-percent">{{ Math.round(progress) }}%</span>
      </div>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
.preloader {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg);
}

.preloader-inner {
  text-align: center;
  width: min(320px, 80vw);
}

.preloader-logo {
  font-family: var(--font-display);
  font-size: 3rem;
  font-weight: 800;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
}

.preloader-name {
  font-size: 0.875rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  margin-bottom: 2rem;
}

.preloader-bar {
  height: 2px;
  background: var(--color-border);
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 0.75rem;
}

.preloader-fill {
  height: 100%;
  background: var(--gradient-primary);
  transition: width 0.1s linear;
}

.preloader-percent {
  font-size: 0.75rem;
  color: var(--color-text-dim);
  font-variant-numeric: tabular-nums;
}

.preloader-enter-active,
.preloader-leave-active {
  transition: opacity 0.6s var(--ease-out-expo);
}

.preloader-leave-to {
  opacity: 0;
}
</style>
