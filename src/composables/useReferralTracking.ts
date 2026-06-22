export function initReferralTracking() {
  if (typeof window === "undefined") return;

  const params = new URLSearchParams(window.location.search);
  const ref = params.get("ref");
  if (ref) {
    sessionStorage.setItem("mfa-ref", ref);
  }
}

export function getReferralSource(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem("mfa-ref");
}
