import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useRtl } from "vuetify";
import {
  type AppLocale,
  SUPPORTED_LOCALES,
  LOCALE_STORAGE_KEY,
  applyDocumentLocale,
} from "@/i18n";

export function useAppLocale() {
  const { locale, t } = useI18n();
  const { isRtl } = useRtl();

  const currentLocale = computed(() => locale.value as AppLocale);

  const setLocale = (value: AppLocale) => {
    locale.value = value;
    localStorage.setItem(LOCALE_STORAGE_KEY, value);
    applyDocumentLocale(value);
    isRtl.value = value === "ar" || value === "ur";
  };

  const localeOptions = computed(() =>
    SUPPORTED_LOCALES.map((code) => ({
      code,
      label: t(`lang.${code}`),
    }))
  );

  return { locale: currentLocale, setLocale, localeOptions, t };
}
