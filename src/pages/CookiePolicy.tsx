import { LegalTemplatePage } from "@/components/privacy/LegalTemplatePage";

export default function CookiePolicy() {
  return (
    <LegalTemplatePage
      title="Cookie Policy"
      intro="This template explains how the site uses cookies or similar storage. Counsel should validate the category descriptions and any regional disclosure requirements before publication."
      sections={[
        {
          title: "1. How this site uses storage",
          paragraphs: [
            "This site separates strictly necessary storage from optional tracking storage. Strictly necessary storage remembers privacy choices and supports security or session continuity.",
            "Optional categories are analytics, personalization, and advertising / sale-sharing. They stay off by default in this implementation until the user enables them where required.",
          ],
        },
        {
          title: "2. Strictly necessary storage",
          bullets: [
            "Consent preference records and policy version acknowledgements.",
            "Security controls and abuse prevention measures.",
            "Operational checkout or session continuity where required for requested services.",
          ],
        },
        {
          title: "3. Optional categories",
          bullets: [
            "Analytics: first-party page and journey events for {{TRACKING_TOOLS}} only after permitted consent.",
            "Personalization: optional settings that tailor content or recurring experiences.",
            "Advertising / sale-sharing: controls for ad measurement, retargeting, or other sale / sharing use cases, all disabled by default.",
          ],
        },
        {
          title: "4. Browser controls and opt-out signals",
          paragraphs: [
            "Users can reject non-essential categories as easily as accept them and can reopen Privacy Settings at any time.",
            "Where feasible, browser opt-out preference signals such as Global Privacy Control are honored for sale/sharing-related uses.",
          ],
        },
        {
          title: "5. Updating this policy",
          paragraphs: [
            "Replace {{LAST_UPDATED}} with the final publication date after counsel signs off on the storage inventory and disclosures.",
          ],
        },
      ]}
    />
  );
}
