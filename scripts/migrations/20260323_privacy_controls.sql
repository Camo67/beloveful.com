CREATE TABLE IF NOT EXISTS privacy_consent_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  anonymous_consent_id TEXT NOT NULL,
  status TEXT NOT NULL,
  action TEXT NOT NULL,
  consent_version TEXT NOT NULL,
  policy_version TEXT NOT NULL,
  region_mode TEXT NOT NULL,
  categories_json TEXT NOT NULL,
  sale_sharing_opt_out BOOLEAN NOT NULL DEFAULT 0,
  gpc_signal BOOLEAN NOT NULL DEFAULT 0,
  ip_prefix TEXT,
  user_agent_summary TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_privacy_consent_log_consent_id
  ON privacy_consent_log(anonymous_consent_id);
CREATE INDEX IF NOT EXISTS idx_privacy_consent_log_created_at
  ON privacy_consent_log(created_at);

CREATE TABLE IF NOT EXISTS privacy_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  anonymous_consent_id TEXT,
  session_id TEXT,
  pseudonymous_user_id TEXT,
  event_name TEXT NOT NULL,
  event_category TEXT NOT NULL,
  path TEXT,
  referrer_path TEXT,
  payload_json TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_privacy_events_consent_id
  ON privacy_events(anonymous_consent_id);
CREATE INDEX IF NOT EXISTS idx_privacy_events_created_at
  ON privacy_events(created_at);

CREATE TABLE IF NOT EXISTS privacy_requests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  request_type TEXT NOT NULL,
  identifier_type TEXT NOT NULL,
  identifier_value TEXT NOT NULL,
  identifier_hash TEXT NOT NULL,
  contact_email TEXT,
  details TEXT,
  status TEXT NOT NULL DEFAULT 'submitted',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_privacy_requests_identifier_hash
  ON privacy_requests(identifier_hash);
CREATE INDEX IF NOT EXISTS idx_privacy_requests_contact_email
  ON privacy_requests(contact_email);
CREATE INDEX IF NOT EXISTS idx_privacy_requests_created_at
  ON privacy_requests(created_at);

CREATE TRIGGER IF NOT EXISTS privacy_requests_updated_at
  AFTER UPDATE ON privacy_requests
  BEGIN
    UPDATE privacy_requests SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
  END;
