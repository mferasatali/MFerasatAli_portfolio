<script setup lang="ts">
import { ref, onMounted } from "vue";

const emit = defineEmits<{ done: [] }>();

const progress = ref(0);
const visible = ref(true);

const waitForAssets = () =>
  new Promise<void>((resolve) => {
    const finish = () => resolve();
    // Wait for window load (fonts/css/images in flight) with a ceiling
    if (document.readyState === "complete") {
      finish();
      return;
    }
    window.addEventListener("load", finish, { once: true });
    window.setTimeout(finish, 2200);
  });

onMounted(async () => {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) {
    progress.value = 100;
    visible.value = false;
    emit("done");
    return;
  }

  // Revisit in same tab → short loader; first open → fuller beat
  const visited = sessionStorage.getItem("mfa-booted") === "1";
  const minDuration = visited ? 650 : 1400;
  const start = performance.now();

  const assets = waitForAssets();

  const tick = (now: number) => {
    const elapsed = now - start;
    // Cap visual progress at 90 until assets resolve
    const raw = (elapsed / minDuration) * 100;
    progress.value = Math.min(visited ? 100 : 90, raw);
    if (elapsed < minDuration) {
      requestAnimationFrame(tick);
    }
  };
  requestAnimationFrame(tick);

  await Promise.all([
    assets,
    new Promise<void>((r) => window.setTimeout(r, minDuration)),
  ]);

  progress.value = 100;
  sessionStorage.setItem("mfa-booted", "1");
  window.setTimeout(() => {
    visible.value = false;
    emit("done");
  }, 120);
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
  background: var(--color-bg, #080d1a);
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
  color: var(--color-text-muted, #94a3b8);
  margin-bottom: 2rem;
}

.preloader-bar {
  height: 2px;
  background: var(--color-border, rgba(255, 255, 255, 0.12));
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 0.75rem;
}

.preloader-fill {
  height: 100%;
  background: var(--gradient-primary, linear-gradient(90deg, #3b82f6, #06b6d4));
  transition: width 0.12s linear;
}

.preloader-percent {
  font-size: 0.75rem;
  color: var(--color-text-dim, #64748b);
  font-variant-numeric: tabular-nums;
}

.preloader-enter-active,
.preloader-leave-active {
  transition: opacity 0.4s ease;
}

.preloader-leave-to {
  opacity: 0;
}
</style>
