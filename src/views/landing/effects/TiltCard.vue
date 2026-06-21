<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useMediaQuery } from "@vueuse/core";

const props = withDefaults(
  defineProps<{ maxTilt?: number; scale?: number }>(),
  { maxTilt: 12, scale: 1.02 }
);

const cardRef = ref<HTMLElement | null>(null);
const isTouch = useMediaQuery("(pointer: coarse)");

const onMove = (e: MouseEvent) => {
  if (isTouch.value || !cardRef.value) return;
  const rect = cardRef.value.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const cx = rect.width / 2;
  const cy = rect.height / 2;
  const rotateX = ((y - cy) / cy) * -props.maxTilt;
  const rotateY = ((x - cx) / cx) * props.maxTilt;

  cardRef.value.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${props.scale})`;
  cardRef.value.style.setProperty("--mouse-x", `${(x / rect.width) * 100}%`);
  cardRef.value.style.setProperty("--mouse-y", `${(y / rect.height) * 100}%`);
};

const onLeave = () => {
  if (!cardRef.value) return;
  cardRef.value.style.transform =
    "perspective(800px) rotateX(0) rotateY(0) scale(1)";
};

onMounted(() => {
  cardRef.value?.addEventListener("mousemove", onMove);
  cardRef.value?.addEventListener("mouseleave", onLeave);
});

onUnmounted(() => {
  cardRef.value?.removeEventListener("mousemove", onMove);
  cardRef.value?.removeEventListener("mouseleave", onLeave);
});
</script>

<template>
  <div ref="cardRef" class="tilt-card">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.tilt-card {
  transform-style: preserve-3d;
  transition: transform 0.15s ease-out;
  will-change: transform;
}

@media (prefers-reduced-motion: reduce) {
  .tilt-card {
    transition: none;
  }
}
</style>
