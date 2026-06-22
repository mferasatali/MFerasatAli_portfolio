<script setup lang="ts">
import { ref, nextTick, watch } from "vue";
import { useRouter, RouterLink } from "vue-router";
import {
  askPortfolioAssistant,
  ASSISTANT_GREETING,
  ASSISTANT_SUGGESTIONS,
  type AssistantAction,
} from "@/utils/portfolioAssistant";

interface ChatMessage {
  id: number;
  role: "user" | "assistant";
  text: string;
  actions?: AssistantAction[];
}

const open = ref(false);
const input = ref("");
const typing = ref(false);
const messages = ref<ChatMessage[]>([]);
const messagesEl = ref<HTMLElement | null>(null);
const inputEl = ref<HTMLInputElement | null>(null);

let messageId = 0;

const router = useRouter();

const scrollToBottom = async () => {
  await nextTick();
  if (messagesEl.value) {
    messagesEl.value.scrollTop = messagesEl.value.scrollHeight;
  }
};

const pushMessage = (
  role: ChatMessage["role"],
  text: string,
  actions?: AssistantAction[]
) => {
  messages.value.push({ id: ++messageId, role, text, actions });
};

const openPanel = () => {
  open.value = true;
  if (messages.value.length === 0) {
    pushMessage("assistant", ASSISTANT_GREETING);
  }
  nextTick(() => inputEl.value?.focus());
};

const closePanel = () => {
  open.value = false;
};

const navigateContact = () => {
  closePanel();
  if (router.currentRoute.value.path === "/") {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  } else {
    router.push("/#contact");
  }
};

const sendQuestion = async (text: string) => {
  const question = text.trim();
  if (!question || typing.value) return;

  pushMessage("user", question);
  input.value = "";
  typing.value = true;
  await scrollToBottom();

  await new Promise((r) => setTimeout(r, 400 + Math.random() * 350));

  const { answer, actions } = askPortfolioAssistant(question);
  pushMessage("assistant", answer, actions);
  typing.value = false;
  await scrollToBottom();
};

const onSubmit = () => sendQuestion(input.value);

watch(open, (isOpen) => {
  document.body.style.overflow = isOpen ? "hidden" : "";
});
</script>

<template>
  <div class="portfolio-assistant" :class="{ 'is-open': open }">
    <Transition name="panel">
      <div v-if="open" class="assistant-panel" role="dialog" aria-label="Portfolio assistant">
        <header class="panel-header">
          <div class="panel-title">
            <span class="panel-dot" aria-hidden="true" />
            <div>
              <strong>MFA Assistant</strong>
              <span class="panel-sub">Portfolio guide · offline</span>
            </div>
          </div>
          <button class="panel-close" aria-label="Close chat" @click="closePanel">
            <v-icon size="small">mdi-close</v-icon>
          </button>
        </header>

        <div ref="messagesEl" class="panel-messages">
          <div
            v-for="msg in messages"
            :key="msg.id"
            class="message"
            :class="msg.role"
          >
            <p>{{ msg.text }}</p>
            <div v-if="msg.actions?.length" class="message-actions">
              <template v-for="(action, i) in msg.actions" :key="i">
                <a
                  v-if="action.href"
                  :href="action.href"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="action-btn"
                >
                  <v-icon size="x-small">{{ action.icon }}</v-icon>
                  {{ action.label }}
                </a>
                <RouterLink
                  v-else-if="action.route"
                  :to="action.route"
                  class="action-btn action-view"
                  @click="closePanel"
                >
                  <v-icon size="x-small">{{ action.icon }}</v-icon>
                  {{ action.label }}
                </RouterLink>
              </template>
            </div>
          </div>

          <div v-if="typing" class="message assistant typing-bubble">
            <span /><span /><span />
          </div>
        </div>

        <div v-if="messages.length <= 1" class="suggestions">
          <button
            v-for="s in ASSISTANT_SUGGESTIONS"
            :key="s"
            type="button"
            class="suggestion-chip"
            @click="sendQuestion(s)"
          >
            {{ s }}
          </button>
        </div>

        <form class="panel-input" @submit.prevent="onSubmit">
          <input
            ref="inputEl"
            v-model="input"
            type="text"
            placeholder="Ask about contact, Calendly, experience, projects…"
            autocomplete="off"
            maxlength="280"
          />
          <button type="submit" class="send-btn" :disabled="!input.trim() || typing" aria-label="Send">
            <v-icon size="small">mdi-send</v-icon>
          </button>
        </form>

        <button type="button" class="panel-contact" @click="navigateContact">
          <v-icon size="small">mdi-email-outline</v-icon>
          Contact Muhammad directly
        </button>
      </div>
    </Transition>

    <button
      class="assistant-fab"
      :aria-expanded="open"
      aria-label="Open portfolio assistant"
      @click="open ? closePanel() : openPanel()"
    >
      <v-icon v-if="!open" size="small">mdi-message-text-outline</v-icon>
      <v-icon v-else size="small">mdi-close</v-icon>
      <span class="fab-label">Ask MFA</span>
    </button>
  </div>
</template>

<style scoped lang="scss">
.portfolio-assistant {
  position: fixed;
  right: clamp(1rem, 3vw, 1.5rem);
  bottom: clamp(1rem, 3vw, 1.5rem);
  z-index: 110;
  cursor: auto;
}

