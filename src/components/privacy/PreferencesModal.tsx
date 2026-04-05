import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { buildConsentCategories } from "@/lib/privacy/storage";
import type {
  ConsentCategories,
  PrivacyBootstrap,
  StoredConsentRecord,
} from "@/lib/privacy/types";

interface PreferencesModalProps {
  open: boolean;
  bootstrap: PrivacyBootstrap;
  consent: StoredConsentRecord | null;
  saving: boolean;
  onOpenChange: (open: boolean) => void;
  onAcceptAll: () => void;
  onRejectAll: () => void;
  onSave: (categories: ConsentCategories) => void;
  onWithdraw: () => void;
}

const categoryDescriptions = {
  necessary:
    "Required to remember privacy choices, keep the site secure, and deliver core pages.",
  analytics:
    "First-party measurement used to understand page views and core journeys without enabling third-party scripts by default.",
  personalization:
    "Optional settings that tailor content or experiences for returning visitors.",
  advertising:
    "Advertising or cross-context behavioral data uses, including sale/sharing signals where applicable.",
};

export function PreferencesModal({
  open,
  bootstrap,
  consent,
  saving,
  onOpenChange,
  onAcceptAll,
  onRejectAll,
  onSave,
  onWithdraw,
}: PreferencesModalProps) {
  const [draft, setDraft] = useState<ConsentCategories>(
    buildConsentCategories(consent?.categories),
  );

  useEffect(() => {
    setDraft(buildConsentCategories(consent?.categories));
  }, [consent, open]);

  const optionalTrackingEnabled = bootstrap.optionalTrackingEnabled;
  const advertisingLocked = bootstrap.globalPrivacyControl || !optionalTrackingEnabled;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Privacy preferences</DialogTitle>
          <DialogDescription>
            Update consent for optional analytics, personalization, and
            advertising. Strictly necessary storage stays on so your choices can
            be respected.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-950 dark:text-amber-100">
            <p className="font-medium">Review by counsel required before production use.</p>
            <p className="mt-1">
              This implementation is privacy-first, but legal text and
              jurisdiction-specific disclosures still need final legal review.
            </p>
          </div>

          {bootstrap.globalPrivacyControl ? (
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-900 dark:text-emerald-100">
              Your browser sent a Global Privacy Control signal. Advertising /
              sale-sharing remains opted out while that signal is active.
            </div>
          ) : null}

          {!optionalTrackingEnabled ? (
            <div className="rounded-xl border border-neutral-300 bg-neutral-100 p-4 text-sm text-neutral-700 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300">
              Optional tracking is globally disabled by configuration. All
              non-essential categories stay off until the feature flag is
              re-enabled.
            </div>
          ) : null}

          <div className="space-y-4">
            <div className="rounded-xl border border-neutral-200 p-4 dark:border-neutral-800">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-medium text-neutral-950 dark:text-white">
                    Strictly necessary
                  </h3>
                  <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                    {categoryDescriptions.necessary}
                  </p>
                </div>
                <Switch checked disabled aria-label="Strictly necessary is always on" />
              </div>
            </div>

            <div className="rounded-xl border border-neutral-200 p-4 dark:border-neutral-800">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-medium text-neutral-950 dark:text-white">
                    Analytics
                  </h3>
                  <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                    {categoryDescriptions.analytics}
                  </p>
                </div>
                <Switch
                  checked={draft.analytics}
                  disabled={!optionalTrackingEnabled}
                  onCheckedChange={(checked) =>
                    setDraft((current) => ({
                      ...current,
                      analytics: checked,
                    }))
                  }
                  aria-label="Toggle analytics consent"
                />
              </div>
            </div>

            <div className="rounded-xl border border-neutral-200 p-4 dark:border-neutral-800">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-medium text-neutral-950 dark:text-white">
                    Personalization
                  </h3>
                  <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                    {categoryDescriptions.personalization}
                  </p>
                </div>
                <Switch
                  checked={draft.personalization}
                  disabled={!optionalTrackingEnabled}
                  onCheckedChange={(checked) =>
                    setDraft((current) => ({
                      ...current,
                      personalization: checked,
                    }))
                  }
                  aria-label="Toggle personalization consent"
                />
              </div>
            </div>

            <div className="rounded-xl border border-neutral-200 p-4 dark:border-neutral-800">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-medium text-neutral-950 dark:text-white">
                    Advertising / sale-sharing
                  </h3>
                  <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                    {categoryDescriptions.advertising}
                  </p>
                </div>
                <Switch
                  checked={draft.advertising && !advertisingLocked}
                  disabled={advertisingLocked}
                  onCheckedChange={(checked) =>
                    setDraft((current) => ({
                      ...current,
                      advertising: checked,
                    }))
                  }
                  aria-label="Toggle advertising and sale-sharing consent"
                />
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
            <p>
              Current region mode:{" "}
              <span className="font-medium text-neutral-950 dark:text-white">
                {bootstrap.regionMode}
              </span>
            </p>
            <p>
              Need the California-specific opt-out flow? Visit{" "}
              <Link to="/do-not-sell-or-share" className="underline underline-offset-4">
                Do Not Sell or Share My Personal Information
              </Link>
              .
            </p>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            type="button"
            variant="destructive"
            onClick={onWithdraw}
            disabled={saving || consent?.status === "withdrawn"}
          >
            Withdraw consent
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onRejectAll}
            disabled={saving}
          >
            Reject non-essential
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onAcceptAll}
            disabled={saving || bootstrap.globalPrivacyControl}
          >
            Accept all
          </Button>
          <Button
            type="button"
            onClick={() => onSave(buildConsentCategories(draft))}
            disabled={saving}
          >
            Save choices
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
