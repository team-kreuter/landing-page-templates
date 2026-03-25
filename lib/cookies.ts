"use client";

export type ConsentState = {
  essential: boolean;
  marketing: boolean;
  analytics: boolean;
  timestamp: number;
};

const CONSENT_KEY = "cookie_consent";

export function getConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) return null;
    return JSON.parse(stored) as ConsentState;
  } catch {
    return null;
  }
}

export function setConsent(consent: Omit<ConsentState, "essential" | "timestamp">): ConsentState {
  const state: ConsentState = {
    essential: true,
    ...consent,
    timestamp: Date.now(),
  };
  localStorage.setItem(CONSENT_KEY, JSON.stringify(state));
  window.dispatchEvent(new CustomEvent("consentUpdate", { detail: state }));
  return state;
}

export function hasMarketingConsent(): boolean {
  const consent = getConsent();
  return consent?.marketing ?? false;
}

export function revokeConsent(): void {
  localStorage.removeItem(CONSENT_KEY);
  window.dispatchEvent(new CustomEvent("consentUpdate", { detail: null }));
}
