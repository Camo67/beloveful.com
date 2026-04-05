import { privacyRuntimeConfig } from "./config";
import { PRIVACY_EVENT_NAMES } from "./constants";
import {
  getOrCreateOptionalSessionId,
  getOrCreateOptionalVisitorId,
  hasConsentForCategory,
  readStoredConsent,
} from "./storage";
import type { PrivacyCategory } from "./types";

function isSafeEventName(name: string) {
  return /^[a-z0-9_:-]{2,80}$/i.test(name);
}

function sanitizePayload(payload: Record<string, unknown> = {}) {
  const sanitized: Record<string, unknown> = {};
  const blockedKeyPattern =
    /(email|phone|name|address|message|dob|ssn|passport|token|secret)/i;

  for (const [key, value] of Object.entries(payload).slice(0, 12)) {
    if (blockedKeyPattern.test(key)) continue;
    if (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean" ||
      value === null
    ) {
      sanitized[key] = value;
    }
  }

  return sanitized;
}

function getReferrerPath() {
  if (typeof document === "undefined" || !document.referrer) return "";

  try {
    const referrer = new URL(document.referrer);
    return referrer.origin === window.location.origin
      ? `${referrer.pathname}${referrer.search}`
      : "";
  } catch {
    return "";
  }
}

async function sendFirstPartyEvent(body: Record<string, unknown>) {
  if (typeof fetch !== "function") return false;

  try {
    await fetch("/api/privacy/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      keepalive: true,
      body: JSON.stringify(body),
    });
  } catch {
    return false;
  }

  return true;
}

export async function trackEvent(
  eventName: string,
  payload: Record<string, unknown> = {},
  category: PrivacyCategory = "analytics",
) {
  if (!isSafeEventName(eventName)) return false;
  const consent = readStoredConsent();
  if (!hasConsentForCategory(consent, category, privacyRuntimeConfig.optionalTrackingEnabled)) {
    return false;
  }

  const sessionId =
    category === "necessary" ? null : getOrCreateOptionalSessionId();
  const pseudonymousUserId =
    category === "necessary" ? null : getOrCreateOptionalVisitorId();

  return sendFirstPartyEvent({
    anonymousConsentId: consent?.anonymousConsentId ?? null,
    eventName,
    eventCategory: category,
    path:
      typeof window !== "undefined"
        ? `${window.location.pathname}${window.location.search}`
        : "",
    referrerPath: getReferrerPath(),
    sessionId,
    pseudonymousUserId,
    payload: sanitizePayload(payload),
  });
}

export async function trackPageView() {
  return trackEvent(PRIVACY_EVENT_NAMES.pageView, {
    title: typeof document !== "undefined" ? document.title : "",
  });
}

export async function trackSessionStart() {
  return trackEvent(PRIVACY_EVENT_NAMES.sessionStart, {
    startedAt: new Date().toISOString(),
  });
}
