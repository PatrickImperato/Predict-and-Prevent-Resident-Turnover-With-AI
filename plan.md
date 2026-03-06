# plan.md — HappyCo Concierge V1 (planning-first clean rebuild)

## 1) Objectives
- Rebuild **HappyCo Concierge** as a clean, diagnosable prospect-facing demo platform with **strict environment separation**.
- Match the **current preview experience** (layout, labels/copy, core behavior) wherever feasible, with cleaner internals and safer architecture.
- Environments use **explicit config only**: `APP_ENV=preview|production` (no hostname guessing; no silent DB fallback).
- Preview has **demo mode**; production starts with the **same seeded demo dataset** but in its **own production DB**.
- Auth approach for V1: **seed demo/admin accounts first**, keep current admin login behavior as close as possible, refine parity later.
- Roll out to a **test domain (placeholder for now: `<TBD_TEST_DOMAIN>`)** before any cutover to `happyco.talapartners.com`.
- Planning-first constraint (Phase 1): **no app code**, **no database code**, **no deployment commands**.

**Reference findings (crawled):**
- Landing page messaging centers on retention intelligence / churn prevention, with KPI-style stats and portfolio ROI framing.
- Login page structure and copy observed:
  - “Welcome back” / “Sign in to access the platform”
  - Fields: “Email address”, “Password”
  - CTA: “Sign In”
  - Right-side demo account cards with autofill:
    - Property Manager — `manager@riverside.com` / `manager123`
    - Resident Experience — `alex.chen@email.com` / `demo123`
    - HappyCo Admin — `admin@happyco.com` / `admin123`

## 2) Implementation Steps (Phased)

### Phase 1 — Planning Artifacts Only (no code) ✅ COMPLETED
**Status:** Completed planning-only deliverable.

**Delivered artifacts (no app code, no DB code, no deployment commands generated):**
- Feature Inventory
- Data Inventory
- Schema Inventory
- Seed Plan
- Deployment & Cutover Plan

#### A) Feature Inventory
| Area | Must-match V1 surfaces | Notes |
|---|---|---|
| Public | Landing (`/`) | Headline + KPIs + sections; CTA to sign in |
| Auth | Login (`/login`) | Email/password + demo account cards (preview-only behavior gated by APP_ENV) |
| Admin | Admin shell (`/app/admin/*`) | Left nav + topbar (property switcher, env badge, user) |
| Admin Pages | Dashboard, Properties, Providers, Tenants, Analytics, Settings, Diagnostics | Parity-first; id-based routing for detail pages |
| Diagnostics | `/app/admin/diagnostics` + API endpoints | Must show env/host/db/user/role + collection counts |
| Seed/Ops | Preview reset + prod bootstrap visibility | Restricted; no accidental cross-env |

#### B) Data Inventory
| Collection | Purpose (V1) | Env rules |
|---|---|---|
| users | demo/admin accounts, roles | shared schema; isolated per DB |
| platform_settings | global toggles (e.g., turnover cost, margin, model enabled) | include `datasetId=demoA` in preview |
| properties | the 3 required properties | id-based routes; stable IDs |
| residents | includes **Alex Chen** QA resident | tied to propertyId + datasetId |
| providers, services, service_vendors | provider mgmt + catalog | used on providers page |
| bookings, offers, retention_offers | concierge/retention flows | credits tracked separately |
| maintenance_* | churn signals + ops history | rolling dates |
| property_* (economics/metrics), monthly_revenue, receipts | KPI/analytics reconciliation | ensure gross vs credits vs net |
| churn_* history, interventions_log, audit_events, consent_records, discount_impacts | diagnostics + analytics depth | seed enough to look real |

#### C) Schema Inventory (V1 minimal shapes)
- Shared fields: `id` (uuid), `createdAt`, `updatedAt`, `datasetId` (required in preview), `propertyId` where applicable.
- Users: `{ id, email, passwordHash, role: admin|manager|resident, displayName, isDemo }`.
- Properties: `{ id, name, address?, timezone, datasetId, status, heroImageUrl? }`.
- Residents: `{ id, propertyId, fullName, unit, phone?, email?, riskScore?, tags[] }`.
- Financial rollups: store **grossRevenue**, **credits**, **netRevenue** (computed/display), by month/property.
- Logs/audit: `{ id, actorUserId, action, entityType, entityId, at, meta }`.

#### D) Seed Plan
- Dataset: single preview dataset id **`demoA`**.
- Seeded entities (both preview + production DBs, separately):
  - Properties: **Lakeside Commons**, **Downtown Tower**, **The Metropolitan at Riverside**.
  - Resident: **Alex Chen** (flagship QA resident; ensure appears in tenants + risk tables).
  - Demo accounts (login cards parity):
    - Property Manager: `manager@riverside.com` / `manager123`
    - Resident Experience: `alex.chen@email.com` / `demo123`
    - HappyCo Admin: `admin@happyco.com` / `admin123`
- Rolling dates: generate last 90 days of maintenance + churn score history + monthly revenue so charts look current.
- Reconciliation: seed numbers so dashboard KPIs and analytics totals **match** (gross vs credits separate).

