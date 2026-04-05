export type PrivacyCategory =
  | "necessary"
  | "analytics"
  | "personalization"
  | "advertising";

export type RegionMode = "opt_in" | "california" | "conservative";

export type ConsentStatus =
  | "unknown"
  | "accepted"
  | "rejected"
  | "customized"
  | "withdrawn";

export type ConsentAction =
  | "accept_all"
  | "reject_non_essential"
  | "customize"
  | "withdraw"
  | "opt_out_sale_sharing"
  | "gpc_signal";

export interface ConsentCategories {
  necessary: true;
  analytics: boolean;
  personalization: boolean;
  advertising: boolean;
}

export interface StoredConsentRecord {
  anonymousConsentId: string;
  consentVersion: string;
  policyVersion: string;
  regionMode: RegionMode;
  status: ConsentStatus;
  source: ConsentAction;
  categories: ConsentCategories;
  saleSharingOptOut: boolean;
  globalPrivacyControl: boolean;
  needsRenewal: boolean;
  updatedAt: string;
}

export interface PrivacyBootstrap {
  consentVersion: string;
  policyVersion: string;
  regionMode: RegionMode;
  countryCode: string;
  regionCode: string;
  globalPrivacyControl: boolean;
  optionalTrackingEnabled: boolean;
  saleSharingLinkRequired: boolean;
}

export interface PrivacyEventPayload {
  eventName: string;
  eventCategory: PrivacyCategory;
  payload?: Record<string, unknown>;
}

export interface LegalPlaceholderValues {
  companyName: string;
  legalEntity: string;
  contactEmail: string;
  dpoEmail: string;
  jurisdictions: string;
  trackingTools: string;
  retentionSchedule: string;
  thirdParties: string;
  lawfulBases: string;
  lastUpdated: string;
}
