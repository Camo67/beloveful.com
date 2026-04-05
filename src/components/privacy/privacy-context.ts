import { createContext, useContext } from "react";
import type {
  ConsentCategories,
  PrivacyBootstrap,
  PrivacyCategory,
  StoredConsentRecord,
} from "@/lib/privacy/types";

export interface PrivacyContextValue {
  bootstrap: PrivacyBootstrap;
  consent: StoredConsentRecord | null;
  ready: boolean;
  preferencesOpen: boolean;
  saving: boolean;
  bannerOpen: boolean;
  hasConsentFor: (category: PrivacyCategory) => boolean;
  openPreferences: () => void;
  closePreferences: () => void;
  acceptAll: () => Promise<void>;
  rejectNonEssential: () => Promise<void>;
  savePreferences: (categories: ConsentCategories) => Promise<void>;
  withdrawConsent: () => Promise<void>;
  optOutSaleSharing: () => Promise<void>;
}

export const PrivacyContext = createContext<PrivacyContextValue | null>(null);

export function usePrivacyControls() {
  const context = useContext(PrivacyContext);
  if (!context) {
    throw new Error("usePrivacyControls must be used within PrivacyProvider");
  }
  return context;
}