.assistant-fab {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.1rem;
  border-radius: 999px;
  border: 1px solid rgba(59, 130, 246, 0.45);
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.22), rgba(99, 102, 241, 0.18));
  backdrop-filter: blur(12px);
  color: var(--color-text);
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35);
  transition: transform 0.25s var(--ease-out-expo), box-shadow 0.25s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-glow);
  }

  .is-open & {
    padding: 0.75rem;
    border-radius: 50%;
    width: 48px;
    height: 48px;
    justify-content: center;
  }

  .is-open & .fab-label {
    display: none;
  }
}

.assistant-panel {
  position: absolute;
  right: 0;
  bottom: calc(100% + 0.75rem);
  width: min(380px, calc(100vw - 2rem));
  max-height: min(520px, calc(100vh - 6rem));
  display: flex;
  flex-direction: column;
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  background: var(--color-overlay-bg);
  backdrop-filter: blur(20px);
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.45);
  overflow: hidden;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.875rem 1rem;
  border-bottom: 1px solid var(--color-border);
}

.panel-title {
  display: flex;
  align-items: center;
  gap: 0.625rem;

  strong {
    display: block;
    font-size: 0.9375rem;
    color: var(--color-text);
  }
}

.panel-sub {
  font-size: 0.6875rem;
  color: var(--color-text-dim);
}

.panel-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--color-accent);
  box-shadow: 0 0 8px rgba(34, 197, 94, 0.6);
}

.panel-close {
  background: none;
  border: none;
  color: var(--color-text-muted);
  cursor: pointer;
  padding: 0.25rem;
  border-radius: var(--radius-sm);

  &:hover {
    color: var(--color-text);
  }
}

.panel-messages {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  min-height: 200px;
  max-height: 300px;
}

.message {
  max-width: 92%;
  padding: 0.625rem 0.875rem;
  border-radius: var(--radius-md);
  font-size: 0.8125rem;
  line-height: 1.55;

  p {
    margin: 0;
  }

  &.user {
    align-self: flex-end;
    background: rgba(59, 130, 246, 0.2);
    border: 1px solid rgba(59, 130, 246, 0.35);
    color: var(--color-text);
  }

  &.assistant {
    align-self: flex-start;
    background: var(--color-surface-glass);
    border: 1px solid var(--color-border);
    color: var(--color-text-muted);
  }
}

.message-actions {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  margin-top: 0.625rem;
}

.action-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  padding: 0.45rem 0.75rem;
  border-radius: var(--radius-sm);
  font-size: 0.75rem;
  font-weight: 600;
  text-decoration: none;
  border: 1px solid rgba(59, 130, 246, 0.45);
  background: rgba(59, 130, 246, 0.15);
  color: var(--color-primary-light);
  transition: background 0.2s;

  &:hover {
    background: rgba(59, 130, 246, 0.28);
  }
}

.action-view {
  background: transparent;
  border-color: var(--color-border);
  color: var(--color-text-muted);

  &:hover {
    border-color: rgba(59, 130, 246, 0.35);
    color: var(--color-primary-light);
    background: rgba(59, 130, 246, 0.08);
  }
}

.typing-bubble {
  display: flex;
  gap: 0.25rem;
  padding: 0.75rem 1rem;

  span {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--color-text-dim);
    animation: bounce 1.2s infinite ease-in-out;

    &:nth-child(2) {
      animation-delay: 0.15s;
    }

    &:nth-child(3) {
      animation-delay: 0.3s;
    }
  }
}

@keyframes bounce {
  0%,
  80%,
  100% {
    transform: translateY(0);
    opacity: 0.4;
  }

  40% {
    transform: translateY(-4px);
    opacity: 1;
  }
}

.suggestions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  padding: 0 1rem 0.75rem;
}

.suggestion-chip {
  font-size: 0.6875rem;
  padding: 0.35rem 0.625rem;
  border-radius: 999px;
  border: 1px solid var(--color-border);
  background: transparent;
  color: var(--color-text-muted);
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s;

  &:hover {
    border-color: rgba(59, 130, 246, 0.45);
    color: var(--color-primary-light);
  }
}

.panel-input {
  display: flex;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-top: 1px solid var(--color-border);

  input {
    flex: 1;
    min-width: 0;
    padding: 0.55rem 0.75rem;
    border-radius: var(--radius-sm);
    border: 1px solid var(--color-border);
    background: var(--color-bg-elevated);
    color: var(--color-text);
    font-size: 0.8125rem;
    outline: none;

    &:focus {
      border-color: rgba(59, 130, 246, 0.5);
    }

    &::placeholder {
      color: var(--color-text-dim);
    }
  }
}

.send-btn {
  width: 36px;
  height: 36px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
  border: none;
  background: var(--color-primary);
  color: var(--color-on-primary);
  cursor: pointer;

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
}

.panel-contact {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  width: 100%;
  padding: 0.625rem;
  border: none;
  border-top: 1px solid var(--color-border);
  background: transparent;
  color: var(--color-primary-light);
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: rgba(59, 130, 246, 0.08);
  }
}

.panel-enter-active,
.panel-leave-active {
  transition: opacity 0.25s, transform 0.25s var(--ease-out-expo);
}

.panel-enter-from,
.panel-leave-to {
  opacity: 0;
  transform: translateY(12px) scale(0.96);
}

@media (max-width: 480px) {
  .assistant-panel {
    width: calc(100vw - 2rem);
    right: -0.25rem;
  }

  .fab-label {
    display: none;
  }

  .assistant-fab {
    padding: 0.75rem;
    border-radius: 50%;
    width: 48px;
    height: 48px;
    justify-content: center;
  }
}
</style>

<style lang="scss">
@import "@/assets/scss/tokens.scss";
</style>
