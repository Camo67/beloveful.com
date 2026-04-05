import { LegalTemplatePage } from "@/components/privacy/LegalTemplatePage";

export default function CaliforniaPrivacyNotice() {
  return (
    <LegalTemplatePage
      title="Notice at Collection / California Privacy Notice"
      intro="This California-facing notice is a template only. Counsel must confirm whether the site's data flows qualify as selling or sharing and finalize any CPRA-specific disclosures before use."
      sections={[
        {
          title: "1. Categories collected",
          bullets: [
            "Identifiers and online activity information reasonably necessary to operate the site and respond to requests.",
            "Optional analytics, personalization, or advertising / sale-sharing data only if enabled after the user has made a valid choice in the applicable region mode.",
            "Sensitive personal information is not intentionally collected by default in this implementation.",
          ],
        },
        {
          title: "2. Sources and purposes",
          paragraphs: [
            "Describe the sources of personal information, such as direct user submissions, first-party logs, and service-provider processing. Replace placeholders for tools and processors with counsel-approved language.",
            "State the business or commercial purposes for collection, use, disclosure, sale, or sharing, if any.",
          ],
        },
        {
          title: "3. Retention",
          paragraphs: [
            "Document the applicable retention schedule or the criteria used to determine retention. Placeholder: {{RETENTION_SCHEDULE}}.",
          ],
        },
        {
          title: "4. Your California rights",
          bullets: [
            "Right to know, access, correction, and deletion where applicable.",
            "Right to opt out of sale or sharing through a dedicated method, not just the banner.",
            "Right to limit use of sensitive personal information, if later enabled and applicable.",
          ],
        },
        {
          title: "5. How to exercise rights",
          paragraphs: [
            "Point users to the Do Not Sell or Share page and the Data Request page. Add verification procedures only after operational review.",
            "If Global Privacy Control is honored, explain how it operates and whether it applies across browsers or devices.",
          ],
        },
      ]}
    />
  );
}
