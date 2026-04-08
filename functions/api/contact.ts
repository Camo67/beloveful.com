import { CONTACT_EMAIL } from '../../src/lib/contact';

interface Env {
  CONTACT_FORM_DELIVERY_MODE?: string;
  CONTACT_FORM_FROM_EMAIL?: string;
  CONTACT_FORM_FROM_NAME?: string;
  CONTACT_FORM_TO_EMAIL?: string;
  MAILCHANNELS_API_URL?: string;
}

type ContactRequestBody = {
  name?: string;
  email?: string;
  message?: string;
  source?: string;
  region?: string;
  country?: string;
  variant?: string;
  image?: string;
  subject?: string;
  workshop?: string;
  website?: string;
};

const DEFAULT_FROM_EMAIL = 'website@beloveful.com';
const DEFAULT_FROM_NAME = 'Beloveful Contact Form';
const DEFAULT_MAILCHANNELS_URL = 'https://api.mailchannels.net/tx/v1/send';

function jsonResponse(payload: unknown, init: ResponseInit = {}): Response {
  return new Response(JSON.stringify(payload), {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init.headers || {}),
    },
  });
}

function sanitizeValue(value: unknown, maxLength = 1200): string {
  return String(value ?? '').trim().slice(0, maxLength);
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function buildSubject(payload: ContactRequestBody, name: string): string {
  const provided = sanitizeValue(payload.subject, 160);
  if (provided) return provided;

  if (sanitizeValue(payload.image, 400)) {
    return 'Print Inquiry';
  }

  if (sanitizeValue(payload.workshop, 160)) {
    return `Workshop Inquiry: ${sanitizeValue(payload.workshop, 160)}`;
  }

  return `Website Inquiry from ${name || 'Visitor'}`;
}

function buildTextBody(
  payload: ContactRequestBody,
  request: Request,
  name: string,
  email: string,
  message: string,
): string {
  const submittedAt = new Date().toISOString();
  const url = new URL(request.url);

  return [
    `Name: ${name}`,
    `Email: ${email}`,
    payload.source ? `Source: ${sanitizeValue(payload.source, 120)}` : '',
    payload.workshop ? `Workshop: ${sanitizeValue(payload.workshop, 160)}` : '',
    payload.region ? `Region: ${sanitizeValue(payload.region, 120)}` : '',
    payload.country ? `Country: ${sanitizeValue(payload.country, 120)}` : '',
    payload.variant ? `Variant: ${sanitizeValue(payload.variant, 160)}` : '',
    payload.image ? `Image: ${sanitizeValue(payload.image, 600)}` : '',
    `Submitted: ${submittedAt}`,
    `Origin: ${url.origin}`,
    '',
    'Message:',
    message || '(No message provided)',
  ]
    .filter(Boolean)
    .join('\n');
}

function buildHtmlBody(
  payload: ContactRequestBody,
  request: Request,
  name: string,
  email: string,
  message: string,
): string {
  const submittedAt = new Date().toISOString();
  const url = new URL(request.url);
  const rows = [
    ['Name', name],
    ['Email', email],
    ['Source', sanitizeValue(payload.source, 120)],
    ['Workshop', sanitizeValue(payload.workshop, 160)],
    ['Region', sanitizeValue(payload.region, 120)],
    ['Country', sanitizeValue(payload.country, 120)],
    ['Variant', sanitizeValue(payload.variant, 160)],
    ['Image', sanitizeValue(payload.image, 600)],
    ['Submitted', submittedAt],
    ['Origin', url.origin],
  ].filter(([, value]) => value);

  const tableRows = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 12px 6px 0;font-weight:600;vertical-align:top;">${escapeHtml(label)}</td><td style="padding:6px 0;">${escapeHtml(value)}</td></tr>`,
    )
    .join('');

  return `<!doctype html>
<html lang="en">
  <body style="font-family:Arial,sans-serif;color:#111827;line-height:1.6;">
    <h1 style="font-size:20px;margin-bottom:16px;">New Beloveful contact form submission</h1>
    <table style="border-collapse:collapse;margin-bottom:24px;">${tableRows}</table>
    <h2 style="font-size:16px;margin-bottom:8px;">Message</h2>
    <div style="white-space:pre-wrap;border:1px solid #e5e7eb;border-radius:12px;padding:16px;">${escapeHtml(
      message || '(No message provided)',
    )}</div>
  </body>
</html>`;
}

async function sendViaMailchannels(
  env: Env,
  toEmail: string,
  replyToName: string,
  replyToEmail: string,
  subject: string,
  textBody: string,
  htmlBody: string,
): Promise<Response> {
  const apiUrl = sanitizeValue(env.MAILCHANNELS_API_URL, 400) || DEFAULT_MAILCHANNELS_URL;
  const fromEmail = sanitizeValue(env.CONTACT_FORM_FROM_EMAIL, 160) || DEFAULT_FROM_EMAIL;
  const fromName = sanitizeValue(env.CONTACT_FORM_FROM_NAME, 160) || DEFAULT_FROM_NAME;

  return fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      personalizations: [
        {
          to: [{ email: toEmail }],
        },
      ],
      from: {
        email: fromEmail,
        name: fromName,
      },
      reply_to: {
        email: replyToEmail,
        name: replyToName || replyToEmail,
      },
      subject,
      content: [
        { type: 'text/plain', value: textBody },
        { type: 'text/html', value: htmlBody },
      ],
    }),
  });
}

export async function onRequestPost(context: any): Promise<Response> {
  const { request, env } = context as { request: Request; env: Env };

  let payload: ContactRequestBody;
  try {
    payload = (await request.json()) as ContactRequestBody;
  } catch {
    return jsonResponse({ success: false, error: 'Invalid request body' }, { status: 400 });
  }

  if (sanitizeValue(payload.website, 200)) {
    return jsonResponse({ success: true });
  }

  const name = sanitizeValue(payload.name, 120);
  const email = sanitizeValue(payload.email, 160).toLowerCase();
  const message = sanitizeValue(payload.message, 5000);

  if (!name || !email) {
    return jsonResponse({ success: false, error: 'Name and email are required' }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return jsonResponse({ success: false, error: 'Please enter a valid email address' }, { status: 400 });
  }

  const toEmail = sanitizeValue(env.CONTACT_FORM_TO_EMAIL, 160) || CONTACT_EMAIL;
  const subject = buildSubject(payload, name);
  const textBody = buildTextBody(payload, request, name, email, message);
  const htmlBody = buildHtmlBody(payload, request, name, email, message);
  const deliveryMode = sanitizeValue(env.CONTACT_FORM_DELIVERY_MODE, 40).toLowerCase() || 'mailchannels';

  if (deliveryMode === 'log') {
    console.log('Contact form submission', {
      toEmail,
      subject,
      textBody,
    });
    return jsonResponse({ success: true, mode: 'log' });
  }

  try {
    const response = await sendViaMailchannels(
      env,
      toEmail,
      name,
      email,
      subject,
      textBody,
      htmlBody,
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Contact form delivery failed', response.status, errorText);
      return jsonResponse(
        { success: false, error: 'We could not send your message right now. Please try again shortly.' },
        { status: 502 },
      );
    }

    return jsonResponse({ success: true });
  } catch (error) {
    console.error('Contact form request failed', error);
    return jsonResponse(
      { success: false, error: 'We could not send your message right now. Please try again shortly.' },
      { status: 500 },
    );
  }
}
