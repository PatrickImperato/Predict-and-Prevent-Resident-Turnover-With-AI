# plan.md — HappyCo Concierge V1 (planning-first clean rebuild)

## 1) Objectives
- Rebuild **HappyCo Concierge** as a clean, diagnosable prospect-facing demo platform with **strict environment separation**.
- Match the **current preview experience** (layout, labels/copy, core behavior) wherever feasible, with cleaner internals and safer architecture.
- Environments use **explicit config only**: `APP_ENV=preview|production` (no hostname guessing; no silent DB fallback).
- **One preview database only** + **one production database only** (same schema, isolated data).
- Preview has **demo mode**; production starts with the **same seeded demo dataset** but in its **own production DB**.
- Auth approach for V1:
  - Seed demo/admin accounts first; keep current admin login behavior as close as possible; refine parity later.
  - **Session approach:** **secure cookie session** (confirmed).
- Routing requirements:
  - Keep admin route base **`/app/admin/*` exactly** (confirmed).
  - Use **id-based routing** for detail pages.
- Audience/scope:
  - Resident/manager auth exists, but **UI focus stays admin-first** for V1 (confirmed).
- Roll out to a **test domain (placeholder for now: `<TBD_TEST_DOMAIN>`)** before any cutover to `happyco.talapartners.com`.
- Built-in diagnostics from day one:
  - Diagnostics UI and API are first-class features.
  - **Diagnostics shows full DB name to authenticated admins** (confirmed).
- Seed operations controls (confirmed):
  - **Preview reset is restricted to super-admin only**.
  - **Production bootstrap is a deployment-time protected step only** (not a normal admin-triggered action / endpoint).
  - **Seed services execution model:** built into backend as **restricted internal services** (confirmed).
- Planning/blueprint constraint (completed):
  - Phase 1–3 were architecture/plans first.
  - **No full app code**, **no DB code**, **no deployment commands** were produced in blueprint phases.

**Phase 4 scope constraint (NEW / active):**
- Implement **foundation only** in this exact order:
  1) backend environment config loader
  2) fail-fast environment validation
  3) single database binding
  4) secure cookie session auth foundation
  5) diagnostics endpoints first
  6) diagnostics admin page first
- Do **not** build the rest of the app yet.
- Preview reset and production bootstrap: **protected placeholders only** (no functional reset/bootstrap).

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
| Seed/Ops | Preview reset + prod bootstrap | Reset restricted to super-admin; production bootstrap is deployment-time only |

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
  - Startup must fail fast if APP_ENV/DB vars missing or invalid.
- Domains:
  - Test domain: **`<TBD_TEST_DOMAIN>`** (production verification target).
  - Live domain cutover only after approval.
- Verification checklist (pre-cutover): env badge correct, DB name correct, collection counts match expected, admin routes never 403 incorrectly.

### Phase 2 — Environment & Diagnostics Architecture Blueprint (no code) ✅ COMPLETED
**Purpose (tight scope):** Define the architecture that guarantees:
1) explicit APP_ENV detection, 2) exactly one preview DB, 3) exactly one production DB,
4) fail-fast invalid configuration handling, 5) diagnostics endpoints available from day one,
plus hard cross-environment guardrails.

**Confirmed Phase 2 control decisions:**
- Diagnostics UI shows **full DB name** to authenticated admins.
- Preview reset is **super-admin only**.
- Production bootstrap is **deployment-time protected only** (no normal admin-triggered action).

**Delivered Phase 2 blueprint outputs (architecture only; no implementation code):**
- **Environment variable structure**: explicit `APP_ENV=preview|production` contract + required variables per env.
- **DB connection selection rules**: strictly bind exactly one DB per APP_ENV; no hostname inference; no fallbacks.
- **Fail-fast guardrails**: startup validation matrix for APP_ENV and DB settings; abort on invalid/missing config.
- **Diagnostics API blueprint**: runtime/session/collections/seed metadata endpoints available from day one.
- **Diagnostics admin page layout**: admin-first diagnostics IA to surface env/db/user and counts with copy-to-clipboard.
- **Preview reset protections**: super-admin gate + explicit confirmation + audit trail; only allowed when APP_ENV=preview.
- **Production bootstrap protections**: deployment-time only, idempotent bootstrap expectations + audit trail.
- **Cross-env prevention rules**: explicit, enforceable rules preventing preview/prod cross access and surfacing violations in diagnostics.

**Phase 2 user stories (prove the “hard part” before full build):**
1. As an admin, I can open Diagnostics and immediately see APP_ENV, host, **DB name**, and collection counts.
2. As a developer, the app refuses to boot if APP_ENV or DB configuration is missing/invalid (no silent fallback).
3. As QA, preview reset cannot be executed unless the user is a super-admin *and* APP_ENV is preview.
4. As stakeholders, we can verify production bootstrap is only performed at deploy time (not from an admin UI).
5. As an admin, I can see audit evidence (seed/bootstrap/settings changes) in diagnostics.

### Phase 3 — Implementation Architecture Blueprint (no full code) ✅ COMPLETED
**Purpose:** Define *how* V1 will be implemented (module boundaries, contracts, middleware, and UI structure) while preserving the Phase 2 guardrails.

**Confirmed Phase 3 implementation decisions:**
- **Auth/session:** secure cookie session.
- **Admin route base:** keep `/app/admin/*` exactly.
- **Resident/manager:** auth exists, but UI focus stays admin-first.
- **Seed execution model:** seed services live inside backend as restricted internal services.

