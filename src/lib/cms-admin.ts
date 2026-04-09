export interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
  last_login_at?: string | null;
}

export interface CmsResponse<T> {
  success: boolean;
  error?: string;
}

const ADMIN_API_BASE = import.meta.env.VITE_ADMIN_API_BASE_URL || "/api";

export function normalizeAdminUser(raw: any): AdminUser {
  return {
    id: Number(raw?.id || 0),
    name: String(raw?.name || raw?.username || "Admin"),
    email: String(raw?.email || ""),
    role: String(raw?.role || "editor"),
    status: raw?.status ? String(raw.status) : undefined,
    created_at: raw?.created_at ? String(raw.created_at) : undefined,
    updated_at: raw?.updated_at ? String(raw.updated_at) : undefined,
    last_login_at: raw?.last_login_at ? String(raw.last_login_at) : null,
  };
}

export function getAdminToken(): string | null {
  return localStorage.getItem("admin_token");
}

export function getStoredAdminUser(): AdminUser | null {
  const raw = localStorage.getItem("admin_user");
  if (!raw) return null;

  try {
    return normalizeAdminUser(JSON.parse(raw));
  } catch {
    return null;
  }
}

export function storeAdminSession(token: string, user: any) {
  localStorage.setItem("admin_token", token);
  localStorage.setItem("admin_user", JSON.stringify(normalizeAdminUser(user)));
}

export function clearAdminSession() {
  localStorage.removeItem("admin_token");
  localStorage.removeItem("admin_user");
}

export async function cmsRequest<T = any>(
  path: string,
  init: RequestInit = {},
  options: { auth?: boolean } = {},
): Promise<T> {
  const headers = new Headers(init.headers || {});
  const needsAuth = options.auth !== false;

  if (!headers.has("Content-Type") && init.body) {
    headers.set("Content-Type", "application/json");
  }

  if (needsAuth) {
    const token = getAdminToken();
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
  }

  const response = await fetch(`${ADMIN_API_BASE}${path}`, {
    ...init,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok || data?.success === false) {
    throw new Error(data?.error || `Request failed: ${response.status}`);
  }

  return data as T;
}
