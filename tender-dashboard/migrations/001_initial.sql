CREATE TABLE IF NOT EXISTS users (
 id TEXT PRIMARY KEY, email TEXT NOT NULL UNIQUE, name TEXT NOT NULL,
 role TEXT NOT NULL CHECK(role IN ('manager','staff','admin')), active BOOLEAN NOT NULL DEFAULT TRUE,
 created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS sessions (
 token_hash TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id), expires_at TIMESTAMPTZ NOT NULL
);
CREATE TABLE IF NOT EXISTS login_tokens (
 token_hash TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id), expires_at TIMESTAMPTZ NOT NULL
);
CREATE TABLE IF NOT EXISTS sources (
 id TEXT PRIMARY KEY, name TEXT NOT NULL, channel TEXT NOT NULL CHECK(channel IN ('PRAZ','Private','Manual')),
 status TEXT NOT NULL DEFAULT 'unconfigured', last_success TIMESTAMPTZ, last_error TEXT
);
CREATE TABLE IF NOT EXISTS tenders (
 id TEXT PRIMARY KEY, identity_key TEXT NOT NULL UNIQUE, reference TEXT NOT NULL DEFAULT '',
 title TEXT NOT NULL, issuer TEXT NOT NULL, channel TEXT NOT NULL,
 notice_type TEXT NOT NULL DEFAULT 'Tender', location TEXT NOT NULL DEFAULT 'Zimbabwe',
 description TEXT NOT NULL DEFAULT '', closing_at TIMESTAMPTZ, internal_at TIMESTAMPTZ,
 review_status TEXT NOT NULL DEFAULT 'pending' CHECK(review_status IN ('pending','watch','dismissed','pursued')),
 review_reason TEXT NOT NULL DEFAULT '', reviewed_by TEXT REFERENCES users(id),
 owner_id TEXT REFERENCES users(id), stage TEXT NOT NULL DEFAULT 'reviewing'
 CHECK(stage IN ('reviewing','preparing','approval','submitted','won','lost')),
 score INTEGER NOT NULL DEFAULT 0 CHECK(score BETWEEN 0 AND 100),
 matches JSONB NOT NULL DEFAULT '[]', score_detail JSONB NOT NULL DEFAULT '{}',
 verification TEXT NOT NULL DEFAULT 'unverified', deadline_version INTEGER NOT NULL DEFAULT 1,
 proposed_closing TIMESTAMPTZ, proposal_pending BOOLEAN NOT NULL DEFAULT FALSE,
 submitted_at TIMESTAMPTZ, submission_reference TEXT,
 created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
 CHECK(internal_at IS NULL OR (closing_at IS NOT NULL AND internal_at < closing_at))
);
CREATE TABLE IF NOT EXISTS tender_sources (
 tender_id TEXT NOT NULL REFERENCES tenders(id), source_id TEXT NOT NULL REFERENCES sources(id),
 external_id TEXT NOT NULL, url TEXT NOT NULL DEFAULT '', last_seen TIMESTAMPTZ NOT NULL DEFAULT NOW(),
 PRIMARY KEY(source_id,external_id)
);
CREATE TABLE IF NOT EXISTS tasks (
 id TEXT PRIMARY KEY, tender_id TEXT NOT NULL REFERENCES tenders(id), title TEXT NOT NULL,
 assignee_id TEXT REFERENCES users(id), due_at TIMESTAMPTZ, done BOOLEAN NOT NULL DEFAULT FALSE,
 done_at TIMESTAMPTZ, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS documents (
 id TEXT PRIMARY KEY, tender_id TEXT NOT NULL REFERENCES tenders(id), name TEXT NOT NULL,
 content_type TEXT NOT NULL, size INTEGER NOT NULL, storage_key TEXT NOT NULL,
 uploaded_by TEXT NOT NULL REFERENCES users(id), created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS audit (
 id TEXT PRIMARY KEY, tender_id TEXT REFERENCES tenders(id), actor_id TEXT REFERENCES users(id),
 action TEXT NOT NULL, detail JSONB NOT NULL DEFAULT '{}', created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS scan_jobs (
 id TEXT PRIMARY KEY, dedupe_key TEXT UNIQUE, requested_by TEXT REFERENCES users(id),
 status TEXT NOT NULL DEFAULT 'queued' CHECK(status IN ('queued','running','succeeded','partial','failed')),
 attempts INTEGER NOT NULL DEFAULT 0, lease_until TIMESTAMPTZ, claim_token TEXT,
 result JSONB NOT NULL DEFAULT '{}', created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), finished_at TIMESTAMPTZ
);
CREATE UNIQUE INDEX IF NOT EXISTS one_active_scan ON scan_jobs ((1)) WHERE status IN ('queued','running');
CREATE TABLE IF NOT EXISTS notifications (
 id TEXT PRIMARY KEY, dedupe_key TEXT NOT NULL UNIQUE, kind TEXT NOT NULL,
 recipient_id TEXT NOT NULL REFERENCES users(id), tender_id TEXT REFERENCES tenders(id),
 subject TEXT NOT NULL, body TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'pending'
 CHECK(status IN ('pending','sending','sent','preview','cancelled','failed')),
 attempts INTEGER NOT NULL DEFAULT 0, available_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), lease_until TIMESTAMPTZ,
 claim_token TEXT, last_error TEXT, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), sent_at TIMESTAMPTZ
);
CREATE TABLE IF NOT EXISTS strong_alerts (
 tender_id TEXT NOT NULL REFERENCES tenders(id), recipient_id TEXT NOT NULL REFERENCES users(id),
 PRIMARY KEY(tender_id,recipient_id)
);
CREATE TABLE IF NOT EXISTS rate_limits (
 key TEXT PRIMARY KEY, attempts INTEGER NOT NULL, window_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS tender_closing_idx ON tenders(closing_at);
CREATE INDEX IF NOT EXISTS notification_pending_idx ON notifications(status,available_at);
