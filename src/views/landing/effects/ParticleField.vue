<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useMediaQuery } from "@vueuse/core";

const props = withDefaults(
  defineProps<{ count?: number; enabled?: boolean }>(),
  { count: 15, enabled: true }
);

const isMobile = useMediaQuery("(max-width: 768px)");

const particles = computed(() => {
  const n = isMobile.value ? 0 : props.count;
  return Array.from({ length: n }, (_, i) => {
    const size = Math.random() * 2.5 + 1;
    return {
      id: i,
      width: `${size}px`,
      height: `${size}px`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: `${Math.random() * 6 + 4}s`,
      delay: `${Math.random() * 2}s`,
    };
  });
});

onMounted(() => {
  // particles computed once on mount via isMobile
});
</script>

<template>
  <div v-if="enabled && particles.length" class="particle-field" aria-hidden="true">
    <span
      v-for="p in particles"
      :key="p.id"
      class="particle"
      :style="{
        width: p.width,
        height: p.height,
        left: p.left,
        top: p.top,
        animationDuration: p.duration,
        animationDelay: p.delay,
      }"
    />
  </div>
</template>

<style scoped lang="scss">
.particle-field {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.particle {
  position: absolute;
  border-radius: 50%;
  background: rgba(99, 102, 241, 0.4);
  animation: float linear infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0) translateX(0);
    opacity: 0.2;
  }
  50% {
    transform: translateY(-30px) translateX(10px);
    opacity: 0.6;
  }
}

@media (prefers-reduced-motion: reduce) {
  .particle-field {
    display: none;
  }
}
</style>
