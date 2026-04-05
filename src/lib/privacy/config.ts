import { DEFAULT_REGION_MODE } from "./constants";
import type { PrivacyBootstrap } from "./types";

export const privacyRuntimeConfig = {
  consentVersion: import.meta.env.VITE_PRIVACY_CONSENT_VERSION ?? "2026-03-23",
  policyVersion: import.meta.env.VITE_PRIVACY_POLICY_VERSION ?? "2026-03-23",
  optionalTrackingEnabled:
    import.meta.env.VITE_PRIVACY_DISABLE_OPTIONAL_TRACKING !== "true",
  settingsLauncherEnabled:
    import.meta.env.VITE_PRIVACY_SETTINGS_ENABLED !== "false",
} as const;

export const fallbackPrivacyBootstrap: PrivacyBootstrap = {
  consentVersion: privacyRuntimeConfig.consentVersion,
  policyVersion: privacyRuntimeConfig.policyVersion,
  regionMode: DEFAULT_REGION_MODE,
  countryCode: "",
  regionCode: "",
  globalPrivacyControl: false,
  optionalTrackingEnabled: privacyRuntimeConfig.optionalTrackingEnabled,
  saleSharingLinkRequired: true,
};
