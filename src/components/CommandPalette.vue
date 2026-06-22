<script setup lang="ts">
import { ref, watch, nextTick } from "vue";
import { useCommandPalette } from "@/composables/useCommandPalette";

const {
  open,
  query,
  activeIndex,
  grouped,
  closePalette,
  runCommand,
  getFlatIndex,
} = useCommandPalette();

const inputRef = ref<HTMLInputElement | null>(null);

watch(open, async (isOpen) => {
  document.body.style.overflow = isOpen ? "hidden" : "";
  if (isOpen) {
    await nextTick();
    inputRef.value?.focus();
  }
});
</script>

<template>
  <Teleport to="body">
    <Transition name="palette">
      <div v-if="open" class="command-palette-overlay" @click.self="closePalette">
        <div class="command-palette" role="dialog" aria-label="Command palette">
          <div class="palette-search">
            <v-icon size="small" class="search-icon">mdi-magnify</v-icon>
            <input
              ref="inputRef"
              v-model="query"
              type="text"
              placeholder="Search pages, sections, actions…"
              autocomplete="off"
              spellcheck="false"
            />
            <kbd class="palette-kbd">Esc</kbd>
          </div>

          <div v-if="grouped.size === 0" class="palette-empty">No results found</div>

          <ul v-else class="palette-list">
            <template v-for="[group, items] in grouped" :key="group">
              <li class="palette-group-label">{{ group }}</li>
              <li
                v-for="cmd in items"
                :key="cmd.id"
                class="palette-item"
                :class="{ active: getFlatIndex(cmd) === activeIndex }"
                @click="runCommand(cmd)"
              >
                <v-icon size="small">{{ cmd.icon }}</v-icon>
                <span>{{ cmd.label }}</span>
              </li>
            </template>
          </ul>

          <footer class="palette-footer">
            <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
            <span><kbd>Enter</kbd> select</span>
            <span><kbd>Ctrl</kbd><kbd>K</kbd> toggle</span>
          </footer>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped lang="scss">
.command-palette-overlay {
  position: fixed;
  inset: 0;
  z-index: 300;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: clamp(4rem, 12vh, 8rem) 1rem 2rem;
}

.command-palette {
  width: min(520px, 100%);
  max-height: min(480px, 70vh);
  display: flex;
  flex-direction: column;
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  background: var(--color-overlay-bg);
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.5);
  overflow: hidden;
}

.palette-search {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.875rem 1rem;
  border-bottom: 1px solid var(--color-border);

  input {
    flex: 1;
    min-width: 0;
    background: none;
    border: none;
    outline: none;
    color: var(--color-text);
    font-size: 0.9375rem;

    &::placeholder {
      color: var(--color-text-dim);
    }
  }
}

.search-icon {
  color: var(--color-text-dim) !important;
}

.palette-kbd {
  font-size: 0.6875rem;
  padding: 0.2rem 0.45rem;
  border-radius: 4px;
  border: 1px solid var(--color-border);
  color: var(--color-text-dim);
  font-family: inherit;
}

.palette-list {
  list-style: none;
  margin: 0;
  padding: 0.5rem;
  overflow-y: auto;
  flex: 1;
}

.palette-group-label {
  padding: 0.5rem 0.75rem 0.25rem;
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text-dim);
}

.palette-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.625rem 0.75rem;
  border-radius: var(--radius-sm);
  font-size: 0.875rem;
  color: var(--color-text-muted);
  cursor: pointer;
  transition: background 0.15s, color 0.15s;

  &:hover,
  &.active {
    background: rgba(59, 130, 246, 0.12);
    color: var(--color-text);
  }
}

.palette-empty {
  padding: 2rem;
  text-align: center;
  color: var(--color-text-dim);
  font-size: 0.875rem;
}

.palette-footer {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 1.25rem;
  padding: 0.625rem 1rem;
  border-top: 1px solid var(--color-border);
  font-size: 0.6875rem;
  color: var(--color-text-dim);

  kbd {
    font-size: 0.625rem;
    padding: 0.1rem 0.35rem;
    margin: 0 0.1rem;
    border-radius: 3px;
    border: 1px solid var(--color-border);
    font-family: inherit;
  }
}

.palette-enter-active,
.palette-leave-active {
  transition: opacity 0.2s;

  .command-palette {
    transition: transform 0.2s var(--ease-out-expo);
  }
}

.palette-enter-from,
.palette-leave-to {
  opacity: 0;

  .command-palette {
    transform: translateY(-12px) scale(0.98);
  }
}
</style>

<style lang="scss">
@import "@/assets/scss/tokens.scss";
</style>
