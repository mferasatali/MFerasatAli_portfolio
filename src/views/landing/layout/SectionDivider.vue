<script setup lang="ts">
defineProps<{ reverse?: boolean; id?: string }>();
</script>

<template>
  <div class="section-divider" :class="{ reverse }">
    <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M0,50 Q360,0 720,50 T1440,50 L1440,100 L0,100 Z"
        :fill="`url(#divider-grad-${id ?? 'default'})`"
      />
      <defs>
        <linearGradient :id="`divider-grad-${id ?? 'default'}`" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.25" />
          <stop offset="50%" stop-color="#6366f1" stop-opacity="0.15" />
          <stop offset="100%" stop-color="#22c55e" stop-opacity="0.2" />
        </linearGradient>
      </defs>
    </svg>
  </div>
</template>

<style scoped lang="scss">
.section-divider {
  line-height: 0;
  margin: -1px 0;

  svg {
    width: 100%;
    height: clamp(40px, 6vw, 80px);
    display: block;
  }

  &.reverse {
    transform: scaleY(-1);
  }
}
</style>
