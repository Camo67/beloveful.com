/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PRIVACY_CONSENT_VERSION?: string;
  readonly VITE_PRIVACY_POLICY_VERSION?: string;
  readonly VITE_PRIVACY_LAST_UPDATED?: string;
  readonly VITE_PRIVACY_DISABLE_OPTIONAL_TRACKING?: string;
  readonly VITE_PRIVACY_SETTINGS_ENABLED?: string;
  readonly VITE_COMPANY_NAME?: string;
  readonly VITE_LEGAL_ENTITY?: string;
  readonly VITE_CONTACT_EMAIL?: string;
  readonly VITE_DPO_EMAIL?: string;
  readonly VITE_JURISDICTIONS?: string;
  readonly VITE_TRACKING_TOOLS?: string;
  readonly VITE_RETENTION_SCHEDULE?: string;
  readonly VITE_THIRD_PARTIES?: string;
  readonly VITE_LAWFUL_BASES?: string;
  readonly VITE_GA_ENABLED?: string;
  readonly VITE_GA_MEASUREMENT_ID?: string;
  readonly VITE_PLAUSIBLE_ENABLED?: string;
  readonly VITE_PLAUSIBLE_DOMAIN?: string;
  readonly VITE_POSTHOG_ENABLED?: string;
  readonly VITE_POSTHOG_API_KEY?: string;
  readonly VITE_POSTHOG_HOST?: string;
  readonly VITE_META_ADS_ENABLED?: string;
  readonly VITE_META_PIXEL_ID?: string;
  readonly VITE_GOOGLE_ADS_ENABLED?: string;
  readonly VITE_GOOGLE_ADS_CONVERSION_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
