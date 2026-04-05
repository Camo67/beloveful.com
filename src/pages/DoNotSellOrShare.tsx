import { LegalTemplatePage } from "@/components/privacy/LegalTemplatePage";
import { usePrivacyControls } from "@/components/privacy/privacy-context";
import { Button } from "@/components/ui/button";

export default function DoNotSellOrShare() {
  const { bootstrap, consent, optOutSaleSharing, saving } = usePrivacyControls();

  return (
    <LegalTemplatePage
      title="Do Not Sell or Share My Personal Information"
      intro="This page provides a dedicated California-style opt-out path separate from the banner. Counsel should review whether the site's enabled integrations amount to sale or sharing before launch."
      sections={[
        {
          title: "1. What this control does",
          paragraphs: [
            "Using this control turns off the Advertising / sale-sharing category for this browser and records the preference with the current consent version.",
            "If your browser sends a recognized opt-out signal, this category remains off while that signal is active.",
          ],
        },
        {
          title: "2. Scope of the request",
          paragraphs: [
            "This request currently applies to this browser using the anonymous consent identifier stored in first-party storage. Counsel should decide whether authenticated or account-linked expansion is needed later.",
          ],
        },
      ]}
    >
      <section className="rounded-[1.5rem] border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-900">
        <h2 className="text-2xl font-medium text-black dark:text-white">
          Current sale/sharing preference
        </h2>
        <p className="mt-3 text-sm leading-7 text-neutral-700 dark:text-neutral-300">
          Region mode: <strong>{bootstrap.regionMode}</strong>. Current browser status:{" "}
          <strong>
            {consent?.saleSharingOptOut || bootstrap.globalPrivacyControl
              ? "opted out"
              : "not opted out"}
          </strong>
          .
        </p>
        <p className="mt-2 text-sm leading-7 text-neutral-700 dark:text-neutral-300">
          This is still a template implementation. Counsel should confirm the
          final wording and whether additional verification or household handling
          is required before production use.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button
            type="button"
            onClick={() => {
              void optOutSaleSharing();
            }}
            disabled={saving || consent?.saleSharingOptOut || bootstrap.globalPrivacyControl}
          >
            Opt out of sale / sharing
          </Button>
        </div>
      </section>
    </LegalTemplatePage>
  );
}