#### E) Deployment & Cutover Plan
- Environments:
  - Preview: `APP_ENV=preview` → connects only to Preview DB.
  - Production: `APP_ENV=production` → connects only to Production DB.
- Hard rules:
  - No hostname-based env detection.
  - No automatic fallback to another DB.
  - Startup diagnostics must fail fast if APP_ENV/DB vars missing.
- Domains:
  - Test domain: **`<TBD_TEST_DOMAIN>`** (production verification target).
  - Live domain cutover only after approval.
- Verification checklist (pre-cutover): env badge correct, DB name correct, collection counts match expected, admin routes never 403 incorrectly.

### Phase 2 — Architecture foundation + Core POC (prove the “hard part” before full build) ⏳ NOT STARTED
**Core workflow to prove:** strict env-to-DB binding + diagnostics visibility + seed reset/bootstrapping safety.

User stories:
1. As an admin, I can open Diagnostics and immediately see APP_ENV, host, DB name, and collection counts.
2. As a developer, the app refuses to boot if APP_ENV is invalid/missing (no silent fallback).
3. As QA, preview reset reseeds demoA deterministically without touching production.
4. As QA, production bootstrap seeds the same dataset into production DB only.
5. As an admin, I can verify routes use id-based navigation consistently.

### Phase 3 — Backend/data layer MVP ⏳ NOT STARTED
- Auth/session baseline (seeded accounts first); role gating for admin routes.
- Read APIs to support dashboard KPIs, lists, and detail pages.
- Write APIs for provider management + settings + seed utilities (restricted).

User stories:
1. As admin, I can log in and maintain a session across admin pages.
2. As admin, I can list properties/providers/residents with stable IDs.
3. As admin, I can edit a provider and see changes reflected immediately.
4. As admin, I can adjust global settings and see analytics update.
5. As admin, audit events record sensitive actions (seed reset/settings changes).

### Phase 4 — Frontend parity MVP (match preview UI structure) ⏳ NOT STARTED
- Public landing + login (demo cards; preview-only demo mode / toggle as specified).
- Admin shell layout (sidebar/topbar) per design guidelines; pages scaffolded.
- Dashboard KPIs + charts (recharts) + tables.

User stories:
1. As a prospect, I can view the landing page and understand churn/ROI value quickly.
2. As a demo user, I can click a demo card to autofill login and sign in.
3. As admin, I can navigate between Dashboard/Properties/Providers/Tenants/Analytics/Settings/Diagnostics.
4. As admin, I can switch properties and see page content update.
5. As admin, KPIs show gross vs credits distinctly.

### Phase 5 — Diagnostics/auth hardening + ops workflows ⏳ NOT STARTED
- Tighten admin authorization across routes (no 403 surprises).
- Add diagnostics endpoints + UI: env/host/db/user/role/build + counts + last seed run.
- Preview seed reset UX with confirmation.

User stories:
1. As admin, I never see “403” due to inconsistent auth on a valid session.
2. As admin, I can export/copy diagnostics values for support.
3. As admin, I can confirm last seed time and datasetId.
4. As QA, I can reset preview safely with an explicit confirmation.
5. As operator, I can understand credit vs revenue semantics from labels.

### Phase 6 — Testing/polish ⏳ NOT STARTED
- Parity sweep: labels/copy/layout; `data-testid` coverage; empty/loading states.
- Reconciliation tests for KPI math and analytics totals.

User stories:
1. As QA, I can run through every nav item without broken links.
2. As QA, charts load with realistic recent dates.
3. As QA, analytics totals match dashboard totals for the same range.
4. As QA, data-testid exists on all key controls/values.
5. As admin, empty states are understandable and actionable.

### Phase 7 — Deployment verification + cutover ⏳ NOT STARTED
- Deploy production to `<TBD_TEST_DOMAIN>`; verify env binding + diagnostics.
- Only after approval, swap to `happyco.talapartners.com`.

User stories:
1. As admin, I can confirm production shows `APP_ENV=production` and production DB name.
2. As admin, I can confirm preview still points to preview DB after production deploy.
3. As QA, seeded dataset exists in both envs but never cross-contaminates.
4. As operator, performance is acceptable on test domain.
5. As stakeholder, I can approve go-live based on a checklist.

## 3) Next Actions
- Capture remaining parity specifics that are behind auth (admin pages) via screenshots or an approved admin walkthrough.
- Lock the minimal V1 API surface needed for dashboard + lists + settings + diagnostics.
- Define stable IDs for the 3 properties + Alex Chen to keep routing deterministic.
- Draft the diagnostics checklist and seed reconciliation targets (gross/credits/net).
- Decide the exact test domain value before Phase 7.

## 4) Success Criteria
- Environment separation is provable: diagnostics + hard failures prevent mixing.
- Preview matches current preview landing/login/admin UX wherever feasible (copy/layout/behavior).
- Seeded demo dataset (`demoA`) is polished, current-dated, and KPIs reconcile.
- Admin routes are consistent (no brittle filters; no surprise 403s).
- Production is verified on `<TBD_TEST_DOMAIN>` before any live-domain cutover.
