<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useMediaQuery } from "@vueuse/core";
import gsap from "gsap";

const cursorRef = ref<HTMLElement | null>(null);
const ringRef = ref<HTMLElement | null>(null);
const isTouch = useMediaQuery("(pointer: coarse)");
const prefersReduced = useMediaQuery("(prefers-reduced-motion: reduce)");

let quickX: gsap.QuickToFunc | null = null;
let quickY: gsap.QuickToFunc | null = null;
let quickRingX: gsap.QuickToFunc | null = null;
let quickRingY: gsap.QuickToFunc | null = null;

const onMove = (e: MouseEvent) => {
  quickX?.(e.clientX);
  quickY?.(e.clientY);
  quickRingX?.(e.clientX);
  quickRingY?.(e.clientY);
};

const onEnterInteractive = () => {
  ringRef.value?.classList.add("hover");
};

const onLeaveInteractive = () => {
  ringRef.value?.classList.remove("hover");
};

onMounted(() => {
  if (isTouch.value || prefersReduced.value || !cursorRef.value || !ringRef.value) return;

  quickX = gsap.quickTo(cursorRef.value, "x", { duration: 0.1 });
  quickY = gsap.quickTo(cursorRef.value, "y", { duration: 0.1 });
  quickRingX = gsap.quickTo(ringRef.value, "x", { duration: 0.35, ease: "power3.out" });
  quickRingY = gsap.quickTo(ringRef.value, "y", { duration: 0.35, ease: "power3.out" });

  gsap.set([cursorRef.value, ringRef.value], { xPercent: -50, yPercent: -50 });

  document.addEventListener("mousemove", onMove);
  document.querySelectorAll("a, button, .tilt-card, .project-card").forEach((el) => {
    el.addEventListener("mouseenter", onEnterInteractive);
    el.addEventListener("mouseleave", onLeaveInteractive);
  });
});

onUnmounted(() => {
  document.removeEventListener("mousemove", onMove);
});
</script>

<template>
  <div v-if="!isTouch && !prefersReduced" class="custom-cursor" aria-hidden="true">
    <div ref="cursorRef" class="cursor-dot" />
    <div ref="ringRef" class="cursor-ring" />
  </div>
</template>

<style scoped lang="scss">
.custom-cursor {
  pointer-events: none;
  position: fixed;
  inset: 0;
  z-index: 9998;
}

.cursor-dot,
.cursor-ring {
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  border-radius: 50%;
}

.cursor-dot {
  width: 6px;
  height: 6px;
  background: var(--color-primary);
}

.cursor-ring {
  width: 36px;
  height: 36px;
  border: 1px solid rgba(99, 102, 241, 0.5);
  transition: width 0.2s, height 0.2s, border-color 0.2s;

  &.hover {
    width: 52px;
    height: 52px;
    border-color: var(--color-accent);
  }
}
</style>
