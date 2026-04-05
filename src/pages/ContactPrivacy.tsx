import { LegalTemplatePage } from "@/components/privacy/LegalTemplatePage";
import { legalPlaceholderValues } from "@/lib/privacy/legal-placeholders";

export default function ContactPrivacy() {
  return (
    <LegalTemplatePage
      title="Contact Privacy"
      intro="Use this page to route privacy questions and rights escalations. Counsel should confirm the final contacts, regulator language, and response commitments before production launch."
      sections={[
        {
          title: "1. Privacy contact points",
          bullets: [
            `General privacy contact: ${legalPlaceholderValues.contactEmail}`,
            `Data protection / compliance contact: ${legalPlaceholderValues.dpoEmail}`,
            "Replace any placeholder values with final operational contacts before publishing.",
          ],
        },
        {
          title: "2. Response process",
          paragraphs: [
            "Describe expected response timing, identity verification, and escalation handling after legal and operational review.",
            "If different processes apply by region, add them here instead of relying on a single global sentence.",
          ],
        },
      ]}
    />
  );
}
