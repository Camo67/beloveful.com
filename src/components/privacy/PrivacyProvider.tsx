import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ConsentBanner } from "./ConsentBanner";
import { PreferencesModal } from "./PreferencesModal";
import { PrivacyContext, type PrivacyContextValue } from "./privacy-context";
import { privacyRuntimeConfig, fallbackPrivacyBootstrap } from "@/lib/privacy/config";
import {
  buildConsentCategories,
  clearOptionalTrackingStorage,
  createStoredConsentRecord,
  hasConsentForCategory,
  mergeConsentWithBootstrap,
  readStoredConsent,
  writeStoredConsent,
} from "@/lib/privacy/storage";
import { trackPageView, trackSessionStart } from "@/lib/privacy/tracking";
import type {
  ConsentAction,
  ConsentCategories,
  ConsentStatus,
  PrivacyBootstrap,
  PrivacyCategory,
  StoredConsentRecord,
} from "@/lib/privacy/types";

async function fetchBootstrap(): Promise<PrivacyBootstrap> {
  try {
    const response = await fetch("/api/privacy/bootstrap");
    if (!response.ok) return fallbackPrivacyBootstrap;

    const data = await response.json();
    if (!data?.success || !data?.bootstrap) return fallbackPrivacyBootstrap;

    const browserGpc =
      typeof navigator !== "undefined" &&
      Boolean(
        (navigator as Navigator & { globalPrivacyControl?: boolean })
          .globalPrivacyControl,
      );

    return {
      ...fallbackPrivacyBootstrap,
      ...data.bootstrap,
      globalPrivacyControl: Boolean(data.bootstrap.globalPrivacyControl || browserGpc),
    };
  } catch {
    return fallbackPrivacyBootstrap;
  }
}

function shouldShowBanner(
  consent: StoredConsentRecord | null,
  bootstrap: PrivacyBootstrap,
) {
  if (!privacyRuntimeConfig.settingsLauncherEnabled) return false;
  if (!consent) return true;
  if (consent.status === "withdrawn") return true;
  if (consent.needsRenewal) return true;
  if (!bootstrap.optionalTrackingEnabled) return false;
  return false;
}

