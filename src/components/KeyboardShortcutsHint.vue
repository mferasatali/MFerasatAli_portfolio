<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const visible = ref(false);
const showModal = ref(false);

const SHORTCUTS = [
  { keys: ["Ctrl", "K"], label: "Command palette — jump anywhere" },
  { keys: ["?"], label: "Show keyboard shortcuts" },
  { keys: ["Esc"], label: "Close dialogs / palette" },
];

const onKey = (e: KeyboardEvent) => {
  const target = e.target as HTMLElement;
  if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable) {
    return;
  }

  if (e.key === "?" && !e.ctrlKey && !e.metaKey) {
    e.preventDefault();
    showModal.value = true;
  }
};

onMounted(() => {
  window.addEventListener("keydown", onKey);
  setTimeout(() => {
    visible.value = true;
  }, 4000);
  setTimeout(() => {
    visible.value = false;
  }, 12000);
});

onUnmounted(() => {
  window.removeEventListener("keydown", onKey);
});
</script>

<template>
  <button
    v-show="visible && !showModal"
    type="button"
    class="shortcuts-hint"
    aria-label="Keyboard shortcuts — press question mark"
    @click="showModal = true"
  >
    <kbd>?</kbd>
    Shortcuts
  </button>

  <v-dialog v-model="showModal" max-width="400">
    <div class="shortcuts-modal">
      <h2>Keyboard shortcuts</h2>
      <ul>
        <li v-for="item in SHORTCUTS" :key="item.label">
          <span class="keys">
            <kbd v-for="k in item.keys" :key="k">{{ k }}</kbd>
          </span>
          {{ item.label }}
        </li>
      </ul>
      <p class="hint-tip">Press <kbd>Ctrl</kbd>+<kbd>K</kbd> to open the command palette from anywhere.</p>
      <v-btn block class="modern-btn mt-4" @click="showModal = false">Got it</v-btn>
    </div>
  </v-dialog>
</template>

<style scoped lang="scss">
.shortcuts-hint {
  position: fixed;
  bottom: 5.5rem;
  left: 1rem;
  z-index: 85;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.4rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-text-muted);
  background: var(--color-surface-glass);
  border: 1px solid var(--color-border);
  border-radius: 999px;
  cursor: pointer;
  backdrop-filter: blur(8px);
  animation: fade-hint 0.4s ease;

  kbd {
    padding: 0.1rem 0.35rem;
    font-size: 0.6875rem;
    border-radius: 4px;
    background: var(--color-chip-bg);
    border: 1px solid var(--color-border);
  }

  &:hover {
    border-color: var(--color-border-hover);
    color: var(--color-primary-light);
  }
}

@keyframes fade-hint {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.shortcuts-modal {
  padding: 1.5rem;
  background: var(--color-surface);
  border-radius: var(--radius-lg);

  h2 {
    font-family: var(--font-display);
    font-size: 1.15rem;
    margin-bottom: 1rem;
  }

  ul {
    list-style: none;
  }

  li {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    padding: 0.65rem 0;
    border-bottom: 1px solid var(--color-border);
    font-size: 0.8125rem;
    color: var(--color-text-muted);
  }

  kbd {
    display: inline-block;
    padding: 0.15rem 0.4rem;
    margin-right: 0.25rem;
    font-size: 0.6875rem;
    font-family: inherit;
    border-radius: 4px;
    background: var(--color-chip-bg);
    border: 1px solid var(--color-border);
    color: var(--color-text);
  }
}

.hint-tip {
  margin-top: 1rem;
  font-size: 0.75rem;
  color: var(--color-text-dim);
}
</style>
