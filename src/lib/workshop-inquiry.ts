export const WORKSHOP_INQUIRY_EMAIL = 'tony@beloveful.com';

export function buildWorkshopInquiryHref(offeringName: string) {
  const subject = `Workshop Inquiry: ${offeringName}`;
  const body = [
    'Hi Tony,',
    '',
    `I am interested in the ${offeringName}.`,
    '',
    'Name:',
    'Preferred dates:',
    'Experience level:',
    'Questions:',
  ].join('\n');

  return `mailto:${WORKSHOP_INQUIRY_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
