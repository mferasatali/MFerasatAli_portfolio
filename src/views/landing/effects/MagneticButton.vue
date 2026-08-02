<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useMediaQuery } from "@vueuse/core";
import gsap from "gsap";

const props = defineProps<{
  strength?: number;
}>();

const buttonRef = ref<HTMLElement | null>(null);
const isTouch = useMediaQuery("(pointer: coarse)");
let quickX: gsap.QuickToFunc | null = null;
let quickY: gsap.QuickToFunc | null = null;

const onMove = (e: MouseEvent) => {
  if (isTouch.value || !buttonRef.value || !quickX || !quickY) return;
  const rect = buttonRef.value.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const strength = props.strength ?? 0.18;
  quickX((e.clientX - cx) * strength);
  quickY((e.clientY - cy) * strength);
};

const onLeave = () => {
  quickX?.(0);
  quickY?.(0);
};

onMounted(() => {
  if (isTouch.value || !buttonRef.value) return;
  quickX = gsap.quickTo(buttonRef.value, "x", { duration: 0.18, ease: "power2.out" });
  quickY = gsap.quickTo(buttonRef.value, "y", { duration: 0.18, ease: "power2.out" });
  buttonRef.value.addEventListener("mousemove", onMove);
  buttonRef.value.addEventListener("mouseleave", onLeave);
});

onUnmounted(() => {
  buttonRef.value?.removeEventListener("mousemove", onMove);
  buttonRef.value?.removeEventListener("mouseleave", onLeave);
});
</script>

<template>
  <div ref="buttonRef" class="magnetic-wrap">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.magnetic-wrap {
  display: inline-block;
  will-change: transform;
}
</style>
