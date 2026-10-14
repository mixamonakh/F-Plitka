const events = new Set([
  "calculation_start",
  "calculation_result",
  "calculation_save",
  "estimate_request",
  "contact_confirmed",
]);
export function trackCalculation(event, mode) {
  if (typeof window === "undefined" || !events.has(event)) return;
  // Только название события и режим. Контакты и параметры формы не передаются.
  const detail = {
    event,
    mode: ["quick", "detail", "tiles"].includes(mode) ? mode : "quick",
  };
  window.dispatchEvent(new CustomEvent("elit-plit:analytics", { detail }));
  if (!window.dataLayer) window.dataLayer = [];
  if (Array.isArray(window.dataLayer)) window.dataLayer.push(detail);
}
