import { PLAUSIBLE_DOMAIN } from "@/utils/ferasatRecruiter";

let loaded = false;

export function initAnalytics() {
  if (loaded || !PLAUSIBLE_DOMAIN || typeof window === "undefined") return;
  loaded = true;

  const script = document.createElement("script");
  script.defer = true;
  script.dataset.domain = PLAUSIBLE_DOMAIN;
  script.src = "https://plausible.io/js/script.js";
  document.head.appendChild(script);
}

export function trackEvent(name: string, props?: Record<string, string>) {
  if (typeof window === "undefined") return;
  const plausible = (window as Window & { plausible?: (n: string, o?: { props: Record<string, string> }) => void }).plausible;
  if (plausible) plausible(name, props ? { props } : undefined);
}
