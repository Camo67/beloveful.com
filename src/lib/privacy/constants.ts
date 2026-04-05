import type { ConsentCategories, PrivacyCategory, RegionMode } from "./types";

export const PRIVACY_STORAGE_KEYS = {
  consent: "beloveful_privacy_consent_v1",
  optionalVisitorId: "beloveful_privacy_optional_visitor_v1",
  optionalSessionId: "beloveful_privacy_optional_session_v1",
} as const;

export const DEFAULT_OPTIONAL_CATEGORIES: Record<
  Exclude<PrivacyCategory, "necessary">,
  boolean
> = {
  analytics: false,
  personalization: false,
  advertising: false,
};

export const DEFAULT_CONSENT_CATEGORIES: ConsentCategories = {
  necessary: true,
  analytics: false,
  personalization: false,
  advertising: false,
};

export const DEFAULT_REGION_MODE: RegionMode = "conservative";

export const PRIVACY_EVENT_NAMES = {
  pageView: "page_view",
  sessionStart: "session_start",
  signupStarted: "signup_started",
  purchaseCompleted: "purchase_completed",
} as const;

export const OPTIONAL_CATEGORIES: Exclude<PrivacyCategory, "necessary">[] = [
  "analytics",
  "personalization",
  "advertising",
];

export const PRIVACY_CATEGORY_LABELS: Record<PrivacyCategory, string> = {
  necessary: "Strictly necessary",
  analytics: "Analytics",
  personalization: "Personalization",
  advertising: "Advertising / sale-sharing",
};