**Delivered Phase 3 blueprint outputs (architecture only; no full implementation code):**
- Backend module structure
- Diagnostics endpoint contracts (request/response shapes)
- Auth + role middleware design
- Seed service architecture for dataset `demoA`
- Preview reset workflow design (super-admin only)
- Production bootstrap workflow design (deployment-time only)
- Frontend route map
- Frontend component structure
- Admin layout shell structure
- Diagnostics admin page component structure

**Exit criteria for Phase 3 (satisfied):**
- Clear folder/module boundaries on backend and frontend.
- Explicit endpoint inventory for V1 (especially diagnostics/auth).
- A security model that prevents preview/prod cross access by construction.
- Seed/reset/bootstrap flows fully specified with gates, auditing, and diagnostics visibility.

### Phase 4 — Foundation implementation (env + DB + auth + diagnostics) ⏳ IN PROGRESS
**This phase is intentionally limited. Do not implement the rest of the app yet.**

**Implementation order (must follow exactly):**
1) backend environment config loader
2) fail-fast environment validation
3) single database binding
4) secure cookie session auth foundation
5) diagnostics endpoints first
6) diagnostics admin page first

**In-scope deliverables:**
- Backend:
  - Runtime config loader and validator that enforces `APP_ENV` as the only primary selector.
  - Strict single-DB binding per environment.
  - Secure cookie session foundation:
    - login/logout/session endpoints (foundation)
    - role resolution (admin/super-admin)
  - Diagnostics endpoints:
    - runtime (env/host/db/build)
    - session (current user/role)
    - collections (counts)
    - seeds (placeholder metadata only)
    - health
  - Protected placeholders only:
    - preview reset endpoint placeholder (super-admin + preview gated) returns “Not Implemented”
    - production bootstrap placeholder (deployment-only concept) not exposed in runtime UI
- Frontend:
  - Minimal admin shell + route guard sufficient to reach:
    - `/login`
    - `/app/admin/diagnostics`
  - Diagnostics page first:
    - runtime/session/collections/seed placeholder cards
    - preview reset control visible only when permitted, but non-functional placeholder

**Out-of-scope (explicitly NOT implemented in Phase 4):**
- Landing page parity
- Dashboard/properties/providers/tenants/analytics/settings pages
- Any real seed/reset/bootstrap functionality
- Any business analytics logic beyond collection counts
- Demo dataset seeding (`demoA`) execution (will be Phase 5/6)

**Phase 4 acceptance criteria:**
1. `APP_ENV` is the only primary environment selector.
2. Preview binds to exactly one preview DB; production binds to exactly one production DB.
3. Invalid environment configuration fails at startup.
4. Diagnostics show: environment, host, DB name, current user, role, and collection counts.
5. Preview reset and production bootstrap remain protected placeholders (no functional reset/bootstrap).

### Phase 5 — Frontend parity implementation (admin-first) ⏳ NOT STARTED
- Implement public landing and login parity.
- Implement admin shell layout per design guidelines.
- Implement admin pages: Dashboard, Properties, Providers, Tenants, Analytics, Settings (Diagnostics already exists from Phase 4).

User stories:
1. As a prospect, I can view the landing page and understand churn/ROI value quickly.
2. As a demo user, I can click a demo card to autofill login and sign in.
3. As admin, I can navigate between all admin pages without broken links.
4. As admin, property switching updates views consistently.
5. As admin, KPIs show gross vs credits distinctly.

### Phase 6 — Seed + hardening (demoA, reset UX, auth consistency) ⏳ NOT STARTED
- Implement full seed services for dataset `demoA`.
- Implement preview reset (super-admin only) with explicit confirmation.
- Implement production bootstrap (deployment-time only) with idempotency + audit.
- Expand diagnostics warnings (missing datasetId, drift).
- Tighten admin authorization across all routes (no 403 surprises).

### Phase 7 — Testing/polish ⏳ NOT STARTED
- Parity sweep: labels/copy/layout; `data-testid` coverage; empty/loading states.
- Reconciliation tests for KPI math and analytics totals.

### Phase 8 — Deployment verification + cutover ⏳ NOT STARTED
- Deploy production to `<TBD_TEST_DOMAIN>`; verify env binding + diagnostics.
- Only after approval, swap to `happyco.talapartners.com`.

## 3) Next Actions
- Continue Phase 4 work exactly in the mandated order:
  1) config loader → 2) fail-fast validation → 3) single DB binding → 4) secure cookie session auth → 5) diagnostics endpoints → 6) diagnostics admin page.
- Maintain Phase 4 scope discipline: do not start dashboard/properties/etc.
- Once Phase 4 is implemented, provide a summary:
  - files created/changed
  - expected env vars
  - diagnostics wiring
  - auth wiring
  - what remains unimplemented
- Capture remaining parity specifics behind auth (admin pages) via screenshots or an approved admin walkthrough.
- Decide the exact test domain value before Phase 8.

## 4) Success Criteria
- Environment separation is provable: diagnostics + hard failures prevent mixing.
- Preview matches current preview landing/login/admin UX wherever feasible (copy/layout/behavior) (later phases).
- Seeded demo dataset (`demoA`) is polished, current-dated, and KPIs reconcile (later phases).
- Admin routes are consistent (no brittle filters; no surprise 403s).
- Production is verified on `<TBD_TEST_DOMAIN>` before any live-domain cutover.
