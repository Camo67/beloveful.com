import type { Context } from "hono";
import type {
  ConsentAction,
  ConsentCategories,
  ConsentStatus,
  PrivacyCategory,
  RegionMode,
} from "../../../src/lib/privacy/types";

export interface PrivacyEnv {
  DB: D1Database;
  PRIVACY_ADMIN_TOKEN?: string;
  PRIVACY_CONSENT_VERSION?: string;
  PRIVACY_POLICY_VERSION?: string;
  PRIVACY_DISABLE_OPTIONAL_TRACKING?: string;
  PRIVACY_REGION_FORCE_MODE?: RegionMode;
  PRIVACY_CONSENT_RETENTION_DAYS?: string;
  PRIVACY_EVENT_RETENTION_DAYS?: string;
  PRIVACY_REQUEST_RETENTION_DAYS?: string;
}

const EEA_AND_UK_COUNTRIES = new Set([
  "AT",
  "BE",
  "BG",
  "HR",
  "CY",
  "CZ",
  "DK",
  "EE",
  "FI",
  "FR",
  "DE",
  "GR",
  "HU",
  "IS",
  "IE",
  "IT",
  "LV",
  "LI",
  "LT",
  "LU",
  "MT",
  "NL",
  "NO",
  "PL",
  "PT",
  "RO",
  "SK",
  "SI",
  "ES",
  "SE",
  "GB",
]);

const VALID_REGION_MODES = new Set<RegionMode>([
  "opt_in",
  "california",
  "conservative",
]);

const VALID_STATUS = new Set<ConsentStatus>([
  "accepted",
  "rejected",
  "customized",
  "withdrawn",
  "unknown",
]);

const VALID_ACTIONS = new Set<ConsentAction>([
  "accept_all",
  "reject_non_essential",
  "customize",
  "withdraw",
  "opt_out_sale_sharing",
  "gpc_signal",
]);

const VALID_EVENT_CATEGORIES = new Set<PrivacyCategory>([
  "necessary",
  "analytics",
  "personalization",
  "advertising",
]);

function coerceRetention(value: string | undefined, fallback: number) {
  const parsed = Number.parseInt(String(value ?? ""), 10);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}

