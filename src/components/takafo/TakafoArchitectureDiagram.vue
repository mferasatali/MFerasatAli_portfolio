<script setup lang="ts">
/**
 * Visual (non-sensitive) system diagram for Takafo+ case study.
 * Shows responsibility layers without client UI or proprietary detail.
 */
const layers = [
  {
    id: "clients",
    title: "Personas & clients",
    items: ["Recruiters", "Hiring managers", "Talent ops", "VIP stakeholders", "Admins"],
  },
  {
    id: "ui",
    title: "Vue 3 application layer",
    items: ["Pinia workflows", "Approval chains", "Kanban boards", "9-box mapping", "Role shells"],
  },
  {
    id: "realtime",
    title: "Realtime & identity",
    items: ["Azure MSAL / B2C SSO", "WebSocket notifications", "Session & persona gates"],
  },
  {
    id: "services",
    title: "API & domain services",
    items: ["Recruiting / CRM APIs", "Succession & marketplace", "Task & document flows"],
  },
  {
    id: "ai",
    title: "AI services (server-side)",
    items: ["OpenAI scoring", "VIP CV analysis", "Heygen live avatars", "Prompt validation"],
  },
  {
    id: "data",
    title: "Data & persistence",
    items: ["PostgreSQL", "Audit trails", "RBAC / 30+ personas"],
  },
] as const;
</script>

<template>
  <figure class="arch-diagram" aria-label="Takafo+ architecture layers">
    <figcaption class="diagram-caption">
      System shape (redacted) — how pieces connect without exposing client UI
    </figcaption>

    <div class="diagram-stack">
      <div
        v-for="(layer, index) in layers"
        :key="layer.id"
        class="diagram-layer"
        :style="{ '--i': index }"
      >
        <div class="layer-label">
          <span class="layer-index">{{ String(index + 1).padStart(2, "0") }}</span>
          <h3>{{ layer.title }}</h3>
        </div>
        <ul class="layer-chips">
          <li v-for="item in layer.items" :key="item">{{ item }}</li>
        </ul>
      </div>
    </div>

    <div class="diagram-flow" aria-hidden="true">
      <span>Identity</span>
      <span class="flow-arrow">→</span>
      <span>Vue workflows</span>
      <span class="flow-arrow">→</span>
      <span>Domain APIs</span>
      <span class="flow-arrow">→</span>
      <span>Postgres</span>
      <span class="flow-arrow">→</span>
      <span>AI (validated)</span>
    </div>
  </figure>
</template>

<style scoped lang="scss">
.arch-diagram {
  margin: 0 0 2.5rem;
  padding: 1.5rem;
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  background:
    radial-gradient(ellipse at top, rgba(59, 130, 246, 0.12), transparent 55%),
    var(--color-chip-bg);
}

.diagram-caption {
  font-size: 0.8125rem;
  color: var(--color-text-dim);
  margin-bottom: 1.25rem;
}

.diagram-stack {
  display: grid;
  gap: 0.65rem;
}

.diagram-layer {
  display: grid;
  grid-template-columns: minmax(140px, 220px) 1fr;
  gap: 0.75rem 1rem;
  align-items: start;
  padding: 0.9rem 1rem;
  border-radius: var(--radius-md);
  border: 1px solid rgba(59, 130, 246, 0.2);
  background: color-mix(in srgb, var(--color-surface) 88%, transparent);
  animation: layer-in 0.45s ease both;
  animation-delay: calc(var(--i) * 0.05s);
}

.layer-label {
  display: flex;
  gap: 0.6rem;
  align-items: flex-start;

  h3 {
    margin: 0;
    font-family: var(--font-display);
    font-size: 0.95rem;
    font-weight: 700;
    line-height: 1.35;
  }
}

.layer-index {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: var(--color-primary-light);
  margin-top: 0.15rem;
}

.layer-chips {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;

  li {
    font-size: 0.75rem;
    padding: 0.28rem 0.55rem;
    border-radius: 999px;
    border: 1px solid var(--color-border);
    color: var(--color-text-muted);
    background: rgba(59, 130, 246, 0.06);
  }
}

.diagram-flow {
  margin-top: 1.25rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem 0.55rem;
  align-items: center;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-primary-light);
  letter-spacing: 0.02em;
}

.flow-arrow {
  color: var(--color-text-dim);
  font-weight: 400;
}

@keyframes layer-in {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@media (max-width: 720px) {
  .diagram-layer {
    grid-template-columns: 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  .diagram-layer {
    animation: none;
  }
}
</style>
