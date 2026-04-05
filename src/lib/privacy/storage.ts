import {
  DEFAULT_CONSENT_CATEGORIES,
  PRIVACY_STORAGE_KEYS,
} from "./constants";
import { privacyRuntimeConfig } from "./config";
import type {
  ConsentAction,
  ConsentCategories,
  PrivacyBootstrap,
  PrivacyCategory,
  RegionMode,
  StoredConsentRecord,
} from "./types";

function hasWindow() {
  return typeof window !== "undefined";
}

function safeLocalStorage() {
  if (!hasWindow()) return null;
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function safeSessionStorage() {
  if (!hasWindow()) return null;
  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
}

export function createAnonymousConsentId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `consent_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

export function createStoredConsentRecord(
  params: Partial<StoredConsentRecord> & {
    regionMode: RegionMode;
    source: ConsentAction;
    status: StoredConsentRecord["status"];
    categories: ConsentCategories;
  },
): StoredConsentRecord {
  return {
    anonymousConsentId: params.anonymousConsentId ?? createAnonymousConsentId(),
    consentVersion:
      params.consentVersion ?? privacyRuntimeConfig.consentVersion,
    policyVersion: params.policyVersion ?? privacyRuntimeConfig.policyVersion,
    regionMode: params.regionMode,
    status: params.status,
    source: params.source,
    categories: params.categories,
    saleSharingOptOut:
      params.saleSharingOptOut ?? !params.categories.advertising,
    globalPrivacyControl: params.globalPrivacyControl ?? false,
    needsRenewal: params.needsRenewal ?? false,
    updatedAt: params.updatedAt ?? new Date().toISOString(),
  };
}

function isValidConsentRecord(value: unknown): value is StoredConsentRecord {
  if (!value || typeof value !== "object") return false;
  const record = value as Partial<StoredConsentRecord>;
  return (
    typeof record.anonymousConsentId === "string" &&
    typeof record.consentVersion === "string" &&
    typeof record.policyVersion === "string" &&
    typeof record.regionMode === "string" &&
    typeof record.status === "string" &&
    typeof record.source === "string" &&
    typeof record.updatedAt === "string" &&
    typeof record.categories === "object" &&
    record.categories !== null &&
    record.categories.necessary === true
  );
}

export function readStoredConsent(): StoredConsentRecord | null {
  const storage = safeLocalStorage();
  if (!storage) return null;

  try {
    const raw = storage.getItem(PRIVACY_STORAGE_KEYS.consent);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return isValidConsentRecord(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function writeStoredConsent(record: StoredConsentRecord) {
  const storage = safeLocalStorage();
  if (!storage) return;
  storage.setItem(PRIVACY_STORAGE_KEYS.consent, JSON.stringify(record));
}

export function clearStoredConsent() {
  const storage = safeLocalStorage();
  storage?.removeItem(PRIVACY_STORAGE_KEYS.consent);
}

export function clearOptionalTrackingStorage() {
  const localStorageRef = safeLocalStorage();
  const sessionStorageRef = safeSessionStorage();
  localStorageRef?.removeItem(PRIVACY_STORAGE_KEYS.optionalVisitorId);
  sessionStorageRef?.removeItem(PRIVACY_STORAGE_KEYS.optionalSessionId);
}

export function mergeConsentWithBootstrap(
  record: StoredConsentRecord | null,
  bootstrap: PrivacyBootstrap,
): StoredConsentRecord | null {
  if (!record) return null;

  const needsRenewal =
    record.consentVersion !== bootstrap.consentVersion ||
    record.policyVersion !== bootstrap.policyVersion;
  const advertisingAllowed =
    bootstrap.optionalTrackingEnabled &&
    !bootstrap.globalPrivacyControl &&
    record.categories.advertising &&
    !record.saleSharingOptOut;

  return {
    ...record,
    regionMode: bootstrap.regionMode,
    consentVersion: bootstrap.consentVersion,
    policyVersion: bootstrap.policyVersion,
    globalPrivacyControl:
      record.globalPrivacyControl || bootstrap.globalPrivacyControl,
    saleSharingOptOut:
      record.saleSharingOptOut || bootstrap.globalPrivacyControl,
    categories: {
      necessary: true,
      analytics:
        bootstrap.optionalTrackingEnabled && !needsRenewal
          ? record.categories.analytics
          : false,
      personalization:
        bootstrap.optionalTrackingEnabled && !needsRenewal
          ? record.categories.personalization
          : false,
      advertising:
        bootstrap.optionalTrackingEnabled && !needsRenewal
          ? advertisingAllowed
          : false,
    },
    needsRenewal,
  };
}

export function hasConsentForCategory(
  consent: StoredConsentRecord | null,
  category: PrivacyCategory,
  optionalTrackingEnabled = privacyRuntimeConfig.optionalTrackingEnabled,
) {
  if (category === "necessary") return true;
  if (!optionalTrackingEnabled) return false;
  if (!consent || consent.status === "withdrawn" || consent.needsRenewal) {
    return false;
  }
  return Boolean(consent.categories[category]);
}

export function getOptionalVisitorId() {
  const storage = safeLocalStorage();
  return storage?.getItem(PRIVACY_STORAGE_KEYS.optionalVisitorId) ?? null;
}

export function getOrCreateOptionalVisitorId() {
  const storage = safeLocalStorage();
  if (!storage) return null;

  const existing = storage.getItem(PRIVACY_STORAGE_KEYS.optionalVisitorId);
  if (existing) return existing;

  const next = createAnonymousConsentId();
  storage.setItem(PRIVACY_STORAGE_KEYS.optionalVisitorId, next);
  return next;
}

export function getOrCreateOptionalSessionId() {
  const storage = safeSessionStorage();
  if (!storage) return null;

  const existing = storage.getItem(PRIVACY_STORAGE_KEYS.optionalSessionId);
  if (existing) return existing;

  const next = createAnonymousConsentId();
  storage.setItem(PRIVACY_STORAGE_KEYS.optionalSessionId, next);
  return next;
}

export function buildConsentCategories(
  categories?: Partial<ConsentCategories>,
): ConsentCategories {
  return {
    ...DEFAULT_CONSENT_CATEGORIES,
    ...categories,
    necessary: true,
  };
}
