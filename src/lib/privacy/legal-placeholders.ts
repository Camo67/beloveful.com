import type { LegalPlaceholderValues } from "./types";

function resolveValue(value: string | undefined, token: string) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : `{{${token}}}`;
}

export const legalPlaceholderValues: LegalPlaceholderValues = {
  companyName: resolveValue(import.meta.env.VITE_COMPANY_NAME, "COMPANY_NAME"),
  legalEntity: resolveValue(import.meta.env.VITE_LEGAL_ENTITY, "LEGAL_ENTITY"),
  contactEmail: resolveValue(import.meta.env.VITE_CONTACT_EMAIL, "CONTACT_EMAIL"),
  dpoEmail: resolveValue(import.meta.env.VITE_DPO_EMAIL, "DPO_EMAIL"),
  jurisdictions: resolveValue(
    import.meta.env.VITE_JURISDICTIONS,
    "JURISDICTIONS",
  ),
  trackingTools: resolveValue(
    import.meta.env.VITE_TRACKING_TOOLS,
    "TRACKING_TOOLS",
  ),
  retentionSchedule: resolveValue(
    import.meta.env.VITE_RETENTION_SCHEDULE,
    "RETENTION_SCHEDULE",
  ),
  thirdParties: resolveValue(
    import.meta.env.VITE_THIRD_PARTIES,
    "THIRD_PARTIES",
  ),
  lawfulBases: resolveValue(
    import.meta.env.VITE_LAWFUL_BASES,
    "LAWFUL_BASES",
  ),
  lastUpdated: resolveValue(
    import.meta.env.VITE_PRIVACY_LAST_UPDATED,
    "LAST_UPDATED",
  ),
};

export const legalTemplateWarnings = [
  "Template only — legal review required",
  "Jurisdiction-specific text must be finalized by counsel",
];
