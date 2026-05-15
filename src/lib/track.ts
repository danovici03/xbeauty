type EventParams = Record<string, string | number | boolean | undefined>;

export function trackEvent(name: string, params?: EventParams) {
  if (typeof window === "undefined") return;
  try {
    window.gtag?.("event", name, params);
    window.fbq?.("trackCustom", name, params);
  } catch {}
}

export function trackLead(source: string) {
  if (typeof window === "undefined") return;
  try {
    window.gtag?.("event", "generate_lead", { source });
    window.fbq?.("track", "Lead", { source });
  } catch {}
}
