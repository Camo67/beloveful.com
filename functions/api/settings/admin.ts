import { verifyAuth } from '../_utils/auth';

interface Env {
  DB: D1Database;
  JWT_SECRET: string;
}

function jsonResponse(payload: any, init: ResponseInit = {}): Response {
  return new Response(JSON.stringify(payload), {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init.headers || {}),
    },
  });
}

const SETTINGS_KEYS = ['contact_email', 'print_email', 'calendly_url'] as const;

async function readSettings(db: D1Database) {
  const result = await db
    .prepare(
      `
      SELECT key, value, updated_at
      FROM settings
      WHERE key IN (?, ?, ?)
      ORDER BY key
      `,
    )
    .bind(...SETTINGS_KEYS)
    .all();

  const settings: Record<string, string> = {};
  let updatedAt = '';
  for (const row of result.results || []) {
    settings[String(row.key)] = String(row.value ?? '');
    if (typeof row.updated_at === 'string' && row.updated_at > updatedAt) {
      updatedAt = row.updated_at;
    }
  }

  return {
    settings,
    updated_at: updatedAt || undefined,
  };
}

export async function onRequestGet(context: any): Promise<Response> {
  const { request, env } = context as { request: Request; env: Env };
  const db = env.DB as D1Database;

  try {
    const authResult = await verifyAuth(request, env);
    if (!authResult.success) {
      return jsonResponse(authResult, { status: 401 });
    }

    const data = await readSettings(db);
    return jsonResponse({ success: true, settings: data.settings, updated_at: data.updated_at }, { status: 200 });
  } catch (error: any) {
    console.error('Get site settings error:', error);
    return jsonResponse({ success: false, error: 'Failed to load site settings' }, { status: 500 });
  }
}

export async function onRequestPost(context: any): Promise<Response> {
  const { request, env } = context as { request: Request; env: Env };
  const db = env.DB as D1Database;

  try {
    const authResult = await verifyAuth(request, env);
    if (!authResult.success) {
      return jsonResponse(authResult, { status: 401 });
    }

    const body = await request.json();
    const statements: D1PreparedStatement[] = [];

    for (const key of SETTINGS_KEYS) {
      if (!(key in (body || {}))) continue;
      statements.push(
        db.prepare(
          `
          INSERT INTO settings (key, value, description)
          VALUES (?, ?, ?)
          ON CONFLICT(key) DO UPDATE SET
            value = excluded.value,
            description = excluded.description,
            updated_at = CURRENT_TIMESTAMP
          `,
        ).bind(key, String(body[key] ?? ''), `Managed via admin: ${key}`),
      );
    }

    if (statements.length === 0) {
      return jsonResponse({ success: false, error: 'No valid settings provided' }, { status: 400 });
    }

    await db.batch(statements);
    const data = await readSettings(db);

    return jsonResponse(
      {
        success: true,
        settings: {
          ...data.settings,
          updated_at: data.updated_at,
        },
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error('Save site settings error:', error);
    return jsonResponse({ success: false, error: error?.message || 'Failed to save site settings' }, { status: 500 });
  }
}
