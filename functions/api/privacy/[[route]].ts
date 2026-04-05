import { Hono } from "hono";
import { cors } from "hono/cors";
import {
  auditLog,
  ensureValidAction,
  ensureValidEventCategory,
  ensureValidStatus,
  getGlobalPrivacyControl,
  hashIdentifier,
  inferRegionMode,
  insertConsentLog,
  jsonResponse,
  minimizeIpAddress,
  minimizeUserAgent,
  normalizeConsentCategories,
  optionalTrackingEnabled,
  parseConsentCategories,
  readLatestConsentSnapshot,
  requirePrivacyAdmin,
  resolvePrivacyVersions,
  runPrivacyRetentionCleanup,
  sanitizeEventPayload,
  sanitizeFreeText,
  type PrivacyEnv,
} from "./_utils";
import type {
  ConsentAction,
  ConsentStatus,
  PrivacyCategory,
  RegionMode,
} from "../../../src/lib/privacy/types";

type PrivacyBindings = {
  Bindings: PrivacyEnv;
};

const app = new Hono<PrivacyBindings>();

app.use(
  "*",
  cors({
    origin: [
      "http://localhost:8080",
      "https://beloveful.com",
      "https://www.beloveful.com",
    ],
    allowMethods: ["GET", "POST", "PUT", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization", "X-Privacy-Admin-Token"],
  }),
);

app.get("/api/privacy/bootstrap", async (c) => {
  const regionMetadata = inferRegionMode(c.req.raw, c.env);
  const versions = resolvePrivacyVersions(c.env);

  return c.json({
    success: true,
    bootstrap: {
      ...versions,
      ...regionMetadata,
      globalPrivacyControl: getGlobalPrivacyControl(c.req.raw),
      optionalTrackingEnabled: optionalTrackingEnabled(c.env),
      saleSharingLinkRequired: true,
    },
  });
});

async function upsertConsent(
  request: Request,
  env: PrivacyEnv,
  body: Record<string, unknown>,
  fallbackAction: ConsentAction,
  fallbackStatus: ConsentStatus,
) {
  const versions = resolvePrivacyVersions(env);
  const regionMetadata = inferRegionMode(request, env);
  const anonymousConsentId = sanitizeFreeText(body.anonymousConsentId, 100);

  if (!anonymousConsentId) {
    return jsonResponse(
      { success: false, error: "anonymousConsentId is required" },
      400,
    );
  }

  const globalPrivacyControl = getGlobalPrivacyControl(request);
  const categories = normalizeConsentCategories(
    body.categories as Record<string, boolean> | undefined,
    {
      globalPrivacyControl,
      optionalTrackingEnabled: optionalTrackingEnabled(env),
    },
  );
  const action = ensureValidAction(body.action, fallbackAction);
  const status = ensureValidStatus(body.status, fallbackStatus);
  const saleSharingOptOut =
    globalPrivacyControl ||
    body.saleSharingOptOut === true ||
    !categories.advertising;

  await insertConsentLog(env.DB, {
    anonymousConsentId,
    status,
    action,
    consentVersion: sanitizeFreeText(
      body.consentVersion,
      50,
    ) || versions.consentVersion,
    policyVersion: sanitizeFreeText(body.policyVersion, 50) || versions.policyVersion,
    regionMode:
      (sanitizeFreeText(body.regionMode, 30) as RegionMode) ||
      regionMetadata.regionMode,
    categories,
    saleSharingOptOut,
    globalPrivacyControl,
    ipPrefix: minimizeIpAddress(request),
    userAgentSummary: minimizeUserAgent(request.headers.get("User-Agent")),
  });

  auditLog("consent_recorded", {
    anonymousConsentId,
    action,
    status,
    regionMode: regionMetadata.regionMode,
    saleSharingOptOut,
    globalPrivacyControl,
  });

  return jsonResponse(
    {
      success: true,
      consent: {
        anonymousConsentId,
        action,
        status,
        categories,
        saleSharingOptOut,
        regionMode: regionMetadata.regionMode,
        consentVersion: versions.consentVersion,
        policyVersion: versions.policyVersion,
        globalPrivacyControl,
      },
    },
    200,
  );
}

app.post("/api/privacy/consent", async (c) => {
  const body = await c.req.json<Record<string, unknown>>();
  return upsertConsent(c.req.raw, c.env, body, "customize", "customized");
});

app.put("/api/privacy/consent", async (c) => {
  const body = await c.req.json<Record<string, unknown>>();
  return upsertConsent(c.req.raw, c.env, body, "customize", "customized");
});

app.post("/api/privacy/withdraw", async (c) => {
  const body = await c.req.json<Record<string, unknown>>();
  return upsertConsent(c.req.raw, c.env, body, "withdraw", "withdrawn");
});

app.post("/api/privacy/opt-out", async (c) => {
  const body = await c.req.json<Record<string, unknown>>();
  const nextBody = {
    ...body,
    categories: {
      ...(body.categories as Record<string, boolean> | undefined),
      advertising: false,
    },
    saleSharingOptOut: true,
  };
  return upsertConsent(
    c.req.raw,
    c.env,
    nextBody,
    "opt_out_sale_sharing",
    "customized",
  );
});

app.post("/api/privacy/data-request", async (c) => {
  const body = await c.req.json<Record<string, unknown>>();
  const requestType = sanitizeFreeText(body.requestType, 40);
  const identifierType = sanitizeFreeText(body.identifierType, 40);
  const identifierValue = sanitizeFreeText(body.identifierValue, 180);
  const contactEmail = sanitizeFreeText(body.contactEmail, 180).toLowerCase();
  const details = sanitizeFreeText(body.details, 1000);

  if (!requestType || !identifierType || !identifierValue || !contactEmail) {
    return c.json(
      { success: false, error: "requestType, identifierValue, and contactEmail are required" },
      400,
    );
  }

  const identifierHash = await hashIdentifier(identifierValue);
  await c.env.DB.prepare(
    `
    INSERT INTO privacy_requests (
      request_type,
      identifier_type,
      identifier_value,
      identifier_hash,
      contact_email,
      details,
      status
    ) VALUES (?, ?, ?, ?, ?, ?, 'submitted')
    `,
  )
    .bind(
      requestType,
      identifierType,
      identifierValue,
      identifierHash,
      contactEmail,
      details,
    )
    .run();

  auditLog("data_request_submitted", {
    requestType,
    identifierType,
    identifierHash,
  });

  return c.json({ success: true }, 201);
});

app.post("/api/privacy/export", async (c) => {
  const unauthorized = requirePrivacyAdmin(c);
  if (unauthorized) return unauthorized;

  const body = await c.req.json<Record<string, unknown>>();
  const identifierType = sanitizeFreeText(body.identifierType, 40);
  const identifierValue = sanitizeFreeText(body.identifierValue, 180);

  if (!identifierType || !identifierValue) {
    return c.json({ success: false, error: "identifierType and identifierValue are required" }, 400);
  }

  const identifierHash = await hashIdentifier(identifierValue);

  const [consents, events, requests] = await Promise.all([
    identifierType === "anonymous_consent_id"
      ? c.env.DB.prepare(
          `
          SELECT anonymous_consent_id, status, action, consent_version, policy_version, region_mode, categories_json, sale_sharing_opt_out, gpc_signal, created_at
          FROM privacy_consent_log
          WHERE anonymous_consent_id = ?
          ORDER BY id DESC
          `,
        )
          .bind(identifierValue)
          .all()
      : Promise.resolve({ results: [] as unknown[] }),
    identifierType === "anonymous_consent_id"
      ? c.env.DB.prepare(
          `
          SELECT anonymous_consent_id, session_id, pseudonymous_user_id, event_name, event_category, path, referrer_path, payload_json, created_at
          FROM privacy_events
          WHERE anonymous_consent_id = ?
          ORDER BY id DESC
          `,
        )
          .bind(identifierValue)
          .all()
      : Promise.resolve({ results: [] as unknown[] }),
    c.env.DB.prepare(
      `
      SELECT request_type, identifier_type, identifier_value, contact_email, details, status, created_at, updated_at
      FROM privacy_requests
      WHERE identifier_hash = ? OR contact_email = ? OR identifier_value = ?
      ORDER BY id DESC
      `,
    )
      .bind(identifierHash, identifierValue.toLowerCase(), identifierValue)
      .all(),
  ]);

  return c.json({
    success: true,
    export: {
      identifierType,
      identifierValue,
      consentLog: consents.results ?? [],
      eventLog: events.results ?? [],
      privacyRequests: requests.results ?? [],
    },
  });
});

app.post("/api/privacy/delete", async (c) => {
  const unauthorized = requirePrivacyAdmin(c);
  if (unauthorized) return unauthorized;

  const body = await c.req.json<Record<string, unknown>>();
  const identifierType = sanitizeFreeText(body.identifierType, 40);
  const identifierValue = sanitizeFreeText(body.identifierValue, 180);

  if (!identifierType || !identifierValue) {
    return c.json({ success: false, error: "identifierType and identifierValue are required" }, 400);
  }

  const identifierHash = await hashIdentifier(identifierValue);
  const statements: D1PreparedStatement[] = [];

  if (identifierType === "anonymous_consent_id") {
    statements.push(
      c.env.DB.prepare("DELETE FROM privacy_consent_log WHERE anonymous_consent_id = ?").bind(identifierValue),
      c.env.DB.prepare("DELETE FROM privacy_events WHERE anonymous_consent_id = ?").bind(identifierValue),
      c.env.DB.prepare("DELETE FROM privacy_requests WHERE identifier_value = ?").bind(identifierValue),
    );
  } else {
    statements.push(
      c.env.DB.prepare("DELETE FROM privacy_requests WHERE identifier_hash = ? OR contact_email = ?").bind(
        identifierHash,
        identifierValue.toLowerCase(),
      ),
    );
  }

  await c.env.DB.batch(statements);

  auditLog("privacy_data_deleted", {
    identifierType,
    identifierHash,
  });

  return c.json({ success: true });
});

app.post("/api/privacy/events", async (c) => {
  const body = await c.req.json<Record<string, unknown>>();
  const eventName = sanitizeFreeText(body.eventName, 80);
  const eventCategory = ensureValidEventCategory(body.eventCategory);
  const anonymousConsentId = sanitizeFreeText(body.anonymousConsentId, 100);
  const path = sanitizeFreeText(body.path, 200);
  const referrerPath = sanitizeFreeText(body.referrerPath, 200);
  const sessionId = sanitizeFreeText(body.sessionId, 100);
  const pseudonymousUserId = sanitizeFreeText(body.pseudonymousUserId, 100);

  if (!eventName) {
    return c.json({ success: false, error: "eventName is required" }, 400);
  }

  if (eventCategory !== "necessary") {
    if (!optionalTrackingEnabled(c.env)) {
      return c.json({ success: true, tracked: false, reason: "optional tracking disabled" }, 202);
    }

    if (!anonymousConsentId) {
      return c.json({ success: true, tracked: false, reason: "missing consent id" }, 202);
    }

    const latestConsent = await readLatestConsentSnapshot(
      c.env.DB,
      anonymousConsentId,
    );
    if (!latestConsent) {
      return c.json({ success: true, tracked: false, reason: "no consent snapshot" }, 202);
    }

    if (String(latestConsent.status) === "withdrawn") {
      return c.json({ success: true, tracked: false, reason: "withdrawn" }, 202);
    }

    const categories = parseConsentCategories(latestConsent);
    const allowed =
      eventCategory === "analytics"
        ? categories.analytics
        : eventCategory === "personalization"
          ? categories.personalization
          : categories.advertising;

    if (!allowed) {
      return c.json({ success: true, tracked: false, reason: "consent not granted" }, 202);
    }
  }

  await c.env.DB.prepare(
    `
    INSERT INTO privacy_events (
      anonymous_consent_id,
      session_id,
      pseudonymous_user_id,
      event_name,
      event_category,
      path,
      referrer_path,
      payload_json
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `,
  )
    .bind(
      anonymousConsentId || null,
      sessionId || null,
      pseudonymousUserId || null,
      eventName,
      eventCategory,
      path || null,
      referrerPath || null,
      sanitizeEventPayload(body.payload),
    )
    .run();

  return c.json({ success: true, tracked: true }, 202);
});

app.post("/api/privacy/cleanup", async (c) => {
  const unauthorized = requirePrivacyAdmin(c);
  if (unauthorized) return unauthorized;

  const result = await runPrivacyRetentionCleanup(c.env);
  return c.json({ success: true, result });
});

app.onError((error) => {
  auditLog("privacy_api_error", {
    message: error instanceof Error ? error.message : "Unknown error",
  });
  return jsonResponse({ success: false, error: "Privacy API error" }, 500);
});

export default app;
