<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { RECRUITER_SUMMARY } from "@/utils/ferasatRecruiter";

const { t } = useI18n();

const items = computed(() => [
  { icon: "mdi-briefcase", label: t("recruiterBar.role"), value: RECRUITER_SUMMARY.role },
  { icon: "mdi-code-tags", label: t("recruiterBar.stack"), value: RECRUITER_SUMMARY.stack },
  { icon: "mdi-map-marker", label: t("recruiterBar.location"), value: RECRUITER_SUMMARY.location },
  { icon: "mdi-laptop", label: t("recruiterBar.remote"), value: RECRUITER_SUMMARY.remote },
  { icon: "mdi-calendar-clock", label: t("recruiterBar.notice"), value: RECRUITER_SUMMARY.noticePeriod },
  { icon: "mdi-passport", label: t("recruiterBar.workAuth"), value: RECRUITER_SUMMARY.workAuthorization },
]);
</script>

<template>
  <aside class="recruiter-summary-bar" :aria-label="t('recruiterBar.label')">
    <div class="bar-inner">
      <span class="bar-label">
        <v-icon size="small">mdi-account-tie</v-icon>
        {{ t('recruiterBar.label') }}
      </span>
      <div class="bar-items">
        <div v-for="item in items" :key="item.label" class="bar-item" :title="item.value">
          <v-icon size="x-small" class="bar-icon">{{ item.icon }}</v-icon>
          <span class="bar-key">{{ item.label }}</span>
          <span class="bar-value">{{ item.value }}</span>
        </div>
      </div>
    </div>
  </aside>
</template>

<style scoped lang="scss">
.recruiter-summary-bar {
  position: sticky;
  top: var(--header-height);
  z-index: 40;
  background: var(--color-surface-glass);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--color-border);
}

.bar-inner {
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0.5rem clamp(1rem, 4vw, 2rem);
  display: flex;
  align-items: center;
  gap: 1rem;
  overflow-x: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
}

.bar-label {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  flex-shrink: 0;
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-primary-light);
  white-space: nowrap;
}

.bar-items {
  display: flex;
  gap: 0.75rem 1.25rem;
  flex-wrap: nowrap;
}

.bar-item {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  flex-shrink: 0;
  font-size: 0.75rem;
  color: var(--color-text-muted);
  max-width: 220px;
}

.bar-icon {
  color: var(--color-text-dim);
  flex-shrink: 0;
}

.bar-key {
  font-weight: 600;
  color: var(--color-text-dim);
  flex-shrink: 0;

  &::after {
    content: ":";
    margin-right: 0.15rem;
  }
}

.bar-value {
  color: var(--color-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (max-width: 960px) {
  .bar-key {
    display: none;
  }

  .bar-value {
    max-width: 140px;
  }
}
</style>
