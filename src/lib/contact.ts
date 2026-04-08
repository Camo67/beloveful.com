export const CONTACT_EMAIL = "tony@beloveful.com";

type CreateMailtoHrefOptions = {
  recipient?: string;
  subject?: string;
  body?: string;
  bodyLines?: string[];
};

export function createMailtoHref({
  recipient = CONTACT_EMAIL,
  subject,
  body,
  bodyLines,
}: CreateMailtoHrefOptions = {}): string {
  const params = new URLSearchParams();
  const finalBody = body ?? bodyLines?.filter(Boolean).join("\n") ?? "";

  if (subject) {
    params.set("subject", subject);
  }

  if (finalBody) {
    params.set("body", finalBody);
  }

  const query = params.toString();
  return query ? `mailto:${recipient}?${query}` : `mailto:${recipient}`;
}

export const CONTACT_EMAIL_HREF = createMailtoHref();

export function createWorkshopSignupHref(workshopName: string): string {
  return createMailtoHref({
    subject: `Workshop Signup: ${workshopName}`,
    bodyLines: [
      "Hi Tony,",
      "",
      `I'd like to sign up for ${workshopName}.`,
      "",
      "Name:",
      "Location:",
      "Best way to reach me:",
      "Questions:",
    ],
  });
}

type CreateContactPageHrefOptions = {
  source?: string;
  subject?: string;
  body?: string;
  image?: string;
  region?: string;
  country?: string;
  variant?: string;
  workshop?: string;
};

export function createContactPageHref({
  source,
  subject,
  body,
  image,
  region,
  country,
  variant,
  workshop,
}: CreateContactPageHrefOptions = {}): string {
  const params = new URLSearchParams();

  const entries = {
    source,
    subject,
    body,
    image,
    region,
    country,
    variant,
    workshop,
  };

  for (const [key, value] of Object.entries(entries)) {
    if (typeof value === "string" && value.trim()) {
      params.set(key, value.trim());
    }
  }

  const query = params.toString();
  return query ? `/contact?${query}` : "/contact";
}

export function createWorkshopInquiryHref(workshopName: string): string {
  return createContactPageHref({
    source: "workshops",
    subject: `Workshop Inquiry: ${workshopName}`,
    workshop: workshopName,
    variant: workshopName,
  });
}
