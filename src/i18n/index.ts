import { createI18n } from "vue-i18n";
import en from "./locales/en";
import ar from "./locales/ar";
import ur from "./locales/ur";
import ru from "./locales/ru";
import de from "./locales/de";

export const SUPPORTED_LOCALES = ["en", "ar", "ur", "ru", "de"] as const;
export type AppLocale = (typeof SUPPORTED_LOCALES)[number];

export const RTL_LOCALES: AppLocale[] = ["ar", "ur"];

const STORAGE_KEY = "mfa-locale";

function getInitialLocale(): AppLocale {
  if (typeof localStorage === "undefined") return "en";
  const saved = localStorage.getItem(STORAGE_KEY);
  return SUPPORTED_LOCALES.includes(saved as AppLocale) ? (saved as AppLocale) : "en";
}

export function applyDocumentLocale(locale: string) {
  if (typeof document === "undefined") return;
  document.documentElement.lang = locale;
  document.documentElement.dir = RTL_LOCALES.includes(locale as AppLocale) ? "rtl" : "ltr";
}

const initial = getInitialLocale();
applyDocumentLocale(initial);

export const i18n = createI18n({
  legacy: false,
  locale: initial,
  fallbackLocale: "en",
  messages: { en, ar, ur, ru, de },
});

export function initI18n() {
  applyDocumentLocale(i18n.global.locale.value);
}

export { STORAGE_KEY as LOCALE_STORAGE_KEY };
