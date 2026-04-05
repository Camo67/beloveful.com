import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import type { RegionMode } from "@/lib/privacy/types";

interface ConsentBannerProps {
  open: boolean;
  regionMode: RegionMode;
  globalPrivacyControl: boolean;
  onAcceptAll: () => void;
  onRejectNonEssential: () => void;
  onCustomize: () => void;
}

function getBannerCopy(regionMode: RegionMode) {
  if (regionMode === "california") {
    return "We use privacy-first controls. Optional analytics, personalization, and advertising remain off until you choose. California visitors can also use the dedicated Do Not Sell or Share page at any time.";
  }

  if (regionMode === "opt_in") {
    return "Optional analytics, personalization, and advertising stay off until you opt in. You can accept, reject, or customize your choices at any time.";
  }

  return "We default optional analytics, personalization, and advertising to off until you choose. You can change your privacy settings at any time.";
}

export function ConsentBanner({
  open,
  regionMode,
  globalPrivacyControl,
  onAcceptAll,
  onRejectNonEssential,
  onCustomize,
}: ConsentBannerProps) {
  if (!open) return null;

  return (
    <section
      aria-labelledby="privacy-banner-title"
      aria-describedby="privacy-banner-description"
      className="fixed inset-x-0 bottom-0 z-[70] border-t border-neutral-200 bg-white/95 shadow-2xl backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/95"
    >
      <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-2">
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-500 dark:text-neutral-400">
              Privacy Choices
            </p>
            <h2
              id="privacy-banner-title"
              className="text-lg font-semibold text-neutral-950 dark:text-white"
            >
              Choose how this site uses optional tracking
            </h2>
            <p
              id="privacy-banner-description"
              className="text-sm leading-6 text-neutral-700 dark:text-neutral-300"
            >
              {getBannerCopy(regionMode)}
            </p>
            <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-600 dark:text-neutral-400">
              <Link to="/privacy-policy" className="underline underline-offset-4">
                Privacy Policy
              </Link>
              <Link to="/cookie-policy" className="underline underline-offset-4">
                Cookie Policy
              </Link>
              <Link
                to="/do-not-sell-or-share"
                className="underline underline-offset-4"
              >
                Do Not Sell or Share
              </Link>
              {globalPrivacyControl ? (
                <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-1 text-emerald-700 dark:text-emerald-300">
                  Browser opt-out signal detected
                </span>
              ) : null}
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <Button
              type="button"
              variant="outline"
              onClick={onRejectNonEssential}
              className="w-full sm:w-auto"
            >
              Reject non-essential
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onCustomize}
              className="w-full sm:w-auto"
            >
              Customize
            </Button>
            <Button
              type="button"
              onClick={onAcceptAll}
              className="w-full sm:w-auto"
            >
              Accept all
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