export function PrivacyProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [bootstrap, setBootstrap] = useState<PrivacyBootstrap>(
    fallbackPrivacyBootstrap,
  );
  const [consent, setConsent] = useState<StoredConsentRecord | null>(null);
  const [ready, setReady] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [bannerOpen, setBannerOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const pageViewRef = useRef("");
  const sessionTrackedRef = useRef(false);

  useEffect(() => {
    let active = true;

    fetchBootstrap().then((nextBootstrap) => {
      if (!active) return;
      const stored = readStoredConsent();
      const merged = mergeConsentWithBootstrap(stored, nextBootstrap);
      setBootstrap(nextBootstrap);
      setConsent(merged);
      setBannerOpen(shouldShowBanner(merged, nextBootstrap));
      setReady(true);
    });

    return () => {
      active = false;
    };
  }, []);

  const syncConsent = useCallback(
    async (
      record: StoredConsentRecord,
      action: ConsentAction,
      method: "POST" | "PUT",
      endpoint: string,
    ) => {
      writeStoredConsent(record);
      setConsent(record);
      setBannerOpen(shouldShowBanner(record, bootstrap));
      setSaving(true);

      try {
        await fetch(endpoint, {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            anonymousConsentId: record.anonymousConsentId,
            consentVersion: record.consentVersion,
            policyVersion: record.policyVersion,
            regionMode: record.regionMode,
            categories: record.categories,
            saleSharingOptOut: record.saleSharingOptOut,
            globalPrivacyControl: record.globalPrivacyControl,
            action,
          }),
        });
      } finally {
        setSaving(false);
      }
    },
    [bootstrap],
  );

  const persistDecision = useCallback(
    async (
      categories: ConsentCategories,
      source: ConsentAction,
      status: ConsentStatus,
      endpoint = "/api/privacy/consent",
      method: "POST" | "PUT" = consent ? "PUT" : "POST",
    ) => {
      const next = createStoredConsentRecord({
        anonymousConsentId: consent?.anonymousConsentId,
        regionMode: bootstrap.regionMode,
        consentVersion: bootstrap.consentVersion,
        policyVersion: bootstrap.policyVersion,
        categories: {
          ...categories,
          advertising:
            !bootstrap.globalPrivacyControl &&
            bootstrap.optionalTrackingEnabled &&
            categories.advertising,
        },
        saleSharingOptOut:
          bootstrap.globalPrivacyControl || !categories.advertising,
        globalPrivacyControl: bootstrap.globalPrivacyControl,
        source,
        status,
        needsRenewal: false,
      });

      if (!hasConsentForCategory(next, "analytics")) {
        clearOptionalTrackingStorage();
        sessionTrackedRef.current = false;
      }

      await syncConsent(next, source, method, endpoint);
      setPreferencesOpen(false);
      setBannerOpen(false);
    },
    [bootstrap, consent, syncConsent],
  );

  const acceptAll = useCallback(async () => {
    await persistDecision(
      buildConsentCategories({
        analytics: bootstrap.optionalTrackingEnabled,
        personalization: bootstrap.optionalTrackingEnabled,
        advertising:
          bootstrap.optionalTrackingEnabled && !bootstrap.globalPrivacyControl,
      }),
      "accept_all",
      "accepted",
    );
  }, [bootstrap, persistDecision]);

  const rejectNonEssential = useCallback(async () => {
    await persistDecision(
      buildConsentCategories({
        analytics: false,
        personalization: false,
        advertising: false,
      }),
      "reject_non_essential",
      "rejected",
    );
  }, [persistDecision]);

  const savePreferences = useCallback(
    async (categories: ConsentCategories) => {
      await persistDecision(categories, "customize", "customized");
    },
    [persistDecision],
  );

  const withdrawConsent = useCallback(async () => {
    const next = createStoredConsentRecord({
      anonymousConsentId: consent?.anonymousConsentId,
      regionMode: bootstrap.regionMode,
      consentVersion: bootstrap.consentVersion,
      policyVersion: bootstrap.policyVersion,
      categories: buildConsentCategories(),
      saleSharingOptOut: true,
      globalPrivacyControl: bootstrap.globalPrivacyControl,
      source: "withdraw",
      status: "withdrawn",
      needsRenewal: false,
    });

    clearOptionalTrackingStorage();
    sessionTrackedRef.current = false;
    await syncConsent(next, "withdraw", "POST", "/api/privacy/withdraw");
    setPreferencesOpen(false);
    setBannerOpen(true);
  }, [bootstrap, consent, syncConsent]);

  const optOutSaleSharing = useCallback(async () => {
    const nextCategories = buildConsentCategories({
      analytics: consent?.categories.analytics ?? false,
      personalization: consent?.categories.personalization ?? false,
      advertising: false,
    });
    await persistDecision(
      nextCategories,
      "opt_out_sale_sharing",
      consent?.status === "unknown" || !consent ? "customized" : consent.status,
      "/api/privacy/opt-out",
      consent ? "PUT" : "POST",
    );
  }, [consent, persistDecision]);

  const hasConsentFor = useCallback(
    (category: PrivacyCategory) =>
      hasConsentForCategory(
        consent,
        category,
        bootstrap.optionalTrackingEnabled,
      ),
    [bootstrap.optionalTrackingEnabled, consent],
  );

  useEffect(() => {
    if (!ready || !hasConsentFor("analytics")) return;

    if (!sessionTrackedRef.current) {
      sessionTrackedRef.current = true;
      void trackSessionStart();
    }

    const path = `${location.pathname}${location.search}`;
    if (pageViewRef.current === path) return;
    pageViewRef.current = path;
    void trackPageView();
  }, [hasConsentFor, location.pathname, location.search, ready]);

  const contextValue = useMemo<PrivacyContextValue>(
    () => ({
      bootstrap,
      consent,
      ready,
      preferencesOpen,
      saving,
      bannerOpen,
      hasConsentFor,
      openPreferences: () => setPreferencesOpen(true),
      closePreferences: () => setPreferencesOpen(false),
      acceptAll,
      rejectNonEssential,
      savePreferences,
      withdrawConsent,
      optOutSaleSharing,
    }),
    [
      acceptAll,
      bannerOpen,
      bootstrap,
      consent,
      hasConsentFor,
      optOutSaleSharing,
      preferencesOpen,
      ready,
      rejectNonEssential,
      savePreferences,
      saving,
      withdrawConsent,
    ],
  );

  return (
    <PrivacyContext.Provider value={contextValue}>
      {children}

      <ConsentBanner
        open={bannerOpen}
        regionMode={bootstrap.regionMode}
        globalPrivacyControl={bootstrap.globalPrivacyControl}
        onAcceptAll={() => {
          void acceptAll();
        }}
        onRejectNonEssential={() => {
          void rejectNonEssential();
        }}
        onCustomize={() => setPreferencesOpen(true)}
      />

      <PreferencesModal
        open={preferencesOpen}
        bootstrap={bootstrap}
        consent={consent}
        saving={saving}
        onOpenChange={setPreferencesOpen}
        onAcceptAll={() => {
          void acceptAll();
        }}
        onRejectAll={() => {
          void rejectNonEssential();
        }}
        onSave={(categories) => {
          void savePreferences(categories);
        }}
        onWithdraw={() => {
          void withdrawConsent();
        }}
      />

      {!bannerOpen && privacyRuntimeConfig.settingsLauncherEnabled ? (
        <div className="pointer-events-none fixed bottom-4 left-4 z-[60] flex flex-wrap gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setPreferencesOpen(true)}
            className="pointer-events-auto shadow-lg"
          >
            Privacy Settings
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            asChild
            className="pointer-events-auto shadow-lg"
          >
            <Link to="/do-not-sell-or-share">
              Do Not Sell or Share
            </Link>
          </Button>
        </div>
      ) : null}
    </PrivacyContext.Provider>
  );
}
