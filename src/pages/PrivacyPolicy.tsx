import { LegalTemplatePage } from "@/components/privacy/LegalTemplatePage";
import { legalPlaceholderValues } from "@/lib/privacy/legal-placeholders";

export default function PrivacyPolicy() {
  return (
    <LegalTemplatePage
      title="Privacy Policy"
      intro="This page is a review-ready template for counsel. Replace placeholders, validate lawful bases, and confirm jurisdiction coverage before production launch."
      sections={[
        {
          title: "1. Scope and controller information",
          paragraphs: [
            `This Privacy Policy applies to {{COMPANY_NAME}} / {{LEGAL_ENTITY}} and the websites, services, booking flows, and customer interactions identified by counsel. Replace those placeholders using the values currently shown in the template panel: ${legalPlaceholderValues.companyName} and ${legalPlaceholderValues.legalEntity}.`,
            "This template is intended for jurisdictions including {{JURISDICTIONS}}. Counsel should confirm whether separate addenda are required for specific markets, products, or audiences.",
          ],
        },
        {
          title: "2. Personal information categories",
          bullets: [
            "Identifiers and contact data you provide directly, such as {{CONTACT_EMAIL}} correspondence details or rights-request information.",
            "Technical and usage information collected through strictly necessary storage and, where allowed, first-party analytics configured for {{TRACKING_TOOLS}}.",
            "Transactional details related to print checkout or workshop flows when those services are enabled.",
          ],
        },
        {
          title: "3. Purposes and lawful bases",
          paragraphs: [
            "Document the business purposes for each category of processing and map them to the lawful bases selected by counsel. Placeholder: {{LAWFUL_BASES}}.",
            "Optional analytics, personalization, and advertising / sale-sharing must remain off until the required user choice is captured for the visitor's region mode.",
          ],
        },
        {
          title: "4. Sharing, selling, and third parties",
          paragraphs: [
            "List each service provider, processor, or third party that receives personal information. Placeholder: {{THIRD_PARTIES}}.",
            "Do not state that no sale or sharing occurs unless counsel confirms the site's ad-tech and analytics configuration supports that statement.",
          ],
        },
        {
          title: "5. Retention and deletion",
          paragraphs: [
            "Document the retention periods or criteria for consent logs, event logs, rights requests, and customer communications. Placeholder: {{RETENTION_SCHEDULE}}.",
            "Confirm whether any records must be retained longer to establish, exercise, or defend legal claims.",
          ],
        },
        {
          title: "6. Data subject rights",
          bullets: [
            "Access, correction, deletion, and objection rights where applicable.",
            "Consent withdrawal and granular preference updates for optional categories.",
            "California-specific rights including notice at collection, right to know, deletion, correction, and Do Not Sell or Share requests.",
          ],
        },
        {
          title: "7. Contact and complaints",
          paragraphs: [
            "Route privacy questions to {{CONTACT_EMAIL}} and, if applicable, to {{DPO_EMAIL}}.",
            "Add regulator and complaint escalation details for each jurisdiction only after counsel reviews the final operational process.",
          ],
        },
      ]}
    />
  );
}