export function jsonResponse(payload: unknown, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function resolvePrivacyVersions(env: PrivacyEnv) {
  return {
    consentVersion: env.PRIVACY_CONSENT_VERSION ?? "2026-03-23",
    policyVersion: env.PRIVACY_POLICY_VERSION ?? "2026-03-23",
  };
}

export function optionalTrackingEnabled(env: PrivacyEnv) {
  return env.PRIVACY_DISABLE_OPTIONAL_TRACKING !== "true";
}

export function getGlobalPrivacyControl(request: Request) {
  return (
    request.headers.get("Sec-GPC") === "1" ||
    request.headers.get("Global-Privacy-Control") === "1"
  );
}

function getRequestCf(request: Request) {
  return (request as Request & {
    cf?: { country?: string; regionCode?: string };
  }).cf;
}

export function inferRegionMode(request: Request, env: PrivacyEnv) {
  const forcedMode = env.PRIVACY_REGION_FORCE_MODE;
  const cf = getRequestCf(request);
  const countryCode = (
    cf?.country ??
    request.headers.get("CF-IPCountry") ??
    ""
  ).toUpperCase();
  const regionCode = (
    cf?.regionCode ??
    request.headers.get("CF-Region-Code") ??
    ""
  ).toUpperCase();

  let regionMode: RegionMode = "conservative";

  if (forcedMode && VALID_REGION_MODES.has(forcedMode)) {
    regionMode = forcedMode;
  } else if (countryCode === "US" && regionCode === "CA") {
    regionMode = "california";
  } else if (EEA_AND_UK_COUNTRIES.has(countryCode)) {
    regionMode = "opt_in";
  }

  return {
    regionMode,
    countryCode,
    regionCode,
  };
}

export function minimizeIpAddress(request: Request) {
  const raw =
    request.headers.get("CF-Connecting-IP") ??
    request.headers.get("X-Forwarded-For")?.split(",")[0]?.trim() ??
    "";

  if (!raw) return "";

  if (raw.includes(".")) {
    const octets = raw.split(".");
    return octets.length === 4 ? `${octets[0]}.${octets[1]}.${octets[2]}.0/24` : "";
  }

  if (raw.includes(":")) {
    const segments = raw.split(":").filter(Boolean);
    return segments.length >= 4
      ? `${segments.slice(0, 4).join(":")}::/64`
      : "";
  }

  return "";
}

export function minimizeUserAgent(userAgent: string | null) {
  if (!userAgent) return "";
  const source = userAgent.toLowerCase();
  const browser = source.includes("edg/")
    ? "Edge"
    : source.includes("chrome/")
      ? "Chrome"
      : source.includes("safari/") && !source.includes("chrome/")
        ? "Safari"
        : source.includes("firefox/")
          ? "Firefox"
          : "Other";
  const os = source.includes("iphone") || source.includes("ipad")
    ? "iOS"
    : source.includes("android")
      ? "Android"
      : source.includes("mac os x")
        ? "macOS"
        : source.includes("windows")
          ? "Windows"
          : source.includes("linux")
            ? "Linux"
            : "Other";
  const device = /mobile|iphone|android/.test(source) ? "mobile" : "desktop";
  return `${browser};${os};${device}`;
}

export function normalizeConsentCategories(
  input: Partial<ConsentCategories> | undefined,
  options: {
    globalPrivacyControl?: boolean;
    optionalTrackingEnabled?: boolean;
  } = {},
): ConsentCategories {
  const trackingAllowed = options.optionalTrackingEnabled ?? true;
  const gpc = options.globalPrivacyControl ?? false;

  return {
    necessary: true,
    analytics: trackingAllowed ? Boolean(input?.analytics) : false,
    personalization: trackingAllowed ? Boolean(input?.personalization) : false,
    advertising:
      trackingAllowed && !gpc ? Boolean(input?.advertising) : false,
  };
}

export async function hashIdentifier(value: string) {
  const normalized = value.trim().toLowerCase();
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(normalized),
  );
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export function sanitizeFreeText(input: unknown, maxLength = 500) {
  if (typeof input !== "string") return "";
  return input.trim().slice(0, maxLength);
}

export function sanitizeEventPayload(payload: unknown) {
  if (!payload || typeof payload !== "object") return "{}";

  const blockedPattern =
    /(email|phone|name|address|message|dob|passport|token|secret)/i;
  const sanitized: Record<string, string | number | boolean | null> = {};

  for (const [key, value] of Object.entries(payload as Record<string, unknown>).slice(0, 12)) {
    if (blockedPattern.test(key)) continue;
    if (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean" ||
      value === null
    ) {
      sanitized[key] = value;
    }
  }

  return JSON.stringify(sanitized);
}

export function auditLog(
  eventType: string,
  details: Record<string, unknown> = {},
) {
  console.log(
    JSON.stringify({
      scope: "privacy",
      eventType,
      timestamp: new Date().toISOString(),
      ...details,
    }),
  );
}

export async function readLatestConsentSnapshot(
  db: D1Database,
  anonymousConsentId: string,
) {
  return db
    .prepare(
      `
      SELECT
        anonymous_consent_id,
        status,
        action,
        consent_version,
        policy_version,
        region_mode,
        categories_json,
        sale_sharing_opt_out,
        gpc_signal,
        created_at
      FROM privacy_consent_log
      WHERE anonymous_consent_id = ?
      ORDER BY id DESC
      LIMIT 1
      `,
    )
    .bind(anonymousConsentId)
    .first();
}

export function parseConsentCategories(row: { categories_json?: unknown }) {
  try {
    const parsed = JSON.parse(String(row.categories_json ?? "{}"));
    return normalizeConsentCategories(parsed);
  } catch {
    return normalizeConsentCategories(undefined);
  }
}

export async function insertConsentLog(
  db: D1Database,
  params: {
    anonymousConsentId: string;
    status: ConsentStatus;
    action: ConsentAction;
    consentVersion: string;
    policyVersion: string;
    regionMode: RegionMode;
    categories: ConsentCategories;
    saleSharingOptOut: boolean;
    globalPrivacyControl: boolean;
    ipPrefix: string;
    userAgentSummary: string;
  },
) {
  await db
    .prepare(
      `
      INSERT INTO privacy_consent_log (
        anonymous_consent_id,
        status,
        action,
        consent_version,
        policy_version,
        region_mode,
        categories_json,
        sale_sharing_opt_out,
        gpc_signal,
        ip_prefix,
        user_agent_summary
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
    )
    .bind(
      params.anonymousConsentId,
      params.status,
      params.action,
      params.consentVersion,
      params.policyVersion,
      params.regionMode,
      JSON.stringify(params.categories),
      Number(params.saleSharingOptOut),
      Number(params.globalPrivacyControl),
      params.ipPrefix,
      params.userAgentSummary,
    )
    .run();
}

export function ensureValidStatus(value: unknown, fallback: ConsentStatus) {
  return typeof value === "string" && VALID_STATUS.has(value as ConsentStatus)
    ? (value as ConsentStatus)
    : fallback;
}

export function ensureValidAction(value: unknown, fallback: ConsentAction) {
  return typeof value === "string" && VALID_ACTIONS.has(value as ConsentAction)
    ? (value as ConsentAction)
    : fallback;
}

export function ensureValidEventCategory(
  value: unknown,
  fallback: PrivacyCategory = "analytics",
) {
  return typeof value === "string" &&
    VALID_EVENT_CATEGORIES.has(value as PrivacyCategory)
    ? (value as PrivacyCategory)
    : fallback;
}

export function requirePrivacyAdmin(c: Context<{ Bindings: PrivacyEnv }>) {
  const configuredToken = c.env.PRIVACY_ADMIN_TOKEN;
  if (!configuredToken) {
    return jsonResponse(
      {
        success: false,
        error: "PRIVACY_ADMIN_TOKEN is not configured",
      },
      503,
    );
  }

  const headerToken =
    c.req.header("x-privacy-admin-token") ??
    c.req.header("authorization")?.replace(/^Bearer\s+/i, "");

  if (headerToken !== configuredToken) {
    return jsonResponse({ success: false, error: "Unauthorized" }, 401);
  }

  return null;
}

export async function runPrivacyRetentionCleanup(env: PrivacyEnv) {
  const consentRetentionDays = coerceRetention(
    env.PRIVACY_CONSENT_RETENTION_DAYS,
    365,
  );
  const eventRetentionDays = coerceRetention(
    env.PRIVACY_EVENT_RETENTION_DAYS,
    90,
  );
  const requestRetentionDays = coerceRetention(
    env.PRIVACY_REQUEST_RETENTION_DAYS,
    365,
  );

  const db = env.DB;
  const statements = [
    db
      .prepare(
        "DELETE FROM privacy_consent_log WHERE created_at < datetime('now', ?)",
      )
      .bind(`-${consentRetentionDays} days`),
    db
      .prepare("DELETE FROM privacy_events WHERE created_at < datetime('now', ?)")
      .bind(`-${eventRetentionDays} days`),
    db
      .prepare(
        "DELETE FROM privacy_requests WHERE created_at < datetime('now', ?)",
      )
      .bind(`-${requestRetentionDays} days`),
  ];

  await db.batch(statements);

  auditLog("retention_cleanup_completed", {
    consentRetentionDays,
    eventRetentionDays,
    requestRetentionDays,
  });

  return {
    consentRetentionDays,
    eventRetentionDays,
    requestRetentionDays,
  };
}
