# Pump Systems Africa - Tender Workspace

Working application core, not the earlier in-browser mockup. Records are saved in a database and access decisions are enforced by the server. No company logo is used.

## Start locally (Node.js 22 or newer)

```powershell
npm ci
Copy-Item .env.example .env
npm start
```

Open http://127.0.0.1:4173 and choose a local demo account. The Projects Manager reviews opportunities; other staff can add records, view opportunities and complete tasks. Administrator is a separate role, not automatically the business reviewer.

The default database is **durable PGlite**, an embedded PostgreSQL-compatible engine in `data/database`. It is for local development, uses one process, and keeps changes after restarts. It is not a shared production PostgreSQL server. The web process embeds the job worker when this local database is used. Do not run a second process against this directory.

Demo mode binds only to loopback. Do not expose it through a tunnel or proxy. Live startup rejects demo collectors and requires PostgreSQL, HTTPS and SMTP.

## Test discovery without external access

In `.env`, set `PRAZ_MODE=fixture` and `PRIVATE_MODE=fixture`, then restart. Click **Check now**. Fictional notices are ingested by the same scoring, duplicate and review pipeline. The email centre shows saved previews, not sent email. Restarting retains records. Repeat scans do not create another discovery email for the same strong match and recipient.

Default source modes are `unconfigured`. Failed scans show the actual configuration problem rather than claiming there were no matches. No internet scraping or real PRAZ login occurs in this version.

## Implemented

- PostgreSQL schema and transactional migrations; a `pg` connection when `DATABASE_URL` is supplied.
- Manual tender creation, ownership, preparation tasks and history.
- Projects Manager-only pursue/watch/dismiss decisions, including server-side enforcement.
- Submission reference capture, stage tracking, and closing reminder cancellation.
- Document upload/download, authenticated, with a 10 MB limit. Bytes are stored outside the web root in `data/documents`; metadata is in PostgreSQL.
- PRAZ/Private discovery channels, keyword matching, supported variants, Strong/Moderate/Weak scoring, evidence and sorting.
- Source aliases and reference/issuer duplicate merging; deadline amendments are proposed rather than silently applied.
- Daily scan job at **08:00 CAT / 06:00 UTC**, every day. If the worker was offline at 08:00, it catches up on that same CAT day. It does not run missed days in a burst.
- Check now, one active scan at a time, job claims/leases and stale-claim recovery.
- New strong-match digest to all active registered staff; per-recipient deduplication.
- Deadline windows (7 days, 3 days, 1 day, 2 hours); only the nearest applicable window is queued when the worker starts late, avoiding a burst of past reminders. Overdue tasks escalate to Projects Manager accounts.
- Durable email queue, SMTP adapter, preview mode, retries and delivery status.
- Company-domain, pre-provisioned email-link sign-in for live mode; single-use expiring tokens, hashed session tokens, HttpOnly/SameSite cookies, request-origin validation and request throttling.
- AI provider contract with exact-quote validation. It is disabled until a provider is implemented and configured; it cannot update deadlines.

## What remains external / unfinished

**PRAZ:** an actual authenticated collector must be built and tested against the portal, its allowed access method, session expiry and any human OTP/CAPTCHA steps. No credentials should be placed in browser code.

**Private discovery:** implement an approved web-search service and individual source adapters. Normalise each notice into the contract below. Verify Zimbabwe relevance and label uncertainty. Website-specific fetching, PDF text extraction and OCR are not yet implemented.

**AI:** `src/ai.mjs` validates a provider response but does not call a model. Select a provider, configure a server secret, implement its adapter, and test it with real documents. AI never determines bid decisions or silently writes official dates.

**Email/auth:** SMTP code is present but not tested with a real provider. Staff must be provisioned; a company-domain email alone does not grant access. DNS, mail sender verification, TLS reverse proxy and the actual company domain are not configured here.

**Production operations:** configure backups, database TLS/pooling, centralized logging, persistent shared document storage, file scanning and a retention policy. Local document storage requires a shared durable volume if multiple web instances are used. Object-storage integration is not yet included.

## PostgreSQL deployment

1. Provision a PostgreSQL database and persistent document storage.
2. Set `DATABASE_URL`, `APP_MODE=live`, `APP_ORIGIN=https://tenders.pumpsystemsafrica.com`, `HOST=0.0.0.0`, `EMAIL_MODE=smtp`, SMTP settings and `EMAIL_FROM` through the host's secret settings.
3. Run `npm run migrate` before rollout.
4. Provision staff from a trusted administrator console, e.g.:

```text
npm run staff -- person@pumpsystemsafrica.com "Projects Manager" manager
npm run staff -- colleague@pumpsystemsafrica.com "Staff Name" staff
```

5. Run **two services from the same source**: `npm start` (web) and `npm run worker` (background jobs). Both use the same PostgreSQL database and settings. Local PGlite must not be used for this multi-process setup.
6. Terminate HTTPS at the hosting provider/reverse proxy and preserve the configured origin. Point the `tenders` DNS subdomain to that host. The existing corporate website can stay unchanged.
7. Verify sign-in email, staff permissions, backup/restore, file uploads, scan lease recovery and reminders before inviting the team.

The `Dockerfile` supports a normal Node hosting platform. Deployment to Sites/Cloudflare Workers is not configured: this implementation deliberately uses the agreed PostgreSQL + background-worker architecture and Node SMTP/filesystem APIs.

## Collector contract

Pass normalized notices to `ingest(tx, source, notice)` from `src/domain.mjs`:

```json
{
  "externalId": "source-specific-id",
  "reference": "RFQ-123",
  "title": "Supply of solar borehole pumps",
  "issuer": "Issuing organisation",
  "description": "Original source text containing requirements.",
  "notice_type": "Request for quotation",
  "location": "Zimbabwe",
  "closing_at": "2027-01-20T10:00:00+02:00",
  "url": "https://source.example/notice"
}
```

Dates must have timezones; missing dates use null. Every keyword match is retained regardless of strength. Reference plus issuer is the preferred cross-source identity. Without a reference, exact URL or source ID is used; fuzzy cross-site duplicate matching is not implemented. Retain all aliases through `tender_sources`.

## Main API routes

All application routes require a session. Unsafe requests require `Origin` equal to `APP_ORIGIN`.

| Route | Purpose |
|---|---|
| POST /api/auth/request, /api/auth/consume | Company sign-in link and exchange |
| GET/POST /api/tenders | List / manual creation |
| GET /api/tenders/:id | Detail, tasks, documents and history |
| POST /api/tenders/:id/review | Projects Manager review |
| POST /api/tenders/:id/deadline | Projects Manager confirms a deadline |
| POST /api/tenders/:id/stage | Owner or manager changes stage / records receipt |
| PATCH /api/tasks/:id | Complete / reopen task |
| POST /api/tenders/:id/documents | Binary upload with X-File-Name header |
| GET /api/documents/:id | Authenticated download |
| GET/POST /api/scans | Collection history / Check now |
| GET /api/notifications | Own notifications; manager/admin can view team queue |

## Verification

`npm test` exercises the real schema with PGlite, scoring, CAT schedule boundaries, duplicate ingestion, role restrictions, date proposals, email deduplication, reminder windows, HTTP authentication and origin checks. Run PostgreSQL-server integration tests after the host provides a server: PGlite compatibility is not a substitute for that final check.

The email outbox is at-least-once: SMTP cannot guarantee exactly-once delivery if the process crashes after sending but before saving success. Stable message IDs and database deduplication reduce duplicates; provider-level idempotency is a future integration option.

Keep `.env`, `data/`, document bytes and database backups out of Git and public downloads.
