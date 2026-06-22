import { ref } from "vue";
import { useTheme } from "vuetify";

const STORAGE_KEY = "mfa-theme";
export type AppTheme = "dark" | "light";

const theme = ref<AppTheme>("dark");

export function initAppTheme() {
  const saved = localStorage.getItem(STORAGE_KEY);
  const initial: AppTheme = saved === "light" ? "light" : "dark";
  theme.value = initial;
  document.documentElement.setAttribute("data-theme", initial);
}

export function useAppTheme() {
  const vuetifyTheme = useTheme();

  const setTheme = (value: AppTheme) => {
    theme.value = value;
    document.documentElement.setAttribute("data-theme", value);
    localStorage.setItem(STORAGE_KEY, value);
    vuetifyTheme.global.name.value = value;
  };

  const toggleTheme = () => {
    setTheme(theme.value === "dark" ? "light" : "dark");
  };

  return { theme, setTheme, toggleTheme };
}
